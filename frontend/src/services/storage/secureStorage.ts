/**
 * OOPS LAB — Secure Browser Storage & Schema Sanitization Engine
 * Conforms to Master Specification: Local-First Security Boundary
 * 
 * Capabilities:
 * 1. Prototype pollution neutralization (recursive __proto__, constructor, prototype purge).
 * 2. Strict type schema validation and bounds checks.
 * 3. Quota-safe localStorage writes with fallback handling.
 * 4. Safe JSON parsing with graceful recovery from corrupted storage.
 * 5. Universal clear-data capability for complete reset.
 */

export const MAX_IMPORT_BYTES = 512 * 1024; // 512 KB max import
export const MAX_SNIPPET_BYTES = 64 * 1024;  // 64 KB per code snippet
export const MAX_SNIPPET_COUNT = 100;
export const MAX_TOPIC_COUNT = 300;

export interface SanitizedSavedSnippet {
  id: string;
  title: string;
  code: string;
  updatedAt: string;
}

export interface SanitizedLearnerSession {
  version: number;
  exportedAt: string;
  guestId: string;
  totalLabSeconds: number;
  simulationsRunCount: number;
  masteredTopics: string[];
  solvedChallengeIds: number[];
  savedSnippets: SanitizedSavedSnippet[];
}

/**
 * Deeply strips prototype pollution keys (__proto__, constructor, prototype)
 */
export function purgePrototypePollution<T>(input: T): T {
  if (input === null || typeof input !== 'object') {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((item) => purgePrototypePollution(item)) as unknown as T;
  }

  const cleanObj = Object.create(null);
  for (const [key, val] of Object.entries(input)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    cleanObj[key] = purgePrototypePollution(val);
  }
  return cleanObj as T;
}

/**
 * Safe JSON parser with size limits and prototype stripping
 */
export function safeJsonParse<T>(
  rawJson: string,
  validator: (val: unknown) => val is T,
  fallback: T,
  maxBytes: number = MAX_IMPORT_BYTES
): { success: boolean; data: T; error?: string } {
  if (!rawJson || typeof rawJson !== 'string') {
    return { success: false, data: fallback, error: 'Empty or invalid JSON payload.' };
  }

  if (rawJson.length > maxBytes) {
    return { success: false, data: fallback, error: `Payload exceeds size limit of ${Math.round(maxBytes / 1024)} KB.` };
  }

  try {
    const parsed = JSON.parse(rawJson);
    const sanitized = purgePrototypePollution(parsed);
    if (validator(sanitized)) {
      return { success: true, data: sanitized };
    }
    return { success: false, data: fallback, error: 'Payload failed schema validation.' };
  } catch (err) {
    return { success: false, data: fallback, error: `Malformed JSON: ${(err as Error).message}` };
  }
}

/**
 * Schema validator for learner session imports
 */
export function validateLearnerSession(obj: unknown): obj is SanitizedLearnerSession {
  if (!obj || typeof obj !== 'object') return false;
  const o = obj as Record<string, unknown>;

  if (typeof o.totalLabSeconds !== 'number' || o.totalLabSeconds < 0 || !Number.isFinite(o.totalLabSeconds)) return false;
  if (typeof o.simulationsRunCount !== 'number' || o.simulationsRunCount < 0) return false;
  if (!Array.isArray(o.masteredTopics) || o.masteredTopics.length > MAX_TOPIC_COUNT) return false;
  if (!Array.isArray(o.solvedChallengeIds)) return false;

  // Validate masteredTopics strings
  for (const t of o.masteredTopics) {
    if (typeof t !== 'string' || t.length > 120) return false;
  }

  // Validate savedSnippets
  if (Array.isArray(o.savedSnippets)) {
    if (o.savedSnippets.length > MAX_SNIPPET_COUNT) return false;
    for (const snip of o.savedSnippets) {
      if (!snip || typeof snip !== 'object') return false;
      const s = snip as Record<string, unknown>;
      if (typeof s.id !== 'string' || typeof s.title !== 'string' || typeof s.code !== 'string') return false;
      if (s.code.length > MAX_SNIPPET_BYTES) return false;
    }
  }

  return true;
}

/**
 * Safely persists to localStorage with quota overflow recovery
 */
export function safeLocalStorageSet(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`[SecureStorage] localStorage write failed for key "${key}":`, err);
    return false;
  }
}

/**
 * Universal clear-data function: purges all application state from localStorage
 */
export function clearAllApplicationStorage(): void {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('oops') || key.startsWith('oopslab'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    console.error('[SecureStorage] Error clearing storage:', e);
  }
}

