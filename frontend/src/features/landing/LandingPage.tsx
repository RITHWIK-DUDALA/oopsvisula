import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from 'motion/react';
import {
  Code2,
  ArrowRight,
  Sparkles,
  Shield,
  BookOpen,
  UserCheck,
  Lock,
  Boxes,
  Terminal,
  CheckCircle2,
  ChevronRight,
  Database,
} from 'lucide-react';
import { AuthModal } from '@/components/shared/AuthModal';
import { WordReveal } from './components/WordReveal';
import ElectricBorder from '@/components/ElectricBorder';
import Hyperspeed from '@/components/Hyperspeed';

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
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-foreground selection:text-background scroll-smooth relative overflow-x-hidden">
      {/* Real-time Smooth Scroll Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-foreground origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Interactive Hyperspeed Warp Light Trail Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <Hyperspeed
          curve="winding"
          curvature={0.8}
          speed={1.1}
          boost={2.5}
          fov={85}
          boostFov={125}
          lanes={3}
          roadWidth={12}
          medianWidth={2}
          density={35}
          trailLength={1.2}
          lightSize={1.1}
          poles={24}
          dust={120}
          glow={0.7}
          reflections={0.35}
          roadOpacity={0.06}
          steer={0.35}
          tailColors={['#00e5ff', '#0066ff', '#0284c7']}
          headColors={['#00d2ff', '#0070f3', '#38bdf8']}
          poleColors={['#00e5ff', '#0066ff']}
          theme="light"
          background="transparent"
          interactive={true}
        />
      </div>

      {/* Standalone Public Header */}
      <header className="sticky top-0 z-40 h-16 border-b border-border bg-white/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between transition-colors">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center font-bold shadow-xs">
            <Code2 className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-foreground block">
              OOPS LAB
            </span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
              Java 21 OOP Laboratory
            </span>
          </div>
        </div>

        {/* Public Navigation Anchor Links with Smooth Scrolling */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-medium text-muted-foreground">
          <a
            href="#what-we-do"
            onClick={(e) => handleSmoothScroll(e, 'what-we-do')}
            className="hover:text-foreground transition-colors"
          >
            What We Do
          </a>
          <a
            href="#features"
            onClick={(e) => handleSmoothScroll(e, 'features')}
            className="hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleSmoothScroll(e, 'how-it-works')}
            className="hover:text-foreground transition-colors"
          >
            How It Works
          </a>
          <a
            href="#architecture"
            onClick={(e) => handleSmoothScroll(e, 'architecture')}
            className="hover:text-foreground transition-colors"
          >
            Architecture
          </a>
        </nav>

        {/* Authentication & Guest Entry Gateway */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => handleOpenAuth('signin')}
            className="px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface rounded-lg transition-colors"
          >
            Sign In
          </button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleEnterAsGuest}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-black/90 active:scale-[0.98] transition-all shadow-xs"
          >
            <UserCheck className="w-3.5 h-3.5 stroke-[2]" />
            <span>Enter as Guest</span>
          </motion.button>
        </div>
      </header>

      {/* Main Public Marketing Body */}
      <main className="relative z-10 flex-1 space-y-24 py-12 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        {/* Section 1: Hero Banner */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6 pt-6 sm:pt-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-border bg-white text-xs text-muted-foreground font-medium shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-foreground stroke-[1.5]" />
            <span>Open-Source Interactive Java 21 Visualization Platform</span>
          </motion.div>

          {/* Word-by-Word Hero Title Appearance */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight sm:leading-tight">
            <WordReveal
              text="Learn Object-Oriented Programming by Seeing How the JVM Actually Runs."
              delay={0.15}
              wordDelay={0.045}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Traditional textbooks explain classes and inheritance with abstract metaphors. OOPS LAB pairs real Java 21 compilation with deterministic JDI execution tracing — rendering Stack Frames, Heap allocations, and reference pointers in real time.
          </motion.p>

          {/* Core Entry Actions with Micro-Interactions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEnterAsGuest}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-black/90 transition-all shadow-sm group"
            >
              <UserCheck className="w-4 h-4 stroke-[2]" />
              <span>Enter Laboratory as Guest</span>
              <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenAuth('signup')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-border bg-white text-foreground text-sm font-semibold hover:border-foreground hover:bg-surface transition-all"
            >
              <Lock className="w-4 h-4 stroke-[1.5]" />
              <span>Sign In / Create Account</span>
            </motion.button>
          </motion.div>

          {/* Trust Value Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-mono"
          >
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />
              <span>Zero Installation Required</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />
              <span>Java 21 LTS Platform</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />
              <span>Private Local Storage</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />
              <span>100% Free & Open-Source</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Section 2: What We Do (Interactive Visualizer Showcase) */}
        <motion.section
          id="what-we-do"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-6 scroll-mt-24"
        >
          <div className="text-center space-y-2">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Real-Time Execution Preview
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              <WordReveal
                text="What OOPS LAB Does: Deterministic Memory Projection"
                delay={0.1}
              />
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Select an OOP concept below to see how our simulation engine visualizes memory allocation and runtime stack frames.
            </p>
          </div>

          {/* Concept Tabs with Smooth Active Indicator */}
          <div className="flex items-center justify-center">
            <div className="p-1 bg-surface border border-border rounded-xl flex flex-wrap gap-1">
              {previewConcepts.map((concept, index) => (
                <button
                  key={concept.id}
                  onClick={() => setActiveConceptIndex(index)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    index === activeConceptIndex
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {index === activeConceptIndex && (
                    <motion.div
                      layoutId="activeConceptPill"
                      className="absolute inset-0 bg-white rounded-lg shadow-xs border border-border/80"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{concept.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Simulation Preview Card with Smooth Concept Transition */}
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
            <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-xs">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeConcept.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                {/* Preview Card Header */}
                <div className="p-4 sm:p-5 border-b border-border bg-surface/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {activeConcept.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-foreground">
                      {activeConcept.name}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground sm:max-w-md">
                    {activeConcept.summary}
                  </p>
                </div>

                {/* 3-Column Visual Layout (Code -> Stack -> Heap) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
                  {/* Column 1: Java Source Code */}
                  <div className="lg:col-span-5 p-5 bg-white space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span className="font-semibold text-foreground">Java 21 Source</span>
                      <span className="text-[10px] bg-surface px-2 py-0.5 rounded border border-border">
                        Executing Line {activeConcept.stackFrame.line}
                      </span>
                    </div>
                    <pre className="p-4 bg-surface/60 border border-border rounded-xl font-mono text-xs text-foreground leading-relaxed overflow-x-auto">
                      {activeConcept.codeSnippet}
                    </pre>
                  </div>

                  {/* Column 2: Call Stack Frame */}
                  <div className="lg:col-span-4 p-5 bg-surface/20 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span className="font-semibold text-foreground">Call Stack (LIFO)</span>
                      <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border text-foreground">
                        1 Active Frame
                      </span>
                    </div>

                    <div className="p-4 bg-white border border-border rounded-xl space-y-2.5">
                      <div className="font-mono text-xs font-bold text-foreground pb-2 border-b border-border flex items-center justify-between">
                        <span>{activeConcept.stackFrame.method}</span>
                        <span className="text-[10px] text-muted-foreground font-normal">Line {activeConcept.stackFrame.line}</span>
                      </div>

                      <div className="space-y-1.5 text-xs font-mono">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                          Local Variables
                        </span>
                        {activeConcept.stackFrame.vars.map((v) => (
                          <div key={v.name} className="flex items-center justify-between p-1.5 bg-surface rounded border border-border/60">
                            <span className="text-foreground font-medium">{v.name}</span>
                            <span className="text-muted-foreground">{v.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column 3: JVM Heap Object */}
                  <div className="lg:col-span-3 p-5 bg-surface/40 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span className="font-semibold text-foreground">JVM Eden Heap</span>
                      <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border text-foreground">
                        Allocated
                      </span>
                    </div>

                    <div className="p-4 bg-white border-2 border-foreground rounded-xl space-y-2.5">
                      <div className="font-mono text-xs font-bold text-foreground pb-2 border-b border-border flex items-center justify-between">
                        <span>{activeConcept.heapObject.className}</span>
                        <span className="text-[10px] text-muted-foreground">{activeConcept.heapObject.address}</span>
                      </div>

                      <div className="space-y-1 text-xs font-mono">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                          Instance Fields
                        </span>
                        {activeConcept.heapObject.fields.map((f) => (
                          <div key={f.name} className="flex items-center justify-between p-1 bg-surface rounded">
                            <span className="text-foreground">{f.name}:</span>
                            <span className="text-foreground font-semibold">{f.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Gateway Banner Inside Preview */}
            <div className="p-4 bg-surface border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-foreground inline-block" />
                <span>Preview Mode — Enter as guest to edit code, trace execution, and design custom class diagrams.</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEnterAsGuest}
                className="px-4 py-2 bg-foreground text-background font-medium rounded-lg hover:bg-black/90 transition-all flex items-center justify-center space-x-1.5 shrink-0 shadow-2xs"
              >
                <span>Launch Full Visualizer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
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
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Core Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              <WordReveal
                text="Everything You Need to Master Object-Oriented Design"
                delay={0.1}
              />
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Engineered as a comprehensive, end-to-end laboratory with zero distractions.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <motion.div
              variants={cardItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 bg-white border border-border rounded-2xl space-y-3 shadow-2xs hover:border-foreground/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
                <Terminal className="w-5 h-5 text-foreground stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-foreground">3-Panel Execution Workspace</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Seamlessly integrated Monaco Java 21 editor, interactive Memory Canvas, and runtime Execution Inspector with variable scopes, timeline scrubber, and console output.
              </p>
            </motion.div>

            <motion.div
              variants={cardItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 bg-white border border-border rounded-2xl space-y-3 shadow-2xs hover:border-foreground/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
                <Boxes className="w-5 h-5 text-foreground stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-foreground">Visual UML Class Builder</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Design classes, records, and interfaces with visual drag-and-drop connectors for inheritance, interface realization, composition, and aggregation. Generates idiomatic Java 21 code in real time.
              </p>
            </motion.div>

            <motion.div
              variants={cardItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 bg-white border border-border rounded-2xl space-y-3 shadow-2xs hover:border-foreground/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
                <Shield className="w-5 h-5 text-foreground stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-foreground">AST Security Sandbox</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Multi-layered JavaParser static analysis blocks dangerous system calls, reflection, file I/O, and networking before code is executed inside resource-capped container workers.
              </p>
            </motion.div>

            <motion.div
              variants={cardItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 bg-white border border-border rounded-2xl space-y-3 shadow-2xs hover:border-foreground/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-foreground stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-foreground">14-Step Curriculum & Auto-Grading</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Structured pedagogical framework covering foundations, OOP principles, UML relationships, and modern Java 21 features with real-time AST assertion challenges.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Section 4: How It Works */}
        <motion.section
          id="how-it-works"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="p-8 bg-white border border-border rounded-2xl space-y-6 shadow-xs scroll-mt-24"
        >
          <div className="space-y-1">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Simulation Pipeline
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
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
              className="p-4 bg-surface/50 border border-border rounded-xl space-y-2 hover:bg-surface transition-colors"
            >
              <span className="text-[10px] text-muted-foreground block">STEP 01</span>
              <span className="font-bold text-foreground block">Author Java 21 Code</span>
              <p className="text-[11px] font-sans text-muted-foreground leading-normal">
                Type directly in Monaco or visually model classes with the diagram builder.
              </p>
            </motion.div>

            <motion.div
              variants={cardItem}
              className="p-4 bg-surface/50 border border-border rounded-xl space-y-2 hover:bg-surface transition-colors"
            >
              <span className="text-[10px] text-muted-foreground block">STEP 02</span>
              <span className="font-bold text-foreground block">AST Security Scan</span>
              <p className="text-[11px] font-sans text-muted-foreground leading-normal">
                JavaParser validates syntax and enforces security boundaries before queuing.
              </p>
            </motion.div>

            <motion.div
              variants={cardItem}
              className="p-4 bg-surface/50 border border-border rounded-xl space-y-2 hover:bg-surface transition-colors"
            >
              <span className="text-[10px] text-muted-foreground block">STEP 03</span>
              <span className="font-bold text-foreground block">JDI Trace Capture</span>
              <p className="text-[11px] font-sans text-muted-foreground leading-normal">
                Isolated workers execute code and record microsecond heap/stack events.
              </p>
            </motion.div>

            <motion.div
              variants={cardItem}
              className="p-4 bg-surface/50 border border-border rounded-xl space-y-2 hover:bg-surface transition-colors"
            >
              <span className="text-[10px] text-muted-foreground block">STEP 04</span>
              <span className="font-bold text-foreground block">Interactive Replay</span>
              <p className="text-[11px] font-sans text-muted-foreground leading-normal">
                Replay forwards and backwards with pointer resolution and scope tracking.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Section 5: Architecture & Privacy */}
        <motion.section
          id="architecture"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="p-8 bg-surface/50 border border-border rounded-2xl space-y-6 scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Privacy & Governance
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-0.5">
                <WordReveal
                  text="Local-First & Zero Tracking Architecture"
                  delay={0.1}
                />
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-muted-foreground">
              <Database className="w-4 h-4 text-foreground stroke-[1.5]" />
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
              className="p-4 bg-white border border-border rounded-xl space-y-1.5 shadow-2xs"
            >
              <span className="font-bold text-foreground block">Guest Session Security</span>
              <p className="text-muted-foreground leading-relaxed">
                Guest users have full access to all features. All progress, code snippets, and challenges are stored locally in your browser.
              </p>
            </motion.div>

            <motion.div
              variants={cardItem}
              className="p-4 bg-white border border-border rounded-xl space-y-1.5 shadow-2xs"
            >
              <span className="font-bold text-foreground block">Full JSON Export</span>
              <p className="text-muted-foreground leading-relaxed">
                Export and import your entire learning session at any time with one click from the Progress and Profile pages.
              </p>
            </motion.div>

            <motion.div
              variants={cardItem}
              className="p-4 bg-white border border-border rounded-xl space-y-1.5 shadow-2xs"
            >
              <span className="font-bold text-foreground block">Isolated Container Runner</span>
              <p className="text-muted-foreground leading-relaxed">
                All Java code execution passes through disposable, network-isolated Docker sandbox containers with 256MB RAM caps.
              </p>
            </motion.div>
          </motion.div>
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
            <div className="text-center p-8 sm:p-12 bg-white border border-border rounded-2xl space-y-6 shadow-sm">
              <div className="space-y-2 max-w-2xl mx-auto">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-surface border border-border text-[11px] font-mono text-muted-foreground">
                  <span>Ready to Get Started?</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  <WordReveal
                    text="Enter the Java 21 Laboratory Today"
                    delay={0.1}
                  />
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No mandatory sign-in required. Enter immediately as a guest to write code, inspect runtime memory, and master Object-Oriented Programming.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEnterAsGuest}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-black/90 transition-all shadow-sm group"
                >
                  <UserCheck className="w-4 h-4 stroke-[2]" />
                  <span>Enter Laboratory as Guest</span>
                  <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenAuth('signin')}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-border bg-white text-foreground text-sm font-semibold hover:border-foreground hover:bg-surface transition-all"
                >
                  <Lock className="w-4 h-4 stroke-[1.5]" />
                  <span>Sign In / Create Account</span>
                </motion.button>
              </div>
            </div>
          </ElectricBorder>
        </motion.section>
      </main>

      {/* Standalone Public Footer */}
      <footer className="relative z-10 border-t border-border bg-white/90 backdrop-blur-sm py-8 px-4 sm:px-8 text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 font-mono">
            <Code2 className="w-4 h-4 text-foreground stroke-[1.5]" />
            <span className="font-bold text-foreground">OOPS LAB</span>
            <span>• Open-Source Interactive Java OOP Learning Laboratory</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={handleEnterAsGuest}
              className="hover:text-foreground transition-colors font-medium text-foreground"
            >
              Enter as Guest
            </button>
            <button
              onClick={() => handleOpenAuth('signin')}
              className="hover:text-foreground transition-colors"
            >
              Sign In
            </button>
            <span className="text-muted-foreground/60">•</span>
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
    </div>
  );
};
