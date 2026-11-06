package com.oopslab.parser.service;

import com.github.javaparser.JavaParser;
import com.github.javaparser.ParseResult;
import com.github.javaparser.Range;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.*;
import com.github.javaparser.ast.expr.AssignExpr;
import com.github.javaparser.ast.expr.ObjectCreationExpr;
import com.github.javaparser.ast.expr.VariableDeclarationExpr;
import com.oopslab.api.dto.AstValidationResultDto;
import com.oopslab.model.JavaEntityDto;
import com.oopslab.model.JavaRelationshipDto;
import com.oopslab.model.ParsedAstDto;
import com.oopslab.model.SourceLocationDto;
import com.oopslab.parser.validator.AstSecurityValidator;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AstAnalysisService {

    private final JavaParser javaParser;
    private final AstSecurityValidator securityValidator;

    public AstAnalysisService() {
        this.javaParser = new JavaParser();
        this.securityValidator = new AstSecurityValidator();
    }

    public AstValidationResultDto analyzeAndValidate(String sourceCode) {
        long start = System.currentTimeMillis();

        if (sourceCode == null || sourceCode.trim().isEmpty()) {
            return AstValidationResultDto.failed(List.of("Source code cannot be empty."), 0);
        }

        ParseResult<CompilationUnit> parseResult = javaParser.parse(sourceCode);
        long duration = System.currentTimeMillis() - start;

        if (!parseResult.isSuccessful() || parseResult.getResult().isEmpty()) {
            List<String> errors = new ArrayList<>();
            parseResult.getProblems().forEach(p -> errors.add("Syntax Error: " + p.getMessage()));
            return AstValidationResultDto.failed(errors, duration);
        }

        CompilationUnit cu = parseResult.getResult().get();

        // 1. AST Security Filter
        List<String> securityViolations = securityValidator.validate(cu);
        if (!securityViolations.isEmpty()) {
            return AstValidationResultDto.failed(securityViolations, duration);
        }

        // 2. Identify Primary Class / Types
        List<ClassOrInterfaceDeclaration> classes = cu.findAll(ClassOrInterfaceDeclaration.class);
        List<RecordDeclaration> records = cu.findAll(RecordDeclaration.class);
        int totalTypes = classes.size() + records.size();

        String primaryName = null;
        for (ClassOrInterfaceDeclaration c : classes) {
            if (c.isPublic() || primaryName == null) {
                primaryName = c.getNameAsString();
            }
        }
        if (primaryName == null && !records.isEmpty()) {
            primaryName = records.getFirst().getNameAsString();
        }

        return AstValidationResultDto.success(primaryName != null ? primaryName : "Main", totalTypes, duration);
    }

    /**
     * Source-driven Java AST Extractor conforming to Master Prompt Phase 1 & Phase 5.
     * Extracts all classes, fields, constructors, methods, parameters, local variables,
     * object allocations, and field mutations with exact source ranges and stable IDs.
     */
    public ParsedAstDto extractUnifiedAst(String sourceCode, String fileName) {
        long start = System.currentTimeMillis();

        if (sourceCode == null || sourceCode.trim().isEmpty()) {
            return ParsedAstDto.failed(List.of("Source code cannot be empty."), 0);
        }

        ParseResult<CompilationUnit> parseResult = javaParser.parse(sourceCode);
        long duration = System.currentTimeMillis() - start;

        if (!parseResult.isSuccessful() || parseResult.getResult().isEmpty()) {
            List<String> errors = new ArrayList<>();
            parseResult.getProblems().forEach(p -> errors.add("Syntax Error: " + p.getMessage()));
            return ParsedAstDto.failed(errors, duration);
        }

        CompilationUnit cu = parseResult.getResult().get();

        // Security check
        List<String> securityViolations = securityValidator.validate(cu);
        if (!securityViolations.isEmpty()) {
            return ParsedAstDto.failed(securityViolations, duration);
        }

        List<JavaEntityDto> entities = new ArrayList<>();
        List<JavaRelationshipDto> relationships = new ArrayList<>();
        String primaryClassName = "Main";

        // 1. Classes and Interfaces
        List<ClassOrInterfaceDeclaration> classDecls = cu.findAll(ClassOrInterfaceDeclaration.class);
        for (ClassOrInterfaceDeclaration c : classDecls) {
            String className = c.getNameAsString();
            if (c.isPublic()) {
                primaryClassName = className;
            }

            String kind = c.isInterface() ? "interface" : (c.isAbstract() ? "abstract-class" : "class");
            String classId = "class-" + className;
            SourceLocationDto loc = toSourceLocation(fileName, c.getRange());

            Map<String, Object> meta = new HashMap<>();
            meta.put("visibility", c.getAccessSpecifier().asString());
            meta.put("isStatic", c.isStatic());
            meta.put("isFinal", c.isFinal());

            // Inheritance
            c.getExtendedTypes().forEach(t -> {
                String superName = t.getNameAsString();
                relationships.add(new JavaRelationshipDto(
                    "rel-inherit-" + className + "-" + superName,
                    classId,
                    "class-" + superName,
                    "inheritance",
                    "source",
                    loc,
                    Map.of("subClass", className, "superClass", superName)
                ));
            });

            // Implements
            c.getImplementedTypes().forEach(t -> {
                String ifaceName = t.getNameAsString();
                relationships.add(new JavaRelationshipDto(
                    "rel-impl-" + className + "-" + ifaceName,
                    classId,
                    "class-" + ifaceName,
                    "implementation",
                    "source",
                    loc,
                    Map.of("implementer", className, "interface", ifaceName)
                ));
            });

            entities.add(new JavaEntityDto(
                classId,
                kind,
                className,
                className,
                null,
                loc,
                "source",
                meta
            ));

            // Fields
            for (FieldDeclaration f : c.getFields()) {
                for (VariableDeclarator v : f.getVariables()) {
                    String fieldName = v.getNameAsString();
                    String fieldType = v.getTypeAsString();
                    String fieldId = "field-" + className + "-" + fieldName;
                    SourceLocationDto fLoc = toSourceLocation(fileName, v.getRange());

                    Map<String, Object> fMeta = new HashMap<>();
                    fMeta.put("className", className);
                    fMeta.put("visibility", f.getAccessSpecifier().asString());
                    fMeta.put("isStatic", f.isStatic());
                    fMeta.put("isFinal", f.isFinal());
                    v.getInitializer().ifPresent(init -> fMeta.put("initialValue", init.toString()));

                    entities.add(new JavaEntityDto(
                        fieldId,
                        "field",
                        fieldName,
                        fieldType,
                        null,
                        fLoc,
                        "source",
                        fMeta
                    ));

                    relationships.add(new JavaRelationshipDto(
                        "rel-has-field-" + classId + "-" + fieldId,
                        classId,
                        fieldId,
                        "composition",
                        "source",
                        fLoc,
                        Map.of()
                    ));
                }
            }

            // Constructors
            for (ConstructorDeclaration ctor : c.getConstructors()) {
                int paramCount = ctor.getParameters().size();
                String ctorId = "ctor-" + className + "-" + paramCount;
                SourceLocationDto cLoc = toSourceLocation(fileName, ctor.getRange());

                List<Map<String, String>> params = new ArrayList<>();
                ctor.getParameters().forEach(p -> params.add(Map.of(
                    "name", p.getNameAsString(),
                    "type", p.getTypeAsString()
                )));

                Map<String, Object> cMeta = new HashMap<>();
                cMeta.put("className", className);
                cMeta.put("visibility", ctor.getAccessSpecifier().asString());
                cMeta.put("parameters", params);
                cMeta.put("parameterCount", paramCount);

                entities.add(new JavaEntityDto(
                    ctorId,
                    "constructor",
                    className,
                    className,
                    null,
                    cLoc,
                    "source",
                    cMeta
                ));

                relationships.add(new JavaRelationshipDto(
                    "rel-has-ctor-" + classId + "-" + ctorId,
                    classId,
                    ctorId,
                    "composition",
                    "source",
                    cLoc,
                    Map.of()
                ));
            }

            // Methods
            for (MethodDeclaration m : c.getMethods()) {
                String methodName = m.getNameAsString();
                int paramCount = m.getParameters().size();
                String methodId = "method-" + className + "-" + methodName + "-" + paramCount;
                SourceLocationDto mLoc = toSourceLocation(fileName, m.getRange());

                List<Map<String, String>> params = new ArrayList<>();
                m.getParameters().forEach(p -> params.add(Map.of(
                    "name", p.getNameAsString(),
                    "type", p.getTypeAsString()
                )));

                Map<String, Object> mMeta = new HashMap<>();
                mMeta.put("className", className);
                mMeta.put("visibility", m.getAccessSpecifier().asString());
                mMeta.put("returnType", m.getTypeAsString());
                mMeta.put("isStatic", m.isStatic());
                mMeta.put("isFinal", m.isFinal());
                mMeta.put("isAbstract", m.isAbstract());
                mMeta.put("parameters", params);

                entities.add(new JavaEntityDto(
                    methodId,
                    "method",
                    methodName,
                    m.getTypeAsString(),
                    null,
                    mLoc,
                    "source",
                    mMeta
                ));

                relationships.add(new JavaRelationshipDto(
                    "rel-has-method-" + classId + "-" + methodId,
                    classId,
                    methodId,
                    "composition",
                    "source",
                    mLoc,
                    Map.of()
                ));
            }
        }

        // 2. Local Variable Declarations
        cu.findAll(VariableDeclarationExpr.class).forEach(vde -> {
            vde.getVariables().forEach(v -> {
                String varName = v.getNameAsString();
                String varType = v.getTypeAsString();
                SourceLocationDto vLoc = toSourceLocation(fileName, v.getRange());
                String varId = "var-line-" + (vLoc != null ? vLoc.line() : 0) + "-" + varName;

                entities.add(new JavaEntityDto(
                    varId,
                    "variable",
                    varName,
                    varType,
                    null,
                    vLoc,
                    "source",
                    Map.of("initialExpression", v.getInitializer().map(Object::toString).orElse(""))
                ));

                // Reference relationship to class type if non-primitive
                relationships.add(new JavaRelationshipDto(
                    "rel-ref-type-" + varId + "-class-" + varType,
                    varId,
                    "class-" + varType,
                    "reference",
                    "source",
                    vLoc,
                    Map.of()
                ));
            });
        });

        // 3. Object Allocations (new ...)
        cu.findAll(ObjectCreationExpr.class).forEach(oce -> {
            String targetClass = oce.getType().getNameAsString();
            SourceLocationDto aLoc = toSourceLocation(fileName, oce.getRange());
            relationships.add(new JavaRelationshipDto(
                "rel-alloc-line-" + (aLoc != null ? aLoc.line() : 0) + "-" + targetClass,
                "scope-line-" + (aLoc != null ? aLoc.line() : 0),
                "class-" + targetClass,
                "instantiation",
                "source",
                aLoc,
                Map.of("arguments", oce.getArguments().stream().map(Object::toString).toList())
            ));
        });

        // 4. Assignments
        cu.findAll(AssignExpr.class).forEach(ae -> {
            SourceLocationDto asLoc = toSourceLocation(fileName, ae.getRange());
            relationships.add(new JavaRelationshipDto(
                "rel-assign-line-" + (asLoc != null ? asLoc.line() : 0) + "-" + ae.getTarget(),
                ae.getTarget().toString(),
                ae.getValue().toString(),
                "field-access",
                "source",
                asLoc,
                Map.of("operator", ae.getOperator().asString())
            ));
        });

        return new ParsedAstDto(true, List.of(), primaryClassName, entities, relationships, System.currentTimeMillis() - start);
    }

    private SourceLocationDto toSourceLocation(String file, Optional<Range> rangeOpt) {
        if (rangeOpt.isEmpty()) {
            return new SourceLocationDto(file, 1, 1, 1, 1);
        }
        Range r = rangeOpt.get();
        return new SourceLocationDto(
            file,
            r.begin.line,
            r.begin.column,
            r.end.line,
            r.end.column
        );
    }
}
