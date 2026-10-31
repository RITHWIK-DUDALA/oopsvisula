import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
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
  Lock,
} from 'lucide-react';
import { AuthModal } from '@/components/shared/AuthModal';
import { WordReveal } from './components/WordReveal';
import ElectricBorder from '@/components/ElectricBorder';
import { LandingHeader } from './components/LandingHeader';
import { DecorativeOrbits } from './components/DecorativeOrbits';
import { HeroPreviewCard } from './components/HeroPreviewCard';
import { ScrollIndicator } from './components/ScrollIndicator';
import { DemoModal } from './components/DemoModal';

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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const navigate = useNavigate();

  // Scroll Progress Tracker for Landing Page Header
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const activeConcept = previewConcepts[activeConceptIndex];

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleEnterAsGuest = () => {
    navigate('/playground');
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  const handleScrollToExplore = () => {
    const el = document.getElementById('what-we-do');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: 'easeOut' as const,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#FFFBEA] text-[#111111] flex flex-col selection:bg-[#111111] selection:text-white scroll-smooth relative overflow-x-hidden font-sans">
      {/* Real-time Smooth Scroll Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#2463EB] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* ========================================================================= */}
      {/* SECTION 1: EXACT REFERENCE HERO VIEWPORT (1671 × 941 TARGET CALIBRATION)  */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Full-Viewport Warm Mustard-Yellow & Orange Radiant Background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `
              radial-gradient(circle at 4% 100%, rgba(255, 132, 36, 0.92) 0%, rgba(255, 155, 58, 0.58) 22%, transparent 48%),
              radial-gradient(circle at 87% 16%, rgba(255, 132, 27, 0.68) 0%, rgba(255, 184, 63, 0.45) 24%, transparent 49%),
              radial-gradient(circle at 91% 76%, rgba(255, 196, 29, 0.88) 0%, rgba(255, 215, 94, 0.5) 24%, transparent 47%),
              radial-gradient(circle at 50% 45%, rgba(255, 243, 181, 0.85) 0%, transparent 55%),
              linear-gradient(120deg, #FFE9A0 0%, #FFF0B4 42%, #FFE39A 70%, #FFD16B 100%)
            `,
          }}
        />

        {/* Decorative 3D Spheres & SVG Orbital Paths */}
        <DecorativeOrbits />

        {/* 90px Standardized Landing Header */}
        <LandingHeader
          onEnterAsGuest={handleEnterAsGuest}
          onSmoothScroll={handleSmoothScroll}
          onOpenSearch={() => handleOpenAuth('signin')}
        />

        {/* Main Hero Content: Two-Column Composition */}
        <div className="flex-1 w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between py-6 relative z-10">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Column (~5 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-5 space-y-6 max-w-[530px]"
            >
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-xs border border-[#3C3219]/15 text-[11px] font-mono tracking-[1px] text-[#555D70] uppercase shadow-2xs">
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
                  onClick={handleEnterAsGuest}
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-7 flex justify-end w-full"
            >
              <HeroPreviewCard />
            </motion.div>
          </div>
        </div>

        {/* Bottom Centered Scroll Indicator */}
        <div className="w-full flex justify-center pb-3 relative z-20">
          <ScrollIndicator onScrollToExplore={handleScrollToExplore} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTIONS BELOW THE FOLD (EXPLORATION & DEEP ARCHITECTURE)                 */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 space-y-24 py-16 px-4 sm:px-8 max-w-6xl mx-auto w-full bg-white/60 backdrop-blur-md rounded-t-3xl mt-6 border-t border-[#E5E7EB]/80 shadow-xs">
        {/* Section 2: Interactive Concept Explorer ("What We Do") */}
        <motion.section
          id="what-we-do"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-8 scroll-mt-24 pt-4"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-mono text-[#F47B20] font-semibold uppercase tracking-wider">
                What We Do
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                <WordReveal
                  text="Interactive Java 21 Memory Projections"
                  delay={0.1}
                />
              </h2>
              <p className="text-xs sm:text-sm text-[#50566A] max-w-xl">
                Select an object-oriented paradigm below to observe how the JVM allocates heap instances, frames method invocations, and maps reference pointers.
              </p>
            </div>

            {/* Concept Selector Pill Tabs */}
            <div className="flex items-center space-x-1.5 p-1 bg-white border border-[#E5E7EB] rounded-xl self-start overflow-x-auto max-w-full shadow-2xs">
              {previewConcepts.map((concept, index) => (
                <button
                  key={concept.id}
                  onClick={() => setActiveConceptIndex(index)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap relative ${
                    activeConceptIndex === index
                      ? 'text-white'
                      : 'text-[#50566A] hover:text-[#111111]'
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

          {/* Interactive Simulation Preview Card */}
          <ElectricBorder
            color="#00e5ff"
            glowColor="#0066ff"
            borderRadius={16}
            speed={0.85}
            chaos={0.35}
            spread={0.55}
            thickness={1.6}
            strands={3}
            intensity={0.85}
            glow={0.75}
            arcs={1}
            interactive={true}
          >
            <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeConcept.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="p-6 sm:p-8 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3F4F6] pb-4">
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
                        <span>Java 21 Source</span>
                        <span className="px-2 py-0.5 rounded bg-[#EFF6FF] text-[#2463EB] font-bold text-[10px]">
                          Executing Line {activeConcept.stackFrame.line}
                        </span>
                      </div>
                      <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl font-mono text-xs text-[#1F2937] overflow-x-auto leading-relaxed shadow-inner">
                        <pre className="text-xs">{activeConcept.codeSnippet}</pre>
                      </div>
                    </div>

                    {/* Middle: Call Stack LIFO Projection */}
                    <div className="lg:col-span-4 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#50566A]">
                        <span>Call Stack (LIFO)</span>
                        <span className="px-1.5 py-0.5 rounded bg-gray-100 text-[10px]">1 Active Frame</span>
                      </div>
                      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3 shadow-2xs">
                        <div className="flex items-center justify-between font-mono text-xs border-b border-[#F3F4F6] pb-2">
                          <span className="font-bold text-[#111111]">{activeConcept.stackFrame.method}</span>
                          <span className="text-[10px] text-[#6B7280]">Line {activeConcept.stackFrame.line}</span>
                        </div>
                        <div className="space-y-1.5 text-xs font-mono">
                          <span className="text-[10px] text-[#6B7280] uppercase tracking-wider block">Local Variables</span>
                          {activeConcept.stackFrame.vars.map((v) => (
                            <div key={v.name} className="flex items-center justify-between p-1.5 bg-[#F9FAFB] rounded border border-[#F3F4F6]">
                              <span className="text-[#374151] font-medium">{v.name}</span>
                              <span className="text-[#2463EB] font-bold">{v.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Eden Heap Object Instance */}
                    <div className="lg:col-span-3 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#50566A]">
                        <span>JVM Eden Heap</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#059669] text-[10px] font-bold">Allocated</span>
                      </div>
                      <div className="p-4 bg-white border-2 border-[#111111] rounded-xl space-y-3 shadow-sm">
                        <div className="border-b border-[#F3F4F6] pb-2">
                          <div className="flex items-center justify-between font-mono">
                            <span className="font-bold text-xs text-[#111111]">{activeConcept.heapObject.className}</span>
                            <span className="text-[10px] text-[#6B7280]">{activeConcept.heapObject.address}</span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs font-mono">
                          <span className="text-[10px] text-[#6B7280] uppercase tracking-wider block">Instance Fields</span>
                          {activeConcept.heapObject.fields.map((f) => (
                            <div key={f.name} className="flex items-center justify-between p-1 bg-[#F9FAFB] rounded">
                              <span className="text-[#4B5563]">{f.name}:</span>
                              <span className="text-[#111111] font-semibold">{f.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Gateway Banner Inside Preview */}
              <div className="p-4 bg-[#F9FAFB] border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2 text-[#50566A]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
                  <span>Preview Mode — Enter as guest to edit code, trace execution, and design custom class diagrams.</span>
                </div>
                <button
                  onClick={handleEnterAsGuest}
                  className="px-4 py-2 bg-[#111111] text-white font-medium rounded-lg hover:bg-black transition-all flex items-center justify-center space-x-1.5 shrink-0 shadow-2xs cursor-pointer"
                >
                  <span>Launch Full Visualizer</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </ElectricBorder>
        </motion.section>

        {/* Section 3: Four Core Capabilities (Features Grid) */}
        <motion.section
          id="features"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-8 scroll-mt-24"
        >
          <div className="text-center space-y-2">
            <div className="text-xs font-mono text-[#F47B20] font-semibold uppercase tracking-wider">
              Core Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
              <WordReveal
                text="Everything You Need to Master Object-Oriented Design"
                delay={0.1}
              />
            </h2>
            <p className="text-xs sm:text-sm text-[#50566A] max-w-xl mx-auto">
              Engineered as a comprehensive, end-to-end laboratory with zero distractions.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div
              variants={cardItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <ElectricBorder
                color="#ff003c"
                glowColor="#ff1744"
                borderRadius={16}
                speed={0.75}
                chaos={0.35}
                spread={0.5}
                thickness={1.5}
                strands={3}
                intensity={0.85}
                glow={0.7}
                arcs={1}
                interactive={true}
                className="h-full"
              >
                <div className="p-6 bg-white border border-[#E5E7EB] rounded-2xl space-y-3 shadow-2xs h-full flex flex-col justify-start">
                  <div className="w-10 h-10 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-[#111111] stroke-[1.5]" />
                  </div>
                  <h3 className="text-base font-bold text-[#111111]">3-Panel Execution Workspace</h3>
                  <p className="text-xs text-[#50566A] leading-relaxed">
                    Seamlessly integrated Monaco Java 21 editor, interactive Memory Canvas, and runtime Execution Inspector with variable scopes, timeline scrubber, and console output.
                  </p>
                </div>
              </ElectricBorder>
            </motion.div>

            <motion.div
              variants={cardItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <ElectricBorder
                color="#ff003c"
                glowColor="#ff1744"
                borderRadius={16}
                speed={0.75}
                chaos={0.35}
                spread={0.5}
                thickness={1.5}
                strands={3}
                intensity={0.85}
                glow={0.7}
                arcs={1}
                interactive={true}
                className="h-full"
              >
                <div className="p-6 bg-white border border-[#E5E7EB] rounded-2xl space-y-3 shadow-2xs h-full flex flex-col justify-start">
                  <div className="w-10 h-10 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center">
                    <Boxes className="w-5 h-5 text-[#111111] stroke-[1.5]" />
                  </div>
                  <h3 className="text-base font-bold text-[#111111]">Visual UML Class Builder</h3>
                  <p className="text-xs text-[#50566A] leading-relaxed">
                    Design classes, records, and interfaces with visual drag-and-drop connectors for inheritance, interface realization, composition, and aggregation. Generates idiomatic Java 21 code in real time.
                  </p>
                </div>
              </ElectricBorder>
            </motion.div>

            <motion.div
              variants={cardItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <ElectricBorder
                color="#ff003c"
                glowColor="#ff1744"
                borderRadius={16}
                speed={0.75}
                chaos={0.35}
                spread={0.5}
                thickness={1.5}
                strands={3}
                intensity={0.85}
                glow={0.7}
                arcs={1}
                interactive={true}
                className="h-full"
              >
                <div className="p-6 bg-white border border-[#E5E7EB] rounded-2xl space-y-3 shadow-2xs h-full flex flex-col justify-start">
                  <div className="w-10 h-10 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#111111] stroke-[1.5]" />
                  </div>
                  <h3 className="text-base font-bold text-[#111111]">AST Security Sandbox</h3>
                  <p className="text-xs text-[#50566A] leading-relaxed">
                    Multi-layered JavaParser static analysis blocks dangerous system calls, reflection, file I/O, and networking before code is executed inside resource-capped container workers.
                  </p>
                </div>
              </ElectricBorder>
            </motion.div>

            <motion.div
              variants={cardItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <ElectricBorder
                color="#ff003c"
                glowColor="#ff1744"
                borderRadius={16}
                speed={0.75}
                chaos={0.35}
                spread={0.5}
                thickness={1.5}
                strands={3}
                intensity={0.85}
                glow={0.7}
                arcs={1}
                interactive={true}
                className="h-full"
              >
                <div className="p-6 bg-white border border-[#E5E7EB] rounded-2xl space-y-3 shadow-2xs h-full flex flex-col justify-start">
                  <div className="w-10 h-10 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#111111] stroke-[1.5]" />
                  </div>
                  <h3 className="text-base font-bold text-[#111111]">14-Step Curriculum & Auto-Grading</h3>
                  <p className="text-xs text-[#50566A] leading-relaxed">
                    Structured pedagogical framework covering foundations, OOP principles, UML relationships, and modern Java 21 features with real-time AST assertion challenges.
                  </p>
                </div>
              </ElectricBorder>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Section 4: How It Works (Simulation Pipeline) */}
        <motion.section
          id="how-it-works"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="scroll-mt-24"
        >
          <ElectricBorder
            color="#F5BD24"
            glowColor="#D97706"
            borderRadius={16}
            speed={0.75}
            chaos={0.35}
            spread={0.5}
            thickness={1.5}
            strands={3}
            intensity={0.9}
            glow={0.8}
            arcs={1}
            interactive={true}
          >
            <div className="p-8 bg-white border border-[#E5E7EB] rounded-2xl space-y-6 shadow-xs">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#CA8A04] font-bold uppercase tracking-wider">
                  Simulation Pipeline
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
                  <WordReveal
                    text="How the Execution Visualizer Works"
                    delay={0.1}
                  />
                </h2>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono"
              >
                <motion.div
                  variants={cardItem}
                  className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-2 hover:bg-[#F3F4F6] transition-colors"
                >
                  <span className="text-[10px] text-[#6B7280] block">STEP 01</span>
                  <span className="font-bold text-[#111111] block">Author Java 21 Code</span>
                  <p className="text-[11px] font-sans text-[#50566A] leading-normal">
                    Type directly in Monaco or visually model classes with the diagram builder.
                  </p>
                </motion.div>

                <motion.div
                  variants={cardItem}
                  className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-2 hover:bg-[#F3F4F6] transition-colors"
                >
                  <span className="text-[10px] text-[#6B7280] block">STEP 02</span>
                  <span className="font-bold text-[#111111] block">AST Security Scan</span>
                  <p className="text-[11px] font-sans text-[#50566A] leading-normal">
                    JavaParser validates syntax and enforces security boundaries before queuing.
                  </p>
                </motion.div>

                <motion.div
                  variants={cardItem}
                  className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-2 hover:bg-[#F3F4F6] transition-colors"
                >
                  <span className="text-[10px] text-[#6B7280] block">STEP 03</span>
                  <span className="font-bold text-[#111111] block">JDI Trace Capture</span>
                  <p className="text-[11px] font-sans text-[#50566A] leading-normal">
                    Isolated workers execute code and record microsecond heap/stack events.
                  </p>
                </motion.div>

                <motion.div
                  variants={cardItem}
                  className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-2 hover:bg-[#F3F4F6] transition-colors"
                >
                  <span className="text-[10px] text-[#6B7280] block">STEP 04</span>
                  <span className="font-bold text-[#111111] block">Interactive Replay</span>
                  <p className="text-[11px] font-sans text-[#50566A] leading-normal">
                    Replay forwards and backwards with pointer resolution and scope tracking.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </ElectricBorder>
        </motion.section>

        {/* Section 5: Architecture & Privacy */}
        <motion.section
          id="architecture"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="scroll-mt-24"
        >
          <ElectricBorder
            color="#F5BD24"
            glowColor="#D97706"
            borderRadius={16}
            speed={0.75}
            chaos={0.35}
            spread={0.5}
            thickness={1.5}
            strands={3}
            intensity={0.9}
            glow={0.8}
            arcs={1}
            interactive={true}
          >
            <div className="p-8 bg-white border border-[#E5E7EB] rounded-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-[#CA8A04] font-bold uppercase tracking-wider">
                    Privacy & Governance
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] mt-0.5">
                    <WordReveal
                      text="Local-First & Zero Tracking Architecture"
                      delay={0.1}
                    />
                  </h2>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#50566A]">
                  <Database className="w-4 h-4 text-[#111111] stroke-[1.5]" />
                  <span>LocalStorage Driver Active</span>
                </div>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"
              >
                <motion.div
                  variants={cardItem}
                  className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1.5 shadow-2xs"
                >
                  <span className="font-bold text-[#111111] block">Guest Session Security</span>
                  <p className="text-[#50566A] leading-relaxed">
                    Guest users have full access to all features. All progress, code snippets, and challenges are stored locally in your browser.
                  </p>
                </motion.div>

                <motion.div
                  variants={cardItem}
                  className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1.5 shadow-2xs"
                >
                  <span className="font-bold text-[#111111] block">Full JSON Export</span>
                  <p className="text-[#50566A] leading-relaxed">
                    Export and import your entire learning session at any time with one click from the Progress and Profile pages.
                  </p>
                </motion.div>

                <motion.div
                  variants={cardItem}
                  className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1.5 shadow-2xs"
                >
                  <span className="font-bold text-[#111111] block">Isolated Container Runner</span>
                  <p className="text-[#50566A] leading-relaxed">
                    All Java code execution passes through disposable, network-isolated Docker sandbox containers with 256MB RAM caps.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </ElectricBorder>
        </motion.section>

        {/* Section 6: Final Call to Action Gateway */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <ElectricBorder
            color="#00e5ff"
            glowColor="#0066ff"
            borderRadius={16}
            speed={0.7}
            chaos={0.3}
            spread={0.5}
            thickness={1.6}
            strands={3}
            intensity={0.8}
            glow={0.7}
            arcs={1}
            interactive={true}
          >
            <div className="text-center p-8 sm:p-12 bg-white border border-[#E5E7EB] rounded-2xl space-y-6 shadow-sm">
              <div className="space-y-2 max-w-2xl mx-auto">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] text-[11px] font-mono text-[#50566A]">
                  <span>Ready to Get Started?</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                  <WordReveal
                    text="Enter the Java 21 Laboratory Today"
                    delay={0.1}
                  />
                </h2>
                <p className="text-xs sm:text-sm text-[#50566A] leading-relaxed">
                  Join hundreds of students, educators, and engineers mastering object-oriented programming through interactive deterministic visualization.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleEnterAsGuest}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Playground as Guest</span>
                </button>
                <button
                  onClick={() => handleOpenAuth('signup')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#111111] text-xs font-semibold hover:bg-[#F9FAFB] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Sign In / Create Account</span>
                </button>
              </div>
            </div>
          </ElectricBorder>
        </motion.section>
      </main>

      {/* Standalone Public Footer */}
      <footer className="relative z-10 border-t border-[#E5E7EB] bg-white/95 backdrop-blur-sm py-8 px-4 sm:px-8 text-xs text-[#50566A]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 font-mono">
            <Code2 className="w-4 h-4 text-[#111111] stroke-[1.5]" />
            <span className="font-bold text-[#111111]">OOPS LAB</span>
            <span>• Open-Source Interactive Java OOP Learning Laboratory</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={handleEnterAsGuest}
              className="hover:text-[#111111] transition-colors font-medium text-[#111111] cursor-pointer"
            >
              Enter as Guest
            </button>
            <button
              onClick={() => handleOpenAuth('signin')}
              className="hover:text-[#111111] transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <span className="text-[#9CA3AF]">•</span>
            <span>MIT License</span>
            <span>Target: Java 21 LTS</span>
          </div>
        </div>
      </footer>

      {/* Shared Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onContinueAsGuest={() => {
          setIsAuthModalOpen(false);
          handleEnterAsGuest();
        }}
      />

      {/* Interactive Demo Video Modal */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
};
