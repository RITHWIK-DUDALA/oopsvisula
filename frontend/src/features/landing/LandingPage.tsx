import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  Play,
  ArrowRight,
  Video,
  Code2,
  Terminal,
  Boxes,
  Shield,
  BookOpen,
  Database,
  ChevronRight,
} from 'lucide-react';
import { ApplicationTransition } from '@/features/transition/ApplicationTransition';
import { SystemCompatibilityModal } from '@/components/shared/SystemCompatibilityModal';
import { WordReveal } from './components/WordReveal';
import { LandingHeader } from './components/LandingHeader';
import { DecorativeOrbits } from './components/DecorativeOrbits';
import { HeroPreviewCard } from './components/HeroPreviewCard';
import { DemoModal } from './components/DemoModal';
import { InfiniteSpiral } from './components/InfiniteSpiral';
import { CloudCtaSection } from './components/CloudCtaSection';
import { CloudSurface } from './components/CloudSurface';
import Cloudscape from '@/components/forgeui/cloudscape';
import { useAuthStore } from '@/services/storage/authStore';
import { useSmoothScroll } from '@/lib/useSmoothScroll';

const spiralItems = [
  { src: '/images/spiral/card-class.svg', alt: 'Class Representation', label: 'Class Representation', id: 'class' },
  { src: '/images/spiral/card-object.svg', alt: 'Heap Object Instance', label: 'Heap Object Instance', id: 'object' },
  { src: '/images/spiral/card-stack.svg', alt: 'JVM Call Stack', label: 'JVM Call Stack', id: 'stack' },
  { src: '/images/spiral/card-inheritance.svg', alt: 'Inheritance Hierarchy', label: 'Inheritance Hierarchy', id: 'inheritance' },
  { src: '/images/spiral/card-polymorphism.svg', alt: 'Polymorphic Dispatch', label: 'Polymorphic Dispatch', id: 'polymorphism' },
  { src: '/images/spiral/card-stringpool.svg', alt: 'String Intern Pool', label: 'String Intern Pool', id: 'stringpool' },
  { src: '/images/spiral/card-interfaces.svg', alt: 'Interface Realization', label: 'Interface Realization', id: 'interfaces' },
  { src: '/images/spiral/card-threads.svg', alt: 'Virtual Threads & Locks', label: 'Virtual Threads & Locks', id: 'threads' },
];

interface PreviewConcept {
  id: string;
  name: string;
  category: string;
  summary: string;
  codeSnippet: string;
  stackFrame: {
    method: string;
    line: number;
    vars: { name: string; type: string; val: string }[];
  };
  heapObject: {
    address: string;
    className: string;
    fields: { name: string; val: string }[];
  };
}

const previewConcepts: PreviewConcept[] = [
  {
    id: 'encapsulation',
    name: 'Encapsulation & Validation',
    category: 'Core OOP',
    summary: 'Private instance state protected by public mutating methods with invariant validation.',
    codeSnippet: `public class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
}`,
    stackFrame: {
      method: 'deposit(amount: 250.0)',
      line: 6,
      vars: [
        { name: 'this', type: 'BankAccount', val: 'ref @0x2F1A' },
        { name: 'amount', type: 'double', val: '250.0' },
      ],
    },
    heapObject: {
      address: '@0x2F1A',
      className: 'BankAccount',
      fields: [{ name: 'balance', val: '750.0 (double)' }],
    },
  },
  {
    id: 'inheritance',
    name: 'Inheritance & super()',
    category: 'Hierarchy',
    summary: 'Constructor chaining via super() initializes base class fields before subclass fields.',
    codeSnippet: `public class Employee extends Person {
    private String department;

    public Employee(String name, String dept) {
        super(name); // Invokes Person.<init>
        this.department = dept;
    }
}`,
    stackFrame: {
      method: 'Employee.<init>(name, dept)',
      line: 5,
      vars: [
        { name: 'this', type: 'Employee', val: 'ref @0x8E3B' },
        { name: 'dept', type: 'String', val: '"Engineering"' },
      ],
    },
    heapObject: {
      address: '@0x8E3B',
      className: 'Employee (extends Person)',
      fields: [
        { name: 'name (super)', val: '"Alice"' },
        { name: 'department', val: '"Engineering"' },
      ],
    },
  },
  {
    id: 'polymorphism',
    name: 'Dynamic Method Dispatch',
    category: 'Runtime Binding',
    summary: 'JVM vtable resolves virtual method invocations to the actual runtime heap object type.',
    codeSnippet: `Shape s = new Circle(5.0);
s.draw(); // Dynamic dispatch at runtime!
// Resolved via vtable to Circle.draw()`,
    stackFrame: {
      method: 'main(args)',
      line: 2,
      vars: [
        { name: 's (Shape)', type: 'Shape', val: 'ref @0x4C9D (Circle)' },
      ],
    },
    heapObject: {
      address: '@0x4C9D',
      className: 'Circle (implements Shape)',
      fields: [{ name: 'radius', val: '5.0 (double)' }],
    },
  },
  {
    id: 'records',
    name: 'Java 21 Records',
    category: 'Modern Java 21',
    summary: 'Transparent immutable data carriers with compact constructor validation and auto-generated components.',
    codeSnippet: `public record Point(int x, int y) {
    public Point {
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException();
        }
    }
}`,
    stackFrame: {
      method: 'Point.<init>(x: 10, y: 25)',
      line: 2,
      vars: [
        { name: 'x', type: 'int', val: '10' },
        { name: 'y', type: 'int', val: '25' },
      ],
    },
    heapObject: {
      address: '@0x5E21',
      className: 'Point [Record]',
      fields: [
        { name: 'x', val: '10' },
        { name: 'y', val: '25' },
      ],
    },
  },
];

export const LandingPage: React.FC = () => {
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSystemScanOpen, setIsSystemScanOpen] = useState(false);
  const navigate = useNavigate();

  // Centralized single entry handler for all landing actions (guest-first architecture)
  const { enterAsGuest } = useAuthStore();

  const handleEnterLaboratory = () => {
    enterAsGuest();
    if (isTransitioning) return;
    try {
      if (localStorage.getItem('oops_skip_system_scan') === 'true') {
        setIsTransitioning(true);
        return;
      }
    } catch {
      // Safe fallback
    }
    setIsSystemScanOpen(true);
  };

  const handleSystemScanProceed = () => {
    setIsSystemScanOpen(false);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    navigate('/app/concepts', { state: { fromLanding: true } });
  };

  // Luxury 120fps Inertial Smooth Scroll Controller throughout the page
  const { scrollTo } = useSmoothScroll({
    duration: 1.25,
    smoothWheel: true,
  });

  // Scroll Progress Tracker for Landing Page Header
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  // Soft Spatial Parallax on Hero elements as user scrolls down
  const heroParallaxY = useTransform(scrollYProgress, [0, 0.22], [0, -42]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0.88]);

  const activeConcept = previewConcepts[activeConceptIndex];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      scrollTo(el, -36, 1.35);
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const, // easeOutCubic
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.04,
      },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-transparent text-[#111111] flex flex-col selection:bg-[#111111] selection:text-white scroll-smooth relative overflow-x-hidden font-sans">
      {/* Persistent Full-Page WebGL Cloudscape Background */}
      <div className="fixed inset-0 pointer-events-none z-0 w-screen h-screen overflow-hidden">
        <Cloudscape
          colorBottom="#87ceeb"
          colorMid="#f8f8f8"
          colorTop="#ffffff"
          speed={1}
          height="100vh"
          className="w-full h-full"
        />
      </div>

      {/* Real-time Smooth Scroll Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#2463EB] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* ========================================================================= */}
      {/* SECTION 1: EXACT REFERENCE HERO VIEWPORT (1671 × 941 TARGET CALIBRATION)  */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden z-10">
        {/* Decorative 3D Spheres & SVG Orbital Paths */}
        <DecorativeOrbits />

        {/* 90px Standardized Landing Header */}
        <LandingHeader
          onEnterAsGuest={handleEnterLaboratory}
          onSmoothScroll={handleSmoothScroll}
          onOpenSearch={handleEnterLaboratory}
        />

        {/* Main Hero Content: Two-Column Composition */}
        <div className="flex-1 w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between py-6 relative z-10">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Column (~5 cols) */}
            <motion.div
              style={{ y: heroParallaxY, opacity: heroOpacity }}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-5 space-y-6 max-w-[530px]"
            >
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-[11px] font-mono tracking-[1px] text-[#555D70] uppercase shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#F47B20] shrink-0" />
                <span>OPEN SOURCE · INTERACTIVE · JAVA 21</span>
              </div>

              {/* Exact 3-Line Heading with Selected Color Treatment */}
              <h1 className="text-[44px] sm:text-[54px] lg:text-[64px] font-[800] tracking-[-2.4px] leading-[1.05] text-[#111111]">
                Learn OOP by<br />
                <span className="text-[#2463EB]">Seeing</span> the{' '}
                <span className="text-[#F47B20]">JVM</span><br />
                in Action<span className="text-[#F5BD24]">.</span>
              </h1>

              {/* Description Paragraph */}
              <p className="text-[17px] sm:text-[18.5px] leading-[1.5] text-[#50566A] max-w-[500px]">
                Write real Java code, run it step by step, and visualize how the JVM manages objects, memory and references — all in a clean, interactive environment.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={handleEnterLaboratory}
                  className="h-[61px] min-w-[260px] px-7 rounded-[12px] bg-[#111111] hover:bg-[#222222] text-white font-semibold text-[15.5px] flex items-center justify-center space-x-3 transition-all group shadow-sm cursor-pointer active:scale-98"
                >
                  <Play className="w-4 h-4 fill-current stroke-[1.5]" />
                  <span>Enter the Laboratory</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="h-[61px] min-w-[172px] px-6 rounded-[12px] bg-white hover:bg-[#F9FAFB] border border-[#E7E7E7] text-[#111111] font-semibold text-[15.5px] flex items-center justify-center space-x-2.5 transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  <Video className="w-4 h-4 stroke-[2] text-[#111111]" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Supporting Line */}
              <p className="text-[13.5px] text-[#50566A]">
                No installation required. Runs in your browser.
              </p>
            </motion.div>

            {/* Right Hero Column: Interactive Laboratory Preview Card (~7 cols) */}
            <motion.div
              style={{ y: heroParallaxY, opacity: heroOpacity }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-7 flex justify-end w-full"
            >
              <HeroPreviewCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTIONS BELOW THE FOLD (EXPLORATION & DEEP ARCHITECTURE)                 */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 space-y-24 py-16 px-4 sm:px-8 max-w-6xl mx-auto w-full mt-6">
        {/* Section 2: Interactive Concept Explorer ("What We Do") */}
        <motion.section
          id="what-we-do"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8 scroll-mt-24 pt-4"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider flex items-center space-x-1.5"><span className="text-[#F5BD24] font-bold">●</span><span className="text-[#F47B20]">What We Do</span></div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                <WordReveal
                  text="Interactive Java 21 Memory Projections."
                  delay={0.1}
                  highlightMap={{
                    'Java': 'text-[#2463EB]',
                    '21': 'text-[#2463EB]',
                    'Projections': 'text-[#F47B20]',
                    '.': 'text-[#F5BD24] font-extrabold',
                  }}
                />
              </h2>
              <p className="text-xs sm:text-sm text-[#50566A] max-w-xl">
                Select an object-oriented paradigm below to observe how the <span className="text-[#F47B20] font-semibold">JVM</span> allocates <span className="text-[#CA8A04] font-medium">heap instances</span>, frames method invocations, and maps <span className="text-[#2463EB] font-medium">reference pointers</span>.
              </p>
            </div>

            {/* Concept Selector Pill Tabs */}
            <div className="flex items-center space-x-1 p-1 bg-white/25 backdrop-blur-xl border border-white/60 rounded-xl self-start overflow-x-auto max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shadow-[0_4px_16px_rgba(15,23,42,0.03),inset_0_1px_1px_rgba(255,255,255,0.8)]">
              {previewConcepts.map((concept, index) => (
                <button
                  key={concept.id}
                  onClick={() => setActiveConceptIndex(index)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap relative ${
                    activeConceptIndex === index
                      ? 'text-white font-semibold'
                      : 'text-[#50566A] hover:text-[#111111] hover:bg-white/30'
                  }`}
                >
                  {activeConceptIndex === index && (
                    <motion.div
                      layoutId="activeConceptPill"
                      className="absolute inset-0 bg-[#111111] rounded-lg shadow-xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{concept.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Simulation Preview Panel */}
          <CloudSurface
            variant="panel"
            interactive3D={false}
            className="rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.95)]"
          >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeConcept.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="p-6 sm:p-8 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/40 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#F47B20] font-bold tracking-wider">
                        {activeConcept.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#111111]">
                        {activeConcept.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#50566A] max-w-md font-sans">
                      {activeConcept.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Java 21 Code Snippet */}
                    <div className="lg:col-span-5 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#50566A]">
                        <span className="font-semibold">Java 21 Source</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#EFF6FF]/80 backdrop-blur-xs border border-[#DBEAFE] text-[#2463EB] font-bold text-[10px] shadow-2xs">
                          Executing Line {activeConcept.stackFrame.line}
                        </span>
                      </div>
                      <CloudSurface
                        variant="subtle"
                        interactive3D={false}
                        className="rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_4px_16px_rgba(15,23,42,0.02)] border border-white/65 hover:border-white p-4 leading-relaxed font-mono text-xs text-[#1F2937]"
                      >
                        <div className="overflow-x-auto [scrollbar-width:thin]">
                          <pre className="text-xs leading-relaxed">{activeConcept.codeSnippet}</pre>
                        </div>
                      </CloudSurface>
                    </div>

                    {/* Middle: Call Stack LIFO Projection */}
                    <div className="lg:col-span-4 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#50566A]">
                        <span className="font-semibold">Call Stack (LIFO)</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/70 backdrop-blur-xs border border-white/90 text-[#50566A] text-[10px] font-bold shadow-2xs">1 Active Frame</span>
                      </div>
                      <CloudSurface
                        variant="subtle"
                        interactive3D={false}
                        className="rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_4px_16px_rgba(15,23,42,0.02)] border border-white/65 hover:border-white p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between font-mono text-xs border-b border-white/40 pb-2">
                          <span className="font-bold text-[#111111]">{activeConcept.stackFrame.method}</span>
                          <span className="text-[10px] text-[#6B7280]">Line {activeConcept.stackFrame.line}</span>
                        </div>
                        <div className="space-y-1.5 text-xs font-mono">
                          <span className="text-[10px] text-[#6B7280] uppercase tracking-wider block font-semibold">Local Variables</span>
                          {activeConcept.stackFrame.vars.map((v) => (
                            <div key={v.name} className="flex items-center justify-between p-1.5 bg-white/50 backdrop-blur-xs rounded-lg border border-white/70 shadow-2xs transition-transform">
                              <span className="text-[#374151] font-medium">{v.name}</span>
                              <span className="text-[#2463EB] font-bold">{v.val}</span>
                            </div>
                          ))}
                        </div>
                      </CloudSurface>
                    </div>

                    {/* Right: Eden Heap Object Instance */}
                    <div className="lg:col-span-3 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#50566A]">
                        <span className="font-semibold">JVM Eden Heap</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5]/80 backdrop-blur-xs border border-[#A7F3D0] text-[#059669] text-[10px] font-bold shadow-2xs">Allocated</span>
                      </div>
                      <CloudSurface
                        variant="card"
                        interactive3D={false}
                        className="rounded-2xl border-[#111111]/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_6px_20px_rgba(15,23,42,0.04)] p-4 space-y-3"
                      >
                        <div className="border-b border-white/40 pb-2">
                          <div className="flex items-center justify-between font-mono">
                            <span className="font-bold text-xs text-[#111111]">{activeConcept.heapObject.className}</span>
                            <span className="text-[10px] text-[#6B7280] font-medium">{activeConcept.heapObject.address}</span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs font-mono">
                          <span className="text-[10px] text-[#6B7280] uppercase tracking-wider block font-semibold">Instance Fields</span>
                          {activeConcept.heapObject.fields.map((f) => (
                            <div key={f.name} className="flex items-center justify-between p-1.5 bg-white/50 backdrop-blur-xs rounded-lg border border-white/70 shadow-2xs transition-transform">
                              <span className="text-[#4B5563]">{f.name}:</span>
                              <span className="text-[#111111] font-semibold">{f.val}</span>
                            </div>
                          ))}
                        </div>
                      </CloudSurface>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Gateway Banner Inside Preview (Horizontal Layout: Message Left, Button Right) */}
              <div className="p-4 border-t border-white/40 bg-white/18 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2 text-[#50566A]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span>Preview Mode — Enter as guest to edit code, trace execution, and design custom class diagrams.</span>
                </div>
                <button
                  onClick={handleEnterLaboratory}
                  className="px-4 py-2 bg-[#2463EB] text-white font-semibold rounded-lg hover:bg-[#1D4ED8] transition-all flex items-center justify-center space-x-1.5 shrink-0 shadow-[0_4px_14px_rgba(36,99,235,0.3)] cursor-pointer active:scale-95"
                >
                  <span>Launch Full Visualizer</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
          </CloudSurface>
        </motion.section>

        {/* Section 3: Four Core Capabilities (Features Grid) */}
        <motion.section
          id="features"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8 scroll-mt-24"
        >
          <div className="text-center space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5"><span className="text-[#F5BD24] font-bold">●</span><span className="text-[#F47B20]">Core Capabilities</span></div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
              <WordReveal
                text="Everything You Need to Master Object-Oriented Design."
                delay={0.1}
                highlightMap={{
                  'Master': 'text-[#2463EB]',
                  'Design': 'text-[#F47B20]',
                  '.': 'text-[#F5BD24] font-extrabold',
                }}
              />
            </h2>
            <p className="text-xs sm:text-sm text-[#50566A] max-w-xl mx-auto">
              Engineered as a comprehensive, <span className="text-[#2463EB] font-semibold">end-to-end laboratory</span> with zero distractions.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div variants={cardItem} className="h-full">
              <CloudSurface
                variant="card"
                interactive3D={false}
                wrapperClassName="h-full"
                contentClassName="p-6 space-y-4 h-full flex flex-col justify-start"
                className="rounded-2xl h-full flex flex-col justify-start group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF]/80 backdrop-blur-md border border-[#DBEAFE] flex items-center justify-center text-[#2463EB] shadow-xs">
                    <Terminal className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EFF6FF]/90 backdrop-blur-xs text-[#2463EB] border border-[#DBEAFE] shadow-2xs">
                    Cobalt Studio
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#111111]"><span className="text-[#2463EB]">3-Panel</span> Execution Workspace</h3>
                <p className="text-xs text-[#50566A] leading-relaxed">
                  Seamlessly integrated <span className="text-[#2463EB] font-medium">Monaco Java 21 editor</span>, interactive <span className="text-[#CA8A04] font-medium">Memory Canvas</span>, and runtime <span className="text-[#F47B20] font-medium">Execution Inspector</span> with variable scopes, timeline scrubber, and console output.
                </p>
              </CloudSurface>
            </motion.div>

            <motion.div variants={cardItem} className="h-full">
              <CloudSurface
                variant="card"
                interactive3D={false}
                wrapperClassName="h-full"
                contentClassName="p-6 space-y-4 h-full flex flex-col justify-start"
                className="rounded-2xl h-full flex flex-col justify-start group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF7ED]/80 backdrop-blur-md border border-[#FFEDD5] flex items-center justify-center text-[#F47B20] shadow-xs">
                    <Boxes className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FFF7ED]/90 backdrop-blur-xs text-[#EA580C] border border-[#FFEDD5] shadow-2xs">
                    UML Modeling
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#111111]"><span className="text-[#F47B20]">Visual UML</span> Class Builder</h3>
                <p className="text-xs text-[#50566A] leading-relaxed">
                  Design classes, records, and interfaces with visual drag-and-drop connectors for <span className="text-[#F47B20] font-medium">inheritance</span>, interface realization, <span className="text-[#2463EB] font-medium">composition</span>, and aggregation. Generates idiomatic Java 21 code in real time.
                </p>
              </CloudSurface>
            </motion.div>

            <motion.div variants={cardItem} className="h-full">
              <CloudSurface
                variant="card"
                interactive3D={false}
                wrapperClassName="h-full"
                contentClassName="p-6 space-y-4 h-full flex flex-col justify-start"
                className="rounded-2xl h-full flex flex-col justify-start group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#FEFCE8]/80 backdrop-blur-md border border-[#FEF08A] flex items-center justify-center text-[#CA8A04] shadow-xs">
                    <Shield className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FEFCE8]/90 backdrop-blur-xs text-[#CA8A04] border border-[#FEF08A] shadow-2xs">
                    AST Sandbox
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#111111]"><span className="text-[#CA8A04]">AST Security</span> Sandbox</h3>
                <p className="text-xs text-[#50566A] leading-relaxed">
                  Multi-layered <span className="text-[#CA8A04] font-medium">JavaParser static analysis</span> blocks dangerous system calls, reflection, file I/O, and networking before code is executed inside <span className="text-[#F47B20] font-medium">resource-capped</span> container workers.
                </p>
              </CloudSurface>
            </motion.div>

            <motion.div variants={cardItem} className="h-full">
              <CloudSurface
                variant="card"
                interactive3D={false}
                wrapperClassName="h-full"
                contentClassName="p-6 space-y-4 h-full flex flex-col justify-start"
                className="rounded-2xl h-full flex flex-col justify-start group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF]/80 backdrop-blur-md border border-[#DBEAFE] flex items-center justify-center text-[#2463EB] shadow-xs">
                    <BookOpen className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EFF6FF]/90 backdrop-blur-xs text-[#2463EB] border border-[#DBEAFE] shadow-2xs">
                    Java 21 LTS
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#111111]"><span className="text-[#2463EB]">14-Step Curriculum</span> & Auto-Grading</h3>
                <p className="text-xs text-[#50566A] leading-relaxed">
                  Structured pedagogical framework covering foundations, <span className="text-[#2463EB] font-medium">OOP principles</span>, UML relationships, and <span className="text-[#CA8A04] font-medium">modern Java 21</span> features with real-time AST assertion challenges.
                </p>
              </CloudSurface>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Section: 3D Visualization Spiral Showcase (Side-by-Side) */}
        <motion.section
          id="visualization-helix"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="scroll-mt-24 py-6 sm:py-8 bg-transparent overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side: Editorial & Controls (~5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-[#BFDBFE] text-[11px] font-mono text-[#2463EB] font-semibold shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1749C8] animate-pulse" />
                <span>3D VISUALIZATION HELIX · 26 MODULES</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111] leading-tight">
                <WordReveal
                  text="Dimensional Java & OOP Laboratory Helix."
                  delay={0.1}
                  highlightMap={{
                    'Dimensional': 'text-[#2463EB]',
                    'Java': 'text-[#2463EB]',
                    'OOP': 'text-[#F47B20]',
                    'Helix': 'text-[#CA8A04]',
                    '.': 'text-[#F5BD24] font-extrabold',
                  }}
                />
              </h2>

              <p className="text-xs sm:text-sm text-[#50566A] leading-relaxed">
                Experience every object-oriented paradigm in continuous 3D space. Drag, scroll, or hover to inspect classes, stack frames, heap allocations, and polymorphic dynamic dispatch.
              </p>

              {/* Module Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'Class UML',
                  'Heap Instances',
                  'Stack Frames',
                  'Dynamic Dispatch',
                  'String Pool',
                  'Thread States',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white border border-[#E2E8F0] text-[#334155] shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/app/visualizers')}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#1749C8] hover:bg-[#133ea8] text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-98 cursor-pointer"
                >
                  <span>Explore 26 Visualizers</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                </button>
              </div>
            </div>

            {/* Right Side: 3D Infinite Spiral Container (~7 cols) */}
            <div className="lg:col-span-7 h-[480px] sm:h-[520px] relative bg-transparent overflow-hidden flex items-center justify-center">
              <div className="w-full h-full relative [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_96%)]">
                <InfiniteSpiral
                  items={spiralItems}
                  animationMode="all"
                  speed={0.45}
                  radius={160}
                  cardWidth={120}
                  cardHeight={120}
                  verticalSpacing={62}
                  perspective={950}
                  cardRadius={12}
                  centerScale={1.22}
                  edgeBlur={4}
                  cardsPerTurn={6}
                  pauseOnHover={true}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: How It Works (Simulation Pipeline) */}
        <motion.section
          id="how-it-works"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="scroll-mt-24"
        >
          <CloudSurface
            variant="panel"
            interactive3D={false}
            contentClassName="p-6 sm:p-8 space-y-6"
            className="rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.95)]"
          >
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5"><span className="text-[#F47B20]">●</span><span className="text-[#CA8A04]">Simulation Pipeline</span></div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
                <WordReveal
                  text="How the Execution Visualizer Works."
                  delay={0.1}
                  highlightMap={{
                    'Execution': 'text-[#CA8A04]',
                    'Visualizer': 'text-[#2463EB]',
                    'Works': 'text-[#F47B20]',
                    '.': 'text-[#F5BD24] font-extrabold',
                  }}
                />
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono"
            >
              <motion.div variants={cardItem} className="h-full">
                <CloudSurface
                  variant="subtle"
                  interactive3D={false}
                  wrapperClassName="h-full"
                  contentClassName="p-4 space-y-2.5 h-full flex flex-col justify-start"
                  className="rounded-xl h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_4px_16px_rgba(15,23,42,0.02)] border border-white/65 hover:border-white"
                >
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EFF6FF]/90 backdrop-blur-xs text-[#2463EB] border border-[#DBEAFE] inline-block shadow-2xs">STEP 01</span>
                  </div>
                  <span className="font-bold text-[#111111] block">Author <span className="text-[#2463EB]">Java 21</span> Code</span>
                  <p className="text-[11px] font-sans text-[#50566A] leading-normal">
                    Type directly in <span className="text-[#2463EB] font-medium">Monaco</span> or visually model classes with the diagram builder.
                  </p>
                </CloudSurface>
              </motion.div>

              <motion.div variants={cardItem} className="h-full">
                <CloudSurface
                  variant="subtle"
                  interactive3D={false}
                  wrapperClassName="h-full"
                  contentClassName="p-4 space-y-2.5 h-full flex flex-col justify-start"
                  className="rounded-xl h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_4px_16px_rgba(15,23,42,0.02)] border border-white/65 hover:border-white"
                >
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFF7ED]/90 backdrop-blur-xs text-[#EA580C] border border-[#FFEDD5] inline-block shadow-2xs">STEP 02</span>
                  </div>
                  <span className="font-bold text-[#111111] block"><span className="text-[#F47B20]">AST Security</span> Scan</span>
                  <p className="text-[11px] font-sans text-[#50566A] leading-normal">
                    <span className="text-[#F47B20] font-medium">JavaParser</span> validates syntax and enforces security boundaries before queuing.
                  </p>
                </CloudSurface>
              </motion.div>

              <motion.div variants={cardItem} className="h-full">
                <CloudSurface
                  variant="subtle"
                  interactive3D={false}
                  wrapperClassName="h-full"
                  contentClassName="p-4 space-y-2.5 h-full flex flex-col justify-start"
                  className="rounded-xl h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_4px_16px_rgba(15,23,42,0.02)] border border-white/65 hover:border-white"
                >
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FEFCE8]/90 backdrop-blur-xs text-[#CA8A04] border border-[#FEF08A] inline-block shadow-2xs">STEP 03</span>
                  </div>
                  <span className="font-bold text-[#111111] block"><span className="text-[#CA8A04]">JDI Trace</span> Capture</span>
                  <p className="text-[11px] font-sans text-[#50566A] leading-normal">
                    Isolated workers execute code and record <span className="text-[#CA8A04] font-medium">microsecond heap/stack events</span>.
                  </p>
                </CloudSurface>
              </motion.div>

              <motion.div variants={cardItem} className="h-full">
                <CloudSurface
                  variant="subtle"
                  interactive3D={false}
                  wrapperClassName="h-full"
                  contentClassName="p-4 space-y-2.5 h-full flex flex-col justify-start"
                  className="rounded-xl h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_4px_16px_rgba(15,23,42,0.02)] border border-white/65 hover:border-white"
                >
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EFF6FF]/90 backdrop-blur-xs text-[#2463EB] border border-[#DBEAFE] inline-block shadow-2xs">STEP 04</span>
                  </div>
                  <span className="font-bold text-[#111111] block">Interactive <span className="text-[#2463EB]">Replay</span></span>
                  <p className="text-[11px] font-sans text-[#50566A] leading-normal">
                    Replay forwards and backwards with <span className="text-[#2463EB] font-medium">pointer resolution</span> and scope tracking.
                  </p>
                </CloudSurface>
              </motion.div>
            </motion.div>
          </CloudSurface>
        </motion.section>

        {/* Section 5: Architecture & Privacy */}
        <motion.section
          id="architecture"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="scroll-mt-24"
        >
          <CloudSurface
            variant="panel"
            interactive3D={false}
            contentClassName="p-6 sm:p-8 space-y-6"
            className="rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.95)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5"><span className="text-[#2463EB]">●</span><span className="text-[#F47B20]">Privacy & Governance</span></div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] mt-0.5">
                  <WordReveal
                    text="Local-First & Zero Tracking Architecture."
                    delay={0.1}
                    highlightMap={{
                      'Local-First': 'text-[#2463EB]',
                      'Tracking': 'text-[#CA8A04]',
                      'Architecture': 'text-[#F47B20]',
                      '.': 'text-[#F5BD24] font-extrabold',
                    }}
                  />
                </h2>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono px-3 py-1 rounded-full bg-white/35 backdrop-blur-md border border-[#BFDBFE]/70 text-[#2463EB] font-semibold shadow-2xs">
                <Database className="w-4 h-4 stroke-[1.8]" />
                <span>LocalStorage Driver Active</span>
              </div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"
            >
              <motion.div variants={cardItem} className="h-full">
                <CloudSurface
                  variant="subtle"
                  interactive3D={false}
                  wrapperClassName="h-full"
                  contentClassName="p-4 space-y-2 h-full flex flex-col justify-start"
                  className="rounded-xl h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_4px_16px_rgba(15,23,42,0.02)] border border-white/65 hover:border-white"
                >
                  <span className="font-bold text-[#111111] block"><span className="text-[#2463EB]">Guest Session</span> Security</span>
                  <p className="text-[#50566A] leading-relaxed">
                    Guest users have full access to all features. All progress, code snippets, and challenges are stored locally in your browser.
                  </p>
                </CloudSurface>
              </motion.div>

              <motion.div variants={cardItem} className="h-full">
                <CloudSurface
                  variant="subtle"
                  interactive3D={false}
                  wrapperClassName="h-full"
                  contentClassName="p-4 space-y-2 h-full flex flex-col justify-start"
                  className="rounded-xl h-full border-t-2 border-t-[#F5BD24] shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_4px_16px_rgba(15,23,42,0.02)] border border-white/65 hover:border-white"
                >
                  <span className="font-bold text-[#111111] block"><span className="text-[#F5BD24]">Full JSON</span> Export</span>
                  <p className="text-[#50566A] leading-relaxed">
                    Export and import your entire learning session at any time with one click from the Progress and Profile pages.
                  </p>
                </CloudSurface>
              </motion.div>

              <motion.div variants={cardItem} className="h-full">
                <CloudSurface
                  variant="subtle"
                  interactive3D={false}
                  wrapperClassName="h-full"
                  contentClassName="p-4 space-y-2 h-full flex flex-col justify-start"
                  className="rounded-xl h-full border-t-2 border-t-[#2463EB] shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_4px_16px_rgba(15,23,42,0.02)] border border-white/65 hover:border-white"
                >
                  <span className="font-bold text-[#111111] block"><span className="text-[#F47B20]">Isolated Container</span> Runner</span>
                  <p className="text-[#50566A] leading-relaxed">
                    All Java code execution passes through disposable, network-isolated Docker sandbox containers with 256MB RAM caps.
                  </p>
                </CloudSurface>
              </motion.div>
            </motion.div>
          </CloudSurface>
        </motion.section>
      </main>

      {/* ========================================================================= */}
      {/* SECTION 6: VOLUMETRIC REALISTIC CLOUD CTA (MATCHING EXACT REFERENCE)      */}
      {/* ========================================================================= */}
      <CloudCtaSection
        onEnterLaboratory={handleEnterLaboratory}
        isTransitioning={isTransitioning}
      />

      {/* ========================================================================= */}
      {/* SECTION 7: SKY-INTEGRATED FOOTER (CONTINUOUS SKY BLUE PALETTE)             */}
      {/* ========================================================================= */}
      <footer className="relative z-10 w-full bg-transparent py-9 px-6 sm:px-12 text-[#334155]">
        <div className="w-full max-w-[1540px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand & Mission Group */}
          <div className="flex items-center space-x-3 text-sm sm:text-[15px] font-mono">
            <Code2 className="w-4 h-4 text-[#111827] stroke-[2] shrink-0" />
            <span className="font-bold text-[#111827] tracking-tight">OOPS LAB</span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#334155] font-normal hidden sm:inline">
              Open-Source Interactive Java OOP Learning Laboratory
            </span>
            <span className="text-[#334155] font-normal sm:hidden">
              Interactive Java OOP Lab
            </span>
          </div>

          {/* Right Links & Metadata Group */}
          <div className="flex flex-wrap items-center justify-center space-x-6 text-sm sm:text-[15px] font-mono">
            <button
              onClick={handleEnterLaboratory}
              className="hover:text-[#2563EB] transition-colors font-semibold text-[#111827] cursor-pointer flex items-center space-x-1"
            >
              <span>Enter the Laboratory</span>
              <span className="text-[17px] leading-none">→</span>
            </button>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#475569]">MIT License</span>
            <span className="text-[#475569]">Target: Java 21 LTS</span>
          </div>
        </div>
      </footer>

      {/* System Suitability Diagnostic Scan Modal */}
      <SystemCompatibilityModal
        isOpen={isSystemScanOpen}
        onClose={() => setIsSystemScanOpen(false)}
        onProceed={handleSystemScanProceed}
      />

      {/* Interactive Demo Video Modal */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      {/* Centralized Full-Screen Application Transition to Playground */}
      <ApplicationTransition
        isOpen={isTransitioning}
        onComplete={handleTransitionComplete}
        onCancel={() => setIsTransitioning(false)}
      />
    </div>
  );
};
