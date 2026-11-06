package com.oopslab.parser.validator;

import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.ImportDeclaration;
import com.github.javaparser.ast.expr.MethodCallExpr;
import com.github.javaparser.ast.visitor.VoidVisitorAdapter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * JavaParser AST Security Validator
 * Enforces zero-trust AST boundaries before student code can be scheduled.
 * Conforms to docs/architecture/SECURITY_ARCHITECTURE.md
 */
public class AstSecurityValidator {

    private static final Set<String> FORBIDDEN_PACKAGE_PREFIXES = Set.of(
        "java.lang.reflect",
        "java.lang.invoke",
        "java.lang.instrument",
        "java.lang.management",
        "java.io.File",
        "java.nio.file",
        "java.net",
        "java.security",
        "sun.misc",
        "jdk.internal",
        "com.sun"
    );

    private static final Set<String> FORBIDDEN_METHOD_NAMES = Set.of(
        "exit",
        "halt",
        "load",
        "loadLibrary",
        "exec",
        "forName",
        "stop",
        "suspend",
        "resume",
        "invokeExact"
    );

    public List<String> validate(CompilationUnit cu) {
        List<String> violations = new ArrayList<>();

        // 1. Check Import Declarations
        for (ImportDeclaration imp : cu.getImports()) {
            String importName = imp.getNameAsString();
            for (String forbidden : FORBIDDEN_PACKAGE_PREFIXES) {
                if (importName.startsWith(forbidden)) {
                    violations.add("Forbidden import detected: '" + importName + "'. Package access restricted by security policy.");
                }
            }
        }

        // 2. Check Method Call Expressions
        cu.accept(new VoidVisitorAdapter<Void>() {
            @Override
            public void visit(MethodCallExpr n, Void arg) {
                super.visit(n, arg);
                String methodName = n.getNameAsString();
                if (FORBIDDEN_METHOD_NAMES.contains(methodName)) {
                    String scopeStr = n.getScope().map(Object::toString).orElse("");
                    violations.add("Forbidden method call detected: '" + (scopeStr.isEmpty() ? "" : scopeStr + ".") + methodName + "()'. Security policy forbids process/JVM termination, thread abort, or reflection.");
                }
            }

            @Override
            public void visit(com.github.javaparser.ast.type.ClassOrInterfaceType n, Void arg) {
                super.visit(n, arg);
                String fullTypeName = n.asString();
                for (String forbidden : FORBIDDEN_PACKAGE_PREFIXES) {
                    if (fullTypeName.startsWith(forbidden)) {
                        violations.add("Forbidden type usage detected: '" + fullTypeName + "'. Package access restricted by security policy.");
                    }
                }
            }

            @Override
            public void visit(com.github.javaparser.ast.expr.ObjectCreationExpr n, Void arg) {
                super.visit(n, arg);
                String createdType = n.getTypeAsString();
                for (String forbidden : FORBIDDEN_PACKAGE_PREFIXES) {
                    if (createdType.startsWith(forbidden)) {
                        violations.add("Forbidden object allocation detected: 'new " + createdType + "()'. Construction restricted by security policy.");
                    }
                }
            }
        }, null);

        return violations;
    }
}

