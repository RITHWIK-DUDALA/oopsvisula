/**
 * OOPS LAB — Java Source Parser & AST Extraction Engine
 * Conforms to Master Prompt Section 2.1 & Section 12 (Phase 1).
 * Extracts classes, fields, constructors, methods, parameters, local variables,
 * allocations, and assignments with exact line numbers and deterministic entity IDs.
 */

import type {
  JavaEntity,
  JavaRelationship,
  ParsedJavaProgram,
  SourceLocation,
} from './unifiedModel';

export class JavaAstParser {

  /**
   * Parse multiple project files into one unified cross-file AST.
   */
  public parseProject(files: Array<{ name: string; content: string }>): ParsedJavaProgram {
    const combinedEntities: JavaEntity[] = [];
    const combinedRelationships: JavaRelationship[] = [];
    const combinedClasses: JavaEntity[] = [];
    const combinedFields: JavaEntity[] = [];
    const combinedConstructors: JavaEntity[] = [];
    const combinedMethods: JavaEntity[] = [];
    const combinedVariables: JavaEntity[] = [];
    const combinedAllocations: ParsedJavaProgram['allocations'] = [];
    const combinedMutations: ParsedJavaProgram['mutations'] = [];
    const combinedInvocations: ParsedJavaProgram['invocations'] = [];
    const combinedStatements: ParsedJavaProgram['statements'] = [];

    for (const file of files) {
      const parsed = this.parse(file.content, file.name);
      combinedEntities.push(...parsed.entities);
      combinedRelationships.push(...parsed.relationships);
      combinedClasses.push(...parsed.classes);
      combinedFields.push(...parsed.fields);
      combinedConstructors.push(...parsed.constructors);
      combinedMethods.push(...parsed.methods);
      combinedVariables.push(...parsed.variables);
      combinedAllocations.push(...parsed.allocations);
      combinedMutations.push(...parsed.mutations);
      combinedInvocations.push(...parsed.invocations);
      combinedStatements.push(...parsed.statements);
    }

    return {
      entities: combinedEntities,
      relationships: combinedRelationships,
      classes: combinedClasses,
      fields: combinedFields,
      constructors: combinedConstructors,
      methods: combinedMethods,
      variables: combinedVariables,
      allocations: combinedAllocations,
      mutations: combinedMutations,
      invocations: combinedInvocations,
      statements: combinedStatements,
      sourceCode: files.map((f) => `// === ${f.name} ===\n${f.content}`).join('\n\n'),
    };
  }

  /**
   * Parse Java source code into canonical entities and relationships.
   */
  public parse(sourceCode: string, fileName = 'Main.java'): ParsedJavaProgram {
    if (!sourceCode || typeof sourceCode !== 'string') {
      return {
        entities: [],
        relationships: [],
        classes: [],
        fields: [],
        constructors: [],
        methods: [],
        variables: [],
        allocations: [],
        mutations: [],
        invocations: [],
        statements: [],
        sourceCode: '',
      };
    }
    // Strict input bound on AST parsing (max 128 KB) to prevent regex ReDoS / buffer exhaustion
    const safeSourceCode = sourceCode.length > 131072 ? sourceCode.slice(0, 131072) : sourceCode;

    const entities: JavaEntity[] = [];
    const relationships: JavaRelationship[] = [];
    const classes: JavaEntity[] = [];
    const fields: JavaEntity[] = [];
    const constructors: JavaEntity[] = [];
    const methods: JavaEntity[] = [];
    const variables: JavaEntity[] = [];
    const allocations: ParsedJavaProgram['allocations'] = [];
    const mutations: ParsedJavaProgram['mutations'] = [];
    const invocations: ParsedJavaProgram['invocations'] = [];
    const statements: ParsedJavaProgram['statements'] = [];

    // Strip comments while preserving character counts / line offsets
    const sanitizedCode = this.sanitizeComments(safeSourceCode);

    // 1. Match all Class, Interface, Record, and Enum declarations
    const classRegex =
      /(?:(public|protected|private)\s+)?(?:(abstract|final|static|sealed|non-sealed)\s+)?(class|interface|record|enum)\s+([A-Za-z0-9_]+)(?:<[^>]+>)?(?:\s*\(([^)]*)\))?(?:\s+extends\s+([A-Za-z0-9_<>,\s]+?))?(?:\s+implements\s+([A-Za-z0-9_<>,\s]+?))?\s*\{/g;

    let classMatch: RegExpExecArray | null;

    while ((classMatch = classRegex.exec(sanitizedCode)) !== null) {
      const matchIndex = classMatch.index;
      const startLoc = this.getLocFromIndex(sourceCode, matchIndex, fileName);

      const visibility = (classMatch[1] as 'public' | 'protected' | 'private') || 'package-private';
      const modifier = classMatch[2] || '';
      const kindRaw = classMatch[3];
      const className = classMatch[4];
      const recordParamsRaw = classMatch[5];
      const superclassRaw = classMatch[6];
      const interfacesRaw = classMatch[7];

      const classKind =
        kindRaw === 'interface'
          ? 'interface'
          : kindRaw === 'record'
          ? 'record'
          : kindRaw === 'enum'
          ? 'enum'
          : modifier.includes('abstract')
          ? 'abstract-class'
          : 'class';

      // Find matched class closing brace boundary
      const bodyStartIndex = classMatch.index + classMatch[0].length;
      const bodyEndIndex = this.findMatchingBrace(sanitizedCode, bodyStartIndex - 1);
      const endLoc = this.getLocFromIndex(sourceCode, bodyEndIndex, fileName);

      const classEntityId = `class-${className}`;
      const classLoc: SourceLocation = {
        ...startLoc,
        endLine: endLoc.line,
        endColumn: endLoc.column,
      };

      const superclassName = superclassRaw ? superclassRaw.trim().split(/\s+/)[0] : undefined;
      const interfaces = interfacesRaw
        ? interfacesRaw.split(',').map((i) => i.trim()).filter(Boolean)
        : [];

      const classEntity: JavaEntity = {
        id: classEntityId,
        kind: classKind,
        name: className,
        declaredType: className,
        sourceLocation: classLoc,
        provenance: 'source',
        metadata: {
          visibility,
          isAbstract: modifier.includes('abstract') || classKind === 'interface' || classKind === 'abstract-class',
          isFinal: modifier.includes('final'),
          isStatic: modifier.includes('static'),
          superclass: superclassName,
          interfaces,
        },
      };

      entities.push(classEntity);
      classes.push(classEntity);

      // Register inheritance relationship if present
      if (superclassName && superclassName !== 'Object') {
        relationships.push({
          id: `rel-inherit-${className}-${superclassName}`,
          sourceId: classEntityId,
          targetId: `class-${superclassName}`,
          kind: 'inheritance',
          provenance: 'source',
          sourceLocation: { file: fileName, line: startLoc.line },
          metadata: { subClass: className, superClass: superclassName },
        });
      }

      // Register interface implementation relationships
      for (const iface of interfaces) {
        relationships.push({
          id: `rel-impl-${className}-${iface}`,
          sourceId: classEntityId,
          targetId: `class-${iface}`,
          kind: 'implementation',
          provenance: 'source',
          sourceLocation: { file: fileName, line: startLoc.line },
          metadata: { implementer: className, interface: iface },
        });
      }

      const classBody = sanitizedCode.substring(bodyStartIndex, bodyEndIndex);

      // 2. Parse Class Body Members
      this.parseClassMembers({
        classEntityId,
        className,
        classKind,
        classBody,
        recordParamsRaw,
        startLoc,
        bodyOffset: bodyStartIndex,
        sourceCode,
        sanitizedCode,
        fileName,
        entities,
        relationships,
        fields,
        constructors,
        methods,
        variables,
        allocations,
        mutations,
        invocations,
        statements,
      });
    }

    return {
      entities,
      relationships,
      classes,
      fields,
      constructors,
      methods,
      variables,
      allocations,
      mutations,
      invocations,
      statements,
      sourceCode: safeSourceCode,
    };
  }

  /**
   * Parse members within a class body (Fields, Constructors, Methods, Records, Enums)
   */
  private parseClassMembers(ctx: {
    classEntityId: string;
    className: string;
    classKind: string;
    classBody: string;
    recordParamsRaw?: string;
    startLoc: SourceLocation;
    bodyOffset: number;
    sourceCode: string;
    sanitizedCode: string;
    fileName: string;
    entities: JavaEntity[];
    relationships: JavaRelationship[];
    fields: JavaEntity[];
    constructors: JavaEntity[];
    methods: JavaEntity[];
    variables: JavaEntity[];
    allocations: ParsedJavaProgram['allocations'];
    mutations: ParsedJavaProgram['mutations'];
    invocations: ParsedJavaProgram['invocations'];
    statements: ParsedJavaProgram['statements'];
  }) {
    const {
      classEntityId,
      className,
      classKind,
      classBody,
      recordParamsRaw,
      startLoc,
      bodyOffset,
      sourceCode,
      sanitizedCode,
      fileName,
      entities,
      relationships,
      fields,
      constructors,
      methods,
      variables,
      allocations,
      mutations,
      invocations,
      statements,
    } = ctx;

    // A0. Synthesize Record Members if Record
    if (classKind === 'record' && recordParamsRaw !== undefined) {
      const recordParams = this.parseParameters(recordParamsRaw);

      // 1. Synthesize private final fields
      for (const p of recordParams) {
        const fieldId = `field-${className}-${p.name}`;
        const fieldEntity: JavaEntity = {
          id: fieldId,
          kind: 'field',
          name: p.name,
          declaredType: p.type,
          sourceLocation: startLoc,
          provenance: 'source',
          metadata: {
            className,
            visibility: 'private',
            isStatic: false,
            isFinal: true,
            isPrimitive: this.isPrimitiveType(p.type),
          },
        };
        entities.push(fieldEntity);
        fields.push(fieldEntity);
        relationships.push({
          id: `rel-has-field-${classEntityId}-${fieldId}`,
          sourceId: classEntityId,
          targetId: fieldId,
          kind: 'composition',
          provenance: 'source',
        });
      }

      // 2. Canonical constructor
      const ctorId = `ctor-${className}-${recordParams.length}`;
      const ctorEntity: JavaEntity = {
        id: ctorId,
        kind: 'constructor',
        name: className,
        declaredType: className,
        sourceLocation: startLoc,
        provenance: 'source',
        metadata: {
          className,
          visibility: 'public',
          parameters: recordParams,
          parameterCount: recordParams.length,
          signature: `${className}(${recordParams.map((p) => `${p.type} ${p.name}`).join(', ')})`,
        },
      };
      entities.push(ctorEntity);
      constructors.push(ctorEntity);
      relationships.push({
        id: `rel-has-ctor-${classEntityId}-${ctorId}`,
        sourceId: classEntityId,
        targetId: ctorId,
        kind: 'composition',
        provenance: 'source',
      });

      for (const p of recordParams) {
        statements.push({
          id: `stmt-mut-record-${className}-${p.name}`,
          kind: 'mutation',
          line: startLoc.line,
          file: fileName,
          rawText: `this.${p.name} = ${p.name};`,
          scopeId: ctorId,
          targetExpression: `this.${p.name}`,
          operator: '=',
          valueExpression: p.name,
        });
      }

      // 3. Getter accessor methods: e.g. x(), y()
      for (const p of recordParams) {
        const methId = `method-${className}-${p.name}-0`;
        const methEntity: JavaEntity = {
          id: methId,
          kind: 'method',
          name: p.name,
          declaredType: p.type,
          sourceLocation: startLoc,
          provenance: 'source',
          metadata: {
            className,
            visibility: 'public',
            returnType: p.type,
            isStatic: false,
            isAbstract: false,
            parameters: [],
            parameterCount: 0,
            signature: `${p.name}()`,
          },
        };
        entities.push(methEntity);
        methods.push(methEntity);
        relationships.push({
          id: `rel-has-method-${classEntityId}-${methId}`,
          sourceId: classEntityId,
          targetId: methId,
          kind: 'composition',
          provenance: 'source',
        });
        statements.push({
          id: `stmt-ret-record-${className}-${p.name}`,
          kind: 'return',
          line: startLoc.line,
          file: fileName,
          rawText: `return this.${p.name};`,
          scopeId: methId,
          valueExpression: `this.${p.name}`,
        });
      }
    }

    // A1. Parse Enum Constants if Enum
    if (classKind === 'enum') {
      const firstSemi = classBody.indexOf(';');
      const enumHeader = firstSemi !== -1 ? classBody.substring(0, firstSemi) : classBody.split('{')[0];
      const enumConstants = enumHeader
        .split(',')
        .map((c) => c.trim().split(/\s*[\(\{]/)[0].trim())
        .filter((c) => c && /^[A-Za-z0-9_]+$/.test(c) && !['public', 'private', 'protected', 'static', 'final'].includes(c));

      for (const constName of enumConstants) {
        const fieldId = `field-${className}-${constName}`;
        const fieldEntity: JavaEntity = {
          id: fieldId,
          kind: 'field',
          name: constName,
          declaredType: className,
          sourceLocation: startLoc,
          provenance: 'source',
          metadata: {
            className,
            visibility: 'public',
            isStatic: true,
            isFinal: true,
            initialValue: constName,
            isPrimitive: false,
          },
        };
        entities.push(fieldEntity);
        fields.push(fieldEntity);
        relationships.push({
          id: `rel-has-field-${classEntityId}-${fieldId}`,
          sourceId: classEntityId,
          targetId: fieldId,
          kind: 'composition',
          provenance: 'source',
        });
      }
    }

    // A. Parse Constructors
    const ctorRegex = new RegExp(
      `(?:(public|protected|private)\\s+)?${className}\\s*\\(([^)]*)\\)\\s*(?:throws\\s+[^{]+)?\\{`,
      'g'
    );

    let ctorMatch: RegExpExecArray | null;
    while ((ctorMatch = ctorRegex.exec(classBody)) !== null) {
      const matchIndex = bodyOffset + ctorMatch.index;
      const startLoc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      const visibility = (ctorMatch[1] as 'public' | 'protected' | 'private') || 'package-private';
      const paramsRaw = ctorMatch[2];

      const params = this.parseParameters(paramsRaw);
      const ctorId = `ctor-${className}-${params.length}`;

      // Find constructor body
      const ctorBodyStartIndex = matchIndex + ctorMatch[0].length;
      const ctorBodyEndIndex = this.findMatchingBrace(sanitizedCode, ctorBodyStartIndex - 1);
      const ctorBody = sanitizedCode.substring(ctorBodyStartIndex, ctorBodyEndIndex);

      const ctorEntity: JavaEntity = {
        id: ctorId,
        kind: 'constructor',
        name: className,
        declaredType: className,
        sourceLocation: {
          ...startLoc,
          endLine: this.getLocFromIndex(sourceCode, ctorBodyEndIndex, fileName).line,
        },
        provenance: 'source',
        metadata: {
          className,
          visibility,
          parameters: params,
          parameterCount: params.length,
          signature: `${className}(${params.map((p) => `${p.type} ${p.name}`).join(', ')})`,
        },
      };

      entities.push(ctorEntity);
      constructors.push(ctorEntity);

      // Relationship: Class has constructor
      relationships.push({
        id: `rel-has-ctor-${classEntityId}-${ctorId}`,
        sourceId: classEntityId,
        targetId: ctorId,
        kind: 'composition',
        provenance: 'source',
      });

      // Parse constructor body statements
      this.parseMethodOrCtorBody({
        scopeId: ctorId,
        scopeName: className,
        declaringClass: className,
        bodyText: ctorBody,
        bodyOffset: ctorBodyStartIndex,
        sourceCode,
        fileName,
        entities,
        relationships,
        variables,
        allocations,
        mutations,
        invocations,
        statements,
      });

      ctorRegex.lastIndex = ctorBodyEndIndex - bodyOffset;
    }

    // B. Parse Methods
    const methodRegex =
      /(?:(public|protected|private)\s+)?(?:(static)\s+)?(?:(final)\s+)?(?:(abstract|synchronized|native)\s+)?([A-Za-z0-9_<>\[\]]+)\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)\s*(?:throws\s+[^{;]+)?(\{)?/g;

    let methodMatch: RegExpExecArray | null;
    while ((methodMatch = methodRegex.exec(classBody)) !== null) {
      const returnType = methodMatch[5];
      const methodName = methodMatch[6];
      const paramsRaw = methodMatch[7];
      const hasBody = methodMatch[8] === '{';

      // Skip if this is a constructor matching className
      if (methodName === className) continue;
      // Skip if returnType is a control keyword
      if (['return', 'new', 'throw', 'else', 'if'].includes(returnType)) continue;

      const matchIndex = bodyOffset + methodMatch.index;
      const startLoc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      const visibility = (methodMatch[1] as 'public' | 'protected' | 'private') || 'package-private';
      const isStatic = !!methodMatch[2];
      const isFinal = !!methodMatch[3];
      const extraMod = methodMatch[4] || '';

      const params = this.parseParameters(paramsRaw);
      const methodId = `method-${className}-${methodName}-${params.length}`;

      let bodyEndLine = startLoc.line;
      let methodBody = '';

      if (hasBody) {
        const methodBodyStartIndex = matchIndex + methodMatch[0].length;
        const methodBodyEndIndex = this.findMatchingBrace(sanitizedCode, methodBodyStartIndex - 1);
        bodyEndLine = this.getLocFromIndex(sourceCode, methodBodyEndIndex, fileName).line;
        methodBody = sanitizedCode.substring(methodBodyStartIndex, methodBodyEndIndex);

        // Parse method body statements
        this.parseMethodOrCtorBody({
          scopeId: methodId,
          scopeName: methodName,
          declaringClass: className,
          bodyText: methodBody,
          bodyOffset: methodBodyStartIndex,
          sourceCode,
          fileName,
          entities,
          relationships,
          variables,
          allocations,
          mutations,
          invocations,
          statements,
        });

        methodRegex.lastIndex = methodBodyEndIndex - bodyOffset;
      }

      const methodEntity: JavaEntity = {
        id: methodId,
        kind: 'method',
        name: methodName,
        declaredType: returnType,
        sourceLocation: {
          ...startLoc,
          endLine: bodyEndLine,
        },
        provenance: 'source',
        metadata: {
          className,
          visibility,
          returnType,
          isStatic,
          isFinal,
          isAbstract: extraMod.includes('abstract'),
          isSynchronized: extraMod.includes('synchronized'),
          parameters: params,
          signature: `${methodName}(${params.map((p) => `${p.type} ${p.name}`).join(', ')})`,
        },
      };

      entities.push(methodEntity);
      methods.push(methodEntity);

      // Relationship: Class has method
      relationships.push({
        id: `rel-has-method-${classEntityId}-${methodId}`,
        sourceId: classEntityId,
        targetId: methodId,
        kind: 'composition',
        provenance: 'source',
      });
    }

    // C. Parse Fields
    // Mask inner blocks (constructors, methods) so local variables inside methods are NOT matched as class fields
    const fieldScanningBody = this.maskInnerBlocks(classBody);

    const fieldRegex =
      /(?:(public|protected|private)\s+)?(?:(static)\s+)?(?:(final)\s+)?(?:(transient|volatile)\s+)?([A-Za-z0-9_<>\[\]]+)\s+([A-Za-z0-9_]+)(?:\s*=\s*([^;]+))?\s*;/g;

    let fieldMatch: RegExpExecArray | null;
    while ((fieldMatch = fieldRegex.exec(fieldScanningBody)) !== null) {
      const type = fieldMatch[5];
      const fieldName = fieldMatch[6];
      const initialVal = fieldMatch[7] ? fieldMatch[7].trim() : undefined;

      // Filter out constructors or method calls caught accidentally
      if (fieldName === className || type === 'return' || fieldName.includes('(')) continue;

      const matchIndex = bodyOffset + fieldMatch.index;
      const startLoc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      const visibility = (fieldMatch[1] as 'public' | 'protected' | 'private') || 'package-private';
      const isStatic = !!fieldMatch[2];
      const isFinal = !!fieldMatch[3];

      const fieldId = `field-${className}-${fieldName}`;

      const fieldEntity: JavaEntity = {
        id: fieldId,
        kind: 'field',
        name: fieldName,
        declaredType: type,
        sourceLocation: startLoc,
        provenance: 'source',
        metadata: {
          className,
          visibility,
          isStatic,
          isFinal,
          initialValue: initialVal,
          isPrimitive: this.isPrimitiveType(type),
          declaredType: type,
        },
      };

      entities.push(fieldEntity);
      fields.push(fieldEntity);

      // Relationship: Class owns Field
      relationships.push({
        id: `rel-has-field-${classEntityId}-${fieldId}`,
        sourceId: classEntityId,
        targetId: fieldId,
        kind: 'composition',
        provenance: 'source',
      });

      // Semantic Association: If field type is a reference to another user-defined class
      const cleanFieldType = type.replace(/<.*>|\[\]/g, '').trim();
      if (!this.isPrimitiveType(cleanFieldType) && cleanFieldType !== 'String' && cleanFieldType !== 'void') {
        relationships.push({
          id: `rel-assoc-${className}-${fieldName}-${cleanFieldType}`,
          sourceId: classEntityId,
          targetId: `class-${cleanFieldType}`,
          kind: 'association',
          provenance: 'source',
          sourceLocation: startLoc,
          metadata: {
            fieldName,
            fieldType: type,
            evidence: `Field '${fieldName} : ${type}' declares association reference to '${cleanFieldType}'`,
          },
        });
      }
    }
  }

  /**
   * Parse statements inside a method or constructor body for:
   * - Local variables (e.g. Student s1)
   * - Allocations (e.g. new Student(101, ...))
   * - Method Invocations (e.g. service.processDeposit(account, 250.0))
   * - Field mutations (e.g. balance += amount;)
   * - Print statements (e.g. System.out.println(account.balance);)
   */
  private parseMethodOrCtorBody(ctx: {
    scopeId: string;
    scopeName: string;
    declaringClass: string;
    bodyText: string;
    bodyOffset: number;
    sourceCode: string;
    fileName: string;
    entities: JavaEntity[];
    relationships: JavaRelationship[];
    variables: JavaEntity[];
    allocations: ParsedJavaProgram['allocations'];
    mutations: ParsedJavaProgram['mutations'];
    invocations: ParsedJavaProgram['invocations'];
    statements: ParsedJavaProgram['statements'];
  }) {
    const {
      scopeId,
      declaringClass,
      bodyText,
      bodyOffset,
      sourceCode,
      fileName,
      entities,
      relationships,
      variables,
      allocations,
      mutations,
      invocations,
      statements,
    } = ctx;

    // 1. Detect Local Variable Declarations & Instantiations
    // e.g. Address address = new Address("Vijayawada");
    // or int count = 0;
    const varDeclRegex =
      /([A-Za-z0-9_<>\[\]]+)\s+([A-Za-z0-9_]+)\s*(?:=\s*([\s\S]*?))?;/g;

    let varMatch: RegExpExecArray | null;
    while ((varMatch = varDeclRegex.exec(bodyText)) !== null) {
      const type = varMatch[1];
      const varName = varMatch[2];
      const initExpr = varMatch[3] ? varMatch[3].trim() : undefined;

      // Filter out keywords or assignments without types
      if (['return', 'throw', 'if', 'while', 'for', 'else', 'switch', 'case', 'break', 'new'].includes(type)) {
        continue;
      }

      const matchIndex = bodyOffset + varMatch.index;
      const startLoc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      const varId = `var-${scopeId}-${varName}`;

      const varEntity: JavaEntity = {
        id: varId,
        kind: 'variable',
        name: varName,
        declaredType: type,
        sourceLocation: startLoc,
        provenance: 'source',
        metadata: {
          scope: scopeId,
          isPrimitive: this.isPrimitiveType(type),
          initialExpression: initExpr,
        },
      };

      entities.push(varEntity);
      variables.push(varEntity);

      // Check if this variable references a class
      if (!this.isPrimitiveType(type)) {
        relationships.push({
          id: `rel-ref-type-${varId}-class-${type}`,
          sourceId: varId,
          targetId: `class-${type}`,
          kind: 'reference',
          provenance: 'source',
          sourceLocation: { file: fileName, line: startLoc.line },
        });
      }

      // Check if this variable is an array allocation or array literal
      const isArrayType = type.endsWith('[]');
      const arrayNewMatch = initExpr ? initExpr.match(/^new\s+([A-Za-z0-9_]+)\[(.*)\](?:\s*\{([\s\S]*)\})?$/) : null;
      const arrayLiteralMatch = initExpr ? initExpr.match(/^\{([\s\S]*)\}$/) : null;

      if (isArrayType && (arrayNewMatch || arrayLiteralMatch)) {
        const elemType = arrayNewMatch ? arrayNewMatch[1] : type.replace(/\[\]$/, '');
        const sizeExpr = arrayNewMatch ? arrayNewMatch[2].trim() : '';
        const elementsRaw = arrayNewMatch ? arrayNewMatch[3] : arrayLiteralMatch ? arrayLiteralMatch[1] : '';
        const elements = elementsRaw ? elementsRaw.split(',').map((e) => e.trim()).filter(Boolean) : [];

        allocations.push({
          id: `alloc-arr-${startLoc.line}-${varName}`,
          targetClass: `${elemType}[]`,
          arguments: elements.length > 0 ? elements : (sizeExpr ? [sizeExpr] : []),
          variableName: varName,
          location: startLoc,
        });

        statements.push({
          id: `stmt-alloc-arr-${startLoc.line}-${varName}`,
          kind: 'allocation',
          line: startLoc.line,
          file: fileName,
          rawText: varMatch[0],
          scopeId,
          targetClass: `${elemType}[]`,
          variableName: varName,
          arguments: elements.length > 0 ? elements : (sizeExpr ? [sizeExpr] : []),
        });
      } else if (!initExpr || !initExpr.startsWith('new ')) {
        statements.push({
          id: `stmt-decl-${startLoc.line}-${varName}`,
          kind: 'declaration',
          line: startLoc.line,
          file: fileName,
          rawText: varMatch[0],
          scopeId,
          variableType: type,
          variableName: varName,
          valueExpression: initExpr,
        });
      }
    }

    // 2. Detect Object Creation Expressions (`new ClassName(...)`)
    const newRegex =
      /(?:([A-Za-z0-9_<>\[\]]+)\s+)?(?:([A-Za-z0-9_]+)\s*=\s*)?new\s+([A-Za-z0-9_]+)\s*(?:<[^>]*>)?\s*\(([\s\S]*?)\)/g;

    let newMatch: RegExpExecArray | null;
    while ((newMatch = newRegex.exec(bodyText)) !== null) {
      const assignedVar = newMatch[2];
      const targetClass = newMatch[3];
      const argsRaw = newMatch[4];

      const matchIndex = bodyOffset + newMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);

      const args = argsRaw
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean);

      const allocId = `alloc-line-${loc.line}-${targetClass}`;

      allocations.push({
        id: allocId,
        targetClass,
        arguments: args,
        variableName: assignedVar,
        location: loc,
      });

      statements.push({
        id: `stmt-alloc-${loc.line}-${targetClass}`,
        kind: 'allocation',
        line: loc.line,
        file: fileName,
        rawText: newMatch[0],
        scopeId,
        targetClass,
        variableName: assignedVar,
        arguments: args,
      });

      // Relationship: Instantiation from scope to Class
      relationships.push({
        id: `rel-instantiates-${scopeId}-class-${targetClass}-line-${loc.line}`,
        sourceId: scopeId,
        targetId: `class-${targetClass}`,
        kind: 'instantiation',
        provenance: 'source',
        sourceLocation: { file: fileName, line: loc.line },
        metadata: {
          arguments: args,
          assignedTo: assignedVar,
        },
      });

      // Class dependency
      relationships.push({
        id: `rel-depends-${declaringClass}-class-${targetClass}`,
        sourceId: `class-${declaringClass}`,
        targetId: `class-${targetClass}`,
        kind: 'dependency',
        provenance: 'source',
      });
    }

    // 3. Detect Invocations (Method Calls & System.out.println)
    // e.g. service.processDeposit(account, 250.0);
    // or validate(amount);
    // or System.out.println(account.balance);
    const callRegex =
      /(?:System\.out\.println\s*\(([^)]*)\)|([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\s*\(([^)]*)\)|([A-Za-z0-9_]+)\s*\(([^)]*)\))\s*;/g;

    let callMatch: RegExpExecArray | null;
    while ((callMatch = callRegex.exec(bodyText)) !== null) {
      // Check if preceded by 'new ' — if so, this is a constructor allocation, not an invocation
      const preceding = bodyText.substring(Math.max(0, callMatch.index - 5), callMatch.index);
      if (/new\s+$/.test(preceding)) {
        continue;
      }

      const matchIndex = bodyOffset + callMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);

      if (callMatch[1] !== undefined) {
        // System.out.println(...)
        const printArg = callMatch[1].trim();
        invocations.push({
          id: `invoc-line-${loc.line}-println`,
          scopeId,
          callerClass: declaringClass,
          targetExpression: 'System.out.println',
          methodName: 'println',
          arguments: [printArg],
          location: loc,
        });

        statements.push({
          id: `stmt-print-${loc.line}`,
          kind: 'print',
          line: loc.line,
          file: fileName,
          rawText: callMatch[0],
          scopeId,
          methodName: 'println',
          arguments: [printArg],
          valueExpression: printArg,
        });
      } else if (callMatch[2] !== undefined && callMatch[3] !== undefined) {
        // obj.method(args)
        const objName = callMatch[2];
        const methName = callMatch[3];
        const args = (callMatch[4] || '')
          .split(',')
          .map((a) => a.trim())
          .filter(Boolean);

        if (objName !== 'System' && methName !== 'out') {
          invocations.push({
            id: `invoc-line-${loc.line}-${objName}-${methName}`,
            scopeId,
            callerClass: declaringClass,
            targetExpression: `${objName}.${methName}`,
            objectName: objName,
            methodName: methName,
            arguments: args,
            location: loc,
          });

          statements.push({
            id: `stmt-call-${loc.line}-${methName}`,
            kind: 'invocation',
            line: loc.line,
            file: fileName,
            rawText: callMatch[0],
            scopeId,
            targetExpression: `${objName}.${methName}`,
            variableName: objName,
            methodName: methName,
            arguments: args,
          });

          relationships.push({
            id: `rel-calls-${scopeId}-${methName}-line-${loc.line}`,
            sourceId: scopeId,
            targetId: `method-${methName}`,
            kind: 'method-call',
            provenance: 'source',
            sourceLocation: { file: fileName, line: loc.line },
          });
        }
      } else if (callMatch[5] !== undefined) {
        // bare method(args) inside same class or super
        const methName = callMatch[5];
        if (!['if', 'for', 'while', 'switch', 'return', 'catch', 'throw', 'synchronized'].includes(methName)) {
          const args = (callMatch[6] || '')
            .split(',')
            .map((a) => a.trim())
            .filter(Boolean);

          invocations.push({
            id: `invoc-line-${loc.line}-${methName}`,
            scopeId,
            callerClass: declaringClass,
            targetExpression: methName,
            methodName: methName,
            arguments: args,
            location: loc,
          });

          statements.push({
            id: `stmt-call-${loc.line}-${methName}`,
            kind: 'invocation',
            line: loc.line,
            file: fileName,
            rawText: callMatch[0],
            scopeId,
            targetExpression: methName,
            methodName: methName,
            arguments: args,
          });

          relationships.push({
            id: `rel-calls-${scopeId}-${methName}-line-${loc.line}`,
            sourceId: scopeId,
            targetId: `method-${declaringClass}-${methName}`,
            kind: 'method-call',
            provenance: 'source',
            sourceLocation: { file: fileName, line: loc.line },
          });
        }
      }
    }

    // 4. Detect Field Mutations (e.g. `this.city = city;`, `balance += amount;`, `address.city = city;`, `arr[i] = val;`)
    const mutationRegex =
      /((?:[A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)*(?:\[[^\]]+\])?))\s*(=|\+=|-=)\s*([^;]+);/g;

    let mutMatch: RegExpExecArray | null;
    while ((mutMatch = mutationRegex.exec(bodyText)) !== null) {
      const targetExpr = mutMatch[1].trim();
      const operator = mutMatch[2] as '=' | '+=' | '-=';
      const valExpr = mutMatch[3].trim();

      // Skip local variable declarations already caught
      if (['int', 'double', 'float', 'long', 'boolean', 'String', 'char', 'short', 'byte', 'return', 'throw'].some((k) => targetExpr.startsWith(k + ' '))) {
        continue;
      }
      if (valExpr.startsWith('new ')) {
        continue; // Handled under allocations
      }

      const matchIndex = bodyOffset + mutMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);

      mutations.push({
        id: `mutation-line-${loc.line}-${targetExpr}`,
        scopeId,
        targetExpression: targetExpr,
        operator,
        valueExpression: valExpr,
        location: loc,
      });

      statements.push({
        id: `stmt-mut-${loc.line}-${targetExpr}`,
        kind: 'mutation',
        line: loc.line,
        file: fileName,
        rawText: mutMatch[0],
        scopeId,
        targetExpression: targetExpr,
        operator,
        valueExpression: valExpr,
      });
    }

    // 5. Detect Branch Statements (if / else if)
    const branchRegex = /if\s*\(([\s\S]*?)\)/g;
    let branchMatch: RegExpExecArray | null;
    while ((branchMatch = branchRegex.exec(bodyText)) !== null) {
      const condition = branchMatch[1].trim();
      const matchIndex = bodyOffset + branchMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      statements.push({
        id: `stmt-branch-${loc.line}`,
        kind: 'branch',
        line: loc.line,
        file: fileName,
        rawText: branchMatch[0],
        scopeId,
        condition,
      });
    }

    // 6. Detect Loop Statements (for / while / for-each)
    const loopRegex = /(for|while)\s*\(([\s\S]*?)\)/g;
    let loopMatch: RegExpExecArray | null;
    while ((loopMatch = loopRegex.exec(bodyText)) !== null) {
      const loopTypeRaw = loopMatch[1] as 'for' | 'while';
      const loopHeader = loopMatch[2].trim();
      const matchIndex = bodyOffset + loopMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);

      if (loopTypeRaw === 'for') {
        const forEachMatch = loopHeader.match(/^([A-Za-z0-9_<>\[\]]+)\s+([A-Za-z0-9_]+)\s*:\s*([\s\S]+)$/);
        if (forEachMatch) {
          statements.push({
            id: `stmt-loop-${loc.line}`,
            kind: 'loop',
            line: loc.line,
            file: fileName,
            rawText: loopMatch[0],
            scopeId,
            loopType: 'for-each',
            forEachItemType: forEachMatch[1].trim(),
            forEachItemVar: forEachMatch[2].trim(),
            forEachCollection: forEachMatch[3].trim(),
          });
          continue;
        }
      }

      let loopType: 'for' | 'while' | 'for-each' = loopTypeRaw;
      let loopInit: string | undefined;
      let condition = loopHeader;
      let loopUpdate: string | undefined;

      if (loopType === 'for') {
        const parts = loopHeader.split(';').map((p) => p.trim());
        if (parts.length >= 3) {
          loopInit = parts[0];
          condition = parts[1];
          loopUpdate = parts[2];
        }
      }

      statements.push({
        id: `stmt-loop-${loc.line}`,
        kind: 'loop',
        line: loc.line,
        file: fileName,
        rawText: loopMatch[0],
        scopeId,
        loopType,
        loopInit,
        condition,
        loopUpdate,
      });
    }

    // 7. Detect Explicit Exception Throw (throw new Exception(...))
    const throwRegex = /throw\s+new\s+([A-Za-z0-9_]+)\s*\(([\s\S]*?)\);/g;
    let throwMatch: RegExpExecArray | null;
    while ((throwMatch = throwRegex.exec(bodyText)) !== null) {
      const excClass = throwMatch[1];
      const excMsg = throwMatch[2].trim();
      const matchIndex = bodyOffset + throwMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      statements.push({
        id: `stmt-throw-${loc.line}-${excClass}`,
        kind: 'exception',
        line: loc.line,
        file: fileName,
        rawText: throwMatch[0],
        scopeId,
        targetClass: excClass,
        valueExpression: excMsg,
      });
    }

    // 8. Detect Return Statements (return expr; or return;)
    const returnRegex = /return(?:\s+([\s\S]*?))?;/g;
    let retMatch: RegExpExecArray | null;
    while ((retMatch = returnRegex.exec(bodyText)) !== null) {
      const valExpr = retMatch[1] ? retMatch[1].trim() : undefined;
      const matchIndex = bodyOffset + retMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      statements.push({
        id: `stmt-return-${loc.line}`,
        kind: 'return',
        line: loc.line,
        file: fileName,
        rawText: retMatch[0],
        scopeId,
        valueExpression: valExpr,
      });
    }

    // 9. Detect Unary Increment / Decrement Statements (e.g. i++; ++i; count--; --count;)
    const unaryRegex = /(?:(\+\+|--)([A-Za-z0-9_]+)|([A-Za-z0-9_]+)(\+\+|--))\s*;/g;
    let unaryMatch: RegExpExecArray | null;
    while ((unaryMatch = unaryRegex.exec(bodyText)) !== null) {
      const varName = unaryMatch[2] || unaryMatch[3];
      const op = unaryMatch[1] || unaryMatch[4];
      const matchIndex = bodyOffset + unaryMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      statements.push({
        id: `stmt-unary-${loc.line}-${varName}`,
        kind: 'mutation',
        line: loc.line,
        file: fileName,
        rawText: unaryMatch[0],
        scopeId,
        targetExpression: varName,
        operator: op === '++' ? '+=' : '-=',
        valueExpression: '1',
      });
    }

    // 10. Detect Try, Catch, Finally Blocks
    const tryRegex = /\btry\s*\{/g;
    let tryMatch: RegExpExecArray | null;
    while ((tryMatch = tryRegex.exec(bodyText)) !== null) {
      const matchIndex = bodyOffset + tryMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      statements.push({
        id: `stmt-try-${loc.line}`,
        kind: 'try',
        line: loc.line,
        file: fileName,
        rawText: 'try {',
        scopeId,
      });
    }

    const catchRegex = /\bcatch\s*\(\s*([A-Za-z0-9_<>]+)\s+([A-Za-z0-9_]+)\s*\)\s*\{/g;
    let catchMatch: RegExpExecArray | null;
    while ((catchMatch = catchRegex.exec(bodyText)) !== null) {
      const excType = catchMatch[1].trim();
      const excVar = catchMatch[2].trim();
      const matchIndex = bodyOffset + catchMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      statements.push({
        id: `stmt-catch-${loc.line}`,
        kind: 'catch',
        line: loc.line,
        file: fileName,
        rawText: catchMatch[0],
        scopeId,
        catchExceptionType: excType,
        catchExceptionVar: excVar,
      });
    }

    const finallyRegex = /\bfinally\s*\{/g;
    let finMatch: RegExpExecArray | null;
    while ((finMatch = finallyRegex.exec(bodyText)) !== null) {
      const matchIndex = bodyOffset + finMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      statements.push({
        id: `stmt-finally-${loc.line}`,
        kind: 'finally',
        line: loc.line,
        file: fileName,
        rawText: 'finally {',
        scopeId,
      });
    }

    // 11. Detect Switch and Break Statements
    const switchRegex = /\bswitch\s*\(([\s\S]*?)\)\s*\{/g;
    let switchMatch: RegExpExecArray | null;
    while ((switchMatch = switchRegex.exec(bodyText)) !== null) {
      const expr = switchMatch[1].trim();
      const matchIndex = bodyOffset + switchMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      statements.push({
        id: `stmt-switch-${loc.line}`,
        kind: 'switch',
        line: loc.line,
        file: fileName,
        rawText: switchMatch[0],
        scopeId,
        switchExpression: expr,
      });
    }

    const breakRegex = /\bbreak\s*;/g;
    let breakMatch: RegExpExecArray | null;
    while ((breakMatch = breakRegex.exec(bodyText)) !== null) {
      const matchIndex = bodyOffset + breakMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      statements.push({
        id: `stmt-break-${loc.line}`,
        kind: 'break',
        line: loc.line,
        file: fileName,
        rawText: 'break;',
        scopeId,
      });
    }

    // 12. Detect Synchronized Blocks: synchronized (lock) {
    const syncRegex = /\bsynchronized\s*\(([\s\S]*?)\)\s*\{/g;
    let syncMatch: RegExpExecArray | null;
    while ((syncMatch = syncRegex.exec(bodyText)) !== null) {
      const lockExpr = syncMatch[1].trim();
      const matchIndex = bodyOffset + syncMatch.index;
      const loc = this.getLocFromIndex(sourceCode, matchIndex, fileName);
      statements.push({
        id: `stmt-sync-${loc.line}`,
        kind: 'synchronized',
        line: loc.line,
        file: fileName,
        rawText: syncMatch[0],
        scopeId,
        syncLockExpression: lockExpr,
      });
    }
  }

  /**
   * Parse comma-separated parameter strings into structured objects
   */
  private parseParameters(paramsRaw: string): { name: string; type: string; id: string }[] {
    if (!paramsRaw || !paramsRaw.trim()) return [];
    return paramsRaw
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean)
      .map((paramStr, idx) => {
        const parts = paramStr.split(/\s+/);
        const name = parts[parts.length - 1];
        const type = parts.slice(0, parts.length - 1).join(' ') || 'Object';
        return {
          id: `param-${idx}-${name}`,
          name,
          type,
        };
      });
  }

  /**
   * Helper to check if a type is a primitive Java type
   */
  private isPrimitiveType(type: string): boolean {
    const primitives = new Set([
      'int',
      'long',
      'short',
      'byte',
      'float',
      'double',
      'boolean',
      'char',
    ]);
    return primitives.has(type.trim());
  }

  /**
   * Mask content inside all inner { ... } blocks with whitespace/newlines
   * to allow scanning class-level fields without matching local variables in methods.
   */
  private maskInnerBlocks(text: string): string {
    let result = '';
    let depth = 0;
    let inString = false;
    let inChar = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const prev = i > 0 ? text[i - 1] : '';

      if (char === '"' && prev !== '\\') inString = !inString;
      if (char === "'" && prev !== '\\') inChar = !inChar;

      if (!inString && !inChar) {
        if (char === '{') {
          depth++;
          result += '{';
          continue;
        }
        if (char === '}') {
          depth--;
          result += '}';
          continue;
        }
      }

      if (depth > 0) {
        result += char === '\n' ? '\n' : ' ';
      } else {
        result += char;
      }
    }
    return result;
  }

  /**
   * Find matching closing curly brace from start index
   */
  private findMatchingBrace(text: string, startIndex: number): number {
    let depth = 0;
    let inString = false;
    let inChar = false;

    for (let i = startIndex; i < text.length; i++) {
      const char = text[i];
      const prev = i > 0 ? text[i - 1] : '';

      if (char === '"' && prev !== '\\') inString = !inString;
      if (char === "'" && prev !== '\\') inChar = !inChar;

      if (!inString && !inChar) {
        if (char === '{') depth++;
        if (char === '}') {
          depth--;
          if (depth === 0) return i;
        }
      }
    }
    return text.length;
  }

  /**
   * Strip comments without changing string length or line breaks
   */
  private sanitizeComments(code: string): string {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, (match) => {
        // preserve newlines in block comments to keep line numbers intact
        return match.replace(/[^\n]/g, ' ');
      })
      .replace(/\/\/.*$/gm, (match) => {
        return ' '.repeat(match.length);
      });
  }

  /**
   * Compute 1-indexed line and column numbers from 0-indexed char offset
   */
  private getLocFromIndex(source: string, index: number, file: string): SourceLocation {
    const safeIndex = Math.min(Math.max(0, index), source.length);
    const textBefore = source.substring(0, safeIndex);
    const lineParts = textBefore.split('\n');
    const line = lineParts.length;
    const column = lineParts[lineParts.length - 1].length + 1;

    return {
      file,
      line,
      column,
    };
  }
}

export const javaAstParser = new JavaAstParser();
