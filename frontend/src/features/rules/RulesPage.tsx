import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Copy,
  Check,
  Layers,
  Boxes,
  Play,
  Terminal,
  Cpu,
} from 'lucide-react';
import { useSimulationStore } from '@/features/simulation/simulationStore';

type RuleCategory = 'all' | 'allowed' | 'restricted' | 'limits' | 'exceptions' | 'templates';

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
}

const VERIFIED_TEMPLATES: CodeSnippet[] = [
  {
    id: 'aliasing',
    title: 'Encapsulation & Reference Aliasing',
    description: 'Demonstrates private fields, state mutation via methods, and two variables pointing to the exact same heap instance.',
    code: `class BankAccount {
    private String owner;
    private double balance;

    public BankAccount(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    public double getBalance() {
        return this.balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount("Alice", 500.0);
        BankAccount acc2 = acc1; // Pointer Aliasing
        acc2.deposit(250.0);
        System.out.println("Balance: " + acc1.getBalance()); // 750.0
    }
}`,
  },
  {
    id: 'inheritance',
    title: 'Inheritance, Abstract Classes & Dynamic Dispatch',
    description: 'Demonstrates abstract class contracts, super() constructor chaining, method overriding, and polymorphic vtable resolution.',
    code: `abstract class Employee {
    protected String name;
    protected double baseSalary;

    public Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public abstract double calculatePay();
}

class Manager extends Employee {
    private double bonus;

    public Manager(String name, double baseSalary, double bonus) {
        super(name, baseSalary);
        this.bonus = bonus;
    }

    @Override
    public double calculatePay() {
        return this.baseSalary + this.bonus;
    }
}

public class Main {
    public static void main(String[] args) {
        Employee emp = new Manager("Sarah", 8000.0, 2000.0);
        System.out.println("Total compensation: " + emp.calculatePay());
    }
}`,
  },
  {
    id: 'exceptions',
    title: 'Exception Handling with Try-Catch-Finally',
    description: 'Demonstrates catching runtime exceptions, binding the exception object in the call stack frame, and guaranteed finally cleanup.',
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Starting transaction...");

        try {
            int total = 1000;
            int divisor = 0;
            
            // Triggers simulated ArithmeticException: / by zero
            int result = total / divisor;
            System.out.println("Result: " + result);

        } catch (Exception e) {
            // Catches fault and continues: Diversion Status = CAUGHT
            System.out.println("Caught exception: " + e.getMessage());

        } finally {
            // Always executes guaranteed
            System.out.println("Cleanup completed. Transaction closed.");
        }

        System.out.println("Program continues normally.");
    }
}`,
  },
];

export const RulesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<RuleCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const navigate = useNavigate();
  const { updateFileContent, projectFiles } = useSimulationStore();

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleLoadInPlayground = (code: string) => {
    const mainFile = projectFiles.find((f) => f.name === 'Main.java') || projectFiles[0];
    if (mainFile) {
      updateFileContent(mainFile.id, code);
    }
    navigate('/app/playground');
  };

  const categories = [
    { id: 'all', label: 'All Rules & Specs' },
    { id: 'allowed', label: 'What Can Be Done (Supported)' },
    { id: 'restricted', label: 'What Cannot Be Done (Blocked)' },
    { id: 'limits', label: 'Execution Limits & Quotas' },
    { id: 'exceptions', label: 'Exception Handling' },
    { id: 'templates', label: 'Verified Code Templates' },
  ];

  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Execution Specification & Sandboxing</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          OOPS LAB — Coding Rules & Capabilities
        </h1>
        <p className="text-xs text-muted-foreground mt-1 max-w-3xl">
          Complete specification of supported Java 21 features, AST security boundaries, runtime execution quotas, and verified code patterns.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id as RuleCategory)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-foreground text-background shadow-xs'
                  : 'bg-white text-muted-foreground hover:text-foreground border border-border hover:bg-surface'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground stroke-[1.5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search syntax, rules, limits..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground"
          />
        </div>
      </div>

      {/* Section 1: What CAN Be Done */}
      {(activeCategory === 'all' || activeCategory === 'allowed') &&
        matchesSearch('supported can be done class interface record extends implements override polymorphism encapsulation getters setters arrays loops') && (
          <div className="p-6 bg-white border border-border rounded-xl space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-foreground">1. What CAN Be Done (Fully Supported)</h2>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                100% VISUALIZED
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              OOPS LAB is a dedicated Object-Oriented Programming simulation engine. All core language constructs, memory allocations, and class hierarchies model and animate seamlessly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-surface/40 border border-border space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-foreground font-mono">
                  <Boxes className="w-3.5 h-3.5 text-blue-600" />
                  <span>OOP Architecture</span>
                </div>
                <ul className="text-xs space-y-1.5 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Classes & Records</strong>: Standard <code className="font-mono text-foreground">class</code>, <code className="font-mono text-foreground">abstract class</code>, <code className="font-mono text-foreground">interface</code>, and Java 14+ <code className="font-mono text-foreground">record</code>.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Inheritance & Contracts</strong>: Single inheritance with <code className="font-mono text-foreground">extends</code>, multiple interfaces with <code className="font-mono text-foreground">implements</code>.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Polymorphism</strong>: Method overriding with dynamic vtable dispatch resolving to the actual runtime heap instance.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Encapsulation</strong>: <code className="font-mono text-foreground">private</code>, <code className="font-mono text-foreground">protected</code>, and <code className="font-mono text-foreground">public</code> fields with verified getters/setters.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Constructors</strong>: Overloading, <code className="font-mono text-foreground">super(...)</code> base chaining, and <code className="font-mono text-foreground">this(...)</code> delegation.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-surface/40 border border-border space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-foreground font-mono">
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  <span>Memory & Execution</span>
                </div>
                <ul className="text-xs space-y-1.5 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Eden Heap Allocation</strong>: <code className="font-mono text-foreground">new MyClass(...)</code> allocates a unique tracked instance card with an address pointer (e.g. <code className="font-mono text-foreground">@0x1B82</code>).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Pointer Aliasing</strong>: Two variables assigned to the same instance render reference energy tethers converging onto one object.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Call Stack Frames</strong>: Method invocations push LIFO frames with local variables; returns pop frames and unwind.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Loops & Conditionals</strong>: <code className="font-mono text-foreground">for</code>, <code className="font-mono text-foreground">while</code>, <code className="font-mono text-foreground">if/else</code>, and <code className="font-mono text-foreground">switch/case</code> step cleanly instruction-by-instruction.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Arrays & Output</strong>: 1D primitive and object arrays, plus live <code className="font-mono text-foreground">System.out.println()</code> streaming.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

      {/* Section 2: What CANNOT Be Done */}
      {(activeCategory === 'all' || activeCategory === 'restricted') &&
        matchesSearch('restricted cannot blocked security file process exec socket reflection unsafe swing') && (
          <div className="p-6 bg-white border border-border rounded-xl space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                <h2 className="text-sm font-bold text-foreground">2. What CANNOT Be Done (Blocked by Security)</h2>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                SANDBOX RESTRICTED
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Because OOPS LAB runs within a student learning sandbox in the browser, code that attempts to breach host boundaries or access operating system primitives is blocked by the AST Security Filter before simulation begins.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted-foreground font-mono bg-surface/50">
                    <th className="py-2.5 px-3">Restricted Category</th>
                    <th className="py-2.5 px-3">Blocked Syntax / API</th>
                    <th className="py-2.5 px-3">Why It Is Disallowed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-surface/30">
                    <td className="py-2.5 px-3 font-medium text-foreground">Operating System & Processes</td>
                    <td className="py-2.5 px-3 font-mono text-rose-700">Runtime.exec(), ProcessBuilder, System.exit()</td>
                    <td className="py-2.5 px-3 text-muted-foreground">Cannot execute shell commands or terminate host processes.</td>
                  </tr>
                  <tr className="hover:bg-surface/30">
                    <td className="py-2.5 px-3 font-medium text-foreground">Host Filesystem I/O</td>
                    <td className="py-2.5 px-3 font-mono text-rose-700">java.io.File, FileInputStream, java.nio.file.*</td>
                    <td className="py-2.5 px-3 text-muted-foreground">Cannot access, read, write, or delete files on your local hard drive.</td>
                  </tr>
                  <tr className="hover:bg-surface/30">
                    <td className="py-2.5 px-3 font-medium text-foreground">Network & Sockets</td>
                    <td className="py-2.5 px-3 font-mono text-rose-700">java.net.Socket, ServerSocket, HttpURLConnection</td>
                    <td className="py-2.5 px-3 text-muted-foreground">Cannot open raw TCP sockets or scrape external websites.</td>
                  </tr>
                  <tr className="hover:bg-surface/30">
                    <td className="py-2.5 px-3 font-medium text-foreground">Reflection & Bytecode</td>
                    <td className="py-2.5 px-3 font-mono text-rose-700">java.lang.reflect.*, Class.forName(), MethodHandles</td>
                    <td className="py-2.5 px-3 text-muted-foreground">Bypasses OOP access invariants and breaks deterministic visual modeling.</td>
                  </tr>
                  <tr className="hover:bg-surface/30">
                    <td className="py-2.5 px-3 font-medium text-foreground">Unsafe Memory Access</td>
                    <td className="py-2.5 px-3 font-mono text-rose-700">sun.misc.Unsafe, java.security.*</td>
                    <td className="py-2.5 px-3 text-muted-foreground">Direct memory manipulation outside the simulated Eden Heap is blocked.</td>
                  </tr>
                  <tr className="hover:bg-surface/30">
                    <td className="py-2.5 px-3 font-medium text-foreground">Desktop GUI Windows</td>
                    <td className="py-2.5 px-3 font-mono text-rose-700">javax.swing.*, java.awt.*, javafx.*</td>
                    <td className="py-2.5 px-3 text-muted-foreground">Native OS desktop windows cannot render in the browser canvas.</td>
                  </tr>
                  <tr className="hover:bg-surface/30">
                    <td className="py-2.5 px-3 font-medium text-foreground">Destructive Thread Abort</td>
                    <td className="py-2.5 px-3 font-mono text-rose-700">Thread.stop(), Thread.suspend(), Thread.resume()</td>
                    <td className="py-2.5 px-3 text-muted-foreground">Deprecated in Java; causes unrecoverable deadlocks.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* Section 3: Hard Limits & Execution Quotas */}
      {(activeCategory === 'all' || activeCategory === 'limits') &&
        matchesSearch('limits quotas steps stack depth heap allocations budget timeout infinite loop') && (
          <div className="p-6 bg-white border border-border rounded-xl space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-foreground">3. Hard Execution Quotas & Guardrails</h2>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                BROWSER SAFEGUARDS
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              To prevent accidental infinite loops or memory leaks from freezing your browser tab, the deterministic execution engine enforces strict execution boundaries:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-lg border border-border bg-surface/30 text-center space-y-1">
                <div className="text-[11px] font-mono text-muted-foreground">Max Steps</div>
                <div className="text-lg font-bold font-mono text-foreground">2,000</div>
                <div className="text-[10px] text-muted-foreground">Execution budget per run</div>
              </div>
              <div className="p-3.5 rounded-lg border border-border bg-surface/30 text-center space-y-1">
                <div className="text-[11px] font-mono text-muted-foreground">Loop Cap</div>
                <div className="text-lg font-bold font-mono text-foreground">1,000</div>
                <div className="text-[10px] text-muted-foreground">Max single loop iterations</div>
              </div>
              <div className="p-3.5 rounded-lg border border-border bg-surface/30 text-center space-y-1">
                <div className="text-[11px] font-mono text-muted-foreground">Stack Depth</div>
                <div className="text-lg font-bold font-mono text-foreground">50</div>
                <div className="text-[10px] text-muted-foreground">Max call frames (recursion)</div>
              </div>
              <div className="p-3.5 rounded-lg border border-border bg-surface/30 text-center space-y-1">
                <div className="text-[11px] font-mono text-muted-foreground">Heap Objects</div>
                <div className="text-lg font-bold font-mono text-foreground">100</div>
                <div className="text-[10px] text-muted-foreground">Max active instances in Eden</div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">What happens when a limit is exceeded?</span>
                <span className="text-[11px] text-amber-800 leading-relaxed block mt-0.5">
                  The simulator safely halts execution at that exact instruction and displays a descriptive notification (e.g. <code className="font-mono font-semibold">StackOverflowError</code> or <code className="font-mono font-semibold">[SAFETY TERMINATION: Execution budget exceeded]</code>) without crashing the tab or losing your code.
                </span>
              </div>
            </div>
          </div>
        )}

      {/* Section 4: Exception Handling Explained */}
      {(activeCategory === 'all' || activeCategory === 'exceptions') &&
        matchesSearch('exceptions try catch finally throw fault interception diversion status') && (
          <div className="p-6 bg-white border border-border rounded-xl space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-purple-600" />
                <h2 className="text-sm font-bold text-foreground">4. Exception Handling & The Fault Interception Card</h2>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                FAULT VISUALIZATION
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              When an exception occurs during simulation, OOPS LAB visually intercepts it. Depending on whether your code caught it with a <code className="font-mono text-foreground">try-catch</code> block, the visualizer displays one of two diversion states:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900 font-mono">Uncaught Exception</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-semibold">
                    STATUS: THROWN
                  </span>
                </div>
                <p className="text-xs text-rose-800/90 leading-relaxed">
                  Occurs when an exception is thrown (e.g. <code className="font-mono">throw new IllegalArgumentException(...)</code> or division by zero) without an enclosing <code className="font-mono">try-catch</code>.
                </p>
                <div className="text-[11px] text-rose-700 bg-white/80 p-2.5 rounded border border-rose-200 font-mono">
                  The red "EXCEPTION THROWN" card appears on canvas, highlighting the triggering line and stopping further steps.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 font-mono">Caught Exception</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    STATUS: CAUGHT
                  </span>
                </div>
                <p className="text-xs text-emerald-800/90 leading-relaxed">
                  Occurs when the throwing code is wrapped inside a <code className="font-mono">try &#123; ... &#125; catch (Exception e) &#123; ... &#125;</code> block.
                </p>
                <div className="text-[11px] text-emerald-700 bg-white/80 p-2.5 rounded border border-emerald-200 font-mono">
                  Variable 'e' is added to the stack frame, execution diverts into the catch block, and the program continues smoothly!
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Section 5: Verified Code Templates */}
      {(activeCategory === 'all' || activeCategory === 'templates') &&
        matchesSearch('templates code examples bankaccount manager sarah employee') && (
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold text-foreground">5. Verified Code Templates</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Ready-to-run Java programs configured specifically for instant 2D/3D visualization in OOPS LAB.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {VERIFIED_TEMPLATES.map((tmpl) => (
                <div key={tmpl.id} className="p-5 bg-white border border-border rounded-xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-foreground font-mono">{tmpl.title}</h3>
                      <p className="text-[11.5px] text-muted-foreground mt-0.5">{tmpl.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCopy(tmpl.code, tmpl.id)}
                        className="px-2.5 py-1 text-xs border border-border rounded-md hover:bg-surface text-foreground font-medium flex items-center space-x-1 cursor-pointer transition-colors"
                        title="Copy code to clipboard"
                      >
                        {copiedKey === tmpl.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleLoadInPlayground(tmpl.code)}
                        className="px-3 py-1 text-xs bg-foreground text-background font-medium rounded-md hover:bg-black/90 flex items-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Open in Playground</span>
                      </button>
                    </div>
                  </div>

                  <pre className="p-3.5 bg-surface/50 border border-border rounded-lg text-xs font-mono text-[#1F2937] overflow-x-auto leading-relaxed max-h-64">
                    <code>{tmpl.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default RulesPage;
