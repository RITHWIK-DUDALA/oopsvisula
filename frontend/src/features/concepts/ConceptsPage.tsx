import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { OOPS_LOGO_PATHS, OOPS_LOGO_FILL_COLORS } from '@/components/LogoTraceLoader';
import { AeroShards } from '@/components/AeroShards';
import { ApplicationTransition } from '@/features/transition/ApplicationTransition';
import {
  JAVA_MODULES,
  OOP_MODULES,
  DifficultyLevel,
} from './curriculumModulesData';

// Helper for rendering difficulty badges with exact color tokens
const renderDifficultyBadge = (difficulty: DifficultyLevel) => {
  switch (difficulty) {
    case 'Beginner':
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5]/80 text-[#065F46] border border-[#A7F3D0]/50 shrink-0">
          Beginner
        </span>
      );
    case 'Core':
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF7ED]/80 text-[#C2410C] border border-[#FED7AA]/50 shrink-0">
          Core
        </span>
      );
    case 'Intermediate':
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF]/80 text-[#1E40AF] border border-[#BFDBFE]/50 shrink-0">
          Intermediate
        </span>
      );
    case 'Advanced':
    default:
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F8FAFC]/80 text-[#475569] border border-[#E2E8F0]/50 shrink-0">
          Advanced
        </span>
      );
  }
};

export const ConceptsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const trackParam = (searchParams.get('track') as 'java' | 'oop' | null);
  const [selectedTrack, setSelectedTrack] = useState<'java' | 'oop'>(() => trackParam === 'oop' ? 'oop' : 'java');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // If entering immediately after the landing page's application transition, avoid duplicate loading
  const shouldSkipInitialLoading = Boolean((location.state as { fromLanding?: boolean } | null)?.fromLanding);
  const [isInitialLoading, setIsInitialLoading] = useState(!shouldSkipInitialLoading);

  // Track independent expanded module IDs per track
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    () => new Set([trackParam === 'oop' ? 'oop-01' : 'java-01'])
  );

  // Sync if URL query param changes externally
  useEffect(() => {
    if (trackParam === 'oop' || trackParam === 'java') {
      if (trackParam !== selectedTrack) {
        setSelectedTrack(trackParam);
        setExpandedModules(new Set([trackParam === 'oop' ? 'oop-01' : 'java-01']));
      }
    }
  }, [trackParam]);

  const activeModules = selectedTrack === 'java' ? JAVA_MODULES : OOP_MODULES;

  // Coordinated Java / OOP track switching transition states
  const [isTrackTransitioning, setIsTrackTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'exiting' | 'sharding' | 'entering' | 'fading'>('idle');
  const [pendingTrack, setPendingTrack] = useState<'java' | 'oop' | null>(null);

  const transitionTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Clean up any pending transition timers on unmount
  useEffect(() => {
    return () => {
      transitionTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Coordinated track switch handler with 4-phase AeroShards transition
  const handleSelectTrack = (track: 'java' | 'oop') => {
    // Prevent duplicate switching while transition is active or clicking current track
    if (track === selectedTrack || isTrackTransitioning) return;

    setSearchParams({ track });

    // Respect reduced-motion preference: instant switch with no GPU shards
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSelectedTrack(track);
      const defaultFirstId = track === 'java' ? 'java-01' : 'oop-01';
      setExpandedModules(new Set([defaultFirstId]));
      return;
    }

    // Clear previous timeouts
    transitionTimeoutsRef.current.forEach(clearTimeout);
    transitionTimeoutsRef.current = [];

    // Phase 1: User switches tracks (0ms - 150ms)
    // Register destination track, begin content exit and trigger AeroShards overlay
    setIsTrackTransitioning(true);
    setTransitionPhase('exiting');
    setPendingTrack(track);

    // Phase 2: Shards sweep horizontally into view (150ms - 450ms)
    const t1 = setTimeout(() => {
      setTransitionPhase('sharding');
    }, 150);

    // Phase 3: Track changes, new curriculum enters (450ms - 700ms)
    const t2 = setTimeout(() => {
      setSelectedTrack(track);
      const defaultFirstId = track === 'java' ? 'java-01' : 'oop-01';
      setExpandedModules(new Set([defaultFirstId]));
      setTransitionPhase('entering');
    }, 450);

    // Phase 4: Shards fade out smoothly (700ms - 900ms)
    const t3 = setTimeout(() => {
      setTransitionPhase('fading');
    }, 700);

    // Completion: Clean unmount, restore normal interaction (900ms)
    const t4 = setTimeout(() => {
      setIsTrackTransitioning(false);
      setTransitionPhase('idle');
      setPendingTrack(null);
    }, 900);

    transitionTimeoutsRef.current = [t1, t2, t3, t4];
  };

  // Toggle module expansion independently
  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  // Filter modules and concepts based on search query with intelligent keyword ranking
  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return activeModules.map((m) => ({
        ...m,
        matchingConcepts: m.concepts,
      }));
    }

    const words = query.split(/\s+/).filter(Boolean);

    return activeModules
      .map((m) => {
        const moduleMatches = words.every((w) =>
          m.title.toLowerCase().includes(w) ||
          m.description.toLowerCase().includes(w) ||
          m.difficulty.toLowerCase().includes(w)
        );

        const matchingConcepts = m.concepts.filter((c) =>
          words.every((w) =>
            c.title.toLowerCase().includes(w) ||
            c.description.toLowerCase().includes(w) ||
            c.id.toLowerCase().includes(w) ||
            c.difficulty.toLowerCase().includes(w)
          )
        ).sort((a, b) => {
          // Rank title matches above descriptions
          const aTitle = a.title.toLowerCase();
          const bTitle = b.title.toLowerCase();
          const aExact = aTitle === query ? 6 : aTitle.startsWith(query) ? 5 : aTitle.includes(query) ? 3 : words.every((w) => aTitle.includes(w)) ? 2 : 0;
          const bExact = bTitle === query ? 6 : bTitle.startsWith(query) ? 5 : bTitle.includes(query) ? 3 : words.every((w) => bTitle.includes(w)) ? 2 : 0;
          return bExact - aExact;
        });

        if (moduleMatches && matchingConcepts.length === 0) {
          return {
            ...m,
            matchingConcepts: m.concepts,
          };
        }

        if (matchingConcepts.length > 0) {
          return {
            ...m,
            matchingConcepts,
          };
        }

        return null;
      })
      .filter((m): m is NonNullable<typeof m> => m !== null);
  }, [activeModules, search]);

  // When actively searching, automatically expand all matching modules
  const isModuleExpanded = (moduleId: string) => {
    if (search.trim().length > 0) return true;
    return expandedModules.has(moduleId);
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-[#17191D] pb-16 selection:bg-[#075CF5]/10 selection:text-[#075CF5]">
      {/* Entering Concepts Page Loading Animation Overlay */}
      <ApplicationTransition
        isOpen={isInitialLoading}
        title="OOPS LAB"
        subtitle="Concepts & Curriculum"
        initialStatus="Loading Java & OOP Curriculum..."
        backdropVariant="translucent"
        stages={[
          { timeMs: 350, text: 'Indexing Java 21 Modules...' },
          { timeMs: 700, text: 'Preparing Interactive Visualizations...', isComplete: true },
          { timeMs: 1050, text: 'Curriculum Ready' },
        ]}
        durationMs={1200}
        onComplete={() => setIsInitialLoading(false)}
      />

      {/* Ambient Flowing Background Waves (Soft, low-opacity, restrained) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] overflow-hidden z-0">
        <svg
          viewBox="0 0 1440 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-40 preserve-3d"
        >
          <path
            d="M-80 120 C 320 200, 720 40, 1120 140 C 1320 190, 1480 160, 1560 140"
            stroke="#075CF5"
            strokeWidth="1.2"
            strokeOpacity="0.12"
            fill="none"
          />
          <path
            d="M-40 180 C 360 260, 800 90, 1200 200 C 1380 250, 1500 220, 1580 200"
            stroke="#FF7A00"
            strokeWidth="0.9"
            strokeOpacity="0.08"
            fill="none"
          />
          <path
            d="M-100 240 C 280 320, 700 160, 1100 270 C 1340 330, 1460 300, 1540 280"
            stroke="#075CF5"
            strokeWidth="0.75"
            strokeOpacity="0.06"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 p-4 sm:p-8 max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-150">
        {/* ========================================================= */}
        {/* SECTION 1: APPROVED LEARNING CENTRE HERO                  */}
        {/* ========================================================= */}
        <header className="space-y-2 pt-2 sm:pt-4">
          {/* Eyebrow: LEARNING CENTRE with small orange horizontal accent */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#075CF5]">
              LEARNING CENTRE
            </span>
            <span className="w-3 h-1 bg-[#FF7A00] rounded-full inline-block" />
          </div>

          {/* Main heading: Master Java & OOP (clean typography, no selection artifacts) */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#17191D]">
            <span className="text-[#17191D]">Master </span>
            <span className="text-[#075CF5]">Java</span>
            <span className="text-[#17191D]"> & </span>
            <span className="text-[#FF7A00]">OOP</span>
          </h1>

          {/* Supporting text: Subdued dark blue/grey, single line where possible */}
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-2xl">
            Explore core concepts, build a strong foundation, and learn by doing.
          </p>
        </header>

        {/* ========================================================= */}
        {/* SECTION 2: TWO HORIZONTAL LEARNING-TRACK SELECTORS        */}
        {/* ========================================================= */}
        <div className="relative">
          {/* Temporary AeroShards Glass Shard Transition Overlay (Phase 2 & 3) */}
          {isTrackTransitioning && (
            <div
              className={`absolute -inset-1.5 z-20 pointer-events-none overflow-hidden rounded-3xl transition-opacity duration-250 ease-out ${
                transitionPhase === 'fading' ? 'opacity-0' : 'opacity-100'
              }`}
              aria-hidden="true"
            >
              <AeroShards
                shardColor="#075CF5"
                accentColor="#FF8500"
                backgroundColor="transparent"
                lightMode={true}
                placement="full"
                material="glass"
                markers="none"
                count={550}
                depthOfField={0.45}
                glow={0.18}
                grain={0}
                vignette={0.1}
                intro={true}
                mouseInteraction={false}
                pulseOnClick={false}
                holdToGather={false}
                paused={false}
                dpr={1}
                className="w-full h-full"
              />
            </div>
          )}

          <section aria-label="Learning Track Selectors" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Track 1: Java Programming */}
            <div
              role="button"
              tabIndex={0}
              aria-pressed={selectedTrack === 'java'}
              onClick={() => handleSelectTrack('java')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectTrack('java');
                }
              }}
              className={`relative p-5 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer select-none flex items-center justify-between border ${
                selectedTrack === 'java'
                  ? 'bg-[#F8FAFF]/90 border-[#075CF5] shadow-[0_4px_24px_rgba(7,92,245,0.06)] backdrop-blur-xs scale-[1.005]'
                  : 'bg-white/60 backdrop-blur-xs border-[#E5E7EB]/70 hover:border-[#CBD5E1] hover:bg-white/90 shadow-none'
              } ${
                isTrackTransitioning && pendingTrack === 'java'
                  ? 'ring-2 ring-[#075CF5]/40'
                  : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                {/* Java Official Brand Cup / Steam Icon */}
                <div className="w-11 h-11 rounded-xl bg-white/80 border border-[#E5E7EB]/60 shadow-none flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
                    {/* Red / Orange Steam */}
                    <path
                      d="M13 5 C 15 7, 12 9, 14 11"
                      stroke="#FF7A00"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M17 4 C 19 6, 16 8, 18 10"
                      stroke="#EF4444"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    {/* Blue Java Cup */}
                    <path
                      d="M8 13 H22 V19 C22 22 19 24 15 24 C11 24 8 22 8 19 Z"
                      fill="#075CF5"
                      fillOpacity="0.12"
                      stroke="#075CF5"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    {/* Cup Handle */}
                    <path
                      d="M22 15 H24.5 C25.5 15 26.5 16 26.5 17 C26.5 18 25.5 19 24.5 19 H22"
                      stroke="#075CF5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    {/* Base Saucer */}
                    <path
                      d="M7 26 H23"
                      stroke="#075CF5"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h2 className="text-base font-bold text-[#17191D]">Java Programming</h2>
                  <p className="text-xs text-[#64748B] mt-0.5">Learn Java from basics to advanced.</p>
                </div>
              </div>

              {/* Restrained Orange Curved Corner Accent (Active State) */}
              {selectedTrack === 'java' && (
                <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-br-2xl">
                  <svg viewBox="0 0 32 32" className="w-full h-full fill-none">
                    <path d="M 0 32 Q 22 28 32 0 L 32 32 Z" fill="#FF7A00" opacity="0.95" />
                  </svg>
                </div>
              )}
            </div>

            {/* Track 2: Object-Oriented Programming */}
            <div
              role="button"
              tabIndex={0}
              aria-pressed={selectedTrack === 'oop'}
              onClick={() => handleSelectTrack('oop')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectTrack('oop');
                }
              }}
              className={`relative p-5 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer select-none flex items-center justify-between border ${
                selectedTrack === 'oop'
                  ? 'bg-[#F8FAFF]/90 border-[#075CF5] shadow-[0_4px_24px_rgba(7,92,245,0.06)] backdrop-blur-xs scale-[1.005]'
                  : 'bg-white/60 backdrop-blur-xs border-[#E5E7EB]/70 hover:border-[#CBD5E1] hover:bg-white/90 shadow-none'
              } ${
                isTrackTransitioning && pendingTrack === 'oop'
                  ? 'ring-2 ring-[#075CF5]/40'
                  : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                {/* OOPS LAB Approved 3-Layer Geometric Symbol */}
                <div className="w-11 h-11 rounded-xl bg-white/80 border border-[#E5E7EB]/60 shadow-none flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 100 100" className="w-7 h-7">
                    {OOPS_LOGO_PATHS.map((pathStr, index) => (
                      <path
                        key={index}
                        d={pathStr}
                        fill={OOPS_LOGO_FILL_COLORS[index]}
                        stroke="#17191D"
                        strokeWidth={1.5}
                        strokeLinejoin="round"
                      />
                    ))}
                  </svg>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h2 className="text-base font-bold text-[#17191D]">Object-Oriented Programming</h2>
                  <p className="text-xs text-[#64748B] mt-0.5">Master OOP concepts, design and implementation.</p>
                </div>
              </div>

              {/* Restrained Orange Curved Corner Accent (Active State) */}
              {selectedTrack === 'oop' && (
                <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-br-2xl">
                  <svg viewBox="0 0 32 32" className="w-full h-full fill-none">
                    <path d="M 0 32 Q 22 28 32 0 L 32 32 Z" fill="#FF7A00" opacity="0.95" />
                  </svg>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Coordinated Crossfading Curriculum Area (Phase 1, 3 & 4) */}
        <div
          className={`space-y-6 sm:space-y-8 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            transitionPhase === 'exiting'
              ? 'opacity-40 -translate-y-1'
              : transitionPhase === 'sharding'
              ? 'opacity-0 translate-y-1.5'
              : transitionPhase === 'entering'
              ? 'opacity-85 translate-y-0.5'
              : 'opacity-100 translate-y-0'
          }`}
        >
          {/* ========================================================= */}
          {/* SECTION 3: CURRICULUM HEADER & SEARCH TOOLBAR             */}
          {/* ========================================================= */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          {/* Header with vertical orange accent */}
          <div className="flex items-center">
            <div className="w-1 h-5 bg-[#FF7A00] rounded-full mr-2.5 shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#17191D]">
                {selectedTrack === 'java'
                  ? 'Java Programming Curriculum'
                  : 'Object-Oriented Programming Curriculum'}
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                {selectedTrack === 'java'
                  ? 'A structured path from fundamentals to advanced concepts.'
                  : 'A structured path from OOP foundations to advanced object-oriented design.'}
              </p>
            </div>
          </div>

          {/* Search Field (aligned right on desktop) */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] stroke-[1.8]" />
            <input
              type="text"
              placeholder="Search concepts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-white/60 backdrop-blur-xs border border-[#E5E7EB]/70 rounded-lg text-xs text-[#17191D] placeholder-[#94A3B8] focus:bg-white focus:border-[#075CF5] focus:outline-hidden transition-colors font-sans shadow-none"
            />
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: MODULE ACCORDION STRUCTURE                     */}
        {/* ========================================================= */}
        <section aria-label="Curriculum Modules" className="space-y-3">
          {filteredModules.length === 0 ? (
            <div className="p-12 text-center bg-white/50 backdrop-blur-xs border border-[#E5E7EB]/60 rounded-2xl shadow-none space-y-2">
              <p className="text-sm font-semibold text-[#17191D]">No concepts found</p>
              <p className="text-xs text-[#64748B]">
                No lessons or modules matched your search "{search}". Try searching for another term.
              </p>
              <button
                onClick={() => setSearch('')}
                className="mt-2 text-xs font-semibold text-[#075CF5] hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredModules.map((module) => {
              const isExpanded = isModuleExpanded(module.id);

              return (
                <div
                  key={module.id}
                  className={`bg-white/50 backdrop-blur-xs rounded-2xl overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-none ${
                    isExpanded
                      ? 'border border-[#CBD5E1]/90 bg-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
                      : 'border border-[#E5E7EB]/60 hover:bg-white/75 hover:border-[#CBD5E1]/80'
                  }`}
                >
                  {/* MODULE HEADER: 4 distinct visual regions */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onClick={() => toggleModule(module.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleModule(module.id);
                      }
                    }}
                    className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none hover:bg-black/[0.015] transition-colors"
                  >
                    {/* LEFT REGION: Module Number Badge, Title & Description */}
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      {/* Compact Warm Light-Orange Badge */}
                      <span className="w-8 h-8 rounded-lg bg-[#FFF7ED]/80 text-[#C2410C] border border-[#FED7AA]/50 flex items-center justify-center text-xs font-mono font-bold shrink-0 shadow-none">
                        {module.moduleNumber}
                      </span>

                      {/* Module Title & Description */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-base font-bold text-[#17191D] truncate">
                          {module.title}
                        </h3>
                        <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1 sm:line-clamp-none">
                          {module.description}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT REGION: Difficulty Badge, Concept Count & Chevron */}
                    <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
                      {/* Difficulty Badge */}
                      {renderDifficultyBadge(module.difficulty)}

                      {/* Actual Concept Count */}
                      <span className="text-xs font-medium text-[#64748B] hidden sm:inline">
                        {module.concepts.length} Concepts
                      </span>

                      {/* Animated Rotate Chevron (280ms cubic-bezier) */}
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#17191D] hover:bg-black/[0.03] oops-chevron-rotate ${
                          isExpanded ? 'rotate-180' : 'rotate-0'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 stroke-[2]" />
                      </div>
                    </div>
                  </div>

                  {/* EXPANDED CONTENT: Nested Connected Concept Rows with Smooth Height & Opacity Transition */}
                  <div className={`oops-accordion-grid ${isExpanded ? 'is-expanded' : ''}`}>
                    <div className="oops-accordion-inner">
                      <div className="oops-accordion-content border-t border-[#E5E7EB]/40 bg-white/30 backdrop-blur-xs relative">
                        {/* Vertical Connecting Line between concept number indicators */}
                        {module.matchingConcepts.length > 1 && (
                          <div
                            className="absolute left-[30px] sm:left-[38px] top-8 bottom-8 w-px bg-[#E5E7EB]/70 z-0 pointer-events-none"
                            aria-hidden="true"
                          />
                        )}

                        <div className="divide-y divide-[#E5E7EB]/40">
                          {module.matchingConcepts.map((concept, idx) => {
                            const IconComponent = concept.icon;
                            const isFirst = idx === 0;

                            // Icon container styling
                            const iconBoxStyle =
                              concept.iconColor === 'blue'
                                ? 'bg-[#EFF6FF]/70 text-[#075CF5] border border-[#BFDBFE]/50'
                                : concept.iconColor === 'orange'
                                ? 'bg-[#FFF7ED]/70 text-[#FF7A00] border border-[#FED7AA]/50'
                                : 'bg-[#F8FAFC]/70 text-[#475569] border border-[#E2E8F0]/50';

                            return (
                              <div
                                key={concept.id}
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`${concept.targetRoute}?track=${selectedTrack}`);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    navigate(`${concept.targetRoute}?track=${selectedTrack}`);
                                  }
                                }}
                                className="relative z-10 flex items-center justify-between p-3.5 sm:px-6 hover:bg-black/[0.02] transition-colors cursor-pointer group select-none"
                              >
                                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1 pr-3">
                                  {/* Concept Number (Restarts per module: 01, 02...) */}
                                  <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 z-10 transition-colors ${
                                      isFirst
                                        ? 'bg-[#075CF5] text-white shadow-none'
                                        : 'bg-[#F1F5F9]/80 text-[#64748B] group-hover:bg-[#E2E8F0]/90 group-hover:text-[#17191D]'
                                    }`}
                                  >
                                    {concept.stepNumber.toString().padStart(2, '0')}
                                  </div>

                                  {/* Compact Concept Icon Container */}
                                  <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${iconBoxStyle}`}
                                  >
                                    <IconComponent className="w-4 h-4 stroke-[1.8]" />
                                  </div>

                                  {/* Concept Title & Description */}
                                  <div className="min-w-0 flex-1">
                                    <h4 className="text-sm font-bold text-[#17191D] group-hover:text-[#075CF5] transition-colors truncate">
                                      {concept.title}
                                    </h4>
                                    <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1 sm:line-clamp-none">
                                      {concept.description}
                                    </p>
                                  </div>
                                </div>

                                {/* Concept Difficulty Badge */}
                                <div className="shrink-0 pl-2">
                                  {renderDifficultyBadge(concept.difficulty)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>
        </div>
      </div>
    </div>
  );
};
