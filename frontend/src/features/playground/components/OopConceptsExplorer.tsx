import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  GitFork, 
  Zap, 
  Cpu, 
  ChevronRight,
  BookOpen,
  Eye
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { useSemanticModel } from '@/core/engine/useSemanticModel';
import { DetectedConcept, ConceptCategory } from '@/core/engine/conceptIntelligence';

interface OopConceptsExplorerProps {
  onJumpToSource?: (file: string, line: number) => void;
  onNavigateToArchitecture?: (conceptType?: string) => void;
}

export const OopConceptsExplorer: React.FC<OopConceptsExplorerProps> = ({
  onJumpToSource,
  onNavigateToArchitecture
}) => {
  const { 
    setActiveEntitySelection, 
    setActiveConceptFilter, 
    setActiveFileId, 
    projectFiles 
  } = useSimulationStore();

  const { conceptReport } = useSemanticModel();
  const { concepts, summary } = conceptReport;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedExplanationId, setExpandedExplanationId] = useState<string | null>(null);

  const handleJump = (file: string, line: number) => {
    const projFile = projectFiles.find((f) => f.name === file);
    if (projFile) {
      setActiveFileId(projFile.id);
    }
    if (onJumpToSource) {
      onJumpToSource(file, line);
    }
  };

  const handleInspectConcept = (concept: DetectedConcept) => {
    setActiveEntitySelection({
      type: 'concept',
      id: concept.id,
      data: concept,
    });
  };

  const handleHighlightInGraph = (concept: DetectedConcept) => {
    setActiveConceptFilter(concept.conceptType);
    setActiveEntitySelection({
      type: 'concept',
      id: concept.id,
      data: concept,
    });
    if (onNavigateToArchitecture) {
      onNavigateToArchitecture(concept.conceptType);
    }
  };

  // Filtered concepts based on category and search query
  const filteredConcepts = useMemo(() => {
    return concepts.filter((c) => {
      if (selectedCategory !== 'all' && c.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.conceptType.toLowerCase().includes(q) ||
          c.explanationSimple.toLowerCase().includes(q) ||
          (c.primaryClassName && c.primaryClassName.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [concepts, selectedCategory, searchQuery]);

  const getCategoryIcon = (category: ConceptCategory) => {
    switch (category) {
      case 'fundamental': return <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />;
      case 'relationship': return <GitFork className="w-3.5 h-3.5 text-purple-600" />;
      case 'java-specific': return <Zap className="w-3.5 h-3.5 text-amber-600" />;
      case 'concurrency': return <Cpu className="w-3.5 h-3.5 text-indigo-600" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-neutral-600" />;
    }
  };

  const getConceptColor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('encapsulation')) return 'border-emerald-200 bg-emerald-50/40 text-emerald-900 badge-emerald';
    if (t.includes('inheritance')) return 'border-blue-200 bg-blue-50/40 text-blue-900 badge-blue';
    if (t.includes('abstract') || t.includes('contract')) return 'border-purple-200 bg-purple-50/40 text-purple-900 badge-purple';
    if (t.includes('overload') || t.includes('override') || t.includes('polymorphism')) return 'border-amber-200 bg-amber-50/40 text-amber-900 badge-amber';
    if (t.includes('interface')) return 'border-teal-200 bg-teal-50/40 text-teal-900 badge-teal';
    if (t.includes('composition')) return 'border-neutral-800 bg-neutral-900/5 text-neutral-900 badge-slate';
    if (t.includes('aggregation')) return 'border-slate-300 bg-slate-100/50 text-slate-800 badge-slate';
    if (t.includes('association')) return 'border-yellow-200 bg-yellow-50/40 text-yellow-900 badge-yellow';
    if (t.includes('depend')) return 'border-sky-200 bg-sky-50/40 text-sky-900 badge-sky';
    if (t.includes('thread') || t.includes('sync')) return 'border-indigo-200 bg-indigo-50/40 text-indigo-900 badge-indigo';
    return 'border-neutral-200 bg-white text-foreground';
  };

  return (
    <div className="h-full w-full flex flex-col bg-neutral-50/60 overflow-y-auto p-4 sm:p-6 space-y-6 select-none font-sans">
      {/* 1. PROJECT-WIDE OOP CONCEPT SUMMARY BAR (Part 12) */}
      <div className="bg-white border border-border rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-foreground">Project-Wide OOP Concept Intelligence</h3>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            {concepts.length} Grounded Instances Detected
          </span>
        </div>

        {summary.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {summary.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(item.name.split(' ')[0]);
                  setSelectedCategory('all');
                }}
                className="p-2.5 rounded-lg border border-border/80 bg-neutral-50/60 hover:bg-neutral-100/80 hover:border-blue-400 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[11px] font-semibold text-foreground group-hover:text-blue-700 truncate">
                    {item.name}
                  </span>
                  {getCategoryIcon(item.category)}
                </div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-mono font-bold text-lg text-foreground group-hover:text-blue-600">
                    {item.count}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {item.unit}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-xs text-muted-foreground italic">
            No advanced OOP constructs detected yet in active code.
          </div>
        )}
      </div>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-neutral-900 text-white font-bold'
                : 'bg-white border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            All Concepts ({concepts.length})
          </button>
          <button
            onClick={() => setSelectedCategory('fundamental')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === 'fundamental'
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-white border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Fundamental OOP
          </button>
          <button
            onClick={() => setSelectedCategory('relationship')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === 'relationship'
                ? 'bg-purple-600 text-white font-bold'
                : 'bg-white border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Relationships
          </button>
          <button
            onClick={() => setSelectedCategory('java-specific')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === 'java-specific'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-white border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Java Specific
          </button>
          <button
            onClick={() => setSelectedCategory('concurrency')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === 'concurrency'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-white border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Concurrency
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search concepts or classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-border rounded-lg outline-none focus:border-blue-500 font-mono"
          />
        </div>
      </div>

      {/* 3. DYNAMIC CONCEPT CARDS GRID */}
      {filteredConcepts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredConcepts.map((concept) => {
            const isTechnicalExpanded = expandedExplanationId === concept.id;
            return (
              <div 
                key={concept.id}
                className={`p-4 bg-white border rounded-xl shadow-2xs space-y-3 transition-all hover:shadow-xs ${getConceptColor(concept.conceptType)}`}
              >
                {/* Header: Title, Category Icon, Status */}
                <div className="flex items-start justify-between gap-2 border-b border-border/70 pb-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(concept.category)}
                      <h4 className="font-bold text-xs text-foreground">{concept.name}</h4>
                    </div>
                    {concept.primaryClassName && (
                      <span className="text-[10.5px] font-mono text-muted-foreground">
                        Class: <strong className="text-foreground">{concept.primaryClassName}</strong>
                      </span>
                    )}
                  </div>

                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-white border border-border font-semibold text-muted-foreground shrink-0 shadow-2xs">
                    {concept.status.replace('-', ' ')}
                  </span>
                </div>

                {/* Level 1: Beginner Explanation */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    <BookOpen className="w-3 h-3 text-blue-600" />
                    <span>How it Works (Level 1)</span>
                  </div>
                  <p className="text-xs text-foreground/90 leading-relaxed font-sans">
                    {concept.explanationSimple}
                  </p>
                </div>

                {/* Level 2: Technical Java Mechanics (Collapsible) */}
                <div className="bg-neutral-50/80 rounded-lg p-2.5 border border-border/60 space-y-1.5">
                  <div 
                    onClick={() => setExpandedExplanationId(isTechnicalExpanded ? null : concept.id)}
                    className="flex items-center justify-between cursor-pointer hover:text-foreground text-[10px] font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    <span>Java Technical Mechanics (Level 2)</span>
                    <span className="text-[9px] text-blue-600 lowercase font-mono">
                      {isTechnicalExpanded ? 'collapse' : 'expand'}
                    </span>
                  </div>

                  {isTechnicalExpanded && (
                    <p className="text-[11px] text-foreground/80 leading-relaxed font-mono pt-1 border-t border-border/40">
                      {concept.explanationTechnical}
                    </p>
                  )}
                </div>

                {/* Ground Code Evidence Members */}
                {concept.involvedMembers.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Ground Evidence Members ({concept.involvedMembers.length})
                    </div>
                    <div className="space-y-1 max-h-32 overflow-y-auto font-mono text-[10px]">
                      {concept.involvedMembers.slice(0, 4).map((member, mIdx) => (
                        <div 
                          key={mIdx}
                          onClick={() => handleJump(member.sourceFile, member.sourceLine)}
                          className="px-2 py-1 rounded bg-white border border-border/60 hover:border-blue-400 hover:bg-blue-50/40 cursor-pointer flex items-center justify-between transition-colors group"
                        >
                          <div className="flex items-center space-x-1.5 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            <span className="font-semibold text-foreground truncate">{member.name}</span>
                          </div>
                          <span className="text-[9px] text-muted-foreground truncate max-w-[45%]">
                            {member.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Bottom Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border/70 text-xs">
                  {/* Jump to primary source */}
                  {concept.sourceLocations.length > 0 && (
                    <button
                      onClick={() => handleJump(concept.sourceLocations[0].file, concept.sourceLocations[0].line)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium text-[11px]"
                    >
                      <span>Line {concept.sourceLocations[0].line}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}

                  {/* Actions: Highlight in Graph & Inspect */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleHighlightInGraph(concept)}
                      title="Highlight in Class Architecture Graph"
                      className="px-2 py-1 rounded bg-white hover:bg-neutral-100 border border-border text-foreground flex items-center space-x-1 text-[10.5px] font-medium transition-colors"
                    >
                      <Eye className="w-3 h-3 text-neutral-600" />
                      <span>Highlight</span>
                    </button>

                    <button
                      onClick={() => handleInspectConcept(concept)}
                      title="Open in Code Intelligence Inspector"
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1 text-[10.5px] font-semibold transition-colors"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 bg-white border border-dashed border-border rounded-xl text-center space-y-2">
          <Sparkles className="w-8 h-8 text-neutral-400 mx-auto" />
          <h4 className="text-sm font-bold text-foreground">No matching concepts found</h4>
          <p className="text-xs text-muted-foreground">
            Try adjusting your search query or selecting a different category filter.
          </p>
        </div>
      )}
    </div>
  );
};
