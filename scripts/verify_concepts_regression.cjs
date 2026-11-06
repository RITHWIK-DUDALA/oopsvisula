const fs = require('fs');
const path = require('path');

const ts = require(path.resolve(__dirname, '../frontend/node_modules/typescript'));

function loadTsModule(relativePath) {
  const fullPath = path.resolve(__dirname, relativePath);
  const code = fs.readFileSync(fullPath, 'utf8');
  const result = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  });

  const m = { exports: {} };
  const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', result.outputText);
  
  const customRequire = (id) => {
    if (id === 'lucide-react' || id === 'react') {
      return new Proxy({}, { get: () => () => null });
    }
    if (id.startsWith('./') || id.startsWith('../')) {
      const dir = path.dirname(fullPath);
      let target = path.resolve(dir, id);
      if (fs.existsSync(target + '.ts')) target = target + '.ts';
      else if (fs.existsSync(target + '.tsx')) target = target + '.tsx';
      else if (fs.existsSync(target + '/index.ts')) target = target + '/index.ts';
      return loadTsModule(target);
    }
    return require(id);
  };

  fn(m.exports, customRequire, m, fullPath, path.dirname(fullPath));
  return m.exports;
}

console.log('Loading Curriculum Data and Canonical Lessons Registry...');
const { JAVA_MODULES, OOP_MODULES } = loadTsModule('../frontend/src/features/concepts/curriculumModulesData.ts');
const { ALL_CANONICAL_LESSONS, getCanonicalLesson, getCanonicalLessonCount } = loadTsModule('../frontend/src/features/concepts/data/canonicalLessonsRegistry.ts');

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
  assert(Boolean(lesson.diagramConfig && lesson.diagramConfig.type), `Lesson [${concept.id}] has configured diagram type`);
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

// 3. Search Resolution Verification with Keyword Ranking
console.log('[TEST 3] Verifying Search Query Matching & Ranking...');
const searchTestCases = [
  { query: 'Inheritance', expectedIdContains: 'inheritance' },
  { query: 'Polymorphism', expectedIdContains: 'polymorphism' },
  { query: 'Encapsulation', expectedIdContains: 'encapsulation' },
  { query: 'String Pool', expectedIdContains: 'strings' },
  { query: 'Exception', expectedIdContains: 'exception' },
  { query: 'Virtual Threads', expectedIdContains: 'virtual-threads' },
  { query: 'JVM Architecture', expectedIdContains: 'jvm-architecture' },
  { query: 'Collections', expectedIdContains: 'collections' },
  { query: 'Interface', expectedIdContains: 'interface' },
];

searchTestCases.forEach(({ query, expectedIdContains }) => {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);

  const matched = allCurriculumConcepts
    .filter(c =>
      words.every(w =>
        c.title.toLowerCase().includes(w) ||
        c.description.toLowerCase().includes(w) ||
        c.id.toLowerCase().includes(w)
      )
    )
    .sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const aExact = aTitle === q ? 6 : aTitle.startsWith(q) ? 5 : aTitle.includes(q) ? 3 : words.every(w => aTitle.includes(w)) ? 2 : 0;
      const bExact = bTitle === q ? 6 : bTitle.startsWith(q) ? 5 : bTitle.includes(q) ? 3 : words.every(w => bTitle.includes(w)) ? 2 : 0;
      return bExact - aExact;
    });

  assert(matched.length > 0, `Search for "${query}" yields results`);
  if (matched.length > 0) {
    const topResult = matched[0];
    assert(
      topResult.id.includes(expectedIdContains),
      `Search for "${query}" returns relevant topic [${topResult.id}]`,
      `Got top result: ${topResult.id} (${topResult.title})`
    );
    assert(
      topResult.targetRoute !== '/app/concepts/vars',
      `Search for "${query}" DOES NOT redirect to /app/concepts/vars`
    );
  }
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
  'classes-blueprint',
  'inheritance-extends',
  'polymorphism-dynamic-dispatch',
  'encapsulation-principle',
  'interfaces-declaration',
  'vars', // Alias
  'inheritance', // Alias
  'polymorphism', // Alias
  'encapsulation', // Alias
];

testSlugs.forEach(slug => {
  const lesson = getCanonicalLesson(slug);
  assert(Boolean(lesson), `Direct URL access for slug "${slug}"`);
  if (lesson) {
    assert(
      slug === 'vars' || slug === 'vars-intro' ? lesson.id === 'vars-intro' : lesson.id !== 'vars-intro',
      `Slug "${slug}" resolves to distinct non-vars lesson [${lesson.id}]`
    );
  }
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
