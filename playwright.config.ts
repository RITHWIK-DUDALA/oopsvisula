import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for OOPS LAB Security Testing Suite
 * Connects to running frontend instance at http://localhost:5000
 */
export default defineConfig({
  testDir: './tests/security',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false, // Run security tests deterministically
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: 'PRODUCTION_AUDIT/SECURITY/playwright_raw_results.json' }],
  ],
  use: {
    baseURL: 'http://localhost:5000',
    trace: 'off',
    video: 'off',
    screenshot: 'off',
    channel: 'chrome',
    headless: true,
  },
  projects: [
    {
      name: 'security-chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: true,
      },
    },
  ],
});
