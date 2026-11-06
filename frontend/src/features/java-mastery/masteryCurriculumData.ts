import { MasteryStage, MasteryProject } from './types';

// ============================================================================
// STAGE 1: JAVA FOUNDATIONS
// ============================================================================
export const STAGE_1_PROJECT: MasteryProject = {
  id: 'proj-stage-1',
  stageId: 1,
  title: 'Console Calculator & Numeric Unit Converter',
  difficulty: 'Beginner',
  estimatedHours: 4,
  problemStatement:
    'Develop an interactive terminal application capable of executing arithmetic operations, scientific conversions (Celsius to Fahrenheit, Megabytes to Gigabytes), and bitwise manipulations using primitive Java data types, type casting, and standard I/O.',
  requirements: [
    'Accept user commands via java.util.Scanner with clean error handling.',
    'Implement operations: Addition, Subtraction, Multiplication, Division, Modulus.',
    'Implement unit conversions: Metric to Imperial, Temperature scales, Data size bytes/KB/MB/GB.',
    'Demonstrate explicit type casting and handle integer overflow situations gracefully.',
    'Format decimal outputs to 2 decimal places using printf.',
  ],
  architectureOverview:
    'Modular procedural structure organized into specialized conversion and calculation helper methods with input validation guards.',
  suggestedClassStructure: [
    {
      className: 'CalculatorApp',
      role: 'Entry point, interactive REPL loop, and menu routing',
      methods: ['main(String[] args)', 'displayMenu()', 'processCommand(int choice)'],
    },
    {
      className: 'ArithmeticEngine',
      role: 'Math computations with precision and divide-by-zero checks',
      methods: ['add(double a, double b)', 'divide(double a, double b)', 'modulus(int a, int b)'],
    },
    {
      className: 'UnitConverter',
      role: 'Unit conversion formulas and bitwise byte calculations',
      methods: ['celsiusToFahrenheit(double c)', 'megabytesToBytes(long mb)'],
    },
  ],
  milestones: [
    { step: 1, title: 'I/O Foundation', tasks: ['Set up Scanner reader loop and graceful exit command'] },
    { step: 2, title: 'Arithmetic Operations', tasks: ['Implement math methods with overflow detection'] },
    { step: 3, title: 'Unit Conversion Module', tasks: ['Implement temperature and storage byte converters'] },
    { step: 4, title: 'Formatting & Error Defense', tasks: ['Validate inputs against NaN, Infinity, and zero denominators'] },
  ],
  testCases: [
    { description: 'Divide by zero', input: 'divide(10, 0)', expectedOutput: 'IllegalArgumentException: Divisor cannot be 0' },
    { description: 'Temperature conversion', input: 'celsiusToFahrenheit(100.0)', expectedOutput: '212.00 F' },
    { description: 'Data byte conversion', input: 'megabytesToBytes(4)', expectedOutput: '4194304 bytes' },
  ],
  evaluationCriteria: [
    'Zero unhandled exceptions when non-numeric input is provided.',
    'Strict adherence to primitive data types and proper use of double for floating-point calculations.',
    'Clean, idiomatic code format adhering to Java standards.',
  ],
  extensions: [
    'Add binary and hexadecimal conversion display.',
    'Support chained calculations (e.g., 5 + 3 * 2).',
  ],
};

// ============================================================================
// STAGE 2: PROGRAMMING LOGIC AND PROBLEM SOLVING
// ============================================================================
export const STAGE_2_PROJECT: MasteryProject = {
  id: 'proj-stage-2',
  stageId: 2,
  title: 'Number Toolkit & Mathematical Algorithm Engine',
  difficulty: 'Beginner',
  estimatedHours: 6,
  problemStatement:
    'Construct an algorithmic calculation engine that analyzes integer arrays, computes primes using the Sieve of Eratosthenes, determines Fibonacci sequences recursively and iteratively, and manipulates text using Java 21 enhanced switch pattern matching.',
  requirements: [
    'Implement Sieve of Eratosthenes up to N = 100,000.',
    'Compare recursive vs iterative Fibonacci generation with execution time benchmarking.',
    'Perform multi-dimensional matrix operations: Matrix Addition, Transpose, and Dot Product.',
    'Implement array searching (Binary Search) and sorting (Merge Sort) from scratch.',
  ],
  architectureOverview:
    'Dedicated algorithmic modules separating iterative loops, recursion stack frames, and array contiguous memory buffers.',
  suggestedClassStructure: [
    {
      className: 'PrimeAnalyzer',
      role: 'Prime generation and factorization algorithms',
      methods: ['sieveOfEratosthenes(int max)', 'primeFactors(long n)'],
    },
    {
      className: 'SequenceGenerator',
      role: 'Recursive and iterative series computations',
      methods: ['fibonacciRecursive(int n)', 'fibonacciIterative(int n)'],
    },
    {
      className: 'MatrixOperations',
      role: '2D array manipulation and dot product algorithms',
      methods: ['multiply(int[][] a, int[][] b)', 'transpose(int[][] m)'],
    },
  ],
  milestones: [
    { step: 1, title: 'Primes Engine', tasks: ['Implement boolean array sieve with O(N log log N) complexity'] },
    { step: 2, title: 'Stack Frame Recursion', tasks: ['Implement memoized Fibonacci sequence'] },
    { step: 3, title: '2D Matrix Math', tasks: ['Implement matrix multiplication with dimension compatibility checks'] },
  ],
  testCases: [
    { description: 'Sieve of 20', input: 'sieveOfEratosthenes(20)', expectedOutput: '[2, 3, 5, 7, 11, 13, 17, 19]' },
    { description: 'Fibonacci 10', input: 'fibonacciIterative(10)', expectedOutput: '55' },
  ],
  evaluationCriteria: [
    'Algorithmic time complexity within expected bounds.',
    'No StackOverflowError on deep recursion calls.',
    'Correct bounds checking on all 1D and 2D arrays.',
  ],
  extensions: [
    'Add BigInteger support for computing 10,000th Fibonacci number.',
    'Integrate visual matrix step-by-step rendering.',
  ],
};

// ============================================================================
// STAGE 3: OBJECT-ORIENTED PROGRAMMING
// ============================================================================
export const STAGE_3_PROJECT: MasteryProject = {
  id: 'proj-stage-3',
  stageId: 3,
  title: 'Student & Faculty Academic Management System',
  difficulty: 'Intermediate',
  estimatedHours: 8,
  problemStatement:
    'Build an enterprise-style object-oriented academic platform modeling Students, Professors, Courses, and Departments. Enforce complete encapsulation, polymorphic grade calculations, interface contracts for accreditation, and composition for departmental structures.',
  requirements: [
    'Abstract class Person extended by Student and Professor.',
    'Interface AccreditedEntity defining compliance audit contracts.',
    'Enforce encapsulation with private fields, validation rules, and immutability where appropriate.',
    'Implement Composition for Department -> Course and Aggregation for Department -> Professor.',
    'Demonstrate polymorphism via a single payRoll / reportGenerator processing diverse Person objects.',
  ],
  architectureOverview:
    'Layered domain model demonstrating all 4 OOP pillars (Abstraction, Encapsulation, Inheritance, Polymorphism) and clean UML relationships.',
  suggestedClassStructure: [
    {
      className: 'Person',
      role: 'Abstract base class establishing identity and common behaviors',
      methods: ['getId()', 'getName()', 'getRole()', 'generateAnnualReport()'],
    },
    {
      className: 'Student',
      role: 'Subclass with enrolled courses and GPA calculation',
      methods: ['enroll(Course c)', 'calculateGPA()', 'generateAnnualReport()'],
    },
    {
      className: 'Professor',
      role: 'Subclass with teaching assignments and salary evaluation',
      methods: ['assignCourse(Course c)', 'computeCompensation()', 'generateAnnualReport()'],
    },
    {
      className: 'Department',
      role: 'Composite container owning course catalog and aggregating faculty',
      methods: ['addFaculty(Professor p)', 'createCourse(String code)', 'getDepartmentSummary()'],
    },
  ],
  milestones: [
    { step: 1, title: 'Hierarchy Scaffolding', tasks: ['Create Person abstract base class, Student, Professor'] },
    { step: 2, title: 'Contracts & Interfaces', tasks: ['Implement AccreditedEntity and Auditable interfaces'] },
    { step: 3, title: 'Association & Aggregation', tasks: ['Wire Department composition and aggregation relationships'] },
    { step: 4, title: 'Polymorphic Dispatch', tasks: ['Implement batch report generator iterating List<Person>'] },
  ],
  testCases: [
    { description: 'Polymorphic report', input: 'List<Person> people = List.of(new Student(...), new Professor(...))', expectedOutput: 'Distinct report formats executed via dynamic dispatch' },
    { description: 'Encapsulation guard', input: 'student.setGPA(-1.0)', expectedOutput: 'IllegalArgumentException: GPA must be between 0.0 and 4.0' },
  ],
  evaluationCriteria: [
    'Proper use of super() constructor chaining.',
    'Zero public fields in domain model.',
    'Proper distinction between composition (Course) and aggregation (Professor).',
  ],
  extensions: [
    'Add Java 21 Records for GradeReport immutable transfer objects.',
    'Add Sealed Interface hierarchy for StudentStatus (Active, Graduated, Suspended).',
  ],
};

// ============================================================================
// STAGE 4: CORE JAVA AND DATA STRUCTURES
// ============================================================================
export const STAGE_4_PROJECT: MasteryProject = {
  id: 'proj-stage-4',
  stageId: 4,
  title: 'Library Catalog & Resource Lending System',
  difficulty: 'Intermediate',
  estimatedHours: 8,
  problemStatement:
    'Develop an in-memory library management engine leveraging the Java Collections Framework (ArrayList, LinkedList, HashMap, TreeSet). Implement generic repository interfaces, robust checked and unchecked exception hierarchies, and efficient indexing by ISBN and author.',
  requirements: [
    'Generic repository interface Repository<T, ID> implemented with HashMap indexing.',
    'Fast ISBN lookup in O(1) time complexity using HashMap<String, Book>.',
    'Sort books dynamically by title, author, or publication year using Comparator<Book>.',
    'Custom exception hierarchy: BookNotFoundException, BookAlreadyBorrowedException, MaxBorrowLimitExceededException.',
    'Use PriorityQueue to manage patron reservation waitlists.',
  ],
  architectureOverview:
    'Domain repository pattern with collections for storage and custom exception defense.',
  suggestedClassStructure: [
    {
      className: 'BookRepository',
      role: 'In-memory collection store with dual indexing (ID map + title sorted set)',
      methods: ['save(Book b)', 'findById(String isbn)', 'findByAuthor(String author)', 'delete(String isbn)'],
    },
    {
      className: 'LendingService',
      role: 'Business rules for checkout, return, waitlists, and fine calculation',
      methods: ['borrowBook(String patronId, String isbn)', 'returnBook(String patronId, String isbn)'],
    },
    {
      className: 'WaitlistManager',
      role: 'PriorityQueue implementation for queued book reservation orders',
      methods: ['enqueuePatron(String isbn, Patron p)', 'popNextInLine(String isbn)'],
    },
  ],
  milestones: [
    { step: 1, title: 'Generics & Repository', tasks: ['Build Repository<T, ID> interface and in-memory map store'] },
    { step: 2, title: 'Exceptions Hierarchy', tasks: ['Create custom exceptions and robust error boundaries'] },
    { step: 3, title: 'Collection Lookups', tasks: ['Implement HashSet for uniqueness and PriorityQueue for waitlists'] },
  ],
  testCases: [
    { description: 'Borrow borrowed book', input: 'borrowBook("P1", "ISBN-101") twice', expectedOutput: 'throws BookAlreadyBorrowedException' },
    { description: 'O(1) catalog search', input: 'catalog.findById("ISBN-999")', expectedOutput: 'Optional.empty()' },
  ],
  evaluationCriteria: [
    'Proper override of equals() and hashCode() on Book and Patron classes.',
    'Zero raw collection types (strict generics type safety).',
    'Clean try-with-resources and exception propagation.',
  ],
  extensions: [
    'Add file persistence using JSON serialization.',
    'Implement full-text title keyword search using inverted index Map<String, Set<Book>>.',
  ],
};

// ============================================================================
// STAGE 5: ADVANCED JAVA AND JVM
// ============================================================================
export const STAGE_5_PROJECT: MasteryProject = {
  id: 'proj-stage-5',
  stageId: 5,
  title: 'High-Performance Log Processing & Analytics Engine',
  difficulty: 'Advanced',
  estimatedHours: 10,
  problemStatement:
    'Build a high-throughput server log parser and analytics pipeline utilizing Java NIO.2 file channels, the Java Stream API, lambdas, and memory-efficient streaming to process gigabyte-scale access logs without encountering OutOfMemoryError.',
  requirements: [
    'Stream large log files lazily line-by-line using Files.lines() and BufferedReader.',
    'Filter, parse, and aggregate metrics using Java Stream collectors (groupingBy, counting, averagingDouble).',
    'Extract top 10 most visited endpoints, HTTP 4xx/5xx error rates, and peak traffic hours.',
    'Use Java 21 Sealed Interfaces to represent LogEntry subtypes (StandardHttpLog, SecurityEventLog, SystemAuditLog).',
    'Generate aggregated JSON and CSV report summaries.',
  ],
  architectureOverview:
    'Lazy streaming pipeline minimizing heap footprint by avoiding buffering entire files into memory.',
  suggestedClassStructure: [
    {
      className: 'LogParser',
      role: 'Regex-based parser converting raw text lines into immutable LogEntry records',
      methods: ['parseLine(String line)', 'streamFile(Path path)'],
    },
    {
      className: 'LogAnalyticsPipeline',
      role: 'Stream transformations, filtering, and statistical collectors',
      methods: ['calculateTopEndpoints(Stream<LogEntry> logs, int limit)', 'computeErrorRate(Stream<LogEntry> logs)'],
    },
    {
      className: 'ReportWriter',
      role: 'NIO.2 asynchronous file output generation',
      methods: ['writeSummaryReport(Path destination, AnalyticsSummary summary)'],
    },
  ],
  milestones: [
    { step: 1, title: 'Lazy NIO.2 File Streaming', tasks: ['Implement Files.lines() with try-with-resources cleanup'] },
    { step: 2, title: 'Stream Analytics & Lambdas', tasks: ['Build collectors for status code aggregations and percentiles'] },
    { step: 3, title: 'Sealed Class Hierarchy', tasks: ['Model LogEntry with Java 21 Pattern Matching switch expressions'] },
  ],
  testCases: [
    { description: 'Memory overhead test', input: 'Process 1GB log with -Xmx64m', expectedOutput: 'Completes successfully without OutOfMemoryError' },
    { description: '404 rate aggregation', input: '100 requests with 10 404s', expectedOutput: 'Error rate: 10.0%' },
  ],
  evaluationCriteria: [
    'Constant memory footprint irrespective of file size.',
    'Effective use of Stream parallel() where CPU-bound processing is beneficial.',
    'Clean resource closure avoiding file descriptor leaks.',
  ],
  extensions: [
    'Add GZIP compressed log file decompression on the fly.',
    'Export interactive SVG traffic charts.',
  ],
};

// ============================================================================
// STAGE 6: MULTITHREADING AND CONCURRENCY
// ============================================================================
export const STAGE_6_PROJECT: MasteryProject = {
  id: 'proj-stage-6',
  stageId: 6,
  title: 'Concurrent Multi-Threaded Task Processor & Crawler',
  difficulty: 'Advanced',
  estimatedHours: 12,
  problemStatement:
    'Architect a resilient concurrent task processing framework utilizing Java 21 Virtual Threads (Project Loom), thread pools (ExecutorService), concurrent data structures (ConcurrentHashMap, BlockingQueue), and CompletableFuture for non-blocking asynchronous pipeline execution.',
  requirements: [
    'Implement a thread-safe task queue using BlockingQueue with Producer-Consumer architecture.',
    'Compare throughput between standard OS threads (Executors.newFixedThreadPool) and Java 21 Virtual Threads (Executors.newVirtualThreadPerTaskExecutor).',
    'Ensure thread safety using AtomicInteger, ReentrantLock, and volatile memory visibility guards.',
    'Compose asynchronous task chains using CompletableFuture (thenApply, thenCompose, allOf).',
    'Demonstrate graceful shutdown with awaitTermination and Poison Pill queue handling.',
  ],
  architectureOverview:
    'Producer-Consumer pipeline with concurrent hash tables and virtual thread workers.',
  suggestedClassStructure: [
    {
      className: 'TaskDispatcher',
      role: 'Coordinates worker executors and orchestrates queue polling',
      methods: ['submitTask(Task t)', 'startProcessing()', 'shutdownGracefully()'],
    },
    {
      className: 'WorkerPool',
      role: 'Manages virtual and platform thread workers',
      methods: ['executeWorker(Runnable r)', 'getActiveThreadCount()'],
    },
    {
      className: 'TaskMetricsCollector',
      role: 'Thread-safe telemetry tracking throughput, latency, and failures',
      methods: ['recordSuccess(long durationMs)', 'recordFailure()', 'getMetricsSummary()'],
    },
  ],
  milestones: [
    { step: 1, title: 'Producer-Consumer Queue', tasks: ['Build BlockingQueue coordination with backpressure'] },
    { step: 2, title: 'Virtual Thread Execution', tasks: ['Implement Java 21 newVirtualThreadPerTaskExecutor pool'] },
    { step: 3, title: 'Asynchronous Composition', tasks: ['Chain tasks with CompletableFuture and handle exceptions'] },
    { step: 4, title: 'Stress & Benchmark', tasks: ['Simulate 10,000 concurrent tasks and verify zero race conditions'] },
  ],
  testCases: [
    { description: 'Thread safety verification', input: '1,000 threads incrementing shared counter 1,000 times', expectedOutput: 'Exact counter = 1,000,000' },
    { description: 'Virtual thread scale', input: '10,000 concurrent sleeping tasks', expectedOutput: 'Runs in < 2 seconds with negligible memory' },
  ],
  evaluationCriteria: [
    'Zero deadlock, livelock, or race conditions under high concurrency.',
    'Proper handling of InterruptedException.',
    'Clear telemetry report contrasting virtual vs platform thread throughput.',
  ],
  extensions: [
    'Add rate-limiting token bucket algorithm.',
    'Implement distributed work-stealing algorithm.',
  ],
};

// ============================================================================
// STAGE 7: BACKEND AND ENTERPRISE JAVA
// ============================================================================
export const STAGE_7_PROJECT: MasteryProject = {
  id: 'proj-stage-7',
  stageId: 7,
  title: 'Database-Connected Full Spring Boot REST API Platform',
  difficulty: 'Expert',
  estimatedHours: 14,
  problemStatement:
    'Construct a complete production-ready RESTful web service using Spring Boot 3.x, Spring Data JPA, Hibernate, and an H2/PostgreSQL database. Implement CRUD endpoints, DTO mapping, Bean Validation, custom exception handling, and database transactions.',
  requirements: [
    'Spring Boot 3.3+ backend with @RestController, @Service, and @Repository tiers.',
    'Relational entity mappings (@Entity, @Table, @OneToMany, @ManyToOne, @JoinColumn).',
    'Input validation with jakarta.validation (@NotNull, @Size, @Email, @Min).',
    'Global exception handler with @RestControllerAdvice and RFC 7807 ProblemDetail format.',
    'Database migration and seeding with comprehensive repository queries.',
  ],
  architectureOverview:
    'Enterprise 3-tier REST architecture: Controller -> Service -> Repository -> Relational Database.',
  suggestedClassStructure: [
    {
      className: 'ProductController',
      role: 'Exposes HTTP REST endpoints (GET, POST, PUT, DELETE) with status codes',
      methods: ['getAllProducts()', 'getProductById(Long id)', 'createProduct(ProductDto dto)', 'deleteProduct(Long id)'],
    },
    {
      className: 'ProductService',
      role: 'Business rules, transactional boundaries (@Transactional), and DTO conversions',
      methods: ['findProduct(Long id)', 'saveProduct(ProductDto dto)', 'updateStock(Long id, int quantity)'],
    },
    {
      className: 'ProductRepository',
      role: 'Spring Data JPA interface with custom JPQL queries',
      methods: ['findByCategory(String category)', 'findLowStockProducts(int threshold)'],
    },
  ],
  milestones: [
    { step: 1, title: 'Spring Boot Bootstrapping', tasks: ['Set up dependencies, application.properties, and DB connection'] },
    { step: 2, title: 'Entities & Repositories', tasks: ['Model relational schemas and Spring Data JPA interfaces'] },
    { step: 3, title: 'Services & DTO Validation', tasks: ['Implement service layer with DTO record mapping and validation'] },
    { step: 4, title: 'REST Controllers & Exception Advice', tasks: ['Build endpoints and global error response handling'] },
  ],
  testCases: [
    { description: 'Invalid input test', input: 'POST with negative price', expectedOutput: 'HTTP 400 Bad Request with validation errors' },
    { description: 'Item not found', input: 'GET /api/products/9999', expectedOutput: 'HTTP 404 Not Found with ProblemDetail' },
  ],
  evaluationCriteria: [
    'Strict separation of concerns between Controller, Service, and Repository.',
    'Entity classes never leaked directly to HTTP response (DTO pattern enforced).',
    'All transactional business operations annotated with @Transactional.',
  ],
  extensions: [
    'Add Spring Security with JWT token authentication.',
    'Add Swagger/OpenAPI interactive API documentation.',
  ],
};

// ============================================================================
// STAGE 8: PROFESSIONAL JAVA ENGINEERING
// ============================================================================
export const STAGE_8_PROJECT: MasteryProject = {
  id: 'proj-stage-8',
  stageId: 8,
  title: 'Production-Grade Capstone Enterprise Backend System',
  difficulty: 'Expert',
  estimatedHours: 20,
  problemStatement:
    'Deliver an enterprise-grade microservice architecture featuring Clean Architecture, GoF design patterns (Strategy, Factory, Builder, Observer), automated unit & integration testing with JUnit 5 and Mockito, containerization with Docker, and Actuator metrics.',
  requirements: [
    'Implement Clean / Hexagonal Architecture separating core domain from infrastructure adapters.',
    'Apply GoF design patterns: Strategy for pricing/discount strategies, Factory for payment providers.',
    '100% test coverage for core domain services with JUnit 5 and Mockito mocks.',
    'Multi-stage Dockerfile packaging production JAR with minimal JRE footprint.',
    'Health checks, custom metrics, and Prometheus scrape endpoints via Spring Boot Actuator.',
  ],
  architectureOverview:
    'Hexagonal Domain-Driven Design (DDD) with clean ports and adapters, comprehensive testing, and container deployment.',
  suggestedClassStructure: [
    {
      className: 'OrderProcessingUseCase',
      role: 'Core domain port defining business transaction flow',
      methods: ['executeOrder(OrderCommand command)'],
    },
    {
      className: 'PaymentStrategyFactory',
      role: 'Factory creating appropriate payment strategy based on provider configuration',
      methods: ['getStrategy(PaymentType type)'],
    },
    {
      className: 'OrderServiceTest',
      role: 'JUnit 5 and Mockito unit tests asserting business logic under simulated failure conditions',
      methods: ['shouldProcessOrderSuccessfully()', 'shouldRollbackWhenPaymentFails()'],
    },
  ],
  milestones: [
    { step: 1, title: 'Hexagonal Domain Model', tasks: ['Build pure Java domain entities with zero framework dependencies'] },
    { step: 2, title: 'Design Patterns Integration', tasks: ['Implement Strategy, Builder, and Factory patterns'] },
    { step: 3, title: 'Comprehensive Testing Suite', tasks: ['Author unit tests, Mockito mocks, and integration verification'] },
    { step: 4, title: 'Production Containerization', tasks: ['Author multi-stage Dockerfile and configure Spring Actuator'] },
  ],
  testCases: [
    { description: 'Payment failure rollback', input: 'Simulate credit card gateway decline', expectedOutput: 'Order marked FAILED, stock restored, zero DB corruption' },
    { description: 'Actuator health', input: 'GET /actuator/health', expectedOutput: 'HTTP 200 {"status": "UP"}' },
  ],
  evaluationCriteria: [
    'Complete decoupling of domain logic from database and HTTP frameworks.',
    'Zero test failures across entire test suite.',
    'Production Docker container runs securely as non-root user.',
  ],
  extensions: [
    'Add Kafka / RabbitMQ asynchronous event streaming.',
    'Implement OpenTelemetry distributed tracing spans.',
  ],
};

// ============================================================================
// COMPLETE 8-STAGE CURRICULUM DEFINITION
// ============================================================================
export const MASTERY_STAGES: MasteryStage[] = [
  {
    id: 1,
    number: 1,
    title: 'Java Foundations',
    subtitle: 'Syntax, Memory & Platform Architecture',
    description:
      'Master the Java runtime environment, JVM memory regions, primitive data types, bit widths, operators, and basic compilation mechanics from the ground up.',
    durationWeeks: '2 Weeks',
    modules: [
      {
        id: 'mod-1-1',
        stageId: 1,
        title: 'Introduction to Java Ecosystem',
        description: 'Understand JDK, JRE, JVM, bytecode compilation, and the JIT compiler.',
        topicIds: ['foundations-jvm', 'foundations-bytecode'],
      },
      {
        id: 'mod-1-2',
        stageId: 1,
        title: 'Variables, Data Types & Memory',
        description: 'Primitive values, bit widths, IEEE 754 floating point, and reference variables.',
        topicIds: ['foundations-variables', 'foundations-casting'],
      },
      {
        id: 'mod-1-3',
        stageId: 1,
        title: 'Operators & Evaluation Rules',
        description: 'Arithmetic, logical, bitwise operators, and expression evaluation precedence.',
        topicIds: ['foundations-operators'],
      },
    ],
    projectMilestone: STAGE_1_PROJECT,
  },
  {
    id: 2,
    number: 2,
    title: 'Programming Logic and Problem Solving',
    subtitle: 'Control Flow, Methods & Memory Buffers',
    description:
      'Develop algorithmic problem-solving abilities using structured branching, loops, method call stacks, pass-by-value semantics, and arrays.',
    durationWeeks: '3 Weeks',
    modules: [
      {
        id: 'mod-2-1',
        stageId: 2,
        title: 'Control Flow & Branching',
        description: 'if-else hierarchies, switch expressions, loops, and jump statements.',
        topicIds: ['logic-control-flow', 'logic-switch-java21'],
      },
      {
        id: 'mod-2-2',
        stageId: 2,
        title: 'Methods, Stack Frames & Recursion',
        description: 'Method invocation, parameter passing semantics, stack frame mechanics, and recursion.',
        topicIds: ['logic-methods-stack', 'logic-pass-by-value'],
      },
      {
        id: 'mod-2-3',
        stageId: 2,
        title: 'Arrays & String Immutability',
        description: 'Contiguous array memory, 2D jagged arrays, and String intern pool mechanics.',
        topicIds: ['logic-arrays', 'logic-string-pool'],
      },
    ],
    projectMilestone: STAGE_2_PROJECT,
  },
  {
    id: 3,
    number: 3,
    title: 'Object-Oriented Programming',
    subtitle: 'The 4 Pillars, Contracts & Dynamic Dispatch',
    description:
      'Internalize Object-Oriented design: class blueprints, heap instances, encapsulation, inheritance hierarchies, runtime polymorphism, and interface contracts.',
    durationWeeks: '4 Weeks',
    modules: [
      {
        id: 'mod-3-1',
        stageId: 3,
        title: 'Classes, Objects & Heap Allocation',
        description: 'Object identity, state, constructors, and the new allocation operator.',
        topicIds: ['oop-classes-objects', 'oop-constructors'],
      },
      {
        id: 'mod-3-2',
        stageId: 3,
        title: 'Encapsulation & Access Modifiers',
        description: 'Data hiding, class invariants, access levels, and Java 21 Records.',
        topicIds: ['oop-encapsulation', 'oop-records'],
      },
      {
        id: 'mod-3-3',
        stageId: 3,
        title: 'Inheritance & Dynamic Method Dispatch',
        description: 'Class extension, method overriding, super calls, and virtual method tables.',
        topicIds: ['oop-inheritance', 'oop-polymorphism'],
      },
      {
        id: 'mod-3-4',
        stageId: 3,
        title: 'Abstraction & Interfaces',
        description: 'Abstract classes, interface contracts, multiple implementation, and default methods.',
        topicIds: ['oop-abstraction', 'oop-interfaces'],
      },
      {
        id: 'mod-3-5',
        stageId: 3,
        title: 'Object Association & Lifecycle',
        description: 'Composition vs Aggregation, dependency relationships, and object coupling.',
        topicIds: ['oop-composition-aggregation'],
      },
    ],
    projectMilestone: STAGE_3_PROJECT,
  },
  {
    id: 4,
    number: 4,
    title: 'Core Java and Data Structures',
    subtitle: 'Collections, Generics & Exception Defense',
    description:
      'Master the Java Collections Framework (Lists, Sets, Maps), generic type safety, and defensive programming with checked and unchecked exceptions.',
    durationWeeks: '3 Weeks',
    modules: [
      {
        id: 'mod-4-1',
        stageId: 4,
        title: 'Java Collections Framework',
        description: 'ArrayList vs LinkedList, HashMap internals, HashSet, and tree structures.',
        topicIds: ['core-collections', 'core-hashmap-internals'],
      },
      {
        id: 'mod-4-2',
        stageId: 4,
        title: 'Generics & Type Erasure',
        description: 'Generic classes, methods, bounded wildcards (? extends / ? super), and JVM erasure.',
        topicIds: ['core-generics'],
      },
      {
        id: 'mod-4-3',
        stageId: 4,
        title: 'Exception Handling Architecture',
        description: 'Checked vs unchecked exceptions, try-with-resources, stack unwinding, and custom errors.',
        topicIds: ['core-exceptions'],
      },
    ],
    projectMilestone: STAGE_4_PROJECT,
  },
  {
    id: 5,
    number: 5,
    title: 'Advanced Java and JVM',
    subtitle: 'Garbage Collection, NIO.2 & Functional Streams',
    description:
      'Explore JVM internals, memory generational layout, Garbage Collection (G1/ZGC), NIO.2 file channels, and functional programming with Streams and Lambdas.',
    durationWeeks: '3 Weeks',
    modules: [
      {
        id: 'mod-5-1',
        stageId: 5,
        title: 'JVM Memory Architecture & GC',
        description: 'Young/Tenured generations, Metaspace, GC roots, and reachability traversal.',
        topicIds: ['adv-jvm-memory', 'adv-garbage-collection'],
      },
      {
        id: 'mod-5-2',
        stageId: 5,
        title: 'Java I/O & NIO.2 Channels',
        description: 'Byte and character streams, Files, Paths, Buffers, and non-blocking I/O.',
        topicIds: ['adv-nio'],
      },
      {
        id: 'mod-5-3',
        stageId: 5,
        title: 'Functional Java & Streams API',
        description: 'Functional interfaces, lambda expressions, Stream pipelines, and collectors.',
        topicIds: ['adv-streams'],
      },
    ],
    projectMilestone: STAGE_5_PROJECT,
  },
  {
    id: 6,
    number: 6,
    title: 'Multithreading and Concurrency',
    subtitle: 'Threads, Synchronization & Virtual Threads',
    description:
      'Build robust concurrent programs: thread lifecycles, synchronization locks, thread pools, CompletableFuture, and Java 21 lightweight Virtual Threads.',
    durationWeeks: '3 Weeks',
    modules: [
      {
        id: 'mod-6-1',
        stageId: 6,
        title: 'Thread Fundamentals & Synchronization',
        description: 'Thread states, Runnable, synchronized blocks, intrinsic monitor locks, and volatile.',
        topicIds: ['concurr-thread-lifecycle', 'concurr-synchronization'],
      },
      {
        id: 'mod-6-2',
        stageId: 6,
        title: 'Executors & Concurrent Utilities',
        description: 'ExecutorService, thread pools, ConcurrentHashMap, and CompletableFuture.',
        topicIds: ['concurr-executors'],
      },
      {
        id: 'mod-6-3',
        stageId: 6,
        title: 'Java 21 Virtual Threads (Project Loom)',
        description: 'Carrier threads, non-blocking I/O scaling, and lightweight concurrency.',
        topicIds: ['concurr-virtual-threads'],
      },
    ],
    projectMilestone: STAGE_6_PROJECT,
  },
  {
    id: 7,
    number: 7,
    title: 'Backend and Enterprise Java',
    subtitle: 'Spring Boot, REST APIs & Relational JPA',
    description:
      'Develop modern enterprise web services: Spring Boot 3, Dependency Injection, REST APIs, Spring Data JPA, Hibernate ORM, and database transactions.',
    durationWeeks: '4 Weeks',
    modules: [
      {
        id: 'mod-7-1',
        stageId: 7,
        title: 'Relational Persistence & JDBC',
        description: 'Database connections, connection pools (HikariCP), PreparedStatements, and transactions.',
        topicIds: ['ent-jdbc-transactions'],
      },
      {
        id: 'mod-7-2',
        stageId: 7,
        title: 'Spring Boot 3 Core Architecture',
        description: 'Inversion of Control (IoC), Dependency Injection, Beans, and Auto-configuration.',
        topicIds: ['ent-spring-core'],
      },
      {
        id: 'mod-7-3',
        stageId: 7,
        title: 'RESTful APIs & Spring Data JPA',
        description: 'Controllers, DTOs, Bean validation, entity relationships, and repositories.',
        topicIds: ['ent-rest-jpa'],
      },
    ],
    projectMilestone: STAGE_7_PROJECT,
  },
  {
    id: 8,
    number: 8,
    title: 'Professional Java Engineering',
    subtitle: 'Architecture, Testing & Production Systems',
    description:
      'Ship production-ready software: GoF Design Patterns, Clean Architecture, JUnit 5 / Mockito automated testing, Docker containers, and observability.',
    durationWeeks: '3 Weeks',
    modules: [
      {
        id: 'mod-8-1',
        stageId: 8,
        title: 'Software Design Patterns',
        description: 'Creational, Structural, and Behavioral patterns (Singleton, Factory, Builder, Strategy).',
        topicIds: ['prof-design-patterns'],
      },
      {
        id: 'mod-8-2',
        stageId: 8,
        title: 'Automated Testing & Quality',
        description: 'Unit testing with JUnit 5, mocking with Mockito, and integration tests.',
        topicIds: ['prof-testing-junit'],
      },
      {
        id: 'mod-8-3',
        stageId: 8,
        title: 'Production Build, Docker & Metrics',
        description: 'Maven builds, multi-stage Dockerfiles, Spring Actuator, and Prometheus monitoring.',
        topicIds: ['prof-docker-metrics'],
      },
    ],
    projectMilestone: STAGE_8_PROJECT,
  },
];
