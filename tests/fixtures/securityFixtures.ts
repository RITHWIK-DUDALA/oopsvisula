/**
 * Security Testing Fixtures & Synthetic Test Accounts
 * Used exclusively for non-destructive, isolated local testing.
 */

export interface SyntheticAccount {
  id: string;
  email: string;
  displayName: string;
  role: 'student' | 'instructor';
  privilegeLevel: number;
  token: string;
  storageNamespace: string;
}

export const SECURITY_USER_A: SyntheticAccount = {
  id: 'user_sec_a_uuid_001',
  email: 'security_user_a@oops-lab.internal',
  displayName: 'Security User A (Student)',
  role: 'student',
  privilegeLevel: 1, // Standard unprivileged student
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyX3NlY19hX3V1aWRfMDAxIiwicm9sZSI6InN0dWRlbnQiLCJleHAiOjE5MjQ5ODQ0MDB9.synthetic_sig_a',
  storageNamespace: 'oops_lab_storage:user_sec_a_uuid_001:',
};

export const SECURITY_USER_B: SyntheticAccount = {
  id: 'user_sec_b_uuid_002',
  email: 'security_user_b@oops-lab.internal',
  displayName: 'Security User B (Instructor)',
  role: 'instructor',
  privilegeLevel: 2, // Elevated instructor privilege
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyX3NlY19iX3V1aWRfMDAyIiwicm9sZSI6Imluc3RydWN0b3IiLCJleHAiOjE5MjQ5ODQ0MDB9.synthetic_sig_b',
  storageNamespace: 'oops_lab_storage:user_sec_b_uuid_002:',
};

export const SECURITY_TEST_PAYLOADS = {
  xss: [
    '<img src=x onerror="console.warn(\'XSS_IMG_TRIGGERED\')">',
    '<script>console.warn("XSS_SCRIPT_TRIGGERED")</script>',
    'javascript:console.warn("XSS_JS_URL_TRIGGERED")',
    '"><svg/onload=console.warn("XSS_SVG_TRIGGERED")>',
    '"><iframe src="javascript:alert(1)">',
  ],
  domInjection: [
    '<div id="injected-payload-marker" data-test="injected">InjectedContent</div>',
    '"><b onmouseover="alert(1)">hover me</b>',
  ],
  openRedirect: [
    'https://attacker.example.com/exploit',
    '//evil.example.com/login',
    'javascript:alert(document.cookie)',
    '/\\evil.example.com',
  ],
  commandInjection: [
    '; echo "vulnerable_cmd_execution" > /tmp/pwned',
    '| dir',
    '& calc.exe',
    '`id`',
    '$(whoami)',
  ],
  pathTraversal: [
    '../../../../etc/passwd',
    '..\\..\\..\\..\\windows\\win.ini',
    '%2e%2e%2f%2e%2e%2fsecret.txt',
    '/etc/shadow',
  ],
  ssrf: [
    'http://169.254.169.254/latest/meta-data/',
    'http://127.0.0.1:22',
    'http://localhost:8080/admin',
    'file:///etc/passwd',
  ],
  sqlInjection: [
    "' OR '1'='1",
    "'; DROP TABLE users; --",
    "1' UNION SELECT username, password FROM users--",
  ],
  noSqlInjection: [
    '{"$gt": ""}',
    '{"$ne": null}',
    '{"$where": "this.password.length > 0"}',
  ],
  massAssignment: {
    role: 'admin',
    isSuperuser: true,
    permissions: ['all', 'delete_database', 'sudo'],
    isAdmin: true,
  },
};
