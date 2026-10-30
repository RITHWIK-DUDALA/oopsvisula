package com.oopslab.parser;

import com.github.javaparser.JavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.oopslab.parser.validator.AstSecurityValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class AstSecurityValidatorTest {

    private JavaParser parser;
    private AstSecurityValidator validator;

    @BeforeEach
    void setUp() {
        parser = new JavaParser();
        validator = new AstSecurityValidator();
    }

    @Test
    void testValidOopCodePassesSecurity() {
        String code = """
            public class BankAccount {
                private double balance;
                public void deposit(double amount) {
                    if (amount > 0) this.balance += amount;
                }
            }
            """;
        CompilationUnit cu = parser.parse(code).getResult().orElseThrow();
        List<String> violations = validator.validate(cu);
        assertTrue(violations.isEmpty(), "Valid OOP code should have 0 security violations");
    }

    @Test
    void testForbiddenReflectionImportIsBlocked() {
        String code = """
            import java.lang.reflect.Method;
            public class Exploit {
                public static void main(String[] args) {}
            }
            """;
        CompilationUnit cu = parser.parse(code).getResult().orElseThrow();
        List<String> violations = validator.validate(cu);
        assertFalse(violations.isEmpty(), "Reflection import must be caught by security validator");
        assertTrue(violations.getFirst().contains("Forbidden import detected"));
    }

    @Test
    void testSystemExitIsBlocked() {
        String code = """
            public class Exploit {
                public static void main(String[] args) {
                    System.exit(1);
                }
            }
            """;
        CompilationUnit cu = parser.parse(code).getResult().orElseThrow();
        List<String> violations = validator.validate(cu);
        assertFalse(violations.isEmpty(), "System.exit() must be caught by security validator");
        assertTrue(violations.getFirst().contains("Forbidden method call detected"));
    }

    @Test
    void testForbiddenFileIoIsBlocked() {
        String code = """
            import java.io.File;
            public class Exploit {
                public static void main(String[] args) {}
            }
            """;
        CompilationUnit cu = parser.parse(code).getResult().orElseThrow();
        List<String> violations = validator.validate(cu);
        assertFalse(violations.isEmpty(), "File I/O import must be caught by security validator");
    }
}

