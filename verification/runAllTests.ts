// Verification script for OOPS LAB visualizer backend
// Generates Java snippets covering all language constructs, parses them, runs the VM,
// builds the semantic model, and checks that required SemanticEntity types and relationships exist.

import { JavaAstParser } from "./frontend/src/core/engine/javaAstParser";
import { JavaVirtualMachine } from "./frontend/src/core/engine/javaVirtualMachine";
// import { useSemanticModel } from "./frontend/src/core/engine/useSemanticModel";

// Helper type for test case definition
interface TestCase {
  name: string;
  code: string;
  expectedKinds: string[]; // list of entity kinds that must be present
  expectedRelationships?: { kind: string; source: string; target: string }[];
}

// Collection of test cases covering language features
const testCases: TestCase[] = [
  {
    name: "Simple class",
    code: `public class Hello { private int x; public Hello() { x = 0; } public void inc() { x++; } }`,
    expectedKinds: ["class", "field", "constructor", "method"],
  },
  {
    name: "Interface implementation",
    code: `public interface Service { void execute(); } public class ServiceImpl implements Service { public void execute() {} }`,
    expectedKinds: ["interface", "class", "method"],
    expectedRelationships: [{ kind: "implementation", source: "class-ServiceImpl", target: "class-Service" }],
  },
  {
    name: "Enum with methods",
    code: `public enum Direction { NORTH { public String toString(){return "N";} }, SOUTH; public abstract String toString(); }`,
    expectedKinds: ["enum", "method"],
  },
  {
    name: "Record",
    code: `public record Point(int x, int y) {}`,
    expectedKinds: ["record", "field"],
  },
  {
    name: "Generic class",
    code: `public class Box<T> { private T value; public Box(T v){ this.value = v; } public T get(){ return value; } }`,
    expectedKinds: ["class", "field", "method", "constructor"],
  },
  {
    name: "Inner class",
    code: `public class Outer { private int outerVal; class Inner { void show(){ System.out.println(outerVal); } } }`,
    expectedKinds: ["class", "field", "method"],
  },
  {
    name: "Static initializer",
    code: `public class InitDemo { static { System.out.println(\"static init\"); } }`,
    expectedKinds: ["class"],
  },
  {
    name: "Lambda expression",
    code: `import java.util.function.Function; public class LambdaDemo { Function<Integer,Integer> f = x -> x+1; }`,
    expectedKinds: ["class", "field"],
  },
  {
    name: "Thread and synchronized",
    code: `public class ThreadDemo implements Runnable { private int counter; public void run(){ synchronized(this){ counter++; } } public static void main(String[] args){ Thread t = new Thread(new ThreadDemo()); t.start(); } }`,
    expectedKinds: ["class", "method", "field"],
    expectedRelationships: [{ kind: "thread", source: "thread-main", target: "class-ThreadDemo" }],
  },
];

function logResult(testName: string, passed: boolean, details?: string) {
  console.log(`${passed ? "✅" : "❌"} ${testName}${details ? " – " + details : ""}`);
}

function runVerification() {
  const parser = new JavaAstParser();
  const vm = new JavaVirtualMachine();
  let allPassed = true;

  for (const tc of testCases) {
    try {
      const program = parser.parse(tc.code, `${tc.name}.java`);
      // Build semantic model via the VM (which also produces execution events)
      const execResult = vm.executeProgram(program);
      const model = execResult.semanticModel; // Assuming VM returns {semanticModel, events}

      // Verify expected entity kinds exist
      const presentKinds = new Set(model.entities.map((e: any) => e.kind));
      const missingKinds = tc.expectedKinds.filter(k => !presentKinds.has(k));
      if (missingKinds.length > 0) {
        logResult(tc.name, false, `missing kinds: ${missingKinds.join(", ")}`);
        allPassed = false;
        continue;
      }

      // Verify relationships if defined
      if (tc.expectedRelationships) {
        const rels = model.relationships;
        const missingRels: string[] = [];
        for (const exp of tc.expectedRelationships) {
          const found = rels.find((r: any) => r.kind === exp.kind && r.sourceId === exp.source && r.targetId === exp.target);
          if (!found) missingRels.push(`${exp.kind}(${exp.source}->${exp.target})`);
        }
        if (missingRels.length > 0) {
          logResult(tc.name, false, `missing relationships: ${missingRels.join(", ")}`);
          allPassed = false;
          continue;
        }
      }

      logResult(tc.name, true);
    } catch (e) {
      logResult(tc.name, false, `exception ${e}`);
      allPassed = false;
    }
  }

  if (!allPassed) {
    console.error("Verification failed – see above messages.");
    process.exit(1);
  } else {
    console.log("All verification tests passed.");
  }
}

runVerification();
