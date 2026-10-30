import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Terminal, Eye, Award, ArrowRight, Clock, CheckCircle2, Circle } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Welcome Banner */}
      <div className="p-6 bg-white border border-border rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Learner Dashboard</div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back, Student</h1>
          <p className="text-xs text-muted-foreground">Pick up where you left off or run a new simulation in the playground.</p>
        </div>
        <div className="flex items-center space-x-3">
          <NavLink
            to="/playground"
            className="flex items-center space-x-2 px-4 py-2 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-black/90 transition-all"
          >
            <Terminal className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Open Playground</span>
          </NavLink>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Concepts Mastered</span>
            <BookOpen className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-2xl font-bold text-foreground">6 / 32</div>
          <div className="text-[11px] text-muted-foreground">Foundations & Core OOP in progress</div>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Visual Simulations</span>
            <Eye className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-2xl font-bold text-foreground">14</div>
          <div className="text-[11px] text-muted-foreground">Heap/Stack diagrams inspected</div>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Practice Solved</span>
            <Award className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-2xl font-bold text-foreground">8</div>
          <div className="text-[11px] text-muted-foreground">Structural assertions passed</div>
        </div>

        <div className="p-5 bg-white border border-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Lab Time</span>
            <Clock className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div className="text-2xl font-bold text-foreground">3h 40m</div>
          <div className="text-[11px] text-muted-foreground">Locally tracked session</div>
        </div>
      </div>

      {/* Active Modules & Recent Experiments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Learning Path */}
        <div className="lg:col-span-2 p-6 bg-white border border-border rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground tracking-tight">Active Learning Path</h2>
            <NavLink to="/concepts" className="text-xs text-muted-foreground hover:text-foreground flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </NavLink>
          </div>

          <div className="space-y-3">
            <div className="p-4 border border-border rounded-lg flex items-center justify-between hover:bg-surface transition-colors">
              <div className="flex items-center space-x-3.5">
                <CheckCircle2 className="w-5 h-5 text-foreground stroke-[1.5]" />
                <div>
                  <div className="text-xs font-semibold text-foreground">1. Classes & Objects</div>
                  <div className="text-[11px] text-muted-foreground">Blueprint vs Instance, `new` keyword, memory layout</div>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-accent rounded text-foreground">Completed</span>
            </div>

            <div className="p-4 border border-border rounded-lg flex items-center justify-between bg-surface/50">
              <div className="flex items-center space-x-3.5">
                <Circle className="w-5 h-5 text-foreground stroke-[2]" />
                <div>
                  <div className="text-xs font-semibold text-foreground">2. Constructors & `this` Reference</div>
                  <div className="text-[11px] text-muted-foreground">Default vs parameterized constructors, constructor chaining</div>
                </div>
              </div>
              <NavLink to="/concepts" className="text-xs font-medium text-foreground hover:underline">Resume →</NavLink>
            </div>

            <div className="p-4 border border-border rounded-lg flex items-center justify-between opacity-60">
              <div className="flex items-center space-x-3.5">
                <Circle className="w-5 h-5 text-muted-foreground stroke-[1.5]" />
                <div>
                  <div className="text-xs font-semibold text-foreground">3. Encapsulation & Access Modifiers</div>
                  <div className="text-[11px] text-muted-foreground">private, protected, public, package-private, record immutability</div>
                </div>
              </div>
              <span className="text-[11px] text-muted-foreground">Locked</span>
            </div>
          </div>
        </div>

        {/* Quick Launch Tools */}
        <div className="p-6 bg-white border border-border rounded-xl space-y-4">
          <h2 className="text-sm font-semibold text-foreground tracking-tight">Interactive Laboratories</h2>
          
          <div className="space-y-3">
            <NavLink
              to="/visualizers"
              className="block p-3.5 border border-border rounded-lg hover:border-foreground transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground group-hover:underline">Visualizer Hub</span>
                <Eye className="w-4 h-4 text-muted-foreground group-hover:text-foreground stroke-[1.5]" />
              </div>
              <p className="text-[11px] text-muted-foreground">Interactive diagrams: Heap allocations, Stack frames, Reference graphs.</p>
            </NavLink>

            <NavLink
              to="/playground"
              className="block p-3.5 border border-border rounded-lg hover:border-foreground transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground group-hover:underline">Java 21 Playground</span>
                <Terminal className="w-4 h-4 text-muted-foreground group-hover:text-foreground stroke-[1.5]" />
              </div>
              <p className="text-[11px] text-muted-foreground">Write Java code and trace variables step-by-step with JDI execution events.</p>
            </NavLink>

            <NavLink
              to="/practice"
              className="block p-3.5 border border-border rounded-lg hover:border-foreground transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground group-hover:underline">Practice Challenges</span>
                <Award className="w-4 h-4 text-muted-foreground group-hover:text-foreground stroke-[1.5]" />
              </div>
              <p className="text-[11px] text-muted-foreground">Solve OOP design problems with automatic structural AST verification.</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

