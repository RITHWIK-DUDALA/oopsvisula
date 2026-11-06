import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  Code2,
  Play,
  Sparkles,
  X,
} from 'lucide-react';
import { parseJavaCodeToDiagram } from '../../services/javaCodeParser';
import { applyAutoLayout } from '../../services/layoutEngine';
import { useVisualizationLabStore } from '../../visualizationStore';

const SAMPLE_JAVA_SNIPPETS: { label: string; code: string }[] = [
  {
    label: 'Classes & Objects (Student)',
    code: `public class Student {
    private int id;
    private String name;
    private double cgpa;

    public Student(int id, String name, double cgpa) {
        this.id = id;
        this.name = name;
        this.cgpa = cgpa;
    }

    public String getName() {
        return this.name;
    }

    public void updateCGPA(double newCgpa) {
        this.cgpa = newCgpa;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student(101, "Rithwik", 9.2);
        Student s2 = new Student(102, "Arjun", 8.6);
        s1.updateCGPA(9.5);
    }
}`,
  },
  {
    label: 'Inheritance & Polymorphism',
    code: `public abstract class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public abstract void makeSound();
}

public class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }

    @Override
    public void makeSound() {
        System.out.println("Bark!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog("Buddy", "Golden Retriever");
        myDog.makeSound();
    }
}`,
  },
  {
    label: 'Interface & Implementation',
    code: `public interface PaymentGateway {
    boolean processPayment(double amount);
}

public class CreditCardPayment implements PaymentGateway {
    private String cardNumber;

    public CreditCardPayment(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public boolean processPayment(double amount) {
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentGateway gateway = new CreditCardPayment("4111-2222-3333-4444");
        gateway.processPayment(250.0);
    }
}`,
  },
];

export interface JavaCodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JavaCodeDrawer: React.FC<JavaCodeDrawerProps> = ({ isOpen, onClose }) => {
  const { currentJavaSource, setJavaSource } = useVisualizationLabStore();
  const [sourceCode, setSourceCode] = useState(
    currentJavaSource || SAMPLE_JAVA_SNIPPETS[0].code
  );
  const [generationSummary, setGenerationSummary] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);

  // Sync editor code whenever scenario or currentJavaSource changes
  React.useEffect(() => {
    if (currentJavaSource) {
      setSourceCode(currentJavaSource);
    }
  }, [currentJavaSource]);

  if (!isOpen) return null;

  const handleGenerateDiagram = () => {
    const parsed = parseJavaCodeToDiagram(sourceCode);
    const layoutResult = applyAutoLayout(parsed.nodes, parsed.edges, 'hierarchical');

    // Load parsed entities directly into canvas store
    useVisualizationLabStore.setState((state) => ({
      nodes: layoutResult.nodes,
      edges: layoutResult.edges,
      selectedNodeId: layoutResult.nodes[0]?.id || null,
      selectedEdgeId: null,
      workspaceName: 'Generated from Java Code',
      past: [...state.past, { nodes: state.nodes, edges: state.edges }],
      future: [],
    }));

    setGenerationSummary(
      `✓ Generated ${parsed.classesCount} Class(es), ${parsed.objectsCount} Object(s), and ${parsed.relationshipsCount} Relationship(s)!`
    );
    setTimeout(() => setGenerationSummary(null), 4000);
  };

  const handleRunExecution = () => {
    setIsExecuting(true);
    let step = 1;
    const lines = [18, 19, 20]; // Sample execution line sequence

    const interval = setInterval(() => {
      if (step <= lines.length) {
        setActiveLine(lines[step - 1]);
        step++;
      } else {
        clearInterval(interval);
        setIsExecuting(false);
        setActiveLine(null);
      }
    }, 700);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[380px] bg-white border-t border-[#DCE2EA] shadow-xl z-30 flex flex-col font-sans select-none animate-in slide-in-from-bottom duration-200">
      {/* Top Bar */}
      <div className="h-10 px-4 bg-[#F1F4F8] border-b border-[#DCE2EA] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#172033]">
            <Code2 className="w-4 h-4 text-[#1749C8]" />
            <span>Java Source Code & Execution Engine</span>
          </div>

          <span className="text-[#DCE2EA]">•</span>

          {/* Sample Snippet Selector */}
          <select
            onChange={(e) => {
              const found = SAMPLE_JAVA_SNIPPETS.find((s) => s.label === e.target.value);
              if (found) setSourceCode(found.code);
            }}
            className="text-[11px] font-mono bg-white border border-[#DCE2EA] rounded px-2 py-0.5 text-[#172033] outline-hidden"
          >
            {SAMPLE_JAVA_SNIPPETS.map((s) => (
              <option key={s.label} value={s.label}>
                Sample: {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          {generationSummary && (
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 animate-in fade-in">
              {generationSummary}
            </span>
          )}

          <button
            type="button"
            onClick={handleGenerateDiagram}
            className="flex items-center space-x-1.5 px-3 py-1 bg-[#1749C8] hover:bg-[#133da8] text-white text-xs font-semibold rounded-md shadow-2xs active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate 2D Diagram</span>
          </button>

          <button
            type="button"
            onClick={handleRunExecution}
            disabled={isExecuting}
            className="flex items-center space-x-1.5 px-3 py-1 bg-white hover:bg-[#FAFBFD] border border-[#DCE2EA] text-[#172033] text-xs font-semibold rounded-md shadow-2xs transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isExecuting ? 'Stepping...' : 'Simulate Line Execution'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-[#E2E8F0] rounded text-[#64748B] hover:text-[#172033] ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor & Execution Panel Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Monaco Editor */}
        <div className="flex-1 h-full overflow-hidden border-r border-[#DCE2EA]">
          <Editor
            height="100%"
            language="java"
            theme="vs"
            value={sourceCode}
            onChange={(val) => {
              const code = val || '';
              setSourceCode(code);
              setJavaSource(code);
            }}
            options={{
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              renderLineHighlight: 'all',
              lineHeight: 20,
            }}
          />
        </div>

        {/* Right: Runtime Diagnostics & Execution State */}
        <div className="w-80 bg-[#FAFBFD] p-3 space-y-3 font-mono text-xs overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#DCE2EA] pb-1.5">
            <span className="text-[10px] text-[#64748B] uppercase font-bold">Execution State</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${activeLine ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
              {activeLine ? `Line ${activeLine}` : 'Ready'}
            </span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="p-2 bg-white border border-[#DCE2EA] rounded space-y-1">
              <span className="text-[#1749C8] font-bold block">Active Frame</span>
              <span className="text-[#172033]">Main.main(String[] args)</span>
            </div>

            <div className="p-2 bg-white border border-[#DCE2EA] rounded space-y-1">
              <span className="text-[#F47721] font-bold block">Static Analysis</span>
              <span className="text-[#64748B] text-[10px] block leading-tight">
                Parses AST declarations and establishes inheritance hierarchies, fields, methods, and instantiations.
              </span>
            </div>

            <div className="p-2 bg-white border border-[#DCE2EA] rounded space-y-1">
              <span className="text-emerald-700 font-bold block">Live 2D Sync</span>
              <span className="text-[#64748B] text-[10px] block leading-tight">
                Modifying classes or adding `new MyClass()` creates new independent blocks and relationship connectors.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
