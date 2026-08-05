import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, ChevronRight, ChevronLeft, ArrowLeft, BookOpen, Map, Code2, Terminal,
  HelpCircle, Trophy, Briefcase, Download, Lock, ChevronDown,
  ChevronUp, Clock, CheckCircle, Play, Copy, Bookmark, BarChart2,
  Zap, Star, Users, Lightbulb, Target, Layers, Globe, Database,
  Award, AlertTriangle, Info, TrendingUp, FileText, FolderOpen,
  RotateCcw, ArrowRight, Check, X, Eye, EyeOff, Search
} from 'lucide-react';
import { TECH_LOGOS } from '../components/sections/TechLogos';
import TechnologyLogo from '../components/ui/TechnologyLogo';
import '../styles/JavaLearningHub.css';

/* ============================================================
   DATA LAYER
   ============================================================ */

const JAVA_LESSONS = [
  { id: 1, title: 'Introduction', diff: 'Easy', time: '20 min', phase: 'beginner', prereq: 'None',
    desc: 'History of Java, features (platform independence, OOP), and JVM architecture.',
    theory: `Java is a high-level, class-based, object-oriented programming language developed by James Gosling at Sun Microsystems in 1995. It was designed to have as few implementation dependencies as possible.\n\nJava is famous for its "Write Once, Run Anywhere" (WORA) philosophy. This is achieved by compiling Java source code into bytecode, which runs on any platform equipped with a Java Virtual Machine (JVM).\n\nKey features: object-oriented, platform-independent, secure, robust, multithreaded, architecture-neutral, and automatic garbage collection.`,
    code: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        System.out.println("Welcome to Java Programming!");\n    }\n}`,
    output: `Hello, World!\nWelcome to Java Programming!`,
    note: 'Every Java application must have a main method inside a class. Execution always starts from this main method.',
    warning: 'The public class name must match the filename exactly (e.g. HelloWorld class must be in HelloWorld.java).',
    tip: 'Use System.out.println() to print text followed by a newline, or System.out.print() to print without a newline.',
    interviewTip: '"Why is Java platform independent?" — Explain that Java source code compiles to intermediate bytecode (.class files) which is executed by the JVM on any OS.',
    mistakes: ['Mismatched class name and filename', 'Missing public static void main method signature', 'Forgetting public keyword on main method'],
    summary: 'Java is a secure, platform-independent object-oriented language that compiles source code to bytecode which is executed on the JVM.'
  },
  { id: 2, title: 'JDK Installation', diff: 'Easy', time: '25 min', phase: 'beginner', prereq: 'Introduction',
    desc: 'Setting up JDK, configuring JAVA_HOME environment variable, compile and run instructions.',
    theory: `The Java Development Kit (JDK) contains tools for developing and running Java programs. It includes the Java Runtime Environment (JRE) and tools like the compiler (javac) and launcher (java).\n\nTo develop Java apps, download and install JDK (e.g. OpenJDK or Oracle JDK), and add the bin directory path to the system path environment variable. Set JAVA_HOME pointing to the JDK root.`,
    code: `// Compile program in terminal:\n// javac HelloWorld.java\n\n// Run program in terminal:\n// java HelloWorld\n\npublic class JDKCheck {\n    public static void main(String[] args) {\n        System.out.println("JDK is working successfully!");\n        System.out.println("Java Version: " + System.getProperty("java.version"));\n    }\n}`,
    output: `JDK is working successfully!\nJava Version: 17.0.2`,
    note: 'The command "javac" runs the compiler, converting Java source code into JVM bytecode.',
    warning: 'Always compile first (javac filename.java) before executing the binary (java classname).',
    tip: 'Use newer JDK versions (11+) to run a single-file Java source program directly with: java HelloWorld.java (skipping javac step).',
    interviewTip: '"What is the difference between JDK, JRE, and JVM?" — JDK is development kit (JRE + tools), JRE is runtime environment (JVM + libraries), JVM is the engine executing bytecode.',
    mistakes: ['Not setting the PATH environment variable', 'Running "java classname.class" instead of "java classname"', 'Compiler not found error'],
    summary: 'Installing the JDK and setting up environment variables is required to compile and run Java programs locally.'
  },
  { id: 3, title: 'Variables', diff: 'Easy', time: '25 min', phase: 'beginner', prereq: 'JDK Installation',
    desc: 'Declaring variables, local vs. instance vs. static variables, type casting in Java.',
    theory: `A variable is a container that holds data. Java is statically typed, meaning all variables must be declared before use.\n\nJava variables are categorized into:\n1. Local: Declared inside a method, block, or constructor. No default values.\n2. Instance (Non-Static): Declared inside a class but outside methods. Initialized to default values.\n3. Static: Shared across all instances of a class.\n\nType casting is converting one data type to another: widening (automatic) vs narrowing (explicit).`,
    code: `public class VariablesDemo {\n    static int staticVar = 100; // Static variable\n    int instanceVar = 50;       // Instance variable\n\n    public static void main(String[] args) {\n        int localVar = 10;      // Local variable\n        System.out.println("Local: " + localVar);\n        System.out.println("Static: " + staticVar);\n\n        // Narrowing Type Casting (Double to Int)\n        double myDouble = 9.78;\n        int myInt = (int) myDouble;\n        System.out.println("Double: " + myDouble + " -> Int: " + myInt);\n    }\n}`,
    output: `Local: 10\nStatic: 100\nDouble: 9.78 -> Int: 9`,
    note: 'Static variables are loaded into memory once at class load time, instance variables are allocated whenever objects are instantiated.',
    warning: 'Local variables do not have default values. Using uninitialized local variables triggers compilation errors.',
    tip: 'Use camelCase naming conventions for Java variables, starting with a lowercase letter.',
    interviewTip: '"Can we declare a static variable inside a method?" — No, static variables are class-level entities and cannot be declared inside a method.',
    mistakes: ['Using local variables without initialization', 'Losing precision during narrowing cast without explicit cast syntax'],
    summary: 'Variables represent named memory slots. Java variables can be local, instance, or static, and type casting enables type conversion.'
  },
  { id: 4, title: 'Data Types', diff: 'Easy', time: '30 min', phase: 'beginner', prereq: 'Variables',
    desc: 'Primitive types vs. Reference types. Type bounds, sizes, and wrappers.',
    theory: `Java data types are split into Primitive and Reference types.\n\nPrimitives (Predefined & Fixed Size):\n- Integer types: byte (1B), short (2B), int (4B), long (8B).\n- Floating points: float (4B), double (8B).\n- Character: char (2B, UTF-16).\n- Boolean: boolean (1-bit logical).\n\nReference types point to objects (instances of classes, interfaces, or arrays) and default to null. Wrapper classes (Integer, Double, etc.) represent primitives as objects.`,
    code: `public class DataTypes {\n    public static void main(String[] args) {\n        // Primitive assignments\n        int count = 50000;\n        float price = 19.99f;\n        char grade = 'A';\n        boolean isJavaFun = true;\n\n        // Reference types\n        String message = "Java is fun!";\n        \n        System.out.println("Int size bounds: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);\n        System.out.println("Boolean flag: " + isJavaFun);\n        System.out.println("Reference String: " + message);\n    }\n}`,
    output: `Int size bounds: -2147483648 to 2147483647\nBoolean flag: true\nReference String: Java is fun!`,
    note: 'Java char uses 2 bytes because it supports Unicode characters, allowing representation of international symbols.',
    warning: 'Forgetting the "f" suffix for float literals (e.g. 3.14) causes a double-to-float compilation error.',
    tip: 'Use Wrapper classes when working with Collection frameworks (e.g., ArrayList<Integer>, not ArrayList<int>).',
    interviewTip: '"Is String a primitive data type in Java?" — No, String is a class (Reference type) in the java.lang package.',
    mistakes: ['Assigning decimal value to float without f suffix', 'Forgetting that Reference types default to null, causing NullPointerException'],
    summary: 'Primitives hold simple value states directly. Reference types point to objects. Wrappers bridge the gap.'
  },
  { id: 5, title: 'Operators', diff: 'Easy', time: '30 min', phase: 'beginner', prereq: 'Data Types',
    desc: 'Arithmetic, relational, logical, assignment, bitwise, shift, and ternary operators.',
    theory: `Operators perform calculations on variables and values. Java provides:\n- Arithmetic: +, -, *, /, %\n- Relational: ==, !=, <, >, <=, >=\n- Logical: &&, ||, !\n- Assignment: =, +=, -=, *=, /=, %=\n- Bitwise: &, |, ^, ~\n- Shift: <<, >>, >>>\n- Ternary: condition ? valueIfTrue : valueIfFalse`,
    code: `public class OperatorsDemo {\n    public static void main(String[] args) {\n        int x = 10, y = 3;\n        \n        // Modulo operator\n        System.out.println("x % y = " + (x % y)); // 1\n        \n        // Logical operator short-circuit\n        boolean check = (x > 5) && (y++ > 2);\n        System.out.println("check: " + check + ", y: " + y);\n        \n        // Ternary operator\n        int result = (x > y) ? x : y;\n        System.out.println("Greater value: " + result);\n    }\n}`,
    output: `x % y = 1\ncheck: true, y: 4\nGreater value: 10`,
    note: 'Java logical operators && and || support short-circuit evaluation, skipping right-hand operand evaluation when outcome is certain.',
    warning: 'Be careful with assignment operator = inside print statements, use relational == for comparison checks.',
    tip: 'Use shift operators (<< or >>) for fast division or multiplication by powers of 2.',
    interviewTip: '"Explain the difference between >> and >>> operators." — >> is signed right shift (preserves the sign bit), while >>> is unsigned right shift (fills left vacancies with zeros).',
    mistakes: ['Using single logical operators & or | when short-circuit && or || was intended', 'Precision loss during division of ints (e.g. 5/2 = 2)'],
    summary: 'Operators process variables. Understanding precedence, short-circuit logic, and types of operators ensures accurate arithmetic and logic.'
  },
  { id: 6, title: 'Control Statements', diff: 'Easy', time: '30 min', phase: 'beginner', prereq: 'Operators',
    desc: 'Decision making using if, if-else, else-if ladders, and switch-case statements.',
    theory: `Control statements govern execution flow. Java offers:\n- \`if\`: Executes a block if conditional statement is true.\n- \`if-else\`: Selects between two options.\n- \`else-if\`: Handles multiple branching statements.\n- \`switch-case\`: Evaluates expressions against constant values. Java switch supports primitive integers, characters, strings, and enums.`,
    code: `public class ControlStatements {\n    public static void main(String[] args) {\n        int score = 85;\n        String grade;\n        \n        if (score >= 90) {\n            grade = "A";\n        } else if (score >= 80) {\n            grade = "B";\n        } else {\n            grade = "C";\n        }\n        System.out.println("Grade: " + grade);\n        \n        // Switch statement\n        String day = "MON";\n        switch (day) {\n            case "MON":\n                System.out.println("Start of work week!");\n                break;\n            case "FRI":\n                System.out.println("Weekend is near!");\n                break;\n            default:\n                System.out.println("Midweek hustle!");\n        }\n    }\n}`,
    output: `Grade: B\nStart of work week!`,
    note: 'Java switch statement executes all statements from matching case downwards until break is reached (fall-through).',
    warning: 'Forgetting the break keyword in switch blocks triggers fall-through execution to next case statements.',
    tip: 'From Java 12 onwards, switch expressions are supported with arrow (->) syntax which does not require breaks.',
    interviewTip: '"What data types can be used inside a switch expression?" — byte, short, char, int, wrapper classes, String, and Enum types.',
    mistakes: ['Forgetting break in switch cases', 'Passing boolean conditions inside switch statement directly'],
    summary: 'Control statements alter sequential flow. if-else scales logic branch, while switch simplifies multi-value evaluation.'
  },
  { id: 7, title: 'Loops', diff: 'Easy', time: '35 min', phase: 'beginner', prereq: 'Control Statements',
    desc: 'Iterating using for, while, do-while, and enhanced-for loops. loop control.',
    theory: `Loops repeat blocks of statements based on conditions. Java has four loops:\n1. \`for\`: Best when iterations count is known.\n2. \`while\`: Condition checked before loop executes.\n3. \`do-while\`: Guaranteed to execute at least once.\n4. \`enhanced-for\` (for-each): Traverses arrays/collections easily.\n\nUse \`break\` to exit loop, \`continue\` to skip current iteration.`,
    code: `public class LoopsDemo {\n    public static void main(String[] args) {\n        // standard for loop\n        System.out.print("For loop: ");\n        for (int i = 1; i <= 3; i++) {\n            System.out.print(i + " ");\n        }\n        System.out.println();\n\n        // enhanced for loop\n        int[] numbers = {10, 20, 30};\n        System.out.print("Enhanced For: ");\n        for (int num : numbers) {\n            System.out.print(num + " ");\n        }\n        System.out.println();\n    }\n}`,
    output: `For loop: 1 2 3 \nEnhanced For: 10 20 30 `,
    note: 'The enhanced for-each loop is read-only. Modifying iteration variable does not modify original collection data elements.',
    warning: 'Ensure while loop conditions eventually evaluate to false to prevent runtime freeze due to infinite loops.',
    tip: 'Use break with label to exit out of nested loop structures directly.',
    interviewTip: '"How does do-while loop differ from while loop?" — do-while evaluates condition after body execution, executing code at least once.',
    mistakes: ['Off-by-one errors in loop boundaries', 'Accidentally placing semicolon at end of loop declaration (e.g. for(...);)'],
    summary: 'Loops iterate actions. for loop is structured, while and do-while handle conditional repeats, for-each simplifies collection reads.'
  },
  { id: 8, title: 'Methods', diff: 'Easy', time: '40 min', phase: 'beginner', prereq: 'Loops',
    desc: 'Declaring methods, arguments, return types, and method overloading rules.',
    theory: `A method is a collection of statements grouped to perform an operation. Java methods have parameters and return types.\n\nJava parameters are always passed by value (copies of references/primitives are passed, original reference variable pointer stays original).\n\nMethod Overloading allows multiple methods in the same class to share a name but differ in parameters (number, type, or order).`,
    code: `public class MethodsDemo {\n    public static void main(String[] args) {\n        System.out.println("Sum of 2 ints: " + add(5, 10));\n        System.out.println("Sum of 3 ints: " + add(5, 10, 15));\n    }\n\n    // Overloaded methods\n    public static int add(int a, int b) {\n        return a + b;\n    }\n    \n    public static int add(int a, int b, int c) {\n        return a + b + c;\n    }\n}`,
    output: `Sum of 2 ints: 15\nSum of 3 ints: 30`,
    note: 'Method overloading is static polymorphism resolved by compiler at compile time based on method signatures.',
    warning: 'Methods overloading cannot be done by changing ONLY the return type of the methods. Signature parameters must differ.',
    tip: 'Use static modifier for helper methods that do not need to read instance variables of the class.',
    interviewTip: '"Does Java pass arguments by value or reference?" — Java is strictly call-by-value. For objects, the copy of reference handles modification, but reference reassignment fails.',
    mistakes: ['Expecting parameter reassignment to change original variable reference in caller scope', 'Overloading methods with same parameters but differing return types'],
    summary: 'Methods define actions. Method overloading allows the same method name to process different parameter lists.'
  },
  { id: 9, title: 'Arrays', diff: 'Easy', time: '35 min', phase: 'beginner', prereq: 'Methods',
    desc: '1D and 2D arrays, bounds check, utility class Arrays, instantiation.',
    theory: `An array is a container object holding fixed number of values of single data type. Array elements are accessed via 0-based indices.\n\nJava arrays are dynamically created object structures in heap memory. \`java.util.Arrays\` provides helpers (sort, search, fill).`,
    code: `import java.util.Arrays;\n\npublic class ArraysDemo {\n    public static void main(String[] args) {\n        int[] numbers = {40, 10, 30, 20};\n        Arrays.sort(numbers);\n        System.out.println("Sorted array: " + Arrays.toString(numbers));\n        \n        // 2D Array Matrix\n        int[][] matrix = {{1, 2}, {3, 4}};\n        System.out.println("Matrix [1][0]: " + matrix[1][0]);\n    }\n}`,
    output: `Sorted array: [10, 20, 30, 40]\nMatrix [1][0]: 3`,
    note: 'Attempting to access indices beyond array size triggers ArrayIndexOutOfBoundsException, which is runtime runtime check.',
    warning: 'Arrays in Java are fixed size objects. Once instantiated, their size cannot be expanded.',
    tip: 'Use Arrays.copyOf() to copy or resize arrays, or migrate to ArrayList for dynamic resizing structures.',
    interviewTip: '"How are arrays stored in memory in Java?" — Array variable resides in stack, array elements/object values are created in Heap.',
    mistakes: ['Accessing index length instead of length-1', 'Treating array instance as dynamically resizeable container'],
    summary: 'Arrays store contiguous fixed-type collections. Memory checks prevent index overflows, java.util.Arrays utility optimizes sorting.'
  },
  { id: 10, title: 'Strings', diff: 'Easy', time: '35 min', phase: 'beginner', prereq: 'Arrays',
    desc: 'String immutability, Constant Pool, StringBuilder and StringBuffer details.',
    theory: `String class is immutable in Java — value cannot be altered after creation. Unused literals reside in String Constant Pool (SCP) to conserve heap memory.\n\nUse StringBuilder (non-synchronized, faster) or StringBuffer (synchronized, thread-safe) for frequent string modification loops.`,
    code: `public class StringsDemo {\n    public static void main(String[] args) {\n        String s1 = "Hello"; // Constant Pool\n        String s2 = "Hello"; \n        System.out.println("s1 == s2: " + (s1 == s2)); // true\n        \n        // StringBuilder for modifications\n        StringBuilder sb = new StringBuilder("Java");\n        sb.append(" Programming");\n        System.out.println("StringBuilder: " + sb);\n    }\n}`,
    output: `s1 == s2: true\nStringBuilder: Java Programming`,
    note: 'Use equals() for content comparison and == for reference comparison of String variables.',
    warning: 'Modifying standard String objects inside loop structures creates redundant garbage strings in the pool.',
    tip: 'Always use StringBuilder for concat operations inside iterative loop constructs.',
    interviewTip: '"Why are Strings immutable in Java?" — Security, Thread-safety, and Memory caching in the String Constant Pool.',
    mistakes: ['Using == to check if strings have equal text content', 'Performing heavy String concats with + inside loop blocks'],
    summary: 'Strings hold text. SCP optimizes duplicate storage. Immutability secures keys. StringBuilder optimizes fast concats.'
  },
  { id: 11, title: 'OOP', diff: 'Easy', time: '40 min', phase: 'beginner', prereq: 'Strings',
    desc: 'Classes, object instantiations, constructor overloading, and the static keyword.',
    theory: `Object-Oriented Programming (OOP) uses objects representing fields and methods. Java is multi-paradigm OOP.\n\nClasses serve as blueprint blueprints. Constructors initialize objects. static members belong to class itself rather than instances.`,
    code: `public class Student {\n    String name;\n    static String college = "BCA Dept";\n\n    // Constructor overloading\n    public Student(String name) {\n        this.name = name;\n    }\n\n    public static void main(String[] args) {\n        Student s = new Student("Alice");\n        System.out.println("Student: " + s.name + ", College: " + college);\n    }\n}`,
    output: `Student: Alice, College: BCA Dept`,
    note: 'this keyword references current active object instance. static variables can be shared globally.',
    warning: 'static methods cannot reference non-static variables/methods directly without creating object references.',
    tip: 'Use private fields and public getters/setters to implement Encapsulation design patterns.',
    interviewTip: '"What is constructor overloading?" — Defining multiple constructors in a class with different parameter lists.',
    mistakes: ['Referencing instance variables inside static blocks', 'Assuming constructor has return types'],
    summary: 'OOP organizes logic around classes and objects. Constructors instantiate fields, static keyword defines shared scopes.'
  },
  { id: 12, title: 'Inheritance', diff: 'Medium', time: '45 min', phase: 'intermediate', prereq: 'OOP',
    desc: 'Single, multilevel, and hierarchical inheritance, super keyword, constructor calls.',
    theory: `Inheritance allows one class to acquire properties (fields & methods) of another. Extends keyword establishes IS-A relation.\n\nJava supports Single, Multilevel, and Hierarchical inheritance, but does NOT support Multiple inheritance with classes to avoid ambiguity. super keyword references parent variables/constructors.`,
    code: `class Parent {\n    Parent() { System.out.println("Parent Constructor"); }\n}\n\nclass Child extends Parent {\n    Child() {\n        super(); // Call parent constructor\n        System.out.println("Child Constructor");\n    }\n\n    public static void main(String[] args) {\n        new Child();\n    }\n}`,
    output: `Parent Constructor\nChild Constructor`,
    note: 'If super() is not explicitly called in a subclass constructor, the compiler automatically inserts super() as the first statement.',
    warning: 'Private members of superclasses are not inherited directly. Access them using public getters and setters.',
    tip: 'Inheritance should only be used when an IS-A relationship exists between child and parent.',
    interviewTip: '"Why does Java not support multiple inheritance with classes?" — To prevent the Diamond Problem, where subclass inherits duplicate properties from multiple parents.',
    mistakes: ['Declaring extends on final classes (causes compile error)', 'Forgetting super() rules'],
    summary: 'Inheritance enables reuse. Extends links subclass to superclass. Multiple inheritance is banned for classes, super keyword accesses parent.'
  },
  { id: 13, title: 'Polymorphism', diff: 'Medium', time: '40 min', phase: 'intermediate', prereq: 'Inheritance',
    desc: 'Runtime overriding vs compile-time overloading, final keyword rules.',
    theory: `Polymorphism allows objects to take multiple forms. Compile-time (Method Overloading) is resolved by signatures. Runtime (Method Overriding) is resolved at runtime based on dynamic object type.\n\nfinal keyword prevents inheritance (final classes), overriding (final methods), or value changes (final variables).`,
    code: `class Animal {\n    void sound() { System.out.println("Animal sound"); }\n}\n\nclass Dog extends Animal {\n    @Override\n    void sound() { System.out.println("Bark"); } // Overridden method\n\n    public static void main(String[] args) {\n        Animal myDog = new Dog(); // Dynamic Method Dispatch\n        myDog.sound();\n    }\n}`,
    output: `Bark`,
    note: 'Dynamic Method Dispatch allows parent references to point to child objects, selecting subclass methods at execution time.',
    warning: 'Overriding methods cannot lower the visibility modifier of the parent method (e.g. public to protected).',
    tip: 'Always use @Override annotation to catch signature errors during compile time.',
    interviewTip: '"Can we override a static method?" — No, static methods are bound to classes and are hidden, not overridden (Method Hiding).',
    mistakes: ['Lowering accessibility of overridden method', 'Attempting to override final or static methods'],
    summary: 'Polymorphism executes dynamic behaviors. Overriding provides specific subclass actions, dynamic dispatch runs runtime selections.'
  },
  { id: 14, title: 'Abstraction', diff: 'Medium', time: '45 min', phase: 'intermediate', prereq: 'Polymorphism',
    desc: 'Abstract classes, abstract methods, and implementing design rules.',
    theory: `Abstraction hides implementation details and exposes essential attributes. Abstract classes cannot be instantiated.\n\nThey can contain abstract methods (signatures only) and concrete methods. Subclasses must implement all abstract methods.`,
    code: `abstract class Vehicle {\n    abstract void run(); // abstract method\n    void stop() { System.out.println("Vehicle stopped"); }\n}\n\nclass Car extends Vehicle {\n    void run() { System.out.println("Car is running safely"); }\n\n    public static void main(String[] args) {\n        Vehicle myCar = new Car();\n        myCar.run();\n        myCar.stop();\n    }\n}`,
    output: `Car is running safely\nVehicle stopped`,
    note: 'Abstract classes serve as incomplete skeletons for subclasses. They can declare constructor blocks.',
    warning: 'If a subclass fails to implement all abstract methods of its parent, it must also be declared abstract.',
    tip: 'Use abstract classes when subclasses share a common template and fields.',
    interviewTip: '"Can an abstract class have final methods?" — Yes, but it cannot have abstract final methods because they must be overridden.',
    mistakes: ['Attempting to instantiate abstract classes (e.g., new Vehicle())', 'Declaring private abstract methods'],
    summary: 'Abstraction enforces API specifications. Abstract classes serve as templates combining concrete and abstract methods.'
  },
  { id: 15, title: 'Interfaces', diff: 'Medium', time: '45 min', phase: 'intermediate', prereq: 'Abstraction',
    desc: 'Declaring interfaces, multiple interfaces, default and static Java 8 methods.',
    theory: `An interface is a complete abstract contract containing static constants and abstract methods. Class implements interfaces.\n\nJava supports Multiple inheritance via interfaces. Java 8 introduced default and static methods, and Java 9 added private methods inside interfaces.`,
    code: `interface Printer {\n    void print();\n    default void show() { System.out.println("Default Show method"); }\n}\n\nclass ConsolePrinter implements Printer {\n    public void print() { System.out.println("Printing to Console"); }\n\n    public static void main(String[] args) {\n        Printer p = new ConsolePrinter();\n        p.print();\n        p.show();\n    }\n}`,
    output: `Printing to Console\nDefault Show method`,
    note: 'All variables declared inside interfaces are implicitly public static final constants.',
    warning: 'All implementing methods must be declared public when defined inside implementation classes.',
    tip: 'Use functional interfaces (having single abstract method) for lambda expressions integrations.',
    interviewTip: '"What is the difference between Abstract Class and Interface?" — Interface supports multiple inheritance, variables are constant. Abstract classes support instance variables.',
    mistakes: ['Forgetting public keyword on implementing methods', 'Declaring static variables as mutable in interface classes'],
    summary: 'Interfaces represent abstract API contracts. Default methods resolve compatibility, multiple implementations are supported.'
  },
  { id: 16, title: 'Packages', diff: 'Medium', time: '35 min', phase: 'intermediate', prereq: 'Interfaces',
    desc: 'Creating packages, importing classes, and detailed access modifiers.',
    theory: `Packages organize classes into namespaces, preventing naming collisions. Import statements load classes.\n\nAccess modifiers controls visibility:\n- Private: Class only\n- Default: Package only\n- Protected: Package + subclass\n- Public: Global access`,
    code: `package com.bca.utils;\n\npublic class Helper {\n    public void message() {\n        System.out.println("Package Helper accessed successfully");\n    }\n    \n    // Access Modifiers Demo\n    private void privateTest() {}\n    protected void protectedTest() {}\n}`,
    output: `Package Helper accessed successfully`,
    note: 'The directory structure must match package namespaces (e.g. package com.bca.utils is in com/bca/utils/).',
    warning: 'If no access modifier is specified, Default access is used (package-private).',
    tip: 'Use reverse domain names for package names to ensure global uniqueness (e.g., com.google.projectName).',
    interviewTip: '"What is default access modifier?" — default means accessible within same package namespace only. Subclasses in other packages cannot access it.',
    mistakes: ['Placing package statement after import statements', 'Accessing package-private members in outside modules'],
    summary: 'Packages partition namespaces. Access modifiers secure classes, imports bind required APIs from packages.'
  },
  { id: 17, title: 'Exception Handling', diff: 'Medium', time: '40 min', phase: 'intermediate', prereq: 'Packages',
    desc: 'Try-catch-finally, checked vs unchecked exceptions, throw/throws keywords, custom exceptions.',
    theory: `Exception handling preserves runtime flow during failures. Java exceptions inherit from Throwable:\n- Checked: Inspected at compile time (IOException).\n- Unchecked: Checked at runtime (NullPointerException).\n\ntry block hosts code, catch catches failures, finally always executes. Throws declares errors, throw raises errors.`,
    code: `public class ExceptionDemo {\n    public static void main(String[] args) {\n        try {\n            int val = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println("Arithmetic Error: " + e.getMessage());\n        } finally {\n            System.out.println("Finally block executes");\n        }\n    }\n}`,
    output: `Arithmetic Error: / by zero\nFinally block executes`,
    note: 'Finally block executes even if try block returns value or throws uncaught exception.',
    warning: 'Never declare checked exceptions in throws if method does not throw them.',
    tip: 'Use try-with-resources (Java 7+) to automatically close connection resources.',
    interviewTip: '"What is the difference between checked and unchecked exceptions?" — Checked are checked at compile-time (forced try-catch), unchecked occur at runtime.',
    mistakes: ['Catching Exception superclass before subclass catches', 'Leaving resources open in catch blocks without finally'],
    summary: 'Exceptions protect execution. try-catch handles errors, finally closes resources, checked rules compile checks.'
  },
  { id: 18, title: 'Collections Framework', diff: 'Medium', time: '45 min', phase: 'intermediate', prereq: 'Exception Handling',
    desc: 'List, Set, Map collections, ArrayList, HashSet, HashMap implementations.',
    theory: `The Collection framework provides architectures to store and manipulate groups of objects. Core interfaces:\n- List: Ordered collection, duplicate values allowed (ArrayList, LinkedList).\n- Set: Unordered, no duplicates allowed (HashSet, LinkedHashSet).\n- Map: Key-Value pairs, unique keys (HashMap, TreeMap).`,
    code: `import java.util.*;\n\npublic class CollectionDemo {\n    public static void main(String[] args) {\n        // List Demo\n        List<String> list = new ArrayList<>();\n        list.add("BCA");\n        \n        // Map Demo\n        Map<Integer, String> map = new HashMap<>();\n        map.put(1, "Java");\n        \n        System.out.println("List: " + list);\n        System.out.println("Map Value: " + map.get(1));\n    }\n}`,
    output: `List: [BCA]\nMap Value: Java`,
    note: 'HashSet uses HashMap internally to store elements, mapping values to dummy keys.',
    warning: 'Collection classes store objects. Primitives must be wrapped using autoboxing.',
    tip: 'Use HashSet for fast membership checks, HashMap for indexing/lookup maps.',
    interviewTip: '"How does HashMap work internally?" — Uses buckets, hashcode mapping, and linked list/binary trees for collision resolutions.',
    mistakes: ['Using raw collections without specifying generics (e.g. List instead of List<String>)', 'Modifying collection inside foreach iteration'],
    summary: 'Collections organize heap memory. Lists preserve indexes, Sets enforce uniqueness, Maps map records using hashes.'
  },
  { id: 19, title: 'Generics', diff: 'Medium', time: '30 min', phase: 'intermediate', prereq: 'Collections Framework',
    desc: 'Type-safe generics, generic methods, bounded wildcards, type erasure.',
    theory: `Generics enable type parameterization, forcing compile-time checks and removing typecast needs. Wildcards represent bounds:\n- Upper bounded: <? extends T> (Reads)\n- Lower bounded: <? super T> (Writes)\n\nType Erasure removes type parameters during compiler stages.`,
    code: `public class GenericBox<T> {\n    private T value;\n    public void set(T value) { this.value = value; }\n    public T get() { return value; }\n\n    public static void main(String[] args) {\n        GenericBox<Integer> box = new GenericBox<>();\n        box.set(100);\n        System.out.println("Box Value: " + box.get());\n    }\n}`,
    output: `Box Value: 100`,
    note: 'Generics exist only for compile checks. Generated class files do not preserve parameter types.',
    warning: 'Static fields or static methods cannot declare type parameters of the class.',
    tip: 'Use List<? extends Number> to receive integer or double lists safely.',
    interviewTip: '"What is Type Erasure in Java?" — Compiler removes all generic type constraints and replaces them with Object classes.',
    mistakes: ['Attempting to instantiate generic types directly (e.g. new T())', 'Declaring primitive arguments inside generics'],
    summary: 'Generics enforce compile-time safety. Wildcards bind interfaces, type erasure replaces parameters with general Objects.'
  },
  { id: 20, title: 'File Handling', diff: 'Medium', time: '40 min', phase: 'intermediate', prereq: 'Generics',
    desc: 'FileReader, FileWriter, BufferedReader, BufferedWriter, Try-With-Resources.',
    theory: `File handling reads or writes disk streams. Java uses Character Streams (FileReader/Writer) and Byte Streams (FileInputStream/OutputStream).\n\nBufferedReader buffers data streams for efficient operations. Try-With-Resources automatically closes file handles.`,
    code: `import java.io.*;\n\npublic class FileDemo {\n    public static void main(String[] args) {\n        File file = new File("test.txt");\n        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {\n            writer.write("Java File Handling");\n            System.out.println("File written successfully");\n        } catch (IOException e) {\n            System.out.println("IO Error: " + e.getMessage());\n        }\n    }\n}`,
    output: `File written successfully`,
    note: 'Try-with-resources class must implement AutoCloseable interface to support auto cleanup.',
    warning: 'Always check if path target exists and permissions are valid to avoid Access Exceptions.',
    tip: 'Use java.nio.file.Files class for modern, utility-driven file operations.',
    interviewTip: '"Why should we use BufferedReader instead of FileReader?" — BufferedReader reads chunks of data into memory buffer, reducing disk calls.',
    mistakes: ['Not closing streams (leaks file handles)', 'Ignoring IOException handling requirements'],
    summary: 'File handling persists data. Buffered classes optimize throughput, try-with-resources automatically closes file handles.'
  },
  { id: 21, title: 'Multithreading', diff: 'Medium', time: '45 min', phase: 'intermediate', prereq: 'File Handling',
    desc: 'Thread vs Runnable, synchronization blocks, thread lifecycle, lock locks.',
    theory: `Multithreading runs parallel paths. Thread class and Runnable interface are standard ways to instantiate threads.\n\nSynchronization prevents thread collisions on shared resources. Thread lifecycle states: New, Runnable, Blocked, Waiting, Terminated.`,
    code: `class Task implements Runnable {\n    public void run() {\n        System.out.println("Thread running: " + Thread.currentThread().getName());\n    }\n\n    public static void main(String[] args) {\n        Thread thread = new Thread(new Task());\n        thread.start();\n    }\n}`,
    output: `Thread running: Thread-0`,
    note: 'Call start() to launch a new thread, call run() directly executes thread code inside active calling thread context.',
    warning: 'Shared mutable data must be synchronized, else race conditions will corrupt data values.',
    tip: 'Use volatile keyword to synchronize variable reads/writes directly in memory cache.',
    interviewTip: '"Difference between start() and run() method?" — start() allocates system resources and launches new thread. run() performs simple method call.',
    mistakes: ['Calling run() directly instead of start()', 'Using synchronization blocks excessively (causes deadlocks)'],
    summary: 'Multithreading accelerates tasks. Threads are configured using interfaces, synchronization locks shared heap structures.'
  },
  { id: 22, title: 'Streams', diff: 'Hard', time: '45 min', phase: 'advanced', prereq: 'Multithreading',
    desc: 'Java 8 Streams API, pipeline operations, lazy loading, filter, map, collect.',
    theory: `Streams API handles declarative sequence collections processing. Streams are pipelines:\n- Source: List, Set, or Array\n- Intermediate operations: filter, map, sorted (Lazy evaluation)\n- Terminal operations: collect, count, forEach (Executes query)`,
    code: `import java.util.*;\nimport java.util.stream.*;\n\npublic class StreamsDemo {\n    public static void main(String[] args) {\n        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);\n        List<Integer> evens = list.stream()\n                                  .filter(n -> n % 2 == 0)\n                                  .collect(Collectors.toList());\n        System.out.println("Evens: " + evens);\n    }\n}`,
    output: `Evens: [2, 4]`,
    note: 'Streams do not alter original collection memory structures. They consume data once and discard state.',
    warning: 'Attempting to re-use an already closed/terminated stream triggers IllegalStateException.',
    tip: 'Use parallelStream() to auto distribute processing loads across multiple CPU cores.',
    interviewTip: '"What are intermediate vs terminal operations in Streams?" — Intermediate return a stream (lazy). Terminal return non-stream type or void (executes).',
    mistakes: ['Reusing terminated Stream objects', 'Using stateful logic mapping inside lambda expressions'],
    summary: 'Streams perform declarative processing. Pipelines structure filtering, lazy execution delays calls until termination.'
  },
  { id: 23, title: 'Lambda Expressions', diff: 'Hard', time: '35 min', phase: 'advanced', prereq: 'Streams',
    desc: 'Functional interfaces, custom lambdas, block expressions, method references.',
    theory: `Lambda expressions represent functional interfaces anonymously (single abstract method classes). They support passing actions as arguments.\n\nMethod references (ClassName::methodName) serve as shorthand lambdas.`,
    code: `interface MathOperation {\n    int operate(int a, int b);\n}\n\npublic class Lambdas {\n    public static void main(String[] args) {\n        MathOperation add = (a, b) -> a + b; // Lambda\n        System.out.println("Result: " + add.operate(10, 20));\n    }\n}`,
    output: `Result: 30`,
    note: 'Lambdas are implemented in Java using invokedynamic instruction for maximum performance.',
    warning: 'Local variables referenced inside lambda bodies must be final or effectively final.',
    tip: 'Use Java built-in functional interfaces (Predicate, Function, Consumer, Supplier).',
    interviewTip: '"What is a Functional Interface?" — An interface having exactly one abstract method. Can declare any default or static methods.',
    mistakes: ['Modifying non-final variables inside lambda scopes', 'Declaring type parameters on lambda parameters unnecessarily'],
    summary: 'Lambdas model functions. Functional interfaces serve as targets, method references wrap parameters.'
  },
  { id: 24, title: 'JDBC', diff: 'Hard', time: '40 min', phase: 'advanced', prereq: 'Lambda Expressions',
    desc: 'DriverManager, Connections, Statement/PreparedStatement, executing sql queries.',
    theory: `Java Database Connectivity (JDBC) handles SQL database access. Execution flow:\n1. Load JDBC driver class\n2. Establish Connection (DriverManager.getConnection)\n3. Create Statements/PreparedStatements\n4. Execute queries & retrieve ResultSets\n5. Clean up connection resources`,
    code: `import java.sql.*;\n\npublic class JDBCDemo {\n    public static void main(String[] args) {\n        String url = "jdbc:mysql://localhost:3306/db";\n        // Try with resources close connection automatically\n        try (Connection conn = DriverManager.getConnection(url, "user", "pass");\n             Statement stmt = conn.createStatement()) {\n            System.out.println("Database connected successfully!");\n        } catch (SQLException e) {\n            System.out.println("SQL Exception: " + e.getMessage());\n        }\n    }\n}`,
    output: `Database connected successfully!`,
    note: 'PreparedStatement compiles SQL plans once, resolving SQL injection vulnerabilities.',
    warning: 'Always clean up Statement, ResultSet, and Connection handles to prevent connection pooling limits leak.',
    tip: 'Migrate to Spring JDBC / Hibernate ORM for production-level databases operations.',
    interviewTip: '"Difference between Statement and PreparedStatement?" — PreparedStatement compiled once (fast execution), uses parameter placeholder (?) preventing injection.',
    mistakes: ['Not catching SQLException requirement', 'Hardcoding variables in SQL strings instead of placeholders (?)'],
    summary: 'JDBC binds Java apps to SQL databases. DriverManager allocates connections, PreparedStatements compile plans secure against SQL injection.'
  }
];

const JAVA_PROGRAMS = [
  { id: 1, title: 'Java Hello World', cat: 'Basic', diff: 'Easy',
    desc: 'Prints Hello World text message on the terminal window console.',
    code: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    output: 'Hello, World!',
    explanation: 'Declares HelloWorld public class, executes entry point main method, calls System.out.println outputs text message.',
    complexity: 'O(1)', space: 'O(1)' },
  { id: 2, title: 'Sum of Two Numbers', cat: 'Basic', diff: 'Easy',
    desc: 'Read variables, calculate arithmetic sum, print result outputs.',
    code: `public class Sum {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = 20;\n        int total = a + b;\n        System.out.println("Sum: " + total);\n    }\n}`,
    output: 'Sum: 30',
    explanation: 'Initializes two integers a and b, calculates arithmetic addition, displays sum total variable value.',
    complexity: 'O(1)', space: 'O(1)' },
  { id: 3, title: 'Class Inheritance Demo', cat: 'OOP', diff: 'Easy',
    desc: 'Shows extends relationship subclass inherits parent variable.',
    code: `class Parent {\n    void display() { System.out.println("Parent class method"); }\n}\nclass Child extends Parent {\n    public static void main(String[] args) {\n        Child obj = new Child();\n        obj.display(); // Inherited method\n    }\n}`,
    output: 'Parent class method',
    explanation: 'Child extends Parent class, inherits display methods. Instantiation triggers parent display execution.',
    complexity: 'O(1)', space: 'O(1)' },
  { id: 4, title: 'Interface implementation', cat: 'OOP', diff: 'Medium',
    desc: 'Shows implements keyword mapping class to interface contract.',
    code: `interface Walkable {\n    void walk();\n}\nclass Person implements Walkable {\n    public void walk() {\n        System.out.println("Person walking...");\n    }\n    public static void main(String[] args) {\n        Walkable w = new Person();\n        w.walk();\n    }\n}`,
    output: 'Person walking...',
    explanation: 'Person overrides and defines walk contract declared inside Walkable interface. Dynamic binding executes walk.',
    complexity: 'O(1)', space: 'O(1)' },
  { id: 5, title: 'ArrayList traversal', cat: 'Collections', diff: 'Medium',
    desc: 'Traverse an Integer ArrayList elements using Iterator.',
    code: `import java.util.*;\npublic class ListDemo {\n    public static void main(String[] args) {\n        List<Integer> list = ArrayList.asList(1, 2, 3);\n        for (int val : list) {\n            System.out.print(val + " ");\n        }\n    }\n}`,
    output: '1 2 3 ',
    explanation: 'ArrayList initializes array wrapper, foreach traversal prints index value sequentially.',
    complexity: 'O(N)', space: 'O(N)' },
  { id: 6, title: 'HashMap mapping values', cat: 'Collections', diff: 'Medium',
    desc: 'Insert key-value records inside HashMap, retrieve value.',
    code: `import java.util.*;\npublic class MapDemo {\n    public static void main(String[] args) {\n        Map<String, String> map = new HashMap<>();\n        map.put("course", "BCA");\n        System.out.println(map.get("course"));\n    }\n}`,
    output: 'BCA',
    explanation: 'Inserts key course with value BCA, retrieves course key matching value BCA from hash registry.',
    complexity: 'O(1)', space: 'O(N)' },
  { id: 7, title: 'Multiple Thread Execution', cat: 'Multithreading', diff: 'Hard',
    desc: 'Execute concurrent paths by extending Thread class.',
    code: `class MyThread extends Thread {\n    public void run() {\n        System.out.println("Running: " + getName());\n    }\n    public static void main(String[] args) {\n        MyThread t1 = new MyThread();\n        MyThread t2 = new MyThread();\n        t1.start();\n        t2.start();\n    }\n}`,
    output: 'Running: Thread-0\nRunning: Thread-1',
    explanation: 'Extends Thread class, overrides run method. Calling start allocates scheduling resources running concurrently.',
    complexity: 'O(1)', space: 'O(1)' },
  { id: 8, title: 'JDBC statement check', cat: 'JDBC', diff: 'Hard',
    desc: 'Connect to database using JDBC DriverManager.',
    code: `import java.sql.*;\npublic class JDBC {\n    public static void main(String[] args) throws Exception {\n        Connection c = DriverManager.getConnection("jdbc:h2:mem:test", "sa", "");\n        System.out.println("Status: " + !c.isClosed());\n    }\n}`,
    output: 'Status: true',
    explanation: 'Initializes in-memory database connection using H2 driver, checks open status returns true.',
    complexity: 'O(1)', space: 'O(1)' }
];

const JAVA_PRACTICE_PROBLEMS = [
  { id: 1, title: 'Factorial of N', difficulty: 'Easy', tags: ['Math', 'Recursion'],
    desc: 'Write a Java program to calculate the factorial of a given integer N.',
    examples: [
      { input: 'N = 5', output: '120', explanation: '5! = 5 * 4 * 3 * 2 * 1 = 120' },
      { input: 'N = 0', output: '1' }
    ],
    constraints: ['0 <= N <= 20'],
    hint: 'Use a simple for loop iteration or recursion. For N > 20, integer values overflow, so use long type.' },
  { id: 2, title: 'Reverse a String', difficulty: 'Easy', tags: ['Strings'],
    desc: 'Write a Java program to reverse a given string without using built-in reverse methods.',
    examples: [
      { input: 'str = "hello"', output: '"olleh"' },
      { input: 'str = "BCA"', output: '"ACB"' }
    ],
    constraints: ['String length <= 1000', 'String contains printable ASCII characters'],
    hint: 'Convert string to char array, swap elements from both ends moving inward.' },
  { id: 3, title: 'Matrix Transpose', difficulty: 'Medium', tags: ['Arrays', 'Matrix'],
    desc: 'Transpose a given 2D integer matrix of size N x N in-place.',
    examples: [
      { input: 'matrix = [[1, 2], [3, 4]]', output: '[[1, 3], [2, 4]]' }
    ],
    constraints: ['1 <= N <= 100'],
    hint: 'Iterate over index i and j (where j > i), swap elements at matrix[i][j] with matrix[j][i].' }
];

const JAVA_QUIZ_DATA = {
  beginner: [
    { q: 'Which of the following is NOT a primitive data type in Java?',
      options: ['int', 'float', 'boolean', 'String'],
      answer: 3,
      explanation: 'String is a class (reference type) in Java, while int, float, and boolean are all primitive data types.',
      difficulty: 'Easy', topic: 'Data Types' },
    { q: 'What is the default value of local variables in Java?',
      options: ['0', 'null', 'false', 'No default value — compiler error'],
      answer: 3,
      explanation: 'Local variables in Java must be explicitly initialized before use. They have no default values, unlike instance variables.',
      difficulty: 'Easy', topic: 'Variables' },
    { q: 'Which component of Java is responsible for executing bytecode?',
      options: ['JDK', 'JVM', 'JRE', 'javac compiler'],
      answer: 1,
      explanation: 'The JVM (Java Virtual Machine) is the runtime engine that executes compiled Java bytecode (.class files) on any platform.',
      difficulty: 'Easy', topic: 'JVM' },
    { q: 'What does JDK stand for in Java?',
      options: ['Java Desktop Kit', 'Java Development Kit', 'Java Deployment Kit', 'Java Dynamic Kit'],
      answer: 1,
      explanation: 'JDK stands for Java Development Kit. It contains the compiler (javac), debugger, and JRE tools needed to develop Java programs.',
      difficulty: 'Easy', topic: 'JDK' },
    { q: 'Which of the following is the correct way to read an integer from the user using Scanner in Java?',
      options: ['scanner.readInt()', 'scanner.nextInt()', 'scanner.getInt()', 'scanner.parseInt()'],
      answer: 1,
      explanation: 'The Scanner class provides nextInt() to read the next integer token from the input stream.',
      difficulty: 'Easy', topic: 'Input using Scanner' },
    { q: 'Which operator is used to check equality of two values in Java?',
      options: ['=', ':=', '==', '!='],
      answer: 2,
      explanation: 'The == operator compares two values for equality. The = operator is assignment, := does not exist in Java, and != checks inequality.',
      difficulty: 'Easy', topic: 'Operators' },
    { q: 'What will be the output of: System.out.println(10 % 3);',
      options: ['3', '1', '0', '3.33'],
      answer: 1,
      explanation: 'The % (modulus) operator returns the remainder of division. 10 divided by 3 gives remainder 1.',
      difficulty: 'Easy', topic: 'Operators' },
    { q: 'Which loop in Java is guaranteed to execute its body at least once?',
      options: ['for loop', 'while loop', 'do-while loop', 'enhanced for loop'],
      answer: 2,
      explanation: 'The do-while loop executes its body first, then checks the condition. This guarantees at least one execution regardless of the condition.',
      difficulty: 'Easy', topic: 'Loops' },
    { q: 'What is the index of the first element in a Java array?',
      options: ['1', '-1', '0', 'Depends on array size'],
      answer: 2,
      explanation: 'Java arrays are zero-indexed. The first element is always at index 0, and the last element is at index (length - 1).',
      difficulty: 'Easy', topic: 'Arrays' },
    { q: 'Which method is used to find the length of a String in Java?',
      options: ['str.size()', 'str.count()', 'str.length()', 'str.len()'],
      answer: 2,
      explanation: 'The length() method of the String class returns the number of characters in the string. Note: arrays use .length (property), strings use .length() (method).',
      difficulty: 'Easy', topic: 'Strings' }
  ],
  intermediate: [
    { q: 'Which keyword is used to restrict a class from being inherited?',
      options: ['static', 'abstract', 'final', 'protected'],
      answer: 2,
      explanation: 'Declaring a class as "final" prevents it from being subclassed. final methods cannot be overridden, and final variables cannot be reassigned.',
      difficulty: 'Medium', topic: 'Inheritance' },
    { q: 'Can we overload methods in Java by changing only their return type?',
      options: ['Yes', 'No', 'Depends on JVM version', 'Only for static methods'],
      answer: 1,
      explanation: 'Method overloading requires a difference in parameter list (type, number, or order). Changing only the return type is not valid overloading and causes a compile error.',
      difficulty: 'Medium', topic: 'Methods' },
    { q: 'Which collection type in Java allows duplicate elements and preserves insertion order?',
      options: ['Set', 'Map', 'List', 'SortedSet'],
      answer: 2,
      explanation: 'List interface (e.g., ArrayList, LinkedList) allows duplicate elements and maintains insertion order. Set does not allow duplicates.',
      difficulty: 'Medium', topic: 'Interfaces' },
    { q: 'Which access modifier makes a member accessible only within the same class?',
      options: ['public', 'protected', 'default', 'private'],
      answer: 3,
      explanation: 'The private access modifier restricts visibility to within the declaring class only. It is the most restrictive access level in Java.',
      difficulty: 'Medium', topic: 'Access Modifiers' },
    { q: 'What is the keyword used to call a parent class constructor from a subclass?',
      options: ['this()', 'parent()', 'super()', 'base()'],
      answer: 2,
      explanation: 'super() invokes the parent class constructor and must be the first statement in the subclass constructor body.',
      difficulty: 'Medium', topic: 'Constructors' },
    { q: 'Which exception is thrown when dividing an integer by zero in Java?',
      options: ['IllegalArgumentException', 'NumberFormatException', 'ArithmeticException', 'NullPointerException'],
      answer: 2,
      explanation: 'Dividing an integer by zero throws ArithmeticException with the message "/ by zero". Note: floating-point division by zero returns Infinity, not an exception.',
      difficulty: 'Medium', topic: 'Exception Handling' },
    { q: 'Which keyword is used to declare that a method may throw a checked exception?',
      options: ['catch', 'throw', 'throws', 'try'],
      answer: 2,
      explanation: 'The "throws" keyword in a method declaration indicates that the method may propagate a checked exception. The caller must handle or further declare the exception.',
      difficulty: 'Medium', topic: 'Exception Handling' },
    { q: 'What does the "abstract" keyword do when applied to a method?',
      options: ['Makes the method final', 'Makes the method static', 'Declares a method without a body', 'Makes the method private'],
      answer: 2,
      explanation: 'An abstract method has only a declaration (signature) but no body. The subclass that extends the abstract class must provide the implementation.',
      difficulty: 'Medium', topic: 'Abstraction' },
    { q: 'Which statement about Java constructors is TRUE?',
      options: ['Constructors have a return type of void', 'Constructors can be inherited by subclasses', 'Constructors must have the same name as the class', 'Constructors cannot be overloaded'],
      answer: 2,
      explanation: 'A constructor must have exactly the same name as its class. Constructors have no return type (not even void), cannot be inherited, and can be overloaded.',
      difficulty: 'Medium', topic: 'Constructors' },
    { q: 'Which class is used to read characters from a file in Java?',
      options: ['FileInputStream', 'ObjectInputStream', 'FileReader', 'DataInputStream'],
      answer: 2,
      explanation: 'FileReader is a character stream class used to read characters from files. FileInputStream reads raw bytes, making it suitable for binary data, not text.',
      difficulty: 'Medium', topic: 'File Handling' }
  ],
  advanced: [
    { q: 'How does HashMap handle collision internally in Java 8+?',
      options: ['Rehashing entire map', 'LinkedList transitioning to Red-Black Tree', 'Double hashing', 'Linear probing'],
      answer: 1,
      explanation: 'In Java 8+, when a bucket\'s collision chain exceeds 8 entries, the LinkedList is converted into a self-balancing Red-Black Tree for O(log n) lookups.',
      difficulty: 'Hard', topic: 'Collections' },
    { q: 'Which method is used to start a new thread in Java?',
      options: ['run()', 'execute()', 'start()', 'launch()'],
      answer: 2,
      explanation: 'The start() method creates a new OS-level thread and calls run() internally. Calling run() directly executes in the current thread — no new thread is created.',
      difficulty: 'Hard', topic: 'Multithreading' },
    { q: 'What is the purpose of the "volatile" keyword in Java?',
      options: ['Acquires a lock on the variable', 'Forces all threads to read the variable from main memory', 'Prevents garbage collection of the variable', 'Makes the variable immutable'],
      answer: 1,
      explanation: 'volatile guarantees visibility: every read is fetched from main memory and every write is flushed immediately, bypassing CPU caches.',
      difficulty: 'Hard', topic: 'Multithreading' },
    { q: 'What does "type erasure" mean in Java Generics?',
      options: ['Generics types are enforced at runtime', 'Generic type parameters are removed at compile time and replaced with Object', 'Primitive types are boxed in generic classes', 'Generic methods are converted to static methods'],
      answer: 1,
      explanation: 'Type erasure removes all generic type information at compile time. The compiled bytecode uses Object or the upper bound type, with casts inserted as needed.',
      difficulty: 'Hard', topic: 'Generics' },
    { q: 'Which terminal operation on a Java Stream returns the count of elements?',
      options: ['stream.size()', 'stream.length()', 'stream.count()', 'stream.total()'],
      answer: 2,
      explanation: 'count() is a terminal operation on Stream that returns the number of elements as a long. Terminal operations trigger lazy evaluation of the full pipeline.',
      difficulty: 'Hard', topic: 'Stream API' },
    { q: 'Which interface must a class implement to use try-with-resources in Java?',
      options: ['Closeable', 'AutoCloseable', 'Serializable', 'Runnable'],
      answer: 1,
      explanation: 'Try-with-resources automatically calls close() on resources. The resource class must implement AutoCloseable (or its subinterface Closeable) to work with this syntax.',
      difficulty: 'Hard', topic: 'Best Practices' },
    { q: 'In JDBC, which Statement type is best for parameterized queries to prevent SQL injection?',
      options: ['Statement', 'PreparedStatement', 'CallableStatement', 'BatchStatement'],
      answer: 1,
      explanation: 'PreparedStatement compiles the SQL once and uses ? placeholders for parameters. User input is treated as literal data, not SQL code, preventing injection attacks.',
      difficulty: 'Hard', topic: 'JDBC' },
    { q: 'Which design pattern ensures only one instance of a class is created across the JVM?',
      options: ['Factory Pattern', 'Observer Pattern', 'Singleton Pattern', 'Builder Pattern'],
      answer: 2,
      explanation: 'The Singleton Pattern restricts instantiation to one object per JVM using a private constructor and a static method that returns the cached single instance.',
      difficulty: 'Hard', topic: 'Design Patterns' },
    { q: 'What is the result of calling parallelStream() on a Java collection?',
      options: ['It sorts the collection in parallel', 'It creates a stream that may process elements concurrently using multiple threads', 'It synchronizes all collection operations', 'It returns an immutable copy of the collection'],
      answer: 1,
      explanation: 'parallelStream() uses the Fork/Join framework to split work across multiple CPU cores. It can improve performance for CPU-intensive operations on large datasets.',
      difficulty: 'Hard', topic: 'Stream API' },
    { q: 'Which annotation in Java is used to indicate that a method overrides a parent class method?',
      options: ['@Inherited', '@Overloaded', '@Override', '@Extends'],
      answer: 2,
      explanation: '@Override tells the compiler to verify the method truly overrides a superclass method. If the signature does not match any parent method, a compile error is raised.',
      difficulty: 'Hard', topic: 'Best Practices' }
  ]
};

const JAVA_PROJECTS = [
  { title: 'Student Directory System', diff: 'Beginner', time: '4-6 hrs', emoji: '📂',
    tags: ['CLI', 'OOP', 'Data Structure'],
    desc: 'Terminal utility managing student details using OOP models.',
    features: ['Add/Update/Delete student records', 'View student directories', 'Save data into simple files'],
    starter: 'student_directory_starter.zip' },
  { title: 'Online Banking Console', diff: 'Intermediate', time: '8-10 hrs', emoji: '💳',
    tags: ['Exceptions', 'Collections', 'Files'],
    desc: 'Console banking system handling concurrent transactions and deposits.',
    features: ['Account creation and validations', 'Exceptions handling for balance bounds', 'Transaction logs in files'],
    starter: 'online_banking_starter.zip' },
  { title: 'Local File Encryptor', diff: 'Advanced', time: '15-20 hrs', emoji: '🔒',
    tags: ['IO Streams', 'Security', 'Threads'],
    desc: 'Threaded files encryption utility executing AES algorithms.',
    features: ['Secure byte stream read/writes', 'Multithreading file processing', 'AES key management interface'],
    starter: 'file_encryptor_starter.zip' }
];

const JAVA_INTERVIEW_QUESTIONS = {
  Basic: [
    { q: 'Why is Java platform independent?',
      a: 'Java compiler converts source code into intermediate JVM bytecode (.class files). Any OS with JRE/JVM can execute this bytecode, making Java platform independent.',
      tip: 'Explain compiling vs interpretation and WORA.', freq: true },
    { q: 'What is the difference between JDK, JRE, and JVM?',
      a: 'JDK is the development kit (compilers, debuggers + JRE). JRE is the runtime environment (libraries + JVM). JVM is the virtual machine execution engine that runs bytecode.',
      tip: 'Use a nested diagram explanation during viva.', freq: false }
  ],
  Intermediate: [
    { q: 'Why is String immutable in Java?',
      a: 'String immutability optimizes memory (String Constant Pool SCP caching), ensures thread-safety, and protects keys inside hash data structures.',
      tip: 'Discuss the String Constant Pool caching safety.', freq: true },
    { q: 'Can static methods access non-static members?',
      a: 'No. Static methods belong to class loading phase, while non-static members require active object instances in memory.',
      tip: 'Explain static class bindings vs instance loading.', freq: false }
  ],
  Advanced: [
    { q: 'How does HashMap work internally in Java?',
      a: 'HashMap uses buckets mapping key hashcodes. On collision, elements are stored in linked nodes. Java 8+ converts list into trees if bucket count exceeds 8.',
      tip: 'Mention hashcode, equals, bucket indexes, and trees.', freq: true },
    { q: 'What is volatile keyword in Java?',
      a: 'Volatile indicates variables must be read from/written to primary RAM memory directly rather than cached in CPU cores registers.',
      tip: 'Explain visibility problem in multithreading caches.', freq: false }
  ],
  'HR / Projects': [
    { q: 'Tell me about a Java project you built.',
      a: 'Discuss a structured application you built (e.g. Student Directory or Encryptor), detailing OOP design, exception handling, and files usage.',
      tip: 'Structure your project explanation around: Problem, Solution, Tech used, Challenges.' }
  ]
};

const JAVA_DOWNLOADS = [
  { title: 'Java Core Notes', type: 'PDF Document', size: '4.8 MB', updated: 'June 2026', color: '#EF4444', icon: '📄' },
  { title: 'Java Collections Cheat Sheet', type: 'PDF Document', size: '1.2 MB', updated: 'May 2026', color: '#3B82F6', icon: '📋' },
  { title: 'Standard Practice Programs', type: 'ZIP Archive', size: '2.5 MB', updated: 'June 2026', color: '#10B981', icon: '📦' },
  { title: 'Student Project Starters', type: 'ZIP Archive', size: '5.6 MB', updated: 'April 2026', color: '#F59E0B', icon: '📦' }
];

/* ============================================================
   HELPER BLOCKS
   ============================================================ */
const JCodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="j-code-wrapper">
      <button className="j-copy-code-btn" onClick={handleCopy}>
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
      <pre className="j-code-pre"><code>{code}</code></pre>
    </div>
  );
};

const JOutputBlock = ({ output }) => (
  <div className="j-output-wrapper">
    <div className="j-output-header">console</div>
    <pre className="j-output-pre"><code>{output}</code></pre>
  </div>
);

/* ============================================================
   TAB: OVERVIEW
   ============================================================ */
const OverviewTab = ({ setActiveTab }) => {
  return (
    <div className="j-tab-content j-overview-grid">
      <div className="j-overview-left">
        <motion.div className="j-card-glass j-intro-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h3><BookOpen size={18} /> About Java Programming</h3>
          <p>
            Java is a secure, class-based, object-oriented language designed for high portability and enterprise performance. Under its "Write Once, Run Anywhere" (WORA) philosophy, Java compiles source code to intermediate bytecode executed by the JVM (Java Virtual Machine).
          </p>
          <p>
            It is the standard back-end foundation for global systems, Android mobile apps, and big data engines.
          </p>
          <div className="j-feature-tags">
            {['JVM Architecture', 'Object Oriented', 'Garbage Collected', 'Multithreaded', 'Type Safe', 'Robust'].map(f => (
              <span key={f} className="j-feature-tag">{f}</span>
            ))}
          </div>
        </motion.div>

        <div className="j-overview-topics">
          <h4>📌 Essential Architecture</h4>
          <div className="j-topics-list">
            <div className="j-topic-item">
              <span className="j-topic-num">1</span>
              <div>
                <div className="j-topic-title">JVM vs JRE vs JDK</div>
                <div className="j-topic-desc">JVM runs bytecode. JRE provides runtime files. JDK packages compilation tools for builders.</div>
              </div>
            </div>
            <div className="j-topic-item">
              <span className="j-topic-num">2</span>
              <div>
                <div className="j-topic-title">Object Oriented Design</div>
                <div className="j-topic-desc">Inheritance, Interface Polymorphism, Encapsulation rules, and Class Abstraction.</div>
              </div>
            </div>
            <div className="j-topic-item">
              <span className="j-topic-num">3</span>
              <div>
                <div className="j-topic-title">Collections Framework</div>
                <div className="j-topic-desc">List index arrays, HashSet hash indices, Map key values, collections sorting algorithms.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="j-overview-right">
        <div className="j-card-glass j-popular-topics-card">
          <h4>💡 Popular Frameworks & Uses</h4>
          <div className="j-popular-list">
            {['Spring Boot (Microservices)', 'Hibernate (ORM Databases)', 'Android SDK (Mobile Apps)', 'Apache Spark (Big Data Engine)'].map(topic => (
              <div key={topic} className="j-popular-item">
                <span>{topic}</span>
                <ChevronRight size={14} />
              </div>
            ))}
          </div>
        </div>

        <div className="j-card-glass j-community-card">
          <h4>👥 Student Learning Forum</h4>
          <p>Share code examples, query syntax problems, and download Java templates.</p>
          <div className="j-community-stats">
            <div className="j-comm-stat"><strong>2.5k+</strong><span>Students</span></div>
            <div className="j-comm-stat"><strong>800+</strong><span>Submissions</span></div>
          </div>
          <button className="j-btn-secondary" style={{ width: '100%' }} onClick={() => setActiveTab('practice')}>
            <Code2 size={14} /> Start Coding Practice
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: ROADMAP (WINDING ROAD JOURNEY)
   ============================================================ */
const RoadmapTab = ({ setActiveTab, setActiveLessonId, completed }) => {
  const roadWrapperRef = useRef(null);

  const JAVA_MILESTONES = [
    { id: 1, title: 'Introduction', diff: 'Easy', time: '20 min', emoji: '📘', type: 'lesson', desc: 'Basics of Java programming and architecture.' },
    { id: 2, title: 'JDK Installation', diff: 'Easy', time: '25 min', emoji: '💻', type: 'lesson', desc: 'Setup Java JDK and configure environment.' },
    { id: 3, title: 'Variables', diff: 'Easy', time: '25 min', emoji: '🔤', type: 'lesson', desc: 'Types of variables and casting in Java.' },
    { id: 4, title: 'Data Types', diff: 'Easy', time: '30 min', emoji: '📦', type: 'lesson', desc: 'Primitive vs reference data types in Java.' },
    { id: 5, title: 'Operators', diff: 'Easy', time: '30 min', emoji: '➕', type: 'lesson', desc: 'Arithmetic, logical, relational, and bitwise.' },
    { id: 6, title: 'Control Statements', diff: 'Easy', time: '30 min', emoji: '🔀', type: 'lesson', desc: 'Decision making with if-else and switch.' },
    { id: 7, title: 'Loops', diff: 'Easy', time: '35 min', emoji: '🔁', type: 'lesson', desc: 'Iterate using for, while, and do-while.' },
    { id: 8, title: 'Methods', diff: 'Easy', time: '40 min', emoji: '⚙', type: 'lesson', desc: 'Declaring methods and parameter passing.' },
    { id: 9, title: 'Arrays', diff: 'Easy', time: '35 min', emoji: '📦', type: 'lesson', desc: '1D and 2D arrays initialization and loops.' },
    { id: 10, title: 'Strings', diff: 'Easy', time: '35 min', emoji: '📝', type: 'lesson', desc: 'String pool, StringBuilder, and StringBuffer.' },
    { id: 11, title: 'OOP', diff: 'Easy', time: '40 min', emoji: '🏗', type: 'lesson', desc: 'Classes, objects, reference types, and constructors.' },
    { id: 12, title: 'Inheritance', diff: 'Medium', time: '45 min', emoji: '🏗', type: 'lesson', desc: 'Extending classes and hierarchical inheritance.' },
    { id: 13, title: 'Polymorphism', diff: 'Medium', time: '40 min', emoji: '🏗', type: 'lesson', desc: 'Method overloading and overridden methods.' },
    { id: 14, title: 'Abstraction', diff: 'Medium', time: '45 min', emoji: '🏗', type: 'lesson', desc: 'Declaring abstract classes and methods.' },
    { id: 15, title: 'Interfaces', diff: 'Medium', time: '45 min', emoji: '🏗', type: 'lesson', desc: 'Multiple inheritance using Java interfaces.' },
    { id: 16, title: 'Packages', diff: 'Medium', time: '35 min', emoji: '🏗', type: 'lesson', desc: 'Access modifiers and package declarations.' },
    { id: 17, title: 'Exception Handling', diff: 'Medium', time: '40 min', emoji: '⚠️', type: 'lesson', desc: 'Try-catch blocks and custom exceptions.' },
    { id: 18, title: 'Collections Framework', diff: 'Medium', time: '45 min', emoji: '📚', type: 'lesson', desc: 'List, Set, Map collections classes.' },
    { id: 19, title: 'Generics', diff: 'Medium', time: '30 min', emoji: '⚙', type: 'lesson', desc: 'Type-safe classes and methods wildcards.' },
    { id: 20, title: 'File Handling', diff: 'Medium', time: '40 min', emoji: '📂', type: 'lesson', desc: 'FileReader, FileWriter, and IO Streams.' },
    { id: 21, title: 'Multithreading', diff: 'Medium', time: '45 min', emoji: '💾', type: 'lesson', desc: 'Thread lifecycle and sync methods.' },
    { id: 22, title: 'Streams', diff: 'Hard', time: '45 min', emoji: '🌳', type: 'lesson', desc: 'Java 8 Streams API filter/map pipelines.' },
    { id: 23, title: 'Lambda Expressions', diff: 'Hard', time: '35 min', emoji: '➕', type: 'lesson', desc: 'Functional interfaces and custom lambdas.' },
    { id: 24, title: 'JDBC', diff: 'Hard', time: '40 min', emoji: '🔌', type: 'lesson', desc: 'Database connections and statement query sets.' },
    { id: 25, title: 'Mini Projects', diff: 'Hard', time: '15-20 hrs', emoji: '🚀', type: 'projects', desc: 'Build student directory and bank projects.' },
    { id: 26, title: 'Interview Preparation', diff: 'Hard', time: '10 hrs', emoji: '🏆', type: 'interview', desc: 'Prepare core Java concepts for assessments.' }
  ];

  const totalSteps = JAVA_MILESTONES.length;
  const height = 3400;
  const stepY = height / (totalSteps + 1);

  // Generate smooth winding points from top (y=0) to bottom (y=height)
  const points = [];
  for (let i = 0; i <= totalSteps + 1; i++) {
    const y = i * stepY;
    const x = i === 0 || i === totalSteps + 1 ? 400 : 400 + Math.sin((i * Math.PI) / 2) * 160;
    points.push({ x, y });
  }

  // Draw the SVG path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpY1 = prev.y + stepY / 2;
    const cpY2 = curr.y - stepY / 2;
    pathD += ` C ${prev.x} ${cpY1}, ${curr.x} ${cpY2}, ${curr.x} ${curr.y}`;
  }

  // Scroll to bottom on mount so the user starts at Lesson 1 (bottom of screen)
  useEffect(() => {
    if (roadWrapperRef.current) {
      const element = roadWrapperRef.current;
      const targetY = element.getBoundingClientRect().top + window.scrollY + element.scrollHeight - window.innerHeight + 100;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });
    }
  }, []);

  const handleMilestoneClick = (milestone) => {
    if (milestone.type === 'lesson') {
      const isUnlocked = milestone.id === 1 || completed.has(milestone.id - 1);
      if (!isUnlocked) return;
      setActiveLessonId(milestone.id);
      setActiveTab('lessons');
    } else if (milestone.type === 'projects') {
      setActiveTab('projects');
    } else if (milestone.type === 'interview') {
      setActiveTab('interview');
    }
  };

  return (
    <div className="j-tab-content j-roadmap-container" ref={roadWrapperRef}>
      <div className="j-roadmap-intro">
        <span className="j-badge">ROADMAP</span>
        <h2>📚 Java Learning Journey</h2>
        <p>Follow the winding neon-lit path from foundations to enterprise application layers.</p>
      </div>

      <div className="j-road-journey-wrapper" style={{ height: `${height}px` }}>
        {/* The Winding Road SVG */}
        <svg className="j-road-svg" viewBox={`0 0 800 ${height}`} preserveAspectRatio="none">
          <path d={pathD} className="j-road-neon-outer" />
          <path d={pathD} className="j-road-neon-edge" />
          <path d={pathD} className="j-road-asphalt" />
          <path d={pathD} className="j-road-dashes" />
        </svg>

        {/* Milestone platforms and cards along the road */}
        {JAVA_MILESTONES.map((milestone) => {
          const pt = points[totalSteps - milestone.id + 1];
          const isLeft = pt.x < 400;

          // Lock state logic
          const isCompleted = milestone.type === 'lesson' && completed.has(milestone.id);
          const isUnlocked = milestone.id === 1 || 
                             (milestone.type === 'lesson' && completed.has(milestone.id - 1)) ||
                             (milestone.type !== 'lesson' && completed.has(24));

          return (
            <div
              key={milestone.id}
              className={`j-roadmap-milestone-node ${isLeft ? 'node-left' : 'node-right'} ${!isUnlocked ? 'j-node-locked' : ''}`}
              style={{
                position: 'absolute',
                top: `${pt.y}px`,
                left: `${pt.x}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Winding road milestone platform */}
              <div className="j-milestone-platform-wrapper" onClick={() => handleMilestoneClick(milestone)}>
                <div className="j-milestone-platform">
                  <div className="j-platform-ring-glow" />
                  <div className="j-3d-emoji-icon">{milestone.emoji}</div>
                  
                  {/* Hexagon Logo Overlay */}
                  <div className="j-platform-hexagon-overlay">
                    <svg viewBox="0 0 38 42" style={{ width: '100%', height: '100%' }}>
                      <path fill="#ED8B00" d="m 17.903,0.286 c 0.679,-0.381 1.515,-0.381 2.193,0 l 16.807,9.434 c 0.679,0.38 1.097,1.084 1.097,1.846 v 18.867 c 0,0.762 -0.418,1.466 -1.097,1.847 l -16.807,9.434 c -0.679,0.381 -1.515,0.381 -2.193,0 l -16.807,-9.434 c -0.678,-0.381 -1.096,-1.084 -1.096,-1.846 v -18.867 c 0,-0.762 0.418,-1.466 1.096,-1.847 z" />
                      <text x="19" y="27" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">J</text>
                    </svg>
                  </div>
                </div>
                <div className="j-milestone-index">{String(milestone.id).padStart(2, '0')}</div>
              </div>

              {/* Minimal Glass Card */}
              <div 
                className={`j-roadmap-card-floating ${isLeft ? 'card-left' : 'card-right'} ${isCompleted ? 'j-card-completed' : ''}`}
                onClick={() => handleMilestoneClick(milestone)}
                style={{ cursor: isUnlocked ? 'pointer' : 'not-allowed' }}
              >
                <div className="j-roadmap-card-header">
                  <div style={{ flex: 1 }}>
                    <div className="j-roadmap-card-meta">
                      <span className="j-lesson-num">Step {String(milestone.id).padStart(2, '0')}</span>
                      <span className={`j-diff-tag diff-${milestone.diff.toLowerCase()}`}>{milestone.diff}</span>
                    </div>
                    <div className="j-roadmap-title">{milestone.title}</div>
                  </div>
                </div>
                
                <p className="j-roadmap-desc">{milestone.desc}</p>
                
                <div className="j-roadmap-footer">
                  <div className="j-time-badge"><Clock size={12} />{milestone.time}</div>
                  <div className={`j-status-badge ${isCompleted ? 'status-completed' : !isUnlocked ? 'status-locked' : 'status-not-started'}`}>
                    {isCompleted ? (
                      <span className="j-checkmark-glow">✓ Completed</span>
                    ) : !isUnlocked ? (
                      <span>🔒 Locked</span>
                    ) : (
                      <span>● Ready</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================
   TAB: LESSONS
   ============================================================ */
const LessonsTab = ({ activeLessonId, setActiveLessonId, completed, toggleComplete }) => {
  const activeLesson = JAVA_LESSONS.find(l => l.id === activeLessonId) || JAVA_LESSONS[0];
  const [bookmarked, setBookmarked] = useState(new Set());
  const contentRef = useRef(null);

  const toggleBookmark = (id) => setBookmarked(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const goTo = (lesson) => { setActiveLessonId(lesson.id); if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: 'smooth' }); };

  const idx = JAVA_LESSONS.findIndex(l => l.id === activeLesson.id);
  const prev = idx > 0 ? JAVA_LESSONS[idx - 1] : null;
  const next = idx < JAVA_LESSONS.length - 1 ? JAVA_LESSONS[idx + 1] : null;

  return (
    <div className="j-tab-content j-lessons-layout">
      <aside className="j-lessons-sidebar">
        <div className="j-subsection-title" style={{ marginBottom: '14px' }}>Lessons</div>
        <div className="j-lessons-list">
          {JAVA_LESSONS.map(l => {
            const isDone = completed.has(l.id);
            const isCurrent = l.id === activeLesson.id;
            const isUnlocked = l.id === 1 || completed.has(l.id - 1);
            return (
              <button
                key={l.id}
                className={`j-sidebar-lesson-btn ${isCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                onClick={() => isUnlocked && goTo(l)}
                disabled={!isUnlocked}
                style={{ cursor: isUnlocked ? 'pointer' : 'not-allowed', opacity: isUnlocked ? 1 : 0.4 }}
              >
                {isDone ? <CheckCircle size={14} className="done-icon" /> : <div className="dot-icon" />}
                <span className="lesson-num">{String(l.id).padStart(2, '0')}</span>
                <span className="lesson-title">{l.title}</span>
                {!isUnlocked && <Lock size={11} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
              </button>
            );
          })}
        </div>
      </aside>

      <main className="j-lesson-viewer" ref={contentRef}>
        <div className="j-lesson-header">
          <div style={{ flex: 1 }}>
            <div className="j-lesson-meta">
              <span className={`j-diff-tag diff-${activeLesson.diff.toLowerCase()}`}>{activeLesson.diff}</span>
              <span className="meta-time"><Clock size={12} /> {activeLesson.time}</span>
              {activeLesson.prereq !== 'None' && <span className="meta-prereq">Prereq: {activeLesson.prereq}</span>}
            </div>
            <h2>{activeLesson.id}. {activeLesson.title}</h2>
          </div>
          <div className="j-lesson-actions">
            <button className={`j-action-btn ${bookmarked.has(activeLesson.id) ? 'active' : ''}`} onClick={() => toggleBookmark(activeLesson.id)}>
              <Bookmark size={15} fill={bookmarked.has(activeLesson.id) ? 'var(--accent-glow)' : 'none'} />
            </button>
            <button className={`j-action-btn ${completed.has(activeLesson.id) ? 'completed' : ''}`} onClick={() => toggleComplete(activeLesson.id)}>
              <Check size={15} /> {completed.has(activeLesson.id) ? 'Completed' : 'Mark Done'}
            </button>
          </div>
        </div>

        <div className="j-lesson-body">
          <section className="j-lesson-section">
            <h3><Info size={16} /> Concepts & Theory</h3>
            <div className="j-theory-text" dangerouslySetInnerHTML={{ __html: activeLesson.theory.replace(/\n/g, '<br />') }} />
          </section>

          <section className="j-lesson-section">
            <h3><Code2 size={16} /> Code Example</h3>
            <JCodeBlock code={activeLesson.code} />
          </section>

          <section className="j-lesson-section">
            <h3><Terminal size={16} /> Expected Output</h3>
            <JOutputBlock output={activeLesson.output} />
          </section>

          <div className="j-tip-warning-row">
            <div className="j-box-tip">
              <h5>💡 Pro Tip</h5>
              <p>{activeLesson.tip}</p>
            </div>
            <div className="j-box-warning">
              <h5>⚠️ Common Mistake</h5>
              <p>{activeLesson.warning}</p>
            </div>
          </div>

          <div className="j-tip-warning-row" style={{ marginTop: '16px' }}>
            <div className="j-box-interview" style={{ flex: 1 }}>
              <h5>🏆 Interview Insights</h5>
              <p>{activeLesson.interviewTip}</p>
            </div>
          </div>

          <div className="j-mistakes-box" style={{ marginTop: '16px' }}>
            <h5>❌ Pitfalls to Avoid</h5>
            <ul>{activeLesson.mistakes.map((m, i) => <li key={i}>{m}</li>)}</ul>
          </div>
        </div>

        <div className="j-lesson-navigation">
          {prev ? (
            <button className="j-nav-btn prev" onClick={() => goTo(prev)}>
              <ChevronLeft size={16} />
              <div><span>Previous</span><strong>{prev.title}</strong></div>
            </button>
          ) : <div />}
          {next ? (
            <button className="j-nav-btn next" onClick={() => completed.has(activeLesson.id) ? goTo(next) : alert('Please complete current lesson first!')} style={{ opacity: completed.has(activeLesson.id) ? 1 : 0.5 }}>
              <div><span>Next</span><strong>{next.title}</strong></div>
              <ChevronRight size={16} />
            </button>
          ) : <div />}
        </div>
      </main>
    </div>
  );
};

/* ============================================================
   TAB: PROGRAMS
   ============================================================ */
const ProgramsTab = () => {
  const categories = ['All', 'Basic', 'OOP', 'Collections', 'Multithreading', 'JDBC'];
  const [activeCat, setActiveCat] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [copied, setCopied] = useState(null);

  const filtered = activeCat === 'All' ? JAVA_PROGRAMS : JAVA_PROGRAMS.filter(p => p.cat === activeCat);

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="j-tab-content j-programs-layout">
      <aside className="j-programs-sidebar">
        <div className="j-subsection-title" style={{ marginBottom: '14px' }}>Categories</div>
        {categories.map(cat => (
          <button key={cat} className={`j-prog-cat-btn ${activeCat === cat ? 'active' : ''}`} onClick={() => { setActiveCat(cat); setExpandedId(null); }}>
            {cat}
            <span className="j-prog-cat-count">{cat === 'All' ? JAVA_PROGRAMS.length : JAVA_PROGRAMS.filter(p => p.cat === cat).length}</span>
          </button>
        ))}
      </aside>

      <div>
        <AnimatePresence mode="wait">
          <motion.div key={activeCat} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="j-programs-list">
            {filtered.map(prog => (
              <div key={prog.id} className="j-program-card">
                <div className="j-program-card-header" onClick={() => setExpandedId(expandedId === prog.id ? null : prog.id)}>
                  <div style={{ flex: 1 }}>
                    <div className="j-program-meta">
                      <span className="j-program-id">Prog {String(prog.id).padStart(2, '0')}</span>
                      <span className={`j-diff-tag diff-${prog.diff.toLowerCase()}`}>{prog.diff}</span>
                    </div>
                    <div className="j-program-title">{prog.title}</div>
                  </div>
                  <button className="j-program-expand-btn">
                    {expandedId === prog.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
                <div style={{ padding: '0 16px 14px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{prog.desc}</div>
                <AnimatePresence>
                  {expandedId === prog.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <div className="j-program-body">
                        <div className="j-program-label">Code</div>
                        <JCodeBlock code={prog.code} />
                        <div className="j-program-label">Output</div>
                        <JOutputBlock output={prog.output} />
                        <div className="j-program-label">Explanation</div>
                        <p className="j-program-explanation">{prog.explanation}</p>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px', fontSize: '0.8rem' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Time: <span style={{ color: '#facc15' }}>{prog.complexity}</span></span>
                          <span style={{ color: 'var(--text-secondary)' }}>Space: <span style={{ color: '#4ade80' }}>{prog.space}</span></span>
                        </div>
                      </div>
                      <div className="j-program-footer">
                        <button className="j-prog-action-btn primary" onClick={() => handleCopy(prog.id, prog.code)}>
                          {copied === prog.id ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Code</>}
                        </button>
                        <button className="j-prog-action-btn"><Download size={13} /> Download</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: CODING PRACTICE
   ============================================================ */
const CodingPracticeTab = () => {
  const [activeProblem, setActiveProblem] = useState(JAVA_PRACTICE_PROBLEMS[0]);
  const [code, setCode] = useState(JAVA_STARTER_CODE[1]);
  const [consoleTab, setConsoleTab] = useState('output');
  const [showHint, setShowHint] = useState(false);
  const [fontSize, setFontSize] = useState('14');
  const [lineNumbers, setLineNumbers] = useState(true);

  const handleProblemChange = (prob) => {
    setActiveProblem(prob);
    setCode(JAVA_STARTER_CODE[prob.id]);
    setShowHint(false);
  };

  return (
    <div className="j-tab-content">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        {JAVA_PRACTICE_PROBLEMS.map(p => (
          <button key={p.id} onClick={() => handleProblemChange(p)} style={{ padding: '8px 16px', borderRadius: '9px', border: `1px solid ${activeProblem.id === p.id ? 'var(--primary-purple)' : 'var(--border-primary)'}`, background: activeProblem.id === p.id ? 'rgba(139,92,246,0.15)' : 'var(--card-bg)', color: activeProblem.id === p.id ? 'var(--accent-glow)' : 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
            {p.id}. {p.title}
            <span style={{ marginLeft: '8px', padding: '1px 7px', borderRadius: '100px', fontSize: '0.68rem', background: p.difficulty === 'Easy' ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)', color: p.difficulty === 'Easy' ? '#4ade80' : '#facc15' }}>{p.difficulty}</span>
          </button>
        ))}
      </div>

      <div className="j-practice-layout">
        <div className="j-practice-panel">
          <div className="j-panel-header">
            <span className="j-panel-title"><FileText size={14} /> Problem</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {activeProblem.tags.map(t => <span key={t} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '100px', background: 'rgba(139,92,246,0.12)', color: 'var(--accent-glow)', border: '1px solid rgba(139,92,246,0.2)' }}>{t}</span>)}
            </div>
          </div>
          <div className="j-panel-body">
            <div className="j-problem-title">{activeProblem.id}. {activeProblem.title}</div>
            <p className="j-problem-desc">{activeProblem.desc}</p>
            {activeProblem.examples.map((ex, i) => (
              <div key={i} className="j-problem-example">
                <div className="j-problem-example-label">Example {i + 1}</div>
                <pre>{`Input: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? `\nExplanation: ${ex.explanation}` : ''}`}</pre>
              </div>
            ))}
            <div className="j-subsection-title" style={{ marginTop: '14px' }}><Info size={13} /> Constraints</div>
            <ul className="j-constraints-list">
              {activeProblem.constraints.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <div className="j-hint-accordion">
              <button className="j-hint-btn" onClick={() => setShowHint(!showHint)}>
                <Lightbulb size={14} /> {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              {showHint && <div className="j-hint-text">{activeProblem.hint}</div>}
            </div>
          </div>
        </div>

        <div className="j-practice-panel" style={{ background: '#080814' }}>
          <div className="j-panel-header" style={{ background: '#0d0d1a', borderColor: 'rgba(139,92,246,0.15)' }}>
            <span className="j-panel-title" style={{ color: '#e8e8f0' }}><Code2 size={14} /> Editor</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select className="j-editor-select"><option>Java (JDK 17)</option></select>
              <select className="j-editor-select"><option>Dark Theme</option></select>
              <select className="j-editor-select" value={fontSize} onChange={e => setFontSize(e.target.value)}>
                {['12','13','14','16','18'].map(s => <option key={s} value={s}>{s}px</option>)}
              </select>
            </div>
          </div>
          <div className="j-editor-toolbar">
            <label className="j-editor-toggle">
              <input type="checkbox" checked={lineNumbers} onChange={() => setLineNumbers(!lineNumbers)} style={{ marginRight: '4px' }} />Line Numbers
            </label>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', marginLeft: 'auto' }}>Auto Save: ON</span>
          </div>
          <textarea className="j-editor-area" value={code} onChange={e => setCode(e.target.value)} spellCheck={false} style={{ fontSize: `${fontSize}px`, flex: 1, minHeight: '320px' }} />
          <div className="j-editor-footer">
            <button className="j-btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }} onClick={() => setCode(JAVA_STARTER_CODE[activeProblem.id])}>
              <RotateCcw size={13} /> Reset
            </button>
            <button className="j-btn-primary" style={{ fontSize: '0.8rem', padding: '8px 20px' }}>
              <Play size={13} /> Run Code
            </button>
          </div>
        </div>

        <div className="j-practice-panel">
          <div className="j-console-tabs">
            {['output', 'testcases', 'runtime'].map(t => (
              <button key={t} className={`j-console-tab ${consoleTab === t ? 'active' : ''}`} onClick={() => setConsoleTab(t)}>
                {t === 'output' ? 'Output' : t === 'testcases' ? 'Test Cases' : 'Runtime'}
              </button>
            ))}
          </div>
          <div className="j-console-body">
            {consoleTab === 'output' && (
              <div className="j-console-placeholder"><Terminal size={28} /><p style={{ textAlign: 'center' }}>Run your code to see output here.</p></div>
            )}
            {consoleTab === 'testcases' && (
              <div className="j-test-case-grid">
                {activeProblem.examples.map((ex, i) => (
                  <div key={i} className="j-test-case">
                    <div className="j-test-case-label">Test Case {i + 1}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Input: {ex.input}</div>
                    <div style={{ fontSize: '0.8rem', color: '#4ade80', marginTop: '4px' }}>Expected: {ex.output}</div>
                  </div>
                ))}
              </div>
            )}
            {consoleTab === 'runtime' && (
              <div className="j-runtime-grid">
                {[{ label: 'Runtime', val: '-- ms' }, { label: 'Memory', val: '-- MB' }, { label: 'Status', val: 'Pending' }, { label: 'Tests', val: '0/0' }].map((s, i) => (
                  <div key={i} className="j-runtime-stat"><strong>{s.val}</strong><span>{s.label}</span></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: QUIZ
   ============================================================ */
const QuizTab = () => {
  const [level, setLevel] = useState('beginner');
  const [quizStarted, setQuizStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef(null);

  const questions = JAVA_QUIZ_DATA[level];

  useEffect(() => {
    if (quizStarted && !revealed && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); handleReveal(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [quizStarted, current, revealed, finished]);

  const handleSelect = (idx) => { if (!revealed) setSelected(idx); };
  const handleReveal = () => {
    clearInterval(timerRef.current);
    setRevealed(true);
    const correct = selected === questions[current].answer;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { q: questions[current].q, selected, correct, answer: questions[current].answer }]);
  };
  const handleNext = () => {
    if (current + 1 >= questions.length) { setFinished(true); return; }
    setCurrent(c => c + 1); setSelected(null); setRevealed(false); setTimeLeft(30);
  };
  const resetQuiz = () => {
    setQuizStarted(false); setCurrent(0); setSelected(null); setRevealed(false);
    setScore(0); setFinished(false); setAnswers([]); setTimeLeft(30);
    clearInterval(timerRef.current);
  };

  const pct = Math.round((score / questions.length) * 100);

  if (!quizStarted) {
    return (
      <div className="j-tab-content">
        <div className="j-quiz-level-selector">
          {[{ key: 'beginner', label: 'Beginner', icon: '🟢', count: JAVA_QUIZ_DATA.beginner.length }, { key: 'intermediate', label: 'Intermediate', icon: '🟡', count: JAVA_QUIZ_DATA.intermediate.length }, { key: 'advanced', label: 'Advanced', icon: '🔴', count: JAVA_QUIZ_DATA.advanced.length }].map(l => (
            <div key={l.key} className={`j-quiz-level-btn ${level === l.key ? 'active' : ''}`} onClick={() => setLevel(l.key)}>
              <div className="j-quiz-level-icon">{l.icon}</div>
              <div className="j-quiz-level-name">{l.label}</div>
              <div className="j-quiz-level-count">{l.count} Questions</div>
            </div>
          ))}
        </div>
        <div className="j-quiz-container">
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🧠</div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '8px' }}>Java Programming {level.charAt(0).toUpperCase() + level.slice(1)} Quiz</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{questions.length} questions · 30 seconds per question · Instant explanations</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              {[['Questions', questions.length], ['Time/Q', '30s'], ['Explanation', 'Yes'], ['Scoring', '+1 correct']].map(([k, v]) => (
                <div key={k} style={{ textAlign: 'center', padding: '12px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid var(--border-primary)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-glow)' }}>{v}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{k}</div>
                </div>
              ))}
            </div>
            <button className="j-btn-primary" onClick={() => setQuizStarted(true)} style={{ padding: '13px 36px', fontSize: '1rem' }}>
              <Play size={18} /> Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="j-tab-content">
        <div className="j-quiz-container">
          <div className="j-quiz-score-screen">
            <div className="j-score-circle" style={{ '--score-pct': `${pct * 3.6}deg` }}>
              <div className="j-score-inner"><span className="j-score-pct">{pct}%</span><span className="j-score-label">Score</span></div>
            </div>
            <h2 className="j-score-title">{pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Good Job!' : '📚 Keep Practicing!'}</h2>
            <p className="j-score-subtitle">{pct >= 80 ? 'Great understanding of Java programming!' : pct >= 60 ? 'Good work! Review the explanations for missed questions.' : 'Review the lessons and try again!'}</p>
            <div className="j-score-breakdown">
              <div className="j-score-stat"><strong style={{ color: '#4ade80' }}>{score}</strong><span>Correct</span></div>
              <div className="j-score-stat"><strong style={{ color: '#f87171' }}>{questions.length - score}</strong><span>Wrong</span></div>
              <div className="j-score-stat"><strong>{questions.length}</strong><span>Total</span></div>
            </div>
            <div style={{ textAlign: 'left', marginBottom: '24px' }}>
              {answers.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 14px', borderRadius: '10px', background: a.correct ? 'rgba(34,197,94,0.07)' : 'rgba(239,68,68,0.07)', border: `1px solid ${a.correct ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`, marginBottom: '8px' }}>
                  <span style={{ flexShrink: 0, marginTop: '1px' }}>{a.correct ? '✅' : '❌'}</span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Q{i + 1}: {a.q}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="j-btn-primary" onClick={resetQuiz}><RotateCcw size={15} /> Retry Quiz</button>
              <button className="j-btn-secondary" onClick={() => { setLevel(level === 'beginner' ? 'intermediate' : level === 'intermediate' ? 'advanced' : 'beginner'); resetQuiz(); }}>
                <ArrowRight size={15} /> Next Level
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const optionLetters = ['A', 'B', 'C', 'D'];
  return (
    <div className="j-tab-content">
      <div className="j-quiz-container">
        <div className="j-quiz-top-bar">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{current + 1} / {questions.length}</span>
          <div className="j-quiz-progress-track"><div className="j-quiz-progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
          <div className={`j-quiz-timer ${timeLeft <= 10 ? 'warning' : ''}`}><Clock size={13} />{timeLeft}s</div>
        </div>
        <div className="j-quiz-body">
          <div className="j-quiz-q-num">Question {current + 1}</div>
          <div className="j-quiz-question">{q.q}</div>
          <div className="j-quiz-options">
            {q.options.map((opt, idx) => {
              let cls = '';
              if (revealed) { if (idx === q.answer) cls = 'correct'; else if (idx === selected) cls = 'incorrect'; }
              else if (idx === selected) cls = 'selected';
              return (
                <button key={idx} className={`j-quiz-option ${cls}`} onClick={() => handleSelect(idx)}>
                  <span className="j-quiz-option-letter">{optionLetters[idx]}</span>{opt}
                </button>
              );
            })}
          </div>
          {revealed && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="j-quiz-explanation">
              <strong>Explanation: </strong>{q.explanation}
            </motion.div>
          )}
          <div className="j-quiz-footer">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Score: <strong style={{ color: 'var(--accent-glow)' }}>{score}</strong></div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {!revealed && <button className="j-btn-secondary" style={{ fontSize: '0.85rem', padding: '9px 18px' }} onClick={handleReveal} disabled={selected === null}>Submit</button>}
              {revealed && <button className="j-btn-primary" style={{ fontSize: '0.85rem', padding: '9px 18px' }} onClick={handleNext}>{current + 1 >= questions.length ? 'See Results' : 'Next'} <ChevronRight size={14} /></button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: PROJECTS
   ============================================================ */
const ProjectsTab = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const filtered = filter === 'All' ? JAVA_PROJECTS : JAVA_PROJECTS.filter(p => p.diff === filter);
  return (
    <div className="j-tab-content">
      <div className="j-projects-filter">
        {filters.map(f => <button key={f} className={`j-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>)}
      </div>
      <div className="j-projects-grid">
        {filtered.map((proj, i) => (
          <motion.div key={i} className="j-project-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="j-project-thumb" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(168,85,247,0.08))' }}>
              <span style={{ fontSize: '3.5rem' }}>{proj.emoji}</span>
            </div>
            <div className="j-project-body">
              <div className="j-project-tags">{proj.tags.map(t => <span key={t} className="j-project-tag">{t}</span>)}</div>
              <div className="j-project-title">{proj.title}</div>
              <p className="j-project-desc">{proj.desc}</p>
              <div className="j-project-meta">
                <span className={`j-diff-tag diff-${proj.diff.toLowerCase()}`}>{proj.diff}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} />{proj.time}</span>
              </div>
            </div>
            <div className="j-project-features">
              <h5>Key Features</h5>
              <ul>{proj.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
            </div>
            <div style={{ padding: '0 18px 18px', display: 'flex', gap: '8px' }}>
              <button className="j-btn-primary" style={{ flex: 1, fontSize: '0.82rem', padding: '9px', justifyContent: 'center' }}><Play size={13} /> Start Project</button>
              <button className="j-btn-secondary" style={{ fontSize: '0.82rem', padding: '9px 14px' }}><Download size={13} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   TAB: INTERVIEW QUESTIONS
   ============================================================ */
const InterviewTab = () => {
  const categories = Object.keys(JAVA_INTERVIEW_QUESTIONS);
  const [activeCategory, setActiveCategory] = useState('Basic');
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [bookmarked, setBookmarked] = useState(new Set());
  const toggleBookmark = (key) => setBookmarked(prev => { const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s; });

  return (
    <div className="j-tab-content j-iq-layout">
      <aside className="j-iq-sidebar">
        <div className="j-subsection-title" style={{ marginBottom: '14px' }}>Sections</div>
        {categories.map(cat => (
          <button key={cat} className={`j-iq-cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => { setActiveCategory(cat); setExpandedIdx(null); }}>
            {cat}<span className="j-prog-cat-count">{JAVA_INTERVIEW_QUESTIONS[cat].length}</span>
          </button>
        ))}
      </aside>
      <div>
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="j-iq-list">
            {JAVA_INTERVIEW_QUESTIONS[activeCategory].map((item, idx) => {
              const key = `${activeCategory}-${idx}`;
              return (
                <div key={idx} className="j-iq-card">
                  <div className="j-iq-card-header" onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}>
                    <div className="j-iq-question">{item.q}</div>
                    <div className="j-iq-header-meta">
                      {item.freq && <span className="j-iq-freq-badge">🔥 Frequently Asked</span>}
                      <button className={`j-iq-bookmark-btn ${bookmarked.has(key) ? 'active' : ''}`} onClick={e => { e.stopPropagation(); toggleBookmark(key); }}>
                        <Bookmark size={15} fill={bookmarked.has(key) ? 'var(--accent-glow)' : 'none'} />
                      </button>
                      <button className="j-iq-expand-btn">
                        {expandedIdx === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedIdx === idx && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="j-iq-answer">
                        <p className="j-iq-answer-text">{item.a}</p>
                        <div className="j-iq-tip"><strong>💡 Tip: </strong>{item.tip}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: DOWNLOADS
   ============================================================ */
const DownloadsTab = () => (
  <div className="j-tab-content">
    <div className="j-downloads-grid">
      {JAVA_DOWNLOADS.map((item, i) => (
        <motion.div key={i} className="j-download-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <div className="j-download-icon-row">
            <div className="j-download-icon" style={{ background: `${item.color}18`, border: `1px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{item.icon}</div>
            <div>
              <div className="j-download-title">{item.title}</div>
              <div className="j-download-meta">
                <div className="j-download-meta-item"><FileText size={11} />{item.type}</div>
                <div className="j-download-meta-item"><Database size={11} />{item.size}</div>
                <div className="j-download-meta-item"><Clock size={11} />Updated {item.updated}</div>
              </div>
            </div>
          </div>
          <p className="j-download-desc">Download complete handbook containing solved programs, code listings, and core Java diagrams.</p>
          <button className="j-download-btn"><Download size={15} /> Download {item.type}</button>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ============================================================
   JAVA LOGO SVG
   ============================================================ */
const JavaLogo = () => (
  <TechnologyLogo svg={TECH_LOGOS.java} name="Java" />
);

/* ============================================================
   TABS CONFIG
   ============================================================ */
const TABS = [
  { id: 'overview', label: 'Overview', icon: <Home size={16} /> },
  { id: 'roadmap', label: 'Roadmap', icon: <Map size={16} /> },
  { id: 'lessons', label: 'Lessons', icon: <BookOpen size={16} /> },
  { id: 'programs', label: 'Programs', icon: <Code2 size={16} /> },
  { id: 'practice', label: 'Coding Practice', icon: <Terminal size={16} /> },
  { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={16} /> },
  { id: 'projects', label: 'Projects', icon: <Trophy size={16} /> },
  { id: 'interview', label: 'Interview Qs', icon: <Briefcase size={16} /> },
  { id: 'downloads', label: 'Downloads', icon: <Download size={16} /> },
];

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const JavaLearningHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { state: { scrollToSection: 'technologies' } });
    }
  };

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [completed, setCompleted] = useState(new Set());
  const toggleComplete = (id) => setCompleted(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':  return <OverviewTab setActiveTab={setActiveTab} />;
      case 'roadmap':   return <RoadmapTab setActiveTab={setActiveTab} setActiveLessonId={setActiveLessonId} completed={completed} />;
      case 'lessons':   return <LessonsTab activeLessonId={activeLessonId} setActiveLessonId={setActiveLessonId} completed={completed} toggleComplete={toggleComplete} />;
      case 'programs':  return <ProgramsTab />;
      case 'practice':  return <CodingPracticeTab />;
      case 'quiz':      return <QuizTab />;
      case 'projects':  return <ProjectsTab />;
      case 'interview': return <InterviewTab />;
      case 'downloads': return <DownloadsTab />;
      default:          return <OverviewTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="j-hub-wrapper">
      <div className="j-reading-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="j-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>
          <ArrowLeft size={13} /> Back
        </button>
        <span className="sep" style={{ margin: '0 4px', opacity: 0.3, color: 'var(--text-secondary)' }}>|</span>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}><Home size={13} /> Home</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button onClick={() => navigate('/', { state: { scrollToSection: 'technologies' } })} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>Tech Stack</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button onClick={() => setActiveTab('overview')} style={{ background: 'none', border: 'none', color: activeTab === 'overview' ? 'var(--accent-glow)' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: activeTab === 'overview' ? '600' : '500', padding: '0' }}>Java Platform</button>
        {activeTab !== 'overview' && (
          <>
            <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
            <span className="current" style={{ color: 'var(--accent-glow)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'capitalize' }}>
              {activeTab === 'practice' ? 'Coding Practice' : activeTab === 'interview' ? 'Interview Qs' : activeTab}
            </span>
          </>
        )}
      </div>

      <div className="j-hero-banner">
        <div className="j-hero-inner">
          <JavaLogo />
          <div className="j-hero-text">
            <span className="j-badge">JAVA PLATFORM</span>
            <h1 className="j-hero-title">Java Programming</h1>
            <p className="j-hero-subtitle">Beginner to Advanced</p>
            <p className="j-hero-desc">Master Java from fundamentals to enterprise-level application development. Learn OOP, Collections, Multithreading, JDBC, Exception Handling, File Handling, Java 8+, Spring Boot fundamentals, and interview preparation through structured lessons and projects.</p>
            <div className="j-hero-stats">
              {[{ val: '45+', label: 'Lessons' }, { val: '120+', label: 'Programs' }, { val: '10+', label: 'Projects' }, { val: '30+', label: 'Quizzes' }, { val: '80+', label: 'Interview Qs' }].map((s, i) => (
                <div key={i} className="j-stat-pill"><strong>{s.val}</strong> {s.label}</div>
              ))}
            </div>
            <div className="j-hero-actions">
              <button className="j-btn-primary" onClick={() => setActiveTab('lessons')}><Play size={15} /> Start Learning <ChevronRight size={14} /></button>
              <button className="j-btn-secondary" onClick={() => setActiveTab('roadmap')}><Map size={15} /> View Roadmap</button>
            </div>
          </div>

          <div className="j-progress-card">
            <h4><TrendingUp size={15} /> Your Progress</h4>
            <div className="j-overall-progress">
              <div className="j-circle-progress">0%<br /><span style={{ fontSize: '0.55rem' }}>Done</span></div>
              <div className="j-progress-rows" style={{ flex: 1 }}>
                {[['Lessons Completed', '0 / 45'], ['Quizzes Completed', '0 / 10'], ['Programs Solved', '0 / 120'], ['Projects Completed', '0 / 10']].map(([l, v]) => (
                  <div key={l} className="j-progress-row"><span>{l}</span><span>{v}</span></div>
                ))}
              </div>
            </div>
            <button className="j-login-btn"><Lock size={13} /> Login to Save Progress</button>
          </div>
        </div>
      </div>

      <div className="j-tab-nav">
        <div className="j-tab-nav-inner">
          {TABS.map(tab => (
            <button key={tab.id} className={`j-tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              <span className="j-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="j-content-area">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JavaLearningHub;
