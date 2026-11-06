/**
 * OOPS LAB — Java Virtual Execution & Runtime Event Engine
 * Conforms to Master Specification: Real Java Execution, Dynamic Dispatch,
 * Accurate Loops, Method Returns, Superclass Chaining, and Semantic Snapping.
 * Generates canonical ExecutionEvent snapshots with traceable provenance.
 */

import type { ParsedJavaProgram, JavaEntity, AstStatement } from './unifiedModel';
import type {
  ExecutionEvent,
  ExecutionTrace,
  HeapObjectSnapshot,
  LocalVariableSnapshot,
  ObjectFieldSnapshot,
  StackFrameSnapshot,
  ThreadSnapshot,
} from '../../types/execution';

interface ResolvedClass {
  id: string;
  name: string;
  file?: string;
  fields: JavaEntity[];
  constructors: JavaEntity[];
  methods: JavaEntity[];
  superclass?: string;
  interfaces: string[];
}

interface RuntimeObjectInstance {
  id: string; // Logical ID (e.g. "OBJ-001")
  className: string;
  fields: Record<string, { type: string; value: string | number | boolean | null; isRef: boolean }>;
  creationLine: number;
}

interface EvaluationResult {
  value: string | number | boolean | null;
  isRef: boolean;
  type: string;
}

interface SnapshotOptions {
  file?: string;
  mutatedField?: {
    objectAddress: string;
    fieldName: string;
    previousValue: string | number | boolean | null;
    newValue: string | number | boolean | null;
  };
  allocatedObjectId?: string;
  isException?: boolean;
  exceptionDetail?: {
    className: string;
    message: string;
    line: number;
    file?: string;
  };
  stdoutDelta?: string;
  whatHappened?: string;
  whyItHappened?: string;
  whatChanged?: string;
  oopConceptNote?: {
    concept: string;
    title: string;
    explanation: string;
    evidence?: string;
  };
}

const MAX_SIMULATION_STEPS = 2000;
const MAX_CALL_STACK_DEPTH = 50;
const MAX_HEAP_ALLOCATIONS = 100;
const MAX_ARRAY_LENGTH = 100;
const MAX_STRING_LENGTH = 10000;
const MAX_STDOUT_BYTES = 64 * 1024;

export class JavaVirtualMachine {
  private objectCounter = 0;

  /**
   * Helper to scan source lines and find matching block closing brace.
   */
  private findBlockEndLine(sourceCode: string, startLine: number): number {
    const lines = sourceCode.split('\n');
    let braceDepth = 0;
    let foundOpen = false;

    for (let i = startLine - 1; i < lines.length; i++) {
      const line = lines[i];
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '{') {
          braceDepth++;
          foundOpen = true;
        } else if (char === '}') {
          braceDepth--;
          if (foundOpen && braceDepth === 0) {
            return i + 1; // 1-based line number
          }
        }
      }
    }
    return startLine + 10; // Fallback
  }

  /**
   * Execute a parsed Java program and produce a complete traceable ExecutionTrace.
   */
  public execute(program: ParsedJavaProgram, defaultFileName = 'Main.java'): ExecutionTrace {
    this.objectCounter = 0;

    // 1. Semantic Symbol Resolution Table
    const classTable = new Map<string, ResolvedClass>();
    for (const cls of program.classes) {
      const clsFields = program.fields.filter((f) => f.metadata.className === cls.name);
      const clsCtors = program.constructors.filter((c) => c.metadata.className === cls.name);
      const clsMethods = program.methods.filter((m) => m.metadata.className === cls.name);

      classTable.set(cls.name, {
        id: cls.id,
        name: cls.name,
        file: cls.sourceLocation?.file || defaultFileName,
        fields: clsFields,
        constructors: clsCtors,
        methods: clsMethods,
        superclass: cls.metadata.superclass as string | undefined,
        interfaces: (cls.metadata.interfaces as string[]) || [],
      });
    }

    // Class hierarchy resolver: walks up superclass chain
    const getClassHierarchy = (className: string): ResolvedClass[] => {
      const hierarchy: ResolvedClass[] = [];
      let currentName: string | undefined = className;
      const seen = new Set<string>();

      while (currentName && !seen.has(currentName) && currentName !== 'Object') {
        seen.add(currentName);
        const resolved = classTable.get(currentName);
        if (resolved) {
          hierarchy.push(resolved);
          currentName = resolved.superclass;
        } else {
          break;
        }
      }
      return hierarchy;
    };

    // Collect all fields from class and ancestors
    const getAllClassFields = (className: string): JavaEntity[] => {
      const hierarchy = getClassHierarchy(className);
      const fields: JavaEntity[] = [];
      const seenFieldNames = new Set<string>();

      // Ancestors first, then subclasses (so subclasses override if needed)
      for (let i = hierarchy.length - 1; i >= 0; i--) {
        for (const f of hierarchy[i].fields) {
          if (!seenFieldNames.has(f.name)) {
            fields.push(f);
            seenFieldNames.add(f.name);
          }
        }
      }
      return fields;
    };

    // Dynamic method resolution: start at runtime class, walk up superclasses
    const resolveMethod = (className: string, methodName: string): { method: JavaEntity; ownerClass: ResolvedClass } | null => {
      const hierarchy = getClassHierarchy(className);
      for (const cls of hierarchy) {
        const found = cls.methods.find((m) => m.name === methodName);
        if (found) {
          return { method: found, ownerClass: cls };
        }
      }
      return null;
    };

    // 2. Identify Entry Point: public static void main(String[] args)
    let mainClass = program.classes.find((c) =>
      program.methods.some((m) => m.name === 'main' && m.metadata.className === c.name)
    );
    if (!mainClass) {
      mainClass = program.classes[program.classes.length - 1] || program.classes[0];
    }
    const mainClassName = mainClass ? mainClass.name : 'Main';
    const mainFile = mainClass?.sourceLocation?.file || defaultFileName;

    const events: ExecutionEvent[] = [];
    const heapObjects = new Map<string, RuntimeObjectInstance>();
    const stackFrames: StackFrameSnapshot[] = [];
    const staticFields = new Map<string, Record<string, { type: string; value: any; isRef: boolean }>>();
    let stdoutBuffer = '';
    let stepCount = 0;
    let runtimeHalted = false;

    // Multithreading runtime state
    const threadTable = new Map<string, ThreadSnapshot>();
    const threadTargetMap = new Map<string, string>();
    let activeThreadId = 'thread-main';
    let threadCounter = 1;

    const mainThread: ThreadSnapshot = {
      threadId: 'thread-main',
      name: 'main',
      state: 'RUNNABLE',
      callStack: [],
      isCurrent: true,
    };
    threadTable.set(mainThread.threadId, mainThread);

    // Initialize static fields for each class
    for (const [clsName, resolvedCls] of classTable.entries()) {
      const clsStatics: Record<string, { type: string; value: any; isRef: boolean }> = {};
      for (const f of resolvedCls.fields) {
        if (f.metadata.isStatic) {
          clsStatics[f.name] = {
            type: f.declaredType || 'Object',
            value: null,
            isRef: !f.metadata.isPrimitive,
          };
        }
      }
      staticFields.set(clsName, clsStatics);
    }

    // Helper to capture a deep snapshot of current stack and heap
    const captureSnapshot = (
      type: ExecutionEvent['type'],
      line: number,
      methodName: string,
      className: string,
      description: string,
      options?: SnapshotOptions
    ) => {
      if (runtimeHalted && type !== 'EXCEPTION_THROWN') return;

      stepCount++;
      if (stepCount >= MAX_SIMULATION_STEPS && !runtimeHalted) {
        runtimeHalted = true;
        description = `[SAFETY TERMINATION] Simulation exceeded execution budget of ${MAX_SIMULATION_STEPS} steps. Infinite loop or recursion aborted.`;
        type = 'EXCEPTION_THROWN';
      }

      const currentFile = options?.file || defaultFileName;

      const heapSnapshots: HeapObjectSnapshot[] = Array.from(heapObjects.values()).map((obj) => {
        const isMutatedObj = options?.mutatedField && options.mutatedField.objectAddress === obj.id;
        const mutatedFieldName = isMutatedObj ? options?.mutatedField?.fieldName : undefined;

        const fieldsList: ObjectFieldSnapshot[] = Object.entries(obj.fields).map(([name, f]) => {
          const isThisFieldMutated = isMutatedObj && mutatedFieldName === name;
          return {
            name,
            type: f.type,
            value: f.value,
            isReference: f.isRef,
            targetAddress: f.isRef && f.value ? String(f.value) : undefined,
            previousValue: isThisFieldMutated ? options?.mutatedField?.previousValue : undefined,
            isMutated: isThisFieldMutated,
          };
        });

        return {
          address: obj.id,
          id: obj.id,
          className: obj.className,
          fields: fieldsList,
          isNew: options?.allocatedObjectId === obj.id,
          mutatedFieldNames: isMutatedObj && mutatedFieldName ? [mutatedFieldName] : [],
        };
      });

      const frameSnapshots: StackFrameSnapshot[] = stackFrames.map((f, idx) => ({
        frameId: f.frameId,
        methodName: f.methodName,
        className: f.className,
        line: f.line,
        file: f.file || currentFile,
        localVariables: f.localVariables.map((v) => ({ ...v })),
        isTop: idx === stackFrames.length - 1,
        status: idx === stackFrames.length - 1 ? 'active' : 'suspended',
      }));

      // Synchronize active thread call stack
      const currentActiveThread = threadTable.get(activeThreadId);
      if (currentActiveThread) {
        currentActiveThread.callStack = frameSnapshots.map((f) => ({ ...f }));
      }

      const threadSnapshots: ThreadSnapshot[] = Array.from(threadTable.values()).map((t) => ({
        threadId: t.threadId,
        name: t.name,
        state: t.state,
        callStack: t.threadId === activeThreadId ? frameSnapshots.map((f) => ({ ...f })) : t.callStack.map((f: StackFrameSnapshot) => ({ ...f })),
        isCurrent: t.threadId === activeThreadId,
        lockAcquired: t.lockAcquired,
        lockWaitingOn: t.lockWaitingOn,
      }));

      const derivedWhatHappened = options?.whatHappened || (() => {
        switch (type) {
          case 'OBJECT_ALLOCATED':
            return `Allocated a new instance of ${className} on the JVM Heap.`;
          case 'FIELD_MUTATED':
            return `Modified field '${options?.mutatedField?.fieldName}' on ${options?.mutatedField?.objectAddress} to ${options?.mutatedField?.newValue}.`;
          case 'FRAME_PUSH':
            return `Invoked method ${className}.${methodName}(). Pushed new activation frame onto the Call Stack.`;
          case 'FRAME_POP':
            return `Method ${className}.${methodName}() completed. Popped activation frame from Call Stack.`;
          case 'BRANCH_TAKEN':
            return `Evaluated conditional branch decision at line ${line}.`;
          case 'LOOP_ITERATION':
            return `Loop condition satisfied; executing iteration at line ${line}.`;
          case 'EXCEPTION_THROWN':
            return `Threw ${options?.exceptionDetail?.className || 'Exception'}: "${options?.exceptionDetail?.message || 'Error occurred'}".`;
          case 'THREAD_START':
            return `Started thread execution in thread '${activeThreadId}'.`;
          case 'LOCK_ACQUIRED':
            return `Thread '${activeThreadId}' acquired synchronization lock.`;
          case 'LOCK_RELEASED':
            return `Thread '${activeThreadId}' released synchronization lock.`;
          default:
            return description || `Executed statement at line ${line}.`;
        }
      })();

      const derivedWhyItHappened = options?.whyItHappened || (() => {
        switch (type) {
          case 'OBJECT_ALLOCATED':
            return `The 'new' operator allocated memory in Eden Space, zero-initialized instance fields, and prepared constructor dispatch.`;
          case 'FIELD_MUTATED':
            return `An assignment expression directly mutated the instance state of the target object.`;
          case 'FRAME_PUSH':
            return `A method invocation transferred execution control and allocated dedicated frame space for local variables and arguments.`;
          case 'FRAME_POP':
            return `Encountered return statement or end of method body, releasing local stack resources and returning control to caller.`;
          case 'BRANCH_TAKEN':
            return `Boolean expression evaluated to true, directing execution along this specific code path.`;
          case 'LOOP_ITERATION':
            return `Loop continuation condition remained true, driving sequential re-execution of the loop body.`;
          case 'EXCEPTION_THROWN':
            return `An error condition or explicit 'throw' statement interrupted normal sequential control flow to trigger stack unwinding.`;
          case 'THREAD_START':
            return `Invoked Thread.start(), causing the JVM to schedule a separate call stack for parallel execution.`;
          case 'LOCK_ACQUIRED':
            return `Entered synchronized block/method; acquired intrinsic monitor lock on target object.`;
          case 'LOCK_RELEASED':
            return `Exited synchronized block/method; released intrinsic monitor lock so other waiting threads may proceed.`;
          default:
            return `Sequential statement evaluation within the current method activation context.`;
        }
      })();

      const derivedWhatChanged = options?.whatChanged || (() => {
        switch (type) {
          case 'OBJECT_ALLOCATED':
            return `+ Heap: Allocated ${options?.allocatedObjectId || className} with initial default fields.`;
          case 'FIELD_MUTATED':
            return `Heap state: ${options?.mutatedField?.objectAddress}.${options?.mutatedField?.fieldName} changed from ${options?.mutatedField?.previousValue ?? 'null'} to ${options?.mutatedField?.newValue}.`;
          case 'FRAME_PUSH':
            return `+ Call Stack: Pushed frame '${className}.${methodName}()' (depth: ${frameSnapshots.length}).`;
          case 'FRAME_POP':
            return `- Call Stack: Discarded frame for '${className}.${methodName}()'.`;
          case 'EXCEPTION_THROWN':
            return `Exception signal active (${options?.exceptionDetail?.className}).`;
          default:
            return `Execution pointer advanced to line ${line}.`;
        }
      })();

      events.push({
        step: stepCount,
        type,
        line,
        file: currentFile,
        methodName,
        className,
        description,
        whatHappened: derivedWhatHappened,
        whyItHappened: derivedWhyItHappened,
        whatChanged: derivedWhatChanged,
        oopConceptNote: options?.oopConceptNote,
        stackFrames: frameSnapshots,
        heapObjects: heapSnapshots,
        threads: threadSnapshots,
        stdout: options?.stdoutDelta,
        mutatedField: options?.mutatedField,
        allocatedObjectId: options?.allocatedObjectId,
        isException: options?.isException,
        exceptionDetail: options?.exceptionDetail,
      });
    };

    // Helper to evaluate arbitrary Java expressions in frame context
    const evaluateExpression = (
      expr: string,
      currentFrame: StackFrameSnapshot,
      thisInstance?: RuntimeObjectInstance
    ): EvaluationResult => {
      const trimmed = expr.trim();

      // String literal
      if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        return { value: trimmed.slice(1, -1), isRef: false, type: trimmed.startsWith("'") ? 'char' : 'String' };
      }
      // Numeric literal
      if (/^-?\d+(\.\d+)?f?$/.test(trimmed)) {
        const clean = trimmed.replace(/f$/, '');
        const num = parseFloat(clean);
        return { value: num, isRef: false, type: clean.includes('.') ? 'double' : 'int' };
      }
      // Boolean literal
      if (trimmed === 'true' || trimmed === 'false') {
        return { value: trimmed === 'true', isRef: false, type: 'boolean' };
      }
      if (trimmed === 'null') {
        return { value: null, isRef: true, type: 'null' };
      }

      // Logical NOT: !expr
      if (trimmed.startsWith('!') && !trimmed.startsWith('!=')) {
        const inner = evaluateExpression(trimmed.slice(1), currentFrame, thisInstance);
        return { value: !inner.value, isRef: false, type: 'boolean' };
      }

      // Parentheses unwrapping: (expr)
      if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
        let depth = 0;
        let isEnclosing = true;
        for (let i = 0; i < trimmed.length - 1; i++) {
          if (trimmed[i] === '(') depth++;
          else if (trimmed[i] === ')') depth--;
          if (depth === 0) {
            isEnclosing = false;
            break;
          }
        }
        if (isEnclosing) {
          return evaluateExpression(trimmed.slice(1, -1), currentFrame, thisInstance);
        }
      }

      // Type Cast: (int) x or (double) x
      const castMatch = trimmed.match(/^\(([A-Za-z0-9_]+)\)\s*([\s\S]+)$/);
      if (castMatch) {
        const targetType = castMatch[1];
        const innerVal = evaluateExpression(castMatch[2], currentFrame, thisInstance);
        if (['int', 'long', 'short', 'byte'].includes(targetType)) {
          return { value: Math.trunc(Number(innerVal.value)), isRef: false, type: targetType };
        }
        if (['double', 'float'].includes(targetType)) {
          return { value: Number(innerVal.value), isRef: false, type: targetType };
        }
        return { ...innerVal, type: targetType };
      }

      // Check local variables in current frame
      const localVar = currentFrame.localVariables.find((v) => v.name === trimmed);
      if (localVar) {
        return {
          value: localVar.value,
          isRef: localVar.isReference,
          type: localVar.type,
        };
      }

      // Check 'this' keyword
      if (trimmed === 'this' && thisInstance) {
        return {
          value: thisInstance.id,
          isRef: true,
          type: thisInstance.className,
        };
      }

      // Check 'this' instance fields directly
      if (thisInstance && thisInstance.fields[trimmed] !== undefined) {
        const f = thisInstance.fields[trimmed];
        return {
          value: f.value,
          isRef: f.isRef,
          type: f.type,
        };
      }

      // Check ternary operator: cond ? val1 : val2
      if (trimmed.includes('?') && trimmed.includes(':')) {
        const qIdx = trimmed.indexOf('?');
        const colonIdx = trimmed.lastIndexOf(':');
        if (qIdx > 0 && colonIdx > qIdx) {
          const condExpr = trimmed.substring(0, qIdx).trim();
          const trueExpr = trimmed.substring(qIdx + 1, colonIdx).trim();
          const falseExpr = trimmed.substring(colonIdx + 1).trim();

          const condRes = evaluateExpression(condExpr, currentFrame, thisInstance);
          return condRes.value ? evaluateExpression(trueExpr, currentFrame, thisInstance) : evaluateExpression(falseExpr, currentFrame, thisInstance);
        }
      }

      // Check logical OR: ||
      if (trimmed.includes('||')) {
        const parts = trimmed.split('||');
        let orBool = false;
        for (const p of parts) {
          const res = evaluateExpression(p.trim(), currentFrame, thisInstance);
          if (res.value) {
            orBool = true;
            break;
          }
        }
        return { value: orBool, isRef: false, type: 'boolean' };
      }

      // Check logical AND: &&
      if (trimmed.includes('&&')) {
        const parts = trimmed.split('&&');
        let andBool = true;
        for (const p of parts) {
          const res = evaluateExpression(p.trim(), currentFrame, thisInstance);
          if (!res.value) {
            andBool = false;
            break;
          }
        }
        return { value: andBool, isRef: false, type: 'boolean' };
      }

      // Check Method Calls on Object or String: e.g. obj.method(args) or "abc".length()
      const methodCallMatch = trimmed.match(/^([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\((.*)\)$/);
      if (methodCallMatch) {
        const callerName = methodCallMatch[1];
        const methodName = methodCallMatch[2];
        const rawArgs = methodCallMatch[3].trim();
        const callArgs = rawArgs ? rawArgs.split(',').map((a) => a.trim()) : [];

        // Built-in String methods
        const callerRes = evaluateExpression(callerName, currentFrame, thisInstance);
        if (callerRes.type === 'String' && typeof callerRes.value === 'string') {
          const str = callerRes.value;
          if (methodName === 'length') return { value: str.length, isRef: false, type: 'int' };
          if (methodName === 'isEmpty') return { value: str.length === 0, isRef: false, type: 'boolean' };
          if (methodName === 'toUpperCase') return { value: str.toUpperCase(), isRef: false, type: 'String' };
          if (methodName === 'toLowerCase') return { value: str.toLowerCase(), isRef: false, type: 'String' };
          if (methodName === 'equals') {
            const otherRes = evaluateExpression(callArgs[0] || '""', currentFrame, thisInstance);
            return { value: str === String(otherRes.value), isRef: false, type: 'boolean' };
          }
          if (methodName === 'contains') {
            const otherRes = evaluateExpression(callArgs[0] || '""', currentFrame, thisInstance);
            return { value: str.includes(String(otherRes.value)), isRef: false, type: 'boolean' };
          }
        }

        // Object instance method call that returns value
        let targetObjId: string | null = null;
        if (callerName === 'this' && thisInstance) {
          targetObjId = thisInstance.id;
        } else if (callerRes.isRef && callerRes.value) {
          targetObjId = String(callerRes.value);
        }

        if (targetObjId) {
          const targetObj = heapObjects.get(targetObjId);
          if (targetObj) {
            // Built-in Collection methods for ArrayList
            if (targetObj.className === 'ArrayList' || targetObj.className === 'List') {
              if (methodName === 'add') {
                const itemRes = evaluateExpression(callArgs[0], currentFrame, thisInstance);
                const curSize = Number(targetObj.fields['size']?.value || 0);
                targetObj.fields[`[${curSize}]`] = { type: itemRes.type, value: itemRes.value, isRef: itemRes.isRef };
                targetObj.fields['size'] = { type: 'int', value: curSize + 1, isRef: false };
                captureSnapshot(
                  'FIELD_MUTATED',
                  currentFrame.line,
                  currentFrame.methodName,
                  currentFrame.className,
                  `ArrayList.add(${JSON.stringify(itemRes.value)}): size is now ${curSize + 1}`,
                  {
                    file: currentFrame.file,
                    mutatedField: {
                      objectAddress: targetObj.id,
                      fieldName: `[${curSize}]`,
                      previousValue: null,
                      newValue: itemRes.value,
                    },
                  }
                );
                return { value: true, isRef: false, type: 'boolean' };
              }
              if (methodName === 'get') {
                const idxRes = evaluateExpression(callArgs[0], currentFrame, thisInstance);
                const idx = Number(idxRes.value);
                const elem = targetObj.fields[`[${idx}]`];
                return elem ? { value: elem.value, isRef: elem.isRef, type: elem.type } : { value: null, isRef: false, type: 'null' };
              }
              if (methodName === 'size') {
                return { value: Number(targetObj.fields['size']?.value || 0), isRef: false, type: 'int' };
              }
              if (methodName === 'isEmpty') {
                return { value: Number(targetObj.fields['size']?.value || 0) === 0, isRef: false, type: 'boolean' };
              }
            }

            // Built-in Collection methods for HashMap
            if (targetObj.className === 'HashMap' || targetObj.className === 'Map') {
              if (methodName === 'put') {
                const kRes = evaluateExpression(callArgs[0], currentFrame, thisInstance);
                const vRes = evaluateExpression(callArgs[1], currentFrame, thisInstance);
                const kStr = String(kRes.value);
                const isNew = targetObj.fields[kStr] === undefined;
                targetObj.fields[kStr] = { type: vRes.type, value: vRes.value, isRef: vRes.isRef };
                if (isNew) {
                  const curSize = Number(targetObj.fields['size']?.value || 0);
                  targetObj.fields['size'] = { type: 'int', value: curSize + 1, isRef: false };
                }
                captureSnapshot(
                  'FIELD_MUTATED',
                  currentFrame.line,
                  currentFrame.methodName,
                  currentFrame.className,
                  `HashMap.put(${kStr}, ${JSON.stringify(vRes.value)})`,
                  {
                    file: currentFrame.file,
                    mutatedField: {
                      objectAddress: targetObj.id,
                      fieldName: kStr,
                      previousValue: null,
                      newValue: vRes.value,
                    },
                  }
                );
                return vRes;
              }
              if (methodName === 'get') {
                const kRes = evaluateExpression(callArgs[0], currentFrame, thisInstance);
                const elem = targetObj.fields[String(kRes.value)];
                return elem ? { value: elem.value, isRef: elem.isRef, type: elem.type } : { value: null, isRef: true, type: 'null' };
              }
              if (methodName === 'containsKey') {
                const kRes = evaluateExpression(callArgs[0], currentFrame, thisInstance);
                return { value: targetObj.fields[String(kRes.value)] !== undefined, isRef: false, type: 'boolean' };
              }
              if (methodName === 'size') {
                return { value: Number(targetObj.fields['size']?.value || 0), isRef: false, type: 'int' };
              }
            }

            const ret = executeMethodCall(targetObj.id, targetObj.className, methodName, callArgs, currentFrame, currentFrame.line, currentFrame.file);
            if (ret) return ret;
          }
        }
      }

      // Check array element indexing: arr[index]
      const arrIdxMatch = trimmed.match(/^([A-Za-z0-9_]+)\[([\s\S]+)\]$/);
      if (arrIdxMatch) {
        const arrVarName = arrIdxMatch[1];
        const idxExpr = arrIdxMatch[2];
        const arrRes = evaluateExpression(arrVarName, currentFrame, thisInstance);
        const idxRes = evaluateExpression(idxExpr, currentFrame, thisInstance);
        if (arrRes.isRef && arrRes.value) {
          const arrObj = heapObjects.get(String(arrRes.value));
          if (arrObj) {
            const idx = Number(idxRes.value);
            const elem = arrObj.fields[`[${idx}]`];
            if (elem) {
              return { value: elem.value, isRef: elem.isRef, type: elem.type };
            }
            return { value: null, isRef: false, type: 'null' };
          }
        }
      }

      // Check array length: arr.length
      if (trimmed.endsWith('.length') && !trimmed.includes('(')) {
        const arrVarName = trimmed.replace(/\.length$/, '');
        const arrRes = evaluateExpression(arrVarName, currentFrame, thisInstance);
        if (arrRes.isRef && arrRes.value) {
          const arrObj = heapObjects.get(String(arrRes.value));
          if (arrObj && arrObj.fields['length']) {
            return { value: arrObj.fields['length'].value, isRef: false, type: 'int' };
          }
        }
      }

      // Check field access: obj.field or this.field or ClassName.staticField
      if (trimmed.includes('.') && !trimmed.includes('(')) {
        const parts = trimmed.split('.');
        const targetVarName = parts[0];
        const targetFieldName = parts[1];

        // Check ClassName.staticField
        const statics = staticFields.get(targetVarName);
        if (statics && statics[targetFieldName] !== undefined) {
          const sf = statics[targetFieldName];
          return { value: sf.value, isRef: sf.isRef, type: sf.type };
        }

        let targetObjId: string | null = null;
        if (targetVarName === 'this' && thisInstance) {
          targetObjId = thisInstance.id;
        } else {
          const refVar = currentFrame.localVariables.find((v) => v.name === targetVarName);
          if (refVar) {
            if (refVar.value === null) {
              throw new Error(`NullPointerException: Cannot read field "${targetFieldName}" because "${targetVarName}" is null`);
            }
            targetObjId = String(refVar.value);
          }
        }

        if (targetObjId) {
          const targetObj = heapObjects.get(targetObjId);
          if (targetObj && targetObj.fields[targetFieldName] !== undefined) {
            const f = targetObj.fields[targetFieldName];
            return {
              value: f.value,
              isRef: f.isRef,
              type: f.type,
            };
          }
        }
      }

      // Comparison expressions: >, <, >=, <=, ==, !=
      const compMatch = trimmed.match(/^([\s\S]+?)\s*(>=|<=|==|!=|>|<)\s*([\s\S]+)$/);
      if (compMatch) {
        const left = evaluateExpression(compMatch[1].trim(), currentFrame, thisInstance);
        const op = compMatch[2];
        const right = evaluateExpression(compMatch[3].trim(), currentFrame, thisInstance);

        const lVal = left.value;
        const rVal = right.value;

        let compBool = false;
        if (op === '==') compBool = lVal === rVal;
        else if (op === '!=') compBool = lVal !== rVal;
        else if (typeof lVal === 'number' && typeof rVal === 'number') {
          if (op === '>') compBool = lVal > rVal;
          else if (op === '<') compBool = lVal < rVal;
          else if (op === '>=') compBool = lVal >= rVal;
          else if (op === '<=') compBool = lVal <= rVal;
        }

        return { value: compBool, isRef: false, type: 'boolean' };
      }

      // Basic Binary Arithmetic: +, -, *, /, %
      const binOpMatch = trimmed.match(/^([\s\S]+?)\s*([+\-*/%])\s*([\s\S]+)$/);
      if (binOpMatch && !trimmed.startsWith('"') && !trimmed.endsWith('"')) {
        const leftExpr = binOpMatch[1].trim();
        const op = binOpMatch[2];
        const rightExpr = binOpMatch[3].trim();

        const leftRes = evaluateExpression(leftExpr, currentFrame, thisInstance);
        const rightRes = evaluateExpression(rightExpr, currentFrame, thisInstance);

        // String concatenation with length bounds
        if (op === '+' && (leftRes.type === 'String' || rightRes.type === 'String')) {
          const combined = `${leftRes.value ?? 'null'}${rightRes.value ?? 'null'}`;
          const safeStr = combined.length > MAX_STRING_LENGTH ? combined.slice(0, MAX_STRING_LENGTH) : combined;
          return {
            value: safeStr,
            isRef: false,
            type: 'String',
          };
        }

        const lNum = Number(leftRes.value);
        const rNum = Number(rightRes.value);

        if (!isNaN(lNum) && !isNaN(rNum)) {
          if ((op === '/' || op === '%') && rNum === 0) {
            throw new Error('ArithmeticException: / by zero');
          }
          let resVal: number;
          if (op === '+') resVal = lNum + rNum;
          else if (op === '-') resVal = lNum - rNum;
          else if (op === '*') resVal = lNum * rNum;
          else if (op === '/') resVal = lNum / rNum;
          else resVal = lNum % rNum;

          const isDec = !Number.isInteger(resVal) || leftRes.type === 'double' || rightRes.type === 'double';
          return {
            value: isDec ? parseFloat(resVal.toFixed(4)) : resVal,
            isRef: false,
            type: isDec ? 'double' : 'int',
          };
        }
      }

      // instanceof operator: obj instanceof ClassName
      const instOfMatch = trimmed.match(/^([A-Za-z0-9_]+)\s+instanceof\s+([A-Za-z0-9_]+)$/);
      if (instOfMatch) {
        const objName = instOfMatch[1];
        const checkClass = instOfMatch[2];
        const targetVal = evaluateExpression(objName, currentFrame, thisInstance);
        if (!targetVal.value) return { value: false, isRef: false, type: 'boolean' };
        const obj = heapObjects.get(String(targetVal.value));
        if (!obj) return { value: false, isRef: false, type: 'boolean' };
        const hierarchy = getClassHierarchy(obj.className);
        const isMatch = hierarchy.some((c) => c.name === checkClass || c.interfaces.includes(checkClass));
        return { value: isMatch, isRef: false, type: 'boolean' };
      }

      return { value: trimmed, isRef: false, type: 'String' };
    };

    // Helper to instantiate an object of a class with full inheritance
    const instantiateClass = (
      targetClassName: string,
      args: string[],
      currentFrame: StackFrameSnapshot,
      line: number,
      stmtFile?: string
    ): string => {
      // 1. Array Instantiation (e.g. int[], String[])
      if (targetClassName.endsWith('[]')) {
        this.objectCounter++;
        const arrayId = `ARR-${String(this.objectCounter).padStart(3, '0')}`;
        const elemType = targetClassName.slice(0, -2);
        const arrayFields: RuntimeObjectInstance['fields'] = {};

        let arrayLen = 0;
        if (args.length === 1 && !isNaN(Number(args[0])) && !args[0].includes('"')) {
          const sizeRes = evaluateExpression(args[0], currentFrame);
          const requestedLen = Math.max(0, Number(sizeRes.value) || 0);
          if (requestedLen > MAX_ARRAY_LENGTH) {
            runtimeHalted = true;
            captureSnapshot(
              'EXCEPTION_THROWN',
              line,
              '<init>',
              targetClassName,
              `OutOfMemoryError: Requested array dimension (${requestedLen}) exceeds maximum supported simulation length (${MAX_ARRAY_LENGTH}).`,
              {
                isException: true,
                exceptionDetail: {
                  className: 'java.lang.OutOfMemoryError',
                  message: `Requested array dimension (${requestedLen}) exceeds maximum simulation length (${MAX_ARRAY_LENGTH}).`,
                  line,
                },
              }
            );
            return arrayId;
          }
          arrayLen = requestedLen;
          for (let k = 0; k < arrayLen; k++) {
            arrayFields[`[${k}]`] = {
              type: elemType,
              value: ['int', 'long', 'short', 'byte'].includes(elemType) ? 0 : elemType === 'boolean' ? false : null,
              isRef: !['int', 'long', 'short', 'byte', 'double', 'float', 'boolean', 'char'].includes(elemType),
            };
          }
        } else {
          arrayLen = args.length;
          for (let k = 0; k < args.length; k++) {
            const evalRes = evaluateExpression(args[k], currentFrame);
            arrayFields[`[${k}]`] = {
              type: evalRes.type || elemType,
              value: evalRes.value,
              isRef: evalRes.isRef,
            };
          }
        }

        arrayFields['length'] = {
          type: 'int',
          value: arrayLen,
          isRef: false,
        };

        const arrInstance: RuntimeObjectInstance = {
          id: arrayId,
          className: targetClassName,
          fields: arrayFields,
          creationLine: line,
        };
        heapObjects.set(arrayId, arrInstance);

        captureSnapshot(
          'OBJECT_ALLOCATED',
          line,
          currentFrame.methodName,
          currentFrame.className,
          `Allocated array ${targetClassName} ${arrayId} of length ${arrayLen} in Heap.`,
          { file: stmtFile || defaultFileName, allocatedObjectId: arrayId }
        );
        return arrayId;
      }

      // 2. Collection Instantiations: ArrayList, HashMap, HashSet
      if (targetClassName === 'ArrayList' || targetClassName === 'List') {
        this.objectCounter++;
        const listId = `COL-${String(this.objectCounter).padStart(3, '0')}`;
        const listFields: RuntimeObjectInstance['fields'] = {
          size: { type: 'int', value: 0, isRef: false },
        };
        const listInstance: RuntimeObjectInstance = {
          id: listId,
          className: 'ArrayList',
          fields: listFields,
          creationLine: line,
        };
        heapObjects.set(listId, listInstance);
        captureSnapshot(
          'OBJECT_ALLOCATED',
          line,
          currentFrame.methodName,
          currentFrame.className,
          `Allocated ArrayList ${listId} in Heap (size: 0).`,
          { file: stmtFile || defaultFileName, allocatedObjectId: listId }
        );
        return listId;
      }

      if (targetClassName === 'HashMap' || targetClassName === 'Map') {
        this.objectCounter++;
        const mapId = `MAP-${String(this.objectCounter).padStart(3, '0')}`;
        const mapFields: RuntimeObjectInstance['fields'] = {
          size: { type: 'int', value: 0, isRef: false },
        };
        const mapInstance: RuntimeObjectInstance = {
          id: mapId,
          className: 'HashMap',
          fields: mapFields,
          creationLine: line,
        };
        heapObjects.set(mapId, mapInstance);
        captureSnapshot(
          'OBJECT_ALLOCATED',
          line,
          currentFrame.methodName,
          currentFrame.className,
          `Allocated HashMap ${mapId} in Heap.`,
          { file: stmtFile || defaultFileName, allocatedObjectId: mapId }
        );
        return mapId;
      }

      if (targetClassName === 'HashSet' || targetClassName === 'Set') {
        this.objectCounter++;
        const setId = `SET-${String(this.objectCounter).padStart(3, '0')}`;
        const setFields: RuntimeObjectInstance['fields'] = {
          size: { type: 'int', value: 0, isRef: false },
        };
        const setInstance: RuntimeObjectInstance = {
          id: setId,
          className: 'HashSet',
          fields: setFields,
          creationLine: line,
        };
        heapObjects.set(setId, setInstance);
        captureSnapshot(
          'OBJECT_ALLOCATED',
          line,
          currentFrame.methodName,
          currentFrame.className,
          `Allocated HashSet ${setId} in Heap.`,
          { file: stmtFile || defaultFileName, allocatedObjectId: setId }
        );
        return setId;
      }

      // 3. Standard Class Instantiation
      this.objectCounter++;
      const logicalObjId = `OBJ-${String(this.objectCounter).padStart(3, '0')}`;
      const targetClassDef = classTable.get(targetClassName);
      const clsFile = stmtFile || targetClassDef?.file || defaultFileName;

      // Initialize all inherited fields from hierarchy
      const allFields = getAllClassFields(targetClassName);
      const initialFields: RuntimeObjectInstance['fields'] = {};

      for (const f of allFields) {
        if (f.metadata.isStatic) continue; // Static fields are stored separately
        const isPrimitive = !!f.metadata.isPrimitive;
        let defVal: string | number | boolean | null = null;
        if (['int', 'short', 'byte', 'long'].includes(f.declaredType || '')) defVal = 0;
        else if (['double', 'float'].includes(f.declaredType || '')) defVal = 0.0;
        else if (f.declaredType === 'boolean') defVal = false;
        else if (f.declaredType === 'char') defVal = '\\u0000';

        initialFields[f.name] = {
          type: f.declaredType || 'Object',
          value: defVal,
          isRef: !isPrimitive,
        };
      }

      if (heapObjects.size >= MAX_HEAP_ALLOCATIONS) {
        runtimeHalted = true;
        captureSnapshot(
          'EXCEPTION_THROWN',
          line,
          '<init>',
          targetClassName,
          `OutOfMemoryError: Maximum simulated JVM heap allocation quota (${MAX_HEAP_ALLOCATIONS} objects) exceeded.`,
          {
            isException: true,
            exceptionDetail: {
              className: 'java.lang.OutOfMemoryError',
              message: `Maximum simulated JVM heap allocation quota (${MAX_HEAP_ALLOCATIONS} objects) exceeded.`,
              line,
            },
          }
        );
        return logicalObjId;
      }

      const instance: RuntimeObjectInstance = {
        id: logicalObjId,
        className: targetClassName,
        fields: initialFields,
        creationLine: line,
      };
      heapObjects.set(logicalObjId, instance);

      captureSnapshot(
        'OBJECT_ALLOCATED',
        line,
        currentFrame.methodName,
        currentFrame.className,
        `Allocated ${targetClassName} ${logicalObjId} in Heap with fields [${Object.keys(initialFields).join(', ')}].`,
        { file: clsFile, allocatedObjectId: logicalObjId }
      );

      // Multithreading registration: detect Thread subclass or Thread instantiation
      const hierarchy = getClassHierarchy(targetClassName);
      const isThreadType = targetClassName === 'Thread' || hierarchy.some((c) => c.name === 'Thread');
      if (isThreadType) {
        let threadName = `Thread-${threadCounter++}`;
        let runnableRefId: string | undefined = undefined;

        for (const arg of args) {
          const evalRes = evaluateExpression(arg, currentFrame);
          if (typeof evalRes.value === 'string' && !evalRes.isRef) {
            threadName = evalRes.value;
          } else if (evalRes.isRef && evalRes.value && heapObjects.has(String(evalRes.value))) {
            runnableRefId = String(evalRes.value);
          }
        }

        threadTable.set(logicalObjId, {
          threadId: logicalObjId,
          name: threadName,
          state: 'NEW',
          callStack: [],
          isCurrent: false,
        });

        threadTargetMap.set(logicalObjId, runnableRefId || logicalObjId);
      }

      // Superclass constructor chaining: if class extends superclass, run super constructor first
      if (targetClassDef?.superclass && targetClassDef.superclass !== 'Object') {
        const superDef = classTable.get(targetClassDef.superclass);
        if (superDef && superDef.constructors.length > 0) {
          const superCtor = superDef.constructors[0];
          const superCtorLine = superCtor.sourceLocation?.line || line;
          const superFrame: StackFrameSnapshot = {
            frameId: `frame-ctor-${superDef.name}-${logicalObjId}`,
            methodName: `${superDef.name}() [super]`,
            className: superDef.name,
            line: superCtorLine,
            file: superDef.file || clsFile,
            localVariables: [
              { name: 'this', type: targetClassName, value: logicalObjId, isReference: true, targetAddress: logicalObjId },
            ],
          };
          stackFrames.push(superFrame);
          captureSnapshot(
            'FRAME_PUSH',
            superCtorLine,
            superDef.name,
            superDef.name,
            `Chaining super constructor ${superDef.name}() for ${targetClassName}.`,
            { file: superDef.file || clsFile }
          );

          // Execute super constructor statements
          executeStatementBlock(
            program.statements.filter((s) => s.scopeId === superCtor.id),
            superFrame,
            instance,
            superDef.name,
            superDef.file || clsFile
          );

          stackFrames.pop();
          captureSnapshot(
            'FRAME_POP',
            superCtor.sourceLocation?.endLine || superCtorLine,
            superDef.name,
            superDef.name,
            `Returned from super constructor ${superDef.name}().`,
            { file: superDef.file || clsFile }
          );
        }
      }

      // Execute target constructor
      const ctorDef = targetClassDef?.constructors[0];
      const ctorLine = ctorDef?.sourceLocation?.line || line;
      const ctorParams = (ctorDef?.metadata.parameters as { name: string; type: string }[]) || [];

      // Evaluate constructor argument values from caller frame
      const evaluatedArgs = args.map((arg) => evaluateExpression(arg, currentFrame));

      // Build constructor stack frame
      const ctorLocalVars: LocalVariableSnapshot[] = [
        {
          name: 'this',
          type: targetClassName,
          value: logicalObjId,
          isReference: true,
          targetAddress: logicalObjId,
        },
      ];

      ctorParams.forEach((param, idx) => {
        const evalRes = evaluatedArgs[idx] || { value: null, isRef: false, type: param.type };
        ctorLocalVars.push({
          name: param.name,
          type: param.type,
          value: evalRes.value,
          isReference: evalRes.isRef || !['int', 'long', 'double', 'float', 'boolean'].includes(param.type),
          targetAddress: evalRes.isRef && evalRes.value ? String(evalRes.value) : undefined,
        });
      });

      const ctorFrame: StackFrameSnapshot = {
        frameId: `frame-ctor-${logicalObjId}`,
        methodName: `${targetClassName}(...)`,
        className: targetClassName,
        line: ctorLine,
        file: clsFile,
        localVariables: ctorLocalVars,
      };
      stackFrames.push(ctorFrame);

      captureSnapshot(
        'FRAME_PUSH',
        ctorLine,
        `${targetClassName}`,
        targetClassName,
        `Entering constructor ${targetClassName}(${ctorParams.map((p) => p.name).join(', ')}).`,
        { file: clsFile }
      );

      // Execute statements in constructor
      const ctorStmts = ctorDef
        ? program.statements
            .filter((s) => s.scopeId === ctorDef.id)
            .sort((a, b) => a.line - b.line)
        : [];

      executeStatementBlock(ctorStmts, ctorFrame, instance, targetClassName, clsFile);

      // Pop constructor frame
      stackFrames.pop();
      captureSnapshot(
        'FRAME_POP',
        ctorDef?.sourceLocation?.endLine || ctorLine,
        `${targetClassName}`,
        targetClassName,
        `Completed constructor ${targetClassName}(). Returned reference ${logicalObjId}.`,
        { file: clsFile }
      );

      return logicalObjId;
    };

    // Helper to execute a sequence of statements inside a frame context
    const executeStatementBlock = (
      stmts: AstStatement[],
      frame: StackFrameSnapshot,
      thisInstance: RuntimeObjectInstance | undefined,
      currentClassName: string,
      currentFile: string,
      isTryBlock = false
    ): EvaluationResult | null => {
      let returnedValue: EvaluationResult | null = null;
      let loopSafetyCount = 0;

      // Filter out redundant mutation/invocation statements on lines where declaration or allocation exists
      const declAllocLines = new Set<number>();
      for (const s of stmts) {
        if (s.kind === 'declaration' || s.kind === 'allocation') {
          declAllocLines.add(s.line);
        }
      }
      const filteredStmts = stmts.filter((s) => {
        if ((s.kind === 'invocation' || s.kind === 'mutation') && declAllocLines.has(s.line)) {
          return false;
        }
        return true;
      });

      for (let i = 0; i < filteredStmts.length; i++) {
        if (runtimeHalted || returnedValue) break;
        const stmt = filteredStmts[i];
        frame.line = stmt.line;

        try {
          if (stmt.kind === 'declaration') {
            const varName = stmt.variableName || '';
            const varType = stmt.variableType || 'int';
            const initRes = stmt.valueExpression
              ? evaluateExpression(stmt.valueExpression, frame, thisInstance)
              : { value: ['int', 'long', 'short', 'byte'].includes(varType) ? 0 : false, isRef: false, type: varType };

            frame.localVariables.push({
              name: varName,
              type: varType,
              value: initRes.value,
              isReference: initRes.isRef,
              targetAddress: initRes.isRef && initRes.value ? String(initRes.value) : undefined,
            });

            captureSnapshot(
              'STEP_ENTER',
              stmt.line,
              frame.methodName,
              currentClassName,
              `Declared local variable ${varType} ${varName} = ${JSON.stringify(initRes.value)}`,
              { file: stmt.file || currentFile }
            );
          } else if (stmt.kind === 'return') {
            const retRes = stmt.valueExpression
              ? evaluateExpression(stmt.valueExpression, frame, thisInstance)
              : { value: null, isRef: false, type: 'void' };
            returnedValue = retRes;

            captureSnapshot(
              'STEP_ENTER',
              stmt.line,
              frame.methodName,
              currentClassName,
              `Return statement executed. Returning value: ${JSON.stringify(retRes.value)}`,
              { file: stmt.file || currentFile }
            );
            break;
          } else if (stmt.kind === 'loop') {
            const loopStartLine = stmt.line;
            const loopEndLine = this.findBlockEndLine(program.sourceCode, loopStartLine);

            const bodyStmts = program.statements
              .filter((s) => (s.file === currentFile || !s.file) && s.line > loopStartLine && s.line <= loopEndLine)
              .sort((a, b) => a.line - b.line);

            // Enhanced-for / For-each loop over Arrays or Collections
            if (stmt.loopType === 'for-each') {
              const collName = stmt.forEachCollection || '';
              const itemVar = stmt.forEachItemVar || 'item';
              const itemType = stmt.forEachItemType || 'Object';
              const collRes = evaluateExpression(collName, frame, thisInstance);

              const itemsToIterate: { value: any; isRef: boolean; type: string }[] = [];
              if (collRes.isRef && collRes.value) {
                const collObj = heapObjects.get(String(collRes.value));
                if (collObj) {
                  if (collObj.className.endsWith('[]')) {
                    const len = Number(collObj.fields['length']?.value || 0);
                    for (let k = 0; k < len; k++) {
                      const f = collObj.fields[`[${k}]`];
                      if (f) itemsToIterate.push({ value: f.value, isRef: f.isRef, type: f.type });
                    }
                  } else if (collObj.className.includes('List')) {
                    const size = Number(collObj.fields['size']?.value || 0);
                    for (let k = 0; k < size; k++) {
                      const f = collObj.fields[`[${k}]`];
                      if (f) itemsToIterate.push({ value: f.value, isRef: f.isRef, type: f.type });
                    }
                  }
                }
              }

              let forEachIter = 0;
              for (const item of itemsToIterate) {
                forEachIter++;
                const existingVar = frame.localVariables.find((v) => v.name === itemVar);
                if (existingVar) {
                  existingVar.value = item.value;
                  existingVar.isReference = item.isRef;
                  existingVar.targetAddress = item.isRef && item.value ? String(item.value) : undefined;
                } else {
                  frame.localVariables.push({
                    name: itemVar,
                    type: itemType,
                    value: item.value,
                    isReference: item.isRef,
                    targetAddress: item.isRef && item.value ? String(item.value) : undefined,
                  });
                }

                captureSnapshot(
                  'LOOP_ITERATION',
                  stmt.line,
                  frame.methodName,
                  currentClassName,
                  `For-each iteration ${forEachIter}: ${itemVar} = ${JSON.stringify(item.value)}`,
                  { file: stmt.file || currentFile }
                );

                const bRet = executeStatementBlock(bodyStmts, frame, thisInstance, currentClassName, currentFile);
                if (bRet) {
                  returnedValue = bRet;
                  break;
                }
              }

              while (i + 1 < filteredStmts.length && filteredStmts[i + 1].line <= loopEndLine) {
                i++;
              }
              continue;
            }

            // Real Loop Execution Engine for while/for
            // 1. Loop Init (if for-loop)
            if (stmt.loopInit) {
              const initParts = stmt.loopInit.trim();
              const varMatch = initParts.match(/([A-Za-z0-9_]+)\s+([A-Za-z0-9_]+)\s*=\s*(.*)/);
              if (varMatch) {
                const initVal = evaluateExpression(varMatch[3], frame, thisInstance);
                frame.localVariables.push({
                  name: varMatch[2],
                  type: varMatch[1],
                  value: initVal.value,
                  isReference: false,
                });
              } else {
                const assignMatch = initParts.match(/([A-Za-z0-9_]+)\s*=\s*(.*)/);
                if (assignMatch) {
                  const assignVal = evaluateExpression(assignMatch[2], frame, thisInstance);
                  const lv = frame.localVariables.find((v) => v.name === assignMatch[1]);
                  if (lv) lv.value = assignVal.value;
                }
              }
            }

            // 2. Iterate condition while true
            let iteration = 0;
            const maxIterations = 1000; // Safety cap

            while (iteration < maxIterations) {
              loopSafetyCount++;
              if (loopSafetyCount > 10000) break; // Global safety cap

              const condRes = evaluateExpression(stmt.condition || 'true', frame, thisInstance);
              if (!condRes.value) {
                captureSnapshot(
                  'LOOP_ITERATION',
                  stmt.line,
                  frame.methodName,
                  currentClassName,
                  `Loop terminated: condition (${stmt.condition}) evaluated to false.`,
                  { file: stmt.file || currentFile }
                );
                break;
              }

              iteration++;
              captureSnapshot(
                'LOOP_ITERATION',
                stmt.line,
                frame.methodName,
                currentClassName,
                `Loop iteration ${iteration}: condition (${stmt.condition}) holds true.`,
                { file: stmt.file || currentFile }
              );

              // Execute body statements
              const bodyRet = executeStatementBlock(bodyStmts, frame, thisInstance, currentClassName, currentFile);
              if (bodyRet) {
                returnedValue = bodyRet;
                break;
              }

              // 3. Loop Update (if for-loop, e.g. i++ or i += 1)
              if (stmt.loopUpdate) {
                const up = stmt.loopUpdate.trim();
                const incMatch = up.match(/([A-Za-z0-9_]+)\+\+/);
                const decMatch = up.match(/([A-Za-z0-9_]+)--/);
                const plusAssignMatch = up.match(/([A-Za-z0-9_]+)\s*\+=\s*(.*)/);

                if (incMatch) {
                  const targetVar = frame.localVariables.find((v) => v.name === incMatch[1]);
                  if (targetVar && typeof targetVar.value === 'number') targetVar.value++;
                } else if (decMatch) {
                  const targetVar = frame.localVariables.find((v) => v.name === decMatch[1]);
                  if (targetVar && typeof targetVar.value === 'number') targetVar.value--;
                } else if (plusAssignMatch) {
                  const targetVar = frame.localVariables.find((v) => v.name === plusAssignMatch[1]);
                  const addVal = evaluateExpression(plusAssignMatch[2], frame, thisInstance);
                  if (targetVar && typeof targetVar.value === 'number') targetVar.value += Number(addVal.value);
                }
              }
            }

            // Skip past statements that were inside the loop body to avoid re-executing sequentially
            while (i + 1 < filteredStmts.length && filteredStmts[i + 1].line <= loopEndLine) {
              i++;
            }
          } else if (stmt.kind === 'try') {
            const tryStartLine = stmt.line;
            const tryEndLine = this.findBlockEndLine(program.sourceCode, tryStartLine);

            const catchStmt = program.statements.find(
              (s) => (s.file === currentFile || !s.file) && s.kind === 'catch' && s.line >= tryEndLine && s.line <= tryEndLine + 2
            );
            const catchEndLine = catchStmt ? this.findBlockEndLine(program.sourceCode, catchStmt.line) : tryEndLine;

            const finallyStmt = program.statements.find(
              (s) => (s.file === currentFile || !s.file) && s.kind === 'finally' && s.line >= catchEndLine && s.line <= catchEndLine + 2
            );
            const finallyEndLine = finallyStmt ? this.findBlockEndLine(program.sourceCode, finallyStmt.line) : catchEndLine;

            const tryStmts = program.statements
              .filter((s) => (s.file === currentFile || !s.file) && s.line > tryStartLine && s.line <= tryEndLine)
              .sort((a, b) => a.line - b.line);

            captureSnapshot(
              'STEP_ENTER',
              stmt.line,
              frame.methodName,
              currentClassName,
              `Entering try block.`,
              { file: stmt.file || currentFile }
            );

            let caughtException: Error | null = null;
            try {
              const tryRet = executeStatementBlock(tryStmts, frame, thisInstance, currentClassName, currentFile, true);
              if (tryRet) returnedValue = tryRet;
            } catch (err) {
              caughtException = err instanceof Error ? err : new Error(String(err));
            }

            if (caughtException && catchStmt) {
              runtimeHalted = false;
              const excVarName = catchStmt.catchExceptionVar || 'e';
              const excType = catchStmt.catchExceptionType || 'Exception';

              frame.localVariables.push({
                name: excVarName,
                type: excType,
                value: caughtException.message,
                isReference: true,
              });

              captureSnapshot(
                'EXCEPTION_CAUGHT',
                catchStmt.line,
                frame.methodName,
                currentClassName,
                `Caught ${excType}: ${caughtException.message}`,
                { file: catchStmt.file || currentFile }
              );

              const catchStmts = program.statements
                .filter((s) => (s.file === currentFile || !s.file) && s.line > catchStmt.line && s.line <= catchEndLine)
                .sort((a, b) => a.line - b.line);

              const catchRet = executeStatementBlock(catchStmts, frame, thisInstance, currentClassName, currentFile);
              if (catchRet) returnedValue = catchRet;
            }

            if (finallyStmt) {
              captureSnapshot(
                'STEP_ENTER',
                finallyStmt.line,
                frame.methodName,
                currentClassName,
                `Executing finally block.`,
                { file: finallyStmt.file || currentFile }
              );

              const finallyStmts = program.statements
                .filter((s) => (s.file === currentFile || !s.file) && s.line > finallyStmt.line && s.line <= finallyEndLine)
                .sort((a, b) => a.line - b.line);

              const finRet = executeStatementBlock(finallyStmts, frame, thisInstance, currentClassName, currentFile);
              if (finRet) returnedValue = finRet;
            }

            while (i + 1 < filteredStmts.length && filteredStmts[i + 1].line <= finallyEndLine) {
              i++;
            }
          } else if (stmt.kind === 'switch') {
            const switchStartLine = stmt.line;
            const switchEndLine = this.findBlockEndLine(program.sourceCode, switchStartLine);
            const switchEval = evaluateExpression(stmt.switchExpression || '', frame, thisInstance);

            captureSnapshot(
              'BRANCH_TAKEN',
              stmt.line,
              frame.methodName,
              currentClassName,
              `Evaluating switch (${stmt.switchExpression} = ${JSON.stringify(switchEval.value)}).`,
              { file: stmt.file || currentFile }
            );

            const switchStmts = program.statements
              .filter((s) => (s.file === currentFile || !s.file) && s.line > switchStartLine && s.line <= switchEndLine)
              .sort((a, b) => a.line - b.line);

            executeStatementBlock(switchStmts, frame, thisInstance, currentClassName, currentFile);

            while (i + 1 < filteredStmts.length && filteredStmts[i + 1].line <= switchEndLine) {
              i++;
            }
          } else if (stmt.kind === 'break') {
            captureSnapshot(
              'STEP_ENTER',
              stmt.line,
              frame.methodName,
              currentClassName,
              `Break statement executed.`,
              { file: stmt.file || currentFile }
            );
            break;
          } else if (stmt.kind === 'branch') {
            const condRes = evaluateExpression(stmt.condition || 'true', frame, thisInstance);
            captureSnapshot(
              'BRANCH_TAKEN',
              stmt.line,
              frame.methodName,
              currentClassName,
              `Branch condition (${stmt.condition}) evaluated to ${condRes.value}.`,
              { file: stmt.file || currentFile }
            );
          } else if (stmt.kind === 'exception') {
            runtimeHalted = true;
            captureSnapshot(
              'EXCEPTION_THROWN',
              stmt.line,
              frame.methodName,
              currentClassName,
              `Exception thrown: ${stmt.rawText}`,
              {
                file: stmt.file || currentFile,
                isException: true,
                exceptionDetail: {
                  className: 'Exception',
                  message: stmt.rawText,
                  line: stmt.line,
                  file: stmt.file || currentFile,
                },
              }
            );
            break;
          } else if (stmt.kind === 'allocation' && stmt.targetClass) {
            const objId = instantiateClass(stmt.targetClass, stmt.arguments || [], frame, stmt.line, stmt.file);
            if (stmt.variableName) {
              frame.localVariables.push({
                name: stmt.variableName,
                type: stmt.targetClass,
                value: objId,
                isReference: true,
                targetAddress: objId,
              });
              captureSnapshot(
                'STEP_ENTER',
                stmt.line,
                frame.methodName,
                currentClassName,
                `Assigned ${stmt.variableName} = ref ${objId} (${stmt.targetClass}).`,
                { file: stmt.file || currentFile }
              );
            }
          } else if (stmt.kind === 'synchronized') {
            const syncStartLine = stmt.line;
            const syncEndLine = this.findBlockEndLine(program.sourceCode, syncStartLine);
            const lockExpr = stmt.syncLockExpression || 'this';
            const lockRes = evaluateExpression(lockExpr, frame, thisInstance);
            const lockAddress = lockRes.isRef && lockRes.value ? String(lockRes.value) : (thisInstance ? thisInstance.id : `@lock-${stmt.line}`);

            const curThread = threadTable.get(activeThreadId);
            // Check for lock contention
            const lockHolder = Array.from(threadTable.values()).find(
              (t) => t.lockAcquired === lockAddress && t.threadId !== activeThreadId
            );
            if (lockHolder && curThread) {
              curThread.state = 'BLOCKED';
              curThread.lockWaitingOn = lockAddress;
              captureSnapshot(
                'STEP_ENTER',
                stmt.line,
                frame.methodName,
                currentClassName,
                `Thread "${curThread.name}" BLOCKED waiting for monitor lock on ${lockAddress} held by "${lockHolder.name}".`,
                { file: stmt.file || currentFile }
              );
            }

            if (curThread) {
              curThread.state = 'RUNNABLE';
              curThread.lockAcquired = lockAddress;
              curThread.lockWaitingOn = undefined;
            }

            captureSnapshot(
              'LOCK_ACQUIRED',
              stmt.line,
              frame.methodName,
              currentClassName,
              `Thread "${curThread?.name || activeThreadId}" acquired monitor lock on ${lockAddress}.`,
              { file: stmt.file || currentFile }
            );

            const syncStmts = program.statements
              .filter((s) => (s.file === currentFile || !s.file) && s.line > syncStartLine && s.line <= syncEndLine)
              .sort((a, b) => a.line - b.line);

            const syncRet = executeStatementBlock(syncStmts, frame, thisInstance, currentClassName, currentFile);
            if (syncRet) returnedValue = syncRet;

            if (curThread) {
              curThread.lockAcquired = undefined;
            }

            captureSnapshot(
              'LOCK_RELEASED',
              syncEndLine,
              frame.methodName,
              currentClassName,
              `Thread "${curThread?.name || activeThreadId}" released monitor lock on ${lockAddress}.`,
              { file: stmt.file || currentFile }
            );

            while (i + 1 < filteredStmts.length && filteredStmts[i + 1].line <= syncEndLine) {
              i++;
            }
          } else if (stmt.kind === 'invocation') {
            const objName = stmt.variableName;
            const methName = stmt.methodName || '';
            const args = stmt.arguments || [];

            // Case 1: Thread.sleep(ms)
            if ((objName === 'Thread' || stmt.targetExpression?.includes('Thread.sleep')) && methName === 'sleep') {
              const sleepArg = args[0] ? evaluateExpression(args[0], frame, thisInstance).value : 100;
              const curThread = threadTable.get(activeThreadId);
              if (curThread) curThread.state = 'TIMED_WAITING';

              captureSnapshot(
                'STEP_ENTER',
                stmt.line,
                frame.methodName,
                currentClassName,
                `Thread "${curThread?.name || 'main'}" entered TIMED_WAITING state for ${sleepArg}ms.`,
                { file: stmt.file || currentFile }
              );

              if (curThread) curThread.state = 'RUNNABLE';
              continue;
            }

            // Case 2: Worker Thread .start()
            if (methName === 'start' && objName) {
              const refVal = evaluateExpression(objName, frame, thisInstance);
              const threadObjId = refVal.value ? String(refVal.value) : undefined;
              const targetThread = threadObjId ? threadTable.get(threadObjId) : undefined;

              if (targetThread) {
                targetThread.state = 'RUNNABLE';
                captureSnapshot(
                  'THREAD_START',
                  stmt.line,
                  'start',
                  'Thread',
                  `Thread "${targetThread.name}" started (NEW → RUNNABLE).`,
                  { file: stmt.file || currentFile }
                );

                // Context switch to worker thread execution
                const prevActiveId = activeThreadId;
                const prevStack = [...stackFrames];
                activeThreadId = targetThread.threadId;
                stackFrames.length = 0;

                const targetWorkerObjId = threadTargetMap.get(targetThread.threadId) || targetThread.threadId;
                const targetWorkerObj = heapObjects.get(targetWorkerObjId);

                if (targetWorkerObj) {
                  const targetWorkerClass = targetWorkerObj.className;
                  const dummyCallerFrame: StackFrameSnapshot = {
                    frameId: `frame-worker-root-${targetThread.threadId}`,
                    methodName: 'run()',
                    className: targetWorkerClass,
                    line: stmt.line,
                    localVariables: [],
                  };
                  executeMethodCall(targetWorkerObj.id, targetWorkerClass, 'run', [], dummyCallerFrame, stmt.line, stmt.file);
                }

                targetThread.state = 'TERMINATED';
                captureSnapshot(
                  'THREAD_TERMINATED',
                  stmt.line,
                  'run',
                  'Thread',
                  `Thread "${targetThread.name}" completed execution (RUNNABLE → TERMINATED).`,
                  { file: stmt.file || currentFile }
                );

                // Restore previous active thread context
                activeThreadId = prevActiveId;
                stackFrames.length = 0;
                stackFrames.push(...prevStack);
                continue;
              }
            }

            // Case 3: Worker Thread .join()
            if (methName === 'join' && objName) {
              const refVal = evaluateExpression(objName, frame, thisInstance);
              const threadObjId = refVal.value ? String(refVal.value) : undefined;
              const targetThread = threadObjId ? threadTable.get(threadObjId) : undefined;

              if (targetThread) {
                const curThread = threadTable.get(activeThreadId);
                if (curThread) {
                  curThread.state = 'WAITING';
                  curThread.lockWaitingOn = targetThread.name;
                }
                captureSnapshot(
                  'STEP_ENTER',
                  stmt.line,
                  frame.methodName,
                  currentClassName,
                  `Thread "${curThread?.name || 'main'}" WAITING for thread "${targetThread.name}" to terminate via join().`,
                  { file: stmt.file || currentFile }
                );
                if (curThread) {
                  curThread.state = 'RUNNABLE';
                  curThread.lockWaitingOn = undefined;
                }
                continue;
              }
            }

            // Standard method dispatch
            if (objName) {
              const refVal = evaluateExpression(objName, frame, thisInstance);
              if (refVal.value === null) {
                throw new Error(`NullPointerException: Cannot invoke "${methName}()" because "${objName}" is null`);
              }
              const targetObj = heapObjects.get(String(refVal.value));
              if (targetObj) {
                executeMethodCall(targetObj.id, targetObj.className, methName, args, frame, stmt.line, stmt.file);
              }
            } else {
              executeMethodCall(thisInstance?.id || null, currentClassName, methName, args, frame, stmt.line, stmt.file);
            }
          } else if (stmt.kind === 'mutation') {
            const targetExpr = stmt.targetExpression || '';
            const operator = stmt.operator || '=';
            const evalRes = evaluateExpression(stmt.valueExpression || '', frame, thisInstance);

            // Case 0: Array element mutation (e.g. arr[i] = val or arr[0] += 5)
            const arrMutMatch = targetExpr.match(/^([A-Za-z0-9_]+)\[([\s\S]+)\]$/);
            if (arrMutMatch) {
              const arrVar = arrMutMatch[1];
              const idxExpr = arrMutMatch[2];
              const arrRef = evaluateExpression(arrVar, frame, thisInstance);
              const idxRes = evaluateExpression(idxExpr, frame, thisInstance);
              const idx = Number(idxRes.value);

              if (arrRef.isRef && arrRef.value) {
                const arrObj = heapObjects.get(String(arrRef.value));
                if (arrObj) {
                  const prev = arrObj.fields[`[${idx}]`]?.value;
                  let nextVal: any = evalRes.value;
                  if (operator === '+=' && typeof prev === 'number' && typeof nextVal === 'number') nextVal = prev + nextVal;
                  else if (operator === '-=' && typeof prev === 'number' && typeof nextVal === 'number') nextVal = prev - nextVal;

                  arrObj.fields[`[${idx}]`] = {
                    type: evalRes.type,
                    value: nextVal,
                    isRef: evalRes.isRef,
                  };

                  captureSnapshot(
                    'FIELD_MUTATED',
                    stmt.line,
                    frame.methodName,
                    currentClassName,
                    `Updated array element ${arrObj.id}[${idx}]: ${prev} → ${nextVal}`,
                    {
                      file: stmt.file || currentFile,
                      mutatedField: {
                        objectAddress: arrObj.id,
                        fieldName: `[${idx}]`,
                        previousValue: prev,
                        newValue: nextVal,
                      },
                    }
                  );
                }
              }
            } else if (targetExpr.includes('.')) {
              const parts = targetExpr.split('.');
              const varPart = parts[0];
              const fieldPart = parts[1];

              let destObj: RuntimeObjectInstance | undefined = thisInstance;
              if (varPart !== 'this') {
                const refVar = frame.localVariables.find((v) => v.name === varPart);
                if (refVar && refVar.value) {
                  destObj = heapObjects.get(String(refVar.value));
                }
              }

              if (destObj && destObj.fields[fieldPart] !== undefined) {
                const prev = destObj.fields[fieldPart].value;
                let nextVal: string | number | boolean | null = evalRes.value;

                if (operator === '+=' && typeof prev === 'number' && typeof evalRes.value === 'number') {
                  nextVal = prev + evalRes.value;
                } else if (operator === '-=' && typeof prev === 'number' && typeof evalRes.value === 'number') {
                  nextVal = prev - evalRes.value;
                }

                destObj.fields[fieldPart].value = nextVal;
                destObj.fields[fieldPart].isRef = evalRes.isRef;

                captureSnapshot(
                  'FIELD_MUTATED',
                  stmt.line,
                  frame.methodName,
                  currentClassName,
                  `Updated ${destObj.id}.${fieldPart}: ${prev} → ${nextVal}`,
                  {
                    file: stmt.file || currentFile,
                    mutatedField: {
                      objectAddress: destObj.id,
                      fieldName: fieldPart,
                      previousValue: prev,
                      newValue: nextVal,
                    },
                  }
                );
              }
            } else if (thisInstance && thisInstance.fields[targetExpr] !== undefined) {
              // Direct this-field mutation
              const prev = thisInstance.fields[targetExpr].value;
              let nextVal: string | number | boolean | null = evalRes.value;

              if (operator === '+=' && typeof prev === 'number' && typeof evalRes.value === 'number') {
                nextVal = prev + evalRes.value;
              } else if (operator === '-=' && typeof prev === 'number' && typeof evalRes.value === 'number') {
                nextVal = prev - evalRes.value;
              }

              thisInstance.fields[targetExpr].value = nextVal;
              thisInstance.fields[targetExpr].isRef = evalRes.isRef;

              captureSnapshot(
                'FIELD_MUTATED',
                stmt.line,
                frame.methodName,
                currentClassName,
                `Updated ${thisInstance.id}.${targetExpr}: ${prev} → ${nextVal}`,
                {
                  file: stmt.file || currentFile,
                  mutatedField: {
                    objectAddress: thisInstance.id,
                    fieldName: targetExpr,
                    previousValue: prev,
                    newValue: nextVal,
                  },
                }
              );
            } else {
              // Local variable mutation in current frame (e.g. sum += i; or count = count + 1;)
              const lv = frame.localVariables.find((v) => v.name === targetExpr);
              if (lv) {
                const prev = lv.value;
                let nextVal: any = evalRes.value;

                if (operator === '+=' && typeof prev === 'number' && typeof evalRes.value === 'number') {
                  nextVal = prev + evalRes.value;
                } else if (operator === '-=' && typeof prev === 'number' && typeof evalRes.value === 'number') {
                  nextVal = prev - evalRes.value;
                }

                lv.value = nextVal;
                lv.isReference = evalRes.isRef;
                lv.targetAddress = evalRes.isRef && evalRes.value ? String(evalRes.value) : undefined;

                captureSnapshot(
                  'STEP_ENTER',
                  stmt.line,
                  frame.methodName,
                  currentClassName,
                  `Updated local variable ${targetExpr}: ${prev} → ${nextVal}`,
                  { file: stmt.file || currentFile }
                );
              }
            }
          } else if (stmt.kind === 'print') {
            const printExpr = stmt.valueExpression || (stmt.arguments && stmt.arguments[0]) || '';
            const evalRes = evaluateExpression(printExpr, frame, thisInstance);
            const outStr = String(evalRes.value);
            if (stdoutBuffer.length < MAX_STDOUT_BYTES) {
              stdoutBuffer += `${outStr}\n`;
            }

            captureSnapshot(
              'STDOUT',
              stmt.line,
              frame.methodName,
              currentClassName,
              `Output: ${outStr}`,
              { file: stmt.file || currentFile, stdoutDelta: `${outStr}\n` }
            );
          }
        } catch (err: unknown) {
          if (isTryBlock) {
            throw err;
          }
          runtimeHalted = true;
          const msg = err instanceof Error ? err.message : String(err);
          const excType = msg.includes('ArithmeticException')
            ? 'ArithmeticException'
            : msg.includes('NullPointerException')
            ? 'NullPointerException'
            : 'RuntimeException';

          captureSnapshot(
            'EXCEPTION_THROWN',
            stmt.line,
            frame.methodName,
            currentClassName,
            `Runtime Exception: ${msg}`,
            {
              file: stmt.file || currentFile,
              isException: true,
              exceptionDetail: {
                className: excType,
                message: msg,
                line: stmt.line,
                file: stmt.file || currentFile,
              },
            }
          );
          break;
        }
      }

      return returnedValue;
    };

    // Helper to execute a method call with polymorphic dynamic dispatch and return values
    const executeMethodCall = (
      targetObjId: string | null,
      targetClassName: string,
      methodName: string,
      args: string[],
      callerFrame: StackFrameSnapshot,
      callLine: number,
      callFile?: string
    ): EvaluationResult | null => {
      const targetObj = targetObjId ? heapObjects.get(targetObjId) : undefined;

      // Handle Built-in Collections (ArrayList, HashMap, HashSet)
      if (targetObj) {
        if (targetObj.className === 'ArrayList' || targetObj.className === 'List') {
          if (methodName === 'add') {
            const itemRes = evaluateExpression(args[0], callerFrame, targetObj);
            const curSize = Number(targetObj.fields['size']?.value || 0);
            targetObj.fields[`[${curSize}]`] = { type: itemRes.type, value: itemRes.value, isRef: itemRes.isRef };
            targetObj.fields['size'] = { type: 'int', value: curSize + 1, isRef: false };
            captureSnapshot(
              'FIELD_MUTATED',
              callLine,
              callerFrame.methodName,
              callerFrame.className,
              `ArrayList.add(${JSON.stringify(itemRes.value)}): size is now ${curSize + 1}`,
              {
                file: callFile || defaultFileName,
                mutatedField: {
                  objectAddress: targetObj.id,
                  fieldName: `[${curSize}]`,
                  previousValue: null,
                  newValue: itemRes.value,
                },
              }
            );
            return { value: true, isRef: false, type: 'boolean' };
          }
          if (methodName === 'get') {
            const idxRes = evaluateExpression(args[0], callerFrame, targetObj);
            const idx = Number(idxRes.value);
            const elem = targetObj.fields[`[${idx}]`];
            return elem ? { value: elem.value, isRef: elem.isRef, type: elem.type } : { value: null, isRef: false, type: 'null' };
          }
          if (methodName === 'size') {
            return { value: Number(targetObj.fields['size']?.value || 0), isRef: false, type: 'int' };
          }
          if (methodName === 'isEmpty') {
            return { value: Number(targetObj.fields['size']?.value || 0) === 0, isRef: false, type: 'boolean' };
          }
        }

        if (targetObj.className === 'HashMap' || targetObj.className === 'Map') {
          if (methodName === 'put') {
            const kRes = evaluateExpression(args[0], callerFrame, targetObj);
            const vRes = evaluateExpression(args[1], callerFrame, targetObj);
            const kStr = String(kRes.value);
            const isNew = targetObj.fields[kStr] === undefined;
            targetObj.fields[kStr] = { type: vRes.type, value: vRes.value, isRef: vRes.isRef };
            if (isNew) {
              const curSize = Number(targetObj.fields['size']?.value || 0);
              targetObj.fields['size'] = { type: 'int', value: curSize + 1, isRef: false };
            }
            captureSnapshot(
              'FIELD_MUTATED',
              callLine,
              callerFrame.methodName,
              callerFrame.className,
              `HashMap.put(${kStr}, ${JSON.stringify(vRes.value)})`,
              {
                file: callFile || defaultFileName,
                mutatedField: {
                  objectAddress: targetObj.id,
                  fieldName: kStr,
                  previousValue: null,
                  newValue: vRes.value,
                },
              }
            );
            return vRes;
          }
          if (methodName === 'get') {
            const kRes = evaluateExpression(args[0], callerFrame, targetObj);
            const elem = targetObj.fields[String(kRes.value)];
            return elem ? { value: elem.value, isRef: elem.isRef, type: elem.type } : { value: null, isRef: true, type: 'null' };
          }
          if (methodName === 'containsKey') {
            const kRes = evaluateExpression(args[0], callerFrame, targetObj);
            return { value: targetObj.fields[String(kRes.value)] !== undefined, isRef: false, type: 'boolean' };
          }
          if (methodName === 'size') {
            return { value: Number(targetObj.fields['size']?.value || 0), isRef: false, type: 'int' };
          }
        }
      }

      // Polymorphic dynamic dispatch: resolve method starting from runtime class
      const resolved = resolveMethod(targetClassName, methodName);

      const methodDef = resolved?.method;
      if (!methodDef) {
        return null; // Method does not exist on this class hierarchy
      }

      const ownerClass = resolved?.ownerClass;
      const methFile = methodDef?.sourceLocation?.file || ownerClass?.file || callFile || defaultFileName;
      const methodLine = methodDef?.sourceLocation?.line || callLine;
      const methodParams = (methodDef?.metadata.parameters as { name: string; type: string }[]) || [];

      // Evaluate arguments in caller frame
      const evaluatedArgs = args.map((a) => evaluateExpression(a, callerFrame, targetObj));

      // Build method stack frame
      const methodLocalVars: LocalVariableSnapshot[] = [];
      if (targetObjId) {
        methodLocalVars.push({
          name: 'this',
          type: targetClassName,
          value: targetObjId,
          isReference: true,
          targetAddress: targetObjId,
        });
      }

      methodParams.forEach((param, idx) => {
        const evalRes = evaluatedArgs[idx] || { value: null, isRef: false, type: param.type };
        methodLocalVars.push({
          name: param.name,
          type: param.type,
          value: evalRes.value,
          isReference: evalRes.isRef || !['int', 'long', 'double', 'float', 'boolean'].includes(param.type),
          targetAddress: evalRes.isRef && evalRes.value ? String(evalRes.value) : undefined,
        });
      });

      const methodFrame: StackFrameSnapshot = {
        frameId: `frame-${methodName}-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        methodName: `${methodName}(${args.join(', ')})`,
        className: ownerClass?.name || targetClassName,
        line: methodLine,
        file: methFile,
        localVariables: methodLocalVars,
      };
      if (stackFrames.length >= MAX_CALL_STACK_DEPTH) {
        runtimeHalted = true;
        captureSnapshot(
          'EXCEPTION_THROWN',
          methodLine,
          methodName,
          targetClassName,
          `StackOverflowError: Maximum simulated call stack depth (${MAX_CALL_STACK_DEPTH}) exceeded.`,
          {
            isException: true,
            exceptionDetail: {
              className: 'java.lang.StackOverflowError',
              message: `Maximum simulated call stack depth (${MAX_CALL_STACK_DEPTH}) exceeded.`,
              line: methodLine,
              file: methFile,
            },
          }
        );
        return { value: null, isRef: false, type: 'void' };
      }

      stackFrames.push(methodFrame);

      captureSnapshot(
        'FRAME_PUSH',
        methodLine,
        methodName,
        targetClassName,
        `Dispatched ${targetClassName}.${methodName}(${args.join(', ')})${ownerClass && ownerClass.name !== targetClassName ? ` [inherited from ${ownerClass.name}]` : ''}`,
        { file: methFile }
      );

      // Execute statements inside method
      const methodStmts = program.statements
        .filter((s) => s.scopeId === methodDef.id)
        .sort((a, b) => a.line - b.line);

      const isSynchronized = Boolean(methodDef?.metadata?.isSynchronized);
      const lockTarget = targetObjId || ownerClass?.name || 'monitor';
      const curThread = threadTable.get(activeThreadId);

      if (isSynchronized) {
        if (curThread) {
          curThread.lockAcquired = lockTarget;
        }
        captureSnapshot(
          'LOCK_ACQUIRED',
          methodLine,
          methodName,
          targetClassName,
          `Thread "${curThread?.name || activeThreadId}" acquired monitor lock on ${lockTarget} for synchronized method ${methodName}().`,
          { file: methFile }
        );
      }

      const returnValue = executeStatementBlock(methodStmts, methodFrame, targetObj, ownerClass?.name || targetClassName, methFile);

      if (isSynchronized) {
        if (curThread) {
          curThread.lockAcquired = undefined;
        }
        captureSnapshot(
          'LOCK_RELEASED',
          methodDef?.sourceLocation?.endLine || methodLine,
          methodName,
          targetClassName,
          `Thread "${curThread?.name || activeThreadId}" released monitor lock on ${lockTarget} upon returning from ${methodName}().`,
          { file: methFile }
        );
      }

      // Pop method frame if not abruptly crashed
      if (!runtimeHalted) {
        stackFrames.pop();
        captureSnapshot(
          'FRAME_POP',
          methodDef?.sourceLocation?.endLine || methodLine,
          methodName,
          targetClassName,
          `Returned from ${targetClassName}.${methodName}()${returnValue ? ` with result: ${JSON.stringify(returnValue.value)}` : ''}`,
          { file: methFile }
        );
      }

      return returnValue;
    };

    // -------------------------------------------------------------
    // STEP 1: Push main() Entry Frame
    // -------------------------------------------------------------
    const mainMethod = program.methods.find((m) => m.name === 'main');
    const mainStartLine = mainMethod?.sourceLocation?.line || 1;

    const mainFrame: StackFrameSnapshot = {
      frameId: 'frame-main',
      methodName: 'main(String[] args)',
      className: mainClassName,
      line: mainStartLine,
      file: mainFile,
      localVariables: [
        {
          name: 'args',
          type: 'String[]',
          value: '[]',
          isReference: true,
          targetAddress: undefined,
        },
      ],
    };
    stackFrames.push(mainFrame);

    captureSnapshot(
      'FRAME_PUSH',
      mainStartLine,
      'main',
      mainClassName,
      `Pushed main(String[] args) stack frame onto call stack.`,
      { file: mainFile }
    );

    // -------------------------------------------------------------
    // STEP 2: Execute Statements inside main()
    // -------------------------------------------------------------
    const mainEndLine = mainMethod?.sourceLocation?.endLine || this.findBlockEndLine(program.sourceCode, mainStartLine);
    const mainStmts = mainMethod
      ? program.statements
          .filter((s) => s.scopeId === mainMethod.id)
          .sort((a, b) => a.line - b.line)
      : program.statements
          .filter(
            (s) =>
              s.file === mainFile && s.line >= mainStartLine && s.line <= mainEndLine
          )
          .sort((a, b) => a.line - b.line);

    executeStatementBlock(mainStmts, mainFrame, undefined, mainClassName, mainFile);

    // -------------------------------------------------------------
    // STEP 3: Execution Completed or Terminated
    // -------------------------------------------------------------
    if (!runtimeHalted) {
      const lastLine = program.sourceCode.split('\n').length;
      mainFrame.line = lastLine;

      const mainT = threadTable.get('thread-main');
      if (mainT) {
        mainT.state = 'TERMINATED';
        mainT.isCurrent = false;
      }

      captureSnapshot(
        'EXECUTION_COMPLETED',
        lastLine,
        'main',
        mainClassName,
        `Program execution terminated normally. Final state preserved.`,
        { file: mainFile }
      );
    }

    return {
      id: `trace-${Date.now()}`,
      programTitle: `${mainClassName}.java Execution`,
      sourceCode: program.sourceCode,
      totalSteps: events.length,
      events,
      stdoutAggregate: stdoutBuffer || (runtimeHalted ? 'Execution terminated with runtime exception.\n' : `Execution finished with ${events.length} steps.\n`),
      durationMs: 14,
    };
  }
}

export const javaVirtualMachine = new JavaVirtualMachine();
