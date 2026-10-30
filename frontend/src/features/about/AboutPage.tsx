import React from 'react';
import {
  Code2,
  Shield,
  Layers,
  Cpu,
  Terminal,
  Lock,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Mission & Architecture</div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">About OOPS LAB</h1>
        <p className="text-xs text-muted-foreground mt-1">
          An open-source interactive Java 21 Object-Oriented Programming laboratory and JVM execution visualizer.
        </p>
      </div>

      {/* Core Mission Banner */}
      <div className="p-6 bg-white border border-border rounded-xl space-y-4 shadow-xs">
        <div className="flex items-center space-x-2">
          <Code2 className="w-4 h-4 text-foreground stroke-[1.5]" />
          <h2 className="text-sm font-bold text-foreground">The Educational Mission</h2>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Traditional Java OOP pedagogy relies on abstract slides and analogies that conceal what the Java Virtual Machine is actually doing. Students struggle with reference semantics, polymorphic dispatch, heap allocations, and call stack lifecycles because they cannot <span className="text-foreground font-semibold">see</span> the runtime state.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          OOPS LAB bridges this cognitive gap by coupling modern Java 21 LTS compilation with a deterministic JDI (Java Debug Interface) execution visualizer. Every variable assignment, constructor invocation, method frame push, and heap pointer is projected in real time side-by-side with source code.
        </p>
      </div>

      {/* Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-border rounded-xl space-y-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border">
            <Cpu className="w-4 h-4 text-foreground stroke-[1.5]" />
          </div>
          <h3 className="text-xs font-bold text-foreground">Deterministic Execution Engine</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every step in student code emits structured execution events conforming to JDI specifications. Replay forwards and backwards with microsecond precision.
          </p>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border">
            <Shield className="w-4 h-4 text-foreground stroke-[1.5]" />
          </div>
          <h3 className="text-xs font-bold text-foreground">Multi-Layered Security Sandbox</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Client-side AST filtering combined with server-side JavaParser AST visitors blocks reflection, filesystem I/O, networking, and hostile system calls.
          </p>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border">
            <Lock className="w-4 h-4 text-foreground stroke-[1.5]" />
          </div>
          <h3 className="text-xs font-bold text-foreground">Local-First & Guest Privacy</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Zero mandatory login barriers. Complete learning progress, custom code snippets, and settings are saved locally in browser storage with full JSON export capability.
          </p>
        </div>
      </div>

      {/* End-to-End System Architecture */}
      <div className="p-6 bg-white border border-border rounded-xl space-y-5 shadow-xs">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-foreground stroke-[1.5]" />
          <h2 className="text-sm font-bold text-foreground">End-to-End System Topology</h2>
        </div>

        <div className="p-4 bg-surface/50 border border-border rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 bg-white border border-border rounded-md space-y-1.5">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Layer 1: Frontend</span>
              <span className="font-bold text-foreground block">React 19 SPA</span>
              <p className="text-[11px] text-muted-foreground font-sans">Vite 6, TypeScript, Tailwind CSS, Monaco Editor, Zustand 5, React Flow.</p>
            </div>

            <div className="p-3 bg-white border border-border rounded-md space-y-1.5">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Layer 2: Edge Proxy</span>
              <span className="font-bold text-foreground block">Nginx 1.27 Reverse Proxy</span>
              <p className="text-[11px] text-muted-foreground font-sans">SPA routing, gzip compression, security headers (CSP, nosniff, DENY).</p>
            </div>

            <div className="p-3 bg-white border border-border rounded-md space-y-1.5">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Layer 3: Core API</span>
              <span className="font-bold text-foreground block">Spring Boot 3.3.4</span>
              <p className="text-[11px] text-muted-foreground font-sans">JavaParser AST validator, job dispatcher, Redis token-bucket rate limiter.</p>
            </div>

            <div className="p-3 bg-white border border-border rounded-md space-y-1.5">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Layer 4: Sandbox</span>
              <span className="font-bold text-foreground block">Docker Worker</span>
              <p className="text-[11px] text-muted-foreground font-sans">Unprivileged non-root runner, 256MB RAM cap, 1 CPU limit, 5000ms timeout.</p>
            </div>
          </div>
        </div>

        {/* Technical Specifications Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-mono bg-surface/50">
                <th className="py-2.5 px-3">Subsystem</th>
                <th className="py-2.5 px-3">Technology Stack</th>
                <th className="py-2.5 px-3">Version / Spec</th>
                <th className="py-2.5 px-3">Responsibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono text-xs">
              <tr className="hover:bg-surface/30">
                <td className="py-2 px-3 font-semibold text-foreground">Language Target</td>
                <td className="py-2 px-3">Java Platform</td>
                <td className="py-2 px-3">JDK 21 LTS</td>
                <td className="py-2 px-3 font-sans text-muted-foreground">Modern OOP syntax (Records, Sealed Types, Pattern Matching).</td>
              </tr>
              <tr className="hover:bg-surface/30">
                <td className="py-2 px-3 font-semibold text-foreground">AST Analysis</td>
                <td className="py-2 px-3">JavaParser</td>
                <td className="py-2 px-3">3.26.1</td>
                <td className="py-2 px-3 font-sans text-muted-foreground">Pre-execution security checks, banned package inspection.</td>
              </tr>
              <tr className="hover:bg-surface/30">
                <td className="py-2 px-3 font-semibold text-foreground">Code Editor</td>
                <td className="py-2 px-3">Monaco Editor</td>
                <td className="py-2 px-3">0.52.x</td>
                <td className="py-2 px-3 font-sans text-muted-foreground">In-browser IDE with syntax highlighting and line tracking.</td>
              </tr>
              <tr className="hover:bg-surface/30">
                <td className="py-2 px-3 font-semibold text-foreground">Diagram Engine</td>
                <td className="py-2 px-3">@xyflow/react</td>
                <td className="py-2 px-3">12.x</td>
                <td className="py-2 px-3 font-sans text-muted-foreground">Interactive UML node canvas with live Java code sync.</td>
              </tr>
              <tr className="hover:bg-surface/30">
                <td className="py-2 px-3 font-semibold text-foreground">State Store</td>
                <td className="py-2 px-3">Zustand</td>
                <td className="py-2 px-3">5.0.x</td>
                <td className="py-2 px-3 font-sans text-muted-foreground">Deterministic timeline playback and local storage persistence.</td>
              </tr>
              <tr className="hover:bg-surface/30">
                <td className="py-2 px-3 font-semibold text-foreground">Container Engine</td>
                <td className="py-2 px-3">Docker & Compose</td>
                <td className="py-2 px-3">v2 / v3 Compose</td>
                <td className="py-2 px-3 font-sans text-muted-foreground">Multi-service production containerization and sandbox isolation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Open Source & Design Guidelines */}
      <div className="p-6 bg-white border border-border rounded-xl space-y-4 shadow-xs">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-foreground stroke-[1.5]" />
          <h2 className="text-sm font-bold text-foreground">Design Standards & Open Governance</h2>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          OOPS LAB adheres to strict engineering directives governed by the project's permanent audit ledger. Every change is verified through automated test suites and captured in the machine-readable knowledge graph (<code className="font-mono text-foreground">.graphify/</code>).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 border border-border rounded-lg bg-surface/30 space-y-1">
            <span className="font-semibold text-foreground block">Zero Distraction Palette</span>
            <span className="text-muted-foreground">Monochromatic light interface (#FFFFFF, #FAFAFA, #F4F4F5, #18181B) with outline-only iconography.</span>
          </div>
          <div className="p-3 border border-border rounded-lg bg-surface/30 space-y-1">
            <span className="font-semibold text-foreground block">Zero Telemetry Policy</span>
            <span className="text-muted-foreground">No tracking scripts, third-party analytics pixels, or remote telemetry. Student privacy is non-negotiable.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
