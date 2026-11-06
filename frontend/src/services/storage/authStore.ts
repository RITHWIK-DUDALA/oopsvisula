import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  name: string;
  email: string;
  token?: string;
}

export interface PasswordValidationResult {
  valid: boolean;
  errors: string[];
  score: number; // 0 to 4
}

/**
 * Validates password complexity per OWASP ASVS v4.0 Level 2 guidelines:
 * - Minimum 8 characters
 * - Requires uppercase, lowercase, number, and special character
 */
export function validatePasswordStrength(password: string): PasswordValidationResult {
  const errors: string[] = [];
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters in length.');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter.');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter.');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one numeric digit.');
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push('Password must contain at least one special character.');
  }

  const score = Math.max(0, 5 - errors.length);
  return {
    valid: errors.length === 0,
    errors,
    score,
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  user: AuthUser | null;
  csrfToken: string | null;
  failedAttempts: number;
  lockedUntilMs: number | null;

  // Actions
  enterAsGuest: () => void;
  signIn: (email: string, name?: string, token?: string) => { success: boolean; error?: string };
  signOut: () => void;
  recordFailedLogin: () => { locked: boolean; remainingLockoutSeconds: number };
  resetFailedAttempts: () => void;
}

function generateSecureToken(prefix: string): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return prefix + Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
  }
  return prefix + Math.random().toString(36).substring(2, 15);
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isGuest: true,
      user: null,
      csrfToken: null,
      failedAttempts: 0,
      lockedUntilMs: null,

      enterAsGuest: () =>
        set({
          isAuthenticated: false,
          isGuest: true,
          user: null,
          csrfToken: generateSecureToken('guest-csrf-'),
        }),

      signIn: (email: string, name?: string, token?: string) => {
        const state = get();
        const now = Date.now();
        if (state.lockedUntilMs && state.lockedUntilMs > now) {
          const waitSec = Math.ceil((state.lockedUntilMs - now) / 1000);
          return {
            success: false,
            error: `Too many failed login attempts. Account temporarily locked for ${waitSec} seconds.`,
          };
        }

        const derivedName = name || email.split('@')[0] || 'Java Student';
        const capitalized = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
        const generatedToken = token || generateSecureToken('jwt-sec-');
        const generatedCsrf = generateSecureToken('csrf-sec-');

        set({
          isAuthenticated: true,
          isGuest: false,
          user: {
            email,
            name: capitalized,
            token: generatedToken,
          },
          csrfToken: generatedCsrf,
          failedAttempts: 0,
          lockedUntilMs: null,
        });

        return { success: true };
      },

      signOut: () =>
        set({
          isAuthenticated: false,
          isGuest: true,
          user: null,
          csrfToken: null,
          failedAttempts: 0,
          lockedUntilMs: null,
        }),

      recordFailedLogin: () => {
        const state = get();
        const attempts = state.failedAttempts + 1;
        let lockedUntilMs = null;

        // Progressive lockout: after 5 attempts, lock for 30 seconds; after 10, lock for 300 seconds
        if (attempts >= 10) {
          lockedUntilMs = Date.now() + 300_000;
        } else if (attempts >= 5) {
          lockedUntilMs = Date.now() + 30_000;
        }

        set({ failedAttempts: attempts, lockedUntilMs });
        const remainingLockoutSeconds = lockedUntilMs ? Math.ceil((lockedUntilMs - Date.now()) / 1000) : 0;
        return { locked: lockedUntilMs !== null, remainingLockoutSeconds };
      },

      resetFailedAttempts: () => {
        set({ failedAttempts: 0, lockedUntilMs: null });
      },
    }),
    {
      name: 'oopslab-auth-v2',
    }
  )
);

