package com.oopslab.parser.service;

import com.github.javaparser.JavaParser;
import com.github.javaparser.ParseResult;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.ast.body.RecordDeclaration;
import com.oopslab.api.dto.AstValidationResultDto;
import com.oopslab.parser.validator.AstSecurityValidator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
}
