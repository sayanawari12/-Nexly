import React, { useState, useEffect } from 'react';
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
  RefreshCw, Cpu, Sliders, Hash, Link2, Rocket, Monitor, Activity, Calculator, Repeat, Type,
  Sparkles
} from 'lucide-react';
import { TECH_LOGOS } from '../components/sections/TechLogos';
import TechnologyLogo from '../components/ui/TechnologyLogo';
import { useProgress } from '../context/ProgressContext';
import useAuth from '../hooks/useAuth';
import { saveUserNote, getUserNote, addUserBookmark } from '../services/userDatabase';
import CppQuizContent from '../components/technology/CppQuizContent';
import '../styles/CLearningHub.css';

/* ============================================================
   C++ DATA LAYER
   ============================================================ */

export const CPP_LESSONS = [
  {
    id: 1,
    title: 'Introduction to C++',
    diff: 'beginner',
    time: '20 min',
    phase: 'beginner',
    prereq: 'Basic Programming Concepts',
    desc: 'History of C++, Bjarne Stroustrup, OOP concepts, features, and relationship with C.',
    theory: `C++ was developed by Bjarne Stroustrup at Bell Laboratories starting in 1979 as an extension of C.\n\nOriginally called "C with Classes", it was renamed C++ in 1983 (++ being the increment operator in C).\n\nKey Highlights:\n1. Multi-paradigm: Procedural, Object-Oriented, and Generic programming.\n2. High Performance: Low-level memory manipulation with zero-cost abstractions.\n3. Standard Template Library (STL): Pre-built data structures and algorithms.\n4. Widely used in game engines (Unreal Engine), operating systems, finance, browsers, and embedded systems.`,
    code: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++ World!" << std::endl;\n    std::cout << "Welcome to Object-Oriented Programming!" << std::endl;\n    return 0;\n}`,
    output: `Hello, C++ World!\nWelcome to Object-Oriented Programming!`,
    note: 'std::cout is the standard output stream object declared inside <iostream>.',
    warning: 'Do not forget #include <iostream>; otherwise std::cout will produce a compilation error.',
    tip: 'Using std::endl outputs a newline AND flushes the output buffer.',
    interviewTip: '"What is C++?" — Emphasize: C++ is a statically-typed, compiled, general-purpose programming language supporting OOP and generic programming.',
    mistakes: ['Forgetting the semicolon at the end of statements', 'Forgetting std:: namespace prefix without using directive', 'Confusing << (stream insertion) with >> (stream extraction)'],
    summary: 'C++ combines high-speed procedural control with powerful object-oriented concepts.'
  },
  {
    id: 2,
    title: 'Compiler Setup & First Program',
    diff: 'beginner',
    time: '25 min',
    phase: 'beginner',
    prereq: 'Introduction to C++',
    desc: 'Installing GCC/G++, configuring VS Code, understanding compilation flags and executable generation.',
    theory: `C++ code must be compiled into machine code before execution.\n\nPopular compilers:\n- GCC (g++) for Linux / Windows (MinGW)\n- Clang (clang++) for macOS / Linux\n- MSVC for Windows (Visual Studio)\n\nCompilation command:\ng++ -std=c++17 -Wall -o main main.cpp\n\nStages of Compilation:\n1. Preprocessing (#include, #define macros expanded)\n2. Compilation (C++ code to Assembly)\n3. Assembly (Assembly to Machine Code Object .o)\n4. Linking (Combines object files & STL libraries into executable)`,
    code: `// Compile: g++ -std=c++17 main.cpp -o main\n#include <iostream>\n\nint main() {\n    #if __cplusplus >= 201703L\n        std::cout << "Running C++17 or later!" << std::endl;\n    #else\n        std::cout << "Running older C++ standard!" << std::endl;\n    #endif\n    return 0;\n}`,
    output: `Running C++17 or later!`,
    note: '-Wall flag enables all compiler warnings, which help identify subtle logic errors early.',
    warning: 'Always check if your compiler supports the standard flags like -std=c++17 or -std=c++20.',
    tip: 'Use -O2 flag for optimized production builds.',
    interviewTip: '"Name the 4 stages of C++ compilation." — Preprocessing, Compilation, Assembly, Linking.',
    mistakes: ['Not setting system PATH for MinGW g++', 'Mismatched header includes', 'Ignoring compiler warnings'],
    summary: 'Mastering g++ flags and build tools ensures fast debugging and clean execution.'
  },
  {
    id: 3,
    title: 'Input / Output & Namespaces',
    diff: 'beginner',
    time: '25 min',
    phase: 'beginner',
    prereq: 'Compiler Setup',
    desc: 'std::cin, std::cout, std::endl, formatters, and creating custom namespaces.',
    theory: `C++ provides stream-based input/output via <iostream>.\n\nStreams:\n- std::cout: Standard Output\n- std::cin: Standard Input\n- std::cerr: Unbuffered Error Output\n- std::clog: Buffered Logging Output\n\nNamespaces:\nNamespaces prevent name collisions in large applications. You can define your own namespace or use std.`,
    code: `#include <iostream>\n#include <string>\n\nnamespace MathUtils {\n    int add(int a, int b) { return a + b; }\n}\n\nint main() {\n    std::string name;\n    int age;\n\n    std::cout << "Enter name and age: ";\n    // Simulated input: Alex 22\n    name = "Alex";\n    age = 22;\n\n    std::cout << "Hello " << name << ", Age: " << age << std::endl;\n    std::cout << "Sum: " << MathUtils::add(15, 25) << std::endl;\n    return 0;\n}`,
    output: `Enter name and age: Alex 22\nHello Alex, Age: 22\nSum: 40`,
    note: 'Namespaces scope identifiers like functions and classes.',
    warning: 'Avoid "using namespace std;" in header files to prevent global naming conflicts.',
    tip: 'Use std::getline(std::cin, str) to read full lines including spaces.',
    interviewTip: '"Why shouldn\'t we use using namespace std in headers?" — It pollutes the global namespace, causing ambiguity errors when including multiple headers.',
    mistakes: ['Using cin >> for multi-word strings without getline', 'Confusing << with >>', 'Forgetting scope resolution operator ::'],
    summary: 'Streams and namespaces form the backbone of clean C++ program I/O and organization.'
  },
  {
    id: 4,
    title: 'Variables, Data Types & References',
    diff: 'beginner',
    time: '30 min',
    phase: 'beginner',
    prereq: 'Input / Output & Namespaces',
    desc: 'Primitive types, auto keyword, references vs pointers, and const correctness.',
    theory: `C++ data types include Primitive (int, float, double, char, bool), Derived (pointers, arrays, references), and User-Defined (struct, class, enum).\n\nReferences (&):\nAn alias for an existing variable. Unlike pointers, references cannot be null and cannot be reassigned.\n\nauto keyword (C++11):\nAutomatically infers the variable type at compile-time.`,
    code: `#include <iostream>\n\nint main() {\n    int original = 100;\n    int &ref = original; // ref is an alias to original\n\n    ref = 200;\n    std::cout << "Original: " << original << std::endl;\n\n    auto pi = 3.14159; // double inferred\n    const int maxVal = 500; // immutable\n\n    std::cout << "Pi: " << pi << ", Max: " << maxVal << std::endl;\n    return 0;\n}`,
    output: `Original: 200\nPi: 3.14159, Max: 500`,
    note: 'References do not take extra memory address space in many optimized compilations.',
    warning: 'Do not return references to local automatic variables from functions (dangling reference).',
    tip: 'Pass heavy objects by const reference (const std::string &str) to prevent expensive copies.',
    interviewTip: '"Difference between Reference and Pointer in C++?" — Reference cannot be null, must be initialized on declaration, and cannot be reassigned.',
    mistakes: ['Returning reference to local stack variable', 'Re-declaring existing variable name', 'Not using const for read-only parameters'],
    summary: 'References and auto streamline modern C++ type handling and performance.'
  },
  {
    id: 5,
    title: 'Control Structures & Loops',
    diff: 'beginner',
    time: '30 min',
    phase: 'beginner',
    prereq: 'Variables & Data Types',
    desc: 'if-else, switch-case, range-based for loops (C++11), while, and do-while.',
    theory: `Control flow in C++ includes conditional branches and iterative loops.\n\nRange-based for loop (C++11):\nfor (const auto &item : collection)\nIterates cleanly over any iterable container like std::vector, std::array, or C-style arrays.`,
    code: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> numbers = {10, 20, 30, 40, 50};\n\n    // Range-based for loop\n    std::cout << "Vector elements: ";\n    for (const auto &num : numbers) {\n        std::cout << num << " ";\n    }\n    std::cout << std::endl;\n\n    int choice = 2;\n    switch (choice) {\n        case 1: std::cout << "Option 1" << std::endl; break;\n        case 2: std::cout << "Option 2 Selected" << std::endl; break;\n        default: std::cout << "Default Option" << std::endl; break;\n    }\n    return 0;\n}`,
    output: `Vector elements: 10 20 30 40 50 \nOption 2 Selected`,
    note: 'Range-based for loops eliminate off-by-one errors.',
    warning: 'Always include break in switch cases unless fall-through is explicitly intended.',
    tip: 'Use auto & in range-based for loop if you intend to modify elements during iteration.',
    interviewTip: '"What is range-based for loop?" — A C++11 feature simplifies collection traversal without explicit index or iterator arithmetic.',
    mistakes: ['Modifying container size inside range-based loop', 'Missing break in switch statement', 'Off-by-one errors in traditional loops'],
    summary: 'Range-based loops and structured control flows make modern C++ code safer and cleaner.'
  },
  {
    id: 6,
    title: 'Functions & Default Arguments',
    diff: 'beginner',
    time: '35 min',
    phase: 'beginner',
    prereq: 'Control Structures',
    desc: 'Function prototypes, pass-by-value vs pass-by-reference, default parameters, and inline functions.',
    theory: `C++ functions support default parameter values, function overloading, and inline hints.\n\nDefault Arguments:\nSpecified in the function declaration/prototype. Must be trailing parameters.\n\nInline Functions:\nSuggests the compiler expand the function code at the call site to eliminate call overhead.`,
    code: `#include <iostream>\n\n// Default argument in parameter list\ninline int multiply(int a, int b = 2) {\n    return a * b;\n}\n\nvoid increment(int &val) {\n    val += 10;\n}\n\nint main() {\n    std::cout << "5 * 2 = " << multiply(5) << std::endl;\n    std::cout << "5 * 4 = " << multiply(5, 4) << std::endl;\n\n    int num = 15;\n    increment(num);\n    std::cout << "Incremented num: " << num << std::endl;\n    return 0;\n}`,
    output: `5 * 2 = 10\n5 * 4 = 20\nIncremented num: 25`,
    note: 'Default arguments must be specified from right to left.',
    warning: 'Overusing inline for large functions inflates binary executable size (code bloat).',
    tip: 'Modern C++ compilers automatically inline small functions even without explicit inline keyword.',
    interviewTip: '"What is an inline function?" — A function hint to compiler to substitute code at call site, reducing function call overhead.',
    mistakes: ['Putting default arguments in both declaration and definition', 'Non-trailing default arguments', 'Over-inlining complex functions'],
    summary: 'Default parameters and inline functions increase API flexibility and execution speed.'
  },
  {
    id: 7,
    title: 'Function Overloading & Name Mangling',
    diff: 'intermediate',
    time: '35 min',
    phase: 'intermediate',
    prereq: 'Functions & Default Arguments',
    desc: 'Function overloading rules, type signature resolution, andextern "C" name mangling.',
    theory: `Function Overloading allows multiple functions in the same scope to share the same name if their parameter lists differ in type, number, or order.\n\nName Mangling:\nCompilers encode function signatures into unique symbol names in the object file. extern "C" disables name mangling when linking C libraries.`,
    code: `#include <iostream>\n\nint add(int a, int b) {\n    return a + b;\n}\n\ndouble add(double a, double b) {\n    return a + b;\n}\n\nstd::string add(const std::string &a, const std::string &b) {\n    return a + b;\n}\n\nint main() {\n    std::cout << "Int Add: " << add(10, 20) << std::endl;\n    std::cout << "Double Add: " << add(5.5, 4.3) << std::endl;\n    std::cout << "String Add: " << add("Hello ", "C++") << std::endl;\n    return 0;\n}`,
    output: `Int Add: 30\nDouble Add: 9.8\nString Add: Hello C++`,
    note: 'Return type alone cannot be used to overload functions.',
    warning: 'Ambiguous calls occur when compiler cannot decide between overloaded versions due to implicit type conversions.',
    tip: 'Use extern "C" when including C header files in C++ projects.',
    interviewTip: '"Can we overload functions by return type only?" — No, C++ compiler resolves calls based on argument signature.',
    mistakes: ['Overloading solely by return type', 'Creating ambiguous implicit conversions', 'Forgetting extern "C" in C-library headers'],
    summary: 'Function overloading provides uniform interface names for identical logical operations.'
  },
  {
    id: 8,
    title: 'Classes & Objects (OOP Fundamentals)',
    diff: 'intermediate',
    time: '40 min',
    phase: 'intermediate',
    prereq: 'Function Overloading',
    desc: 'Encapsulation, public/private access specifiers, constructors, destructors, and member functions.',
    theory: `C++ is built around Object-Oriented Programming (OOP).\n\nClasses & Objects:\nClass is a blueprint; Object is an instance of a class.\n\nAccess Specifiers:\n- private: Accessible only inside the class.\n- public: Accessible from anywhere.\n- protected: Accessible inside class and derived classes.\n\nConstructors & Destructors:\nConstructor initializes objects; Destructor (~ClassName) cleans up resources when an object goes out of scope.`,
    code: `#include <iostream>\n#include <string>\n\nclass Student {\nprivate:\n    std::string name;\n    int age;\n\npublic:\n    // Constructor\n    Student(std::string n, int a) : name(n), age(a) {\n        std::cout << "Constructor called for " << name << std::endl;\n    }\n\n    // Destructor\n    ~Student() {\n        std::cout << "Destructor called for " << name << std::endl;\n    }\n\n    void display() const {\n        std::cout << "Student: " << name << ", Age: " << age << std::endl;\n    }\n};\n\nint main() {\n    {\n        Student s1("Sayan", 21);\n        s1.display();\n    } // s1 goes out of scope here, destructor triggers automatically\n    return 0;\n}`,
    output: `Constructor called for Sayan\nStudent: Sayan, Age: 21\nDestructor called for Sayan`,
    note: 'Use Member Initializer Lists (: name(n)) for faster initialization.',
    warning: 'If you dynamically allocate memory inside a constructor (new), free it in destructor (delete).',
    tip: 'Mark getters as const (void display() const) so they can be called on const instances.',
    interviewTip: '"What is Member Initializer List?" — Initializes member variables directly before constructor body executes, avoiding double assignment.',
    mistakes: ['Forgetting semicolon after class declaration', 'Leaking raw memory allocated inside class', 'Non-const accessors'],
    summary: 'Classes encapsulate data and behavior into structured reusable objects.'
  },
  {
    id: 9,
    title: 'Inheritance & Polymorphism',
    diff: 'intermediate',
    time: '45 min',
    phase: 'intermediate',
    prereq: 'Classes & Objects',
    desc: 'Single/Multiple inheritance, virtual functions, dynamic dispatch, vtable, and abstract classes.',
    theory: `Inheritance allows a Derived Class to inherit members from a Base Class.\n\nPolymorphism & Virtual Functions:\nPolymorphism allows objects of different classes to respond to the same function call. Virtual functions (virtual void speak()) enable runtime dynamic binding using a VTable (Virtual Table).\n\nAbstract Classes & Pure Virtual Functions:\nA class containing at least one pure virtual function (virtual void area() = 0;) is Abstract and cannot be instantiated.`,
    code: `#include <iostream>\n\n// Abstract Base Class\nclass Shape {\npublic:\n    virtual void draw() const = 0; // Pure Virtual Function\n    virtual ~Shape() {} // Virtual Destructor required\n};\n\nclass Circle : public Shape {\npublic:\n    void draw() const override {\n        std::cout << "Drawing Circle..." << std::endl;\n    }\n};\n\nclass Rectangle : public Shape {\npublic:\n    void draw() const override {\n        std::cout << "Drawing Rectangle..." << std::endl;\n    }\n};\n\nint main() {\n    Shape *s1 = new Circle();\n    Shape *s2 = new Rectangle();\n\n    s1->draw();\n    s2->draw();\n\n    delete s1;\n    delete s2;\n    return 0;\n}`,
    output: `Drawing Circle...\nDrawing Rectangle...`,
    note: 'Always declare base class destructors as virtual (~Base()) to prevent undefined behavior on delete.',
    warning: 'Failing to implement pure virtual functions makes the derived class abstract as well.',
    tip: 'Use override keyword in C++11 to catch typos in virtual function signatures at compile time.',
    interviewTip: '"What is VTable in C++?" — A table of function pointers created by compiler to support dynamic dispatch (runtime polymorphism).',
    mistakes: ['Non-virtual base destructor causing memory leak on base pointer delete', 'Typo in overridden function signature without override keyword', 'Instantiating abstract class'],
    summary: 'Virtual functions and abstract classes enable powerful runtime polymorphism and clean architectural decoupling.'
  },
  {
    id: 10,
    title: 'Operator Overloading',
    diff: 'intermediate',
    time: '40 min',
    phase: 'intermediate',
    prereq: 'Inheritance & Polymorphism',
    desc: 'Overloading +, -, <<, >>, [], and = operators, friend functions, and copy assignment.',
    theory: `Operator Overloading allows customized behavior for operators (+, -, *, <<, etc.) when applied to user-defined classes.\n\nSyntax:\nReturnType operator+(const ClassName &rhs);\n\nFriend Functions:\nFunctions declared with friend keyword have access to private/protected members of the class, commonly used for overloading stream operators (operator<<).`,
    code: `#include <iostream>\n\nclass Complex {\nprivate:\n    double real, imag;\n\npublic:\n    Complex(double r = 0, double i = 0) : real(r), imag(i) {}\n\n    // Overloading + operator\n    Complex operator+(const Complex &other) const {\n        return Complex(real + other.real, imag + other.imag);\n    }\n\n    // Friend function for << operator\n    friend std::ostream &operator<<(std::ostream &os, const Complex &c) {\n        os << c.real << " + " << c.imag << "i";\n        return os;\n    }\n};\n\nint main() {\n    Complex c1(3.0, 4.0), c2(1.5, 2.5);\n    Complex sum = c1 + c2;\n    std::cout << "Sum: " << sum << std::endl;\n    return 0;\n}`,
    output: `Sum: 4.5 + 6.5i`,
    note: 'Operators ::, .*, ., and ?: cannot be overloaded in C++.',
    warning: 'Avoid overloading operators in unexpected ways (e.g. making + subtract), which destroys readability.',
    tip: 'Always return stream references (std::ostream&) from operator<< to allow chaining (cout << a << b).',
    interviewTip: '"Which operators cannot be overloaded in C++?" — Scope resolution ::, Member selection ., Pointer to member .*, Ternary ?:, and sizeof.',
    mistakes: ['Modifying operands in binary operators', 'Not returning ostream reference from stream operators', 'Overloading assignment = without checking self-assignment'],
    summary: 'Operator overloading enables intuitive math and stream syntax for custom data types.'
  },
  {
    id: 11,
    title: 'Templates & Generic Programming',
    diff: 'advanced',
    time: '45 min',
    phase: 'advanced',
    prereq: 'Operator Overloading',
    desc: 'Function templates, class templates, template specialization, and type deduction.',
    theory: `Templates enable Generic Programming — writing code independently of data types.\n\nFunction Templates:\ntemplate <typename T>\nT getMax(T a, T b) { return (a > b) ? a : b; }\n\nClass Templates:\ntemplate <class T>\nclass Stack { ... };\n\nTemplate Specialization:\nCustom implementation of a template for a specific data type.`,
    code: `#include <iostream>\n#include <string>\n\n// Function Template\ntemplate <typename T>\nT addValues(T a, T b) {\n    return a + b;\n}\n\n// Class Template\ntemplate <typename T>\nclass Box {\nprivate:\n    T item;\npublic:\n    Box(T i) : item(i) {}\n    void print() const {\n        std::cout << "Box Item: " << item << std::endl;\n    }\n};\n\nint main() {\n    std::cout << "Add Ints: " << addValues(10, 20) << std::endl;\n    std::cout << "Add Doubles: " << addValues(3.5, 2.5) << std::endl;\n\n    Box<int> intBox(100);\n    Box<std::string> strBox("Generic C++");\n    intBox.print();\n    strBox.print();\n    return 0;\n}`,
    output: `Add Ints: 30\nAdd Doubles: 6\nBox Item: 100\nBox Item: Generic C++`,
    note: 'Template code is compiled when instantiated for a specific type (monomorphization).',
    warning: 'Template definitions should usually reside in header files (.h), not .cpp implementation files.',
    tip: 'Use static_assert in templates for compile-time type validation.',
    interviewTip: '"Where are templates compiled?" — Templates are instantiated and compiled at compile-time when used with concrete types.',
    mistakes: ['Putting template definitions in separate .cpp files', 'Massive template bloat from many instantiations', 'Uninformative template compilation errors'],
    summary: 'Templates empower high-performance generic libraries like the C++ Standard Template Library (STL).'
  },
  {
    id: 12,
    title: 'Standard Template Library (STL) Containers',
    diff: 'advanced',
    time: '50 min',
    phase: 'advanced',
    prereq: 'Templates & Generic Programming',
    desc: 'std::vector, std::string, std::map, std::set, std::unordered_map, iterators, and time complexity.',
    theory: `The STL is a powerful suite of template classes providing data structures and algorithms.\n\nKey Containers:\n- Sequence: std::vector (dynamic array), std::deque, std::list.\n- Associative: std::set (balanced BST, O(log N)), std::map (key-value pairs).\n- Unordered Associative: std::unordered_map (hash table, average O(1)).\n- Container Adapters: std::stack, std::queue, std::priority_queue.`,
    code: `#include <iostream>\n#include <vector>\n#include <map>\n#include <algorithm>\n\nint main() {\n    // std::vector\n    std::vector<int> v = {5, 2, 8, 1, 9};\n    std::sort(v.begin(), v.end()); // O(N log N)\n\n    std::cout << "Sorted Vector: ";\n    for (int x : v) std::cout << x << " ";\n    std::cout << std::endl;\n\n    // std::map\n    std::map<std::string, int> score;\n    score["Alice"] = 95;\n    score["Bob"] = 88;\n\n    std::cout << "Alice Score: " << score["Alice"] << std::endl;\n    return 0;\n}`,
    output: `Sorted Vector: 1 2 5 8 9 \nAlice Score: 95`,
    note: 'std::vector doubles its capacity automatically when reserved space is exceeded.',
    warning: 'Accessing std::map with [] inserts a default-constructed value if the key does not exist. Use .find() or .at() for read-only lookup.',
    tip: 'Use v.reserve(N) before inserting elements into std::vector to prevent frequent reallocations.',
    interviewTip: '"Difference between std::map and std::unordered_map?" — std::map uses Red-Black Tree (O(log N), sorted); std::unordered_map uses Hash Table (O(1) average, unsorted).',
    mistakes: ['Invalidating vector iterators during push_back', 'Accidental key insertion using map[] operator', 'Not reserving vector capacity'],
    summary: 'STL containers provide industry-tested, high-speed data structures out of the box.'
  },
  {
    id: 13,
    title: 'Memory Management & Smart Pointers',
    diff: 'advanced',
    time: '50 min',
    phase: 'advanced',
    prereq: 'STL Containers',
    desc: 'new / delete, memory leaks, RAII, std::unique_ptr, std::shared_ptr, std::weak_ptr.',
    theory: `Manual memory allocation (new/delete) in C++ can cause memory leaks and dangling pointers.\n\nRAII (Resource Acquisition Is Initialization):\nResource lifetime is bound to object lifetime.\n\nSmart Pointers (C++11):\n- std::unique_ptr: Exclusive ownership. Cannot be copied, only moved.\n- std::shared_ptr: Shared ownership with reference count.\n- std::weak_ptr: Non-owning observer, prevents circular reference memory leaks.`,
    code: `#include <iostream>\n#include <memory>\n\nclass Resource {\npublic:\n    Resource() { std::cout << "Resource Acquired\\n"; }\n    ~Resource() { std::cout << "Resource Destroyed\\n"; }\n    void doWork() { std::cout << "Resource working...\\n"; }\n};\n\nint main() {\n    // std::unique_ptr automatically releases memory when going out of scope\n    std::unique_ptr<Resource> res = std::make_unique<Resource>();\n    res->doWork();\n\n    // std::shared_ptr\n    std::shared_ptr<Resource> s1 = std::make_shared<Resource>();\n    std::cout << "Use count: " << s1.use_count() << std::endl;\n    {\n        std::shared_ptr<Resource> s2 = s1;\n        std::cout << "Use count inside block: " << s1.use_count() << std::endl;\n    }\n    std::cout << "Use count after block: " << s1.use_count() << std::endl;\n    return 0;\n}`,
    output: `Resource Acquired\nResource working...\nResource Acquired\nUse count: 1\nUse count inside block: 2\nUse count after block: 1\nResource Destroyed\nResource Destroyed`,
    note: 'Prefer std::make_unique and std::make_shared over raw new operator.',
    warning: 'Circular reference with shared_ptr causes memory leak — use weak_ptr to break cycles.',
    tip: 'Modern C++ code should almost never use raw new/delete.',
    interviewTip: '"What is RAII?" — A C++ programming idiom where resources (memory, file handles, locks) are bound to object lifecycle and cleaned up in destructors.',
    mistakes: ['Mixing raw delete with smart pointers', 'Circular shared_ptr references', 'Double free on raw pointers'],
    summary: 'Smart pointers and RAII make modern C++ memory management completely automatic and memory-safe.'
  },
  {
    id: 14,
    title: 'Exception Handling & File Stream I/O',
    diff: 'advanced',
    time: '45 min',
    phase: 'advanced',
    prereq: 'Memory Management',
    desc: 'try, catch, throw, std::exception, std::ifstream, std::ofstream, and RAII file streams.',
    theory: `Exception Handling in C++ separates error-handling code from normal execution flow.\n\nKeywords:\n- throw: Triggers an exception.\n- try: Wraps code that might throw.\n- catch: Handles the exception.\n\nFile Stream I/O (<fstream>):\n- std::ofstream: Writing to files.\n- std::ifstream: Reading from files.\n- std::fstream: Read/Write files.\nFiles are automatically closed when stream objects go out of scope (RAII).`,
    code: `#include <iostream>\n#include <fstream>\n#include <stdexcept>\n\ndouble divide(double a, double b) {\n    if (b == 0) {\n        throw std::invalid_argument("Division by zero error!");\n    }\n    return a / b;\n}\n\nint main() {\n    try {\n        std::cout << "Result: " << divide(10, 2) << std::endl;\n        std::cout << "Result: " << divide(10, 0) << std::endl;\n    } catch (const std::exception &e) {\n        std::cerr << "Caught Exception: " << e.what() << std::endl;\n    }\n\n    // File I/O example\n    std::ofstream outFile("test.txt");\n    if (outFile.is_open()) {\n        outFile << "C++ File I/O is easy!\\n";\n        outFile.close();\n        std::cout << "File written successfully." << std::endl;\n    }\n    return 0;\n}`,
    output: `Result: 5\nCaught Exception: Division by zero error!\nFile written successfully.`,
    note: 'Catch exceptions by const reference (const std::exception &e) to prevent object slicing.',
    warning: 'Avoid throwing exceptions from destructors — if thrown during stack unwinding, std::terminate is called.',
    tip: 'Use noexcept specifier on functions guaranteed not to throw exceptions for compiler optimizations.',
    interviewTip: '"What happens if an exception is thrown in a destructor?" — If stack unwinding is already in progress, program calls std::terminate immediately.',
    mistakes: ['Throwing exceptions from destructors', 'Catching exceptions by value', 'Not checking if file is open before reading/writing'],
    summary: 'Exceptions and RAII file streams ensure robust error handling and leak-free resource management.'
  }
];

export const CPP_PROGRAMS = [
  {
    id: 1,
    title: 'Hello World & Output Formatting',
    category: 'Basics',
    diff: 'Easy',
    desc: 'Demonstrates basic I/O, std::cout, std::endl, and escape sequences.',
    code: `#include <iostream>\n#include <iomanip>\n\nint main() {\n    std::cout << "=================================\\n";\n    std::cout << "   WELCOME TO C++ PROGRAMMING    \\n";\n    std::cout << "=================================\\n";\n    std::cout << std::fixed << std::setprecision(2);\n    std::cout << "PI Value: " << 3.14159265 << std::endl;\n    return 0;\n}`,
    output: `=================================\n   WELCOME TO C++ PROGRAMMING    \n=================================\nPI Value: 3.14`,
    explanation: 'Uses <iomanip> setprecision manipulator to format floating point numbers.'
  },
  {
    id: 2,
    title: 'Reverse a Number and Check Palindrome',
    category: 'Control Flow',
    diff: 'Easy',
    desc: 'Reverses an integer using modulo arithmetic and verifies if it is a palindrome.',
    code: `#include <iostream>\n\nbool isPalindrome(int num) {\n    int original = num, reversed = 0;\n    while (num > 0) {\n        int digit = num % 10;\n        reversed = reversed * 10 + digit;\n        num /= 10;\n    }\n    return original == reversed;\n}\n\nint main() {\n    int n = 12321;\n    std::cout << n << (isPalindrome(n) ? " is Palindrome" : " is Not Palindrome") << std::endl;\n    return 0;\n}`,
    output: `12321 is Palindrome`,
    explanation: 'Extracts digits using modulo (%) and constructs reversed number iteratively.'
  },
  {
    id: 3,
    title: 'Vector Operations & Sorting (STL)',
    category: 'STL',
    diff: 'Medium',
    desc: 'Uses std::vector, std::sort, std::find, and range-based for loops.',
    code: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> nums = {45, 12, 89, 23, 67, 10};\n\n    std::sort(nums.begin(), nums.end());\n    std::cout << "Sorted: ";\n    for (int x : nums) std::cout << x << " ";\n    std::cout << std::endl;\n\n    auto it = std::find(nums.begin(), nums.end(), 23);\n    if (it != nums.end()) {\n        std::cout << "Found 23 at index: " << std::distance(nums.begin(), it) << std::endl;\n    }\n    return 0;\n}`,
    output: `Sorted: 10 12 23 45 67 89 \nFound 23 at index: 2`,
    explanation: 'Uses std::sort (O(N log N)) and std::find (O(N)) algorithms from <algorithm>.'
  },
  {
    id: 4,
    title: 'Class Inheritance & Virtual Functions',
    category: 'OOP',
    diff: 'Medium',
    desc: 'Demonstrates base class pointers, virtual methods, and dynamic polymorphism.',
    code: `#include <iostream>\n\nclass Animal {\npublic:\n    virtual void makeSound() const {\n        std::cout << "Generic Animal Sound" << std::endl;\n    }\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal {\npublic:\n    void makeSound() const override {\n        std::cout << "Woof! Woof!" << std::endl;\n    }\n};\n\nint main() {\n    Animal *a = new Dog();\n    a->makeSound();\n    delete a;\n    return 0;\n}`,
    output: `Woof! Woof!`,
    explanation: 'Virtual destructor and virtual keyword enable runtime dynamic method resolution.'
  },
  {
    id: 5,
    title: 'Custom Stack Implementation with Templates',
    category: 'Data Structures',
    diff: 'Hard',
    desc: 'Generic Stack class template with push, pop, top, and exception handling.',
    code: `#include <iostream>\n#include <vector>\n#include <stdexcept>\n\ntemplate <typename T>\nclass GenericStack {\nprivate:\n    std::vector<T> elements;\npublic:\n    void push(T const &val) { elements.push_back(val); }\n    void pop() {\n        if (elements.empty()) throw std::out_of_range("Stack Underflow");\n        elements.pop_back();\n    }\n    T top() const {\n        if (elements.empty()) throw std::out_of_range("Stack Empty");\n        return elements.back();\n    }\n    bool empty() const { return elements.empty(); }\n};\n\nint main() {\n    GenericStack<std::string> st;\n    st.push("C++17");\n    st.push("Templates");\n    std::cout << "Top: " << st.top() << std::endl;\n    st.pop();\n    std::cout << "Top after pop: " << st.top() << std::endl;\n    return 0;\n}`,
    output: `Top: Templates\nTop after pop: C++17`,
    explanation: 'Implements generic LIFO stack data structure backed by std::vector.'
  }
];

export const CPP_PROJECTS = [
  {
    title: 'Student Management System',
    level: 'Beginner',
    desc: 'Console-based CRUD system to manage student records, GPA calculations, and file storage.',
    tags: ['OOP', 'File I/O', 'Vectors'],
    features: ['Add/Search Student', 'Update GPA', 'Save records to CSV', 'Filter by Grade']
  },
  {
    title: 'Banking Terminal Engine',
    level: 'Intermediate',
    desc: 'Simulates real-world banking operations including account transfers, interest calculations, and transaction logs.',
    tags: ['Classes', 'Pointers', 'Exception Handling'],
    features: ['Account Creation', 'Deposit / Withdraw', 'Transaction Audit Log', 'PIN Authentication']
  },
  {
    title: 'Tic-Tac-Toe AI Console Game',
    level: 'Intermediate',
    desc: '2-Player and Single-Player Tic-Tac-Toe game with Minimax AI algorithm.',
    tags: ['Algorithms', 'Minimax AI', 'Game Loop'],
    features: ['Smart AI Bot', 'Score Tracker', 'Interactive Board UI', 'Replay System']
  },
  {
    title: 'Custom Memory Allocator & Smart Pointer Engine',
    level: 'Advanced',
    desc: 'Building custom memory pool allocator and custom implementation of unique_ptr and shared_ptr.',
    tags: ['Advanced C++', 'Templates', 'RAII', 'Memory Pools'],
    features: ['Custom Malloc/Free', 'Reference Count Manager', 'Leak Detection Tool', 'Custom Deleter']
  }
];

export const CPP_INTERVIEW_QUESTIONS = [
  {
    q: 'What is the difference between C and C++?',
    a: 'C is a procedural language focusing on structure and functions. C++ is a multi-paradigm language supporting Object-Oriented Programming (Classes, Inheritance, Polymorphism), Templates (Generic Programming), Exception Handling, and the STL.',
    level: 'Beginner'
  },
  {
    q: 'Explain Virtual Functions and VTable in C++.',
    a: 'A virtual function allows derived classes to override methods. When a class has virtual functions, the compiler creates a VTable (Virtual Table) containing function pointers. Every object receives a hidden vptr pointer pointing to this table to enable dynamic dispatch at runtime.',
    level: 'Intermediate'
  },
  {
    q: 'What is RAII (Resource Acquisition Is Initialization)?',
    a: 'RAII is a core C++ idiom where resource lifecycle (memory, locks, sockets) is bound to object lifetime. Resources are acquired in constructors and freed in destructors automatically, preventing memory leaks.',
    level: 'Intermediate'
  },
  {
    q: 'Difference between std::unique_ptr and std::shared_ptr?',
    a: 'std::unique_ptr manages exclusive ownership of a resource (cannot be copied, only moved). std::shared_ptr manages shared ownership via a reference count control block.',
    level: 'Advanced'
  },
  {
    q: 'What is Copy Elision and RVO (Return Value Optimization)?',
    a: 'Copy Elision is a compiler optimization technique where temporary copies of objects returned from functions are omitted, constructing the object directly in the destination memory.',
    level: 'Advanced'
  }
];

export const CPP_DOWNLOADS = [
  { title: 'C++ Master Cheatsheet (PDF)', type: 'PDF', size: '2.4 MB', desc: 'Complete reference for C++ syntax, STL containers, pointers, and OOP keywords.' },
  { title: 'STL Quick Reference Guide', type: 'PDF', size: '1.8 MB', desc: 'Summary of vector, map, set, priority_queue algorithms and time complexities.' },
  { title: 'C++ OOP & Memory Architecture Notes', type: 'Notes', size: '3.1 MB', desc: 'Deep dive into VTable, Smart Pointers, Memory Pools, and RAII principles.' }
];

export const CPP_ROADMAP_PHASES = [
  {
    phase: 'Phase 1: Basics & Syntax',
    title: 'Foundations of C++',
    desc: 'Master variables, data types, iostream, loops, and functions.',
    topics: ['Compilers & Setup', 'Streams (cin/cout)', 'Functions & Parameters', 'Arrays & Strings']
  },
  {
    phase: 'Phase 2: Object-Oriented Programming',
    title: 'Core OOP Concepts',
    desc: 'Encapsulation, Classes, Inheritance, Virtual Functions, and Polymorphism.',
    topics: ['Classes & Constructors', 'Access Modifiers', 'Inheritance & VTables', 'Operator Overloading']
  },
  {
    phase: 'Phase 3: Generic & Modern C++',
    title: 'Templates & STL',
    desc: 'Master the Standard Template Library, smart pointers, and C++11/14/17 features.',
    topics: ['Function/Class Templates', 'STL Containers & Iterators', 'Smart Pointers & RAII', 'Lambda Expressions']
  },
  {
    phase: 'Phase 4: Advanced Systems Programming',
    title: 'High Performance & Design',
    desc: 'Multithreading, memory management, exception safety, and software design patterns.',
    topics: ['Custom Memory Allocators', 'Multithreading (std::thread)', 'Exception Safety & RAII', 'Design Patterns in C++']
  }
];

/* ============================================================
   TABS CONFIG & SUB-COMPONENTS
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

/* C++ Logo Icon Component */
const CppLogo = () => (
  <TechnologyLogo svg={TECH_LOGOS.cpp} name="C++" />
);

/* Overview Tab */
const OverviewTab = ({ setActiveTab }) => (
  <div className="c-overview-wrapper">
    <div className="c-overview-grid">
      <div className="c-overview-left">
        <div className="c-card glass-card">
          <h3><Sparkles size={18} /> Welcome to C++ Learning Hub</h3>
          <p>C++ is one of the most powerful, high-performance programming languages in the world. It provides granular memory control alongside high-level object-oriented abstractions.</p>
          <p>From AAA game development to financial trading systems, C++ powers the most demanding software systems on earth.</p>
        </div>

        <div className="c-card glass-card" style={{ marginTop: '20px' }}>
          <h3><Target size={18} /> Why Learn C++?</h3>
          <div className="c-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '14px' }}>
            <div className="c-why-item" style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-primary)' }}>
              <Zap size={20} style={{ color: 'var(--primary-purple)', marginBottom: '8px' }} />
              <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Lightning Fast</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Direct memory compilation produces ultra-low latency execution.</p>
            </div>
            <div className="c-why-item" style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-primary)' }}>
              <Layers size={20} style={{ color: 'var(--primary-purple)', marginBottom: '8px' }} />
              <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Rich STL Library</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Standard data structures and algorithms built right into the language.</p>
            </div>
            <div className="c-why-item" style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-primary)' }}>
              <Award size={20} style={{ color: 'var(--primary-purple)', marginBottom: '8px' }} />
              <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>High Industry Demand</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Essential skill for Systems, Game Engine, and Embedded Software Engineers.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="c-overview-right">
        <div className="c-card glass-card">
          <h3><TrendingUp size={18} /> Popular C++ Topics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            {['Classes & Objects', 'Inheritance & VTables', 'Standard Template Library (STL)', 'Smart Pointers & RAII', 'Templates & Generics'].map((t, i) => (
              <div key={i} className="c-topic-link" onClick={() => setActiveTab('lessons')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{t}</span>
                <ChevronRight size={14} style={{ opacity: 0.5 }} />
              </div>
            ))}
          </div>
          <button className="c-btn-primary" onClick={() => setActiveTab('lessons')} style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
            Explore All Lessons →
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* Roadmap Tab */
const RoadmapTab = ({ setActiveTab, setActiveLessonId }) => (
  <div className="c-roadmap-tab-wrapper">
    <div className="c-card glass-card" style={{ marginBottom: '24px' }}>
      <h3><Map size={18} /> C++ Learning Path</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Follow this structured 4-phase roadmap to master C++ from fundamentals to advanced systems engineering.</p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {CPP_ROADMAP_PHASES.map((p, idx) => (
        <div key={idx} className="c-card glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-glow)', textTransform: 'uppercase' }}>{p.phase}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Phase {idx + 1} of 4</span>
          </div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>{p.title}</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>{p.desc}</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {p.topics.map((t, i) => (
              <span key={i} style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', color: '#fff' }}>
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* Lessons Tab */
const LessonsTab = ({ activeLessonId, setActiveLessonId }) => {
  const lesson = CPP_LESSONS.find(l => l.id === activeLessonId) || CPP_LESSONS[0];
  const [activeSub, setActiveSub] = useState('theory');

  return (
    <div className="c-lessons-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>
      <aside className="c-lessons-sidebar glass-card" style={{ padding: '16px', height: 'fit-content' }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>C++ Course Lessons</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {CPP_LESSONS.map(l => (
            <button
              key={l.id}
              onClick={() => setActiveLessonId(l.id)}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                background: l.id === activeLessonId ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                color: l.id === activeLessonId ? 'var(--accent-glow)' : 'var(--text-secondary)',
                fontWeight: l.id === activeLessonId ? '600' : '400',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>#{l.id}</span>
              <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.title}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="c-lesson-viewer glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-glow)', textTransform: 'uppercase', fontWeight: '600' }}>Lesson {lesson.id}</span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', margin: '4px 0' }}>{lesson.title}</h2>
          </div>
          <span style={{ background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            ⏱️ {lesson.time}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px' }}>
          {['theory', 'code'].map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              style={{
                background: activeSub === sub ? 'var(--primary-purple)' : 'transparent',
                color: '#fff',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {sub}
            </button>
          ))}
        </div>

        {activeSub === 'theory' ? (
          <div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text-primary)', whitespace: 'pre-line' }}>{lesson.theory}</p>
            <div style={{ background: 'rgba(139,92,246,0.06)', borderLeft: '4px solid var(--primary-purple)', padding: '12px 16px', marginTop: '20px', borderRadius: '0 8px 8px 0' }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--accent-glow)' }}>💡 Pro Tip:</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{lesson.tip}</p>
            </div>
          </div>
        ) : (
          <div>
            <pre style={{ background: '#0a0a0f', padding: '16px', borderRadius: '10px', fontSize: '0.82rem', color: '#e4e4e7', overflowX: 'auto', border: '1px solid var(--border-primary)' }}>
              <code>{lesson.code}</code>
            </pre>
            <h4 style={{ fontSize: '0.85rem', marginTop: '16px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Expected Output:</h4>
            <pre style={{ background: '#040406', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
              <code>{lesson.output}</code>
            </pre>
          </div>
        )}
      </main>
    </div>
  );
};

/* Programs Tab */
const ProgramsTab = () => (
  <div className="c-programs-wrapper">
    <div className="c-card glass-card" style={{ marginBottom: '24px' }}>
      <h3><Code2 size={18} /> Practical C++ Program Repository</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Explore real-world C++ programs ranging from basics to STL data structures.</p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {CPP_PROGRAMS.map(p => (
        <div key={p.id} className="c-card glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>#{p.id}. {p.title}</h4>
            <span style={{ background: 'rgba(139,92,246,0.1)', color: 'var(--accent-glow)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' }}>{p.category}</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>{p.desc}</p>
          <pre style={{ background: '#09090e', padding: '14px', borderRadius: '8px', fontSize: '0.8rem', color: '#f4f4f5', overflowX: 'auto', border: '1px solid var(--border-primary)' }}>
            <code>{p.code}</code>
          </pre>
        </div>
      ))}
    </div>
  </div>
);

/* Coding Practice Tab */
const CodingPracticeTab = () => (
  <div className="c-practice-wrapper">
    <div className="c-card glass-card">
      <h3><Terminal size={18} /> C++ Interactive Practice Arena</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>Solve hands-on C++ challenges directly in the browser editor.</p>
      <button className="c-btn-primary" onClick={() => window.location.href = '/code-lab'}>
        Launch Coding Practice Workspace →
      </button>
    </div>
  </div>
);

/* Quiz Tab */
const QuizTab = () => (
  <CppQuizContent />
);

/* Projects Tab */
const ProjectsTab = () => (
  <div className="c-projects-wrapper">
    <div className="c-card glass-card" style={{ marginBottom: '24px' }}>
      <h3><Trophy size={18} /> Real-World C++ Projects</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Build portfolio-ready C++ applications from scratch.</p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
      {CPP_PROJECTS.map((proj, i) => (
        <div key={i} className="c-card glass-card">
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--accent-glow)', textTransform: 'uppercase' }}>{proj.level}</span>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '6px 0 8px' }}>{proj.title}</h4>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>{proj.desc}</p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {proj.tags.map((t, idx) => (
              <span key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* Interview Tab */
const InterviewTab = () => (
  <div className="c-interview-wrapper">
    <div className="c-card glass-card" style={{ marginBottom: '24px' }}>
      <h3><Briefcase size={18} /> C++ Top Interview Questions</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Frequently asked C++ questions in technical interviews at top tech companies.</p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {CPP_INTERVIEW_QUESTIONS.map((q, i) => (
        <div key={i} className="c-card glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>Q{i+1}: {q.q}</h4>
            <span style={{ fontSize: '0.72rem', background: 'rgba(139,92,246,0.1)', color: 'var(--accent-glow)', padding: '2px 8px', borderRadius: '4px' }}>{q.level}</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{q.a}</p>
        </div>
      ))}
    </div>
  </div>
);

/* Downloads Tab */
const DownloadsTab = () => (
  <div className="c-downloads-wrapper">
    <div className="c-card glass-card" style={{ marginBottom: '24px' }}>
      <h3><Download size={18} /> C++ Study Resources & Cheat Sheets</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Download official reference guides, cheat sheets, and course notes.</p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
      {CPP_DOWNLOADS.map((d, i) => (
        <div key={i} className="c-card glass-card">
          <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '6px' }}>{d.title}</h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>{d.desc}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{d.type} • {d.size}</span>
            <button className="c-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              <Download size={14} /> Download
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

const CppLearningHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLessonId, setActiveLessonId] = useState(1);

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { state: { scrollToSection: 'technologies' } });
    }
  };

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
      case 'roadmap':   return <RoadmapTab setActiveTab={setActiveTab} setActiveLessonId={setActiveLessonId} />;
      case 'lessons':   return <LessonsTab activeLessonId={activeLessonId} setActiveLessonId={setActiveLessonId} />;
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
    <div className="c-hub-wrapper">
      <div className="c-reading-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="c-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', padding: '16px 8%' }}>
        <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>
          <ArrowLeft size={13} /> Back
        </button>
        <span className="sep" style={{ margin: '0 4px', opacity: 0.3, color: 'var(--text-secondary)' }}>|</span>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}><Home size={13} /> Home</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button onClick={() => navigate('/', { state: { scrollToSection: 'technologies' } })} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>Tech Stack</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button onClick={() => setActiveTab('overview')} style={{ background: 'none', border: 'none', color: activeTab === 'overview' ? 'var(--accent-glow)' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: activeTab === 'overview' ? '600' : '500', padding: '0' }}>C++ Language</button>
        {activeTab !== 'overview' && (
          <>
            <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
            <span className="current" style={{ color: 'var(--accent-glow)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'capitalize' }}>
              {activeTab === 'practice' ? 'Coding Practice' : activeTab === 'interview' ? 'Interview Qs' : activeTab}
            </span>
          </>
        )}
      </div>

      <div className="c-hero-banner">
        <div className="c-hero-inner">
          <CppLogo />
          <div className="c-hero-text">
            <span className="c-badge">C++ LANGUAGE</span>
            <h1 className="c-hero-title">C++ Programming</h1>
            <p className="c-hero-subtitle">Beginner to Advanced Systems Programming</p>
            <p className="c-hero-desc">Master C++ from scratch — object-oriented design, STL containers, virtual functions, templates, smart pointers, and memory optimization.</p>
            <div className="c-hero-stats">
              {[{ val: '14+', label: 'Lessons' }, { val: '50+', label: 'Programs' }, { val: '4+', label: 'Projects' }, { val: '25+', label: 'Quizzes' }, { val: '30+', label: 'Interview Qs' }].map((s, i) => (
                <div key={i} className="c-stat-pill"><strong>{s.val}</strong> {s.label}</div>
              ))}
            </div>
            <div className="c-hero-actions">
              <button className="c-btn-primary" onClick={() => setActiveTab('lessons')}><Play size={15} /> Start Learning <ChevronRight size={14} /></button>
              <button className="c-btn-secondary" onClick={() => setActiveTab('roadmap')}><Map size={15} /> View Roadmap</button>
            </div>
          </div>

          <div className="c-progress-card">
            <h4><TrendingUp size={15} /> Your Progress</h4>
            <div className="c-overall-progress">
              <div className="c-circle-progress">0%<br /><span style={{ fontSize: '0.55rem' }}>Done</span></div>
              <div className="c-progress-rows" style={{ flex: 1 }}>
                {[['Lessons Completed', '0 / 14'], ['Quizzes Completed', '0 / 10'], ['Programs Solved', '0 / 50'], ['Projects Completed', '0 / 4']].map(([l, v]) => (
                  <div key={l} className="c-progress-row"><span>{l}</span><span>{v}</span></div>
                ))}
              </div>
            </div>
            <button className="c-login-btn"><Lock size={13} /> Login to Save Progress</button>
          </div>
        </div>
      </div>

      <div className="c-tab-nav">
        <div className="c-tab-nav-inner">
          {TABS.map(tab => (
            <button key={tab.id} className={`c-tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              <span className="c-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="c-content-area" style={{ padding: '36px 8%' }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CppLearningHub;
