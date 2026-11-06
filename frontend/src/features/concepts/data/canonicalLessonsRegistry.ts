import { CanonicalLesson, MODULE_04_LESSONS } from './module04Data';
import { JAVA_MODULES_LESSONS } from './javaModulesLessons';
import { OOP_MODULES_LESSONS } from './oopModulesLessons';

/**
 * Authoritative Canonical Lesson Registry
 * 
 * Provides unified, individualized lesson retrieval across 100% of the
 * 184 curriculum concepts in both Java and OOP learning tracks.
 */

// Legacy and convenience slug aliases mapped to canonical concept IDs
const SLUG_ALIASES: Record<string, string> = {
  'vars': 'vars-intro',
  'variables': 'vars-intro',
  'methods': 'methods-decl',
  'classes': 'classes-blueprint',
  'constructors': 'constructors-default',
  'encapsulation': 'encapsulation-principle',
  'encapsulation-intro': 'encapsulation-principle',
  'relationships': 'rel-association',
  'inheritance': 'inheritance-extends',
  'polymorphism': 'polymorphism-subtype',
  'interfaces': 'interfaces-declaration',
  'interface': 'interfaces-declaration',
  'records': 'modern-records',
  'sealed': 'adv-sealed-classes',
  'pattern-matching': 'modern-pattern-instanceof',
  'exceptions': 'exceptions-hierarchy',
  'strings': 'strings-literals',
  'arrays': 'arrays-1d',
  'collections': 'collections-overview',
  'threads': 'threads-lifecycle',
  'multithreading': 'threads-lifecycle',
};

// Unified map containing all 184 canonical lessons
export const ALL_CANONICAL_LESSONS: Record<string, CanonicalLesson> = {
  ...MODULE_04_LESSONS,
  ...JAVA_MODULES_LESSONS,
  ...OOP_MODULES_LESSONS,
};

/**
 * Retrieve a canonical lesson by its exact unique ID or slug alias.
 */
export function getCanonicalLesson(conceptId?: string): CanonicalLesson | null {
  if (!conceptId) return null;

  // Direct ID match
  if (ALL_CANONICAL_LESSONS[conceptId]) {
    return ALL_CANONICAL_LESSONS[conceptId];
  }

  // Alias lookup
  const resolvedAlias = SLUG_ALIASES[conceptId.toLowerCase()];
  if (resolvedAlias && ALL_CANONICAL_LESSONS[resolvedAlias]) {
    return ALL_CANONICAL_LESSONS[resolvedAlias];
  }

  // Slug normalization (e.g. trailing slashes, case-insensitivity)
  const normalizedId = conceptId.trim().toLowerCase();
  for (const [key, lesson] of Object.entries(ALL_CANONICAL_LESSONS)) {
    if (key.toLowerCase() === normalizedId || lesson.slug.toLowerCase() === normalizedId) {
      return lesson;
    }
  }

  return null;
}

/**
 * Get total number of registered canonical lessons.
 */
export function getCanonicalLessonCount(): number {
  return Object.keys(ALL_CANONICAL_LESSONS).length;
}
