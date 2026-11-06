import { Node, Edge } from '@xyflow/react';
import { VisualEntityData, VisualRelationshipData, FieldItem, MethodItem, ConstructorItem } from '../types';

export interface ParsedJavaDiagram {
  nodes: Node<VisualEntityData>[];
  edges: Edge<VisualRelationshipData>[];
  classesCount: number;
  objectsCount: number;
  relationshipsCount: number;
}

/**
 * Robust Java Static Analysis & Diagram Generator
 * Extracts classes, interfaces, inheritance, implementation, fields, methods,
 * object instantiations, and method invocations from student Java code.
 */
export function parseJavaCodeToDiagram(sourceCode: string): ParsedJavaDiagram {
  const nodes: Node<VisualEntityData>[] = [];
  const edges: Edge<VisualRelationshipData>[] = [];

  // Remove single line comments and block comments to avoid false positive matches
  const cleanCode = sourceCode
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');

  let nodeX = 220;
  let nodeY = 100;
  const classIdMap = new Map<string, string>();

  // 1. Match Class & Interface Declarations
  const classRegex =
    /(?:(public|abstract|final)\s+)?(class|interface|enum|record)\s+([A-Za-z0-9_]+)(?:\s+extends\s+([A-Za-z0-9_]+))?(?:\s+implements\s+([A-Za-z0-9_,\s]+))?\s*\{/g;

  let match: RegExpExecArray | null;
  while ((match = classRegex.exec(cleanCode)) !== null) {
    const modifier = match[1] || '';
    const kind = match[2];
    const className = match[3];
    const superclass = match[4];
    const interfacesStr = match[5];

    const nodeId = `cls-${className.toLowerCase()}`;
    classIdMap.set(className, nodeId);

    const classType =
      kind === 'interface'
        ? 'interface'
        : modifier.includes('abstract')
        ? 'abstract-class'
        : kind === 'enum'
        ? 'enum'
        : kind === 'record'
        ? 'record'
        : 'class';

    // Find class body block bounds
    const startIndex = match.index + match[0].length;
    let braceCount = 1;
    let endIndex = startIndex;
    while (braceCount > 0 && endIndex < cleanCode.length) {
      if (cleanCode[endIndex] === '{') braceCount++;
      if (cleanCode[endIndex] === '}') braceCount--;
      endIndex++;
    }
    const classBody = cleanCode.substring(startIndex, endIndex - 1);

    // Extract Fields
    const fields: FieldItem[] = [];
    const fieldRegex =
      /(?:(public|private|protected)\s+)?(?:(static)\s+)?(?:(final)\s+)?([A-Za-z0-9_<>\[\]]+)\s+([A-Za-z0-9_]+)(?:\s*=\s*([^;]+))?;/g;
    let fMatch: RegExpExecArray | null;
    let fieldCount = 0;
    while ((fMatch = fieldRegex.exec(classBody)) !== null) {
      const vis = fMatch[1] === 'private' ? '-' : fMatch[1] === 'protected' ? '#' : '+';
      const isStatic = !!fMatch[2];
      const type = fMatch[4];
      const name = fMatch[5];
      const val = fMatch[6] ? fMatch[6].trim() : undefined;

      // Filter out constructors or method signatures caught accidentally
      if (name !== className && !type.includes('return') && !name.includes('(')) {
        fieldCount++;
        fields.push({
          id: `f-${nodeId}-${fieldCount}`,
          name,
          type,
          visibility: vis,
          isStatic,
          value: val,
        });
      }
    }

    // Extract Constructors
    const constructors: ConstructorItem[] = [];
    const constructorRegex = new RegExp(
      `(?:(public|private|protected)\\s+)?${className}\\s*\\(([^)]*)\\)\\s*(?:throws\\s+[^{]+)?\\{`,
      'g'
    );
    let cMatch: RegExpExecArray | null;
    let cCount = 0;
    while ((cMatch = constructorRegex.exec(classBody)) !== null) {
      cCount++;
      const vis = cMatch[1] === 'private' ? '-' : cMatch[1] === 'protected' ? '#' : '+';
      const params = cMatch[2]
        ? cMatch[2].split(',').map((p) => p.trim()).filter(Boolean)
        : [];
      constructors.push({
        id: `c-${nodeId}-${cCount}`,
        name: className,
        parameters: params,
        visibility: vis,
      });
    }

    // Extract Methods
    const methods: MethodItem[] = [];
    const methodRegex =
      /(?:(public|private|protected)\s+)?(?:(static)\s+)?(?:(abstract)\s+)?([A-Za-z0-9_<>\[\]]+)\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)\s*(?:throws\s+[^{;]+)?(?:\{|;)/g;
    let mMatch: RegExpExecArray | null;
    let mCount = 0;
    while ((mMatch = methodRegex.exec(classBody)) !== null) {
      const vis = mMatch[1] === 'private' ? '-' : mMatch[1] === 'protected' ? '#' : '+';
      const isStatic = !!mMatch[2];
      const isAbstract = !!mMatch[3] || classType === 'interface';
      const returnType = mMatch[4];
      const methodName = mMatch[5];
      const params = mMatch[6]
        ? mMatch[6].split(',').map((p) => p.trim()).filter(Boolean)
        : [];

      if (methodName !== className && !['if', 'for', 'while', 'switch'].includes(methodName)) {
        mCount++;
        methods.push({
          id: `m-${nodeId}-${mCount}`,
          name: methodName,
          returnType,
          visibility: vis,
          parameters: params,
          isStatic,
          isAbstract,
        });
      }
    }

    // Add Class Node
    nodes.push({
      id: nodeId,
      type: 'classNode',
      position: { x: nodeX, y: nodeY },
      data: {
        id: nodeId,
        entityType: 'class',
        name: className,
        classType,
        visibility: modifier.includes('public') ? 'public' : 'package',
        sourceFile: `${className}.java`,
        fields,
        constructors,
        methods,
      },
    });

    nodeX += 340;
    if (nodeX > 900) {
      nodeX = 220;
      nodeY += 380;
    }

    // Inheritance edge (extends)
    if (superclass && superclass !== 'Object') {
      const targetId = `cls-${superclass.toLowerCase()}`;
      edges.push({
        id: `edge-inh-${nodeId}-${targetId}`,
        source: nodeId,
        target: targetId,
        type: 'relationshipEdge',
        data: {
          id: `edge-inh-${nodeId}-${targetId}`,
          sourceId: nodeId,
          targetId,
          type: 'inheritance',
          label: 'extends',
          explanation: `${className} extends superclass ${superclass}`,
        },
      });
    }

    // Interface edges (implements)
    if (interfacesStr) {
      const interfaces = interfacesStr.split(',').map((i) => i.trim());
      for (const iface of interfaces) {
        if (!iface) continue;
        const targetId = `cls-${iface.toLowerCase()}`;
        edges.push({
          id: `edge-impl-${nodeId}-${targetId}`,
          source: nodeId,
          target: targetId,
          type: 'relationshipEdge',
          data: {
            id: `edge-impl-${nodeId}-${targetId}`,
            sourceId: nodeId,
            targetId,
            type: 'implementation',
            label: 'implements',
            explanation: `${className} implements interface contract ${iface}`,
          },
        });
      }
    }
  }

  // 1.5. Discover Inter-Class Relationships (Association, Composition, Dependency)
  const edgeSet = new Set<string>();
  edges.forEach((e) => edgeSet.add(`${e.source}->${e.target}`));

  nodes.forEach((node) => {
    if (node.data.entityType !== 'class') return;
    const sourceClassId = node.id;
    const className = node.data.name;

    // Field Associations & Compositions
    (node.data.fields || []).forEach((field) => {
      const cleanType = field.type.replace(/[<>\[\]]/g, '').trim();
      const targetClassId = classIdMap.get(cleanType);
      if (targetClassId && targetClassId !== sourceClassId) {
        const edgeKey = `${sourceClassId}->${targetClassId}`;
        if (!edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          edges.push({
            id: `edge-assoc-${sourceClassId}-${targetClassId}-${field.name}`,
            source: sourceClassId,
            target: targetClassId,
            type: 'relationshipEdge',
            data: {
              id: `edge-assoc-${sourceClassId}-${targetClassId}-${field.name}`,
              sourceId: sourceClassId,
              targetId: targetClassId,
              type: 'association',
              label: field.name,
              explanation: `${className} holds a reference to ${cleanType} (field: ${field.name})`,
            },
          });
        }
      }
    });

    // Method Dependencies (Parameters and Return Types)
    (node.data.methods || []).forEach((method) => {
      // Return type dependency
      if (method.returnType) {
        const cleanRet = method.returnType.replace(/[<>\[\]]/g, '').trim();
        const targetClassId = classIdMap.get(cleanRet);
        if (targetClassId && targetClassId !== sourceClassId) {
          const edgeKey = `${sourceClassId}->${targetClassId}`;
          if (!edgeSet.has(edgeKey)) {
            edgeSet.add(edgeKey);
            edges.push({
              id: `edge-dep-${sourceClassId}-${targetClassId}-${method.name}`,
              source: sourceClassId,
              target: targetClassId,
              type: 'relationshipEdge',
              data: {
                id: `edge-dep-${sourceClassId}-${targetClassId}-${method.name}`,
                sourceId: sourceClassId,
                targetId: targetClassId,
                type: 'dependency',
                label: 'depends on',
                explanation: `${className}.${method.name}() returns type ${cleanRet}`,
              },
            });
          }
        }
      }

      // Parameter dependencies
      (method.parameters || []).forEach((param) => {
        const paramType = param.split(/\s+/)[0]?.replace(/[<>\[\]]/g, '').trim();
        if (paramType) {
          const targetClassId = classIdMap.get(paramType);
          if (targetClassId && targetClassId !== sourceClassId) {
            const edgeKey = `${sourceClassId}->${targetClassId}`;
            if (!edgeSet.has(edgeKey)) {
              edgeSet.add(edgeKey);
              edges.push({
                id: `edge-dep-${sourceClassId}-${targetClassId}-${method.name}-param`,
                source: sourceClassId,
                target: targetClassId,
                type: 'relationshipEdge',
                data: {
                  id: `edge-dep-${sourceClassId}-${targetClassId}-${method.name}-param`,
                  sourceId: sourceClassId,
                  targetId: targetClassId,
                  type: 'dependency',
                  label: 'uses',
                  explanation: `${className}.${method.name}() receives parameter of type ${paramType}`,
                },
              });
            }
          }
        }
      });
    });
  });

  // 2. Discover Object Instantiations (e.g. Student s1 = new Student(...);)
  let objX = 240;
  let objY = nodeY + 400;
  const objRegex =
    /([A-Za-z0-9_]+)\s+([A-Za-z0-9_]+)\s*=\s*new\s+([A-Za-z0-9_]+)\s*\(([^)]*)\);/g;

  let oMatch: RegExpExecArray | null;
  let objCount = 0;
  while ((oMatch = objRegex.exec(cleanCode)) !== null) {
    const varType = oMatch[1];
    const varName = oMatch[2];
    const instantiatedClass = oMatch[3];
    const args = oMatch[4];

    objCount++;
    const objId = `obj-${varName}`;
    const hexAddr = `@0x${(0x4000 + objCount * 0x30).toString(16).toUpperCase()}`;

    // Add Object Node
    nodes.push({
      id: objId,
      type: 'objectNode',
      position: { x: objX, y: objY },
      data: {
        id: objId,
        entityType: 'object',
        name: varName,
        className: instantiatedClass,
        simulatorAddress: hexAddr,
        runtimeState: 'active',
        instanceFieldValues: {
          referenceType: varType,
          arguments: args || 'default()',
        },
      },
    });

    // Reference Edge from variable/class to instantiated object
    const classTarget = classIdMap.get(instantiatedClass);
    if (classTarget) {
      edges.push({
        id: `edge-ref-${objId}-${classTarget}`,
        source: objId,
        target: classTarget,
        type: 'relationshipEdge',
        data: {
          id: `edge-ref-${objId}-${classTarget}`,
          sourceId: objId,
          targetId: classTarget,
          type: 'reference',
          label: 'instance of',
          explanation: `Object ${varName} is allocated on the Heap as an instance of ${instantiatedClass}`,
        },
      });
    }

    objX += 280;
    if (objX > 900) {
      objX = 240;
      objY += 240;
    }
  }

  // 3. Discover Array Allocations (e.g. int[] nums = {10, 20, 30};)
  const arrayRegex =
    /([A-Za-z0-9_]+)\[\]\s+([A-Za-z0-9_]+)\s*=\s*\{([^}]+)\};/g;

  let arrMatch: RegExpExecArray | null;
  let arrCount = 0;
  while ((arrMatch = arrayRegex.exec(cleanCode)) !== null) {
    arrCount++;
    const elemType = arrMatch[1];
    const arrName = arrMatch[2];
    const elements = arrMatch[3].split(',').map((e, idx) => ({
      index: idx,
      value: e.trim(),
    }));

    const arrId = `arr-${arrName}`;
    nodes.push({
      id: arrId,
      type: 'arrayNode',
      position: { x: objX, y: objY },
      data: {
        id: arrId,
        entityType: 'array',
        name: arrName,
        variableType: `${elemType}[]`,
        arrayLength: elements.length,
        arrayCells: elements,
      },
    });

    objX += 280;
  }

  return {
    nodes,
    edges,
    classesCount: classIdMap.size,
    objectsCount: objCount,
    relationshipsCount: edges.length,
  };
}

