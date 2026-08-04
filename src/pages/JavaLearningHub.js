import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, ChevronRight, ChevronLeft, ArrowLeft, BookOpen, Map, Code2, Terminal,
  HelpCircle, Trophy, Briefcase, Download, Lock, ChevronDown,
  ChevronUp, Clock, CheckCircle, Play, Copy, Bookmark, BarChart2,
  Zap, Star, Users, Lightbulb, Target, Layers, Globe, Database,
  Award, AlertTriangle, Info, TrendingUp, FileText, FolderOpen,
  RotateCcw, ArrowRight, Check, X, Eye, EyeOff, Search,
  Compass, Braces, GitFork, MousePointer, ChevronsRight, Box, Component, HardDrive,
  RefreshCw, Cpu, Sliders, Hash, Link2, Rocket, Monitor, Activity, Calculator, Repeat, Type
} from 'lucide-react';
import { TECH_LOGOS } from '../components/sections/TechLogos';
import TechnologyLogo from '../components/ui/TechnologyLogo';
import { useProgress } from '../context/ProgressContext';
import useAuth from '../hooks/useAuth';
import '../styles/JavaLearningHub.css';

/* ============================================================
   JAVA LOGO SVG COMPONENT
   ============================================================ */
const JavaLogo = () => (
  <svg width="60" height="60" viewBox="0 0 128 128" fill="none">
    <path d="M47.8 88.5c0 0-7.7 1.8-16.2 1.8-14.8 0-16.2-7.8-16.2-7.8s1.4 3.7 10.4 3.7c10.4 0 22-1.9 22-1.9s0 .1 0 4.2z" fill="#E76F00"/>
    <path d="M44.4 75.8c0 0-6.8 1.4-14.3 1.4-13.1 0-14.3-6.9-14.3-6.9s1.2 3.3 9.2 3.3c9.2 0 19.4-1.7 19.4-1.7s0 .2 0 3.9z" fill="#E76F00"/>
    <path d="M60.1 63.8c-7.3-8.4-19-15.6-19-15.6s4.4 2.8 9.5 7.4c5.1 4.6 6.8 9.1 2.3 13.9-3.7 4-13 11-13 11s8.4-4 13.9-9.1c5.5-5.1 13.6-0.3 6.3-7.6z" fill="#5382A1"/>
    <path d="M83.4 97.4c0 0 5.4 1.2 8.8 1.2 8.4 0 11.8-4.2 11.8-4.2s-2.1 2.1-7.8 2.1c-5.7 0-12.8-1.5-12.8-1.5s0 .3 0 2.4z" fill="#E76F00"/>
    <path d="M37.8 108.6c15.2 3.6 42.1 4.4 61.2-1 0 0-4.7 3.3-21.7 4.7-18.7 1.5-44.5 0-51.5-3.7 0 0 3.3 0 12-0.0z" fill="#E76F00"/>
    <path d="M48.2 31.5c0 0-6.5 6.6-0.3 14.8 7.4 9.8 11.8 15.6 1.8 23.3 0 0 13.6-7.1 9.5-16.7-4.1-9.6-13-11.7-11-21.4z" fill="#5382A1"/>
    <path d="M82 72.8c10.4-5.2 14.2-12.6 14.2-12.6s-1.8 3.6-9.1 7.2c-8.9 4.4-21.2 7.7-33 7.9 0 0 14.7-1.1 27.9-2.5z" fill="#5382A1"/>
  </svg>
);

/* ============================================================
   DATA LAYER — 40 FULL JAVA LESSONS
   ============================================================ */
export const JAVA_LESSONS = [
  { id: 1, title: 'Introduction to Java', diff: 'Easy', time: '20 min', phase: 'beginner', prereq: 'None',
    desc: 'History of Java, Write Once Run Anywhere (WORA) philosophy, and JVM architecture.',
    theory: `Java is a high-level, class-based, object-oriented programming language developed by James Gosling at Sun Microsystems in 1995 (later acquired by Oracle).\n\nJava is world-famous for its "Write Once, Run Anywhere" (WORA) philosophy. When you compile Java code, it turns into bytecode (.class file) rather than machine code. This bytecode is executed by the Java Virtual Machine (JVM), making Java completely platform-independent.\n\nKey Highlights:\n- Object-Oriented: Everything in Java revolves around Classes & Objects.\n- Robust & Secure: Automatic Garbage Collection, no explicit pointers, strong memory management.\n- Multithreaded: Built-in support for concurrent execution.`,
    code: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        System.out.println("Welcome to Java Programming!");\n    }\n}`,
    output: `Hello, World!\nWelcome to Java Programming!`,
    note: 'Every Java program must contain a main() method inside a class. Execution always starts from this entry point.',
    warning: 'The public class name must match the filename exactly (e.g., class HelloWorld must be saved in HelloWorld.java).',
    tip: 'Use System.out.println() to print with a newline, or System.out.print() to print on the same line.',
    interviewTip: '"Why is Java platform independent?" — Explain that Java source code compiles to intermediate bytecode (.class) which runs on any OS with a JVM.',
    mistakes: ['Filename not matching class name', 'Missing public static void main method signature', 'Case sensitivity in keywords like Class vs class'],
    summary: 'Java is a robust, secure, platform-independent language that compiles source code to bytecode executed on the JVM.'
  },
  { id: 2, title: 'History of Java', diff: 'Easy', time: '20 min', phase: 'beginner', prereq: 'Introduction to Java',
    desc: 'Origin of Oak language, Sun Microsystems, Java release timeline up to Java 21 LTS.',
    theory: `Java was originally initiated in June 1991 by James Gosling, Mike Sheridan, and Patrick Naughton (The Green Team).\n\nInitially named "Oak" after an oak tree outside Gosling's office, it was later renamed "Java" from Java coffee. Sun Microsystems released Java 1.0 in 1996.\n\nKey Release Milestones:\n- 1995: Java is officially announced.\n- 2004: Java 5 (Generics, Annotations, Enums, For-Each loop).\n- 2014: Java 8 (Lambda Expressions, Stream API, Optional, Default Methods).\n- 2017: Java 9 (Java Platform Module System - JPMS).\n- 2021: Java 17 LTS (Sealed classes, Pattern matching).\n- 2023: Java 21 LTS (Virtual Threads, Record Patterns, Sequenced Collections).`,
    code: `public class JavaHistory {\n    public static void main(String[] args) {\n        String creator = "James Gosling";\n        int releaseYear = 1995;\n        System.out.println("Created by: " + creator);\n        System.out.println("Initial Release: " + releaseYear);\n        System.out.println("Current LTS: Java 21");\n    }\n}`,
    output: `Created by: James Gosling\nInitial Release: 1995\nCurrent LTS: Java 21`,
    note: 'Oracle releases a new Java version every 6 months, with Long-Term Support (LTS) versions released every 2 years.',
    warning: 'Legacy Java 8 code is still widespread in industry, but modern codebases leverage Java 17/21 features.',
    tip: 'Focus heavily on Java 8 (Streams & Lambdas) and Java 17/21 (Records & Virtual Threads) for interviews.',
    interviewTip: '"Which Java versions are LTS?" — Java 8, Java 11, Java 17, and Java 21 are the major LTS versions.',
    mistakes: ['Confusing Java with JavaScript (they are completely different languages)', 'Not knowing which LTS version your project targets'],
    summary: 'Java evolved from Oak in 1991 to modern LTS versions (Java 17/21) powering enterprise backends worldwide.'
  },
  { id: 3, title: 'Features of Java', diff: 'Easy', time: '25 min', phase: 'beginner', prereq: 'History of Java',
    desc: 'The 12 Buzzwords of Java: Simple, OOP, Distributed, Multithreaded, Secure, Dynamic.',
    theory: `The Java language specification defines 12 fundamental features (buzzwords):\n1. Simple: Easy to learn, clean syntax derived from C/C++, no pointers or operator overloading.\n2. Object-Oriented: Everything is an Object (except primitive types).\n3. Platform Independent: WORA via Bytecode and JVM.\n4. Robust: Strong memory management, automatic garbage collection, exception handling.\n5. Secure: No explicit pointers, sandbox execution model, bytecode verifier.\n6. Architecture-Neutral: Primitive type sizes are fixed regardless of 32-bit or 64-bit OS.\n7. Portable: Bytecode can be carried to any hardware platform.\n8. High Performance: Just-In-Time (JIT) compiler speeds up bytecode execution to near native speeds.\n9. Distributed: RMI, Networking APIs allow network application development.\n10. Dynamic: Dynamic class loading at runtime.\n11. Multithreaded: Native support for multi-core concurrent task execution.\n12. Interpreted & Compiled: Hybrid execution model.`,
    code: `public class JavaFeatures {\n    public static void main(String[] args) {\n        String[] features = {"Simple", "OOP", "Platform-Independent", "Robust", "Secure", "Multithreaded"};\n        System.out.println("Key Java Buzzwords:");\n        for (String f : features) {\n            System.out.println("- " + f);\n        }\n    }\n}`,
    output: `Key Java Buzzwords:\n- Simple\n- OOP\n- Platform-Independent\n- Robust\n- Secure\n- Multithreaded`,
    note: 'High performance is achieved because JIT compiles hot bytecode paths into native machine instructions at runtime.',
    warning: 'Java is not 100% pure Object-Oriented because primitive types (int, char, boolean) exist for performance.',
    tip: 'To make Java 100% OOP, wrapper classes (Integer, Character, Boolean) are provided.',
    interviewTip: '"Is Java 100% Object-Oriented?" — No, because primitive types (int, float, char, etc.) are supported directly for efficiency.',
    mistakes: ['Claiming Java is fully interpreted', 'Thinking pointers exist explicitly in Java code'],
    summary: 'Java buzzwords highlight its security, portability, multithreading capability, and high performance.'
  },
  { id: 4, title: 'JDK, JRE and JVM', diff: 'Easy', time: '25 min', phase: 'beginner', prereq: 'Features of Java',
    desc: 'Deep dive into JDK vs JRE vs JVM architecture, Classloader, Heap, Stack, and JIT Compiler.',
    theory: `Understanding the Java execution trio:\n\n1. JVM (Java Virtual Machine):\nAn abstract virtual machine that executes bytecode. It manages memory (Heap, Stack, Method Area, Program Counter, Native Stack) and contains the Execution Engine (Interpreter + JIT Compiler + Garbage Collector).\n\n2. JRE (Java Runtime Environment):\nJRE = JVM + Core Class Libraries (rt.jar / java.base module). It provides the runtime environment to run Java apps.\n\n3. JDK (Java Development Kit):\nJDK = JRE + Development Tools (javac compiler, javap disassembler, javadoc, jdb debugger, jar packager).\n\nJVM Memory Components:\n- Method Area: Stores class structures, constant pool, static variables.\n- Heap Area: Stores all created Objects and instance variables.\n- Stack Area: Stores method calls, local variables, and frame data.\n- PC Register: Tracks next JVM instruction address.\n- Native Method Stack: Contains C/C++ native method calls.`,
    code: `public class MemoryDemo {\n    static int globalCount = 100; // Stored in Method Area\n\n    public static void main(String[] args) {\n        int x = 10; // Stored in Stack\n        String msg = new String("Hello"); // Object in Heap, reference 'msg' in Stack\n        System.out.println("x: " + x + ", msg: " + msg + ", static: " + globalCount);\n    }\n}`,
    output: `x: 10, msg: Hello, static: 100`,
    note: 'Heap memory is shared across all threads, whereas Stack memory is private to each thread.',
    warning: 'Exhausting Heap space results in OutOfMemoryError; exhausting Stack space results in StackOverflowError.',
    tip: 'Use JVM arguments like -Xms (initial heap) and -Xmx (max heap) to tune application memory.',
    interviewTip: '"Explain JVM architecture." — Mention Classloader, Memory Data Areas (Heap, Stack, Method Area), Execution Engine (JIT + GC), and Native Interfaces.',
    mistakes: ['Confusing JRE with JDK', 'Thinking stack memory holds object data'],
    summary: 'JDK is for developers, JRE is for running, and JVM is the execution engine allocating Heap & Stack memory.'
  },
  { id: 5, title: 'Installation & Setup', diff: 'Easy', time: '25 min', phase: 'beginner', prereq: 'JDK, JRE and JVM',
    desc: 'Installing JDK 17/21, setting JAVA_HOME environment variable, configuring VS Code and IntelliJ IDEA.',
    theory: `To start developing Java applications, follow these setup steps:\n\n1. Download OpenJDK or Oracle JDK 17/21 LTS.\n2. Install the JDK on your system (Windows, macOS, or Linux).\n3. Environment Variables Configuration:\n   - Set JAVA_HOME pointing to JDK installation directory (e.g. C:\\Program Files\\Java\\jdk-21).\n   - Add %JAVA_HOME%\\bin to System PATH variable.\n4. Verification:\n   Run in Terminal: javac -version and java -version.\n5. IDE Setup:\n   - VS Code: Install "Extension Pack for Java".\n   - IntelliJ IDEA: Download Community Edition (Best for Java development).`,
    code: `// Verify setup in command prompt / terminal:\n// javac -version\n// java -version\n\npublic class SetupCheck {\n    public static void main(String[] args) {\n        System.out.println("Java Vendor: " + System.getProperty("java.vendor"));\n        System.out.println("Java Version: " + System.getProperty("java.version"));\n        System.out.println("Java Home: " + System.getProperty("java.home"));\n    }\n}`,
    output: `Java Vendor: Oracle Corporation\nJava Version: 21.0.1\nJava Home: C:\\Program Files\\Java\\jdk-21`,
    note: 'In modern Java (Java 11+), single-file source code can be run directly using "java SetupCheck.java" without running "javac" manually.',
    warning: 'If "javac is not recognized" error occurs, check if JAVA_HOME\\bin is added to system PATH.',
    tip: 'IntelliJ IDEA provides built-in JDK downloading during project creation.',
    interviewTip: '"How do you set JAVA_HOME?" — Point JAVA_HOME to the root JDK folder and append %JAVA_HOME%\\bin to system PATH.',
    mistakes: ['Pointing PATH to root folder instead of bin folder', 'Not restarting terminal after environment variable changes'],
    summary: 'Download JDK, set JAVA_HOME and PATH variables, and test installation using java/javac terminal commands.'
  },
  { id: 6, title: 'First Java Program', diff: 'Easy', time: '25 min', phase: 'beginner', prereq: 'Installation & Setup',
    desc: 'Line-by-line breakdown of a standard Java class, main method parameters, and execution lifecycle.',
    theory: `Let us break down a standard Java program line by line:\n\n\`\`\`java\npublic class FirstProgram {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}\n\`\`\`\n\n- \`public\`: Access modifier making class visible everywhere.\n- \`class\`: Keyword used to declare a class.\n- \`FirstProgram\`: Class identifier (must match filename FirstProgram.java).\n- \`static\`: Method belongs to class; JVM can invoke main() without creating an instance.\n- \`void\`: Return type indicating main() returns no value.\n- \`main\`: Required entry point method name recognized by JVM.\n- \`String[] args\`: Array of command-line arguments passed to the program.\n- \`System.out.println()\`: System is a class, out is a static PrintStream field, println() prints output with newline.`,
    code: `public class FirstProgram {\n    public static void main(String[] args) {\n        System.out.println("1. Compiling: javac FirstProgram.java");\n        System.out.println("2. Bytecode Generated: FirstProgram.class");\n        System.out.println("3. Executing: java FirstProgram");\n    }\n}`,
    output: `1. Compiling: javac FirstProgram.java\n2. Bytecode Generated: FirstProgram.class\n3. Executing: java FirstProgram`,
    note: 'Command line arguments can be passed when running: java FirstProgram arg1 arg2',
    warning: 'Changing signature of main method (e.g. removing static or String[] args) causes NoSuchMethodError at runtime.',
    tip: 'In IDEs like IntelliJ or Eclipse, type "psvm" + Tab to generate public static void main, and "sout" + Tab for System.out.println.',
    interviewTip: '"Why is main static in Java?" — Because JVM calls main() before any class object exists in memory.',
    mistakes: ['Writing main without static keyword', 'Misspelling System with lowercase s'],
    summary: 'Every Java app starts from public static void main(String[] args) declared inside a public matching class file.'
  },
  { id: 7, title: 'Java Syntax', diff: 'Easy', time: '25 min', phase: 'beginner', prereq: 'First Java Program',
    desc: 'Java identifiers, keywords, naming conventions, comments, and code block formatting.',
    theory: `Java Syntax Rules:\n\n1. Case Sensitivity: \`myVariable\` and \`MyVariable\` are different.\n2. Class Names: PascalCase (e.g., \`StudentManager\`, \`BankAccount\`).\n3. Method & Variable Names: camelCase (e.g., \`calculateSalary()\`, \`totalCount\`).\n4. Constants: ALL_CAPS_WITH_UNDERSCORES (e.g., \`MAX_VALUE\`, \`PI\`).\n5. Identifiers: Can start with letters, \`$\`, or \`_\`. Cannot start with numbers or be a reserved keyword.\n6. Semicolons: Every statement ends with a semicolon \`;\`.\n7. Comments:\n   - Single-line: \`// comment\`\n   - Multi-line: \`/* comment */\`\n   - Javadoc: \`/** documentation */\``,
    code: `public class SyntaxRules {\n    // Constant definition\n    public static final double PI_VALUE = 3.14159;\n\n    /**\n     * Javadoc comment for main method\n     */\n    public static void main(String[] args) {\n        int studentAge = 20; // camelCase variable\n        boolean $isValid = true;\n        \n        System.out.println("Student Age: " + studentAge);\n        System.out.println("Constant PI: " + PI_VALUE);\n        System.out.println("Valid Identifier: " + $isValid);\n    }\n}`,
    output: `Student Age: 20\nConstant PI: 3.14159\nValid Identifier: true`,
    note: 'Javadoc comments (/** */) can be extracted automatically into HTML documentation using the javadoc tool.',
    warning: 'Do not use Java reserved keywords (e.g., class, int, static, void, public) as variable names.',
    tip: 'Follow standard Java style guidelines to make your code clean and readable across engineering teams.',
    interviewTip: '"What are valid characters for Java identifiers?" — Letters (A-Z, a-z), digits (0-9, but not at start), currency symbol ($), and underscore (_).',
    mistakes: ['Starting variable names with numbers (e.g. 1stName)', 'Using hyphen in variable names (e.g. student-name)'],
    summary: 'Follow PascalCase for classes, camelCase for methods/variables, ALL_CAPS for constants, and end statements with semicolons.'
  },
  { id: 8, title: 'Variables', diff: 'Easy', time: '25 min', phase: 'beginner', prereq: 'Java Syntax',
    desc: 'Local vs Instance vs Static variables, scope, default values, and variable lifecycles.',
    theory: `Variables in Java are containers that hold data values during execution.\n\nThree Types of Variables:\n\n1. Local Variables:\n- Declared inside methods, constructors, or blocks.\n- Created when method is called, destroyed when method exits.\n- NO default values — MUST be initialized before reading.\n- Stored in Stack memory.\n\n2. Instance Variables:\n- Declared inside a class but outside any method.\n- Belongs to an object instance.\n- Initialized to default values (0, 0.0, false, null).\n- Stored in Heap memory.\n\n3. Static Variables:\n- Declared with \`static\` keyword inside a class.\n- Shared across ALL instances of the class.\n- Created when class is loaded into memory.\n- Stored in Method Area / Metaspace.`,
    code: `public class VariableTypes {\n    static String department = "Computer Science"; // Static Variable\n    int studentId; // Instance Variable (default: 0)\n\n    public void display() {\n        int score = 95; // Local Variable\n        System.out.println("ID: " + studentId + ", Score: " + score + ", Dept: " + department);\n    }\n\n    public static void main(String[] args) {\n        VariableTypes obj = new VariableTypes();\n        obj.studentId = 101;\n        obj.display();\n    }\n}`,
    output: `ID: 101, Score: 95, Dept: Computer Science`,
    note: 'Static variables can be accessed directly using ClassName.variableName without creating an object.',
    warning: 'Attempting to use an uninitialized local variable results in a compilation error: "variable might not have been initialized".',
    tip: 'Use instance variables for object-specific state and static variables for shared configurations.',
    interviewTip: '"Difference between static and instance variables?" — Static variable is shared by all objects (class level), instance variable is unique per object.',
    mistakes: ['Reading uninitialized local variable', 'Modifying static variable expecting change to affect only one object'],
    summary: 'Local variables exist in stack within methods. Instance variables live in heap per object. Static variables exist per class.'
  },
  { id: 9, title: 'Data Types', diff: 'Easy', time: '30 min', phase: 'beginner', prereq: 'Variables',
    desc: 'Primitive data types (byte, short, int, long, float, double, char, boolean) vs Reference types.',
    theory: `Java data types are split into Primitive and Reference types:\n\n1. Primitive Data Types (8 Built-in Types):\n- \`byte\`: 1 byte (-128 to 127)\n- \`short\`: 2 bytes (-32,768 to 32,767)\n- \`int\`: 4 bytes (-2^31 to 2^31-1)\n- \`long\`: 8 bytes (-2^63 to 2^63-1) [Requires 'L' suffix]\n- \`float\`: 4 bytes (6-7 decimal digits) [Requires 'f' suffix]\n- \`double\`: 8 bytes (15-16 decimal digits) [Default decimal type]\n- \`char\`: 2 bytes (0 to 65,535, UTF-16 Unicode character)\n- \`boolean\`: 1 bit (true or false)\n\n2. Reference / Non-Primitive Data Types:\n- Classes, Interfaces, Arrays, Enums, Strings.\n- Store references (memory addresses) pointing to Objects in Heap memory.\n- Default value is \`null\`.`,
    code: `public class DataTypesDemo {\n    public static void main(String[] args) {\n        // Primitives\n        byte b = 100;\n        short s = 25000;\n        int i = 100000;\n        long l = 9876543210L;\n        float f = 5.75f;\n        double d = 19.99;\n        char ch = 'J';\n        boolean isPass = true;\n\n        // Reference type\n        String tech = "Java";\n\n        System.out.println("Primitives: " + b + ", " + s + ", " + i + ", " + l);\n        System.out.println("Floats: " + f + ", " + d);\n        System.out.println("Char: " + ch + " (Unicode: " + (int)ch + ")");\n        System.out.println("Reference String: " + tech);\n    }\n}`,
    output: `Primitives: 100, 25000, 100000, 9876543210\nFloats: 5.75, 19.99\nChar: J (Unicode: 74)\nReference String: Java`,
    note: 'In Java, char uses 2 bytes (16 bits) because it uses UTF-16 encoding to support international characters.',
    warning: 'Forgetting L suffix for long literals exceeding Integer bounds causes compiler error.',
    tip: 'Use double for floating point calculations unless memory optimization is critical.',
    interviewTip: '"Why is char 2 bytes in Java?" — Because Java supports Unicode character encoding (UTF-16) covering global languages.',
    mistakes: ['Assigning double value to float variable without f suffix', 'Assuming boolean size is fixed to 1 byte (size depends on JVM spec)'],
    summary: 'Java has 8 primitive data types for storing raw values, and reference types for pointing to heap objects.'
  },
  { id: 10, title: 'Type Casting', diff: 'Easy', time: '25 min', phase: 'beginner', prereq: 'Data Types',
    desc: 'Widening (implicit) casting vs Narrowing (explicit) casting, type promotion in arithmetic expressions.',
    theory: `Type casting is assigning a value of one primitive data type to another type.\n\n1. Widening Casting (Implicit / Automatic):\n- Converts smaller type to larger type.\n- \`byte\` → \`short\` → \`char\` → \`int\` → \`long\` → \`float\` → \`double\`\n- Safe! No data loss.\n\n2. Narrowing Casting (Explicit / Manual):\n- Converts larger type to smaller type.\n- Must be done manually using parentheses \`(datatype)\`.\n- Risk of data truncation or precision loss.\n\n3. Type Promotion in Expressions:\n- \`byte\`, \`short\`, and \`char\` operands are automatically promoted to \`int\` when performing arithmetic calculations.`,
    code: `public class TypeCastingDemo {\n    public static void main(String[] args) {\n        // Widening Casting (int to double)\n        int num = 100;\n        double dNum = num; // Automatic\n        System.out.println("Int: " + num + " -> Double: " + dNum);\n\n        // Narrowing Casting (double to int)\n        double pi = 3.14159;\n        int intPi = (int) pi; // Explicit\n        System.out.println("Double: " + pi + " -> Int: " + intPi);\n\n        // Type Promotion\n        byte a = 40;\n        byte b = 50;\n        int result = a * b; // a and b promoted to int\n        System.out.println("Byte multiplication result: " + result);\n    }\n}`,
    output: `Int: 100 -> Double: 100.0\nDouble: 3.14159 -> Int: 3\nByte multiplication result: 2000`,
    note: 'When narrowing a double to an int, decimal values are truncated (cut off), not rounded.',
    warning: 'Explicit narrowing cast can cause integer overflow if target type capacity is exceeded.',
    tip: 'Use Math.round() before narrowing if you need rounded values instead of truncated decimals.',
    interviewTip: '"What is automatic type promotion in Java?" — In arithmetic expressions, byte/short/char are promoted to int, long if one operand is long, float if float, double if double.',
    mistakes: ['Trying to store (byte * byte) result back into a byte without explicit cast', 'Expecting (int)3.99 to equal 4'],
    summary: 'Widening occurs automatically safely; narrowing requires explicit (type) syntax and truncates precision.'
  },
  { id: 11, title: 'Operators', diff: 'Easy', time: '30 min', phase: 'beginner', prereq: 'Type Casting',
    desc: 'Arithmetic, Relational, Logical, Bitwise, Shift, Assignment, and Ternary operators.',
    theory: `Operators are special symbols used to perform operations on variables and values.\n\nCategories of Operators:\n1. Arithmetic: \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (Modulo / Remainder)\n2. Relational: \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\` (Returns boolean)\n3. Logical: \`&&\` (Short-circuit AND), \`||\` (Short-circuit OR), \`!\` (NOT)\n4. Bitwise: \`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (Complement)\n5. Shift Operators: \`<<\` (Left shift), \`>>\` (Signed right shift), \`>>>\` (Unsigned right shift)\n6. Assignment: \`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\` \n7. Ternary Operator: \`variable = (condition) ? expression1 : expression2;\``,
    code: `public class OperatorsDemo {\n    public static void main(String[] args) {\n        int a = 15, b = 4;\n        \n        // Arithmetic & Modulo\n        System.out.println("15 / 4 = " + (a / b)); // Integer division = 3\n        System.out.println("15 % 4 = " + (a % b)); // Remainder = 3\n\n        // Short-circuit Logical\n        boolean check = (a > 10) || (++b > 10);\n        System.out.println("Check: " + check + ", b: " + b); // b remains 4 due to short-circuit\n\n        // Ternary Operator\n        int max = (a > b) ? a : b;\n        System.out.println("Max value: " + max);\n\n        // Unsigned Right Shift\n        int neg = -8;\n        System.out.println("-8 >> 1: " + (neg >> 1));  // -4\n        System.out.println("-8 >>> 1: " + (neg >>> 1)); // 2147483644\n    }\n}`,
    output: `15 / 4 = 3\n15 % 4 = 3\nCheck: true, b: 4\nMax value: 15\n-8 >> 1: -4\n-8 >>> 1: 2147483644`,
    note: 'In logical OR (||), if the first operand is true, the second operand is never evaluated.',
    warning: 'Do not confuse single assignment = with double relational equality operator ==.',
    tip: 'Use ternary operators for concise conditional variable initialization.',
    interviewTip: '"Difference between >> and >>> in Java?" — >> preserves sign bit (signed shift), while >>> fills empty left positions with 0 (unsigned shift).',
    mistakes: ['Using = instead of == in conditional checks', 'Division of integers expecting double output (use 15.0 / 4)'],
    summary: 'Operators manipulate data values. Master arithmetic, relational, short-circuit logical, and bitwise shift operators.'
  },
  { id: 12, title: 'User Input (Scanner)', diff: 'Easy', time: '25 min', phase: 'beginner', prereq: 'Operators',
    desc: 'Reading keyboard input using Scanner class, BufferedReader, and handling scanner line traps.',
    theory: `To accept input from users in Java, use the \`Scanner\` class from \`java.util\` package.\n\nKey Scanner Methods:\n- \`nextInt()\`: Reads an integer\n- \`nextDouble()\`: Reads a double decimal\n- \`next()\`: Reads a single word (delimited by space)\n- \`nextLine()\`: Reads an entire line of text\n\nScanner Trap (Leftover Newline):\nCalling \`nextLine()\` immediately after \`nextInt()\` or \`nextDouble()\` consumes the leftover newline character (\\n) in buffer. Solution: Call an extra \`scanner.nextLine()\` to consume the residual newline.`,
    code: `import java.util.Scanner;\n\npublic class UserInputDemo {\n    public static void main(String[] args) {\n        // Create Scanner object reading from System.in\n        Scanner scanner = new Scanner(System.in);\n\n        System.out.print("Enter your name: ");\n        String name = scanner.nextLine();\n\n        System.out.print("Enter your age: ");\n        int age = scanner.nextInt();\n        scanner.nextLine(); // Clear buffer trap!\n\n        System.out.print("Enter your department: ");\n        String dept = scanner.nextLine();\n\n        System.out.println("\\n--- Student Profile ---");\n        System.out.println("Name: " + name);\n        System.out.println("Age: " + age);\n        System.out.println("Department: " + dept);\n\n        scanner.close(); // Close resource\n    }\n}`,
    output: `Enter your name: Sayan\nEnter your age: 21\nEnter your department: BCA Computer Science\n\n--- Student Profile ---\nName: Sayan\nAge: 21\nDepartment: BCA Computer Science`,
    note: 'Always close your Scanner object using scanner.close() when finished to prevent resource leaks.',
    warning: 'Passing non-integer input to nextInt() throws InputMismatchException.',
    tip: 'Use scanner.hasNextInt() to check if valid integer input is available before reading.',
    interviewTip: '"How do Scanner and BufferedReader compare?" — BufferedReader is synchronized, faster (large buffer 8KB), reads strings only. Scanner parses tokens with regex but is slower.',
    mistakes: ['Skipping scanner.nextLine() buffer clear after nextInt()', 'Forgetting to import java.util.Scanner'],
    summary: 'Scanner class reads user input from System.in. Clear newline buffer after reading primitive numbers.'
  },
  { id: 13, title: 'Conditional Statements', diff: 'Easy', time: '30 min', phase: 'beginner', prereq: 'User Input (Scanner)',
    desc: 'Decision making with if, if-else, else-if ladders, nested conditions, and Java 14+ Switch Expressions.',
    theory: `Conditional statements allow Java programs to execute different code paths based on boolean conditions.\n\n1. \`if-else\` Ladder:\nEvaluates sequential conditions from top to bottom.\n\n2. \`switch\` Statement:\nEvaluates an expression against constant \`case\` values. Supports \`byte\`, \`short\`, \`char\`, \`int\`, \`String\`, and \`Enum\`.\n\n3. Java 14+ Switch Expressions (Arrow Syntax):\nReturns values directly without needing \`break\` or fall-through risk.`,
    code: `public class ConditionalsDemo {\n    public static void main(String[] args) {\n        int marks = 85;\n\n        // if-else ladder\n        if (marks >= 90) {\n            System.out.println("Grade: A+");\n        } else if (marks >= 80) {\n            System.out.println("Grade: A");\n        } else {\n            System.out.println("Grade: B");\n        }\n\n        // Modern Switch Expression (Java 14+)\n        int dayNum = 3;\n        String dayName = switch (dayNum) {\n            case 1 -> "Monday";\n            case 2 -> "Tuesday";\n            case 3 -> "Wednesday";\n            case 4 -> "Thursday";\n            case 5 -> "Friday";\n            default -> "Weekend";\n        };\n        System.out.println("Day 3 is: " + dayName);\n    }\n}`,
    output: `Grade: A\nDay 3 is: Wednesday`,
    note: 'Standard switch statements fall through to next case unless a break statement is explicitly written.',
    warning: 'Switch statements do not support float, double, or boolean data types.',
    tip: 'Use arrow syntax (->) in modern Java switch statements to avoid writing break statements.',
    interviewTip: '"Which types are valid in a Java switch statement?" — byte, short, char, int, Integer wrappers, String, and Enums.',
    mistakes: ['Forgetting break in legacy switch statements causing unexpected fall-through', 'Using float expressions inside switch'],
    summary: 'if-else tests boolean ranges; switch matches discrete constant values or strings efficiently.'
  },
  { id: 14, title: 'Loops', diff: 'Easy', time: '35 min', phase: 'beginner', prereq: 'Conditional Statements',
    desc: 'Iterating using for, while, do-while, enhanced for-each loop, break, continue, and labeled loops.',
    theory: `Loops execute a block of code repeatedly until a termination condition is met.\n\n1. \`for\` Loop: Ideal when total iteration count is known in advance.\n2. \`while\` Loop: Entry-controlled loop; checks condition before executing body.\n3. \`do-while\` Loop: Exit-controlled loop; executes body AT LEAST ONCE before checking condition.\n4. \`enhanced for-each\` Loop: Iterates over arrays and Collections cleanly.\n5. Control Keywords:\n   - \`break\`: Exits loop immediately.\n   - \`continue\`: Skips current iteration and moves to next loop cycle.\n   - \`labeled loops\`: Allows breaking/continuing outer loops in nested scenarios.`,
    code: `public class LoopsDemo {\n    public static void main(String[] args) {\n        // Enhanced For-Each Loop\n        int[] scores = {90, 85, 78, 92};\n        System.out.print("Scores: ");\n        for (int score : scores) {\n            System.out.print(score + " ");\n        }\n        System.out.println();\n\n        // Labeled Loop Example\n        outerLoop:\n        for (int i = 1; i <= 3; i++) {\n            for (int j = 1; j <= 3; j++) {\n                if (i == 2 && j == 2) break outerLoop;\n                System.out.println("i=" + i + ", j=" + j);\n            }\n        }\n    }\n}`,
    output: `Scores: 90 85 78 92 \ni=1, j=1\ni=1, j=2\ni=1, j=3\ni=2, j=1`,
    note: 'The enhanced for-each loop is read-only; you cannot modify array elements directly through the loop variable.',
    warning: 'Ensure while/do-while loop control variables update properly to avoid infinite loops.',
    tip: 'Prefer enhanced for-each loops when iterating over arrays or collections without requiring indices.',
    interviewTip: '"Difference between while and do-while?" — while tests condition before execution; do-while executes body once guaranteed before condition check.',
    mistakes: ['Off-by-one errors in array loop bounds (using <= array.length)', 'Modifying collection inside for-each loop causing ConcurrentModificationException'],
    summary: 'Loops repeat code logic. Use for/while for conditional iterations and enhanced for-each for traversing collections.'
  },
  { id: 15, title: 'Arrays', diff: 'Easy', time: '35 min', phase: 'beginner', prereq: 'Loops',
    desc: 'Declaring 1D and 2D arrays, jagged arrays, memory layout, and java.util.Arrays utility class.',
    theory: `An array is a fixed-size data structure holding elements of the same type stored in contiguous memory locations.\n\nArray Characteristics:\n- Indices start at 0 and end at \`length - 1\`.\n- Array objects are stored in Heap memory.\n- Accessing invalid index throws \`ArrayIndexOutOfBoundsException\`.\n\nMultidimensional & Jagged Arrays:\n- 2D Array: Array of arrays (e.g. \`int[][] matrix = new int[3][3];\`).\n- Jagged Array: 2D array where sub-arrays have different row lengths.\n\nArrays Utility (\`java.util.Arrays\`):\n- \`Arrays.sort(arr)\`: Sorts array elements.\n- \`Arrays.binarySearch(arr, key)\`: Fast logarithmic search.\n- \`Arrays.toString(arr)\`: Pretty prints array values.`,
    code: `import java.util.Arrays;\n\npublic class ArraysDemo {\n    public static void main(String[] args) {\n        // 1D Array Declaration & Sorting\n        int[] numbers = {45, 12, 89, 23, 7};\n        Arrays.sort(numbers);\n        System.out.println("Sorted Array: " + Arrays.toString(numbers));\n\n        // Jagged 2D Array\n        int[][] jagged = new int[2][];\n        jagged[0] = new int[]{1, 2, 3};\n        jagged[1] = new int[]{4, 5};\n\n        System.out.println("Jagged Row 0 length: " + jagged[0].length);\n        System.out.println("Jagged Row 1 length: " + jagged[1].length);\n    }\n}`,
    output: `Sorted Array: [7, 12, 23, 45, 89]\nJagged Row 0 length: 3\nJagged Row 1 length: 2`,
    note: 'In Java, array size cannot be changed once created. For dynamic resizing, use ArrayList.',
    warning: 'Arrays.binarySearch() produces undefined results if the array is not sorted beforehand.',
    tip: 'Use System.arraycopy() or Arrays.copyOf() for fast array cloning and copying operations.',
    interviewTip: '"Are arrays objects in Java?" — Yes, arrays are objects in Java and inherit directly from java.lang.Object.',
    mistakes: ['Trying to access arr[arr.length] instead of arr[arr.length - 1]', 'Forgetting that array length is a property (.length) not a method ()'],
    summary: 'Arrays store fixed-size homogeneous data in contiguous memory. Use Arrays utility class for sorting and searching.'
  },
  { id: 16, title: 'Strings', diff: 'Easy', time: '35 min', phase: 'beginner', prereq: 'Arrays',
    desc: 'String immutability, String Constant Pool (SCP), StringBuilder vs StringBuffer, and essential String methods.',
    theory: `In Java, \`String\` is a class (reference type) in \`java.lang\` package representing a sequence of characters.\n\nString Immutability & String Constant Pool (SCP):\n- Strings are IMMUTABLE in Java — once created, string object content cannot be altered.\n- String literals are stored in the String Constant Pool (SCP) in Heap memory to optimize memory via reusability.\n- \`String s1 = "Java";\` uses SCP.\n- \`String s2 = new String("Java");\` creates an object in Heap memory outside SCP.\n\nStringBuilder vs StringBuffer:\n- \`StringBuilder\`: Mutable string builder, NOT thread-safe, fast performance.\n- \`StringBuffer\`: Mutable string builder, THREAD-SAFE (synchronized), slower.\n\nKey Methods: \`length()\`, \`charAt()\`, \`substring()\`, \`indexOf()\`, \`equals()\`, \`equalsIgnoreCase()\`, \`toUpperCase()\`, \`trim()\`, \`split()\`.`,
    code: `public class StringDemo {\n    public static void main(String[] args) {\n        String str1 = "Java";\n        String str2 = "Java";\n        String str3 = new String("Java");\n\n        System.out.println("str1 == str2 (SCP match): " + (str1 == str2)); // true\n        System.out.println("str1 == str3 (Heap vs SCP): " + (str1 == str3)); // false\n        System.out.println("str1.equals(str3) (Content): " + str1.equals(str3)); // true\n\n        // StringBuilder Mutable concatenation\n        StringBuilder sb = new StringBuilder("BCA");\n        sb.append(" Department");\n        System.out.println("Mutable StringBuilder: " + sb.toString());\n    }\n}`,
    output: `str1 == str2 (SCP match): true\nstr1 == str3 (Heap vs SCP): false\nstr1.equals(str3) (Content): true\nMutable StringBuilder: BCA Department`,
    note: 'Always use .equals() to compare String contents, not the == operator which checks reference memory addresses.',
    warning: 'Repeated string concatenation inside loops using + operator creates thousands of throwaway objects in memory.',
    tip: 'Use StringBuilder inside loop concatenation logic for maximum execution efficiency.',
    interviewTip: '"Why are Strings immutable in Java?" — For security (network/DB connections), thread safety, caching hashcodes, and String Pool memory saving.',
    mistakes: ['Using == to compare string values', 'Concatenating strings inside loops using + instead of StringBuilder'],
    summary: 'Strings are immutable and cached in String Pool. Use .equals() for content comparison and StringBuilder for dynamic manipulation.'
  },
  { id: 17, title: 'Methods', diff: 'Easy', time: '40 min', phase: 'beginner', prereq: 'Strings',
    desc: 'Declaring methods, parameters, return types, pass-by-value semantics, method overloading, and varargs.',
    theory: `A method is a collection of statements grouped together to perform a specific task.\n\nSyntax:\n\`accessModifier returnType methodName(parameters) { ... }\`\n\nKey Concepts:\n1. Pass-by-Value:\nJava is STRICTLY pass-by-value. When passing arguments to a method, a copy of the primitive value or reference address is passed.\n\n2. Method Overloading:\nMultiple methods in the same class share the same name but differ in parameter signatures (number, type, or sequence). Overloading is compile-time polymorphism.\n\n3. Varargs (Variable Arguments):\nAllows a method to accept 0 or more arguments of specified type using \`type... name\`.`,
    code: `public class MethodsDemo {\n    // Method Overloading\n    public static int add(int a, int b) {\n        return a + b;\n    }\n\n    public static double add(double a, double b) {\n        return a + b;\n    }\n\n    // Varargs Method\n    public static int sumAll(int... numbers) {\n        int total = 0;\n        for (int n : numbers) total += n;\n        return total;\n    }\n\n    public static void main(String[] args) {\n        System.out.println("int sum: " + add(5, 10));\n        System.out.println("double sum: " + add(5.5, 4.5));\n        System.out.println("Varargs sum: " + sumAll(10, 20, 30, 40));\n    }\n}`,
    output: `int sum: 15\ndouble sum: 10.0\nVarargs sum: 100`,
    note: 'Varargs parameter must always be the LAST parameter in a method signature.',
    warning: 'Overloading methods by changing ONLY the return type is invalid and causes a compilation error.',
    tip: 'Use descriptive method names starting with a verb (e.g. calculateTotal, getUserName).',
    interviewTip: '"Is Java pass-by-value or pass-by-reference?" — Java is strictly pass-by-value. For objects, it passes the value of the reference.',
    mistakes: ['Trying to overload methods changing only return type', 'Placing varargs parameter before other parameters'],
    summary: 'Methods modularize logic. Method overloading enables multiple signatures, and Java passes all arguments strictly by value.'
  },
  { id: 18, title: 'Constructors', diff: 'Easy', time: '35 min', phase: 'beginner', prereq: 'Methods',
    desc: 'Default vs Parameterized vs Copy constructors, constructor overloading, and this() chaining.',
    theory: `A constructor is a special block of code called automatically when an object of a class is instantiated using the \`new\` keyword.\n\nKey Rules:\n- Constructor name MUST match the class name exactly.\n- Constructor has NO return type (not even \`void\`).\n- Default Constructor: If no constructor is written, Java compiler automatically provides a no-arg default constructor.\n- Parameterized Constructor: Initializes object instance attributes with provided parameters.\n- Constructor Chaining (\`this()\`) Calling another constructor of the same class from within a constructor using \`this()\`.`,
    code: `public class Student {\n    String name;\n    int age;\n\n    // Default Constructor\n    public Student() {\n        this("Unknown", 18); // Constructor Chaining!\n    }\n\n    // Parameterized Constructor\n    public Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    public void display() {\n        System.out.println("Student: " + name + ", Age: " + age);\n    }\n\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        Student s2 = new Student("Sayan", 21);\n        s1.display();\n        s2.display();\n    }\n}`,
    output: `Student: Unknown, Age: 18\nStudent: Sayan, Age: 21`,
    note: 'this() constructor call MUST be the very first statement inside a constructor block.',
    warning: 'If you write ANY custom constructor, Java compiler DOES NOT generate the default no-arg constructor automatically.',
    tip: 'Provide a no-arg constructor in your domain classes to support frameworks like Hibernate or Jackson.',
    interviewTip: '"Can a constructor be final, static, or abstract?" — No, constructors cannot be marked static, final, or abstract.',
    mistakes: ['Putting a return type like void on a constructor (turns it into a normal method!)', 'Placing code before this() call in constructor'],
    summary: 'Constructors initialize object state upon instantiation. Use this() for constructor chaining to avoid duplicated setup code.'
  },
  { id: 19, title: 'Objects', diff: 'Easy', time: '35 min', phase: 'beginner', prereq: 'Constructors',
    desc: 'State and behavior of objects, heap memory allocation, new keyword, reference variables, and garbage collection.',
    theory: `An Object is an instance of a Class representing a real-world entity with State (attributes/fields) and Behavior (methods).\n\nObject Lifecycle:\n1. Declaration: \`Student s;\` (Creates reference variable in Stack).\n2. Instantiation: \`new\` keyword allocates memory in Heap.\n3. Initialization: \`Student("Alice", 22)\` calls constructor to populate fields.\n\nGarbage Collection (GC):\nObjects residing in Heap memory with no active references pointing to them become eligible for automatic Garbage Collection by the JVM.`,
    code: `public class Car {\n    String model;\n    int speed;\n\n    public Car(String model, int speed) {\n        this.model = model;\n        this.speed = speed;\n    }\n\n    public void accelerate() {\n        speed += 20;\n        System.out.println(model + " accelerating. New Speed: " + speed + " km/h");\n    }\n\n    public static void main(String[] args) {\n        Car car1 = new Car("Tesla Model 3", 100);\n        car1.accelerate();\n\n        // Unreferencing object for GC\n        Car car2 = new Car("BMW M4", 120);\n        car2 = null; // Eligible for Garbage Collection!\n        System.out.println("car2 reference set to null.");\n    }\n}`,
    output: `Tesla Model 3 accelerating. New Speed: 120 km/h\ncar2 reference set to null.`,
    note: 'System.gc() requests JVM to run Garbage Collection, but execution is not guaranteed immediately.',
    warning: 'Dereferencing a null object reference variable triggers a NullPointerException at runtime.',
    tip: 'Override toString(), equals(), and hashCode() methods inherited from java.lang.Object for custom classes.',
    interviewTip: '"How do objects become eligible for Garbage Collection?" — When an object reference is set to null, reassigned to another object, or created inside a method that completes execution.',
    mistakes: ['Accessing fields or calling methods on a null reference variable', 'Confusing reference variables with the actual Heap object'],
    summary: 'Objects combine state and behavior in Heap memory. JVM automatically garbage collects unreferenced heap objects.'
  },
  { id: 20, title: 'Classes', diff: 'Easy', time: '35 min', phase: 'beginner', prereq: 'Objects',
    desc: 'Classes as object blueprints, static vs instance members, static initializer blocks, and inner classes.',
    theory: `A Class is a user-defined blueprint or template from which individual objects are created.\n\nComponents of a Class:\n- Instance Fields & Methods: Unique to each object instance.\n- Static Fields & Methods: Shared by all instances of the class.\n- Static Blocks: \`static { ... }\` executes ONCE when class is loaded by JVM.\n- Nested / Inner Classes: Classes defined inside another class (Member Inner, Static Nested, Anonymous Inner Class).`,
    code: `public class University {\n    static String uniName; // Static Field\n    String studentName;    // Instance Field\n\n    // Static Initializer Block\n    static {\n        uniName = "Tech University";\n        System.out.println("Static Block: University Class Loaded!");\n    }\n\n    public University(String name) {\n        this.studentName = name;\n    }\n\n    // Nested Inner Class\n    class IDCard {\n        public void printCard() {\n            System.out.println("Student: " + studentName + " @ " + uniName);\n        }\n    }\n\n    public static void main(String[] args) {\n        University u = new University("Alex");\n        University.IDCard card = u.new IDCard();\n        card.printCard();\n    }\n}`,
    output: `Static Block: University Class Loaded!\nStudent: Alex @ Tech University`,
    note: 'Static initializer blocks execute automatically before the main method when the class is first loaded.',
    warning: 'Static methods cannot access instance variables or instance methods directly without an object reference.',
    tip: 'Use static nested classes instead of non-static inner classes when no reference to the outer class instance is needed.',
    interviewTip: '"What is a static block in Java?" — A block of code executed once when the classloader loads the class into memory.',
    mistakes: ['Trying to access instance variable inside static method without creating object instance', 'Creating multiple non-static inner classes causing memory leaks'],
    summary: 'Classes blueprint state and behavior. Static members belong to class loading time; inner classes model nested relationships.'
  },
  { id: 21, title: 'Encapsulation', diff: 'Medium', time: '35 min', phase: 'intermediate', prereq: 'Classes',
    desc: 'Data hiding, access modifiers (public, private, protected, package-private), Getters & Setters, JavaBeans.',
    theory: `Encapsulation is the OOP principle of wrapping data (variables) and code (methods) together as a single unit, and restricting direct access to object components.\n\nHow to Achieve Encapsulation:\n1. Declare class fields as \`private\` (Data Hiding).\n2. Provide \`public\` Getter and Setter methods to inspect and modify field values safely.\n\nJava Access Modifiers:\n- \`private\`: Accessible ONLY within the same class.\n- \`default\` (no keyword): Accessible within the same package.\n- \`protected\`: Accessible within same package and subclasses in other packages.\n- \`public\`: Accessible from anywhere in the project.`,
    code: `public class BankAccount {\n    private String accountNumber;\n    private double balance;\n\n    public BankAccount(String accountNumber, double initialBalance) {\n        this.accountNumber = accountNumber;\n        if (initialBalance >= 0) this.balance = initialBalance;\n    }\n\n    // Getter\n    public double getBalance() {\n        return balance;\n    }\n\n    // Setter with validation logic\n    public void deposit(double amount) {\n        if (amount > 0) {\n            balance += amount;\n            System.out.println("Deposited: $" + amount);\n        } else {\n            System.out.println("Invalid deposit amount!");\n        }\n    }\n\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount("ACC-9876", 500.0);\n        acc.deposit(250.0);\n        System.out.println("Current Balance: $" + acc.getBalance());\n    }\n}`,
    output: `Deposited: $250.0\nCurrent Balance: $750.0`,
    note: 'Encapsulation allows validation rules in setter methods to prevent invalid state updates (e.g. negative balances).',
    warning: 'Making instance variables public bypasses encapsulation and exposes internal state to corruption.',
    tip: 'Use Lombok annotations like @Getter and @Setter in enterprise apps to reduce boilerplate code.',
    interviewTip: '"What is Encapsulation and its benefit?" — Bundling data with methods while hiding internal fields using private access, ensuring security and control.',
    mistakes: ['Leaving fields public or package-default without necessity', 'Returning mutable object references directly from getters without defensive copy'],
    summary: 'Encapsulation secures fields using private access and exposes control via validated public getters and setters.'
  },
  { id: 22, title: 'Inheritance', diff: 'Medium', time: '40 min', phase: 'intermediate', prereq: 'Encapsulation',
    desc: 'Reusability with extends keyword, single/multilevel/hierarchical inheritance, super keyword, and final keyword.',
    theory: `Inheritance is an OOP mechanism where a child class (Subclass) acquires properties and behaviors from a parent class (Superclass) using the \`extends\` keyword.\n\nTypes of Inheritance in Java:\n- Single: Class B extends Class A.\n- Multilevel: Class C extends Class B, which extends Class A.\n- Hierarchical: Class B and Class C both extend Class A.\n- Multiple Inheritance (via Classes): NOT supported in Java to prevent Diamond Problem ambiguity!\n\nKey Keywords:\n- \`super\`: Refers to parent class constructor or methods.\n- \`final\`: Prevents method overriding (if on method) or class inheritance (if on class).`,
    code: `class Animal {\n    String name;\n    public Animal(String name) {\n        this.name = name;\n    }\n    public void makeSound() {\n        System.out.println(name + " makes a generic sound.");\n    }\n}\n\n// Subclass extending Superclass\nclass Dog extends Animal {\n    String breed;\n    public Dog(String name, String breed) {\n        super(name); // Call Parent Constructor\n        this.breed = breed;\n    }\n\n    @Override\n    public void makeSound() {\n        super.makeSound(); // Call Parent method\n        System.out.println(name + " barks: Woof Woof!");\n    }\n}\n\npublic class InheritanceDemo {\n    public static void main(String[] args) {\n        Dog dog = new Dog("Buddy", "Golden Retriever");\n        dog.makeSound();\n    }\n}`,
    output: `Buddy makes a generic sound.\nBuddy barks: Woof Woof!`,
    note: 'super() must be the first statement inside a subclass constructor.',
    warning: 'Java does not support multiple class inheritance (e.g. class C extends A, B is illegal). Use Interfaces for multiple inheritance.',
    tip: 'Annotate overridden methods with @Override to catch signature mismatches at compile time.',
    interviewTip: '"Why does Java not support multiple inheritance with classes?" — To avoid Diamond Problem ambiguity when two parent classes contain identical method signatures.',
    mistakes: ['Forgetting to call super() when parent has no default constructor', 'Trying to extend a final class'],
    summary: 'Inheritance enables code reusability using extends. Use super to invoke parent constructors/methods.'
  },
  { id: 23, title: 'Polymorphism', diff: 'Medium', time: '40 min', phase: 'intermediate', prereq: 'Inheritance',
    desc: 'Compile-time (Method Overloading) vs Runtime (Method Overriding) polymorphism, Dynamic Method Dispatch, instanceof.',
    theory: `Polymorphism ("many forms") is the ability of an object or method to take on multiple forms.\n\nTwo Types of Polymorphism:\n\n1. Compile-Time Polymorphism (Static Binding / Method Overloading):\n- Resolved at compile time.\n- Multiple methods in same class with same name but different signatures.\n\n2. Runtime Polymorphism (Dynamic Binding / Method Overriding):\n- Resolved at runtime.\n- Subclass provides a specific implementation of a method declared in parent class.\n- Driven by Dynamic Method Dispatch: Reference variable of Parent type can point to Child object instance (\`Parent p = new Child();\`).\n\n\`instanceof\` Operator:\nChecks if an object is an instance of a specific class or interface at runtime.`,
    code: `class Shape {\n    public void draw() {\n        System.out.println("Drawing a shape...");\n    }\n}\n\nclass Circle extends Shape {\n    @Override\n    public void draw() {\n        System.out.println("Drawing a Circle ⭕");\n    }\n}\n\nclass Rectangle extends Shape {\n    @Override\n    public void draw() {\n        System.out.println("Drawing a Rectangle ▭");\n    }\n}\n\npublic class PolymorphismDemo {\n    public static void main(String[] args) {\n        // Dynamic Method Dispatch\n        Shape s1 = new Circle();\n        Shape s2 = new Rectangle();\n\n        s1.draw(); // Calls Circle's draw()\n        s2.draw(); // Calls Rectangle's draw()\n\n        if (s1 instanceof Circle) {\n            System.out.println("s1 is indeed a Circle instance!");\n        }\n    }\n}`,
    output: `Drawing a Circle ⭕\nDrawing a Rectangle ▭\ns1 is indeed a Circle instance!`,
    note: 'Virtual method invocation determines which overridden method executes based on the actual Heap object type, not reference type.',
    warning: 'Static methods cannot be overridden (they are hidden via Method Hiding).',
    tip: 'Program to interfaces/parent abstractions rather than concrete implementations for decoupled design.',
    interviewTip: '"What is Dynamic Method Dispatch?" — Process where a call to an overridden method is resolved at runtime based on the object referenced.',
    mistakes: ['Thinking static methods participate in runtime polymorphism', 'ClassCastException when downcasting without checking instanceof'],
    summary: 'Polymorphism allows uniform treatment of objects. Overriding evaluates at runtime via Dynamic Method Dispatch.'
  },
  { id: 24, title: 'Abstraction', diff: 'Medium', time: '40 min', phase: 'intermediate', prereq: 'Polymorphism',
    desc: 'Abstract classes, abstract methods, partial abstraction vs total abstraction, abstract class constructors.',
    theory: `Abstraction is the OOP process of hiding implementation details and showing only essential functionality to the user.\n\nAbstract Class (\`abstract\` keyword):\n- A class declared with \`abstract\` keyword.\n- CANNOT be instantiated directly using \`new\`.\n- Can contain both Abstract Methods (no body) and Concrete Methods (with body).\n- Can contain constructors, static methods, and instance variables.\n- Subclasses MUST override all abstract methods unless the subclass itself is also abstract.`,
    code: `abstract class Payment {\n    double amount;\n\n    public Payment(double amount) {\n        this.amount = amount;\n    }\n\n    // Abstract method (no body)\n    abstract void processPayment();\n\n    // Concrete method\n    public void printReceipt() {\n        System.out.println("Receipt Amount: $" + amount);\n    }\n}\n\nclass CreditCardPayment extends Payment {\n    String cardNumber;\n\n    public CreditCardPayment(double amount, String cardNumber) {\n        super(amount);\n        this.cardNumber = cardNumber;\n    }\n\n    @Override\n    void processPayment() {\n        System.out.println("Processing $" + amount + " via Credit Card ending " + cardNumber.substring(12));\n    }\n}\n\npublic class AbstractionDemo {\n    public static void main(String[] args) {\n        Payment payment = new CreditCardPayment(150.75, "1234567890123456");\n        payment.processPayment();\n        payment.printReceipt();\n    }\n}`,
    output: `Processing $150.75 via Credit Card ending 3456\nReceipt Amount: $150.75`,
    note: 'Abstract classes can have constructors which are invoked via super() from concrete subclasses.',
    warning: 'Trying to instantiate an abstract class directly (new Payment()) results in a compilation error.',
    tip: 'Use abstract classes when subclasses share common state/code and hierarchical relationship.',
    interviewTip: '"Can an abstract class have a constructor?" — Yes, abstract classes have constructors invoked by subclass super() calls.',
    mistakes: ['Declaring abstract methods inside a non-abstract class', 'Attempting to instantiate abstract class directly'],
    summary: 'Abstract classes define templates with abstract and concrete methods, hiding background details.'
  },
  { id: 25, title: 'Interfaces', diff: 'Medium', time: '45 min', phase: 'intermediate', prereq: 'Abstraction',
    desc: 'Interface contract, default & static methods (Java 8), private methods (Java 9), multiple inheritance.',
    theory: `An Interface is a blueprint of a class containing abstract methods and constants. It provides 100% total abstraction (prior to Java 8).\n\nKey Rules:\n- Declared using \`interface\` keyword; implemented using \`implements\` keyword.\n- All fields are implicitly \`public static final\` (constants).\n- All abstract methods are implicitly \`public abstract\`.\n- A class can implement MULTIPLE interfaces (achieving Multiple Inheritance).\n\nModern Java Enhancements:\n- Java 8: Added \`default\` methods (with body) and \`static\` methods.\n- Java 9: Added \`private\` methods to share code between default methods.`,
    code: `interface Printable {\n    void print(); // public abstract\n}\n\ninterface Scannable {\n    void scan();\n\n    // Java 8 Default Method\n    default void logStatus() {\n        System.out.println("Scanner Status: OK");\n    }\n}\n\n// Class implementing multiple interfaces!\nclass MultiFunctionPrinter implements Printable, Scannable {\n    @Override\n    public void print() {\n        System.out.println("Printing document...");\n    }\n\n    @Override\n    public void scan() {\n        System.out.println("Scanning document...");\n    }\n}\n\npublic class InterfaceDemo {\n    public static void main(String[] args) {\n        MultiFunctionPrinter mfp = new MultiFunctionPrinter();\n        mfp.print();\n        mfp.scan();\n        mfp.logStatus();\n    }\n}`,
    output: `Printing document...\nScanning document...\nScanner Status: OK`,
    note: 'Default methods allow adding new functionality to existing interfaces without breaking existing implementing classes.',
    warning: 'When implementing interface methods, you must mark them public explicitly.',
    tip: 'Prefer interfaces over abstract classes when defining contracts across unrelated classes.',
    interviewTip: '"Difference between Abstract Class and Interface in Java?" — Abstract class can hold instance fields and non-public methods; Interface supports multiple inheritance and default/static methods.',
    mistakes: ['Forgetting public modifier when overriding interface methods in implementing class', 'Trying to modify interface fields (they are final constants!)'],
    summary: 'Interfaces define contracts for classes to implement, supporting multiple inheritance and default methods.'
  },
  { id: 26, title: 'Packages', diff: 'Medium', time: '35 min', phase: 'intermediate', prereq: 'Interfaces',
    desc: 'Built-in vs User-defined packages, import statements, package access control, and JAR creation.',
    theory: `A Package in Java is a namespace that groups related classes, interfaces, and sub-packages together.\n\nAdvantages of Packages:\n1. Prevents naming conflicts (e.g., \`com.bca.util.Date\` vs \`java.util.Date\`).\n2. Provides access protection (\`default\` package-private access).\n3. Easier code organization and modular maintenance.\n\nPackage Categories:\n- Built-in Packages: \`java.lang\` (automatically imported), \`java.util\`, \`java.io\`, \`java.net\`, \`java.sql\`.\n- User-Defined Packages: Declared at the top of file using \`package com.mycompany.app;\`.\n\nImport Types:\n- Single Import: \`import java.util.ArrayList;\`\n- Wildcard Import: \`import java.util.*;\`\n- Static Import: \`import static java.lang.Math.*;\``,
    code: `// File: com/bca/model/Student.java\npackage com.bca.model;\n\nimport static java.lang.Math.sqrt;\n\npublic class Student {\n    private String name;\n    \n    public Student(String name) {\n        this.name = name;\n    }\n    \n    public void display() {\n        System.out.println("Student Name: " + name);\n        System.out.println("Static Import Math.sqrt(16): " + sqrt(16));\n    }\n    \n    public static void main(String[] args) {\n        Student s = new Student("Rohit");\n        s.display();\n    }\n}`,
    output: `Student Name: Rohit\nStatic Import Math.sqrt(16): 4.0`,
    note: 'The package statement MUST be the first non-comment line in a Java source file.',
    warning: 'Directory structure on disk must match the package hierarchy (e.g. package com.bca.model requires folder com/bca/model).',
    tip: 'Use domain reverse convention (com.organization.project) for global unique package naming.',
    interviewTip: '"What is static import in Java?" — Static import allows accessing static members of a class directly without qualifying with class name.',
    mistakes: ['Placing import statements before package declaration', 'Class name collisions due to wildcard imports'],
    summary: 'Packages organize classes into namespaces, prevent naming collisions, and control component accessibility.'
  },
  { id: 27, title: 'Exception Handling', diff: 'Medium', time: '40 min', phase: 'intermediate', prereq: 'Packages',
    desc: 'Try-catch-finally blocks, throw, throws, Checked vs Unchecked exceptions, and Custom Exceptions.',
    theory: `An Exception is an unwanted event that disrupts the normal flow of program execution.\n\nException Hierarchy:\n\`Throwable\` → \`Exception\` (Application errors) & \`Error\` (JVM hardware/memory failure).\n\nTwo Types of Exceptions:\n1. Checked Exceptions (Compile-time): Checked by compiler. Must be handled or declared (e.g., \`IOException\`, \`SQLException\`, \`ClassNotFoundException\`).\n2. Unchecked Exceptions (Runtime): Inherit from \`RuntimeException\`. Occur at runtime due to logical errors (e.g., \`ArithmeticException\`, \`NullPointerException\`, \`ArrayIndexOutOfBoundsException\`).\n\nKeywords:\n- \`try\`: Encloses risky code.\n- \`catch\`: Handles specific exception.\n- \`finally\`: Always executes (cleanup code like closing files/connections).\n- \`throw\`: Explicitly throws an exception object.\n- \`throws\`: Declares exceptions in method signature.`,
    code: `// Custom Exception\nclass InvalidAgeException extends Exception {\n    public InvalidAgeException(String msg) {\n        super(msg);\n    }\n}\n\npublic class ExceptionDemo {\n    public static void validateAge(int age) throws InvalidAgeException {\n        if (age < 18) {\n            throw new InvalidAgeException("Age must be 18 or above to vote!");\n        }\n        System.out.println("Voting registration successful!");\n    }\n\n    public static void main(String[] args) {\n        try {\n            validateAge(15);\n        } catch (InvalidAgeException e) {\n            System.out.println("Caught Custom Exception: " + e.getMessage());\n        } finally {\n            System.out.println("Finally block executed: Cleanup complete.");\n        }\n    }\n}`,
    output: `Caught Custom Exception: Age must be 18 or above to vote!\nFinally block executed: Cleanup complete.`,
    note: 'The finally block executes regardless of whether an exception is thrown or caught.',
    warning: 'Catching generic Exception before specific child exceptions causes a compilation error (unreachable code).',
    tip: 'Use Try-With-Resources (Java 7+) to auto-close AutoCloseable resources cleanly.',
    interviewTip: '"Difference between final, finally, and finalize?" — final is a modifier for variables/methods/classes; finally is a block for cleanup; finalize() is a deprecated Object method called before GC.',
    mistakes: ['Catching Exception silently without logging', 'Placing broad catch blocks above specific catch blocks'],
    summary: 'Exception handling recovers from runtime errors using try-catch-finally, checked vs unchecked types, and custom exceptions.'
  },
  { id: 28, title: 'File Handling', diff: 'Medium', time: '40 min', phase: 'intermediate', prereq: 'Exception Handling',
    desc: 'Java I/O streams, File class, FileReader/FileWriter, BufferedReader/BufferedWriter, and Serialization.',
    theory: `Java I/O (Input/Output) uses Streams to process data sequences.\n\nTwo Main Stream Types:\n1. Byte Streams: Process 8-bit bytes (\`FileInputStream\`, \`FileOutputStream\`). Used for binary files (images, audio, PDFs).\n2. Character Streams: Process 16-bit Unicode characters (\`FileReader\`, \`FileWriter\`, \`BufferedReader\`, \`BufferedWriter\`). Used for text files.\n\nSerialization:\nConverting an Object state into a byte stream to save to disk or transfer across network. Class must implement \`Serializable\` interface. Use \`transient\` keyword to skip fields during serialization.`,
    code: `import java.io.*;\n\npublic class FileHandlingDemo {\n    public static void main(String[] args) {\n        File file = new File("sample.txt");\n        \n        // Writing to File using BufferedWriter\n        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {\n            writer.write("Welcome to BCA Java File Handling!");\n            writer.newLine();\n            writer.write("Line 2: Serialization and Streams.");\n            System.out.println("File written successfully!");\n        } catch (IOException e) {\n            System.out.println("Write Error: " + e.getMessage());\n        }\n\n        // Reading from File using BufferedReader\n        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {\n            String line;\n            System.out.println("\\n--- Reading File Content ---");\n            while ((line = reader.readLine()) != null) {\n                System.out.println(line);\n            }\n        } catch (IOException e) {\n            System.out.println("Read Error: " + e.getMessage());\n        }\n    }\n}`,
    output: `File written successfully!\n\n--- Reading File Content ---\nWelcome to BCA Java File Handling!\nLine 2: Serialization and Streams.`,
    note: 'Try-with-resources automatically closes readers and writers even if an IOException occurs.',
    warning: 'Fields marked as transient will not be serialized and will default to null/0 upon deserialization.',
    tip: 'Use java.nio.file.Files (NIO2) for modern high-performance file operations.',
    interviewTip: '"What is the transient keyword in Java?" — Prevents a variable from being serialized during Object serialization.',
    mistakes: ['Forgetting to flush/close file writers causing empty files', 'Using Character streams for binary files like images'],
    summary: 'File handling uses Character & Byte streams. Try-with-resources manages file streams cleanly, and Serialization persists objects.'
  },
  { id: 29, title: 'Collections Framework', diff: 'Medium', time: '45 min', phase: 'intermediate', prereq: 'File Handling',
    desc: 'Collection Hierarchy: List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap), and Iterators.',
    theory: `The Java Collections Framework (\`java.util\`) provides unified architecture for storing and manipulating groups of objects.\n\nCore Interfaces:\n\n1. List (Ordered, Allows Duplicates):\n- \`ArrayList\`: Resizable dynamic array. Fast random access O(1), slow insertion O(n).\n- \`LinkedList\`: Doubly-linked list. Fast insertion/deletion O(1), slow random access O(n).\n\n2. Set (Unordered, NO Duplicates):\n- \`HashSet\`: Hashing-based set. O(1) operations. Allows 1 null element.\n- \`TreeSet\`: Red-Black tree based. Sorted elements. O(log n) performance.\n\n3. Map (Key-Value Pairs, Unique Keys):\n- \`HashMap\`: Key-Value mapping based on hashing. Fast O(1).\n- \`TreeMap\`: Sorted Map based on keys.`,
    code: `import java.util.*;\n\npublic class CollectionsDemo {\n    public static void main(String[] args) {\n        // ArrayList Example\n        List<String> list = new ArrayList<>();\n        list.add("Java"); list.add("Python"); list.add("Java"); // Duplicate allowed\n        System.out.println("ArrayList (Duplicates): " + list);\n\n        // HashSet Example\n        Set<String> set = new HashSet<>(list);\n        System.out.println("HashSet (Unique): " + set);\n\n        // HashMap Example\n        Map<Integer, String> map = new HashMap<>();\n        map.put(101, "Alice");\n        map.put(102, "Bob");\n        System.out.println("HashMap Entry 101: " + map.get(101));\n    }\n}`,
    output: `ArrayList (Duplicates): [Java, Python, Java]\nHashSet (Unique): [Java, Python]\nHashMap Entry 101: Alice`,
    note: 'ArrayList grows dynamically by 50% capacity when it becomes full.',
    warning: 'Custom objects used as HashMap keys MUST override both hashCode() and equals() properly.',
    tip: 'Choose ArrayList for search-heavy apps, LinkedList for insertion-heavy apps, HashMap for key lookups.',
    interviewTip: '"How does HashMap work internally in Java?" — Uses Array of Nodes (Buckets) + LinkedList/Red-Black Tree. Hashing computes index via hash(key).',
    mistakes: ['Using primitive types as generic type parameters (e.g. ArrayList<int> is invalid, use ArrayList<Integer>)', 'Forgetting equals/hashCode override for HashSet keys'],
    summary: 'Collections store groups of objects. List maintains insertion order, Set eliminates duplicates, Map maps unique keys to values.'
  },
  { id: 30, title: 'Generics', diff: 'Medium', time: '30 min', phase: 'intermediate', prereq: 'Collections Framework',
    desc: 'Generic Classes, Generic Methods, Bounded Type Parameters, Wildcards (?, ? extends T, ? super T), and Type Erasure.',
    theory: `Generics allow types (classes and interfaces) to be parameters when defining classes, interfaces, and methods.\n\nBenefits of Generics:\n1. Compile-Time Type Safety: Catches type mismatches at compile time rather than ClassCastException at runtime.\n2. Elimination of Type Casting: No explicit casting needed when retrieving elements.\n\nWildcards:\n- \`<?>\`: Unbounded wildcard (any type).\n- \`<? extends Number>\`: Upper-bounded wildcard (Number or its subclasses like Integer, Double).\n- \`<? super Integer>\`: Lower-bounded wildcard (Integer or its superclasses).\n\nType Erasure:\nJava compiler erases all generic type parameters at compile time and replaces them with their bounds/Object for backward compatibility with older JVMs.`,
    code: `// Generic Class\nclass Box<T> {\n    private T item;\n    public void setItem(T item) { this.item = item; }\n    public T getItem() { return item; }\n}\n\npublic class GenericsDemo {\n    // Generic Method\n    public static <E> void printArray(E[] elements) {\n        for (E element : elements) {\n            System.out.print(element + " ");\n        }\n        System.out.println();\n    }\n\n    public static void main(String[] args) {\n        Box<String> stringBox = new Box<>();\n        stringBox.setItem("Generics are Safe!");\n        System.out.println("Box Value: " + stringBox.getItem());\n\n        Integer[] intArr = {1, 2, 3, 4};\n        System.out.print("Generic Print: ");\n        printArray(intArr);\n    }\n}`,
    output: `Box Value: Generics are Safe!\nGeneric Print: 1 2 3 4 `,
    note: 'Generics work ONLY with Object Reference types, not primitive types.',
    warning: 'You cannot instantiate generic arrays directly like new T[10] due to Type Erasure.',
    tip: 'Remember PECS principle for wildcards: Producer Extends, Consumer Super.',
    interviewTip: '"What is Type Erasure in Java Generics?" — Process where compiler removes generic types and inserts necessary casts for JVM compatibility.',
    mistakes: ['Trying to create primitives in generic classes (Box<int>)', 'Creating generic array instances directly (new T[])'],
    summary: 'Generics enforce compile-time type safety, eliminate manual casts, and support wildcards via Type Erasure.'
  },
  { id: 31, title: 'Multithreading', diff: 'Medium', time: '45 min', phase: 'intermediate', prereq: 'Generics',
    desc: 'Thread creation (Thread class vs Runnable interface), Thread Lifecycle, Synchronization, Locks, and ExecutorService.',
    theory: `Multithreading is the process of executing two or more threads concurrently to maximize CPU utilization.\n\nThread Creation Methods:\n1. Extending \`Thread\` class: Override \`run()\` method, call \`start()\`.\n2. Implementing \`Runnable\` interface: Pass Runnable object to Thread instance (Preferred approach!).\n\nThread Lifecycle States:\nNew → Runnable → Running → Blocked/Waiting → Terminated.\n\nSynchronization:\nWhen multiple threads access shared resources concurrently, data corruption occurs (Race Condition). Use \`synchronized\` keyword or \`ReentrantLock\` to allow only ONE thread into critical section at a time.\n\nExecutor Framework (\`java.util.concurrent\`):\nProvides thread pool management via \`ExecutorService\` instead of manually managing individual Thread objects.`,
    code: `class Counter {\n    private int count = 0;\n    // Synchronized method prevents Race Conditions!\n    public synchronized void increment() {\n        count++;\n    }\n    public int getCount() { return count; }\n}\n\npublic class MultithreadingDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Counter counter = new Counter();\n\n        Thread t1 = new Thread(() -> {\n            for (int i = 0; i < 1000; i++) counter.increment();\n        });\n\n        Thread t2 = new Thread(() -> {\n            for (int i = 0; i < 1000; i++) counter.increment();\n        });\n\n        t1.start(); t2.start();\n        t1.join(); t2.join(); // Wait for threads to finish\n\n        System.out.println("Final Synchronized Count: " + counter.getCount());\n    }\n}`,
    output: `Final Synchronized Count: 2000`,
    note: 'Always call thread.start() to spawn a new OS thread. Calling thread.run() executes it synchronously on current thread!',
    warning: 'Improper nested synchronization can lead to Deadlocks where two threads wait on each other forever.',
    tip: 'Use ExecutorService thread pools (Executors.newFixedThreadPool()) for production server applications.',
    interviewTip: '"Difference between start() and run() in Thread?" — start() creates a new thread and calls run() asynchronously; run() executes synchronously on main thread.',
    mistakes: ['Calling run() directly instead of start()', 'Shared mutable state without synchronization leading to race condition'],
    summary: 'Multithreading executes tasks concurrently. Use Runnable, synchronization/locks for thread safety, and ExecutorService pools.'
  },
  { id: 32, title: 'Lambda Expressions', diff: 'Hard', time: '35 min', phase: 'advanced', prereq: 'Multithreading',
    desc: 'Functional Interfaces (@FunctionalInterface), Consumer, Supplier, Function, Predicate, and Method References.',
    theory: `Lambda Expressions (introduced in Java 8) bring Functional Programming capabilities to Java. A Lambda is an anonymous function without name, return type, or access modifier.\n\nSyntax:\n\`(parameters) -> { body }\`\n\nFunctional Interface:\nAn interface containing EXACTLY ONE abstract method. Annotated with \`@FunctionalInterface\`.\n\nBuilt-in Functional Interfaces (\`java.util.function\`):\n1. \`Predicate<T>\`: Accepts \`T\`, returns \`boolean\` (\`test()\`).\n2. \`Function<T, R>\`: Accepts \`T\`, returns \`R\` (\`apply()\`).\n3. \`Consumer<T>\`: Accepts \`T\`, returns \`void\` (\`accept()\`).\n4. \`Supplier<T>\`: Accepts no arguments, returns \`T\` (\`get()\`).\n\nMethod References (\`::\`):\nShorthand syntax for lambdas calling existing methods (e.g. \`System.out::println\`).`,
    code: `import java.util.function.Predicate;\nimport java.util.function.Function;\n\npublic class LambdaDemo {\n    public static void main(String[] args) {\n        // Predicate Lambda (Check if even)\n        Predicate<Integer> isEven = n -> n % 2 == 0;\n        System.out.println("Is 10 Even? " + isEven.test(10));\n\n        // Function Lambda (String to Length)\n        Function<String, Integer> stringLength = String::length; // Method Reference\n        System.out.println("Length of 'Java': " + stringLength.apply("Java"));\n    }\n}`,
    output: `Is 10 Even? true\nLength of 'Java': 4`,
    note: 'Variables captured inside a Lambda expression must be effectively final.',
    warning: 'Annotating an interface with @FunctionalInterface that has 2 abstract methods throws compiler error.',
    tip: 'Use Method References (Class::method) whenever a lambda simply forwards its parameters to an existing method.',
    interviewTip: '"What is a Functional Interface?" — An interface with exactly one abstract method. Examples: Runnable, Comparator, Consumer, Predicate.',
    mistakes: ['Attempting to modify non-final local variables inside a lambda body', 'Confusing Predicate (returns boolean) with Function (returns value)'],
    summary: 'Lambda expressions provide concise functional syntax for implementing single-method Functional Interfaces.'
  },
  { id: 33, title: 'Stream API', diff: 'Hard', time: '45 min', phase: 'advanced', prereq: 'Lambda Expressions',
    desc: 'Functional processing with Stream pipelines: filter, map, flatMap, reduce, collect, and Parallel Streams.',
    theory: `The Stream API (\`java.util.stream\`, Java 8+) processes collections of objects in a functional, declarative manner.\n\nStream Pipeline Architecture:\n\`Source\` → \`Intermediate Operations\` → \`Terminal Operation\`\n\n1. Stream Sources: \`list.stream()\`, \`Arrays.stream()\`, \`Stream.of()\`\n\n2. Intermediate Operations (Lazy Execution):\n- \`filter(Predicate)\`: Filters elements based on condition.\n- \`map(Function)\`: Transforms elements.\n- \`flatMap(Function)\`: Flattens nested streams.\n- \`sorted()\`: Sorts stream elements.\n- \`distinct()\`: Removes duplicate elements.\n\n3. Terminal Operations (Triggers Pipeline Execution):\n- \`collect(Collectors.toList())\`: Collects into a List/Set/Map.\n- \`forEach(Consumer)\`: Iterates over elements.\n- \`reduce()\`: Combines stream elements into single result.\n- \`count()\`: Returns element count.`,
    code: `import java.util.List;\nimport java.util.Arrays;\nimport java.util.stream.Collectors;\n\npublic class StreamDemo {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList("Alice", "Bob", "Alexander", "Charlie", "Anna");\n\n        // Filter names starting with 'A', convert to uppercase, collect to list\n        List<String> result = names.stream()\n                .filter(name -> name.startsWith("A"))\n                .map(String::toUpperCase)\n                .sorted()\n                .collect(Collectors.toList());\n\n        System.out.println("Filtered & Mapped Names: " + result);\n\n        // Sum using reduce\n        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);\n        int sum = nums.stream().reduce(0, Integer::sum);\n        System.out.println("Sum using Streams: " + sum);\n    }\n}`,
    output: `Filtered & Mapped Names: [ALEXANDER, ALICE, ANNA]\nSum using Streams: 15`,
    note: 'Streams are single-use. Once a terminal operation is executed, the stream is closed and cannot be reused.',
    warning: 'Intermediate operations are lazy — they will never execute unless a Terminal operation is called.',
    tip: 'Use parallelStream() for massive data sets to leverage multi-core CPU parallel processing.',
    interviewTip: '"Difference between map() and flatMap() in Java Streams?" — map() transforms 1 element into 1 element; flatMap() transforms 1 element into a Stream of elements and flattens them.',
    mistakes: ['Attempting to reuse a closed stream', 'Forgetting terminal operation so intermediate logic never runs'],
    summary: 'Stream API provides functional data pipelines with intermediate lazy operations (filter/map) and terminal triggers (collect/reduce).'
  },
  { id: 34, title: 'JDBC', diff: 'Hard', time: '40 min', phase: 'advanced', prereq: 'Stream API',
    desc: 'Java Database Connectivity architecture, Connection, Statement, PreparedStatement, ResultSet, and Transactions.',
    theory: `JDBC (Java Database Connectivity) is a standard Java API (\`java.sql\`) to connect Java applications to relational databases (PostgreSQL, MySQL, Oracle).\n\n5 Steps of JDBC Connectivity:\n1. Load Driver Class: \`Class.forName("org.postgresql.Driver")\`\n2. Create Connection: \`DriverManager.getConnection(url, user, pass)\`\n3. Create Statement / PreparedStatement\n4. Execute Query: \`executeQuery()\` for SELECT, \`executeUpdate()\` for INSERT/UPDATE/DELETE.\n5. Process ResultSet & Close Resources.\n\nPreparedStatement Advantage:\nPrecompiled SQL queries with placeholders (\`?\`). Protects against SQL Injection attacks and executes faster for batch updates.`,
    code: `import java.sql.*;\n\npublic class JdbcDemo {\n    public static void main(String[] args) {\n        String url = "jdbc:h2:mem:testdb"; // In-memory DB\n        String user = "sa", password = "";\n\n        String createTableSQL = "CREATE TABLE Students (id INT PRIMARY KEY, name VARCHAR(50))";\n        String insertSQL = "INSERT INTO Students (id, name) VALUES (?, ?)";\n        String selectSQL = "SELECT * FROM Students";\n\n        try (Connection conn = DriverManager.getConnection(url, user, password);\n             Statement stmt = conn.createStatement();\n             PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {\n\n            stmt.execute(createTableSQL);\n\n            // Parameterized Insertion\n            pstmt.setInt(1, 101);\n            pstmt.setString(2, "Sayan");\n            pstmt.executeUpdate();\n\n            // Query Execution\n            ResultSet rs = stmt.executeQuery(selectSQL);\n            while (rs.next()) {\n                System.out.println("DB Record -> ID: " + rs.getInt("id") + ", Name: " + rs.getString("name"));\n            }\n        } catch (SQLException e) {\n            System.out.println("JDBC Exception: " + e.getMessage());\n        }\n    }\n}`,
    output: `DB Record -> ID: 101, Name: Sayan`,
    note: 'Use PreparedStatement instead of Statement to prevent SQL Injection attacks.',
    warning: 'Always close Connection, Statement, and ResultSet objects to prevent database connection leaks.',
    tip: 'Use Connection Pooling frameworks like HikariCP in web production applications.',
    interviewTip: '"Why is PreparedStatement faster and safer than Statement?" — It is precompiled on DB server and handles escaping automatically to prevent SQL Injection.',
    mistakes: ['String concatenation in SQL queries causing SQL Injection vulnerability', 'Not closing DB connections'],
    summary: 'JDBC connects Java to relational databases. Use PreparedStatement for parameterized secure queries and HikariCP for pooling.'
  },
  { id: 35, title: 'Maven & Build Tools', diff: 'Hard', time: '35 min', phase: 'advanced', prereq: 'JDBC',
    desc: 'Maven build automation, Project Object Model (pom.xml), dependencies, repositories, and build lifecycle.',
    theory: `Apache Maven is a popular build automation and project management tool for Java projects.\n\nKey Concepts of Maven:\n1. \`pom.xml\` (Project Object Model):\nXML file containing project metadata, dependencies (libraries), and plugin configurations.\n\n2. Dependency Management:\nMaven automatically downloads required JAR files and their transitive dependencies from Central Repository to local repository (\`~/.m2/repository\`).\n\n3. Standard Directory Structure:\n- \`src/main/java\`: Java source code.\n- \`src/main/resources\`: Configuration files.\n- \`src/test/java\`: Unit tests.\n\n4. Build Lifecycle Phases:\n\`clean\` → \`compile\` → \`test\` → \`package\` (generates JAR/WAR) → \`install\`.`,
    code: `<!-- Sample pom.xml snippet -->\n<project xmlns="http://maven.apache.org/POM/4.0.0">\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>com.bca.app</groupId>\n  <artifactId>bca-java-app</artifactId>\n  <version>1.0.0</version>\n\n  <dependencies>\n    <!-- PostgreSQL JDBC Driver Dependency -->\n    <dependency>\n      <groupId>org.postgresql</groupId>\n      <artifactId>postgresql</artifactId>\n      <version>42.6.0</version>\n    </dependency>\n  </dependencies>\n</project>`,
    output: `[INFO] --- maven-compiler-plugin:3.11.0:compile (default-compile) @ bca-java-app ---\n[INFO] BUILD SUCCESS`,
    note: 'Run "mvn clean package" to build a deployable executable JAR file.',
    warning: 'Dependency conflicts can occur when two libraries require different versions of the same transitive dependency.',
    tip: 'Use "mvn dependency:tree" in terminal to analyze and resolve dependency tree conflicts.',
    interviewTip: '"What is the difference between compile and runtime dependency scope in Maven?" — compile is needed at build and runtime; runtime is needed only during execution (e.g. JDBC driver implementations).',
    mistakes: ['Manually adding JAR files to build path instead of managing via pom.xml', 'Mismatched directory structure'],
    summary: 'Maven automates dependency management via pom.xml and provides standardized build lifecycles.'
  },
  { id: 36, title: 'Java Modules (JPMS)', diff: 'Hard', time: '30 min', phase: 'advanced', prereq: 'Maven & Build Tools',
    desc: 'Java Platform Module System (Java 9+), module-info.java, requires, exports, and encapsulation.',
    theory: `Introduced in Java 9 (Project Jigsaw), the Java Platform Module System (JPMS) modularizes the JDK and Java applications.\n\nA Module is a named, self-describing collection of code and data declared via \`module-info.java\` at the root of source tree.\n\nKey Module Directives:\n- \`exports package.name\`: Makes package accessible to other modules.\n- \`requires module.name\`: Specifies dependency on another module.\n- \`provides ... with ...\`: Declares service implementation.\n- \`uses class.name\`: Consumes a service.\n\nBenefits: Strong encapsulation (internal packages remain hidden even if public), smaller runtime footprint via \`jlink\` tool.`,
    code: `// File: src/module-info.java\nmodule com.bca.studentapp {\n    requires java.sql;       // Requires JDBC module\n    requires java.desktop;   // Requires Swing GUI module\n    \n    exports com.bca.studentapp.model; // Expose model package\n}`,
    output: `Module com.bca.studentapp compiled cleanly with explicit JPMS encapsulation rules.`,
    note: 'Reflection cannot access non-exported package internals in modular Java without explicit open directives.',
    warning: 'Automatic modules occur when legacy non-modular JAR files are placed on the module path.',
    tip: 'Use jlink tool to create custom lightweight runtime images containing only required Java modules.',
    interviewTip: '"What is module-info.java?" — The descriptor file at root of source directory that defines module dependencies and exports.',
    mistakes: ['Forgetting to export packages that other modules need to access', 'Circular module dependencies'],
    summary: 'JPMS (Java 9+) organizes packages into modules using module-info.java for strong encapsulation and lightweight deployment.'
  },
  { id: 37, title: 'Spring Fundamentals', diff: 'Hard', time: '40 min', phase: 'advanced', prereq: 'Java Modules (JPMS)',
    desc: 'Spring Core Framework, IoC Container, Dependency Injection (@Autowired, @Component), and Spring Boot starters.',
    theory: `The Spring Framework is the industry standard enterprise Java application framework.\n\nCore Spring Concepts:\n\n1. Inversion of Control (IoC):\nInstead of the developer instantiating objects manually via \`new\`, the Spring IoC Container manages object creation, lifecycle, and wiring.\n\n2. Dependency Injection (DI):\nPattern where dependencies are injected into a class automatically by Spring Container via constructor or field injection.\n\n3. Core Annotations:\n- \`@Component\`: Marks a class as a Spring-managed Bean.\n- \`@Service\`: Specialization for business service logic.\n- \`@Repository\`: Specialization for Database DAO layer.\n- \`@Autowired\`: Tells Spring to inject matching Bean automatically.\n- \`@SpringBootApplication\`: Enables auto-configuration and component scanning.`,
    code: `// Spring Boot Service Component\ninterface MessageService {\n    String getMessage();\n}\n\n// @Component registers bean with Spring IoC Container\nclass EmailService implements MessageService {\n    public String getMessage() { return "Spring Dependency Injection active!"; }\n}\n\n// Consumer class receiving injected dependency\nclass NotificationController {\n    private final MessageService service;\n\n    // Constructor Injection (Recommended!)\n    public NotificationController(MessageService service) {\n        this.service = service;\n    }\n\n    public void send() {\n        System.out.println(service.getMessage());\n    }\n}\n\npublic class SpringDemo {\n    public static void main(String[] args) {\n        // Simulating Spring IoC Container DI\n        MessageService emailService = new EmailService();\n        NotificationController controller = new NotificationController(emailService);\n        controller.send();\n    }\n}`,
    output: `Spring Dependency Injection active!`,
    note: 'Constructor injection is preferred over field injection (@Autowired on fields) because it enables immutability and easier testing.',
    warning: 'Circular dependencies between Spring Beans cause BeanCurrentlyInCreationException.',
    tip: 'Use Spring Boot Starters (spring-boot-starter-web, spring-boot-starter-data-jpa) for rapid web backend production setup.',
    interviewTip: '"What is IoC and Dependency Injection in Spring?" — IoC hands object creation control to Spring Container; DI injects dependencies into objects.',
    mistakes: ['Using field injection everywhere making unit testing harder', 'Missing component scanning annotations'],
    summary: 'Spring IoC Container manages component lifecycles, using Dependency Injection to build loosely coupled enterprise systems.'
  },
  { id: 38, title: 'Mini Projects Guide', diff: 'Hard', time: '40 min', phase: 'advanced', prereq: 'Spring Fundamentals',
    desc: 'Architecting Java applications: Layered Architecture (Controller -> Service -> Repository), DAO Pattern, and MVC.',
    theory: `When building real-world Java applications, structure your codebase using Layered Enterprise Architecture:\n\n1. Presentation Layer (Controller / UI):\nHandles HTTP requests or Console Scanner input and presents responses to users.\n\n2. Business Logic Layer (Service):\nContains core business processing rules, validation, and calculations.\n\n3. Data Access Layer (Repository / DAO):\nHandles database queries (JDBC / JPA / Hibernate) or File I/O operations.\n\n4. Domain Model Layer (Entities / DTOs):\nRepresents core data structures (e.g. Student, Account, Product).`,
    code: `// Model Layer\nclass Product {\n    int id;\n    String name;\n    double price;\n    public Product(int id, String name, double price) {\n        this.id = id; this.name = name; this.price = price;\n    }\n}\n\n// Service Layer\nclass ProductService {\n    public double calculateDiscount(Product p) {\n        return p.price > 100 ? p.price * 0.9 : p.price;\n    }\n}\n\npublic class ArchitectureDemo {\n    public static void main(String[] args) {\n        Product laptop = new Product(1, "Gaming Laptop", 1200.0);\n        ProductService service = new ProductService();\n        System.out.println("Original: $" + laptop.price + " -> Discounted: $" + service.calculateDiscount(laptop));\n    }\n}`,
    output: `Original: $1200.0 -> Discounted: $1080.0`,
    note: 'Decouple layers using interfaces so components can be mocked during unit testing.',
    warning: 'Do not put database query execution directly inside UI Controller layers.',
    tip: 'Follow Single Responsibility Principle (SRP) — each class should have only one reason to change.',
    interviewTip: '"Explain Layered Architecture in Java apps." — Presentation (Controller), Service (Business Logic), Repository (Data Persistence), Model (Data Entities).',
    mistakes: ['Mixing database queries directly into console UI input loops', 'Tight coupling between components'],
    summary: 'Structure Java projects cleanly into Model, Repository, Service, and Controller layers for scalability.'
  },
  { id: 39, title: 'Interview Questions', diff: 'Hard', time: '40 min', phase: 'advanced', prereq: 'Mini Projects Guide',
    desc: 'Top technical Java trick questions: equals() vs hashCode(), Garbage Collector tuning, String pool memory, and volatile.',
    theory: `Key High-Frequency Java Interview Topics:\n\n1. \`equals()\` and \`hashCode()\` Contract:\nIf two objects are equal according to \`equals()\`, they MUST have the same \`hashCode()\`. Overriding one without the other breaks HashMap/HashSet lookups!\n\n2. \`volatile\` Keyword:\nEnsures variable reads/writes go directly to Main Memory rather than thread CPU caches, preventing stale thread state visibility.\n\n3. Deep Copy vs Shallow Copy:\nShallow copy duplicates reference pointers to child objects; Deep copy recursively creates duplicate instances of all nested objects.\n\n4. String Pool Internal Memory:\nLiterals reside in SCP. Calling \`str.intern()\` forces Heap String objects into SCP memory.`,
    code: `public class InterviewTricks {\n    public static void main(String[] args) {\n        String s1 = new String("Java").intern();\n        String s2 = "Java";\n        System.out.println("Interned match == : " + (s1 == s2)); // true!\n        \n        Integer x = 127, y = 127;\n        System.out.println("Integer Cache 127 == : " + (x == y)); // true (cached -128 to 127)\n        \n        Integer a = 128, b = 128;\n        System.out.println("Integer Cache 128 == : " + (a == b)); // false (exceeds cache!)\n    }\n}`,
    output: `Interned match == : true\nInteger Cache 127 == : true\nInteger Cache 128 == : false`,
    note: 'Integer wrapper classes cache values between -128 and 127 for memory reusability.',
    warning: 'Never use == to compare Integer objects outside -128 to 127 range!',
    tip: 'Always use .equals() for object comparisons in real enterprise applications.',
    interviewTip: '"What happens if equals() is overridden without hashCode()?" — HashMap lookups fail because equal objects generate different bucket hashes.',
    mistakes: ['Using == for Integer objects exceeding 127', 'Violating equals/hashCode contract'],
    summary: 'Master equals/hashCode contract, volatile visibility, String interning, and Integer caching for technical interviews.'
  },
  { id: 40, title: 'Java Best Practices', diff: 'Hard', time: '35 min', phase: 'advanced', prereq: 'Interview Questions',
    desc: 'Clean Code guidelines, SOLID principles, avoiding NullPointerException, and Effective Java rules.',
    theory: `Essential Industry Best Practices for Writing Professional Java Code:\n\n1. SOLID Principles:\n- Single Responsibility Principle (SRP)\n- Open/Closed Principle (OCP)\n- Liskov Substitution Principle (LSP)\n- Interface Segregation Principle (ISP)\n- Dependency Inversion Principle (DIP)\n\n2. Avoiding NullPointerException (NPE):\n- Use \`Optional<T>\` for optional return types.\n- Use \`Objects.requireNonNull()\`.    \n- Call \`"LITERAL".equals(variable)\` instead of \`variable.equals("LITERAL")\`.\n\n3. Resource Management:\n- Always use Try-With-Resources for Streams, Readers, DB Connections.\n\n4. Immutability:\n- Make classes \`final\`, fields \`private final\`, and provide no setters for thread-safe DTOs (or use Java Records).`,
    code: `import java.util.Optional;\nimport java.util.Objects;\n\npublic class BestPracticesDemo {\n    // Returning Optional to avoid NullPointerException\n    public static Optional<String> findUser(int id) {\n        if (id == 101) return Optional.of("Sayan");\n        return Optional.empty();\n    }\n\n    public static void main(String[] args) {\n        // Safe Null Check Constant comparison\n        String input = null;\n        if ("ADMIN".equals(input)) {\n            System.out.println("Admin Access");\n        } else {\n            System.out.println("Safe comparison avoided NullPointerException!");\n        }\n\n        // Optional usage\n        Optional<String> user = findUser(101);\n        user.ifPresent(name -> System.out.println("Found user: " + name));\n    }\n}`,
    output: `Safe comparison avoided NullPointerException!\nFound user: Sayan`,
    note: '"CONSTANT".equals(var) is null-safe and never throws NullPointerException.',
    warning: 'Avoid passing null values as arguments across method boundaries.',
    tip: 'Use Java 14+ Records (record User(int id, String name) {}) for concise immutable data carrier classes.',
    interviewTip: '"How do you prevent NullPointerException in Java?" — Use Optional<T>, null-safe literal comparison, Objects.requireNonNull(), and Java Records.',
    mistakes: ['Calling variable.equals("CONSTANT") when variable could be null', 'Returning null instead of Empty Collection or Optional'],
    summary: 'Apply SOLID design, use Optional & Records, favor Try-With-Resources, and follow null-safe programming practices.'
  }
];

/* ============================================================
   PROGRAMS DATA — CATEGORIZED COLLECTION
   ============================================================ */
export const JAVA_PROGRAMS = [
  { id: 1, title: 'Java Hello World', cat: 'Basic', diff: 'Easy',
    code: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, BCA Java World!");\n    }\n}`
  },
  { id: 2, title: 'Simple & Compound Interest Calculator', cat: 'Basic', diff: 'Easy',
    code: `public class InterestCalculator {\n    public static void main(String[] args) {\n        double p = 10000, r = 7.5, t = 3;\n        double si = (p * r * t) / 100;\n        double ci = p * Math.pow((1 + r / 100), t) - p;\n        System.out.printf("SI: %.2f, CI: %.2f\\n", si, ci);\n    }\n}`
  },
  { id: 3, title: 'Palindrome Number Check', cat: 'Basic', diff: 'Easy',
    code: `public class PalindromeNum {\n    public static void main(String[] args) {\n        int num = 12321, orig = num, rev = 0;\n        while (num > 0) {\n            rev = rev * 10 + (num % 10);\n            num /= 10;\n        }\n        System.out.println(orig + (orig == rev ? " is Palindrome" : " is NOT Palindrome"));\n    }\n}`
  },
  { id: 4, title: 'Prime Number Generator', cat: 'Basic', diff: 'Easy',
    code: `public class PrimeGenerator {\n    public static boolean isPrime(int n) {\n        if (n <= 1) return false;\n        for (int i = 2; i <= Math.sqrt(n); i++) if (n % i == 0) return false;\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.print("Primes up to 30: ");\n        for (int i = 1; i <= 30; i++) if (isPrime(i)) System.out.print(i + " ");\n    }\n}`
  },
  { id: 5, title: 'Factorial (Recursive & Iterative)', cat: 'Basic', diff: 'Easy',
    code: `public class Factorial {\n    public static long fact(int n) {\n        return (n <= 1) ? 1 : n * fact(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println("5! = " + fact(5));\n    }\n}`
  },
  { id: 6, title: 'Fibonacci Series', cat: 'Basic', diff: 'Easy',
    code: `public class Fibonacci {\n    public static void main(String[] args) {\n        int n = 8, a = 0, b = 1;\n        System.out.print("Fibonacci: ");\n        for (int i = 1; i <= n; i++) {\n            System.out.print(a + " ");\n            int next = a + b; a = b; b = next;\n        }\n    }\n}`
  },
  { id: 7, title: 'Find Min and Max in Array', cat: 'Arrays', diff: 'Easy',
    code: `public class ArrayMinMax {\n    public static void main(String[] args) {\n        int[] arr = {34, 7, 89, 12, 56};\n        int min = arr[0], max = arr[0];\n        for (int n : arr) {\n            if (n < min) min = n;\n            if (n > max) max = n;\n        }\n        System.out.println("Min: " + min + ", Max: " + max);\n    }\n}`
  },
  { id: 8, title: 'Reverse Array In-Place', cat: 'Arrays', diff: 'Easy',
    code: `import java.util.Arrays;\npublic class ReverseArray {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        for (int i = 0, j = arr.length - 1; i < j; i++, j--) {\n            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;\n        }\n        System.out.println("Reversed: " + Arrays.toString(arr));\n    }\n}`
  },
  { id: 9, title: 'Matrix Addition', cat: 'Arrays', diff: 'Medium',
    code: `public class MatrixAdd {\n    public static void main(String[] args) {\n        int[][] a = {{1, 2}, {3, 4}};\n        int[][] b = {{5, 6}, {7, 8}};\n        int[][] sum = new int[2][2];\n        for (int i = 0; i < 2; i++)\n            for (int j = 0; j < 2; j++)\n                sum[i][j] = a[i][j] + b[i][j];\n        System.out.println("Sum [0][0]: " + sum[0][0]);\n    }\n}`
  },
  { id: 10, title: 'Anagram Checker', cat: 'Strings', diff: 'Medium',
    code: `import java.util.Arrays;\npublic class AnagramCheck {\n    public static boolean isAnagram(String s1, String s2) {\n        char[] c1 = s1.replaceAll("\\s", "").toLowerCase().toCharArray();\n        char[] c2 = s2.replaceAll("\\s", "").toLowerCase().toCharArray();\n        Arrays.sort(c1); Arrays.sort(c2);\n        return Arrays.equals(c1, c2);\n    }\n    public static void main(String[] args) {\n        System.out.println("listen & silent: " + isAnagram("listen", "silent"));\n    }\n}`
  },
  { id: 11, title: 'Bank Account Encapsulation', cat: 'OOP', diff: 'Easy',
    code: `class Account {\n    private double balance;\n    public void deposit(double amt) { if (amt > 0) balance += amt; }\n    public double getBalance() { return balance; }\n}\npublic class OOPDemo {\n    public static void main(String[] args) {\n        Account acc = new Account();\n        acc.deposit(500.0);\n        System.out.println("Balance: $" + acc.getBalance());\n    }\n}`
  },
  { id: 12, title: 'Inheritance & Polymorphism', cat: 'OOP', diff: 'Medium',
    code: `abstract class Vehicle { abstract void drive(); }\nclass Car extends Vehicle { void drive() { System.out.println("Car driving..."); } }\npublic class PolymorphismApp {\n    public static void main(String[] args) {\n        Vehicle v = new Car(); v.drive();\n    }\n}`
  },
  { id: 13, title: 'Custom Exception Handling', cat: 'Exceptions', diff: 'Medium',
    code: `class LowBalanceException extends Exception {\n    public LowBalanceException(String m) { super(m); }\n}\npublic class ExceptionTest {\n    public static void withdraw(double bal, double amt) throws LowBalanceException {\n        if (amt > bal) throw new LowBalanceException("Insufficient Funds!");\n    }\n    public static void main(String[] args) {\n        try { withdraw(100, 200); } catch (LowBalanceException e) { System.out.println(e.getMessage()); }\n    }\n}`
  },
  { id: 14, title: 'File Reader & Writer', cat: 'File I/O', diff: 'Medium',
    code: `import java.io.*;\npublic class FileDemo {\n    public static void main(String[] args) throws IOException {\n        FileWriter fw = new FileWriter("test.txt");\n        fw.write("Java File IO"); fw.close();\n        BufferedReader br = new BufferedReader(new FileReader("test.txt"));\n        System.out.println("Read: " + br.readLine()); br.close();\n    }\n}`
  },
  { id: 15, title: 'ArrayList Operations', cat: 'Collections', diff: 'Medium',
    code: `import java.util.*;\npublic class ListDemo {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(Arrays.asList("Java", "C++", "Python"));\n        list.remove("C++");\n        System.out.println("List: " + list);\n    }\n}`
  },
  { id: 16, title: 'HashMap Frequency Counter', cat: 'Collections', diff: 'Medium',
    code: `import java.util.*;\npublic class WordCount {\n    public static void main(String[] args) {\n        String[] words = {"apple", "banana", "apple", "cherry", "banana", "apple"};\n        Map<String, Integer> map = new HashMap<>();\n        for (String w : words) map.put(w, map.getOrDefault(w, 0) + 1);\n        System.out.println("Frequencies: " + map);\n    }\n}`
  },
  { id: 17, title: 'Merge Sort Algorithm', cat: 'Sorting', diff: 'Hard',
    code: `import java.util.Arrays;\npublic class MergeSort {\n    public static void mergeSort(int[] a, int n) {\n        if (n < 2) return;\n        int mid = n / 2;\n        int[] l = new int[mid], r = new int[n - mid];\n        for (int i = 0; i < mid; i++) l[i] = a[i];\n        for (int i = mid; i < n; i++) r[i - mid] = a[i];\n        mergeSort(l, mid); mergeSort(r, n - mid);\n        merge(a, l, r, mid, n - mid);\n    }\n    private static void merge(int[] a, int[] l, int[] r, int left, int right) {\n        int i = 0, j = 0, k = 0;\n        while (i < left && j < right) a[k++] = (l[i] <= r[j]) ? l[i++] : r[j++];\n        while (i < left) a[k++] = l[i++];\n        while (j < right) a[k++] = r[j++];\n    }\n    public static void main(String[] args) {\n        int[] arr = {38, 27, 43, 3, 9, 82, 10};\n        mergeSort(arr, arr.length);\n        System.out.println("Sorted: " + Arrays.toString(arr));\n    }\n}`
  },
  { id: 18, title: 'Binary Search (Recursive)', cat: 'Searching', diff: 'Medium',
    code: `public class BinarySearch {\n    public static int search(int[] arr, int l, int r, int x) {\n        if (r >= l) {\n            int mid = l + (r - l) / 2;\n            if (arr[mid] == x) return mid;\n            if (arr[mid] > x) return search(arr, l, mid - 1, x);\n            return search(arr, mid + 1, r, x);\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        int[] arr = {2, 3, 4, 10, 40};\n        System.out.println("Index of 10: " + search(arr, 0, arr.length - 1, 10));\n    }\n}`
  },
  { id: 19, title: 'Star Pyramid Pattern', cat: 'Patterns', diff: 'Easy',
    code: `public class StarPyramid {\n    public static void main(String[] args) {\n        int rows = 5;\n        for (int i = 1; i <= rows; i++) {\n            for (int j = i; j < rows; j++) System.out.print(" ");\n            for (int k = 1; k <= (2 * i - 1); k++) System.out.print("*");\n            System.out.println();\n        }\n    }\n}`
  },
  { id: 20, title: 'Stream API Filtering & Mapping', cat: 'Streams', diff: 'Hard',
    code: `import java.util.*;\nimport java.util.stream.Collectors;\npublic class StreamExample {\n    public static void main(String[] args) {\n        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);\n        List<Integer> evensSquared = list.stream()\n            .filter(n -> n % 2 == 0)\n            .map(n -> n * n)\n            .collect(Collectors.toList());\n        System.out.println("Evens Squared: " + evensSquared);\n    }\n}`
  }
];

/* ============================================================
   CODING PRACTICE PROBLEMS
   ============================================================ */
export const JAVA_PRACTICE_PROBLEMS = [
  { id: 1, title: 'Factorial of N', difficulty: 'Easy', tags: ['Math', 'Recursion'],
    desc: 'Write a program to calculate the factorial of a non-negative integer N.',
    constraints: '0 <= N <= 20', sampleInput: '5', sampleOutput: '120',
    explanation: '5! = 5 * 4 * 3 * 2 * 1 = 120',
    solution: `public class Solution {\n    public static long factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n}`
  },
  { id: 2, title: 'Reverse a String', difficulty: 'Easy', tags: ['Strings'],
    desc: 'Given a string S, return the string reversed.',
    constraints: '1 <= S.length() <= 1000', sampleInput: '"Java"', sampleOutput: '"avaJ"',
    explanation: 'Reversing character by character produces avaJ',
    solution: `public class Solution {\n    public static String reverseString(String s) {\n        return new StringBuilder(s).reverse().toString();\n    }\n}`
  },
  { id: 3, title: 'Find Duplicates in Array', difficulty: 'Medium', tags: ['Arrays', 'HashSet'],
    desc: 'Given an integer array nums, return true if any value appears at least twice in the array.',
    constraints: '1 <= nums.length <= 10^5', sampleInput: '[1, 2, 3, 1]', sampleOutput: 'true',
    explanation: 'Value 1 appears twice.',
    solution: `import java.util.HashSet;\nimport java.util.Set;\npublic class Solution {\n    public static boolean containsDuplicate(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int num : nums) {\n            if (!set.add(num)) return true;\n        }\n        return false;\n    }\n}`
  },
  { id: 4, title: 'Valid Parentheses Checker', difficulty: 'Medium', tags: ['Stack', 'Strings'],
    desc: 'Given a string containing brackets (), {}, [], determine if the input string is valid.',
    constraints: '1 <= s.length <= 10^4', sampleInput: '"({[]})"', sampleOutput: 'true',
    explanation: 'Every opening bracket is properly closed in correct order.',
    solution: `import java.util.ArrayDeque;\nimport java.util.Deque;\npublic class Solution {\n    public static boolean isValid(String s) {\n        Deque<Character> stack = new ArrayDeque<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}`
  },
  { id: 5, title: 'Two Sum Problem', difficulty: 'Medium', tags: ['HashMap', 'Arrays'],
    desc: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    constraints: '2 <= nums.length <= 10^4', sampleInput: 'nums = [2,7,11,15], target = 9', sampleOutput: '[0, 1]',
    explanation: 'nums[0] + nums[1] = 2 + 7 = 9.',
    solution: `import java.util.HashMap;\nimport java.util.Map;\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) return new int[]{map.get(complement), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`
  }
];

export const JAVA_STARTER_CODE = {
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}`
};

/* ============================================================
   QUIZ DATA
   ============================================================ */
export const JAVA_QUIZ_DATA = {
  easy: [
    { q: 'Which keyword is used to create an Object instance in Java?', options: ['class', 'new', 'create', 'alloc'], ans: 1, exp: 'The "new" keyword allocates memory in Heap for a new Object.' },
    { q: 'What is the size of int primitive data type in Java?', options: ['2 bytes', '4 bytes', '8 bytes', 'Depends on OS'], ans: 1, exp: 'In Java, int is strictly 4 bytes (32-bit) on all platforms.' },
    { q: 'Which component executes Java Bytecode?', options: ['JDK', 'JRE', 'JVM', 'JDB'], ans: 2, exp: 'The Java Virtual Machine (JVM) executes compiled bytecode (.class files).' },
    { q: 'Which package is automatically imported in every Java file?', options: ['java.util', 'java.io', 'java.lang', 'java.net'], ans: 2, exp: 'java.lang package is imported by default in all Java files.' },
    { q: 'What is the default value of an instance boolean variable?', options: ['true', 'false', '0', 'null'], ans: 1, exp: 'Instance boolean variables default to false.' }
  ],
  medium: [
    { q: 'Which mechanism handles multiple inheritance in Java?', options: ['Abstract Classes', 'Interfaces', 'Packages', 'Wrapper Classes'], ans: 1, exp: 'A class can implement multiple interfaces, achieving multiple inheritance of behavior.' },
    { q: 'Where are string literals stored in Java memory?', options: ['Stack Area', 'String Constant Pool (Heap)', 'Native Stack', 'PC Register'], ans: 1, exp: 'String literals are stored in the String Constant Pool inside Heap memory.' },
    { q: 'What keyword prevents a method from being overridden in subclasses?', options: ['static', 'abstract', 'final', 'super'], ans: 2, exp: 'Declaring a method as final prevents child classes from overriding it.' },
    { q: 'Which collection class guarantees insertion order and allows duplicates?', options: ['HashSet', 'ArrayList', 'TreeSet', 'HashMap'], ans: 1, exp: 'ArrayList maintains insertion order and allows duplicate elements.' },
    { q: 'What happens if static block is present in a Java class?', options: ['Executes every time an object is created', 'Executes once when class is loaded by JVM', 'Executes after main() completes', 'Does not execute automatically'], ans: 1, exp: 'Static block executes once when the classloader loads the class into memory.' }
  ],
  hard: [
    { q: 'What is Type Erasure in Java Generics?', options: ['Removing unused objects by GC', 'Erasing generic types at compile time and replacing with bounds/Object', 'Casting primitives to wrappers', 'Deleting class files'], ans: 1, exp: 'Compiler erases generic types at compile time for backward JVM compatibility.' },
    { q: 'What is the result of calling thread.run() instead of thread.start()?', options: ['Throws IllegalThreadStateException', 'Executes asynchronously on new OS thread', 'Executes synchronously on current calling thread', 'Terminates process'], ans: 2, exp: 'Calling run() directly executes the method synchronously on the current thread.' },
    { q: 'Which intermediate operation in Stream API flattens nested streams?', options: ['map()', 'flatMap()', 'filter()', 'reduce()'], ans: 1, exp: 'flatMap() transforms elements into streams and flattens them into a single stream.' },
    { q: 'What keyword prevents a field from being serialized during Object I/O?', options: ['volatile', 'transient', 'static', 'native'], ans: 1, exp: 'The transient keyword tells JVM to skip serializing the marked field.' },
    { q: 'What does volatile keyword guarantee in Java multithreading?', options: ['Mutual exclusion', 'Atomicity of operations', 'Main Memory visibility across CPU thread caches', 'Prevents Deadlocks'], ans: 2, exp: 'volatile guarantees reads and writes go straight to Main Memory, ensuring visibility.' }
  ]
};

/* ============================================================
   PROJECTS DATA
   ============================================================ */
export const JAVA_PROJECTS = [
  { title: 'Student Management System', diff: 'Beginner', time: '4-6 hrs', emoji: '📂',
    desc: 'Console-based CRUD application to add, view, search, update, and delete student records with file persistence.',
    features: ['Object-Oriented Architecture', 'ArrayList / File I/O Storage', 'Input Validation & Exception Handling']
  },
  { title: 'Online Banking Console', diff: 'Intermediate', time: '8-10 hrs', emoji: '💳',
    desc: 'Simulates bank accounts with deposits, withdrawals, fund transfers, transaction history, and custom exception handling.',
    features: ['Encapsulation & Security', 'Custom LowBalanceException', 'Transaction Audit Log Export']
  },
  { title: 'Library Management System', diff: 'Intermediate', time: '10-12 hrs', emoji: '📚',
    desc: 'Book issuing, returning, fine calculation, author search, and category mapping using Collections & HashMap.',
    features: ['HashMap & PriorityQueue Data Structures', 'Date & Time Fine Calculation', 'Modular Layered Design']
  },
  { title: 'Hospital Management System', diff: 'Intermediate', time: '12-14 hrs', emoji: '🏥',
    desc: 'Doctor appointment scheduling, patient records, bill generation, and medical inventory tracking.',
    features: ['Polymorphic Staff Classes', 'Search & Filter Engine', 'Receipt Exporter']
  },
  { title: 'ATM Machine Simulator', diff: 'Intermediate', time: '6-8 hrs', emoji: '🏧',
    desc: 'Simulates physical ATM terminal with PIN authentication, cash withdrawal logic, balance inquiry, and mini-statement.',
    features: ['State Machine Design', 'Security Validation', 'Receipt Printing']
  },
  { title: 'Expense Tracker Application', diff: 'Advanced', time: '15-20 hrs', emoji: '📊',
    desc: 'Track monthly income and expenses, filter by categories, calculate totals, and export summary reports.',
    features: ['Java Stream API Data Processing', 'File Persistence (CSV / JSON)', 'Category Breakdown Analytics']
  }
];

/* ============================================================
   INTERVIEW QUESTIONS DATA
   ============================================================ */
export const JAVA_INTERVIEW_QUESTIONS = {
  beginner: [
    { q: 'What is Java and why is it platform independent?', a: 'Java is a high-level OOP language. It is platform independent because Java code compiles into bytecode (.class), which is executed by the JVM on any operating system.' },
    { q: 'What is the difference between JDK, JRE, and JVM?', a: 'JDK is the development kit (compiler + tools + JRE). JRE is runtime environment (JVM + class libraries). JVM is the virtual machine executing bytecode.' },
    { q: 'Is String a primitive type in Java?', a: 'No. String is a Class (Reference Type) in the java.lang package. String literals are cached in the String Constant Pool.' },
    { q: 'Why is main() method declared static in Java?', a: 'Because JVM needs to invoke main() before any object instance of the class has been created in memory.' }
  ],
  intermediate: [
    { q: 'Explain equals() vs == in Java.', a: '== checks reference memory address equality (same object in heap). .equals() compares actual object content values.' },
    { q: 'What is the equals() and hashCode() contract?', a: 'If two objects are equal according to equals(), they MUST return the exact same hashCode(). Violating this breaks HashMap and HashSet functionality.' },
    { q: 'Difference between ArrayList and LinkedList?', a: 'ArrayList uses resizable dynamic array (fast random lookup O(1)). LinkedList uses doubly linked list (fast insertion/deletion O(1)).' },
    { q: 'What is the purpose of the super keyword?', a: 'super refers to the immediate parent class object. It is used to call parent constructors super() or parent methods super.method().' }
  ],
  advanced: [
    { q: 'What is Type Erasure in Generics?', a: 'Type erasure is the process where Java compiler erases generic type parameters at compile time and replaces them with bounds or Object for backward compatibility.' },
    { q: 'What is the volatile keyword in multithreading?', a: 'volatile guarantees that reads/writes to a variable bypass thread CPU caches and go directly to Main Memory, ensuring visibility across threads.' },
    { q: 'Difference between map() and flatMap() in Streams?', a: 'map() applies 1-to-1 transformation. flatMap() applies 1-to-many transformation and flattens nested Stream of Streams into a single Stream.' },
    { q: 'How does HashMap handle collisions internally in Java 8+?', a: 'HashMap uses array of buckets containing LinkedList nodes. If bucket size exceeds threshold (TREEIFY_THRESHOLD = 8), it converts to a Red-Black Tree for O(log n) lookups.' }
  ]
};

/* ============================================================
   DOWNLOADS DATA
   ============================================================ */
export const JAVA_DOWNLOADS = [
  { title: 'Java Complete Handcrafted Notes', type: 'PDF Document', size: '5.2 MB', updated: 'July 2026', color: '#EF4444', icon: '📄' },
  { title: 'Java Collections & Streams Cheat Sheet', type: 'PDF Document', size: '1.5 MB', updated: 'June 2026', color: '#3B82F6', icon: '📋' },
  { title: '100+ Java Standard Programs Pack', type: 'ZIP Archive', size: '3.8 MB', updated: 'July 2026', color: '#10B981', icon: '📦' },
  { title: 'Top 100 Java Interview Questions & Answers', type: 'PDF Document', size: '2.9 MB', updated: 'July 2026', color: '#8B5CF6', icon: '📄' },
  { title: 'BCA Java Lab Manual & Practice Solutions', type: 'PDF Document', size: '4.1 MB', updated: 'May 2026', color: '#F59E0B', icon: '📑' }
];

/* ============================================================
   ROADMAP MILESTONES DATA
   ============================================================ */
export const JAVA_MILESTONES = [
  { phase: 'Phase 1: Basics & Setup', items: ['Java Architecture & JVM', 'JDK Setup', 'Variables & Data Types', 'Operators & Inputs', 'Control Statements & Loops'] },
  { phase: 'Phase 2: Core Fundamentals', items: ['Arrays & Matrices', 'String & StringBuilder', 'Methods & Overloading', 'Constructors & Class Design'] },
  { phase: 'Phase 3: Object-Oriented Java', items: ['Encapsulation & Access Modifiers', 'Inheritance & super', 'Polymorphism & Dispatch', 'Abstraction & Interfaces', 'Packages'] },
  { phase: 'Phase 4: Robust & Advanced Core', items: ['Exception Handling & Custom Exceptions', 'File Handling & I/O Streams', 'Collections Framework', 'Generics & Wildcards', 'Multithreading & Synchronization'] },
  { phase: 'Phase 5: Modern Java 8+ & Frameworks', items: ['Lambda Expressions', 'Stream API Pipelines', 'JDBC Database Connectivity', 'Maven & Modules', 'Spring Fundamentals'] }
];

/* ============================================================
   TAB COMPONENTS
   ============================================================ */

// 1. OVERVIEW TAB
const OverviewTab = ({ setActiveTab }) => (
  <div className="j-overview-container">
    <div className="j-overview-grid">
      <div className="j-card j-about-card">
        <h3><BookOpen size={18} /> About Java Platform</h3>
        <p>Java is an object-oriented, class-based, high-level programming language designed for platform independence via the Java Virtual Machine (JVM). With its WORA (Write Once, Run Anywhere) capability, Java powers backends, Android apps, enterprise platforms, and big data systems globally.</p>
        <div className="j-feature-pills">
          <span>Object-Oriented</span><span>Platform Independent</span><span>Multithreaded</span><span>Garbage Collected</span><span>Robust & Secure</span>
        </div>
      </div>

      <div className="j-card j-highlights-card">
        <h3><Zap size={18} /> Why Master Java?</h3>
        <ul>
          <li><CheckCircle size={14} /> <strong>Enterprise Dominance:</strong> Trusted by 90%+ of Fortune 500 companies for core backend infrastructure.</li>
          <li><CheckCircle size={14} /> <strong>Spring Boot Ecosystem:</strong> Top choice for building scalable microservices and REST APIs.</li>
          <li><CheckCircle size={14} /> <strong>Android & Cloud:</strong> Powerhouse language for native mobile apps and cloud applications.</li>
          <li><CheckCircle size={14} /> <strong>Lucrative Careers:</strong> Massive hiring demand for Java Developers, Software Engineers, and Backend Architects.</li>
        </ul>
      </div>
    </div>

    <div className="j-quick-actions">
      <h3>Accelerate Your Learning Path</h3>
      <div className="j-action-buttons">
        <button className="j-action-btn" onClick={() => setActiveTab('lessons')}><BookOpen size={16} /> Explore 40 Lessons</button>
        <button className="j-action-btn" onClick={() => setActiveTab('programs')}><Code2 size={16} /> View 20+ Programs</button>
        <button className="j-action-btn" onClick={() => setActiveTab('quiz')}><HelpCircle size={16} /> Take Java Quiz</button>
        <button className="j-action-btn" onClick={() => setActiveTab('projects')}><Trophy size={16} /> Build Projects</button>
      </div>
    </div>
  </div>
);

// 2. ROADMAP TAB
const RoadmapTab = ({ setActiveTab, setActiveLessonId }) => (
  <div className="j-roadmap-container">
    <div className="j-roadmap-header">
      <h2><Map size={22} /> Java Learning Roadmap</h2>
      <p>Follow this structured step-by-step milestone path to master Java from scratch to framework ready.</p>
    </div>

    <div className="j-roadmap-timeline">
      {JAVA_MILESTONES.map((m, idx) => (
        <div key={idx} className="j-timeline-node">
          <div className="j-node-badge">{idx + 1}</div>
          <div className="j-node-content">
            <h4>{m.phase}</h4>
            <ul className="j-node-list">
              {m.items.map((item, i) => (
                <li key={i}><CheckCircle size={13} /> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 3. LESSONS TAB
const LessonsTab = ({ activeLessonId, setActiveLessonId }) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const currentLesson = JAVA_LESSONS.find(l => l.id === activeLessonId) || JAVA_LESSONS[0];

  const filteredLessons = JAVA_LESSONS.filter(l =>
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyCode = () => {
    navigator.clipboard.writeText(currentLesson.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="j-lessons-layout">
      {/* Sidebar List */}
      <div className="j-lessons-sidebar">
        <div className="j-search-box">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search 40 Java Lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="j-lesson-list">
          {filteredLessons.map(lesson => (
            <button
              key={lesson.id}
              className={`j-sidebar-item ${lesson.id === activeLessonId ? 'active' : ''}`}
              onClick={() => setActiveLessonId(lesson.id)}
            >
              <span className="j-lesson-num">{lesson.id}</span>
              <div className="j-lesson-info">
                <span className="j-sidebar-title">{lesson.title}</span>
                <span className="j-sidebar-meta">{lesson.diff} • {lesson.time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Viewer */}
      <div className="j-lesson-viewer">
        <div className="j-viewer-header">
          <div className="j-header-tags">
            <span className="j-tag-diff">{currentLesson.diff}</span>
            <span className="j-tag-time"><Clock size={12} /> {currentLesson.time}</span>
            <span className="j-tag-phase">{currentLesson.phase}</span>
          </div>
          <h2 className="j-viewer-title">{currentLesson.id}. {currentLesson.title}</h2>
          <p className="j-viewer-desc">{currentLesson.desc}</p>
        </div>

        <div className="j-section-block">
          <h3><BookOpen size={16} /> Theory & Concepts</h3>
          <div className="j-theory-text">{currentLesson.theory}</div>
        </div>

        <div className="j-section-block">
          <div className="j-code-header">
            <span><Code2 size={15} /> Java Source Code</span>
            <button onClick={copyCode} className="j-copy-btn">
              {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy Code</>}
            </button>
          </div>
          <pre className="j-code-box"><code>{currentLesson.code}</code></pre>
        </div>

        <div className="j-section-block">
          <h3><Terminal size={16} /> Program Output</h3>
          <pre className="j-output-box"><code>{currentLesson.output}</code></pre>
        </div>

        {/* Tip & Mistake Cards */}
        <div className="j-tips-grid">
          {currentLesson.note && (
            <div className="j-info-card j-card-note">
              <Info size={16} />
              <div><strong>Note:</strong> {currentLesson.note}</div>
            </div>
          )}
          {currentLesson.warning && (
            <div className="j-info-card j-card-warning">
              <AlertTriangle size={16} />
              <div><strong>Warning:</strong> {currentLesson.warning}</div>
            </div>
          )}
          {currentLesson.interviewTip && (
            <div className="j-info-card j-card-interview">
              <Lightbulb size={16} />
              <div><strong>Interview Tip:</strong> {currentLesson.interviewTip}</div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="j-lesson-nav">
          <button
            disabled={currentLesson.id === 1}
            onClick={() => setActiveLessonId(prev => prev - 1)}
            className="j-nav-btn"
          >
            <ChevronLeft size={16} /> Previous Lesson
          </button>
          <button
            disabled={currentLesson.id === JAVA_LESSONS.length}
            onClick={() => setActiveLessonId(prev => prev + 1)}
            className="j-nav-btn j-btn-next"
          >
            Next Lesson <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. PROGRAMS TAB
const ProgramsTab = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeProg, setActiveProg] = useState(JAVA_PROGRAMS[0]);
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Basic', 'Arrays', 'Strings', 'OOP', 'Exceptions', 'File I/O', 'Collections', 'Sorting', 'Searching', 'Patterns', 'Streams'];

  const filteredProgs = selectedCat === 'All'
    ? JAVA_PROGRAMS
    : JAVA_PROGRAMS.filter(p => p.cat === selectedCat);

  const copyCode = () => {
    navigator.clipboard.writeText(activeProg.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="j-programs-container">
      <div className="j-cat-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`j-cat-btn ${selectedCat === cat ? 'active' : ''}`}
            onClick={() => setSelectedCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="j-programs-layout">
        <div className="j-prog-list">
          {filteredProgs.map(p => (
            <div
              key={p.id}
              className={`j-prog-card ${p.id === activeProg.id ? 'active' : ''}`}
              onClick={() => setActiveProg(p)}
            >
              <div className="j-prog-card-header">
                <h4>{p.title}</h4>
                <span className="j-prog-badge">{p.diff}</span>
              </div>
              <span className="j-prog-cat">{p.cat}</span>
            </div>
          ))}
        </div>

        <div className="j-prog-viewer">
          <div className="j-prog-viewer-header">
            <h3>{activeProg.title}</h3>
            <button onClick={copyCode} className="j-copy-btn">
              {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy Code</>}
            </button>
          </div>
          <pre className="j-code-box"><code>{activeProg.code}</code></pre>
        </div>
      </div>
    </div>
  );
};

// 5. CODING PRACTICE TAB
const CodingPracticeTab = () => {
  const [activeProb, setActiveProb] = useState(JAVA_PRACTICE_PROBLEMS[0]);

  return (
    <div className="j-practice-container">
      <div className="j-practice-layout">
        <div className="j-prob-list">
          {JAVA_PRACTICE_PROBLEMS.map(p => (
            <div
              key={p.id}
              className={`j-prob-card ${p.id === activeProb.id ? 'active' : ''}`}
              onClick={() => setActiveProb(p)}
            >
              <h4>{p.title}</h4>
              <div className="j-prob-tags">
                <span className="j-diff-tag">{p.difficulty}</span>
                {p.tags.map(t => <span key={t} className="j-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="j-prob-details">
          <h2>{activeProb.title}</h2>
          <p className="j-prob-desc">{activeProb.desc}</p>
          <div className="j-prob-section">
            <strong>Constraints:</strong> <code>{activeProb.constraints}</code>
          </div>
          <div className="j-prob-io">
            <div>
              <strong>Sample Input:</strong>
              <pre>{activeProb.sampleInput}</pre>
            </div>
            <div>
              <strong>Sample Output:</strong>
              <pre>{activeProb.sampleOutput}</pre>
            </div>
          </div>
          <div className="j-prob-section">
            <strong>Explanation:</strong> {activeProb.explanation}
          </div>
          <div className="j-prob-section">
            <strong>Solution Code (Java):</strong>
            <pre className="j-code-box"><code>{activeProb.solution}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. QUIZ TAB
const QuizTab = () => {
  const [level, setLevel] = useState('easy');
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = JAVA_QUIZ_DATA[level] || JAVA_QUIZ_DATA.easy;
  const q = questions[currentQ];

  const handleOptionClick = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === q.ans) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = (lvl) => {
    setLevel(lvl);
    setCurrentQ(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="j-quiz-container">
      <div className="j-level-selector">
        {['easy', 'medium', 'hard'].map(l => (
          <button
            key={l}
            className={`j-level-btn ${level === l ? 'active' : ''}`}
            onClick={() => resetQuiz(l)}
          >
            {l.toUpperCase()} QUIZ
          </button>
        ))}
      </div>

      {!showResult ? (
        <div className="j-quiz-card">
          <div className="j-quiz-progress">Question {currentQ + 1} of {questions.length}</div>
          <h3 className="j-quiz-q">{q.q}</h3>
          <div className="j-options-list">
            {q.options.map((opt, idx) => {
              let btnClass = 'j-opt-btn';
              if (selectedOption !== null) {
                if (idx === q.ans) btnClass += ' correct';
                else if (idx === selectedOption) btnClass += ' wrong';
              }
              return (
                <button
                  key={idx}
                  className={btnClass}
                  onClick={() => handleOptionClick(idx)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="j-explanation-box">
              <strong>Explanation:</strong> {q.exp}
            </div>
          )}

          {selectedOption !== null && (
            <button className="j-btn-primary j-next-q-btn" onClick={handleNext}>
              {currentQ + 1 === questions.length ? 'See Results' : 'Next Question'}
            </button>
          )}
        </div>
      ) : (
        <div className="j-quiz-result">
          <Trophy size={48} color="#A855F7" />
          <h2>Quiz Completed!</h2>
          <p className="j-score-text">You Scored <strong>{score}</strong> / <strong>{questions.length}</strong></p>
          <button className="j-btn-primary" onClick={() => resetQuiz(level)}>Try Again</button>
        </div>
      )}
    </div>
  );
};

// 7. PROJECTS TAB
const ProjectsTab = () => (
  <div className="j-projects-container">
    <div className="j-projects-grid">
      {JAVA_PROJECTS.map((proj, idx) => (
        <div key={idx} className="j-proj-card">
          <div className="j-proj-icon">{proj.emoji}</div>
          <div className="j-proj-header">
            <h3>{proj.title}</h3>
            <span className="j-proj-diff">{proj.diff} • {proj.time}</span>
          </div>
          <p className="j-proj-desc">{proj.desc}</p>
          <div className="j-proj-features">
            <strong>Key Features:</strong>
            <ul>
              {proj.features.map((f, i) => <li key={i}><CheckCircle size={12} /> {f}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 8. INTERVIEW QUESTIONS TAB
const InterviewTab = () => {
  const [level, setLevel] = useState('beginner');
  const questions = JAVA_INTERVIEW_QUESTIONS[level] || JAVA_INTERVIEW_QUESTIONS.beginner;

  return (
    <div className="j-interview-container">
      <div className="j-level-selector">
        {['beginner', 'intermediate', 'advanced'].map(l => (
          <button
            key={l}
            className={`j-level-btn ${level === l ? 'active' : ''}`}
            onClick={() => setLevel(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="j-interview-list">
        {questions.map((item, i) => (
          <div key={i} className="j-interview-card">
            <h4>Q{i + 1}: {item.q}</h4>
            <p><strong>Answer:</strong> {item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 9. DOWNLOADS TAB
const DownloadsTab = () => (
  <div className="j-downloads-container">
    <div className="j-downloads-grid">
      {JAVA_DOWNLOADS.map((d, i) => (
        <div key={i} className="j-download-card" style={{ borderTop: `4px solid ${d.color}` }}>
          <div className="j-download-icon">{d.icon}</div>
          <h3>{d.title}</h3>
          <p>{d.type} • {d.size}</p>
          <span className="j-download-updated">Updated: {d.updated}</span>
          <button className="j-btn-secondary j-download-btn"><Download size={14} /> Download</button>
        </div>
      ))}
    </div>
  </div>
);

/* ============================================================
   TABS DEFINITION
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
  const { completedLessons: completed, toggleLessonComplete: toggleComplete } = useProgress();

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
              {[{ val: '40+', label: 'Lessons' }, { val: '20+', label: 'Programs' }, { val: '6+', label: 'Projects' }, { val: '15+', label: 'Quizzes' }, { val: '40+', label: 'Interview Qs' }].map((s, i) => (
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
                {[['Lessons Completed', '0 / 40'], ['Quizzes Completed', '0 / 15'], ['Programs Solved', '0 / 20'], ['Projects Completed', '0 / 6']].map(([l, v]) => (
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
