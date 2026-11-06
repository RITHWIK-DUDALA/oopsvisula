/**
 * OOPS LAB — Client-Side AST & Static Security Pre-Filter
 * Replicates the server-side AstSecurityValidator in TypeScript
 * Conforms to docs/architecture/SECURITY_ARCHITECTURE.md & BACKEND_ARCHITECTURE.md
 */

export interface SecurityScanResult {
  passed: boolean;
  violations: string[];
  primaryClass?: string;
}

const FORBIDDEN_IMPORT_PATTERNS = [
  /^java\.lang\.reflect(\..*)?$/,
  /^java\.lang\.invoke(\..*)?$/,
  /^java\.lang\.instrument(\..*)?$/,
  /^java\.lang\.management(\..*)?$/,
  /^java\.io\.(File|FileInputStream|FileOutputStream|RandomAccessFile|FileDescriptor)$/,
  /^java\.nio\.file(\..*)?$/,
  /^java\.net(\..*)?$/,
  /^java\.security(\..*)?$/,
  /^sun\.misc(\..*)?$/,
  /^jdk\.internal(\..*)?$/,
  /^com\.sun(\..*)?$/,
];

const FORBIDDEN_METHOD_CALLS = [
  /\bSystem\s*\.\s*exit\s*\(/,
  /\bRuntime\s*\.\s*getRuntime\s*\(\s*\)\s*\.\s*(exec|halt|exit)\s*\(/,
  /\bProcessBuilder\b/,
  /\bClass\s*\.\s*forName\s*\(/,
  /\bSystem\s*\.\s*(load|loadLibrary)\s*\(/,
  /\bMethodHandles\s*\.\s*lookup\s*\(/,
  /\b\w*\.?\s*(stop|suspend|resume)\s*\(/,
  /\bjava\.lang\.reflect\b/,
  /\bjava\.lang\.invoke\b/,
  /\bjava\.security\b/,
  /\bjava\.net\.(Socket|ServerSocket|URL|URI|HttpURLConnection)\b/,
  /\bjava\.io\.(File|FileInputStream|FileOutputStream|RandomAccessFile)\b/,
  /\bjava\.nio\.file\b/,
];

export const scanJavaSourceSecurity = (code: string): SecurityScanResult => {
  const violations: string[] = [];

  if (!code || code.trim().length === 0) {
    return { passed: false, violations: ['Source code cannot be empty.'] };
  }

  // 1. Scan for forbidden imports
  const importRegex = /import\s+(?:static\s+)?([a-zA-Z0-9_.]+);/g;
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    const importPath = match[1];
    for (const pattern of FORBIDDEN_IMPORT_PATTERNS) {
      if (pattern.test(importPath)) {
        violations.push(
          `Forbidden import: '${importPath}'. Restricted by student code execution security boundary.`
        );
        break;
      }
    }
  }

  // 2. Scan for forbidden method calls & inline types
  for (const pattern of FORBIDDEN_METHOD_CALLS) {
    const callMatch = pattern.exec(code);
    if (callMatch) {
      violations.push(
        `Forbidden system invocation or type usage: '${callMatch[0]}'. Sandbox restricts process termination, reflection, and external I/O.`
      );
    }
  }

  // 3. Extract primary public class name
  const classMatch = /public\s+(?:final\s+|abstract\s+)?(?:class|record|interface)\s+([A-Za-z0-9_]+)/.exec(code);
  const primaryClass = classMatch ? classMatch[1] : undefined;

  return {
    passed: violations.length === 0,
    violations,
    primaryClass,
  };
};

