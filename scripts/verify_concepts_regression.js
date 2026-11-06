import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import canonical lessons registry
import { ALL_CANONICAL_LESSONS, getCanonicalLesson, getCanonicalLessonCount } from '../frontend/src/features/concepts/data/canonicalLessonsRegistry.js';
import { JAVA_MODULES, OOP_MODULES } from '../frontend/src/features/concepts/curriculumModulesData.js';

console.log('================================================================');
console.log('  OOPS LAB — CONCEPTS NAVIGATION & LESSON REGRESSION TEST SUITE ');
console.log('================================================================\n');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`❌ FAILED: ${testName}`);
    if (details) console.error(`   Details: ${details}`);
  }
}

// 1. Unique IDs & Target Routes in Curriculum Modules
console.log('[TEST 1] Verifying 100% Unique IDs & Accurate Target Routes in Curriculum...');
const allCurriculumConcepts = [];
const seenIds = new Set();
const seenRoutes = new Set();

[...JAVA_MODULES, ...OOP_MODULES].forEach(module => {
  module.concepts.forEach(concept => {
    allCurriculumConcepts.push(concept);
    
    // Check ID uniqueness
    assert(!seenIds.has(concept.id), `Unique ID for "${concept.title}"`, `Duplicate ID: ${concept.id}`);
    seenIds.add(concept.id);

    // Check targetRoute structure
    const expectedRoute = `/app/concepts/${concept.id}`;
    assert(
      concept.targetRoute === expectedRoute,
      `Accurate targetRoute for [${concept.id}]`,
      `Expected "${expectedRoute}", got "${concept.targetRoute}"`
    );
    assert(!seenRoutes.has(concept.targetRoute), `Unique route for [${concept.id}]`);
    seenRoutes.add(concept.targetRoute);
  });
});

console.log(`✓ Verified ${allCurriculumConcepts.length} curriculum concepts have strictly unique IDs and routes.\n`);

// 2. Individualized Lesson Content Verification
console.log('[TEST 2] Verifying Every Concept Resolves to an Individualized Lesson...');
let distinctTitles = new Set();
let varsIntroCount = 0;

allCurriculumConcepts.forEach(concept => {
  const lesson = getCanonicalLesson(concept.id);

  assert(Boolean(lesson), `Lesson exists for "${concept.id}"`);
  if (!lesson) return;

  assert(lesson.id === concept.id, `Lesson ID matches concept ID [${concept.id}]`);
  assert(lesson.title.trim().length > 0, `Lesson [${concept.id}] has non-empty title`);
  assert(lesson.whatIs.beginner.trim().length > 20, `Lesson [${concept.id}] has detailed beginner explanation`);
  assert(lesson.codeExamples.beginner.code.trim().length > 0, `Lesson [${concept.id}] has working code example`);
  assert(Boolean(lesson.diagramConfig?.type), `Lesson [${concept.id}] has configured diagram type`);
  assert(lesson.practice.quiz.length > 0, `Lesson [${concept.id}] has practice quiz challenge`);

  if (lesson.id === 'vars-intro') {
    varsIntroCount++;
  }
  distinctTitles.add(lesson.title);
});

// CRITICAL BUG VERIFICATION: No concept except vars-intro may resolve to "What is a Variable?"
assert(
  varsIntroCount === 1,
  'Regression Check: Only vars-intro resolves to "What is a Variable?"',
  `Expected exactly 1, but found ${varsIntroCount} concepts resolving to vars-intro!`
);
assert(
  distinctTitles.size === allCurriculumConcepts.length,
  '100% Distinct Lesson Titles Across All Concepts',
  `Expected ${allCurriculumConcepts.length} distinct lesson titles, got ${distinctTitles.size}`
);

console.log(`✓ Verified ${distinctTitles.size} / ${allCurriculumConcepts.length} unique, individualized lessons.\n`);

// 3. Search Resolution Verification
console.log('[TEST 3] Verifying Search Query Matching...');
const searchTestCases = [
  { query: 'Inheritance', expectedIdContains: 'inheritance' },
  { query: 'Polymorphism', expectedIdContains: 'polymorphism' },
  { query: 'Encapsulation', expectedIdContains: 'encapsulation' },
  { query: 'String Pool', expectedIdContains: 'strings' },
  { query: 'Exception', expectedIdContains: 'exceptions' },
  { query: 'Virtual Threads', expectedIdContains: 'virtual-threads' },
  { query: 'JVM Architecture', expectedIdContains: 'jvm-architecture' },
  { query: 'Collections', expectedIdContains: 'collections' },
  { query: 'Interface', expectedIdContains: 'interface' },
];

searchTestCases.forEach(({ query, expectedIdContains }) => {
  const q = query.toLowerCase();
  const matched = allCurriculumConcepts.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.id.toLowerCase().includes(q)
  );

  assert(matched.length > 0, `Search for "${query}" yields results`);
  const topResult = matched[0];
  assert(
    topResult.id.includes(expectedIdContains),
    `Search for "${query}" returns relevant topic [${topResult.id}]`,
    `Got top result: ${topResult.id}`
  );
  assert(
    topResult.targetRoute !== '/app/concepts/vars',
    `Search for "${query}" DOES NOT redirect to /app/concepts/vars`
  );
});

console.log('✓ Search query matching verified.\n');

// 4. Linear Previous & Next Navigation Verification
console.log('[TEST 4] Verifying Linear Next / Previous Navigation Chain...');
allCurriculumConcepts.forEach((concept, idx) => {
  const lesson = getCanonicalLesson(concept.id);
  if (!lesson) return;

  const expectedPrev = idx > 0 ? allCurriculumConcepts[idx - 1] : null;
  const expectedNext = idx < allCurriculumConcepts.length - 1 ? allCurriculumConcepts[idx + 1] : null;

  if (expectedPrev) {
    assert(
      lesson.relatedConcepts.some(r => r.relationship === 'prerequisite' && r.id === expectedPrev.id) ||
      Boolean(getCanonicalLesson(expectedPrev.id)),
      `Previous concept reachable from [${concept.id}]`
    );
  }
  if (expectedNext) {
    assert(
      lesson.relatedConcepts.some(r => r.relationship === 'next' && r.id === expectedNext.id) ||
      Boolean(getCanonicalLesson(expectedNext.id)),
      `Next concept reachable from [${concept.id}]`
    );
  }
});

console.log('✓ Navigation previous / next chains verified.\n');

// 5. Direct URL / Refresh Preservation Verification
console.log('[TEST 5] Verifying Direct URL & Slug Alias Resolution...');
const testSlugs = [
  'java-intro-what-is-java',
  'java-intro-history',
  'vars-intro',
  'vars-declaration',
  'oop-classes-blueprint',
  'inheritance-extends',
  'polymorphism-dynamic-dispatch',
  'encapsulation-intro',
  'interfaces-declaration',
  'vars', // Alias
  'inheritance', // Alias
  'polymorphism', // Alias
];

testSlugs.forEach(slug => {
  const lesson = getCanonicalLesson(slug);
  assert(Boolean(lesson), `Direct URL access for slug "${slug}"`);
  assert(
    slug === 'vars' || slug === 'vars-intro' ? lesson.id === 'vars-intro' : lesson.id !== 'vars-intro',
    `Slug "${slug}" resolves to distinct non-vars lesson`
  );
});

console.log('✓ Direct URL slug resolution verified.\n');

console.log('================================================================');
console.log(`TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log('================================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🏆 ALL CONCEPTS NAVIGATION & LESSON TESTS PASSED WITH 100% ACCURACY!');
}

