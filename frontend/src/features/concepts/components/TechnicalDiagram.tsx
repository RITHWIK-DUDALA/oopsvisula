import React, { useState, useRef } from 'react';
import {
  Layers,
  ArrowRight,
  AlertCircle,
  Database,
  Cpu,
  ShieldCheck,
  FileCode,
  Lock,
} from 'lucide-react';
import { ImageExportButton } from '@/components/shared/ImageExportButton';

export type DiagramType =
  | 'bit-width'
  | 'stack-heap'
  | 'widening-narrowing'
  | 'scope-blocks'
  | 'overflow-ring'
  | 'jvm-architecture'
  | 'compilation-pipeline'
  | 'inheritance-hierarchy'
  | 'vtable-dispatch'
  | 'encapsulation-shield'
  | 'interface-contract'
  | 'string-pool'
  | 'collection-hierarchy'
  | 'exception-flow'
  | 'thread-timeline'
  | 'object-coupling'
  | 'control-flow'
  | 'class-blueprint'
  | 'constructor-chaining'
  | 'solid-principle'
  | 'design-pattern';

export interface TechnicalDiagramProps {
  type: DiagramType;
  title: string;
  subtitle?: string;
  config?: Record<string, any>;
}

/**
 * TechnicalDiagram Component
 * Follows stageshow craft standards:
 * - High-contrast monochromatic precision with signature cobalt blue (#075CF5) and warm orange (#FF7A00).
 * - Exact mathematical representations: bit layouts, sign bits, stack/heap addresses, conversion graphs.
 * - Technical annotations, legends, and clear educational callouts.
 */
export const TechnicalDiagram: React.FC<TechnicalDiagramProps> = ({
  type,
  title,
  subtitle,
  config = {},
}) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  // Render Bit-Width Layout
  const renderBitWidthDiagram = () => {
    const bits: number = config.bits || 8;
    const typeName: string = config.typeName || 'byte';
    const sampleVal: number | string = config.sampleValue ?? 42;
    const binaryStr: string = config.binaryStr || '00101010';
    const minVal: string = config.minVal || '-128';
    const maxVal: string = config.maxVal || '127';

    const bitArr = binaryStr.padStart(bits, '0').slice(-bits).split('');

    return (
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B]">
            <span>Most Significant Bit (MSB / Sign)</span>
            <span>Least Significant Bit (LSB)</span>
          </div>

          <div className="grid gap-1 sm:gap-1.5" style={{ gridTemplateColumns: `repeat(${Math.min(bits, 16)}, minmax(0, 1fr))` }}>
            {bitArr.slice(0, 16).map((bit, idx) => {
              const isSignBit = idx === 0;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-[9px] font-mono text-[#94A3B8] mb-0.5">
                    {bits - 1 - idx}
                  </span>
                  <div
                    className={`w-full h-10 sm:h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm sm:base border transition-colors ${
                      isSignBit
                        ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]'
                        : bit === '1'
                        ? 'bg-[#EFF6FF] text-[#075CF5] border-[#BFDBFE]'
                        : 'bg-white text-[#64748B] border-[#E5E7EB]'
                    }`}
                  >
                    {bit}
                  </div>
                </div>
              );
            })}
          </div>

          {bits > 16 && (
            <div className="text-center py-1">
              <span className="text-[11px] font-mono text-[#94A3B8]">
                ... ({bits - 16} additional higher-order bits initialized to 0) ...
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <span className="text-[10px] font-mono uppercase text-[#64748B] block">Type & Size</span>
            <span className="text-xs font-bold text-[#17191D] font-mono">{typeName} ({bits} bits / {bits / 8}B)</span>
          </div>
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <span className="text-[10px] font-mono uppercase text-[#64748B] block">Sample Decimal</span>
            <span className="text-xs font-bold text-[#075CF5] font-mono">{sampleVal}</span>
          </div>
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <span className="text-[10px] font-mono uppercase text-[#64748B] block">Minimum Bound</span>
            <span className="text-xs font-bold text-[#C2410C] font-mono">{minVal}</span>
          </div>
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <span className="text-[10px] font-mono uppercase text-[#64748B] block">Maximum Bound</span>
            <span className="text-xs font-bold text-[#047857] font-mono">{maxVal}</span>
          </div>
        </div>

        <div className="p-3.5 bg-[#FFF7ED]/60 border border-[#FED7AA]/60 rounded-xl flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
          <p className="text-xs text-[#7C2D12] leading-relaxed">
            <strong className="font-semibold">Two's Complement Representation:</strong> Java integers are strictly signed. When MSB is 0, the value is positive or zero. When MSB is 1, the number is negative, computed by inverting all bits and adding 1.
          </p>
        </div>
      </div>
    );
  };

  // Render Stack vs Heap
  const renderStackHeapDiagram = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#075CF5]" />
              <h4 className="text-xs font-bold text-[#17191D]">JVM Call Stack (Thread-Private)</h4>
            </div>
            <span className="text-[10px] font-mono text-[#64748B]">Fast / LIFO</span>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-mono text-[#64748B]">Stack Frame: main() [Active]</div>
            <div className="p-2.5 bg-[#EFF6FF]/60 border border-[#BFDBFE] rounded-lg flex items-center justify-between text-xs font-mono">
              <div>
                <span className="font-bold text-[#075CF5]">int count</span>
                <span className="text-[10px] text-[#64748B] ml-1.5">(primitive 32-bit)</span>
              </div>
              <span className="px-2 py-0.5 bg-white rounded font-bold text-[#17191D] border border-[#BFDBFE]">
                42
              </span>
            </div>

            <div className="p-2.5 bg-[#FFF7ED]/70 border border-[#FED7AA] rounded-lg flex items-center justify-between text-xs font-mono relative">
              <div>
                <span className="font-bold text-[#C2410C]">String name</span>
                <span className="text-[10px] text-[#64748B] ml-1.5">(reference 64-bit)</span>
              </div>
              <span className="px-2 py-0.5 bg-white rounded font-bold text-[#C2410C] border border-[#FED7AA] flex items-center space-x-1">
                <span>0x7F01A4</span>
                <ArrowRight className="w-3 h-3 text-[#FF7A00]" />
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-[#047857]" />
              <h4 className="text-xs font-bold text-[#17191D]">JVM Heap (Shared Across Threads)</h4>
            </div>
            <span className="text-[10px] font-mono text-[#64748B]">GC Managed</span>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="font-bold text-[#17191D]">String Object Instance</span>
              <span className="px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0] text-[#075CF5]">@0x7F01A4</span>
            </div>
            <div className="p-2 bg-white rounded-lg border border-[#E2E8F0] space-y-1 font-mono text-xs">
              <div className="text-[10px] text-[#64748B] uppercase">Object Header (12B compressed OOPs)</div>
              <div className="flex justify-between text-[#374151]">
                <span>value[]:</span>
                <span className="font-bold text-[#075CF5]">"OOPS LAB"</span>
              </div>
              <div className="flex justify-between text-[#374151]">
                <span>coder:</span>
                <span>0 (LATIN1)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Widening & Narrowing Conversion
  const renderWideningNarrowingDiagram = () => {
    const types = ['byte (8b)', 'short (16b)', 'int (32b)', 'long (64b)', 'float (32b)', 'double (64b)'];
    return (
      <div className="space-y-4">
        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3 shadow-2xs">
          <div className="text-xs font-bold text-[#075CF5] flex items-center space-x-1.5 font-mono">
            <span>Widening Conversion (Safe, Implicit, Lossless)</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {types.map((t, idx) => (
              <React.Fragment key={t}>
                <span className="px-3 py-1.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg font-mono text-xs font-bold text-[#075CF5]">
                  {t}
                </span>
                {idx < types.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8]" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3 shadow-2xs">
          <div className="text-xs font-bold text-[#C2410C] flex items-center space-x-1.5 font-mono">
            <span>Narrowing Conversion (Explicit Cast Required, Truncation Risk)</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[...types].reverse().map((t, idx) => (
              <React.Fragment key={t}>
                <span className="px-3 py-1.5 bg-[#FFF7ED] border border-[#FED7AA] rounded-lg font-mono text-xs font-bold text-[#C2410C]">
                  {t}
                </span>
                {idx < types.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8]" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render Scope & Lexical Blocks
  const renderScopeBlocksDiagram = () => {
    return (
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3 font-mono text-xs">
        <div className="p-3 border-2 border-dashed border-[#94A3B8] rounded-xl space-y-2">
          <div className="font-bold text-[#17191D] flex justify-between">
            <span>Class Scope: class BankAccount</span>
            <span className="text-[10px] text-[#64748B]">Instance Fields alive while object exists</span>
          </div>
          <div className="px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-[#075CF5] w-fit">
            private double balance; // Instance field
          </div>

          <div className="p-3 border-2 border-dashed border-[#075CF5]/40 rounded-lg bg-[#EFF6FF]/20 space-y-2">
            <div className="flex items-center justify-between text-[#075CF5] font-bold">
              <span>Method Scope: void deposit(double amount)</span>
              <span className="text-[10px] font-normal">Parameters alive during execution</span>
            </div>
            <div className="px-2.5 py-1 bg-white border border-[#BFDBFE] rounded text-[#17191D] w-fit">
              double fee = 1.50; // Method local variable
            </div>

            <div className="p-3 border border-[#FED7AA] rounded-lg bg-[#FFF7ED]/30 space-y-1.5">
              <div className="flex items-center justify-between text-[#C2410C] font-bold">
                <span>Block Scope: if (amount &gt; 1000)</span>
                <span className="text-[10px] font-normal text-[#64748B]">Dead outside closing brace</span>
              </div>
              <div className="px-2.5 py-1 bg-white border border-[#FED7AA] rounded text-[#C2410C] w-fit">
                String bonusTier = "VIP";
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Overflow Ring
  const renderOverflowRingDiagram = () => {
    return (
      <div className="p-6 bg-white border border-[#E5E7EB] rounded-xl flex flex-col items-center space-y-4 text-center">
        <div className="text-xs font-mono text-[#64748B]">
          Circular Wraparound Property of Signed 8-bit Integer (<code className="text-[#075CF5]">byte</code>)
        </div>
        <div className="relative w-48 h-48 rounded-full border-4 border-dashed border-[#CBD5E1] flex items-center justify-center">
          <div className="absolute top-2 font-mono font-bold text-xs text-[#047857]">0 (00000000)</div>
          <div className="absolute right-2 font-mono font-bold text-xs text-[#075CF5]">+127 (01111111)</div>
          <div className="absolute bottom-2 font-mono font-bold text-xs text-[#C2410C]">-128 (10000000)</div>
          <div className="absolute left-2 font-mono font-bold text-xs text-[#C2410C]">-1 (11111111)</div>
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-mono">
            <span className="block font-bold text-[#17191D]">127 + 1</span>
            <span className="text-[#C2410C] font-bold">wraps to -128!</span>
          </div>
        </div>
      </div>
    );
  };

  // NEW: JVM Architecture Diagram (Part 5.A)
  const renderJvmArchitectureDiagram = () => {
    const areas = [
      { id: 'classloader', title: 'Class Loader Subsystem', desc: 'Loading (Bootstrap, Extension, App), Linking (Verify, Prepare, Resolve), Initialization', color: 'blue' },
      { id: 'methodarea', title: 'Method Area / Metaspace', desc: 'Stores class metadata, method bytecode, runtime constant pool, static variables (Shared)', color: 'neutral' },
      { id: 'heap', title: 'JVM Heap Memory', desc: 'Young Generation (Eden, S0, S1) and Old (Tenured) Generation. Holds all Object instances and arrays (Shared)', color: 'orange' },
      { id: 'stack', title: 'Thread Stacks (JVM Stack)', desc: 'Frame per method call: Local Variable Array, Operand Stack, Frame Data. LIFO execution (Thread-Private)', color: 'blue' },
      { id: 'pc', title: 'PC Registers & Native Stacks', desc: 'Program Counter stores JVM opcode address currently executing per thread', color: 'neutral' },
      { id: 'engine', title: 'Execution Engine', desc: 'Interpreter, JIT Compiler (C1 / C2 with HotSpot Tiered Compilation), Garbage Collector (ZGC / G1)', color: 'orange' },
    ];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {areas.map((a) => (
            <div
              key={a.id}
              onClick={() => setSelectedElement(a.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                selectedElement === a.id
                  ? 'border-[#075CF5] bg-[#EFF6FF] shadow-sm'
                  : 'border-[#E5E7EB] bg-white hover:border-[#94A3B8]'
              }`}
            >
              <div className="flex items-center space-x-2 pb-1.5">
                <Cpu className="w-4 h-4 text-[#075CF5]" />
                <h4 className="text-xs font-bold text-[#17191D]">{a.title}</h4>
              </div>
              <p className="text-[11px] text-[#64748B] leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
        <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#374151] flex items-center justify-between">
          <span className="font-mono text-[11px] text-[#075CF5] font-bold">Interactive Architecture Inspector:</span>
          <span>Click any JVM subsystem above to inspect thread-isolation guarantees and execution role.</span>
        </div>
      </div>
    );
  };

  // NEW: Compilation Pipeline (Part 5.A)
  const renderCompilationPipelineDiagram = () => {
    const stages = [
      { step: '01', name: 'Java Source (.java)', role: 'Human-readable UTF-8 source text', badge: 'Developer' },
      { step: '02', name: 'javac Compiler', role: 'Lexical, syntax, semantic analysis & type checking', badge: 'Compile-Time' },
      { step: '03', name: 'Java Bytecode (.class)', role: 'Portable platform-neutral JVM instruction set', badge: 'WORA' },
      { step: '04', name: 'JVM Execution', role: 'Class verification, bytecode interpretation & JIT native compilation', badge: 'Runtime' },
      { step: '05', name: 'CPU Machine Code', role: 'Direct hardware register & CPU instruction execution (x86/ARM)', badge: 'Hardware' },
    ];

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {stages.map((st, idx) => (
            <div key={st.step} className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#075CF5]">
                  <span>STEP {st.step}</span>
                  <span className="px-1.5 py-0.2 bg-[#EFF6FF] rounded text-[9px]">{st.badge}</span>
                </div>
                <h4 className="text-xs font-bold text-[#17191D] mt-1">{st.name}</h4>
                <p className="text-[10px] text-[#64748B] mt-1 leading-normal">{st.role}</p>
              </div>
              {idx < stages.length - 1 && (
                <div className="hidden sm:flex justify-end text-[#94A3B8]">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // NEW: Inheritance Hierarchy & Override (Part 6)
  const renderInheritanceHierarchyDiagram = () => {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-3">
          {/* Base Class */}
          <div className="w-72 p-3 bg-white border-2 border-[#075CF5] rounded-xl shadow-xs space-y-1.5">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-1 text-xs font-mono">
              <span className="font-bold text-[#075CF5]">class BankAccount</span>
              <span className="text-[10px] text-[#64748B]">Superclass</span>
            </div>
            <div className="text-[11px] font-mono text-[#475569] space-y-0.5">
              <div># double balance</div>
              <div className="text-[#075CF5] font-semibold">+ void deposit(double)</div>
              <div className="text-[#075CF5] font-semibold">+ void withdraw(double)</div>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-[#075CF5] font-mono text-xs">
            <span className="text-base">▲</span>
            <span className="text-[10px] tracking-wider uppercase font-bold">extends (is-a relationship)</span>
          </div>

          {/* Subclass */}
          <div className="w-72 p-3 bg-white border-2 border-[#C2410C] rounded-xl shadow-xs space-y-1.5">
            <div className="flex items-center justify-between border-b border-[#FED7AA] pb-1 text-xs font-mono">
              <span className="font-bold text-[#C2410C]">class SavingsAccount</span>
              <span className="text-[10px] text-[#64748B]">Subclass</span>
            </div>
            <div className="text-[11px] font-mono text-[#475569] space-y-0.5">
              <div>- double interestRate</div>
              <div className="text-[#C2410C] font-semibold">+ @Override void withdraw(double)</div>
              <div>+ void applyInterest()</div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl text-xs text-[#7C2D12] flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#C2410C]" />
          <span>Liskov Substitution Principle: Any code expecting <code className="font-mono font-bold">BankAccount</code> can safely operate on a <code className="font-mono font-bold">SavingsAccount</code> instance without altering program correctness.</span>
        </div>
      </div>
    );
  };

  // NEW: Dynamic Dispatch / VTable (Part 6)
  const renderVTableDiagram = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
          <div className="text-xs font-mono font-bold text-[#075CF5] flex items-center space-x-1.5">
            <FileCode className="w-4 h-4" />
            <span>Declared Reference Type</span>
          </div>
          <div className="p-2.5 bg-[#EFF6FF] rounded-lg border border-[#BFDBFE] font-mono text-xs">
            Shape s = new Circle();<br />
            s.draw(); // Dynamic Dispatch!
          </div>
          <p className="text-xs text-[#64748B]">
            Compiler checks <code className="text-[#17191D]">Shape</code> for the <code className="text-[#075CF5]">draw()</code> signature at compile time.
          </p>
        </div>

        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
          <div className="text-xs font-mono font-bold text-[#C2410C] flex items-center space-x-1.5">
            <Cpu className="w-4 h-4" />
            <span>Runtime VTable Lookup (invokevirtual)</span>
          </div>
          <div className="p-2.5 bg-[#FFF7ED] rounded-lg border border-[#FED7AA] font-mono text-xs space-y-1">
            <div className="flex justify-between">
              <span>Actual Heap Type:</span>
              <span className="font-bold text-[#C2410C]">Circle @0x4C9D</span>
            </div>
            <div className="flex justify-between">
              <span>VTable Slot #3:</span>
              <span className="font-bold text-[#047857]">Circle.draw() [Overridden]</span>
            </div>
          </div>
          <p className="text-xs text-[#64748B]">
            JVM dereferences the target object header to locate its vtable and invokes the concrete subclass method.
          </p>
        </div>
      </div>
    );
  };

  // NEW: Encapsulation Shield (Part 6)
  const renderEncapsulationShieldDiagram = () => {
    return (
      <div className="p-6 bg-white border border-[#E5E7EB] rounded-2xl flex flex-col items-center space-y-4">
        <div className="relative p-8 rounded-2xl border-2 border-[#075CF5] bg-[#EFF6FF]/20 flex flex-col items-center text-center max-w-md w-full">
          <div className="absolute -top-3 px-3 py-0.5 bg-[#075CF5] text-white text-[10px] font-mono font-bold rounded-full flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Encapsulation Barrier (Public Interface)</span>
          </div>

          {/* Inner Private State */}
          <div className="p-4 rounded-xl bg-white border border-[#BFDBFE] shadow-sm w-full space-y-2">
            <div className="flex items-center justify-center space-x-1 text-xs font-mono font-bold text-[#C2410C]">
              <Lock className="w-3.5 h-3.5" />
              <span>Private Internal State</span>
            </div>
            <div className="p-2 bg-[#FFF7ED] rounded font-mono text-xs text-[#C2410C] font-semibold">
              private double balance = 500.0;
            </div>
          </div>

          {/* Method Gates */}
          <div className="grid grid-cols-2 gap-2 w-full pt-4 font-mono text-[11px]">
            <div className="p-2 bg-white rounded-lg border border-[#075CF5]/50 text-[#075CF5] font-semibold">
              + deposit(amt &gt; 0)
            </div>
            <div className="p-2 bg-white rounded-lg border border-[#075CF5]/50 text-[#075CF5] font-semibold">
              + withdraw(amt &le; bal)
            </div>
          </div>
        </div>

        <p className="text-xs text-[#64748B] max-w-lg text-center leading-relaxed">
          External code cannot directly mutate private state. Every mutation passes through validating methods that enforce business invariants.
        </p>
      </div>
    );
  };

  // NEW: String Pool & Interning (Part 5.H)
  const renderStringPoolDiagram = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3">
          <div className="text-xs font-mono font-bold text-[#075CF5]">String Literal Interning</div>
          <div className="p-3 bg-[#EFF6FF] rounded-lg border border-[#BFDBFE] font-mono text-xs space-y-1">
            <div>String s1 = "Java";</div>
            <div>String s2 = "Java";</div>
            <div className="text-[#047857] font-bold">s1 == s2 // true (Same object!)</div>
          </div>
          <p className="text-xs text-[#64748B]">Literals are interned automatically in the String Pool inside the Heap.</p>
        </div>

        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3">
          <div className="text-xs font-mono font-bold text-[#C2410C]">Heap Allocation via new</div>
          <div className="p-3 bg-[#FFF7ED] rounded-lg border border-[#FED7AA] font-mono text-xs space-y-1">
            <div>String s3 = new String("Java");</div>
            <div className="text-[#C2410C] font-bold">s1 == s3 // false (Separate memory!)</div>
            <div className="text-[#075CF5] font-bold">s1.equals(s3) // true (Content matches)</div>
          </div>
          <p className="text-xs text-[#64748B]">new String() creates a distinct object outside the String Pool pool cache.</p>
        </div>
      </div>
    );
  };

  // NEW: Exception Hierarchy & Handling (Part 5.I)
  const renderExceptionFlowDiagram = () => {
    return (
      <div className="space-y-3">
        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-[#17191D]">java.lang.Throwable Hierarchy</span>
            <span className="text-[#64748B]">Type System Classification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-[#FFF7ED] border border-[#FED7AA] rounded-lg space-y-1">
              <span className="font-bold text-[#C2410C]">Error</span>
              <p className="text-[10px] text-[#7C2D12]">Fatal JVM conditions (OutOfMemoryError, StackOverflowError). Unchecked.</p>
            </div>
            <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg space-y-1">
              <span className="font-bold text-[#075CF5]">Exception (Checked)</span>
              <p className="text-[10px] text-[#1E3A8A]">Anticipated recoverable faults (IOException, SQLException). Must declare or handle.</p>
            </div>
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-1">
              <span className="font-bold text-[#17191D]">RuntimeException</span>
              <p className="text-[10px] text-[#475569]">Programmer bugs (NullPointerException, IndexOutOfBoundsException). Unchecked.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // NEW: Thread States & Timeline (Part 5.K)
  const renderThreadTimelineDiagram = () => {
    const states = [
      { name: 'NEW', desc: 'Thread instantiated via new Thread(), not yet started' },
      { name: 'RUNNABLE', desc: 'Executing bytecode or eligible for OS scheduling' },
      { name: 'BLOCKED', desc: 'Waiting for monitor lock to enter synchronized block' },
      { name: 'WAITING', desc: 'Waiting indefinitely via Object.wait() or Thread.join()' },
      { name: 'TIMED_WAITING', desc: 'Sleeping or waiting with timeout via Thread.sleep(ms)' },
      { name: 'TERMINATED', desc: 'run() method completed or terminated by uncaught exception' },
    ];

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {states.map((st) => (
            <div key={st.name} className="p-3 bg-white border border-[#E5E7EB] rounded-xl flex flex-col justify-between space-y-1">
              <span className="font-mono font-bold text-xs text-[#075CF5]">{st.name}</span>
              <p className="text-[10px] text-[#64748B] leading-tight">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // NEW: Object Coupling & Relationships (Part 6)
  const renderObjectCouplingDiagram = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#17191D]">
            <span>◆ Composition (Strong Coupling)</span>
          </div>
          <p className="text-xs text-[#64748B]">
            Part-whole lifecycle dependency. The child cannot exist without the parent. If Car is garbage collected, Engine is also destroyed.
          </p>
          <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded font-mono text-xs">
            class Car {'{ private final Engine engine = new Engine(); }'}
          </div>
        </div>

        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#075CF5]">
            <span>◇ Aggregation (Weak Coupling)</span>
          </div>
          <p className="text-xs text-[#64748B]">
            Shared lifecycle. The child can exist independently of the parent. If Department is destroyed, Teachers continue to exist.
          </p>
          <div className="p-2 bg-[#EFF6FF] border border-[#BFDBFE] rounded font-mono text-xs">
            class Department {'{ private List<Teacher> teachers; }'}
          </div>
        </div>
      </div>
    );
  };

  // NEW: Collections Framework Hierarchy (Part 5.J)
  const renderCollectionHierarchyDiagram = () => {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5 font-mono text-xs">
            <span className="font-bold text-[#075CF5]">List (Ordered, Duplicates)</span>
            <ul className="text-[11px] text-[#64748B] space-y-1">
              <li>• <strong className="text-[#17191D]">ArrayList:</strong> Contiguous dynamic array, O(1) random access</li>
              <li>• <strong className="text-[#17191D]">LinkedList:</strong> Doubly-linked nodes, O(1) insert/delete at head/tail</li>
            </ul>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5 font-mono text-xs">
            <span className="font-bold text-[#C2410C]">Set (Unique Elements)</span>
            <ul className="text-[11px] text-[#64748B] space-y-1">
              <li>• <strong className="text-[#17191D]">HashSet:</strong> Backed by HashMap, O(1) lookup, unordered</li>
              <li>• <strong className="text-[#17191D]">TreeSet:</strong> Red-Black Tree, O(log N), natural sorted order</li>
            </ul>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5 font-mono text-xs">
            <span className="font-bold text-[#047857]">Map (Key-Value Pairs)</span>
            <ul className="text-[11px] text-[#64748B] space-y-1">
              <li>• <strong className="text-[#17191D]">HashMap:</strong> Hash table with linked buckets and red-black tree bins</li>
              <li>• <strong className="text-[#17191D]">LinkedHashMap:</strong> Predictable insertion/access order</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Render Class Blueprint vs Independent Heap Instances
  const renderClassBlueprintDiagram = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Class Blueprint */}
          <div className="md:col-span-5 p-4 bg-white border-2 border-[#075CF5] rounded-xl shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
              <span className="text-[10px] font-mono text-[#075CF5] font-bold uppercase tracking-wider">«Class Blueprint in Metaspace»</span>
              <span className="text-[10px] font-mono bg-blue-50 text-[#075CF5] px-1.5 py-0.5 rounded font-bold">BankAccount</span>
            </div>
            <div className="text-[11px] font-mono text-[#64748B] space-y-1">
              <div className="text-[#17191D] font-semibold text-[10px] uppercase">Declared Fields:</div>
              <div>- String accountNumber</div>
              <div>- double balance</div>
              <div>- String owner</div>
            </div>
            <div className="text-[11px] font-mono text-[#64748B] space-y-1 border-t border-[#E5E7EB] pt-1.5">
              <div className="text-[#17191D] font-semibold text-[10px] uppercase">Methods:</div>
              <div>+ deposit(double) : void</div>
              <div>+ withdraw(double) : void</div>
            </div>
          </div>

          {/* Instantiation Arrow */}
          <div className="md:col-span-2 flex flex-col items-center justify-center space-y-1 text-center py-2">
            <span className="text-[10px] font-mono font-bold text-[#FF7A00] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
              new
            </span>
            <ArrowRight className="w-5 h-5 text-[#FF7A00] hidden md:block" />
            <span className="text-[9px] font-mono text-[#64748B]">Independent Allocations</span>
          </div>

          {/* Concrete Heap Instances */}
          <div className="md:col-span-5 space-y-3">
            <div className="p-3 bg-white border border-[#10B981] rounded-xl shadow-xs space-y-1 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-1">
                <span className="font-bold text-[#10B981]">Instance A: @0x2F1A</span>
                <span className="text-[9px] text-[#64748B]">Heap Eden</span>
              </div>
              <div className="text-[11px] text-[#334155] space-y-0.5">
                <div>accountNumber: <span className="font-bold">"ACC-101"</span></div>
                <div>balance: <span className="font-bold text-[#075CF5]">500.0</span></div>
                <div>owner: <span className="font-bold">"Alice"</span></div>
              </div>
            </div>

            <div className="p-3 bg-white border border-[#075CF5] rounded-xl shadow-xs space-y-1 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-1">
                <span className="font-bold text-[#075CF5]">Instance B: @0x8E3B</span>
                <span className="text-[9px] text-[#64748B]">Heap Eden</span>
              </div>
              <div className="text-[11px] text-[#334155] space-y-0.5">
                <div>accountNumber: <span className="font-bold">"ACC-102"</span></div>
                <div>balance: <span className="font-bold text-[#075CF5]">1,250.0</span></div>
                <div>owner: <span className="font-bold">"Bob"</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Constructor Chaining & Initialization Sequence
  const renderConstructorChainingDiagram = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3.5 bg-white border-2 border-[#64748B] rounded-xl space-y-2">
            <div className="flex items-center space-x-1.5 text-[10px] font-bold text-[#64748B] uppercase">
              <span className="w-4 h-4 rounded-full bg-[#64748B] text-white flex items-center justify-center text-[9px]">1</span>
              <span>Default Zeroes</span>
            </div>
            <p className="text-[11px] text-[#334155] leading-normal font-sans">
              JVM clears allocated heap bytes to zeroes (<code className="text-[#075CF5]">0</code>, <code className="text-[#075CF5]">null</code>, <code className="text-[#075CF5]">false</code>).
            </p>
          </div>

          <div className="p-3.5 bg-white border-2 border-[#075CF5] rounded-xl space-y-2">
            <div className="flex items-center space-x-1.5 text-[10px] font-bold text-[#075CF5] uppercase">
              <span className="w-4 h-4 rounded-full bg-[#075CF5] text-white flex items-center justify-center text-[9px]">2</span>
              <span>super() Delegation</span>
            </div>
            <p className="text-[11px] text-[#334155] leading-normal font-sans">
              Invokes superclass <code className="text-[#075CF5]">Parent.&lt;init&gt;()</code> constructor first up to <code className="text-[#075CF5]">Object</code>.
            </p>
          </div>

          <div className="p-3.5 bg-white border-2 border-[#FF7A00] rounded-xl space-y-2">
            <div className="flex items-center space-x-1.5 text-[10px] font-bold text-[#FF7A00] uppercase">
              <span className="w-4 h-4 rounded-full bg-[#FF7A00] text-white flex items-center justify-center text-[9px]">3</span>
              <span>Field Initializers</span>
            </div>
            <p className="text-[11px] text-[#334155] leading-normal font-sans">
              Inline field initializers and instance initializer blocks <code className="text-[#FF7A00]">&#123; ... &#125;</code> execute.
            </p>
          </div>

          <div className="p-3.5 bg-white border-2 border-[#10B981] rounded-xl space-y-2">
            <div className="flex items-center space-x-1.5 text-[10px] font-bold text-[#10B981] uppercase">
              <span className="w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center text-[9px]">4</span>
              <span>Constructor Body</span>
            </div>
            <p className="text-[11px] text-[#334155] leading-normal font-sans">
              Current constructor statements run and reference pointer is returned.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render SOLID Principle Architecture Diagram
  const renderSolidPrincipleDiagram = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rigid Coupled Anti-pattern */}
          <div className="p-4 bg-red-50/50 border border-red-200 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-red-200 pb-1.5">
              <span className="font-bold text-red-700">Tightly Coupled (Violating)</span>
              <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded font-bold">Rigid</span>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-white rounded border border-red-200">
                <span className="font-bold text-[#17191D]">OrderService</span>
                <p className="text-[10px] text-[#64748B] font-sans">Directly creates: <code className="text-red-600">new MySQLDatabase()</code></p>
              </div>
              <div className="flex justify-center text-red-500 font-bold">↓ Direct hard dependency</div>
              <div className="p-2 bg-white rounded border border-red-200">
                <span className="font-bold text-[#17191D]">MySQLDatabase</span>
                <p className="text-[10px] text-[#64748B] font-sans">Cannot swap for Postgres or Mock in unit tests.</p>
              </div>
            </div>
          </div>

          {/* Decoupled SOLID Design */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5">
              <span className="font-bold text-emerald-800">SOLID Refactored (Inverted DIP)</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">Flexible</span>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-white rounded border border-emerald-200">
                <span className="font-bold text-[#17191D]">OrderService</span>
                <p className="text-[10px] text-[#64748B] font-sans">Depends only on interface abstraction.</p>
              </div>
              <div className="flex justify-center text-[#075CF5] font-bold">↓ Depends on abstraction</div>
              <div className="p-2 bg-blue-50/80 rounded border-2 border-dashed border-[#075CF5] text-center">
                <span className="font-bold text-[#075CF5]">«interface» DatabaseConnection</span>
              </div>
              <div className="flex justify-center text-emerald-600 font-bold">▲ Realized by concrete drivers</div>
              <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                <div className="p-1.5 bg-white rounded border border-emerald-200">MySQLDriver</div>
                <div className="p-1.5 bg-white rounded border border-emerald-200">MockDriver</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Design Pattern Collaboration Diagram
  const renderDesignPatternDiagram = () => {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
            <span className="font-bold text-[#075CF5]">Pattern Collaboration Architecture</span>
            <span className="text-[10px] bg-blue-50 text-[#075CF5] px-2 py-0.5 rounded font-bold">UML Interaction</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-center">
            <div className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl space-y-1">
              <span className="text-[10px] uppercase text-[#64748B] font-bold">Client</span>
              <div className="font-bold text-[#0F172A]">Application / Caller</div>
              <p className="text-[10px] text-[#64748B] font-sans">Requests operation via abstract interface.</p>
            </div>

            <div className="p-3 bg-blue-50/60 border-2 border-dashed border-[#075CF5] rounded-xl space-y-1">
              <span className="text-[10px] uppercase text-[#075CF5] font-bold">Abstraction / Target</span>
              <div className="font-bold text-[#075CF5]">Target Interface</div>
              <p className="text-[10px] text-[#64748B] font-sans">Decouples caller from concrete realization.</p>
            </div>

            <div className="p-3 bg-emerald-50/60 border border-emerald-300 rounded-xl space-y-1">
              <span className="text-[10px] uppercase text-emerald-700 font-bold">Concrete Worker</span>
              <div className="font-bold text-emerald-900">Implementor / Factory</div>
              <p className="text-[10px] text-[#64748B] font-sans">Executes exact logic or manages lifecycle.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={diagramRef} className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 space-y-4">
      {/* Diagram Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#075CF5]" />
            <h3 className="text-sm font-bold text-[#17191D]">{title}</h3>
          </div>
          {subtitle && <p className="text-xs text-[#64748B]">{subtitle}</p>}
        </div>

        <ImageExportButton
          getTargetElement={() => diagramRef.current}
          fileName={`oops-lab-${type}-diagram`}
          variant="compact"
        />
      </div>

      {/* Diagram Content */}
      <div className="pt-2">
        {type === 'bit-width' && renderBitWidthDiagram()}
        {type === 'stack-heap' && renderStackHeapDiagram()}
        {type === 'widening-narrowing' && renderWideningNarrowingDiagram()}
        {type === 'scope-blocks' && renderScopeBlocksDiagram()}
        {type === 'overflow-ring' && renderOverflowRingDiagram()}
        {type === 'jvm-architecture' && renderJvmArchitectureDiagram()}
        {type === 'compilation-pipeline' && renderCompilationPipelineDiagram()}
        {type === 'inheritance-hierarchy' && renderInheritanceHierarchyDiagram()}
        {type === 'vtable-dispatch' && renderVTableDiagram()}
        {type === 'encapsulation-shield' && renderEncapsulationShieldDiagram()}
        {type === 'string-pool' && renderStringPoolDiagram()}
        {type === 'exception-flow' && renderExceptionFlowDiagram()}
        {type === 'thread-timeline' && renderThreadTimelineDiagram()}
        {type === 'object-coupling' && renderObjectCouplingDiagram()}
        {type === 'collection-hierarchy' && renderCollectionHierarchyDiagram()}
        {type === 'interface-contract' && renderInheritanceHierarchyDiagram()}
        {type === 'control-flow' && renderScopeBlocksDiagram()}
        {type === 'class-blueprint' && renderClassBlueprintDiagram()}
        {type === 'constructor-chaining' && renderConstructorChainingDiagram()}
        {type === 'solid-principle' && renderSolidPrincipleDiagram()}
        {type === 'design-pattern' && renderDesignPatternDiagram()}
      </div>
    </div>
  );
};
