import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface ConceptTopic {
  id: string;
  category: string;
  title: string;
  description: string;
  status: 'available' | 'locked';
}

const topics: ConceptTopic[] = [
  // Foundations
  { id: 'vars', category: 'Foundations', title: 'Variables & Data Types', description: 'Primitive types vs object references in JVM memory.', status: 'available' },
  { id: 'methods', category: 'Foundations', title: 'Methods & Call Stack', description: 'Stack frame push/pop, parameter passing, return values.', status: 'available' },
  
  // Core OOP
  { id: 'classes', category: 'Core OOP', title: 'Classes & Objects', description: 'Class blueprints, heap object allocation, identity hashcodes.', status: 'available' },
  { id: 'constructors', category: 'Core OOP', title: 'Constructors & `this`', description: 'Object initialization lifecycle and constructor chaining.', status: 'available' },
  { id: 'encapsulation', category: 'Core OOP', title: 'Encapsulation & Access', description: 'Data hiding with access modifiers and getters/setters.', status: 'available' },
  { id: 'inheritance', category: 'Core OOP', title: 'Inheritance & `super`', description: 'Single inheritance, `extends`, and method overriding.', status: 'available' },
  { id: 'polymorphism', category: 'Core OOP', title: 'Polymorphism & Dispatch', description: 'Dynamic method lookup, vtables, and late binding.', status: 'available' },
  { id: 'abstraction', category: 'Core OOP', title: 'Abstract Classes & Interfaces', description: 'Contracts, default methods, and pure abstractions.', status: 'available' },

  // Relationships
  { id: 'association', category: 'Relationships', title: 'Association & Aggregation', description: 'Has-a relationships, weak ownership, and reference graphs.', status: 'available' },
  { id: 'composition', category: 'Relationships', title: 'Composition', description: 'Strong ownership lifecycle and contained instances.', status: 'available' },
  
  // Java 21 Advanced
  { id: 'records', category: 'Java 21 Modern', title: 'Records & Immutability', description: 'Transparent carrier data classes and canonical constructors.', status: 'available' },
  { id: 'sealed', category: 'Java 21 Modern', title: 'Sealed Classes & Interfaces', description: 'Exhaustive type hierarchies with `permits` clauses.', status: 'available' },
];

export const ConceptsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Foundations', 'Core OOP', 'Relationships', 'Java 21 Modern'];

  const filteredTopics = topics.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-150">
      <div className="space-y-1">
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Curriculum Catalog</div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Java 21 OOP Concept Explorer</h1>
        <p className="text-xs text-muted-foreground">Each concept includes definition, syntax, 14-step pedagogical walkthrough, live interactive simulation, and practice challenges.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-foreground text-background'
                  : 'bg-white border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 stroke-[1.5]" />
          <input
            type="text"
            placeholder="Search concepts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
      </div>

      {/* Concept Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="p-5 bg-white border border-border rounded-xl space-y-3 flex flex-col justify-between hover:border-foreground/50 transition-all group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-accent px-2 py-0.5 rounded border border-border">
                  {topic.category}
                </span>
                <span className="text-[11px] text-muted-foreground">14-Step Model</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground tracking-tight group-hover:underline">
                {topic.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {topic.description}
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground text-[11px]">Interactive Visualizer</span>
              <span className="font-medium text-foreground flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

