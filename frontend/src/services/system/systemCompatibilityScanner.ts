/**
 * OOPS LAB — Client-Side System Compatibility Scanner
 * Performs zero-dependency client feature detection to evaluate device suitability
 * for in-browser Java 21 AST compilation, deterministic JVM simulation, and 2D/3D graphics.
 */

export interface CompatibilityCheck {
  id: string;
  name: string;
  category: 'graphics' | 'storage' | 'display' | 'engine' | 'hardware';
  status: 'pass' | 'warn' | 'fail';
  detail: string;
  recommendation?: string;
}

export interface DeviceSpecs {
  os: string;
  browser: string;
  resolution: string;
  cores: number;
  memory: string;
  gpu: string;
}

export interface SystemCompatibilityResult {
  status: 'optimal' | 'compatible' | 'caution';
  score: number; // 0 to 100
  summary: string;
  checks: CompatibilityCheck[];
  deviceSpecs: DeviceSpecs;
}

export function detectDeviceSpecs(): DeviceSpecs {
  // Screen & Viewport
  const screenW = typeof window !== 'undefined' ? window.screen.width : 1920;
  const screenH = typeof window !== 'undefined' ? window.screen.height : 1080;
  const resolution = `${screenW} × ${screenH}`;

  // CPU Cores
  const cores = typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4;

  // Device Memory
  // @ts-expect-error - navigator.deviceMemory is standard in Chromium
  const rawMemory = typeof navigator !== 'undefined' ? navigator.deviceMemory : null;
  const memory = rawMemory ? `~${rawMemory} GB RAM` : 'Standard Memory';

  // OS & Browser detection
  let os = 'Unknown OS';
  let browser = 'Modern Browser';

  if (typeof navigator !== 'undefined') {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('CrOS')) os = 'ChromeOS';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    if (ua.includes('Edg/')) browser = 'Microsoft Edge';
    else if (ua.includes('Chrome/')) browser = 'Google Chrome';
    else if (ua.includes('Firefox/')) browser = 'Mozilla Firefox';
    else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Apple Safari';
  }

  // GPU detection
  let gpu = 'Hardware Graphics Accelerated';
  if (typeof document !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (gl) {
        const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const unmasked = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (unmasked) {
            gpu = String(unmasked).replace(/Direct3D.*vs_\d+_\d+/, '').trim();
          }
        }
      } else {
        gpu = 'Software Fallback (No WebGL)';
      }
    } catch {
      gpu = 'Standard Display Adapter';
    }
  }

  return {
    os,
    browser,
    resolution,
    cores,
    memory,
    gpu,
  };
}

export function runSystemCompatibilityScan(): SystemCompatibilityResult {
  const specs = detectDeviceSpecs();
  const checks: CompatibilityCheck[] = [];
  let score = 100;

  // 1. WebGL & Graphics Engine Check
  let hasWebGL2 = false;
  let hasWebGL = false;
  if (typeof document !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      hasWebGL2 = !!canvas.getContext('webgl2');
      hasWebGL = hasWebGL2 || !!canvas.getContext('webgl');
    } catch {
      hasWebGL = false;
    }
  }

  if (hasWebGL2) {
    checks.push({
      id: 'webgl',
      name: 'WebGL 2.0 Acceleration',
      category: 'graphics',
      status: 'pass',
      detail: `Supported (${specs.gpu})`,
    });
  } else if (hasWebGL) {
    checks.push({
      id: 'webgl',
      name: 'WebGL 1.0 Acceleration',
      category: 'graphics',
      status: 'pass',
      detail: 'Supported (Basic 3D / 2D Canvas enabled)',
    });
  } else {
    score -= 25;
    checks.push({
      id: 'webgl',
      name: 'WebGL Acceleration',
      category: 'graphics',
      status: 'warn',
      detail: 'Not detected — 2D canvas fallback will be used',
      recommendation: 'Enable hardware acceleration in browser settings for 3D Spatial Laboratory.',
    });
  }

  // 2. Client JVM Engine & AST Compatibility (ES2022, BigInt, Web Workers)
  const hasBigInt = typeof BigInt !== 'undefined';
  const hasWorkers = typeof window !== 'undefined' && typeof window.Worker !== 'undefined';
  const hasPromise = typeof Promise !== 'undefined';

  if (hasBigInt && hasWorkers && hasPromise) {
    checks.push({
      id: 'engine',
      name: 'JavaScript JVM AST Interpreter',
      category: 'engine',
      status: 'pass',
      detail: '100% Compatible (ES2022, Web Workers & AST Engine active)',
    });
  } else {
    score -= 20;
    checks.push({
      id: 'engine',
      name: 'JavaScript JVM AST Interpreter',
      category: 'engine',
      status: 'warn',
      detail: 'Partial feature support detected',
      recommendation: 'Update your browser to the latest version for optimum compiler performance.',
    });
  }

  // 3. Local-First Storage & Session Sandbox
  let hasLocalStorage = false;
  let hasIndexedDB = false;
  try {
    const testKey = '__oops_compat_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    hasLocalStorage = true;
  } catch {
    hasLocalStorage = false;
  }

  try {
    hasIndexedDB = typeof window !== 'undefined' && 'indexedDB' in window;
  } catch {
    hasIndexedDB = false;
  }

  if (hasLocalStorage && hasIndexedDB) {
    checks.push({
      id: 'storage',
      name: 'Local-First Storage & Sandbox',
      category: 'storage',
      status: 'pass',
      detail: 'Available (Offline storage & project persistence ready)',
    });
  } else if (hasLocalStorage) {
    checks.push({
      id: 'storage',
      name: 'Local-First Storage',
      category: 'storage',
      status: 'pass',
      detail: 'LocalStorage active (Guest sessions saved locally)',
    });
  } else {
    score -= 30;
    checks.push({
      id: 'storage',
      name: 'Local-First Storage',
      category: 'storage',
      status: 'fail',
      detail: 'Storage access blocked (Incognito or strict cookies disabled)',
      recommendation: 'Allow local storage cookies so code drafts and curriculum progress persist.',
    });
  }

  // 4. Viewport & Workspace Geometry
  const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
  if (width >= 1280) {
    checks.push({
      id: 'display',
      name: 'Workspace Geometry',
      category: 'display',
      status: 'pass',
      detail: `Optimal Viewport (${width}px width — full 3-panel split view supported)`,
    });
  } else if (width >= 768) {
    checks.push({
      id: 'display',
      name: 'Workspace Geometry',
      category: 'display',
      status: 'pass',
      detail: `Compatible (${width}px width — collapsible drawer mode active)`,
    });
  } else {
    score -= 10;
    checks.push({
      id: 'display',
      name: 'Workspace Geometry',
      category: 'display',
      status: 'warn',
      detail: `Compact Display (${width}px width)`,
      recommendation: 'A display width of 1280px or higher provides the best side-by-side code & memory inspection experience.',
    });
  }

  // 5. Multithreading & Hardware Concurrency
  if (specs.cores >= 4) {
    checks.push({
      id: 'hardware',
      name: 'Hardware Multithreading',
      category: 'hardware',
      status: 'pass',
      detail: `${specs.cores} Logical Cores — Smooth 60fps simulation physics`,
    });
  } else {
    checks.push({
      id: 'hardware',
      name: 'Hardware Multithreading',
      category: 'hardware',
      status: 'pass',
      detail: `${specs.cores} Core(s) — Standard simulation rate`,
    });
  }

  // Verdict calculation
  let status: 'optimal' | 'compatible' | 'caution' = 'optimal';
  let summary = 'Your system exceeds all requirements for local-first Java 21 OOP simulation.';

  if (score < 70) {
    status = 'caution';
    summary = 'Your system can run OOPS LAB, but some features (such as 3D visualizers or local project saving) may be limited.';
  } else if (score < 95) {
    status = 'compatible';
    summary = 'Your system is fully compatible with OOPS LAB. Standard 2D visualizers and code execution will run smoothly.';
  }

  return {
    status,
    score,
    summary,
    checks,
    deviceSpecs: specs,
  };
}

