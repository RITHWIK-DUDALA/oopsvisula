import { test, expect } from '@playwright/test';
import { SECURITY_USER_A, SECURITY_USER_B, SECURITY_TEST_PAYLOADS } from '../fixtures/securityFixtures';

test.describe('REACT SECURITY AUDIT SUITE', () => {

  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  // ---------------------------------------------------------------------------
  // 1. Cross-Site Scripting (XSS)
  // ---------------------------------------------------------------------------
  test('React-01: XSS payload in search query parameter is sanitized and not executed', async ({ page }) => {
    let xssTriggered = false;
    page.on('console', msg => {
      if (msg.text().includes('XSS_')) xssTriggered = true;
    });
    page.on('dialog', async dialog => {
      xssTriggered = true;
      await dialog.dismiss();
    });

    const payload = encodeURIComponent(SECURITY_TEST_PAYLOADS.xss[0]);
    await page.goto(`/app/concepts?q=${payload}`);
    await page.waitForTimeout(500);

    expect(xssTriggered).toBe(false);

    // Verify search input escaped content
    const searchInput = page.locator('input[placeholder*="Search"]');
    if (await searchInput.count() > 0) {
      const val = await searchInput.inputValue();
      expect(val).not.toContain('<img');
    }
  });

  test('React-02: XSS script injection in curriculum filter is not executed', async ({ page }) => {
    let scriptExecuted = false;
    page.on('console', msg => {
      if (msg.text().includes('XSS_SCRIPT_TRIGGERED')) scriptExecuted = true;
    });

    await page.goto('/app/concepts');
    const searchInput = page.locator('input[placeholder*="Search"]');
    if (await searchInput.count() > 0) {
      await searchInput.fill(SECURITY_TEST_PAYLOADS.xss[1]);
      await page.waitForTimeout(500);
    }

    expect(scriptExecuted).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // 2. DOM Injection
  // ---------------------------------------------------------------------------
  test('React-03: DOM injection attempts do not create unauthorized DOM nodes', async ({ page }) => {
    await page.goto('/app/concepts?q=' + encodeURIComponent(SECURITY_TEST_PAYLOADS.domInjection[0]));
    await page.waitForTimeout(500);

    const injectedNode = page.locator('#injected-payload-marker');
    expect(await injectedNode.count()).toBe(0);
  });

  // ---------------------------------------------------------------------------
  // 3. Unsafe HTML Rendering
  // ---------------------------------------------------------------------------
  test('React-04: No dangerous HTML rendering of user input in visualizer cards', async ({ page }) => {
    await page.goto('/app/playground');
    await page.waitForTimeout(1000);

    // Verify no unauthorized inline script tags exist in DOM
    const rawInlineScripts = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts.filter(s => !s.src && s.innerText.includes('XSS')).length;
    });
    expect(rawInlineScripts).toBe(0);
  });

  // ---------------------------------------------------------------------------
  // 4. Token Exposure
  // ---------------------------------------------------------------------------
  test('React-05: Authentication tokens are never exposed in URL query parameters or window globals', async ({ page }) => {
    // Set synthetic user A session
    await page.evaluate((user) => {
      localStorage.setItem('oops_auth_state', JSON.stringify({
        state: {
          user: { id: user.id, email: user.email, displayName: user.displayName, role: user.role },
          token: user.token,
          isAuthenticated: true,
          mode: 'authenticated',
        },
        version: 0,
      }));
    }, SECURITY_USER_A);

    await page.goto('/app/dashboard');
    await page.waitForTimeout(500);

    // Verify current URL does not contain token
    const currentUrl = page.url();
    expect(currentUrl).not.toContain(SECURITY_USER_A.token);

    // Verify window globals do not leak token
    const tokenLeakedInWindow = await page.evaluate((tok) => {
      const win = window as any;
      return (
        win.token === tok ||
        win.authToken === tok ||
        win.jwt === tok ||
        win.userToken === tok
      );
    }, SECURITY_USER_A.token);
    expect(tokenLeakedInWindow).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // 5. Insecure Storage & Cleartext Credentials
  // ---------------------------------------------------------------------------
  test('React-06: Local storage stores zero plaintext passwords or secrets', async ({ page }) => {
    await page.goto('/app/concepts');
    await page.waitForTimeout(500);

    const allStorage = await page.evaluate(() => {
      const items: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k) items[k] = localStorage.getItem(k) || '';
      }
      return items;
    });

    const storageStr = JSON.stringify(allStorage).toLowerCase();
    expect(storageStr).not.toContain('password');
    expect(storageStr).not.toContain('secret_key');
    expect(storageStr).not.toContain('private_key');
  });

  // ---------------------------------------------------------------------------
  // 6. Redirect Validation
  // ---------------------------------------------------------------------------
  test('React-07: Open redirect attempts via returnUrl/redirect parameters are blocked', async ({ page }) => {
    for (const evilUrl of SECURITY_TEST_PAYLOADS.openRedirect) {
      await page.goto(`/?redirect=${encodeURIComponent(evilUrl)}`);
      await page.waitForTimeout(400);

      const targetUrl = page.url();
      const targetOrigin = new URL(targetUrl).origin;

      // Must stay within application origin; never follow open redirect to external evil origins
      expect(['http://localhost:5000', 'http://127.0.0.1:5000']).toContain(targetOrigin);
      expect(targetOrigin).not.toContain('attacker.example.com');
      expect(targetOrigin).not.toContain('evil.example.com');
    }
  });

  // ---------------------------------------------------------------------------
  // 7. Content Security Policy (CSP)
  // ---------------------------------------------------------------------------
  test('React-08: Content Security Policy enforces object-src none and frame-ancestors none', async ({ page }) => {
    const response = await page.goto('/');
    expect(response).not.toBeNull();
    const headers = response!.headers();
    const csp = headers['content-security-policy'] || '';

    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("default-src 'self'");
  });

  // ---------------------------------------------------------------------------
  // 8. Browser Security Headers
  // ---------------------------------------------------------------------------
  test('React-09: Required browser security headers are present with secure configurations', async ({ page }) => {
    const response = await page.goto('/');
    expect(response).not.toBeNull();
    const headers = response!.headers();

    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['permissions-policy']).toContain('camera=()');
    expect(headers['permissions-policy']).toContain('microphone=()');
    expect(headers['permissions-policy']).toContain('geolocation=()');
  });
});
