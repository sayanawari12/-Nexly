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
import C_PROGRAMS from './programs_data.json';
import '../styles/CLearningHub.css';

/* ============================================================
   DATA LAYER
   ============================================================ */

const C_LESSONS = [
  { id: 1, title: 'Introduction to C', diff: 'beginner', time: '20 min', phase: 'beginner',
    prereq: 'None',
    desc: 'History of C, its features, applications, and why it is called the mother of all programming languages.',
    theory: `C is a general-purpose, procedural programming language developed by Dennis Ritchie at Bell Labs between 1969 and 1973. It was designed to develop the UNIX operating system.\n\nC is often called the "mother of all languages" because most modern languages like C++, Java, Python, and JavaScript are influenced by it. It combines the features of high-level languages with the control of assembly.\n\nKey characteristics: compiled, statically typed, structured, portable, efficient memory management via pointers, and direct hardware access.`,
    code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    printf("Welcome to C Programming!\\n");\n    return 0;\n}`,
    output: `Hello, World!\nWelcome to C Programming!`,
    note: 'Every C program must have a main() function. Execution always starts from main().',
    warning: 'Forgetting the #include <stdio.h> directive will cause printf() to be undefined.',
    tip: 'Always use return 0; at the end of main() to indicate successful program termination.',
    interviewTip: '"What is C language?" — Emphasize: compiled, procedural, portable, low-level memory access via pointers, developed by Dennis Ritchie in 1972.',
    mistakes: ['Missing semicolons at end of statements', 'Forgetting to include required header files', 'Not returning 0 from main()'],
    summary: 'C is a foundational, compiled, procedural language essential for system programming, embedded systems, and understanding how computers work.'
  },
  { id: 2, title: 'Compiler & IDE Setup', diff: 'beginner', time: '25 min', phase: 'beginner',
    prereq: 'Introduction to C',
    desc: 'Installing GCC compiler, setting up VS Code / Code::Blocks, understanding the compilation process.',
    theory: `A compiler translates C source code (.c files) into machine code (executable). The most popular C compiler is GCC (GNU Compiler Collection).\n\nCompilation steps: Preprocessing → Compilation → Assembly → Linking.\n\nPopular IDEs: Code::Blocks (beginner-friendly), VS Code + GCC, Dev-C++, CLion.`,
    code: `// Compile with: gcc -o hello hello.c\n// Run with: ./hello (Linux/Mac) or hello.exe (Windows)\n\n#include <stdio.h>\n\nint main() {\n    printf("GCC is working!\\n");\n    // Compilation stages:\n    // 1. Preprocessor: processes #include, #define\n    // 2. Compiler: converts .c to .s (assembly)\n    // 3. Assembler: converts .s to .o (object)\n    // 4. Linker: combines .o files into executable\n    return 0;\n}`,
    output: `GCC is working!`,
    note: 'Use gcc -Wall -o output input.c to enable all warnings. Warnings often indicate bugs.',
    warning: 'On Windows, ensure MinGW (GCC for Windows) bin path is added to the system PATH variable.',
    tip: 'Use gcc -g flag to include debug information and debug with GDB debugger.',
    interviewTip: '"Explain the compilation process in C." — Four stages: Preprocessing, Compilation, Assembly, Linking.',
    mistakes: ['Not adding compiler to PATH', 'Using wrong file extension (.C vs .c)', 'Not reading compiler warnings'],
    summary: 'Setting up GCC and an IDE is the first step. Understanding compilation stages helps you debug errors effectively.'
  },
  { id: 3, title: 'Program Structure', diff: 'beginner', time: '25 min', phase: 'beginner',
    prereq: 'Compiler & IDE Setup',
    desc: 'Anatomy of a C program: preprocessor directives, main function, statements, and return types.',
    theory: `A C program consists of: preprocessor directives, global declarations, the main() function, and other functions.\n\nPreprocessor directives start with # and are processed before compilation. #include includes library headers. #define creates macros.\n\nThe main() function is the entry point. It returns an int: 0 for success, non-zero for failure.`,
    code: `// Preprocessor directives\n#include <stdio.h>\n#include <stdlib.h>\n#define MAX 100\n#define PI 3.14159\n\n// Global variable\nint globalCount = 0;\n\n// Function declaration (prototype)\nvoid greet(char *name);\n\n// Main function - entry point\nint main() {\n    printf("MAX = %d\\n", MAX);\n    printf("PI = %.2f\\n", PI);\n    greet("Alice");\n    globalCount++;\n    printf("Count: %d\\n", globalCount);\n    return 0;  // 0 = success\n}\n\n// Function definition\nvoid greet(char *name) {\n    printf("Hello, %s!\\n", name);\n}`,
    output: `MAX = 100\nPI = 3.14\nHello, Alice!\nCount: 1`,
    note: 'C is case-sensitive. main, Main, and MAIN are all different identifiers.',
    warning: 'Global variables persist throughout program execution — use them sparingly to avoid unintended side effects.',
    tip: 'Always declare function prototypes before main() to avoid implicit function declaration warnings.',
    interviewTip: '"What is the difference between declaration and definition?" — Declaration announces existence (prototype), definition provides the actual implementation.',
    mistakes: ['Using undeclared variables', 'Forgetting semicolons', 'Defining functions after main without prototypes'],
    summary: 'Understanding C program structure is fundamental. Always include headers, declare prototypes, and return 0 from main.'
  },
  { id: 4, title: 'Variables & Data Types', diff: 'beginner', time: '30 min', phase: 'beginner',
    prereq: 'Program Structure',
    desc: 'int, float, double, char, void. sizeof operator, type ranges, and type conversions.',
    theory: `C has several fundamental data types: int (integers), float (single-precision decimal), double (double-precision decimal), char (single character), and void (no value).\n\nAll variables must be declared before use. C is statically typed — the type is fixed at compile time.\n\nModifiers: short, long, signed, unsigned extend the basic types.`,
    code: `#include <stdio.h>\n#include <limits.h>  // for INT_MAX, INT_MIN\n#include <float.h>   // for FLT_MAX\n\nint main() {\n    // Integer types\n    int age = 21;\n    short year = 2024;\n    long population = 1400000000L;\n    unsigned int count = 100U;\n\n    // Floating point types\n    float gpa = 8.75f;\n    double pi = 3.141592653589793;\n\n    // Character type\n    char grade = 'A';\n    char letter = 65;  // ASCII value of 'A'\n\n    printf("int: %d, size: %lu bytes\\n", age, sizeof(int));\n    printf("float: %.2f, size: %lu bytes\\n", gpa, sizeof(float));\n    printf("double: %.15f\\n", pi);\n    printf("char: %c (ASCII: %d)\\n", grade, grade);\n    printf("INT_MAX = %d\\n", INT_MAX);\n    printf("INT_MIN = %d\\n", INT_MIN);\n\n    return 0;\n}`,
    output: `int: 21, size: 4 bytes\nfloat: 8.75, size: 4 bytes\ndouble: 3.141592653589793\nchar: A (ASCII: 65)\nINT_MAX = 2147483647\nINT_MIN = -2147483648`,
    note: 'Use sizeof() to get the exact size of a type on your system — sizes can vary by platform and compiler.',
    warning: 'Integer overflow is undefined behavior in C. A signed int exceeding INT_MAX wraps around unpredictably.',
    tip: 'Use double instead of float for scientific calculations — double has 15-17 significant digits vs float\'s 6-7.',
    interviewTip: '"What is the size of int in C?" — It depends on the compiler and platform (usually 4 bytes on 32/64-bit systems). Use sizeof(int) to verify.',
    mistakes: ['Using float where double precision is needed', 'Not using L suffix for long literals', 'Ignoring signed/unsigned mismatch warnings'],
    summary: 'C\'s data types are fundamental to memory management. Master sizes, ranges, and type modifiers for bug-free programs.'
  },
  { id: 5, title: 'Operators & Expressions', diff: 'beginner', time: '30 min', phase: 'beginner',
    prereq: 'Variables & Data Types',
    desc: 'Arithmetic, relational, logical, bitwise, assignment, and ternary operators. Operator precedence.',
    theory: `C has a rich set of operators: Arithmetic (+,-,*,/,%), Relational (==,!=,<,>,<=,>=), Logical (&&,||,!), Bitwise (&,|,^,~,<<,>>), Assignment (=,+=,-=,*=,/=,%=), and the Ternary operator (?:).\n\nOperator precedence determines evaluation order. Use parentheses to make intent clear.`,
    code: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n\n    // Arithmetic\n    printf("a + b = %d\\n", a + b);  // 13\n    printf("a / b = %d\\n", a / b);  // 3 (integer division)\n    printf("a %% b = %d\\n", a % b); // 1 (modulo)\n    printf("a ** b (manual) = %d\\n", a * a * a); // not ** in C\n\n    // Relational\n    printf("a > b: %d\\n", a > b);   // 1 (true)\n    printf("a == b: %d\\n", a == b); // 0 (false)\n\n    // Logical\n    printf("(a>5) && (b<5): %d\\n", (a>5) && (b<5)); // 1\n    printf("(a<5) || (b<5): %d\\n", (a<5) || (b<5)); // 1\n\n    // Bitwise\n    printf("a & b = %d\\n", a & b);  // 2\n    printf("a | b = %d\\n", a | b);  // 11\n    printf("a << 1 = %d\\n", a << 1); // 20 (multiply by 2)\n    printf("a >> 1 = %d\\n", a >> 1); // 5 (divide by 2)\n\n    // Ternary\n    int max = (a > b) ? a : b;\n    printf("max = %d\\n", max);  // 10\n\n    return 0;\n}`,
    output: `a + b = 13\na / b = 3\na % b = 1\na ** b (manual) = 1000\na > b: 1\na == b: 0\n(a>5) && (b<5): 1\n(a<5) || (b<5): 1\na & b = 2\na | b = 11\na << 1 = 20\na >> 1 = 5\nmax = 10`,
    note: 'In C, there is no boolean type by default (before C99). 0 is false, any non-zero value is true.',
    warning: 'Integer division truncates towards zero: 7/2 = 3, not 3.5. Use (float)7/2 for float division.',
    tip: 'Include <stdbool.h> (C99+) to use bool, true, and false keywords for better readability.',
    interviewTip: '"What is the difference between & and && in C?" — & is bitwise AND (operates on bits), && is logical AND (operates on boolean conditions with short-circuit evaluation).',
    mistakes: ['Using = instead of == in conditions', 'Integer division when float was intended', 'Forgetting operator precedence'],
    summary: 'C operators are powerful, especially bitwise operators for low-level programming. Master precedence to write correct expressions.'
  },
  { id: 6, title: 'Input / Output (printf & scanf)', diff: 'beginner', time: '25 min', phase: 'beginner',
    prereq: 'Operators & Expressions',
    desc: 'printf format specifiers, scanf for user input, getchar, putchar, and proper input handling.',
    theory: `printf() writes formatted output to stdout. scanf() reads formatted input from stdin. Both use format specifiers: %d (int), %f (float), %c (char), %s (string), %ld (long), %lf (double).\n\nScanning always requires the address-of operator & (except for strings/arrays which are already pointers).`,
    code: `#include <stdio.h>\n\nint main() {\n    int age;\n    float gpa;\n    char name[50];\n    char gender;\n\n    // printf with format specifiers\n    printf("%-10s %5s %8s\\n", "Name", "Age", "GPA");  // aligned\n    printf("Enter your name: ");\n    scanf("%49s", name);  // limit to 49 chars to prevent overflow\n\n    printf("Enter age and GPA: ");\n    scanf("%d %f", &age, &gpa);  // & required for non-array variables\n\n    printf("Enter gender (M/F): ");\n    scanf(" %c", &gender);  // space before %c skips whitespace\n\n    printf("\\n=== Summary ===\\n");\n    printf("Name   : %s\\n", name);\n    printf("Age    : %d\\n", age);\n    printf("GPA    : %.2f\\n", gpa);     // 2 decimal places\n    printf("Gender : %c\\n", gender);\n    printf("Pass?  : %s\\n", gpa >= 5.0 ? "Yes" : "No");\n\n    return 0;\n}`,
    output: `Enter your name: Alice\nEnter age and GPA: 21 8.75\nEnter gender (M/F): F\n\n=== Summary ===\nName   : Alice\nAge    : 21\nGPA    : 8.75\nGender : F\nPass?  : Yes`,
    note: 'printf does not add a newline automatically — always use \\n explicitly.',
    warning: 'Buffer overflow: scanf("%s", name) does not limit input length. Use scanf("%49s", name) with bounds.',
    tip: 'Use fflush(stdin) or the " %c" trick (space before %c) to handle leftover newlines when reading characters.',
    interviewTip: '"Why does scanf need & before variables?" — scanf needs the memory address to write the value into. Arrays/pointers already hold addresses.',
    mistakes: ['Forgetting & in scanf for non-array variables', 'Buffer overflow with unbounded %s', 'Not flushing stdin before reading char'],
    summary: 'printf and scanf are the workhorses of C I/O. Master format specifiers and always bound your string inputs.'
  },
  { id: 7, title: 'Conditional Statements', diff: 'beginner', time: '30 min', phase: 'beginner',
    prereq: 'Input / Output',
    desc: 'if, if-else, else-if ladder, nested if, and switch-case with proper fall-through handling.',
    theory: `C provides if, if-else, else-if chains, and switch-case for conditional execution.\n\nswitch works with integer and character types only. Each case should end with break; unless intentional fall-through is needed. The default case handles unmatched values.`,
    code: `#include <stdio.h>\n\nint main() {\n    int score = 75;\n\n    // if-else if-else\n    char grade;\n    if (score >= 90)      grade = 'A';\n    else if (score >= 80) grade = 'B';\n    else if (score >= 70) grade = 'C';\n    else if (score >= 60) grade = 'D';\n    else                  grade = 'F';\n    printf("Grade: %c\\n", grade);\n\n    // Nested if\n    int x = 10;\n    if (x > 0) {\n        if (x % 2 == 0)\n            printf("%d is positive and even\\n", x);\n        else\n            printf("%d is positive and odd\\n", x);\n    }\n\n    // switch-case\n    int day = 3;\n    switch (day) {\n        case 1: printf("Monday\\n"); break;\n        case 2: printf("Tuesday\\n"); break;\n        case 3: printf("Wednesday\\n"); break;\n        case 4: printf("Thursday\\n"); break;\n        case 5: printf("Friday\\n"); break;\n        default: printf("Weekend\\n"); break;\n    }\n\n    return 0;\n}`,
    output: `Grade: C\n10 is positive and even\nWednesday`,
    note: 'In C, any non-zero value is true in a condition. 0 is false. Pointers follow the same rule.',
    warning: 'Missing break in switch causes fall-through — execution continues into the next case. This is sometimes intentional but often a bug.',
    tip: 'Use {} braces even for single-line if bodies to prevent bugs when adding statements later.',
    interviewTip: '"What is fall-through in switch?" — Without break, execution continues from the matched case into subsequent cases.',
    mistakes: ['Missing break in switch', 'Using assignment = instead of == in if condition', 'Not using braces for if bodies'],
    summary: 'Conditional statements control program flow. Master the else-if ladder and switch-case for clean decision-making code.'
  },
  { id: 8, title: 'Loops: for, while, do-while', diff: 'beginner', time: '35 min', phase: 'beginner',
    prereq: 'Conditional Statements',
    desc: 'for loops with range, while loops with conditions, do-while for guaranteed execution, break, continue.',
    theory: `C has three loop constructs: for (initialization; condition; update), while (condition), and do-while (condition tested after body).\n\nbreak exits the loop immediately. continue skips the rest of the current iteration. Both can be used with labeled loops indirectly via goto (use sparingly).`,
    code: `#include <stdio.h>\n\nint main() {\n    // for loop\n    printf("for loop: ");\n    for (int i = 1; i <= 5; i++) {\n        printf("%d ", i);\n    }\n    printf("\\n");\n\n    // while loop\n    int n = 1;\n    int sum = 0;\n    printf("while loop sum: ");\n    while (n <= 10) {\n        sum += n;\n        n++;\n    }\n    printf("%d\\n", sum);  // 55\n\n    // do-while (runs at least once)\n    int num;\n    do {\n        printf("Enter positive number: ");\n        // simulated: num = 5;\n        num = 5;  // simulate input\n        printf("%d\\n", num);\n    } while (num <= 0);\n\n    // break and continue\n    printf("break at 5: ");\n    for (int i = 1; i <= 10; i++) {\n        if (i == 5) break;\n        printf("%d ", i);\n    }\n    printf("\\n");\n\n    printf("skip 3: ");\n    for (int i = 1; i <= 6; i++) {\n        if (i == 3) continue;\n        printf("%d ", i);\n    }\n    printf("\\n");\n\n    return 0;\n}`,
    output: `for loop: 1 2 3 4 5\nwhile loop sum: 55\nEnter positive number: 5\nbreak at 5: 1 2 3 4\nskip 3: 1 2 4 5 6`,
    note: 'The for loop variable declared with int i = 0 is scoped to the loop in C99+. Use -std=c99 flag.',
    warning: 'Infinite loops (while(1)) must have a break condition. Missing it crashes the program or requires Ctrl+C.',
    tip: 'do-while is useful for input validation — the loop body executes at least once before the condition is checked.',
    interviewTip: '"When would you use do-while over while?" — When the loop body must execute at least once (e.g., menu systems, input validation).',
    mistakes: ['Off-by-one errors in loop bounds', 'Modifying loop variable inside the for loop header', 'Infinite loops without exit condition'],
    summary: 'C loops are versatile. Master for, while, and do-while, and know when to use break vs continue for clean iteration.'
  },
  { id: 9, title: 'Functions', diff: 'beginner', time: '40 min', phase: 'beginner',
    prereq: 'Loops',
    desc: 'Defining functions, parameters, return values, call by value, function prototypes, and recursion basics.',
    theory: `Functions are reusable code blocks. C uses call by value — copies of arguments are passed, so the original is not modified. To modify the original, pass a pointer (call by reference).\n\nFunction prototypes (declarations) tell the compiler about a function before its definition. They enable calling functions defined later in the file.`,
    code: `#include <stdio.h>\n\n// Function prototypes\nint add(int a, int b);\nfloat average(int arr[], int n);\nvoid swap(int *a, int *b);  // pointer for call by reference\n\nint main() {\n    printf("Sum: %d\\n", add(5, 3));  // 8\n\n    int nums[] = {10, 20, 30, 40, 50};\n    printf("Average: %.1f\\n", average(nums, 5));  // 30.0\n\n    int x = 10, y = 20;\n    printf("Before swap: x=%d, y=%d\\n", x, y);\n    swap(&x, &y);  // pass addresses\n    printf("After swap:  x=%d, y=%d\\n", x, y);\n\n    return 0;\n}\n\nint add(int a, int b) {\n    return a + b;\n}\n\nfloat average(int arr[], int n) {\n    int sum = 0;\n    for (int i = 0; i < n; i++) sum += arr[i];\n    return (float)sum / n;\n}\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}`,
    output: `Sum: 8\nAverage: 30.0\nBefore swap: x=10, y=20\nAfter swap:  x=20, y=10`,
    note: 'Arrays decay to pointers when passed to functions — they are not copied. Changes inside the function affect the original array.',
    warning: 'C passes arguments by value. Modifying a parameter inside a function does not change the caller\'s variable (unless you use pointers).',
    tip: 'Use const keyword for pointer parameters that should not be modified: void print(const int *arr, int n)',
    interviewTip: '"Explain call by value vs call by reference in C." — By value: copy is passed, original unchanged. By reference: pointer is passed, original can be modified.',
    mistakes: ['Expecting value parameters to modify originals', 'Not matching function prototype with definition', 'Missing return statement'],
    summary: 'Functions are the backbone of structured C programs. Master call by value vs reference and always write prototypes.'
  },
  { id: 10, title: 'Arrays', diff: 'beginner', time: '35 min', phase: 'beginner',
    prereq: 'Functions',
    desc: '1D and 2D arrays, initialization, traversal, passing to functions, and common array algorithms.',
    theory: `An array is a collection of elements of the same type stored in contiguous memory. Array indexing starts at 0. A 1D array int arr[5] holds 5 integers. A 2D array int mat[3][4] holds a 3×4 matrix.\n\nArrays decay to pointers when passed to functions. The size information is lost — pass the size as a separate parameter.`,
    code: `#include <stdio.h>\n\nvoid printArray(int arr[], int n);\nvoid reverseArray(int arr[], int n);\n\nint main() {\n    // 1D array initialization\n    int arr[5] = {10, 20, 30, 40, 50};\n    printf("Array: ");\n    printArray(arr, 5);\n\n    reverseArray(arr, 5);\n    printf("Reversed: ");\n    printArray(arr, 5);\n\n    // 2D array (matrix)\n    int mat[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n\n    printf("Matrix:\\n");\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 3; j++) {\n            printf("%d ", mat[i][j]);\n        }\n        printf("\\n");\n    }\n\n    // Diagonal sum\n    int diag = 0;\n    for (int i = 0; i < 3; i++) diag += mat[i][i];\n    printf("Diagonal sum: %d\\n", diag);\n\n    return 0;\n}\n\nvoid printArray(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    printf("\\n");\n}\n\nvoid reverseArray(int arr[], int n) {\n    for (int i = 0, j = n-1; i < j; i++, j--) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n}`,
    output: `Array: 10 20 30 40 50\nReversed: 50 40 30 20 10\nMatrix:\n1 2 3\n4 5 6\n7 8 9\nDiagonal sum: 15`,
    note: 'C does not perform bounds checking. Accessing arr[10] on a size-5 array causes undefined behavior.',
    warning: 'sizeof(arr)/sizeof(arr[0]) gives the length only when arr is the original array, not a pointer.',
    tip: 'Initialize arrays with {0} to zero-fill: int arr[100] = {0}; or memset(arr, 0, sizeof(arr));',
    interviewTip: '"What happens when you pass an array to a function in C?" — It decays to a pointer. The function receives a pointer to the first element, not a copy.',
    mistakes: ['Array out-of-bounds access', 'Using sizeof on pointer to get array length', 'Not initializing array elements'],
    summary: 'Arrays are the simplest data structure in C. Mastering 1D/2D arrays and their relationship with pointers is essential.'
  },
  { id: 11, title: 'Strings in C', diff: 'beginner', time: '35 min', phase: 'beginner',
    prereq: 'Arrays',
    desc: 'Character arrays, string.h library functions, string operations, and common string algorithms.',
    theory: `In C, strings are arrays of characters terminated by a null character (\'\\0\'). The string.h library provides functions: strlen, strcpy, strcat, strcmp, strchr, strstr.\n\nAlways allocate extra byte for the null terminator: char name[50] stores a 49-character string.`,
    code: `#include <stdio.h>\n#include <string.h>\n#include <ctype.h>  // for toupper, tolower\n\nint main() {\n    char str1[50] = "Hello";\n    char str2[] = "World";\n    char str3[100];\n\n    // strlen\n    printf("Length of str1: %lu\\n", strlen(str1));  // 5\n\n    // strcpy and strcat\n    strcpy(str3, str1);\n    strcat(str3, ", ");\n    strcat(str3, str2);\n    printf("Concatenated: %s\\n", str3);  // Hello, World\n\n    // strcmp (0 = equal, <0 = first<second, >0 = first>second)\n    printf("strcmp: %d\\n", strcmp("apple", "banana"));  // negative\n    printf("Equal: %d\\n", strcmp("abc", "abc") == 0);   // 1\n\n    // Case conversion\n    char msg[] = "hello world";\n    for (int i = 0; msg[i]; i++) msg[i] = toupper(msg[i]);\n    printf("Uppercase: %s\\n", msg);\n\n    // String search\n    char *found = strstr("I love C programming", "C prog");\n    if (found) printf("Found at: %s\\n", found);\n\n    // Manual string reverse\n    char rev[] = "ABCDE";\n    int len = strlen(rev);\n    for (int i = 0; i < len/2; i++) {\n        char t = rev[i]; rev[i] = rev[len-1-i]; rev[len-1-i] = t;\n    }\n    printf("Reversed: %s\\n", rev);\n\n    return 0;\n}`,
    output: `Length of str1: 5\nConcatenated: Hello, World\nstrcmp: -1\nEqual: 1\nUppercase: HELLO WORLD\nFound at: C programming\nReversed: EDCBA`,
    note: 'Never use strcpy without bounds checking — use strncpy(dest, src, n) to prevent buffer overflow.',
    warning: 'String literal "hello" is read-only. Declaring char *p = "hello" and then modifying *p is undefined behavior.',
    tip: 'Use char str[] = "hello" (array) instead of char *str = "hello" (pointer to literal) when you need to modify the string.',
    interviewTip: '"What is the difference between char arr[] and char *ptr for strings?" — arr is an array (modifiable), ptr points to a string literal (read-only in most implementations).',
    mistakes: ['Buffer overflow with strcpy', 'Comparing strings with == (compares pointers, not content)', 'Forgetting null terminator space'],
    summary: 'C strings are null-terminated char arrays. Master string.h functions and always guard against buffer overflows.'
  },
  { id: 12, title: 'Pointers', diff: 'intermediate', time: '50 min', phase: 'intermediate',
    prereq: 'Strings in C',
    desc: 'Pointer declaration, dereferencing, pointer arithmetic, pointers to arrays, and NULL pointer.',
    theory: `A pointer stores the memory address of another variable. Use & to get address, * to dereference (access value at address). Pointer arithmetic moves by sizeof(type) bytes.\n\nPointers enable dynamic memory allocation, efficient array traversal, and call-by-reference in functions. They are C\'s most powerful and dangerous feature.`,
    code: `#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *ptr = &x;  // ptr holds address of x\n\n    printf("Value of x:   %d\\n", x);\n    printf("Address of x: %p\\n", (void*)&x);\n    printf("Value of ptr: %p\\n", (void*)ptr);  // same address\n    printf("*ptr:         %d\\n", *ptr);          // dereference: 42\n\n    // Modifying via pointer\n    *ptr = 100;\n    printf("x after *ptr=100: %d\\n", x);  // 100\n\n    // Pointer arithmetic\n    int arr[] = {10, 20, 30, 40, 50};\n    int *p = arr;  // points to arr[0]\n\n    for (int i = 0; i < 5; i++) {\n        printf("arr[%d] = %d (addr: %p)\\n", i, *(p+i), (void*)(p+i));\n    }\n\n    // p++ moves by sizeof(int) = 4 bytes\n    p++;\n    printf("After p++: *p = %d\\n", *p);  // 20\n\n    // NULL pointer\n    int *null_ptr = NULL;\n    if (null_ptr == NULL) printf("Null pointer detected\\n");\n\n    return 0;\n}`,
    output: `Value of x:   42\nAddress of x: 0x7fff5fbff7ac\nValue of ptr: 0x7fff5fbff7ac\n*ptr:         42\nx after *ptr=100: 100\narr[0] = 10 (addr: 0x7fff...)\narr[1] = 20 (addr: 0x7fff...+4)\narr[2] = 30\narr[3] = 40\narr[4] = 50\nAfter p++: *p = 20\nNull pointer detected`,
    note: 'Always initialize pointers. An uninitialized pointer contains garbage — dereferencing it causes undefined behavior.',
    warning: 'Never dereference a NULL pointer. Always check pointer != NULL before using it.',
    tip: 'Cast to (void*) when printing addresses with %p: printf("%p", (void*)ptr);',
    interviewTip: '"What is a dangling pointer?" — A pointer that refers to memory that has been freed or gone out of scope. Accessing it is undefined behavior.',
    mistakes: ['Dereferencing uninitialized pointers', 'Pointer arithmetic on void* (not allowed)', 'Confusing * in declaration vs expression'],
    summary: 'Pointers are the heart of C. They enable dynamic memory, efficient algorithms, and call-by-reference. Master them to master C.'
  },
  { id: 13, title: 'Double Pointers', diff: 'intermediate', time: '35 min', phase: 'intermediate',
    prereq: 'Pointers',
    desc: 'Pointer to pointer (int **), use cases with 2D arrays, and dynamic array of strings.',
    theory: `A pointer to a pointer (double pointer) stores the address of another pointer. int **pp stores the address of an int*. They are used for: 2D dynamic arrays, modifying pointer variables inside functions, and arrays of strings.\n\nEach level of * adds one level of indirection.`,
    code: `#include <stdio.h>\n#include <stdlib.h>\n\nvoid changePointer(int **pp, int *new_val) {\n    *pp = new_val;  // modify the original pointer\n}\n\nint main() {\n    int x = 10, y = 20;\n    int *ptr = &x;\n    int **dptr = &ptr;  // double pointer\n\n    printf("x = %d\\n", x);\n    printf("*ptr = %d\\n", *ptr);\n    printf("**dptr = %d\\n", **dptr);\n\n    // Modify x through double pointer\n    **dptr = 99;\n    printf("After **dptr=99: x = %d\\n", x);\n\n    // Change where ptr points using double pointer\n    changePointer(&ptr, &y);\n    printf("ptr now points to y: %d\\n", *ptr);\n\n    // 2D dynamic array using double pointer\n    int rows = 3, cols = 4;\n    int **matrix = (int**)malloc(rows * sizeof(int*));\n    for (int i = 0; i < rows; i++)\n        matrix[i] = (int*)malloc(cols * sizeof(int));\n\n    // Fill and print\n    for (int i = 0; i < rows; i++)\n        for (int j = 0; j < cols; j++)\n            matrix[i][j] = i * cols + j + 1;\n\n    printf("2D Array:\\n");\n    for (int i = 0; i < rows; i++) {\n        for (int j = 0; j < cols; j++)\n            printf("%2d ", matrix[i][j]);\n        printf("\\n");\n    }\n\n    // Free memory\n    for (int i = 0; i < rows; i++) free(matrix[i]);\n    free(matrix);\n\n    return 0;\n}`,
    output: `x = 10\n*ptr = 10\n**dptr = 10\nAfter **dptr=99: x = 99\nptr now points to y: 20\n2D Array:\n 1  2  3  4\n 5  6  7  8\n 9 10 11 12`,
    note: 'Double pointers are common in C for dynamic 2D arrays and in functions that need to modify a pointer (like linked list insert at head).',
    warning: 'Each malloc needs a corresponding free. Forgetting any level of free causes memory leaks.',
    tip: 'Use int (*matrix)[cols] = malloc(rows * sizeof(*matrix)); for a true 2D array in C99+.',
    interviewTip: '"Why use double pointer in linked list insert at head?" — The head pointer itself needs to change, so pass &head (address of pointer) to the function.',
    mistakes: ['Freeing the outer array before inner arrays', 'Confusing *ptr and **ptr semantics', 'Not checking malloc return value'],
    summary: 'Double pointers extend pointer concepts to two levels of indirection. Essential for dynamic 2D arrays and pointer-modifying functions.'
  },
  { id: 14, title: 'Structures', diff: 'intermediate', time: '40 min', phase: 'intermediate',
    prereq: 'Double Pointers',
    desc: 'struct definition, typedef, nested structures, array of structures, and pointers to structures.',
    theory: `A structure (struct) groups variables of different types under one name. It is C\'s way of creating user-defined data types.\n\ntypedef creates an alias for a type. struct Point and typedef struct Point Point; allows using Point instead of struct Point.`,
    code: `#include <stdio.h>\n#include <string.h>\n\n// Structure definition\ntypedef struct {\n    int id;\n    char name[50];\n    float marks;\n    char grade;\n} Student;\n\n// Function to display student\nvoid displayStudent(const Student *s) {\n    printf("ID: %d | Name: %-15s | Marks: %.1f | Grade: %c\\n",\n           s->id, s->name, s->marks, s->grade);\n}\n\nchar calcGrade(float marks) {\n    if (marks >= 90) return 'A';\n    if (marks >= 80) return 'B';\n    if (marks >= 70) return 'C';\n    if (marks >= 60) return 'D';\n    return 'F';\n}\n\nint main() {\n    // Array of structures\n    Student students[3] = {\n        {1, "Alice",   92.5, 'A'},\n        {2, "Bob",     78.0, 'C'},\n        {3, "Charlie", 85.5, 'B'}\n    };\n\n    // Update grade using struct pointer\n    for (int i = 0; i < 3; i++) {\n        Student *sp = &students[i];\n        sp->grade = calcGrade(sp->marks);\n    }\n\n    printf("=== Student Report ===\\n");\n    for (int i = 0; i < 3; i++) {\n        displayStudent(&students[i]);\n    }\n\n    // Find topper\n    Student *topper = &students[0];\n    for (int i = 1; i < 3; i++)\n        if (students[i].marks > topper->marks)\n            topper = &students[i];\n    printf("Topper: %s (%.1f)\\n", topper->name, topper->marks);\n\n    return 0;\n}`,
    output: `=== Student Report ===\nID: 1 | Name: Alice           | Marks: 92.5 | Grade: A\nID: 2 | Name: Bob             | Marks: 78.0 | Grade: C\nID: 3 | Name: Charlie         | Marks: 85.5 | Grade: B\nTopper: Alice (92.5)`,
    note: 'Access struct members with . (dot) for variables and -> (arrow) for pointers: sp->name is (*sp).name.',
    warning: 'Structures are copied by value when passed to functions. Use pointers for efficiency with large structs.',
    tip: 'Pad struct members from largest to smallest to minimize memory padding and struct size.',
    interviewTip: '"What is the difference between struct and union?" — struct allocates memory for all members; union shares memory, size equals the largest member.',
    mistakes: ['Using dot operator on struct pointer (use ->)', 'Copying large structs by value unnecessarily', 'Forgetting struct tag or typedef'],
    summary: 'Structures are C\'s user-defined types for grouping related data. Essential for implementing real-world data models.'
  },
  { id: 15, title: 'Unions & Enums', diff: 'intermediate', time: '30 min', phase: 'intermediate',
    prereq: 'Structures',
    desc: 'union memory sharing, enum for named constants, and practical use cases of both.',
    theory: `A union shares the same memory for all members — only one member holds a valid value at a time. The size of a union is the size of its largest member.\n\nAn enum assigns named integer constants. By default, values start at 0 and increment by 1. Enums improve code readability.`,
    code: `#include <stdio.h>\n\n// Enum definition\ntypedef enum {\n    MONDAY = 1, TUESDAY, WEDNESDAY,\n    THURSDAY, FRIDAY, SATURDAY, SUNDAY\n} Day;\n\ntypedef enum { RED=0, GREEN=1, BLUE=2 } Color;\n\n// Union definition\ntypedef union {\n    int i;\n    float f;\n    char str[10];\n} Data;\n\nint main() {\n    // Enum usage\n    Day today = WEDNESDAY;\n    printf("Day value: %d\\n", today);  // 3\n\n    const char *dayNames[] = {\"\",\"Mon\",\"Tue\",\"Wed\",\"Thu\",\"Fri\",\"Sat\",\"Sun\"};\n    printf("Day name: %s\\n", dayNames[today]);  // Wed\n\n    Color c = GREEN;\n    printf("Color: %d\\n", c);  // 1\n\n    // Union usage\n    Data d;\n    printf("Union size: %lu bytes\\n", sizeof(d));  // size of largest member\n\n    d.i = 42;\n    printf("d.i = %d\\n", d.i);\n\n    d.f = 3.14f;  // overwrites d.i\n    printf("d.f = %.2f\\n", d.f);\n    printf("d.i now: %d (garbage!)\\n", d.i);  // invalid!\n\n    return 0;\n}`,
    output: `Day value: 3\nDay name: Wed\nColor: 1\nUnion size: 10 bytes\nd.i = 42\nd.f = 3.14\nd.i now: 1078523331 (garbage!)`,
    note: 'After writing d.f, reading d.i gives undefined/garbage because they share the same memory.',
    warning: 'Only the last assigned member of a union has a valid value. Reading others is undefined behavior.',
    tip: 'Use a tagged union (struct with union + enum type field) to track which union member is currently valid.',
    interviewTip: '"What is a union and how does it differ from a struct?" — Union: shared memory, size = largest member. Struct: separate memory for each member.',
    mistakes: ['Reading the wrong union member', 'Assuming union size equals sum of members', 'Not initializing enum values explicitly when order matters'],
    summary: 'Unions save memory by sharing storage. Enums make code readable with named constants. Both are valuable C features.'
  },
  { id: 16, title: 'Storage Classes', diff: 'intermediate', time: '30 min', phase: 'intermediate',
    prereq: 'Unions & Enums',
    desc: 'auto, register, static, extern — scope, lifetime, and linkage of C variables.',
    theory: `Storage classes define the scope (visibility), lifetime, and linkage of variables:\n- auto: default for local variables, stack-allocated, function scope\n- register: hint for register storage (fast access), local scope\n- static: persists between function calls (local) or has file scope (global)\n- extern: declares a variable defined in another file`,
    code: `#include <stdio.h>\n\n// extern: declared here, defined in another file (simulated)\nint globalVar = 100;  // global, external linkage\n\n// static global: file scope only\nstatic int filePrivate = 50;\n\nvoid counter() {\n    // static local: retains value between calls\n    static int count = 0;\n    count++;\n    printf("Call #%d\\n", count);\n}\n\nvoid demoAuto() {\n    auto int x = 10;  // 'auto' is default, rarely written explicitly\n    printf("auto x = %d\\n", x);\n}  // x destroyed here\n\nint main() {\n    // auto variable\n    demoAuto();\n\n    // register (hint only, compiler may ignore)\n    register int i;\n    int sum = 0;\n    for (i = 1; i <= 100; i++) sum += i;\n    printf("Sum 1-100: %d\\n", sum);\n\n    // static local demo\n    counter();  // Call #1\n    counter();  // Call #2\n    counter();  // Call #3\n\n    printf("globalVar: %d\\n", globalVar);\n    printf("filePrivate: %d\\n", filePrivate);\n\n    return 0;\n}`,
    output: `auto x = 10\nSum 1-100: 5050\nCall #1\nCall #2\nCall #3\nglobalVar: 100\nfilePrivate: 50`,
    note: 'static local variables are initialized only once and retain their value between function calls.',
    warning: 'Do not take the address of a register variable — the compiler may reject it.',
    tip: 'Use static to create private module-level variables (like private members in OOP), restricting visibility to the file.',
    interviewTip: '"What does static do in C?" — Two behaviors: (1) local static: variable persists between calls; (2) global static: file-level scope (internal linkage).',
    mistakes: ['Confusing static (local) with static (global) behavior', 'Using register on modern code (CPU caches make it obsolete)', 'Forgetting that extern is a declaration, not a definition'],
    summary: 'Storage classes control variable lifetime and visibility. static is the most important — use it to persist values or restrict scope.'
  },
  { id: 17, title: 'Recursion', diff: 'intermediate', time: '45 min', phase: 'intermediate',
    prereq: 'Storage Classes',
    desc: 'Recursive functions, base case, stack frames, classic recursive algorithms, and tail recursion.',
    theory: `Recursion is when a function calls itself. Every recursive function needs a base case (termination) and a recursive case (that reduces toward the base).\n\nEach function call creates a new stack frame. Deep recursion can cause stack overflow. Tail recursion (recursive call is the last action) can sometimes be optimized by compilers.`,
    code: `#include <stdio.h>\n\n// Factorial (recursive)\nlong long factorial(int n) {\n    if (n <= 1) return 1;           // base case\n    return n * factorial(n - 1);   // recursive case\n}\n\n// Fibonacci (recursive)\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\n\n// Binary search (recursive)\nint binarySearch(int arr[], int low, int high, int target) {\n    if (low > high) return -1;\n    int mid = (low + high) / 2;\n    if (arr[mid] == target) return mid;\n    if (arr[mid] < target) return binarySearch(arr, mid+1, high, target);\n    return binarySearch(arr, low, mid-1, target);\n}\n\n// Tower of Hanoi\nvoid hanoi(int n, char from, char to, char aux) {\n    if (n == 0) return;\n    hanoi(n-1, from, aux, to);\n    printf("Move disk %d: %c -> %c\\n", n, from, to);\n    hanoi(n-1, aux, to, from);\n}\n\nint main() {\n    printf("5! = %lld\\n", factorial(5));   // 120\n    printf("10! = %lld\\n", factorial(10)); // 3628800\n\n    printf("Fibonacci: ");\n    for (int i = 0; i < 8; i++) printf("%d ", fibonacci(i));\n    printf("\\n");\n\n    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56};\n    int idx = binarySearch(arr, 0, 7, 23);\n    printf("23 found at index: %d\\n", idx);\n\n    printf("\\nTower of Hanoi (3 disks):\\n");\n    hanoi(3, 'A', 'C', 'B');\n\n    return 0;\n}`,
    output: `5! = 120\n10! = 3628800\nFibonacci: 0 1 1 2 3 5 8 13\n23 found at index: 5\n\nTower of Hanoi (3 disks):\nMove disk 1: A -> C\nMove disk 2: A -> B\nMove disk 1: C -> B\nMove disk 3: A -> C\nMove disk 1: B -> A\nMove disk 2: B -> C\nMove disk 1: A -> C`,
    note: 'Default stack size is typically 1-8 MB. Recursion with large n can overflow the stack. Prefer iteration for deep recursion.',
    warning: 'Recursive Fibonacci is O(2^n) — extremely inefficient. Use dynamic programming for large n.',
    tip: 'Always identify the base case first. Every recursive call must make progress toward the base case.',
    interviewTip: '"What is tail recursion?" — When the recursive call is the last action. Some compilers optimize it to iteration, avoiding stack overflow.',
    mistakes: ['Missing base case (infinite recursion)', 'Stack overflow with large input', 'Not considering time complexity of recursive solution'],
    summary: 'Recursion elegantly solves problems that have self-similar subproblems. Always define a clear base case and track complexity.'
  },
  { id: 18, title: 'Dynamic Memory Allocation', diff: 'intermediate', time: '45 min', phase: 'intermediate',
    prereq: 'Recursion',
    desc: 'malloc, calloc, realloc, free, memory leaks, and safe dynamic memory patterns.',
    theory: `Dynamic memory is allocated from the heap at runtime using stdlib.h functions:\n- malloc(size): allocates size bytes, uninitialized\n- calloc(n, size): allocates n*size bytes, zero-initialized\n- realloc(ptr, new_size): resizes an existing allocation\n- free(ptr): releases allocated memory\n\nEvery malloc/calloc must be paired with free to prevent memory leaks.`,
    code: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    // malloc: allocate uninitialized memory\n    int *arr = (int*)malloc(5 * sizeof(int));\n    if (arr == NULL) {\n        printf("Memory allocation failed!\\n");\n        return 1;\n    }\n\n    for (int i = 0; i < 5; i++) arr[i] = (i+1) * 10;\n    printf("malloc array: ");\n    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);\n    printf("\\n");\n\n    // realloc: resize to 8 elements\n    int *resized = (int*)realloc(arr, 8 * sizeof(int));\n    if (resized == NULL) { free(arr); return 1; }\n    arr = resized;\n    for (int i = 5; i < 8; i++) arr[i] = (i+1) * 10;\n    printf("realloc array: ");\n    for (int i = 0; i < 8; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    free(arr);\n\n    // calloc: zero-initialized\n    float *grades = (float*)calloc(3, sizeof(float));\n    printf("calloc (zeros): %.1f %.1f %.1f\\n", grades[0], grades[1], grades[2]);\n    grades[0] = 85.5; grades[1] = 92.0; grades[2] = 78.5;\n    free(grades);\n\n    // Dynamic string\n    char *str = (char*)malloc(50 * sizeof(char));\n    strcpy(str, \"Dynamic string in C!\");\n    printf(\"%s\\n\", str);\n    free(str);\n    str = NULL;  // good practice: set to NULL after free\n\n    return 0;\n}`,
    output: `malloc array: 10 20 30 40 50\nrealloc array: 10 20 30 40 50 60 70 80\ncalloc (zeros): 0.0 0.0 0.0\nDynamic string in C!`,
    note: 'Always check if malloc/calloc returns NULL before using the pointer — allocation can fail with large sizes.',
    warning: 'Double-free (calling free twice on the same pointer) and use-after-free are severe bugs. Set pointer to NULL after free.',
    tip: 'Use tools like Valgrind (Linux) to detect memory leaks, double-frees, and invalid memory accesses.',
    interviewTip: '"What is a memory leak?" — Failing to free dynamically allocated memory. The memory remains occupied until program exits, reducing available RAM.',
    mistakes: ['Not checking malloc return value', 'Double free / use after free', 'realloc on wrong pointer (can lose original on failure)'],
    summary: 'Dynamic memory gives runtime flexibility but demands responsibility. Always pair every malloc with free and use valgrind to verify.'
  },
  { id: 19, title: 'Preprocessor Directives', diff: 'intermediate', time: '30 min', phase: 'intermediate',
    prereq: 'Dynamic Memory Allocation',
    desc: '#include, #define, #ifdef, #ifndef, #pragma, macros with arguments, and conditional compilation.',
    theory: `The preprocessor transforms source code before compilation. Key directives:\n- #include: insert file contents\n- #define: define macros (constants or function-like)\n- #ifdef/#ifndef/#endif: conditional compilation\n- #pragma: compiler-specific instructions\n- #error: generate a compile-time error`,
    code: `#include <stdio.h>\n\n// Constant macros\n#define PI 3.14159265\n#define MAX_SIZE 100\n#define TRUE 1\n#define FALSE 0\n\n// Function-like macros\n#define SQUARE(x) ((x) * (x))\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n#define MIN(a, b) ((a) < (b) ? (a) : (b))\n#define ABS(x) ((x) >= 0 ? (x) : -(x))\n\n// Multi-line macro\n#define PRINT_VAR(var) do { \\\n    printf(#var \" = %d\\n\", var); \\\n} while(0)\n\n// Conditional compilation\n#define DEBUG_MODE 1\n\n#ifdef DEBUG_MODE\n#define DEBUG_PRINT(msg) printf(\"[DEBUG] %s\\n\", msg)\n#else\n#define DEBUG_PRINT(msg)  // empty, no debug output\n#endif\n\n#ifndef BUFFER_SIZE\n#define BUFFER_SIZE 256\n#endif\n\nint main() {\n    printf(\"PI = %.5f\\n\", PI);\n    printf(\"SQUARE(5) = %d\\n\", SQUARE(5));\n    printf(\"MAX(10,7) = %d\\n\", MAX(10, 7));\n    printf(\"ABS(-42) = %d\\n\", ABS(-42));\n\n    int count = 42;\n    PRINT_VAR(count);  // outputs: count = 42\n\n    DEBUG_PRINT(\"Entering main function\");\n    printf(\"BUFFER_SIZE = %d\\n\", BUFFER_SIZE);\n\n    // Predefined macros\n    printf(\"File: %s\\n\", __FILE__);\n    printf(\"Line: %d\\n\", __LINE__);\n    printf(\"Date: %s\\n\", __DATE__);\n\n    return 0;\n}`,
    output: `PI = 3.14159\nSQUARE(5) = 25\nMAX(10,7) = 10\nABS(-42) = 42\ncount = 42\n[DEBUG] Entering main function\nBUFFER_SIZE = 256\nFile: main.c\nLine: 48\nDate: Jul 11 2024`,
    note: 'Macros are text substitution — not functions. They have no type checking. Prefer inline functions (C99) or const for simple constants.',
    warning: 'Always wrap macro arguments in parentheses: #define SQUARE(x) ((x)*(x)) — without it, SQUARE(1+2) gives 1+2*1+2 = 5 instead of 9.',
    tip: 'Use #ifndef HEADER_H_... #define HEADER_H_... #endif (include guards) in every header file to prevent double inclusion.',
    interviewTip: '"What is a header guard and why is it needed?" — Prevents the same header from being included multiple times in one translation unit, avoiding redefinition errors.',
    mistakes: ['Missing parentheses around macro arguments', 'No include guards in header files', 'Using macros where const/inline functions would be safer'],
    summary: 'The preprocessor is a powerful text transformation tool. Use macros carefully and always protect headers with include guards.'
  },
  { id: 20, title: 'File Handling', diff: 'intermediate', time: '40 min', phase: 'intermediate',
    prereq: 'Preprocessor Directives',
    desc: 'fopen, fclose, fread, fwrite, fprintf, fscanf, fseek, and binary vs text file operations.',
    theory: `File I/O in C uses the FILE* type from stdio.h. fopen() opens a file with a mode: "r" (read), "w" (write, creates/truncates), "a" (append), "rb"/"wb" (binary read/write).\n\nAlways check fopen() return for NULL and close files with fclose() when done.`,
    code: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int id;\n    char name[30];\n    float gpa;\n} Student;\n\nint main() {\n    // Write to text file\n    FILE *fw = fopen(\"students.txt\", \"w\");\n    if (!fw) { perror(\"fopen\"); return 1; }\n\n    fprintf(fw, \"ID,Name,GPA\\n\");\n    fprintf(fw, \"1,Alice,9.2\\n\");\n    fprintf(fw, \"2,Bob,8.5\\n\");\n    fprintf(fw, \"3,Charlie,7.8\\n\");\n    fclose(fw);\n    printf(\"Written to students.txt\\n\");\n\n    // Read from text file\n    FILE *fr = fopen(\"students.txt\", \"r\");\n    char line[100];\n    printf(\"Contents:\\n\");\n    while (fgets(line, sizeof(line), fr) != NULL)\n        printf(\"%s\", line);\n    fclose(fr);\n\n    // Binary file write\n    Student s = {1, \"Alice\", 9.2f};\n    FILE *fb = fopen(\"student.bin\", \"wb\");\n    fwrite(&s, sizeof(Student), 1, fb);\n    fclose(fb);\n\n    // Binary file read\n    Student loaded;\n    FILE *fb2 = fopen(\"student.bin\", \"rb\");\n    fread(&loaded, sizeof(Student), 1, fb2);\n    fclose(fb2);\n    printf(\"Loaded: %s, GPA: %.1f\\n\", loaded.name, loaded.gpa);\n\n    return 0;\n}`,
    output: `Written to students.txt\nContents:\nID,Name,GPA\n1,Alice,9.2\n2,Bob,8.5\n3,Charlie,7.8\nLoaded: Alice, GPA: 9.2`,
    note: 'Text mode vs Binary mode: text mode translates \\n on Windows (\\r\\n). Binary mode reads/writes exact bytes.',
    warning: 'Always close files with fclose(). Open file descriptors are a resource leak and can cause data loss if not flushed.',
    tip: 'Use fseek(fp, 0, SEEK_END) + ftell(fp) to get file size, then rewind with rewind(fp) or fseek(fp, 0, SEEK_SET).',
    interviewTip: '"What is the difference between fprintf and printf?" — printf writes to stdout; fprintf writes to any FILE* stream.',
    mistakes: ['Not checking fopen return value', 'Not closing files', 'Using text mode for binary data (causes corruption on Windows)'],
    summary: 'C file I/O provides both text and binary modes. Always check return values, close files promptly, and handle binary data carefully.'
  },
  { id: 21, title: 'Bitwise Operators', diff: 'advanced', time: '40 min', phase: 'advanced',
    prereq: 'File Handling',
    desc: 'AND, OR, XOR, NOT, left shift, right shift — bit manipulation tricks and real-world uses.',
    theory: `Bitwise operators work on individual bits of integers: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift).\n\nCommon uses: setting/clearing/toggling bits (flags), fast multiplication/division by powers of 2, packing multiple values into one integer, and low-level hardware programming.`,
    code: `#include <stdio.h>\n\nvoid printBinary(unsigned int n) {\n    for (int i = 7; i >= 0; i--)\n        printf(\"%d\", (n >> i) & 1);\n    printf(\" (%d)\\n\", n);\n}\n\nint main() {\n    unsigned char a = 0b10110101;  // 181\n    unsigned char b = 0b11001010;  // 202\n\n    printf(\"a      = \"); printBinary(a);\n    printf(\"b      = \"); printBinary(b);\n    printf(\"a & b  = \"); printBinary(a & b);\n    printf(\"a | b  = \"); printBinary(a | b);\n    printf(\"a ^ b  = \"); printBinary(a ^ b);\n    printf(\"~a     = \"); printBinary(~a & 0xFF);\n    printf(\"a << 2 = \"); printBinary((a << 2) & 0xFF);\n    printf(\"a >> 2 = \"); printBinary(a >> 2);\n\n    // Bit manipulation tricks\n    int n = 52;\n    printf(\"\\nBit tricks on %d:\\n\", n);\n\n    // Set bit 3 (0-indexed)\n    printf(\"Set bit 3:    %d\\n\", n | (1 << 3));\n\n    // Clear bit 4\n    printf(\"Clear bit 4:  %d\\n\", n & ~(1 << 4));\n\n    // Toggle bit 5\n    printf(\"Toggle bit 5: %d\\n\", n ^ (1 << 5));\n\n    // Check if bit 2 is set\n    printf(\"Bit 2 set?    %d\\n\", (n >> 2) & 1);\n\n    // Power of 2 check\n    printf(\"%d is power of 2: %d\\n\", 32, (32 & (32-1)) == 0);\n    printf(\"%d is power of 2: %d\\n\", 35, (35 & (35-1)) == 0);\n\n    // Fast multiply/divide\n    printf(\"10 * 4 = %d (10 << 2)\\n\", 10 << 2);\n    printf(\"100 / 4 = %d (100 >> 2)\\n\", 100 >> 2);\n\n    return 0;\n}`,
    output: `a      = 10110101 (181)\nb      = 11001010 (202)\na & b  = 10000000 (128)\na | b  = 11111111 (255)\na ^ b  = 01111111 (127)\n~a     = 01001010 (74)\na << 2 = 11010100 (212)\na >> 2 = 00101101 (45)\n\nBit tricks on 52:\nSet bit 3:    60\nClear bit 4:  36\nToggle bit 5: 20\nBit 2 set?    1\n32 is power of 2: 1\n35 is power of 2: 0\n10 * 4 = 40 (10 << 2)\n100 / 4 = 25 (100 >> 2)`,
    note: 'Right shift of signed integers is implementation-defined. Use unsigned int for portable bitwise operations.',
    warning: 'Shifting by more than the bit-width is undefined behavior: 1 << 32 on a 32-bit int is UB.',
    tip: 'Use #define BIT(n) (1U << n) for readable bit manipulation. u suffix ensures unsigned shift.',
    interviewTip: '"Check if a number is a power of 2 using bitwise." — (n > 0) && (n & (n-1)) == 0. Powers of 2 have exactly one bit set.',
    mistakes: ['Right-shifting signed integers (implementation-defined)', 'Shift amount >= bit width (UB)', 'Not using unsigned for bit manipulation'],
    summary: 'Bitwise operators are essential for systems programming, embedded systems, and algorithm optimization. Master the common patterns.'
  },
  { id: 22, title: 'Searching Algorithms', diff: 'advanced', time: '40 min', phase: 'advanced',
    prereq: 'Bitwise Operators',
    desc: 'Linear search and Binary search — implementation, complexity analysis, and when to use each.',
    theory: `Linear Search: checks each element sequentially. O(n) time, O(1) space. Works on unsorted arrays.\n\nBinary Search: divides search space in half each step. O(log n) time, O(1) space. Requires sorted array.\n\nFor n=1,000,000: linear needs up to 1M comparisons, binary needs at most 20.`,
    code: `#include <stdio.h>\n\n// Linear Search\nint linearSearch(int arr[], int n, int target) {\n    for (int i = 0; i < n; i++)\n        if (arr[i] == target) return i;\n    return -1;\n}\n\n// Binary Search (iterative)\nint binarySearch(int arr[], int n, int target) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;  // avoid overflow\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\n\n// Binary Search (recursive)\nint bSearchRec(int arr[], int low, int high, int target) {\n    if (low > high) return -1;\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == target) return mid;\n    if (arr[mid] < target) return bSearchRec(arr, mid+1, high, target);\n    return bSearchRec(arr, low, mid-1, target);\n}\n\nint main() {\n    int unsorted[] = {64, 34, 25, 12, 22, 11, 90};\n    int sorted[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\n    int n = 7, ns = 10;\n\n    // Linear search on unsorted\n    int idx = linearSearch(unsorted, n, 22);\n    printf(\"Linear: 22 at index %d\\n\", idx);  // 4\n\n    idx = linearSearch(unsorted, n, 99);\n    printf(\"Linear: 99 at index %d\\n\", idx);  // -1\n\n    // Binary search on sorted\n    idx = binarySearch(sorted, ns, 23);\n    printf(\"Binary: 23 at index %d\\n\", idx);  // 5\n\n    idx = binarySearch(sorted, ns, 15);\n    printf(\"Binary: 15 at index %d\\n\", idx);  // -1\n\n    idx = bSearchRec(sorted, 0, ns-1, 72);\n    printf(\"Binary Rec: 72 at index %d\\n\", idx);  // 8\n\n    printf(\"\\nComplexity:\\n\");\n    printf(\"Linear: O(n) time, O(1) space\\n\");\n    printf(\"Binary: O(log n) time, O(1) space (iterative)\\n\");\n\n    return 0;\n}`,
    output: `Linear: 22 at index 4\nLinear: 99 at index -1\nBinary: 23 at index 5\nBinary: 15 at index -1\nBinary Rec: 72 at index 8\n\nComplexity:\nLinear: O(n) time, O(1) space\nBinary: O(log n) time, O(1) space (iterative)`,
    note: 'Use low + (high-low)/2 instead of (low+high)/2 to prevent integer overflow when low and high are large.',
    warning: 'Binary search on an unsorted array gives wrong results. Always sort first if using binary search.',
    tip: 'In C, use bsearch() from stdlib.h for a built-in binary search on sorted arrays.',
    interviewTip: '"What is the time complexity of binary search?" — O(log n). Each iteration halves the search space. For n=10^9, only ~30 comparisons needed.',
    mistakes: ['Applying binary search to unsorted data', 'Integer overflow in mid calculation', 'Off-by-one in high = mid-1 vs high = mid'],
    summary: 'Know linear vs binary search tradeoffs. Binary search is dramatically faster but requires sorted data. Use the right tool for the situation.'
  },
  { id: 23, title: 'Sorting Algorithms', diff: 'advanced', time: '55 min', phase: 'advanced',
    prereq: 'Searching Algorithms',
    desc: 'Bubble, Selection, Insertion, Merge, and Quick Sort — implementation and complexity comparison.',
    theory: `Sorting algorithms organize data. Key complexity comparisons:\n- Bubble/Selection/Insertion: O(n²) — simple, good for small datasets\n- Merge Sort: O(n log n) always — stable, needs O(n) extra space\n- Quick Sort: O(n log n) average, O(n²) worst — in-place, fastest in practice\n\nC's built-in qsort() from stdlib.h uses quicksort internally.`,
    code: `#include <stdio.h>\n\nvoid printArr(int arr[], int n) {\n    for(int i=0;i<n;i++) printf(\"%d \",arr[i]);\n    printf(\"\\n\");\n}\n\nvoid bubbleSort(int arr[], int n) {\n    for(int i=0;i<n-1;i++)\n        for(int j=0;j<n-i-1;j++)\n            if(arr[j]>arr[j+1]) {int t=arr[j];arr[j]=arr[j+1];arr[j+1]=t;}\n}\n\nvoid selectionSort(int arr[], int n) {\n    for(int i=0;i<n-1;i++) {\n        int minIdx=i;\n        for(int j=i+1;j<n;j++) if(arr[j]<arr[minIdx]) minIdx=j;\n        int t=arr[i];arr[i]=arr[minIdx];arr[minIdx]=t;\n    }\n}\n\nvoid merge(int arr[],int l,int m,int r) {\n    int n1=m-l+1, n2=r-m;\n    int L[n1], R[n2];\n    for(int i=0;i<n1;i++) L[i]=arr[l+i];\n    for(int j=0;j<n2;j++) R[j]=arr[m+1+j];\n    int i=0,j=0,k=l;\n    while(i<n1&&j<n2) arr[k++]=(L[i]<=R[j])?L[i++]:R[j++];\n    while(i<n1) arr[k++]=L[i++];\n    while(j<n2) arr[k++]=R[j++];\n}\nvoid mergeSort(int arr[],int l,int r) {\n    if(l<r) { int m=(l+r)/2; mergeSort(arr,l,m); mergeSort(arr,m+1,r); merge(arr,l,m,r); }\n}\n\nint partition(int arr[],int l,int r) {\n    int pivot=arr[r],i=l-1;\n    for(int j=l;j<r;j++) if(arr[j]<=pivot) {i++;int t=arr[i];arr[i]=arr[j];arr[j]=t;}\n    int t=arr[i+1];arr[i+1]=arr[r];arr[r]=t;\n    return i+1;\n}\nvoid quickSort(int arr[],int l,int r) {\n    if(l<r){int p=partition(arr,l,r);quickSort(arr,l,p-1);quickSort(arr,p+1,r);}\n}\n\nint main() {\n    int a1[]={64,34,25,12,22,11,90};\n    int a2[]={64,34,25,12,22,11,90};\n    int a3[]={64,34,25,12,22,11,90};\n    int a4[]={64,34,25,12,22,11,90};\n    int n=7;\n\n    bubbleSort(a1,n);   printf(\"Bubble: \");    printArr(a1,n);\n    selectionSort(a2,n);printf(\"Selection: \"); printArr(a2,n);\n    mergeSort(a3,0,n-1);printf(\"Merge: \");     printArr(a3,n);\n    quickSort(a4,0,n-1);printf(\"Quick: \");     printArr(a4,n);\n    return 0;\n}`,
    output: `Bubble:    11 12 22 25 34 64 90\nSelection: 11 12 22 25 34 64 90\nMerge:     11 12 22 25 34 64 90\nQuick:     11 12 22 25 34 64 90`,
    note: 'For production code, use qsort() from stdlib.h — it\'s optimized and handles all types via comparison function.',
    warning: 'QuickSort worst case O(n²) occurs on already-sorted arrays with poor pivot selection (last element). Use random pivot or median-of-three.',
    tip: 'Merge sort is preferred when stability is needed (equal elements maintain relative order) or for linked lists.',
    interviewTip: '"Which sorting algorithm is best?" — Depends: QuickSort for general use, MergeSort for stability/linked lists, InsertionSort for nearly-sorted small arrays.',
    mistakes: ['Using bubble sort for large data (O(n²) is too slow)', 'Not considering stability requirements', 'Poor pivot choice in quicksort'],
    summary: 'Know the complexity tradeoffs: O(n²) sorts for small data, O(n log n) for large. Quicksort is fastest in practice; mergesort is stable.'
  },
  { id: 24, title: 'Linked Lists', diff: 'advanced', time: '60 min', phase: 'advanced',
    prereq: 'Sorting Algorithms',
    desc: 'Singly and doubly linked lists — creation, insertion, deletion, traversal, and reversal.',
    theory: `A linked list is a dynamic data structure where each node contains data and a pointer to the next node. Unlike arrays, nodes are not stored contiguously.\n\nAdvantages: O(1) insertion/deletion at known position, dynamic size. Disadvantages: O(n) random access, extra memory for pointers.`,
    code: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nNode* createNode(int data) {\n    Node *n = (Node*)malloc(sizeof(Node));\n    n->data = data;\n    n->next = NULL;\n    return n;\n}\n\nvoid insertEnd(Node **head, int data) {\n    Node *newNode = createNode(data);\n    if (*head == NULL) { *head = newNode; return; }\n    Node *temp = *head;\n    while (temp->next) temp = temp->next;\n    temp->next = newNode;\n}\n\nvoid insertHead(Node **head, int data) {\n    Node *newNode = createNode(data);\n    newNode->next = *head;\n    *head = newNode;\n}\n\nvoid deleteNode(Node **head, int data) {\n    if (!*head) return;\n    if ((*head)->data == data) {\n        Node *temp = *head;\n        *head = (*head)->next;\n        free(temp); return;\n    }\n    Node *prev = *head;\n    while (prev->next && prev->next->data != data) prev = prev->next;\n    if (prev->next) {\n        Node *temp = prev->next;\n        prev->next = temp->next;\n        free(temp);\n    }\n}\n\nvoid reverseList(Node **head) {\n    Node *prev=NULL, *curr=*head, *next=NULL;\n    while (curr) { next=curr->next; curr->next=prev; prev=curr; curr=next; }\n    *head = prev;\n}\n\nvoid printList(Node *head) {\n    while (head) { printf(\"%d\", head->data); if(head->next) printf(\" -> \"); head=head->next; }\n    printf(\" -> NULL\\n\");\n}\n\nint main() {\n    Node *head = NULL;\n    insertEnd(&head, 10);\n    insertEnd(&head, 20);\n    insertEnd(&head, 30);\n    insertHead(&head, 5);\n    printf(\"List: \"); printList(head);\n\n    deleteNode(&head, 20);\n    printf(\"After delete 20: \"); printList(head);\n\n    reverseList(&head);\n    printf(\"Reversed: \"); printList(head);\n\n    return 0;\n}`,
    output: `List: 5 -> 10 -> 20 -> 30 -> NULL\nAfter delete 20: 5 -> 10 -> 30 -> NULL\nReversed: 30 -> 10 -> 5 -> NULL`,
    note: 'Always free all nodes when done. Walk the list with next = curr->next before freeing curr.',
    warning: 'The most common linked list bug: not updating the head when inserting/deleting at the front. Use **head (double pointer).',
    tip: 'Use a dummy head node to simplify edge cases (empty list, insert at head).',
    interviewTip: '"How to detect a cycle in a linked list?" — Floyd\'s cycle detection (slow/fast pointer): if slow == fast, a cycle exists. O(n) time, O(1) space.',
    mistakes: ['Memory leak: not freeing nodes', 'Not handling empty list edge cases', 'Losing head reference during reversal'],
    summary: 'Linked lists are essential for implementing stacks, queues, and graphs. Master insertion, deletion, reversal, and cycle detection.'
  },
];



const C_QUIZ_DATA = {
  beginner: [
    { q: 'Who created the C programming language?', options: ['Bjarne Stroustrup', 'Dennis Ritchie', 'Guido van Rossum', 'James Gosling'], answer: 1, explanation: 'Dennis Ritchie created C at Bell Labs in 1972.' },
    { q: 'Which header file is needed for printf() and scanf()?', options: ['stdlib.h', 'math.h', 'stdio.h', 'string.h'], answer: 2, explanation: 'stdio.h provides standard input/output functions like printf and scanf.' },
    { q: 'What is the size of int on most 32/64-bit systems?', options: ['2 bytes', '4 bytes', '8 bytes', 'Depends on compiler'], answer: 3, explanation: 'The size of int is platform-dependent. Use sizeof(int) to verify. Typically 4 bytes on 32/64-bit systems.' },
    { q: 'Which operator is used to get the address of a variable?', options: ['*', '&', '->', '#'], answer: 1, explanation: '& (address-of operator) returns the memory address of a variable.' },
    { q: 'What does printf("\\n") output?', options: ['The letter n', 'A tab', 'A newline character', 'Nothing'], answer: 2, explanation: '\\n is the escape sequence for newline (moves cursor to next line).' },
    { q: 'Which loop is guaranteed to execute at least once?', options: ['for', 'while', 'do-while', 'foreach'], answer: 2, explanation: 'do-while checks the condition after the loop body executes, so it always runs at least once.' },
    { q: 'What is the correct format specifier for float in printf?', options: ['%d', '%c', '%f', '%s'], answer: 2, explanation: '%f is used for float and double in printf. scanf uses %f for float and %lf for double.' },
    { q: 'What value does main() return to indicate successful execution?', options: ['-1', '1', '0', 'void'], answer: 2, explanation: 'return 0; indicates successful program termination. Non-zero values indicate errors.' },
    { q: 'Which keyword is used to define a structure in C?', options: ['class', 'struct', 'record', 'type'], answer: 1, explanation: 'struct is used to group variables of different types under one name in C.' },
    { q: 'What does the modulo operator % do?', options: ['Multiply', 'Divide', 'Return remainder', 'Return quotient'], answer: 2, explanation: '% returns the remainder of integer division. 10 % 3 = 1.' },
  ],
  intermediate: [
    { q: 'What is a dangling pointer?', options: ['NULL pointer', 'A pointer to freed memory', 'A double pointer', 'A void pointer'], answer: 1, explanation: 'A dangling pointer points to memory that has been freed or deallocated. Dereferencing it is undefined behavior.' },
    { q: 'What does malloc() return on failure?', options: ['0', '-1', 'NULL', 'EOF'], answer: 2, explanation: 'malloc() returns NULL if memory allocation fails. Always check the return value.' },
    { q: 'What is the output of: int a=5; printf("%d", a++);?', options: ['5', '6', 'Error', '4'], answer: 0, explanation: 'Post-increment (a++): the current value (5) is used in the expression, then a becomes 6.' },
    { q: 'Which function is used to close a file in C?', options: ['fclose()', 'close()', 'fend()', 'fileclose()'], answer: 0, explanation: 'fclose(FILE *fp) closes the file and flushes the buffer. Always close files when done.' },
    { q: 'What is a static variable in C?', options: ['A constant', 'A variable that retains its value between function calls', 'A global variable', 'A pointer'], answer: 1, explanation: 'A static local variable retains its value between function calls, initialized only once.' },
    { q: 'What does sizeof(char) always return in C?', options: ['1', '2', '4', 'Depends on platform'], answer: 0, explanation: 'sizeof(char) is always 1 byte by definition in the C standard.' },
    { q: 'Which of these is correct pointer arithmetic?', options: ['ptr + 0.5', 'ptr * 2', 'ptr + 3', 'ptr ^ 1'], answer: 2, explanation: 'You can add/subtract integers from pointers. ptr + 3 moves the pointer by 3 elements.' },
    { q: 'What does calloc() do differently from malloc()?', options: ['Faster allocation', 'Zero-initializes allocated memory', 'Allocates on stack', 'Returns double pointer'], answer: 1, explanation: 'calloc(n, size) allocates n*size bytes and initializes all bytes to zero. malloc leaves memory uninitialized.' },
    { q: 'What is the purpose of the -> operator?', options: ['Pointer arithmetic', 'Access struct member via pointer', 'Decrement', 'Bitwise right shift'], answer: 1, explanation: 'ptr->member is shorthand for (*ptr).member — accessing a struct member through a pointer.' },
    { q: 'Which storage class restricts a variable to file scope?', options: ['auto', 'extern', 'static', 'register'], answer: 2, explanation: 'A global variable declared with static has internal linkage — visible only within its translation unit.' },
  ],
  advanced: [
    { q: 'What is undefined behavior in C?', options: ['Compile error', 'Runtime crash only', 'Behavior not specified by standard, anything can happen', 'Always produces 0'], answer: 2, explanation: 'UB means the C standard imposes no requirements — the program can crash, produce wrong output, or even appear to work correctly.' },
    { q: 'What is a memory leak?', options: ['Null pointer', 'Not freeing dynamically allocated memory', 'Stack overflow', 'Buffer overflow'], answer: 1, explanation: 'Memory leak occurs when dynamically allocated memory is not freed, causing available memory to decrease over time.' },
    { q: 'What does volatile keyword mean in C?', options: ['Variable cannot change', 'Variable can be changed externally (do not optimize)', 'Variable is read-only', 'Variable is thread-safe'], answer: 1, explanation: 'volatile tells the compiler not to optimize accesses to the variable — it may be changed by hardware, OS, or another thread.' },
    { q: 'What is the difference between #include <file> and #include "file"?', options: ['No difference', '<> searches system directories; "" searches current directory first', '"" is for C++', '<> only for user files'], answer: 1, explanation: '<file> searches compiler\'s include path (system headers). "file" searches current directory first, then system path.' },
    { q: 'What is a function pointer?', options: ['Pointer to function return value', 'Pointer holding address of a function', 'Recursive function', 'Inline function'], answer: 1, explanation: 'Function pointers store the address of a function. Used for callbacks, dispatch tables, and implementing polymorphism in C.' },
    { q: 'What does the restrict keyword indicate?', options: ['Read-only pointer', 'Pointer alias — no other pointer accesses same memory', 'Thread-local pointer', 'Const pointer'], answer: 1, explanation: 'restrict tells the compiler that the pointer is the only reference to the memory it points to, enabling optimizations.' },
    { q: 'What is a segmentation fault?', options: ['Syntax error', 'Division by zero', 'Accessing memory your program does not own', 'Stack overflow only'], answer: 2, explanation: 'Segfault occurs when a program tries to access memory it is not allowed to access (NULL deref, buffer overflow, use-after-free, etc.).' },
    { q: 'What does the C standard guarantee about struct padding?', options: ['No padding exists', 'Padding may be inserted for alignment but not at the beginning', 'Padding is always 4 bytes', 'Struct size equals sum of members'], answer: 1, explanation: 'The C standard allows compilers to add padding between or after members for alignment, but never before the first member.' },
    { q: 'What is the purpose of extern in a declaration?', options: ['Define a variable', 'Declare a variable defined in another translation unit', 'Make variable global', 'Prevent modification'], answer: 1, explanation: 'extern declares that the variable is defined elsewhere (another .c file). It does not allocate storage.' },
    { q: 'What is the time complexity of accessing an element in a C array?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], answer: 2, explanation: 'Array access is O(1) — direct memory calculation: base_address + index * sizeof(element).' },
  ],
};

const C_INTERVIEW_QUESTIONS = {
  'Basic': [
    { q: 'What is C language and who created it?', a: 'C is a general-purpose, procedural programming language created by Dennis Ritchie at Bell Labs in 1972. It was designed for system programming and is the basis for the UNIX operating system. C is statically typed, compiled, and provides direct memory access through pointers.', tip: 'Mention: Dennis Ritchie, Bell Labs, 1972, system programming, UNIX.', freq: true },
    { q: 'What is the difference between C and C++?', a: 'C is procedural; C++ supports both procedural and object-oriented programming. C++ adds classes, objects, inheritance, polymorphism, templates, and STL. C has no function overloading, no references, no new/delete. C++ is a superset of C (with some exceptions).', tip: 'Key differences: OOP support, references vs pointers, new/delete vs malloc/free.', freq: true },
    { q: 'What are the basic data types in C?', a: 'C basic types: int (integer), float (single-precision), double (double-precision), char (character), void (no type). Modified by: short, long, signed, unsigned. Sizes vary by platform — use sizeof() to verify.', tip: 'Know sizes: char=1, short=2, int=4, long=4/8, float=4, double=8 bytes (typical).', freq: true },
    { q: 'What is a pointer in C?', a: 'A pointer is a variable that stores the memory address of another variable. Declared as: int *ptr = &x. Use & to get address, * to dereference. Pointers enable dynamic memory allocation, call-by-reference, and efficient array operations.', tip: 'Draw a memory diagram. Explain & and * operators clearly.', freq: true },
    { q: 'What is the difference between local and global variables?', a: 'Local variables are declared inside a function, stored on the stack, have function scope, and are automatically destroyed when the function returns. Global variables are declared outside functions, exist for the program lifetime, and have file/program scope.', tip: 'Discuss default values: global variables are zero-initialized; local variables have garbage values.', freq: false },
  ],
  'Intermediate': [
    { q: 'What is a memory leak and how to prevent it?', a: 'A memory leak occurs when dynamically allocated memory is not freed, causing the program to use increasing amounts of RAM. Prevention: always pair malloc/calloc with free(), set pointer to NULL after free, use tools like Valgrind to detect leaks.', tip: 'Show a simple malloc without free as example. Mention valgrind.', freq: true },
    { q: 'Explain the difference between stack and heap memory.', a: 'Stack: automatically managed, LIFO, fast, limited size (~1-8MB), used for local variables and function calls. Heap: manually managed (malloc/free), large, slower, used for dynamic allocation. Stack overflow occurs with deep recursion; heap fragmentation with many alloc/free cycles.', tip: 'Draw a process memory layout: code | data | BSS | heap (grows up) | stack (grows down).', freq: true },
    { q: 'What is the use of const keyword?', a: 'const prevents modification of a variable after initialization. const int x = 5 — x cannot be changed. const int *ptr — cannot modify value through ptr. int * const ptr — ptr itself cannot change (address). const int * const ptr — both constant.', tip: 'Know all three const-pointer combinations and what each protects.', freq: false },
    { q: 'What is the difference between ++i and i++ (pre vs post increment)?', a: 'Pre-increment (++i): increments first, then uses the value in expression. Post-increment (i++): uses the value first, then increments. Both increment i, but the expression value differs: int x = 5; printf("%d", x++) prints 5; printf("%d", ++x) would print 7.', tip: 'Always trace with concrete numbers in the interview.', freq: true },
    { q: 'Explain call by value vs call by reference in C.', a: 'Call by value: a copy of the argument is passed. Modifying the parameter does not affect the original. Call by reference: the address of the argument is passed (pointer). Modifying *ptr inside the function changes the original. C only has call by value — "call by reference" is simulated via pointers.', tip: 'Write a swap() function to demonstrate: needs swap(int *a, int *b) not swap(int a, int b).', freq: true },
  ],
  'Advanced': [
    { q: 'What is undefined behavior in C? Give examples.', a: 'Undefined behavior (UB) means the C standard does not specify what happens — the program can crash, produce wrong output, or appear to work. Examples: dereferencing NULL/dangling pointer, integer overflow (signed), buffer overflow, reading uninitialized variables, data races.', tip: 'Mention tools: AddressSanitizer, UBSanitizer for catching UB at runtime.', freq: true },
    { q: 'What is the volatile keyword?', a: 'volatile tells the compiler that a variable\'s value may change unexpectedly (by hardware, OS, or another thread) and should not be optimized. Used for: hardware registers, memory-mapped I/O, signal handlers, shared memory in embedded systems.', tip: 'volatile does NOT provide thread safety — use mutexes/atomics for that.', freq: false },
    { q: 'Explain function pointers and their uses.', a: 'A function pointer stores the address of a function. Syntax: int (*fp)(int, int) = &add; Call: fp(3, 4). Uses: callbacks (like qsort comparator), implementing polymorphism in C, state machines, dispatch tables/vtables.', tip: 'Show qsort() as a practical example: qsort(arr, n, sizeof(int), compare);', freq: true },
    { q: 'What is the difference between deep copy and shallow copy?', a: 'Shallow copy: copies the pointer value (both point to the same memory). Deep copy: allocates new memory and copies the actual data. In C structs with pointer members, struct assignment (s1=s2) creates a shallow copy. Deep copy requires manual malloc and memcpy/strcpy for each pointer member.', tip: 'Draw memory diagrams to illustrate both cases.', freq: false },
    { q: 'What is struct padding and how to minimize it?', a: 'The compiler inserts padding bytes between struct members to align each member on its natural alignment boundary (typically its size). This wastes memory. To minimize: order members from largest to smallest. Use __attribute__((packed)) to eliminate padding (at the cost of performance).', tip: 'Example: struct with char, int, char may be 12 bytes not 6. Use offsetof() to inspect.', freq: false },
  ],
  'HR Questions': [
    { q: 'Why do you want to learn C programming?', a: 'C is the foundation of system software, embedded systems, operating systems, and most modern languages. Learning C builds strong fundamentals in memory management, pointers, and algorithm implementation that transfer to any language. Understanding C makes you a better programmer at every level.', tip: 'Connect to your career goals — embedded systems, OS development, competitive programming, etc.', freq: false },
    { q: 'How do you debug a C program?', a: 'Debugging approaches: 1) Printf debugging — add print statements to trace values. 2) GDB debugger — set breakpoints, inspect variables, step through code. 3) AddressSanitizer — detect memory errors. 4) Valgrind — detect memory leaks and invalid access. 5) Static analysis — compiler warnings (-Wall -Wextra), cppcheck.', tip: 'Show familiarity with GDB: run, break, next, step, print, backtrace commands.', freq: true },
    { q: 'What C project have you built?', a: 'Describe a specific project: what problem it solved, data structures used, challenges faced (memory management, segfaults), what you learned. Examples: student management system, library system, simple shell, text editor, bank management system.', tip: 'Prepare a 2-minute project pitch. Have code ready to share on GitHub.', freq: true },
  ],
};

const C_DOWNLOADS = [
  { title: 'C Complete Notes', icon: '📘', type: 'PDF', size: '5.1 MB', updated: 'Jun 2024', desc: 'Comprehensive notes covering all C topics from basics to advanced, with examples and diagrams.', color: '#A8B9CC' },
  { title: 'C Cheat Sheet', icon: '⚡', type: 'PDF', size: '920 KB', updated: 'Jul 2024', desc: 'Quick reference for C syntax, operators, format specifiers, standard library functions, and common patterns.', color: '#FFD43B' },
  { title: 'C Handbook', icon: '📗', type: 'PDF', size: '7.2 MB', updated: 'May 2024', desc: 'Complete reference: K&R style guide, standard library reference, ANSI C and C99/C11 features.', color: '#4ade80' },
  { title: 'Practice Programs Pack', icon: '💻', type: 'ZIP', size: '2.8 MB', updated: 'Jul 2024', desc: '120+ solved C programs with explanations: algorithms, data structures, file handling, and more.', color: '#a855f7' },
  { title: 'Mini Projects Bundle', icon: '🚀', type: 'ZIP', size: '4.3 MB', updated: 'Jun 2024', desc: '10 mini projects with full source code: student system, bank management, inventory, and more.', color: '#ec4899' },
  { title: 'Previous Year Papers', icon: '📝', type: 'PDF', size: '2.1 MB', updated: 'Apr 2024', desc: 'Curated exam questions with detailed solutions, marking schemes, and model answers.', color: '#fb923c' },
  { title: 'Interview Prep Notes', icon: '🎯', type: 'PDF', size: '3.4 MB', updated: 'Jul 2024', desc: 'Top 100 C interview questions with detailed answers, code examples, and tips for freshers.', color: '#60a5fa' },
  { title: 'C PDF Guide', icon: '📕', type: 'PDF', size: '6.8 MB', updated: 'Jul 2024', desc: 'Complete visual PDF guide with diagrams, memory models, pointer illustrations, and concept maps.', color: '#f87171' },
  { title: 'Lab Manual', icon: '🔬', type: 'PDF', size: '3.6 MB', updated: 'Jun 2024', desc: 'Complete BCA lab manual with 30+ experiments, expected output, viva questions, and assessment rubric.', color: '#34d399' },
];

const C_PROJECTS = [
  { title: 'Student Management System', emoji: '🎓', diff: 'Beginner', time: '6-8 hrs', tags: ['Struct', 'File I/O', 'Arrays'], desc: 'Add, display, search, update, and delete student records with file persistence.', features: ['Add/delete students', 'Search by ID or name', 'Display all records', 'File-based storage', 'Average GPA report'] },
  { title: 'Library Management', emoji: '📚', diff: 'Beginner', time: '8-10 hrs', tags: ['Struct', 'File I/O', 'Functions'], desc: 'Manage library books: add, issue, return, search, and fine calculation.', features: ['Book inventory', 'Issue/return system', 'Fine calculation', 'Search by title/author', 'File persistence'] },
  { title: 'Bank Management System', emoji: '🏦', diff: 'Intermediate', time: '10-15 hrs', tags: ['Struct', 'File I/O', 'Math'], desc: 'Account creation, deposit, withdrawal, balance inquiry, and transaction history.', features: ['Account creation', 'Deposit/withdrawal', 'Balance inquiry', 'Transaction history', 'Interest calculation'] },
  { title: 'Employee Payroll System', emoji: '💼', diff: 'Intermediate', time: '8-12 hrs', tags: ['Struct', 'File I/O', 'Math'], desc: 'Manage employee records, calculate salary with deductions, and generate payslips.', features: ['Employee records', 'Salary calculation', 'Tax deduction', 'Payslip generation', 'Department reports'] },
  { title: 'Hospital Management', emoji: '🏥', diff: 'Intermediate', time: '12-16 hrs', tags: ['Struct', 'Linked List', 'File I/O'], desc: 'Patient registration, doctor appointment, billing, and medical records management.', features: ['Patient registration', 'Doctor scheduling', 'Billing system', 'Medical history', 'Appointment tracking'] },
  { title: 'Inventory System', emoji: '📦', diff: 'Intermediate', time: '8-12 hrs', tags: ['Struct', 'File I/O', 'Sorting'], desc: 'Track products, stock levels, purchases, sales, and generate inventory reports.', features: ['Product catalog', 'Stock tracking', 'Purchase/sale records', 'Low stock alerts', 'Inventory report'] },
  { title: 'Text Editor (CLI)', emoji: '📝', diff: 'Advanced', time: '20-25 hrs', tags: ['File I/O', 'Pointers', 'String'], desc: 'A command-line text editor with open, edit, save, search/replace, and line navigation.', features: ['Open/save files', 'Insert/delete text', 'Find & replace', 'Line numbers', 'Undo basic ops'] },
  { title: 'Mini Shell', emoji: '⚡', diff: 'Advanced', time: '25-30 hrs', tags: ['Process', 'System Calls', 'Pipes'], desc: 'Implement a basic shell with command parsing, piping, redirection, and built-in commands.', features: ['Command parsing', 'Process creation (fork/exec)', 'I/O redirection', 'Pipe support', 'Built-in commands'] },
  { title: 'Address Book', emoji: '📒', diff: 'Beginner', time: '5-7 hrs', tags: ['Struct', 'File I/O', 'Search'], desc: 'Store and manage contacts with name, phone, email, and address with search functionality.', features: ['Add/delete contacts', 'Search by name', 'Edit contact', 'File persistence', 'List all contacts'] },
];

const C_PRACTICE_PROBLEMS = [
  { id: 1, title: 'Reverse Array', difficulty: 'Easy', tags: ['Array', 'Two Pointer'], desc: 'Write a function to reverse an array in-place without using an extra array.', examples: [{ input: 'arr = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' }, { input: 'arr = [10, 20]', output: '[20, 10]' }], constraints: ['1 ≤ n ≤ 10⁵', '-10⁹ ≤ arr[i] ≤ 10⁹'], hint: 'Use two pointers: left starting from 0, right from n-1. Swap and move toward the middle.' },
  { id: 2, title: 'Count Digits', difficulty: 'Easy', tags: ['Math', 'Loop'], desc: 'Count the number of digits in a given integer without converting to a string.', examples: [{ input: 'n = 12345', output: '5' }, { input: 'n = 9', output: '1' }], constraints: ['0 ≤ n ≤ 10¹⁸'], hint: 'Divide by 10 in a loop and count iterations. Handle n=0 as a special case.' },
  { id: 3, title: 'Linked List Length', difficulty: 'Medium', tags: ['Linked List', 'Pointer'], desc: 'Find the length (number of nodes) of a singly linked list.', examples: [{ input: 'head: 1 -> 2 -> 3 -> 4 -> NULL', output: '4' }], constraints: ['0 ≤ nodes ≤ 10⁴'], hint: 'Traverse from head to NULL, counting each node.' },
];

const C_STARTER_CODE = {
  1: `#include <stdio.h>\n\nvoid reverseArray(int arr[], int n) {\n    // Write your solution here\n}\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    int n = 5;\n    reverseArray(arr, n);\n    for(int i = 0; i < n; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    return 0;\n}`,
  2: `#include <stdio.h>\n\nint countDigits(long long n) {\n    // Write your solution here\n    return 0;\n}\n\nint main() {\n    printf("%d\\n", countDigits(12345));\n    printf("%d\\n", countDigits(0));\n    return 0;\n}`,
  3: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nint listLength(Node *head) {\n    // Write your solution here\n    return 0;\n}\n\nint main() {\n    // Build test list: 1 -> 2 -> 3 -> 4 -> NULL\n    // Test listLength()\n    return 0;\n}`,
};

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

const CCodeBlock = ({ code, lang = 'C' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="c-code-block">
      <div className="c-code-block-header">
        <span className="c-code-lang">{lang}</span>
        <button className="c-copy-btn" onClick={handleCopy}>
          {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
        </button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

const COutputBlock = ({ output }) => (
  <div className="c-output-block">
    <div className="c-output-header"><Terminal size={12} /> Output</div>
    <pre>{output}</pre>
  </div>
);

/* ============================================================
   TAB: OVERVIEW
   ============================================================ */
const OverviewTab = ({ setActiveTab }) => (
  <div className="c-tab-content c-overview-grid">
    <div className="c-overview-left">
      <div className="c-about-card">
        <h3>⚙️ About C Programming</h3>
        <p>C is a general-purpose, procedural programming language developed by Dennis Ritchie at Bell Labs in 1972. It was designed to develop the UNIX operating system and remains one of the most influential languages ever created.</p>
        <p style={{ marginTop: '10px' }}>Often called the "mother of all programming languages," C influenced C++, Java, Python, Go, and Rust. It provides direct memory control via pointers, making it the language of choice for system software and embedded programming.</p>
        <div className="c-why-grid" style={{ marginTop: '16px' }}>
          {[{ icon: '⚡', title: 'Fast & Efficient', desc: 'Compiled to native machine code' }, { icon: '🔧', title: 'Low-Level Control', desc: 'Direct memory & hardware access' }, { icon: '📦', title: 'Portable', desc: 'Runs on any platform with a C compiler' }, { icon: '🏗️', title: 'Foundation', desc: 'Basis of OS, compilers, databases' }].map((w, i) => (
            <div key={i} className="c-why-item">
              <div className="c-why-icon">{w.icon}</div>
              <div><h5>{w.title}</h5><p>{w.desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="c-about-card">
        <h3><Target size={17} /> Learning Objectives</h3>
        <div className="c-objectives-list">
          {['Master C fundamentals: variables, data types, operators, and I/O', 'Control flow: conditions, loops, and function design', 'Deep understanding of arrays, strings, and character manipulation', 'Pointer mastery: arithmetic, dynamic memory, double pointers', 'Structures, unions, enums, and user-defined data types', 'Implement core data structures: stack, queue, linked list', 'File handling for persistent data storage', 'Sorting and searching algorithms with complexity analysis', 'Prepare for technical interviews with C'].map((obj, i) => (
            <div key={i} className="c-obj-item"><div className="c-obj-dot" /><span>{obj}</span></div>
          ))}
        </div>
      </div>

      <div className="c-about-card">
        <h3><Briefcase size={17} /> Career Opportunities</h3>
        <div className="c-career-grid">
          {[{ icon: '🖥️', title: 'Systems Programmer', sub: 'OS, Kernels, Drivers' }, { icon: '🔌', title: 'Embedded Engineer', sub: 'Microcontrollers, IoT' }, { icon: '🎮', title: 'Game Developer', sub: 'Low-level Game Engines' }, { icon: '🔒', title: 'Security Researcher', sub: 'Exploit Analysis, Malware' }, { icon: '📡', title: 'Network Engineer', sub: 'Networking Protocols' }, { icon: '🤖', title: 'Robotics Engineer', sub: 'Real-time Control Systems' }].map((c, i) => (
            <div key={i} className="c-career-card">
              <div className="icon">{c.icon}</div>
              <h5>{c.title}</h5>
              <p>{c.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="c-about-card">
        <h3><Globe size={17} /> C Ecosystem & Standard Libraries</h3>
        <div className="c-ecosystem-grid">
          {['stdio.h', 'stdlib.h', 'string.h', 'math.h', 'time.h', 'ctype.h', 'limits.h', 'stdint.h', 'stdbool.h', 'assert.h', 'errno.h', 'signal.h', 'pthread.h', 'socket.h', 'GCC', 'Clang', 'LLVM', 'Make/CMake'].map((lib, i) => (
            <div key={i} className="c-eco-chip">⚙ {lib}</div>
          ))}
        </div>
      </div>
    </div>

    <div className="c-overview-right">
      <div className="c-popular-topics">
        <h4>🔥 Popular Topics</h4>
        {['Pointers & Memory', 'Structures & Unions', 'Dynamic Memory (malloc)', 'File Handling', 'Linked Lists', 'Sorting Algorithms', 'Recursion', 'Bitwise Operators'].map((topic, i) => (
          <div key={i} className="c-topic-link" onClick={() => setActiveTab('lessons')}>
            <div className="c-topic-link-left"><div className="c-topic-num">{i + 1}</div>{topic}</div>
            <ChevronRight size={14} />
          </div>
        ))}
        <button className="c-view-all-btn" onClick={() => setActiveTab('lessons')}>
          View All Lessons <ArrowRight size={13} />
        </button>
      </div>

      <div className="c-about-card" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(168,85,247,0.06))', border: '1px solid rgba(139,92,246,0.2)' }}>
        <h3>▶️ Continue Learning</h3>
        <p style={{ marginBottom: '14px' }}>Start from the basics or jump to any lesson. Master C step by step from Hello World to dynamic data structures.</p>
        <button className="c-btn-primary" onClick={() => setActiveTab('lessons')} style={{ width: '100%', justifyContent: 'center' }}>
          <Play size={15} /> Start Lesson 1
        </button>
      </div>

      <div className="c-community-card">
        <h4>👥 Community</h4>
        <p>C programmers powering the world's infrastructure</p>
        <div className="c-community-stats">
          <div className="c-comm-stat"><strong>30yr+</strong><span>Active</span></div>
          <div className="c-comm-stat"><strong>#2</strong><span>TIOBE Index</span></div>
          <div className="c-comm-stat"><strong>99%</strong><span>Embedded Use</span></div>
        </div>
        <button className="c-login-btn"><Users size={14} /> Join Community</button>
      </div>

      <div className="c-about-card">
        <h3><BarChart2 size={17} /> Progress Summary</h3>
        {[{ label: 'Lessons Completed', val: '0 / 24', pct: 0 }, { label: 'Programs Solved', val: '0 / 50+', pct: 0 }, { label: 'Quiz Progress', val: '0 / 30', pct: 0 }, { label: 'Projects Completed', val: '0 / 9', pct: 0 }].map((p, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
              <span>{p.label}</span><span>{p.val}</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${p.pct}%`, background: 'linear-gradient(90deg, var(--primary-purple), var(--accent-glow))', borderRadius: '100px' }} />
            </div>
          </div>
        ))}
        <button className="c-login-btn" style={{ marginTop: '8px' }}><Lock size={14} /> Login to Save Progress</button>
      </div>
    </div>
  </div>
);

/* ============================================================
   TAB: ROADMAP (WINDING ROAD JOURNEY)
   ============================================================ */
/* ============================================================
   TAB: ROADMAP (WINDING ROAD JOURNEY)
   ============================================================ */
// C ROADMAP JOURNEY TAB IMPLEMENTATION WITH FULL PROGRESS AND CHALLENGES INCLUDED BELOW

const RoadmapTab = ({ setActiveTab, setActiveLessonId, completed, toggleComplete }) => {
  const roadWrapperRef = useRef(null);
  const navigate = useNavigate();
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [activeChallenge, setActiveChallenge] = useState(null); // checkpoint challenge modal state
  const [challengeQuestionState, setChallengeQuestionState] = useState({ active: false, answered: false, correct: false, selectedOpt: null });
  const [bookmarkedMilestones, setBookmarkedMilestones] = useState(new Set());
  const [activeKeyboardIndex, setActiveKeyboardIndex] = useState(0);

  const [motivationIdx, setMotivationIdx] = useState(0);
  const motivations = [
    "Every expert programmer starts with strong fundamentals.",
    "You've completed one journey. Your next adventure begins now.",
    "Keep building. Keep learning."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMotivationIdx(prev => (prev + 1) % motivations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const ProgressRing = ({ percentage, color = '#8B5CF6', size = 52 }) => {
    const stroke = 4;
    const radius = 20;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <svg height={size} width={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          stroke="rgba(255, 255, 255, 0.05)"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.35s' }}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  const tracks = [
    { name: 'C Programming', progress: 100, color: '#10B981', status: 'completed' },
    { name: 'Python', progress: 45, color: '#A855F7', status: 'in-progress' },
    { name: 'Java', progress: 15, color: '#A855F7', status: 'in-progress' },
    { name: 'C++ Programming', progress: 0, color: '#6B7280', status: 'not-started' },
    { name: 'HTML & CSS', progress: 0, color: '#6B7280', status: 'locked' },
    { name: 'JavaScript', progress: 0, color: '#6B7280', status: 'locked' },
    { name: 'React.js', progress: 0, color: '#6B7280', status: 'locked' },
    { name: 'Node.js', progress: 0, color: '#6B7280', status: 'locked' },
    { name: 'SQL & Databases', progress: 0, color: '#6B7280', status: 'locked' },
    { name: 'Git & Github', progress: 0, color: '#6B7280', status: 'locked' },
    { name: 'Linux System', progress: 0, color: '#6B7280', status: 'locked' }
  ];

  const careerPaths = [
    {
      title: 'Path 1: Software Engineer (Systems)',
      steps: ['Foundations', 'C Programming', 'C++', 'Data Structures', 'Algorithms', 'Projects', 'Interviews', 'Software Engineer']
    },
    {
      title: 'Path 2: Web Developer (Full Stack)',
      steps: ['Web Dev', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Full Stack Developer']
    },
    {
      title: 'Path 3: AI / ML Engineer',
      steps: ['Python', 'NumPy', 'Pandas', 'Machine Learning', 'Artificial Intelligence']
    },
    {
      title: 'Path 4: Backend / Cloud Architect',
      steps: ['SQL', 'Database Design', 'Backend APIs', 'Cloud Deployment']
    }
  ];

  const achievementsList = [
    { title: 'First Lesson', desc: 'Write your first C statement.', emoji: '🏅', unlocked: completed.size >= 1 },
    { title: 'First Quiz', desc: 'Pass your first fundamentals quiz.', emoji: '🏅', unlocked: completed.has(1) },
    { title: 'Variables Master', desc: 'Understand datatypes specifications.', emoji: '🏅', unlocked: completed.has(4) },
    { title: 'Loop Expert', desc: 'Complete loop iterations loops.', emoji: '🏅', unlocked: completed.has(8) },
    { title: 'Pointer Explorer', desc: 'Dereference standard addresses variables.', emoji: '🏅', unlocked: completed.has(12) },
    { title: 'Memory Navigator', desc: 'Use malloc and calloc heap allocations.', emoji: '🏅', unlocked: completed.has(18) },
    { title: 'C Programming Master', desc: 'Complete all 24 C lessons.', emoji: '🏅', unlocked: completed.has(24) },
    { title: 'Interview Ready', desc: 'Unlock mock evaluation checks.', emoji: '🏅', unlocked: completed.has(24) }
  ];

  const renderNodeIcon = (node) => {
    const iconColor = '#c084fc';
    const iconSize = 22;

    if (node.type === 'start') {
      return <Rocket size={24} style={{ color: '#10B981', filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.5))' }} />;
    }
    if (node.type === 'checkpoint') {
      return <Compass size={22} style={{ color: '#ef4444', filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.5))' }} />;
    }

    switch (node.step) {
      case 1: return <BookOpen size={iconSize} style={{ color: iconColor }} />;
      case 2: return <Terminal size={iconSize} style={{ color: iconColor }} />;
      case 3: return <Code2 size={iconSize} style={{ color: iconColor }} />;
      case 4: return <Braces size={iconSize} style={{ color: iconColor }} />;
      case 5: return <Calculator size={iconSize} style={{ color: iconColor }} />;
      case 6: return <Monitor size={iconSize} style={{ color: iconColor }} />;
      case 7: return <GitFork size={iconSize} style={{ color: iconColor }} />;
      case 8: return <Repeat size={iconSize} style={{ color: iconColor }} />;
      case 9: return <Activity size={iconSize} style={{ color: iconColor }} />;
      case 10: return <Layers size={iconSize} style={{ color: iconColor }} />;
      case 11: return <Type size={iconSize} style={{ color: iconColor }} />;
      case 12: return <MousePointer size={iconSize} style={{ color: iconColor }} />;
      case 13: return <ChevronsRight size={iconSize} style={{ color: iconColor }} />;
      case 14: return <Box size={iconSize} style={{ color: iconColor }} />;
      case 15: return <Component size={iconSize} style={{ color: iconColor }} />;
      case 16: return <HardDrive size={iconSize} style={{ color: iconColor }} />;
      case 17: return <RefreshCw size={iconSize} style={{ color: iconColor }} />;
      case 18: return <Cpu size={iconSize} style={{ color: iconColor }} />;
      case 19: return <Sliders size={iconSize} style={{ color: iconColor }} />;
      case 20: return <FolderOpen size={iconSize} style={{ color: iconColor }} />;
      case 21: return <Hash size={iconSize} style={{ color: iconColor }} />;
      case 22: return <Search size={iconSize} style={{ color: iconColor }} />;
      case 23: return <TrendingUp size={iconSize} style={{ color: iconColor }} />;
      case 24: return <Link2 size={iconSize} style={{ color: iconColor }} />;
      case 25: return <Rocket size={iconSize} style={{ color: iconColor }} />;
      case 26: return <Trophy size={iconSize} style={{ color: iconColor }} />;
      default: return <BookOpen size={iconSize} style={{ color: iconColor }} />;
    }
  };

  const ROAD_NODES = [
    { id: 'start', type: 'start', title: 'Start of Journey', emoji: '🚩', desc: 'Welcome to your C Programming journey! Step on the path to master variables, functions, recursion, and low-level memory architectures.', duration: '15 hrs total', lessons: '24 lessons' },
    
    // Unit 1: C Fundamentals (Steps 1 to 6)
    { id: 1, step: 1, title: 'Introduction', diff: 'Easy', time: '20 min', emoji: '📘', type: 'lesson', desc: 'Basics of C programming.' },
    { id: 2, step: 2, title: 'Setup & Compiler', diff: 'Easy', time: '25 min', emoji: '💻', type: 'lesson', desc: 'Setup GCC.' },
    { id: 3, step: 3, title: 'Structure', diff: 'Easy', time: '25 min', emoji: '📘', type: 'lesson', desc: 'Main function.' },
    { id: 4, step: 4, title: 'Variables & Types', diff: 'Easy', time: '30 min', emoji: '🔤', type: 'lesson', desc: 'Types of variables.' },
    { id: 5, step: 5, title: 'Operators', diff: 'Easy', time: '30 min', emoji: '➕', type: 'lesson', desc: 'Operators.' },
    { id: 6, step: 6, title: 'Input & Output', diff: 'Easy', time: '25 min', emoji: '➕', type: 'lesson', desc: 'printf and scanf.' },
    
    // Checkpoint 1
    { id: 'cp1', type: 'checkpoint', title: 'C Fundamentals Challenge', emoji: '🏁', section: 'C Fundamentals', desc: 'Unlock this milestone challenge to test your fundamentals basics.', reqSteps: [1,2,3,4,5,6] },
    
    // Unit 2: Control Flow (Steps 7 to 8)
    { id: 7, step: 7, title: 'Conditionals', diff: 'Easy', time: '30 min', emoji: '🔀', type: 'lesson', desc: 'if-else & switch.' },
    { id: 8, step: 8, title: 'Loops', diff: 'Easy', time: '35 min', emoji: '🔁', type: 'lesson', desc: 'for, while.' },
    
    // Checkpoint 2
    { id: 'cp2', type: 'checkpoint', title: 'Control Flow Challenge', emoji: '🏁', section: 'Control Flow', desc: 'Test your loops and conditionals control logic.', reqSteps: [7,8] },
    
    // Unit 3: Functions & Arrays (Steps 9 to 11)
    { id: 9, step: 9, title: 'Functions', diff: 'Easy', time: '40 min', emoji: '⚙', type: 'lesson', desc: 'Functions.' },
    { id: 10, step: 10, title: 'Arrays', diff: 'Easy', time: '35 min', emoji: '📦', type: 'lesson', desc: 'Arrays.' },
    { id: 11, step: 11, title: 'Strings', diff: 'Easy', time: '35 min', emoji: '📝', type: 'lesson', desc: 'Strings.' },
    
    // Checkpoint 3
    { id: 'cp3', type: 'checkpoint', title: 'Functions & Arrays Challenge', emoji: '🏁', section: 'Functions & Arrays', desc: 'Test functional reuse and array manipulation.', reqSteps: [9,10,11] },
    
    // Unit 4: Pointers & Memory (Steps 12 to 18)
    { id: 12, step: 12, title: 'Pointers', diff: 'Medium', time: '50 min', emoji: '👉', type: 'lesson', desc: 'Pointers.' },
    { id: 13, step: 13, title: 'Double Pointers', diff: 'Medium', time: '35 min', emoji: '👉', type: 'lesson', desc: 'Double pointers.' },
    { id: 14, step: 14, title: 'Structures', diff: 'Medium', time: '40 min', emoji: '🏗', type: 'lesson', desc: 'Structures.' },
    { id: 15, step: 15, title: 'Unions & Enums', diff: 'Medium', time: '30 min', emoji: '🏗', type: 'lesson', desc: 'Unions & enums.' },
    { id: 16, step: 16, title: 'Storage Classes', diff: 'Medium', time: '30 min', emoji: '🏗', type: 'lesson', desc: 'Storage classes.' },
    { id: 17, step: 17, title: 'Recursion', diff: 'Medium', time: '45 min', emoji: '⚙', type: 'lesson', desc: 'Recursion.' },
    { id: 18, step: 18, title: 'Dynamic Memory', diff: 'Medium', time: '45 min', emoji: '💾', type: 'lesson', desc: 'malloc.' },
    
    // Checkpoint 4
    { id: 'cp4', type: 'checkpoint', title: 'Pointers & Memory Challenge', emoji: '🏁', section: 'Pointers & Memory', desc: 'Direct memory accesses, heap sizing, and structure challenges.', reqSteps: [12,13,14,15,16,17,18] },
    
    // Unit 5: File Handling & Low Level (Steps 19 to 20)
    { id: 19, step: 19, title: 'Preprocessors', diff: 'Medium', time: '30 min', emoji: '💻', type: 'lesson', desc: 'Preprocessors.' },
    { id: 20, step: 20, title: 'File Handling', diff: 'Medium', time: '40 min', emoji: '📂', type: 'lesson', desc: 'File operations.' },
    
    // Checkpoint 5
    { id: 'cp5', type: 'checkpoint', title: 'File Handling Challenge', emoji: '🏁', section: 'File Handling', desc: 'Verify preprocessors macros and disk IO files streaming.', reqSteps: [19,20] },
    
    // Unit 6: Advanced Topics & Projects (Steps 21 to 24)
    { id: 21, step: 21, title: 'Bitwise', diff: 'Hard', time: '40 min', emoji: '➕', type: 'lesson', desc: 'Bitwise ops.' },
    { id: 22, step: 22, title: 'Searching', diff: 'Hard', time: '40 min', emoji: '🌳', type: 'lesson', desc: 'Searching.' },
    { id: 23, step: 23, title: 'Sorting', diff: 'Hard', time: '55 min', emoji: '🌳', type: 'lesson', desc: 'Sorting.' },
    { id: 24, step: 24, title: 'Linked Lists', diff: 'Hard', time: '60 min', emoji: '🌳', type: 'lesson', desc: 'Linked Lists.' },
    
    // Checkpoint 6
    { id: 'cp6', type: 'checkpoint', title: 'Mini Projects Challenge', emoji: '🏁', section: 'Mini Projects', desc: 'Consolidate everything with linked list structures and full algorithms.', reqSteps: [21,22,23,24] },
    
    // Final steps
    { id: 25, step: 25, title: 'Mini Projects', diff: 'Hard', time: '15-20 hrs', emoji: '🚀', type: 'projects', desc: 'Mini projects.' },
    { id: 26, step: 26, title: 'Interview Prep', diff: 'Hard', time: '10 hrs', emoji: '🏆', type: 'interview', desc: 'Interview prep.' }
  ];

  const learningObjectives = {
    1: ['Understand the history and evolution of C', 'Write, compile, and run your first C program', 'Understand basic structure of main()'],
    2: ['Install GCC compiler on Windows/Mac/Linux', 'Configure Visual Studio Code for C development', 'Compile files manually in terminal'],
    3: ['Understand preprocessor directives like #include', 'Identify role of main() function', 'Analyze statements and semi-colons syntax'],
    4: ['Declare integer, character, float, and double types', 'Learn format specifiers like %d and %f', 'Practice type casting and conversion basics'],
    5: ['Use arithmetic operators (+, -, *, /, %)', 'Apply logical operators (&&, ||, !)', 'Understand precedence and associativity rules'],
    6: ['Master printf formatted console output', 'Read user inputs safely with scanf', 'Format output with escape sequences like \\n and \\t'],
    7: ['Write if-else conditional branches', 'Use switch-case for multi-value checks', 'Understand nested conditional logic structures'],
    8: ['Master counter loops with for', 'Apply entry-conditioned while loops', 'Use exit-conditioned do-while loops'],
    9: ['Understand function declaration and definition', 'Pass arguments by value to functions', 'Understand returning values from functions'],
    10: ['Declare and initialize single-dimensional arrays', 'Access elements via 0-based index pointer', 'Understand nested loops with multi-dimensional matrices'],
    11: ['Initialize char arrays representing text strings', 'Use string functions like strlen, strcpy, strcat', 'Avoid buffer overflow security vulnerabilities'],
    12: ['Understand pointer concepts and memory addresses', 'Dereference pointers using asterisk (*)', 'Understand null and void pointer classifications'],
    13: ['Declare double pointers (pointers pointing to pointers)', 'Understand multiple levels of memory indirection', 'Apply double pointer references inside subroutines'],
    14: ['Declare user-defined struct types', 'Access struct fields using dot (.) operator', 'Understand nested structures array declarations'],
    15: ['Declare space-sharing union fields', 'Create enums for readable constants mapping', 'Compare memory allocations of structs vs unions'],
    16: ['Understand local, global, auto, extern storage types', 'Learn static variable lifetime optimizations', 'Manage register allocation specifications'],
    17: ['Write recursive functions calling themselves', 'Define base case condition boundary checks', 'Compare stack memory usage of recursion vs loops'],
    18: ['Allocate runtime memory using malloc and calloc', 'Resize allocated heap space with realloc', 'Free memory blocks preventing memory leakage leaks'],
    19: ['Define macro replacements using #define directive', 'Execute conditional compiling using #ifdef', 'Understand compile stages preprocessor operations'],
    20: ['Open files in read, write, append file modes', 'Read files using fscanf and fgets', 'Flush buffer handles and close file pointers'],
    21: ['Operate on data bits using AND, OR, XOR, NOT', 'Perform shift operations (<< and >>)', 'Apply mask bits mapping state registries'],
    22: ['Code linear search traversals on arrays', 'Build binary search recursively on sorted files', 'Analyze search efficiency big-O bounds'],
    23: ['Code bubble sorting swaps loops', 'Write selections sorting scanning operations', 'Apply insertion sorting placements logic'],
    24: ['Define linked list Node structs with self references', 'Insert nodes at head and tail references', 'Traverse list nodes printing data fields'],
    25: ['Build interactive menu games in console', 'Implement project systems file integrations', 'Structure multi-module files compilation'],
    26: ['Practice core pointer questions commonly asked', 'Answer storage class scope viva checks', 'Prepare mock dry-run evaluations']
  };

  const topicsCovered = {
    1: ['Language History', 'WORA compilation model', 'Basic main signature'],
    2: ['GCC Tooling', 'VS Code Setup', 'Compile and Run Command'],
    3: ['Preprocessor directives', 'Code Blocks & Scopes', 'Statements & Semicolons'],
    4: ['Data Types bounds', 'Format Specifiers', 'Type Casting'],
    5: ['Arithmetic Operators', 'Relational & Logical Operators', 'Precedence rules'],
    6: ['printf format flags', 'scanf buffer reading', 'Escape sequences'],
    7: ['if-else chains', 'switch-case blocks', 'Ternary conditionals'],
    8: ['for loops', 'while vs do-while', 'break & continue statements'],
    9: ['Function signatures', 'Parameters vs Arguments', 'Return values'],
    10: ['1D Arrays', '2D Matrix storage', 'Boundary conditions'],
    11: ['char array null terminator', 'string.h operations', 'Safe buffers'],
    12: ['Memory Addresses (&)', 'Dereferencing (*)', 'Pointer Arithmetic'],
    13: ['Indirection syntax', 'Pointer array references', 'Address dereferences'],
    14: ['struct keyword', 'Member accesses', 'Array of structures'],
    15: ['union keyword', 'enum definitions', 'Size comparisons'],
    16: ['auto & register', 'static & extern', 'Stack variables'],
    17: ['Call Stack layout', 'Base cases definitions', 'Stack overflow alerts'],
    18: ['malloc & calloc', 'realloc expansions', 'free operations'],
    19: ['#define macros', '#include syntax', '#ifdef assertions'],
    20: ['fopen & fclose', 'fprintf & fscanf', 'fgets & fputs'],
    21: ['Bitwise operations', 'Shift boundaries', 'Bitmask checks'],
    22: ['Linear scanning', 'Binary search pivots', 'O(log N) scale'],
    23: ['Bubble Sort loops', 'Selection min values', 'Insertion indexing'],
    24: ['Node allocation', 'Pointer relink operations', 'Sequential search'],
    25: ['Game state loop', 'File persistence', 'Multi-file compilation'],
    26: ['Pointer dry runs', 'Memory leak questions', 'Scope evaluations']
  };

  const prerequisites = {
    1: 'None',
    2: 'Introduction',
    3: 'Setup & Compiler',
    4: 'Structure',
    5: 'Variables & Types',
    6: 'Operators',
    7: 'Input & Output',
    8: 'Conditionals',
    9: 'Loops',
    10: 'Functions',
    11: 'Arrays',
    12: 'Strings',
    13: 'Pointers',
    14: 'Double Pointers',
    15: 'Structures',
    16: 'Unions & Enums',
    17: 'Storage Classes',
    18: 'Recursion',
    19: 'Dynamic Memory',
    20: 'Preprocessors',
    21: 'File Handling',
    22: 'Bitwise',
    23: 'Searching',
    24: 'Sorting',
    25: 'Linked Lists',
    26: 'Mini Projects'
  };

  const practiceTimes = {
    1: '30 min',
    2: '45 min',
    3: '30 min',
    4: '1 hr',
    5: '1.5 hrs',
    6: '1 hr',
    7: '1.5 hrs',
    8: '2 hrs',
    9: '2 hrs',
    10: '2.5 hrs',
    11: '2 hrs',
    12: '4 hrs',
    13: '3 hrs',
    14: '3 hrs',
    15: '2 hrs',
    16: '1.5 hrs',
    17: '3 hrs',
    18: '4 hrs',
    19: '2 hrs',
    20: '3 hrs',
    21: '2.5 hrs',
    22: '3 hrs',
    23: '4 hrs',
    24: '6 hrs',
    25: '12 hrs',
    26: '8 hrs'
  };

  const challengeQuestions = {
    'cp1': { q: 'What is the output of the following statement: printf("%d", 5 + 3 * 2);', opts: ['16', '11', '21', 'Syntax Error'], correct: 1 },
    'cp2': { q: 'Which statement immediately exits a loop structure in C?', opts: ['continue', 'return', 'break', 'goto'], correct: 2 },
    'cp3': { q: 'If int arr[5] = {1, 2}; what is the value of arr[3]?', opts: ['Garbage Value', '0', '2', 'Index Error'], correct: 1 },
    'cp4': { q: 'Which operator is used to get the memory address of a variable in C?', opts: ['*', '&', '->', '.'], correct: 1 },
    'cp5': { q: 'What mode is passed to fopen to open a file for appending data?', opts: ['"r"', '"w"', '"a"', '"x"'], correct: 2 },
    'cp6': { q: 'What is the Big-O time complexity of searching in a sorted array using Binary Search?', opts: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'], correct: 2 }
  };

  const totalSteps = ROAD_NODES.length;
  const height = 4400;
  const stepY = height / (totalSteps + 1);

  const points = [];
  for (let i = 0; i <= totalSteps + 1; i++) {
    const y = i * stepY;
    const x = i === 0 || i === totalSteps + 1 ? 400 : 400 + Math.sin((i * Math.PI) / 2) * 160;
    points.push({ x, y });
  }

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpY1 = prev.y + stepY / 2;
    const cpY2 = curr.y - stepY / 2;
    pathD += ` C ${prev.x} ${cpY1}, ${curr.x} ${cpY2}, ${curr.x} ${curr.y}`;
  }

  useEffect(() => {
    if (roadWrapperRef.current) {
      const element = roadWrapperRef.current;
      const targetY = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMilestone(null);
        setActiveChallenge(null);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleKeyDown = (e) => {
    if (selectedMilestone || activeChallenge) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveKeyboardIndex(prev => Math.min(prev + 1, ROAD_NODES.length - 1));
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveKeyboardIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const node = ROAD_NODES[activeKeyboardIndex];
      handleNodeAction(node);
    }
  };

  const handleNodeAction = (node) => {
    if (node.type === 'start') {
      setSelectedMilestone(node);
      return;
    }

    const isUnlocked = node.type === 'checkpoint' 
      ? node.reqSteps.every(s => completed.has(s))
      : (node.id === 1 || completed.has(node.id - 1));

    if (!isUnlocked) return;

    if (node.type === 'checkpoint') {
      setActiveChallenge(node);
      setChallengeQuestionState({ active: false, answered: false, correct: false, selectedOpt: null });
    } else {
      setSelectedMilestone(node);
    }
  };

  // Motivational message logic
  const getMotivationMessage = () => {
    const totalDone = completed.size;
    if (totalDone === 0) return "🚀 Ready to write your first program? Select Step 1!";
    if (totalDone <= 6) return "✨ Great start! You are mastering the core structure of C.";
    if (totalDone <= 11) return "🔥 Fantastic work! Checkpoints are unlocking as you go.";
    if (totalDone <= 18) return "💪 Memory management expert! You are entering advanced scopes.";
    if (totalDone < 24) return "🏁 Almost there! Complete linked lists to unlock mini projects.";
    return "🏆 Absolute Legend! The C programming road is fully illuminated!";
  };

  const isRoadCompleted = completed.has(24);

  return (
    <div className="c-tab-content c-roadmap-container" ref={roadWrapperRef}>
      
      {/* Motivational Banner */}
      <div className="c-motivation-toast" style={{ position: 'sticky', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 99, background: 'rgba(139, 92, 246, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '10px 24px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 30px rgba(0,0,0,0.5)', maxWidth: '90%', margin: '0 auto 20px', width: 'fit-content' }}>
        <Zap size={14} style={{ color: '#A855F7' }} />
        <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#ffffff' }}>{getMotivationMessage()}</span>
      </div>

      {isRoadCompleted && (
        <motion.div 
          className="c-road-complete-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 10px 40px rgba(16, 185, 129, 0.1)' }}
        >
          <span style={{ fontSize: '2.5rem' }}>🎉</span>
          <h3 style={{ color: '#4ade80', fontSize: '1.4rem', fontWeight: '700', marginTop: '8px' }}>Roadmap Completed!</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', marginTop: '4px' }}>Congratulations! You have successfully completed the C Programming learning journey.</p>
        </motion.div>
      )}

      {/* Floating Badges Achievements */}
      <div className="c-achievements-sidebar" style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 90, display: 'flex', flexDirection: 'column', gap: '8px', pointerEvents: 'none' }}>
        {completed.size >= 1 && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'rgba(11, 11, 16, 0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            <span>🏅</span><span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#ffffff' }}>First Lesson Completed</span>
          </motion.div>
        )}
        {completed.has(4) && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'rgba(11, 11, 16, 0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            <span>🏅</span><span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#ffffff' }}>Variables Master</span>
          </motion.div>
        )}
        {completed.has(8) && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'rgba(11, 11, 16, 0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            <span>🏅</span><span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#ffffff' }}>Loop Expert</span>
          </motion.div>
        )}
        {completed.has(12) && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'rgba(11, 11, 16, 0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            <span>🏅</span><span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#ffffff' }}>Pointer Explorer</span>
          </motion.div>
        )}
      </div>

      <div className="c-roadmap-intro">
        {/* Ambient Lights & Grid */}
        <div className="c-ambient-grid" />
        <div className="c-ambient-glow" />
        <div className="c-ambient-circles">
          <div className="circle-1" />
          <div className="circle-2" />
        </div>
        
        {/* Content */}
        <div className="c-hero-badge-container">
          <span className="c-hero-badge">🚀 INTERACTIVE LEARNING ROADMAP</span>
        </div>
        <h1 className="c-hero-main-title">Master <span className="c-hero-gradient">C Programming</span></h1>
        <h2 className="c-hero-sub-title">From Beginner to System-Level Development</h2>
        <p className="c-hero-desc">Master C Programming through structured lessons, interactive coding practice, milestone challenges, real-world projects and interview preparation — all inside one premium learning experience.</p>

        {/* Info Grid */}
        <div className="c-hero-info-grid">
          <div className="c-info-chip">
            <span className="c-info-icon">⏱️</span>
            <div>
              <span className="c-info-lbl">Estimated Time</span>
              <span className="c-info-val">15 Hours</span>
            </div>
          </div>
          <div className="c-info-chip">
            <span className="c-info-icon">🎯</span>
            <div>
              <span className="c-info-lbl">Skill Level</span>
              <span className="c-info-val">Intermediate C Programmer</span>
            </div>
          </div>
          <div className="c-info-chip">
            <span className="c-info-icon">🏆</span>
            <div>
              <span className="c-info-lbl">Outcome Ready For</span>
              <span className="c-info-val">Data Structures, CP & Interviews</span>
            </div>
          </div>
        </div>

        {/* Journey Stats */}
        <div className="c-hero-stats-chips">
          <div className="c-stat-chip">📘 45 Lessons</div>
          <div className="c-stat-chip">💻 120+ Programs</div>
          <div className="c-stat-chip">🧩 6 Milestones</div>
          <div className="c-stat-chip">📝 30+ Quizzes</div>
          <div className="c-stat-chip">🚀 Mini Projects</div>
          <div className="c-stat-chip">🎯 Interview Ready</div>
        </div>

        {/* Current Journey Card */}
        <div className="c-hero-journey-card">
          <div className="c-jc-left">
            <span className="c-jc-badge">📍 YOU ARE HERE</span>
            <span className="c-jc-step">Step 1 of 45</span>
            <h4 className="c-jc-title">Introduction to C</h4>
          </div>
          <div className="c-jc-right">
            <div className="c-jc-meta-item">
              <span className="c-jc-meta-lbl">Difficulty</span>
              <span className="c-jc-meta-val">Beginner</span>
            </div>
            <div className="c-jc-meta-item">
              <span className="c-jc-meta-lbl">Estimated</span>
              <span className="c-jc-meta-val">15 Hours</span>
            </div>
            <div className="c-jc-meta-item">
              <span className="c-jc-meta-lbl">Status</span>
              <span className="c-jc-meta-val text-ready">Ready to Start</span>
            </div>
            <button className="c-jc-btn" onClick={() => { setActiveLessonId(1); setActiveTab('lessons'); }}>
              Continue Journey →
            </button>
          </div>
        </div>
      </div>

      <div className="c-road-journey-wrapper" style={{ height: `${height}px` }}>
        {/* The Winding Road SVG */}
        <svg className="c-road-svg" viewBox={`0 0 800 ${height}`} preserveAspectRatio="none">
          <path d={pathD} className="c-road-neon-outer" style={{ stroke: isRoadCompleted ? 'rgba(16, 185, 129, 0.28)' : 'rgba(139, 92, 246, 0.28)' }} />
          <path d={pathD} className="c-road-neon-edge" style={{ stroke: isRoadCompleted ? '#10B981' : '#8B5CF6' }} />
          <path d={pathD} className="c-road-asphalt" />
          <path d={pathD} className="c-road-dashes" />
        </svg>

        {/* Milestone platforms and cards along the road */}
        {ROAD_NODES.map((node, index) => {
          const pt = points[index + 1];
          const isLeft = pt.x < 400;

          // Locks are completely removed; all nodes are fully unlocked and accessible
          const isCompleted = node.type === 'lesson' && completed.has(node.step);
          const isUnlocked = true;

          const isActive = (selectedMilestone && selectedMilestone.id === node.id) || 
                           (activeChallenge && activeChallenge.id === node.id) ||
                           (!selectedMilestone && !activeChallenge && activeKeyboardIndex === index);

          // Render Special Checkpoint Platform
          if (node.type === 'checkpoint') {
            return (
              <div
                key={node.id}
                className={`c-roadmap-milestone-node checkpoint-node ${isActive ? 'node-active' : ''}`}
                style={{
                  position: 'absolute',
                  top: `${pt.y}px`,
                  left: `${pt.x}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                tabIndex={0}
                onKeyDown={handleKeyDown}
              >
                <div className="c-milestone-platform-wrapper" onClick={() => handleNodeAction(node)}>
                  <div className="c-milestone-platform" style={{ width: '66px', height: '66px', borderStyle: 'dashed' }}>
                    <div className="c-platform-ring-glow" style={{ borderColor: 'var(--primary-purple)' }} />
                    <div className="c-3d-emoji-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderNodeIcon(node)}
                    </div>
                  </div>
                </div>

                <div 
                  className={`c-roadmap-card-floating ${isLeft ? 'card-left' : 'card-right'}`}
                  onClick={() => handleNodeAction(node)}
                  style={{ cursor: 'pointer', borderColor: 'rgba(139, 92, 246, 0.4)' }}
                >
                  <div className="c-roadmap-card-header" style={{ padding: '4px 2px', margin: 0 }}>
                    <div style={{ flex: 1 }}>
                      <div className="c-roadmap-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span className="c-lesson-num" style={{ fontSize: '0.62rem', color: 'var(--primary-purple)', fontWeight: '700' }}>CHALLENGE</span>
                        <span className="c-time-badge" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', marginLeft: 'auto' }}>Challenge Active</span>
                      </div>
                      <div className="c-roadmap-title" style={{ fontSize: '0.8rem', fontWeight: '700' }}>{node.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Render Start of Journey Card
          if (node.type === 'start') {
            return (
              <div
                key={node.id}
                className={`c-roadmap-milestone-node start-node ${isActive ? 'node-active' : ''}`}
                style={{
                  position: 'absolute',
                  top: `${pt.y}px`,
                  left: `${pt.x}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                tabIndex={0}
                onKeyDown={handleKeyDown}
              >
                <div className="c-milestone-platform-wrapper" onClick={() => handleNodeAction(node)}>
                  <div className="c-milestone-platform" style={{ width: '70px', height: '70px', borderColor: '#10B981' }}>
                    <div className="c-platform-ring-glow" style={{ borderColor: '#10B981' }} />
                    <div className="c-3d-emoji-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderNodeIcon(node)}
                    </div>
                  </div>
                </div>

                <div 
                  className={`c-roadmap-card-floating ${isLeft ? 'card-left' : 'card-right'}`}
                  onClick={() => handleNodeAction(node)}
                  style={{ cursor: 'pointer', borderColor: 'rgba(16, 185, 129, 0.4)', width: '220px' }}
                >
                  <div className="c-roadmap-card-header" style={{ padding: '4px 2px', margin: 0 }}>
                    <div style={{ flex: 1 }}>
                      <div className="c-roadmap-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span className="c-lesson-num" style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: '800', letterSpacing: '0.05em' }}>START YOUR JOURNEY</span>
                      </div>
                      <div className="c-roadmap-title" style={{ fontSize: '0.82rem', fontWeight: '700', color: '#ffffff' }}>Begin your C Programming adventure.</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Normal Lesson Milestone
          return (
            <div
              key={node.id}
              className={`c-roadmap-milestone-node ${isLeft ? 'node-left' : 'node-right'} ${isActive ? 'node-active' : ''}`}
              style={{
                position: 'absolute',
                top: `${pt.y}px`,
                left: `${pt.x}px`,
                transform: 'translate(-50%, -50%)',
              }}
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              {/* Winding road milestone platform */}
              <div className="c-milestone-platform-wrapper" onClick={() => handleNodeAction(node)}>
                <div className="c-milestone-platform">
                  <div className="c-platform-ring-glow" />
                  <div className="c-3d-emoji-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {renderNodeIcon(node)}
                  </div>
                  
                  {/* Hexagon Logo Overlay */}
                  <div className="c-platform-hexagon-overlay">
                    <svg viewBox="0 0 38 42" style={{ width: '100%', height: '100%' }}>
                      <path fill="#8B5CF6" d="m 17.903,0.286 c 0.679,-0.381 1.515,-0.381 2.193,0 l 16.807,9.434 c 0.679,0.38 1.097,1.084 1.097,1.846 v 18.867 c 0,0.762 -0.418,1.466 -1.097,1.847 l -16.807,9.434 c -0.679,0.381 -1.515,0.381 -2.193,0 l -16.807,-9.434 c -0.678,-0.381 -1.096,-1.084 -1.096,-1.846 v -18.867 c 0,-0.762 0.418,-1.466 1.096,-1.847 z" />
                      <text x="19" y="27" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">C</text>
                    </svg>
                  </div>
                </div>
                <div className="c-milestone-index">{String(node.step).padStart(2, '0')}</div>
              </div>

              {/* Minimal Glass Card */}
              <div 
                className={`c-roadmap-card-floating ${isLeft ? 'card-left' : 'card-right'} ${isCompleted ? 'c-card-completed' : ''}`}
                onClick={() => handleNodeAction(node)}
                style={{ cursor: 'pointer' }}
              >
                <div className="c-roadmap-card-header" style={{ padding: '4px 2px', margin: 0 }}>
                  <div style={{ flex: 1 }}>
                    <div className="c-roadmap-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span className="c-lesson-num" style={{ fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-purple)', letterSpacing: '0.05em' }}>STEP {String(node.step).padStart(2, '0')}</span>
                      <span className={`c-diff-tag diff-${node.diff.toLowerCase()}`} style={{ fontSize: '0.6rem', padding: '1px 5px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: '700' }}>{node.diff}</span>
                      <span className="c-time-badge" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: '500' }}><Clock size={10} /> {node.time}</span>
                    </div>
                    <div className="c-roadmap-title" style={{ fontSize: '0.82rem', fontWeight: '600', color: '#ffffff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.title}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Detail Panel / Side Sheet */}
      <AnimatePresence>
        {selectedMilestone && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="c-roadmap-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMilestone(null)}
            />
            
            {/* Side Panel */}
            <motion.div 
              className="c-roadmap-detail-panel"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {selectedMilestone.type === 'start' ? (
                // Start Node Layout
                <>
                  <div className="c-panel-header">
                    <div>
                      <span className="c-panel-step">WELCOME</span>
                      <h2>🚩 Start Your C Journey</h2>
                    </div>
                    <button className="c-panel-close-btn" onClick={() => setSelectedMilestone(null)} title="Close">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="c-panel-badges">
                    <span className="c-panel-meta-item">⏱️ Duration: 15 hrs</span>
                    <span className="c-panel-meta-item">🟢 Beginner Friendly</span>
                  </div>
                  <div className="c-panel-body-scroll">
                    <div className="c-panel-section">
                      <h4>📝 Overview</h4>
                      <p>{selectedMilestone.desc}</p>
                    </div>
                    <div className="c-panel-section" style={{ textAlign: 'center', padding: '20px', background: 'rgba(139,92,246,0.06)', borderRadius: '12px', border: '1px dashed rgba(168,85,247,0.3)' }}>
                      <span style={{ fontSize: '1.8rem' }}>🚀</span>
                      <p style={{ fontStyle: 'italic', color: '#a855f7', marginTop: '6px' }}>"Every expert programmer started here."</p>
                    </div>
                  </div>
                  <div className="c-panel-footer">
                    <button className="c-btn-primary" onClick={() => {
                      setSelectedMilestone(null);
                      // focus on first step
                      setActiveKeyboardIndex(1);
                    }}>
                      Get Started <ArrowRight size={14} />
                    </button>
                  </div>
                </>
              ) : (
                // Normal Lesson Detail Panel Layout
                <>
                  {/* Header */}
                  <div className="c-panel-header">
                    <div>
                      <span className="c-panel-step">STEP {String(selectedMilestone.step).padStart(2, '0')}</span>
                      <h2>{selectedMilestone.title}</h2>
                    </div>
                    <button className="c-panel-close-btn" onClick={() => setSelectedMilestone(null)} title="Close">
                      <X size={18} />
                    </button>
                  </div>

                  {/* Badges bar */}
                  <div className="c-panel-badges">
                    <span className={`c-diff-tag diff-${selectedMilestone.diff.toLowerCase()}`} style={{ padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: '700' }}>{selectedMilestone.diff}</span>
                    <span className="c-panel-meta-item"><Clock size={12} /> {selectedMilestone.time}</span>
                    <span className="c-panel-meta-item">⏱️ Practice: {practiceTimes[selectedMilestone.step]}</span>
                  </div>

                  {/* Main Content Body */}
                  <div className="c-panel-body-scroll">
                    <div className="c-panel-section">
                      <h4>📝 Overview</h4>
                      <p>{selectedMilestone.desc}</p>
                    </div>

                    <div className="c-panel-section">
                      <h4>🔑 Learning Objectives</h4>
                      <ul>
                        {learningObjectives[selectedMilestone.step]?.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="c-panel-section">
                      <h4>📚 Topics Covered</h4>
                      <div className="c-panel-topics-list">
                        {topicsCovered[selectedMilestone.step]?.map((topic, i) => (
                          <span key={i} className="c-panel-topic-tag">{topic}</span>
                        ))}
                      </div>
                    </div>

                    <div className="c-panel-section">
                      <h4>💡 Prerequisites</h4>
                      <p className="c-prereq-text">{prerequisites[selectedMilestone.step]}</p>
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="c-panel-footer">
                    <button className="c-btn-primary" onClick={() => {
                      if (selectedMilestone.type === 'lesson') {
                        setActiveLessonId(selectedMilestone.step);
                        setActiveTab('lessons');
                      } else if (selectedMilestone.type === 'projects') {
                        setActiveTab('projects');
                      } else if (selectedMilestone.type === 'interview') {
                        setActiveTab('interview');
                      }
                      setSelectedMilestone(null);
                    }}>
                      <Play size={14} /> Start Lesson
                    </button>
                    
                    <button 
                      className={`c-btn-secondary ${bookmarkedMilestones.has(selectedMilestone.step) ? 'bookmarked' : ''}`}
                      onClick={() => {
                        setBookmarkedMilestones(prev => {
                          const s = new Set(prev);
                          s.has(selectedMilestone.step) ? s.delete(selectedMilestone.step) : s.add(selectedMilestone.step);
                          return s;
                        });
                      }}
                    >
                      <Bookmark size={14} fill={bookmarkedMilestones.has(selectedMilestone.step) ? '#8B5CF6' : 'none'} />
                      {bookmarkedMilestones.has(selectedMilestone.step) ? 'Bookmarked' : 'Bookmark'}
                    </button>

                    <button 
                      className={`c-btn-secondary ${completed.has(selectedMilestone.step) ? 'completed' : ''}`}
                      onClick={() => toggleComplete(selectedMilestone.step)}
                    >
                      <Check size={14} />
                      {completed.has(selectedMilestone.step) ? 'Completed' : 'Mark Done'}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Checkpoint Milestone Challenge Modal Window */}
      <AnimatePresence>
        {activeChallenge && (
          <>
            <motion.div 
              className="c-roadmap-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveChallenge(null)}
              style={{ zIndex: 1100 }}
            />
            
            <motion.div 
              className="c-challenge-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '460px', maxWidth: '90%', background: 'rgba(11,11,18,0.92)', backdropFilter: 'blur(20px)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '16px', zIndex: 1200, padding: '24px', boxShadow: '0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(239, 68, 68, 0.15)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', color: '#ef4444', tracking: '0.05em' }}>🚩 SECTION CHECKPOINT</span>
                <button className="c-panel-close-btn" onClick={() => setActiveChallenge(null)} style={{ border: 'none', background: 'none' }}><X size={16} /></button>
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>{activeChallenge.title}</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.84rem', lineHeight: '1.5', marginBottom: '18px' }}>{activeChallenge.desc}</p>

              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                  <span>Section:</span><strong>{activeChallenge.section}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                  <span>Difficulty:</span><span style={{ color: '#facc15', fontWeight: '600' }}>Medium Challenge</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
                  <span>Time limit:</span><strong>10 mins</strong>
                </div>
              </div>

              {!challengeQuestionState.active ? (
                // Challenge Intro Window
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="c-btn-primary" onClick={() => setChallengeQuestionState({ active: true, answered: false, correct: false, selectedOpt: null })} style={{ flex: 1, padding: '11px', background: '#ef4444', border: '1px solid #ef4444', borderRadius: '8px', color: '#ffffff', fontSize: '0.84rem', fontWeight: '600', cursor: 'pointer' }}>
                    Start Challenge
                  </button>
                  <button className="c-btn-secondary" onClick={() => setActiveChallenge(null)} style={{ flex: 1, padding: '11px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: 'rgba(255,255,255,0.8)', fontSize: '0.84rem', fontWeight: '600', cursor: 'pointer' }}>
                    Continue Later
                  </button>
                </div>
              ) : (
                // Challenge Interactive Qs View
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: '600', marginBottom: '10px', lineHeight: '1.5' }}>
                    {challengeQuestions[activeChallenge.id]?.q}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {challengeQuestions[activeChallenge.id]?.opts.map((opt, oIdx) => {
                      let bg = 'rgba(255,255,255,0.03)';
                      let border = '1px solid rgba(255,255,255,0.06)';
                      if (challengeQuestionState.answered) {
                        if (oIdx === challengeQuestions[activeChallenge.id].correct) {
                          bg = 'rgba(16, 185, 129, 0.15)';
                          border = '1px solid #10b981';
                        } else if (oIdx === challengeQuestionState.selectedOpt) {
                          bg = 'rgba(239, 68, 68, 0.15)';
                          border = '1px solid #ef4444';
                        }
                      } else if (oIdx === challengeQuestionState.selectedOpt) {
                        border = '1px solid #ef4444';
                        bg = 'rgba(239, 68, 68, 0.05)';
                      }

                      return (
                        <button 
                          key={oIdx} 
                          onClick={() => !challengeQuestionState.answered && setChallengeQuestionState(prev => ({ ...prev, selectedOpt: oIdx }))}
                          style={{ padding: '10px 14px', borderRadius: '8px', background: bg, border, color: '#ffffff', textAlign: 'left', fontSize: '0.82rem', cursor: challengeQuestionState.answered ? 'default' : 'pointer', transition: 'all 0.2s' }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {challengeQuestionState.answered && (
                    <div style={{ fontSize: '0.82rem', color: challengeQuestionState.correct ? '#4ade80' : '#f87171', marginBottom: '20px', fontWeight: '600' }}>
                      {challengeQuestionState.correct ? '🎉 Correct! Challenge completed successfully. Section unlocked!' : '❌ Incorrect choice. Close and try again!'}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {!challengeQuestionState.answered ? (
                      <button 
                        onClick={() => {
                          const isCorrect = challengeQuestionState.selectedOpt === challengeQuestions[activeChallenge.id].correct;
                          setChallengeQuestionState(prev => ({ ...prev, answered: true, correct: isCorrect }));
                        }}
                        disabled={challengeQuestionState.selectedOpt === null}
                        style={{ flex: 1, padding: '10px', background: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', cursor: challengeQuestionState.selectedOpt === null ? 'not-allowed' : 'pointer', opacity: challengeQuestionState.selectedOpt === null ? 0.5 : 1 }}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button 
                        onClick={() => setActiveChallenge(null)}
                        style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#ffffff', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Close Challenge
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Graduation & Continue Learning Section */}
      <div className="c-graduation-section">
        {/* Destination Platform */}
        <div className="c-grad-platform">
          <div className="c-grad-glow-ring" />
          <div className="c-grad-header">
            <span className="c-grad-trophy" style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🏆</span>
            <h2>C Programming Mastery</h2>
            <p className="c-grad-subtitle">Congratulations! You have successfully completed the C Programming Learning Journey.</p>
          </div>

          <div className="c-grad-checklists">
            <div className="c-checklist-item">
              <Check size={16} className="c-check-icon" style={{ color: '#10B981' }} />
              <span>All 24 Lessons Completed</span>
            </div>
            <div className="c-checklist-item">
              <Check size={16} className="c-check-icon" style={{ color: '#10B981' }} />
              <span>All Learning Challenges Completed</span>
            </div>
            <div className="c-checklist-item">
              <Check size={16} className="c-check-icon" style={{ color: '#10B981' }} />
              <span>Ready for Real Projects</span>
            </div>
            <div className="c-checklist-item">
              <Check size={16} className="c-check-icon" style={{ color: '#10B981' }} />
              <span>Ready for Technical Interviews</span>
            </div>
            <div className="c-checklist-item">
              <Check size={16} className="c-check-icon" style={{ color: '#10B981' }} />
              <span>Strong Programming Foundation Achieved</span>
            </div>
          </div>
        </div>

        {/* Course Summary */}
        <div className="c-grad-summary">
          <h3>Journey Summary</h3>
          <div className="c-summary-grid">
            <div className="c-summary-card">
              <span className="c-summary-val">24 / 24</span>
              <span className="c-summary-lbl">Lessons Completed</span>
            </div>
            <div className="c-summary-card">
              <span className="c-summary-val">6 / 6</span>
              <span className="c-summary-lbl">Challenges Completed</span>
            </div>
            <div className="c-summary-card">
              <span className="c-summary-val">45 hrs</span>
              <span className="c-summary-lbl">Est. Learning Hours</span>
            </div>
            <div className="c-summary-card">
              <span className="c-summary-val">12+</span>
              <span className="c-summary-lbl">Skills Learned</span>
            </div>
          </div>
        </div>

        {/* Future Path Preview */}
        <div className="c-path-preview-section">
          <h3>Future Learning Path</h3>
          <div className="c-path-flow">
            <div className="c-flow-node active">C Programming</div>
            <span className="c-flow-arrow">↓</span>
            <div className="c-flow-node">C++ (OOP)</div>
            <span className="c-flow-arrow">↓</span>
            <div className="c-flow-node">Data Structures</div>
            <span className="c-flow-arrow">↓</span>
            <div className="c-flow-node">Algorithms</div>
            <span className="c-flow-arrow">↓</span>
            <div className="c-flow-node">Projects</div>
            <span className="c-flow-arrow">↓</span>
            <div className="c-flow-node">Technical Interviews</div>
          </div>
        </div>

        {/* Continue Learning Header */}
        <div className="c-continue-header">
          <h3>Continue Your Learning Journey</h3>
          <p className="c-motivation-msg">
            "{motivations[motivationIdx]}"
          </p>
        </div>

        {/* Recommended & Next Course Cards */}
        <div className="c-recommendation-grid">
          {/* C++ Recommended Card */}
          <div className="c-course-card recommended-highlight">
            <div className="c-recommended-badge">RECOMMENDED</div>
            <div className="c-card-logo-row">
              <span style={{ fontSize: '1.5rem' }}>⭐</span>
              <div>
                <h4>Continue with C++</h4>
                <span className="c-card-diff-badge diff-medium">MEDIUM</span>
              </div>
            </div>
            <p className="c-card-tagline">Learn Object-Oriented Programming using your C programming foundation.</p>
            <div className="c-card-meta">
              <span>⏱️ 20 hours</span>
            </div>
            <button className="c-card-start-btn" onClick={() => navigate('/technologies/cpp')}>
              Start Learning →
            </button>
          </div>

          {/* Data Structures */}
          <div className="c-course-card">
            <div className="c-card-logo-row">
              <span style={{ fontSize: '1.5rem' }}>📊</span>
              <div>
                <h4>Data Structures</h4>
                <span className="c-card-diff-badge diff-hard">HARD</span>
              </div>
            </div>
            <p className="c-card-tagline">Master efficient problem solving and build memory-efficient structures.</p>
            <div className="c-card-meta">
              <span>⏱️ 30 hours</span>
            </div>
            <button className="c-card-start-btn" onClick={() => navigate('/curriculum/semester-2/data-structures/quiz')}>
              Explore Structures →
            </button>
          </div>

          {/* Python */}
          <div className="c-course-card">
            <div className="c-card-logo-row">
              <span style={{ fontSize: '1.5rem' }}>🐍</span>
              <div>
                <h4>Python Language</h4>
                <span className="c-card-diff-badge diff-easy">EASY</span>
              </div>
            </div>
            <p className="c-card-tagline">Leverage your base to master scripting, automation, AI development, and data science.</p>
            <div className="c-card-meta">
              <span>⏱️ 15 hours</span>
            </div>
            <button className="c-card-start-btn" onClick={() => navigate('/technologies/python')}>
              Start Learning →
            </button>
          </div>

          {/* Java */}
          <div className="c-course-card">
            <div className="c-card-logo-row">
              <span style={{ fontSize: '1.5rem' }}>☕</span>
              <div>
                <h4>Java Platform</h4>
                <span className="c-card-diff-badge diff-medium">MEDIUM</span>
              </div>
            </div>
            <p className="c-card-tagline">Build platform-independent enterprise backend applications and Android mobile apps.</p>
            <div className="c-card-meta">
              <span>⏱️ 25 hours</span>
            </div>
            <button className="c-card-start-btn" onClick={() => navigate('/technologies/java')}>
              Start Learning →
            </button>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="c-graduation-actions">
          <button className="c-btn-primary" onClick={() => navigate('/technologies/cpp')}>
            Start C++
          </button>
          <button className="c-btn-secondary" onClick={() => navigate('/')}>
            Return to Homepage
          </button>
        </div>
      </div>

      {/* Learning Dashboard */}
      <div className="c-dashboard-container">
        <div className="c-dashboard-header">
          <h3>👋 Welcome Back</h3>
          <p>Here is your current learning state and next recommended actions.</p>
        </div>

        <div className="c-dashboard-grid">
          {/* Quick Resume Card */}
          <div className="c-dash-card c-resume-card">
            <h4>Continue Learning</h4>
            <div className="c-resume-details">
              <span className="c-resume-title">Current Course: <strong>C Programming</strong></span>
              <span className="c-resume-lesson" style={{ display: 'block', margin: '4px 0 10px' }}>Current Lesson: <strong>Pointers</strong></span>
              <div className="c-progress-bar-row" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="c-progress-bar-bg" style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div className="c-progress-bar-fill" style={{ width: '68%', height: '100%', background: 'var(--primary-purple)', borderRadius: '10px' }}></div>
                </div>
                <span className="c-progress-pct" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'rgba(255,255,255,0.8)' }}>68%</span>
              </div>
            </div>
            <button className="c-dash-btn" onClick={() => { setActiveLessonId(12); setActiveTab('lessons'); }} style={{ marginTop: '16px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '8px 14px', borderRadius: '8px', color: '#ffffff', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
              Resume Learning →
            </button>
          </div>

          {/* Overall Progress Stats */}
          <div className="c-dash-card c-stats-card">
            <h4>Course Progress Stats</h4>
            <div className="c-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '12px' }}>
              <div className="c-stat-box" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="c-stat-val" style={{ fontSize: '1.1rem', fontWeight: '800', color: '#A855F7' }}>{completed.size} / 24</span>
                <span className="c-stat-lbl" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>Lessons Completed</span>
              </div>
              <div className="c-stat-box" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="c-stat-val" style={{ fontSize: '1.1rem', fontWeight: '800', color: '#A855F7' }}>3 / 6</span>
                <span className="c-stat-lbl" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>Challenges Completed</span>
              </div>
              <div className="c-stat-box" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="c-stat-val" style={{ fontSize: '1.1rem', fontWeight: '800', color: '#A855F7' }}>4 / 5</span>
                <span className="c-stat-lbl" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>Weekly Goal</span>
              </div>
              <div className="c-stat-box" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="c-stat-val" style={{ fontSize: '1.1rem', fontWeight: '800', color: '#A855F7' }}>4 Days</span>
                <span className="c-stat-lbl" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>Current Streak 🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Progress Tracking */}
      <div className="c-tech-tracking-section">
        <h3>Tech Stack Progress</h3>
        <p className="c-tracking-sub">Track all technologies in your learning profile curriculum.</p>
        <div className="c-tech-progress-grid">
          {tracks.map((track, tIdx) => (
            <div key={tIdx} className={`c-tech-track-card track-${track.status}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h5>{track.name}</h5>
                  <span className="c-track-status-lbl">{track.status.toUpperCase().replace('-', ' ')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <ProgressRing percentage={track.progress} color={track.color} />
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', position: 'absolute', width: '52px', textAlign: 'center', left: 0, color: '#ffffff' }}>
                    {track.progress}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Learn C++ Next? Details Card */}
      <div className="c-why-next-section">
        <div className="c-why-next-card">
          <h3>Why Learn C++ Next?</h3>
          <p className="c-why-subtitle">Learn Object-Oriented Programming (OOP) using your C programming foundation.</p>
          <div className="c-why-details-grid">
            <div className="c-why-point">
              <Check size={16} style={{ color: '#A855F7', flexShrink: 0 }} />
              <span><strong>Syntax Overlap:</strong> C++ is a direct superset of C. You already know 85% of C++ basic syntax!</span>
            </div>
            <div className="c-why-point">
              <Check size={16} style={{ color: '#A855F7', flexShrink: 0 }} />
              <span><strong>OOP Paradigms:</strong> Master classes, inheritance, polymorphism, and encapsulation.</span>
            </div>
            <div className="c-why-point">
              <Check size={16} style={{ color: '#A855F7', flexShrink: 0 }} />
              <span><strong>Data Structures:</strong> Preparing you for building real algorithms with C++ templates STL.</span>
            </div>
            <div className="c-why-point">
              <Check size={16} style={{ color: '#A855F7', flexShrink: 0 }} />
              <span><strong>Memory Access:</strong> Combines direct memory pointer controls with high-level code structures.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Career Path Map visual timelines */}
      <div className="c-career-path-section">
        <h3>Career Learning Pathways</h3>
        <p className="c-career-subtitle">Select your target tech stack role and follow the visual curriculum roadmap flow.</p>
        <div className="c-career-paths-container">
          {careerPaths.map((path, pIdx) => (
            <div key={pIdx} className="c-career-path-row">
              <h5>{path.title}</h5>
              <div className="c-career-nodes">
                {path.steps.map((step, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <div className={`c-career-node-badge ${step === 'C Programming' ? 'node-c-active' : ''}`}>{step}</div>
                    {sIdx < path.steps.length - 1 && <span className="c-career-arrow-flow">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Achievements Grid */}
      <div className="c-achievements-dashboard-section">
        <h3>Learning Achievements</h3>
        <p className="c-achievements-subtitle">Verify milestone trophies unlocked during code lessons and quizzes.</p>
        <div className="c-achievements-dash-grid">
          {achievementsList.map((ach, aIdx) => (
            <div key={aIdx} className={`c-ach-dash-card ${ach.unlocked ? 'unlocked' : 'locked'}`}>
              <span className="c-ach-emoji" style={{ fontSize: '1.2rem', display: 'block', marginBottom: '6px' }}>{ach.unlocked ? ach.emoji : '🔒'}</span>
              <div>
                <h6>{ach.title}</h6>
                <p>{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: LESSONS
   ============================================================ */
const LessonsTab = ({ activeLessonId, setActiveLessonId, completed, toggleComplete }) => {
  const activeLesson = C_LESSONS.find(l => l.id === activeLessonId) || C_LESSONS[0];
  const [bookmarked, setBookmarked] = useState(new Set());
  const contentRef = useRef(null);

  const toggleBookmark = (id) => setBookmarked(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const goTo = (lesson) => { setActiveLessonId(lesson.id); if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: 'smooth' }); };

  const idx = C_LESSONS.findIndex(l => l.id === activeLesson.id);
  const prev = idx > 0 ? C_LESSONS[idx - 1] : null;
  const next = idx < C_LESSONS.length - 1 ? C_LESSONS[idx + 1] : null;

  return (
    <div className="c-tab-content c-lessons-layout">
      <aside className="c-lessons-sidebar">
        <h4>All Lessons</h4>
        {C_LESSONS.map((lesson) => (
          <div key={lesson.id} className={`c-lesson-nav-item ${lesson.id === activeLesson.id ? 'active' : ''}`} onClick={() => goTo(lesson)}>
            <div className="c-lesson-nav-num">{lesson.id}</div>
            <span className="c-lesson-nav-title">{lesson.title}</span>
            {completed.has(lesson.id) && <Check size={12} style={{ color: '#4ade80', marginLeft: 'auto', flexShrink: 0 }} />}
          </div>
        ))}
      </aside>

      <div className="c-lesson-content" ref={contentRef}>
        <AnimatePresence mode="wait">
          <motion.div key={activeLesson.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
            <div className="c-lesson-card">
              <div className="c-lesson-header">
                <div className="c-lesson-title-group">
                  <div className="c-lesson-num-label">Lesson {activeLesson.id} · <span className={`c-diff-tag diff-${activeLesson.diff}`}>{activeLesson.diff}</span></div>
                  <h1 className="c-lesson-title">{activeLesson.title}</h1>
                </div>
                <div className="c-lesson-actions">
                  <button className={`c-action-btn ${bookmarked.has(activeLesson.id) ? 'active' : ''}`} onClick={() => toggleBookmark(activeLesson.id)}>
                    <Bookmark size={14} />{bookmarked.has(activeLesson.id) ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  <button className={`c-action-btn ${completed.has(activeLesson.id) ? 'complete' : ''}`} onClick={() => toggleComplete(activeLesson.id)}>
                    <CheckCircle size={14} />{completed.has(activeLesson.id) ? 'Completed ✓' : 'Mark Done'}
                  </button>
                </div>
              </div>

              <div className="c-subsection-title"><BookOpen size={14} /> Theory</div>
              <div className="c-theory-text">{activeLesson.theory.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}</div>

              <div className="c-subsection-title" style={{ marginTop: '20px' }}><Code2 size={14} /> Code Example</div>
              <CCodeBlock code={activeLesson.code} />

              <div className="c-subsection-title"><Terminal size={14} /> Output</div>
              <COutputBlock output={activeLesson.output} />

              <div className="c-subsection-title" style={{ marginTop: '20px' }}><Info size={14} /> Note</div>
              <div className="c-note-box"><strong>📘 Note</strong>{activeLesson.note}</div>

              <div className="c-warning-box"><strong>⚠️ Common Mistake</strong>{activeLesson.warning}</div>

              <div className="c-subsection-title" style={{ marginTop: '20px' }}><Star size={14} /> Best Practices</div>
              <div className="c-tip-box"><strong>✅ Best Practice</strong>{activeLesson.tip}</div>

              <div className="c-subsection-title" style={{ marginTop: '20px' }}><AlertTriangle size={14} /> Common Mistakes to Avoid</div>
              <div className="c-bp-list">
                {activeLesson.mistakes.map((m, i) => <div key={i} className="c-bp-item">{m}</div>)}
              </div>

              <div className="c-interview-tip" style={{ marginTop: '20px' }}>
                <div className="c-interview-tip-label"><Zap size={13} /> Interview Tip</div>
                <p>{activeLesson.interviewTip}</p>
              </div>

              <div className="c-subsection-title" style={{ marginTop: '20px' }}><CheckCircle size={14} /> Summary</div>
              <div className="c-note-box" style={{ borderLeftColor: 'var(--primary-purple)', background: 'rgba(139,92,246,0.06)' }}><strong style={{ color: 'var(--accent-glow)' }}>📌 Summary</strong>{activeLesson.summary}</div>

              <div className="c-lesson-nav-footer">
                {prev ? (
                  <button className="c-nav-btn" onClick={() => goTo(prev)}>
                    <span className="c-nav-btn-label"><ChevronLeft size={13} /> Previous</span>
                    <span className="c-nav-btn-title">{prev.title}</span>
                  </button>
                ) : <div />}
                {next ? (
                  <button className="c-nav-btn next" onClick={() => goTo(next)}>
                    <span className="c-nav-btn-label">Next <ChevronRight size={13} /></span>
                    <span className="c-nav-btn-title">{next.title}</span>
                  </button>
                ) : <div />}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ============================================================
   TAB: PROGRAMS
   ============================================================ */
const ProgramDetailView = ({
  prog,
  category,
  onBack,
  onPrev,
  onNext,
  isBookmarked,
  onBookmark,
  onCopy,
  onDownload,
  isCopied
}) => {
  const [fontSize, setFontSize] = useState('14');
  const [showLineNumbers] = useState(true);
  const [copiedOutput, setCopiedOutput] = useState(false);

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(prog.expectedOutput).then(() => {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    });
  };

  const lines = prog.code.split('\n');

  return (
    <div className="c-program-detail-page" style={{ width: '100%' }}>
      {/* Header bar */}
      <div className="c-pd-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}>
        <button className="c-btn-secondary" onClick={onBack} style={{ fontSize: '0.8rem', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={14} /> Back to Programs
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="c-pd-category-badge" style={{ fontSize: '0.72rem', background: 'rgba(139,92,246,0.1)', color: '#A855F7', padding: '4px 10px', borderRadius: '100px', border: '1px solid rgba(139,92,246,0.2)' }}>{category}</span>
          <button onClick={onBookmark} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: isBookmarked ? '#A855F7' : 'rgba(255,255,255,0.4)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bookmark size={15} fill={isBookmarked ? '#A855F7' : 'transparent'} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>{prog.title}</h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginTop: '6px', maxWidth: '800px' }}>{prog.statement}</p>
        </div>
        <span className={`c-complexity-badge ${prog.complexity === 'O(1)' ? 'complexity-o1' : 'complexity-on'}`} style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
          {prog.complexity}
        </span>
      </div>

      {/* Main split content */}
      <div className="c-pd-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'flex-start' }}>
        {/* Left column: Code & Terminal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Code block container */}
          <div className="c-pd-code-container" style={{ background: '#07070d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0c0c14', padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '8px' }}>📄 Original C Source Code</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="c-editor-select" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#ffffff', fontSize: '0.75rem', padding: '4px 8px' }}>
                  <option value="12">12px</option>
                  <option value="14">14px</option>
                  <option value="16">16px</option>
                </select>
                <button onClick={onCopy} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#ffffff', display: 'flex', alignItems: 'center' }} title="Copy Code">
                  {isCopied ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                </button>
                <button onClick={onDownload} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#ffffff', display: 'flex', alignItems: 'center' }} title="Download Code">
                  <Download size={14} />
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', fontSize: `${fontSize}px`, padding: '16px', maxHeight: '420px', overflowY: 'auto', fontFamily: 'monospace', lineHeight: 1.5 }}>
              {showLineNumbers && (
                <div style={{ color: 'rgba(255,255,255,0.15)', textAlign: 'right', paddingRight: '12px', userSelect: 'none', borderRight: '1px solid rgba(255,255,255,0.05)', marginRight: '12px' }}>
                  {lines.map((_, idx) => (
                    <div key={idx} style={{ height: '21px' }}>{idx + 1}</div>
                  ))}
                </div>
              )}
              <pre style={{ margin: 0, overflowX: 'auto', flex: 1, color: '#e2e8f0' }}>
                <code>{prog.code}</code>
              </pre>
            </div>
          </div>

          {/* Terminal output container */}
          <div className="c-pd-terminal-container" style={{ background: '#020205', border: '1px solid rgba(139,92,246,0.22)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.6), 0 0 15px rgba(139,92,246,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#08080f', padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#10B981', display: 'flex', alignItems: 'center', gap: '8px' }}>🖥️ Terminal Console Output</span>
              <button onClick={handleCopyOutput} style={{ background: 'rgba(255,255,255,0.02)', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }} title="Copy Output">
                {copiedOutput ? <Check size={13} style={{ color: '#10B981' }} /> : <Copy size={13} />}
              </button>
            </div>
            <div style={{ padding: '18px', fontFamily: 'monospace', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '12px', color: '#4ade80' }}>
              {prog.sampleInput && (
                <div>
                  <span style={{ color: '#64748b' }}>c_program $ ./input_stream</span>
                  <pre style={{ margin: '4px 0 0', color: '#e2e8f0', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>{prog.sampleInput}</pre>
                </div>
              )}
              <div>
                <span style={{ color: '#64748b' }}>c_program $ ./run_program</span>
                <pre style={{ margin: '4px 0 0', color: '#4ade80', whiteSpace: 'pre-wrap' }}>{prog.expectedOutput}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Info & Flow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Explanation */}
          <div className="c-pd-info-card" style={{ background: 'rgba(11,11,18,0.45)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#b0b0bc', textTransform: 'uppercase', margin: '0 0 10px' }}>Explanation</h4>
            <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>{prog.explanation}</p>
          </div>

          {/* Why this output */}
          <div className="c-pd-info-card" style={{ background: 'rgba(11,11,18,0.45)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#b0b0bc', textTransform: 'uppercase', margin: '0 0 10px' }}>Why this Output?</h4>
            <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5, color: '#f5f5f7' }}>{prog.whyOutput}</p>
          </div>

          {/* Visual Execution Flow */}
          <div className="c-pd-info-card" style={{ background: 'rgba(11,11,18,0.45)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#b0b0bc', textTransform: 'uppercase', margin: '0 0 14px' }}>Program Execution Flow</h4>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              {prog.flow.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px 14px', width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ background: 'rgba(168,85,247,0.1)', color: '#A855F7', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800' }}>{idx + 1}</span>
                    <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.9)' }}>{step}</span>
                  </div>
                  {idx < prog.flow.length - 1 && (
                    <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '1rem', fontWeight: 'bold' }}>↓</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Complexity & Concepts */}
          <div className="c-pd-metadata-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: '700' }}>Time Complexity</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#facc15' }}>{prog.complexity}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: '700' }}>Space Complexity</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#4ade80' }}>{prog.space}</span>
            </div>
            {prog.concepts && prog.concepts.length > 0 && (
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Concepts Used</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {prog.concepts.map(tag => (
                    <span key={tag} style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: '100px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            )}
            {prog.relatedLessons && prog.relatedLessons.length > 0 && (
              <div>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Related Lessons</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {prog.relatedLessons.map(lesson => (
                    <span key={lesson} style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: '100px', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.12)', color: '#A855F7' }}>{lesson}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
        <button className="c-btn-secondary" onClick={onPrev} disabled={!onPrev} style={{ opacity: onPrev ? 1 : 0.4, cursor: onPrev ? 'pointer' : 'not-allowed' }}>
          ← Previous Program
        </button>
        <button className="c-btn-primary" onClick={onNext} disabled={!onNext} style={{ opacity: onNext ? 1 : 0.4, cursor: onNext ? 'pointer' : 'not-allowed' }}>
          Next Program →
        </button>
      </div>
    </div>
  );
};

const ProgramsTab = () => {
  const categories = Object.keys(C_PROGRAMS);
  const [activeCategory, setActiveCategory] = useState('Basic');
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [copied, setCopied] = useState(null);
  const [bookmarks, setBookmarks] = useState(new Set());

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  if (selectedProgramId) {
    const activeList = C_PROGRAMS[activeCategory];
    const currentIdx = activeList.findIndex(p => p.id === selectedProgramId);
    const prog = activeList[currentIdx];

    const handlePrev = () => {
      if (currentIdx > 0) {
        setSelectedProgramId(activeList[currentIdx - 1].id);
      }
    };

    const handleNext = () => {
      if (currentIdx < activeList.length - 1) {
        setSelectedProgramId(activeList[currentIdx + 1].id);
      }
    };

    const handleDownload = () => {
      const blob = new Blob([prog.code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${prog.title.toLowerCase().replace(/\s+/g, '_')}.c`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    return (
      <ProgramDetailView
        prog={prog}
        category={activeCategory}
        onBack={() => setSelectedProgramId(null)}
        onPrev={currentIdx > 0 ? handlePrev : null}
        onNext={currentIdx < activeList.length - 1 ? handleNext : null}
        isBookmarked={bookmarks.has(prog.id)}
        onBookmark={() => toggleBookmark(prog.id)}
        onCopy={() => handleCopy(prog.id, prog.code)}
        onDownload={handleDownload}
        isCopied={copied === prog.id}
      />
    );
  }

  return (
    <div className="c-tab-content c-programs-layout">
      <aside className="c-programs-sidebar">
        <div className="c-subsection-title" style={{ marginBottom: '14px' }}>Categories</div>
        <div className="c-prog-cat-list">
          {categories.map(cat => (
            <button key={cat} className={`c-prog-cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
              {cat}
              <span className="c-prog-cat-count">{C_PROGRAMS[cat].length}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="c-programs-grid">
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {C_PROGRAMS[activeCategory].map((prog) => (
              <div key={prog.id} className="c-program-card" onClick={() => setSelectedProgramId(prog.id)}>
                <div className="c-program-card-header" style={{ cursor: 'pointer' }}>
                  <div style={{ flex: 1 }}>
                    <div className="c-program-title">{prog.title}</div>
                    <div className="c-program-statement">{prog.statement}</div>
                  </div>
                  <div className="c-program-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={`c-complexity-badge ${prog.complexity === 'O(1)' ? 'complexity-o1' : 'complexity-on'}`}>{prog.complexity}</span>
                    <ArrowRight size={14} color="rgba(255,255,255,0.4)" />
                  </div>
                </div>
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
  const [activeProblem, setActiveProblem] = useState(C_PRACTICE_PROBLEMS[0]);
  const [code, setCode] = useState(C_STARTER_CODE[1]);
  const [consoleTab, setConsoleTab] = useState('output');
  const [showHint, setShowHint] = useState(false);
  const [fontSize, setFontSize] = useState('14');
  const [lineNumbers, setLineNumbers] = useState(true);

  const handleProblemChange = (prob) => {
    setActiveProblem(prob);
    setCode(C_STARTER_CODE[prob.id]);
    setShowHint(false);
  };

  return (
    <div className="c-tab-content">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        {C_PRACTICE_PROBLEMS.map(p => (
          <button key={p.id} onClick={() => handleProblemChange(p)} style={{ padding: '8px 16px', borderRadius: '9px', border: `1px solid ${activeProblem.id === p.id ? 'var(--primary-purple)' : 'var(--border-primary)'}`, background: activeProblem.id === p.id ? 'rgba(139,92,246,0.15)' : 'var(--card-bg)', color: activeProblem.id === p.id ? 'var(--accent-glow)' : 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
            {p.id}. {p.title}
            <span style={{ marginLeft: '8px', padding: '1px 7px', borderRadius: '100px', fontSize: '0.68rem', background: p.difficulty === 'Easy' ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)', color: p.difficulty === 'Easy' ? '#4ade80' : '#facc15' }}>{p.difficulty}</span>
          </button>
        ))}
      </div>

      <div className="c-practice-layout">
        <div className="c-practice-panel">
          <div className="c-panel-header">
            <span className="c-panel-title"><FileText size={14} /> Problem</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {activeProblem.tags.map(t => <span key={t} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '100px', background: 'rgba(139,92,246,0.12)', color: 'var(--accent-glow)', border: '1px solid rgba(139,92,246,0.2)' }}>{t}</span>)}
            </div>
          </div>
          <div className="c-panel-body">
            <div className="c-problem-title">{activeProblem.id}. {activeProblem.title}</div>
            <p className="c-problem-desc">{activeProblem.desc}</p>
            {activeProblem.examples.map((ex, i) => (
              <div key={i} className="c-problem-example">
                <div className="c-problem-example-label">Example {i + 1}</div>
                <pre>{`Input: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? `\nExplanation: ${ex.explanation}` : ''}`}</pre>
              </div>
            ))}
            <div className="c-subsection-title" style={{ marginTop: '14px' }}><Info size={13} /> Constraints</div>
            <ul className="c-constraints-list">
              {activeProblem.constraints.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <div className="c-hint-accordion">
              <button className="c-hint-btn" onClick={() => setShowHint(!showHint)}>
                <Lightbulb size={14} /> {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              {showHint && <div className="c-hint-text">{activeProblem.hint}</div>}
            </div>
          </div>
        </div>

        <div className="c-practice-panel" style={{ background: '#080814' }}>
          <div className="c-panel-header" style={{ background: '#0d0d1a', borderColor: 'rgba(139,92,246,0.15)' }}>
            <span className="c-panel-title" style={{ color: '#e8e8f0' }}><Code2 size={14} /> Editor</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select className="c-editor-select"><option>C (GCC 13)</option><option>C99</option><option>C11</option></select>
              <select className="c-editor-select"><option>Dark Theme</option><option>Monokai</option></select>
              <select className="c-editor-select" value={fontSize} onChange={e => setFontSize(e.target.value)}>
                {['12','13','14','16','18'].map(s => <option key={s} value={s}>{s}px</option>)}
              </select>
            </div>
          </div>
          <div className="c-editor-toolbar">
            <label className="c-editor-toggle">
              <input type="checkbox" checked={lineNumbers} onChange={() => setLineNumbers(!lineNumbers)} style={{ marginRight: '4px' }} />Line Numbers
            </label>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', marginLeft: 'auto' }}>Auto Save: ON</span>
          </div>
          <textarea className="c-editor-area" value={code} onChange={e => setCode(e.target.value)} spellCheck={false} style={{ fontSize: `${fontSize}px`, flex: 1, minHeight: '320px' }} />
          <div className="c-editor-footer">
            <button className="c-btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }} onClick={() => setCode(C_STARTER_CODE[activeProblem.id])}>
              <RotateCcw size={13} /> Reset
            </button>
            <button className="c-btn-primary" style={{ fontSize: '0.8rem', padding: '8px 20px' }}>
              <Play size={13} /> Run Code
            </button>
          </div>
        </div>

        <div className="c-practice-panel">
          <div className="c-console-tabs">
            {['output', 'testcases', 'runtime'].map(t => (
              <button key={t} className={`c-console-tab ${consoleTab === t ? 'active' : ''}`} onClick={() => setConsoleTab(t)}>
                {t === 'output' ? 'Output' : t === 'testcases' ? 'Test Cases' : 'Runtime'}
              </button>
            ))}
          </div>
          <div className="c-console-body">
            {consoleTab === 'output' && (
              <div className="c-console-placeholder"><Terminal size={28} /><p style={{ textAlign: 'center' }}>Run your code to see output here.</p></div>
            )}
            {consoleTab === 'testcases' && (
              <div className="c-test-case-grid">
                {activeProblem.examples.map((ex, i) => (
                  <div key={i} className="c-test-case">
                    <div className="c-test-case-label">Test Case {i + 1}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Input: {ex.input}</div>
                    <div style={{ fontSize: '0.8rem', color: '#4ade80', marginTop: '4px' }}>Expected: {ex.output}</div>
                  </div>
                ))}
              </div>
            )}
            {consoleTab === 'runtime' && (
              <div className="c-runtime-grid">
                {[{ label: 'Runtime', val: '-- ms' }, { label: 'Memory', val: '-- MB' }, { label: 'Status', val: 'Pending' }, { label: 'Tests', val: '0/0' }].map((s, i) => (
                  <div key={i} className="c-runtime-stat"><strong>{s.val}</strong><span>{s.label}</span></div>
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

  const questions = C_QUIZ_DATA[level];

  useEffect(() => { // eslint-disable-line
    if (quizStarted && !revealed && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); handleReveal(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [quizStarted, current, revealed, finished]); // eslint-disable-line

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
      <div className="c-tab-content">
        <div className="c-quiz-level-selector">
          {[{ key: 'beginner', label: 'Beginner', icon: '🟢', count: C_QUIZ_DATA.beginner.length }, { key: 'intermediate', label: 'Intermediate', icon: '🟡', count: C_QUIZ_DATA.intermediate.length }, { key: 'advanced', label: 'Advanced', icon: '🔴', count: C_QUIZ_DATA.advanced.length }].map(l => (
            <div key={l.key} className={`c-quiz-level-btn ${level === l.key ? 'active' : ''}`} onClick={() => setLevel(l.key)}>
              <div className="c-quiz-level-icon">{l.icon}</div>
              <div className="c-quiz-level-name">{l.label}</div>
              <div className="c-quiz-level-count">{l.count} Questions</div>
            </div>
          ))}
        </div>
        <div className="c-quiz-container">
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🧠</div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '8px' }}>C Programming {level.charAt(0).toUpperCase() + level.slice(1)} Quiz</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{questions.length} questions · 30 seconds per question · Instant explanations</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              {[['Questions', questions.length], ['Time/Q', '30s'], ['Explanation', 'Yes'], ['Scoring', '+1 correct']].map(([k, v]) => (
                <div key={k} style={{ textAlign: 'center', padding: '12px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid var(--border-primary)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-glow)' }}>{v}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{k}</div>
                </div>
              ))}
            </div>
            <button className="c-btn-primary" onClick={() => setQuizStarted(true)} style={{ padding: '13px 36px', fontSize: '1rem' }}>
              <Play size={18} /> Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="c-tab-content">
        <div className="c-quiz-container">
          <div className="c-quiz-score-screen">
            <div className="c-score-circle" style={{ '--score-pct': `${pct * 3.6}deg` }}>
              <div className="c-score-inner"><span className="c-score-pct">{pct}%</span><span className="c-score-label">Score</span></div>
            </div>
            <h2 className="c-score-title">{pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Good Job!' : '📚 Keep Practicing!'}</h2>
            <p className="c-score-subtitle">{pct >= 80 ? 'Great understanding of C programming!' : pct >= 60 ? 'Good work! Review the explanations for missed questions.' : 'Review the lessons and try again!'}</p>
            <div className="c-score-breakdown">
              <div className="c-score-stat"><strong style={{ color: '#4ade80' }}>{score}</strong><span>Correct</span></div>
              <div className="c-score-stat"><strong style={{ color: '#f87171' }}>{questions.length - score}</strong><span>Wrong</span></div>
              <div className="c-score-stat"><strong>{questions.length}</strong><span>Total</span></div>
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
              <button className="c-btn-primary" onClick={resetQuiz}><RotateCcw size={15} /> Retry Quiz</button>
              <button className="c-btn-secondary" onClick={() => { setLevel(level === 'beginner' ? 'intermediate' : level === 'intermediate' ? 'advanced' : 'beginner'); resetQuiz(); }}>
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
    <div className="c-tab-content">
      <div className="c-quiz-container">
        <div className="c-quiz-top-bar">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{current + 1} / {questions.length}</span>
          <div className="c-quiz-progress-track"><div className="c-quiz-progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
          <div className={`c-quiz-timer ${timeLeft <= 10 ? 'warning' : ''}`}><Clock size={13} />{timeLeft}s</div>
        </div>
        <div className="c-quiz-body">
          <div className="c-quiz-q-num">Question {current + 1}</div>
          <div className="c-quiz-question">{q.q}</div>
          <div className="c-quiz-options">
            {q.options.map((opt, idx) => {
              let cls = '';
              if (revealed) { if (idx === q.answer) cls = 'correct'; else if (idx === selected) cls = 'incorrect'; }
              else if (idx === selected) cls = 'selected';
              return (
                <button key={idx} className={`c-quiz-option ${cls}`} onClick={() => handleSelect(idx)}>
                  <span className="c-quiz-option-letter">{optionLetters[idx]}</span>{opt}
                </button>
              );
            })}
          </div>
          {revealed && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="c-quiz-explanation">
              <strong>Explanation: </strong>{q.explanation}
            </motion.div>
          )}
          <div className="c-quiz-footer">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Score: <strong style={{ color: 'var(--accent-glow)' }}>{score}</strong></div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {!revealed && <button className="c-btn-secondary" style={{ fontSize: '0.85rem', padding: '9px 18px' }} onClick={handleReveal} disabled={selected === null}>Submit</button>}
              {revealed && <button className="c-btn-primary" style={{ fontSize: '0.85rem', padding: '9px 18px' }} onClick={handleNext}>{current + 1 >= questions.length ? 'See Results' : 'Next'} <ChevronRight size={14} /></button>}
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
  const filtered = filter === 'All' ? C_PROJECTS : C_PROJECTS.filter(p => p.diff === filter);
  return (
    <div className="c-tab-content">
      <div className="c-projects-filter">
        {filters.map(f => <button key={f} className={`c-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>)}
      </div>
      <div className="c-projects-grid">
        {filtered.map((proj, i) => (
          <motion.div key={i} className="c-project-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="c-project-thumb" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(168,85,247,0.08))' }}>
              <span style={{ fontSize: '3.5rem' }}>{proj.emoji}</span>
            </div>
            <div className="c-project-body">
              <div className="c-project-tags">{proj.tags.map(t => <span key={t} className="c-project-tag">{t}</span>)}</div>
              <div className="c-project-title">{proj.title}</div>
              <p className="c-project-desc">{proj.desc}</p>
              <div className="c-project-meta">
                <span className={`c-diff-tag diff-${proj.diff.toLowerCase()}`}>{proj.diff}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} />{proj.time}</span>
              </div>
            </div>
            <div className="c-project-features">
              <h5>Key Features</h5>
              <ul>{proj.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
            </div>
            <div style={{ padding: '0 18px 18px', display: 'flex', gap: '8px' }}>
              <button className="c-btn-primary" style={{ flex: 1, fontSize: '0.82rem', padding: '9px', justifyContent: 'center' }}><Play size={13} /> Start Project</button>
              <button className="c-btn-secondary" style={{ fontSize: '0.82rem', padding: '9px 14px' }}><Download size={13} /></button>
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
  const categories = Object.keys(C_INTERVIEW_QUESTIONS);
  const [activeCategory, setActiveCategory] = useState('Basic');
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [bookmarked, setBookmarked] = useState(new Set());
  const toggleBookmark = (key) => setBookmarked(prev => { const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s; });

  return (
    <div className="c-tab-content c-iq-layout">
      <aside className="c-iq-sidebar">
        <div className="c-subsection-title" style={{ marginBottom: '14px' }}>Sections</div>
        {categories.map(cat => (
          <button key={cat} className={`c-iq-cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => { setActiveCategory(cat); setExpandedIdx(null); }}>
            {cat}<span className="c-prog-cat-count">{C_INTERVIEW_QUESTIONS[cat].length}</span>
          </button>
        ))}
      </aside>
      <div>
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="c-iq-list">
            {C_INTERVIEW_QUESTIONS[activeCategory].map((item, idx) => {
              const key = `${activeCategory}-${idx}`;
              return (
                <div key={idx} className="c-iq-card">
                  <div className="c-iq-card-header" onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}>
                    <div className="c-iq-question">{item.q}</div>
                    <div className="c-iq-header-meta">
                      {item.freq && <span className="c-iq-freq-badge">🔥 Frequently Asked</span>}
                      <button className={`c-iq-bookmark-btn ${bookmarked.has(key) ? 'active' : ''}`} onClick={e => { e.stopPropagation(); toggleBookmark(key); }}>
                        <Bookmark size={15} fill={bookmarked.has(key) ? 'var(--accent-glow)' : 'none'} />
                      </button>
                      <button className="c-iq-expand-btn">
                        {expandedIdx === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedIdx === idx && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="c-iq-answer">
                        <p className="c-iq-answer-text">{item.a}</p>
                        <div className="c-iq-tip"><strong>💡 Tip: </strong>{item.tip}</div>
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
  <div className="c-tab-content">
    <div className="c-downloads-grid">
      {C_DOWNLOADS.map((item, i) => (
        <motion.div key={i} className="c-download-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <div className="c-download-icon-row">
            <div className="c-download-icon" style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>{item.icon}</div>
            <div>
              <div className="c-download-title">{item.title}</div>
              <div className="c-download-meta">
                <div className="c-download-meta-item"><FileText size={11} />{item.type}</div>
                <div className="c-download-meta-item"><Database size={11} />{item.size}</div>
                <div className="c-download-meta-item"><Clock size={11} />Updated {item.updated}</div>
              </div>
            </div>
          </div>
          <p className="c-download-desc">{item.desc}</p>
          <button className="c-download-btn"><Download size={15} /> Download {item.type}</button>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ============================================================
   C LOGO SVG
   ============================================================ */
const CLogo = () => (
  <div
    className="c-hero-logo"
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '110px' }}
    dangerouslySetInnerHTML={{ __html: TECH_LOGOS.c }}
  />
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
const CLearningHub = () => {
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
    <div className="c-hub-wrapper">
      <div className="c-reading-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="c-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>
          <ArrowLeft size={13} /> Back
        </button>
        <span className="sep" style={{ margin: '0 4px', opacity: 0.3, color: 'var(--text-secondary)' }}>|</span>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}><Home size={13} /> Home</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button onClick={() => navigate('/', { state: { scrollToSection: 'technologies' } })} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>Tech Stack</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button onClick={() => setActiveTab('overview')} style={{ background: 'none', border: 'none', color: activeTab === 'overview' ? 'var(--accent-glow)' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: activeTab === 'overview' ? '600' : '500', padding: '0' }}>C Language</button>
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
          <CLogo />
          <div className="c-hero-text">
            <span className="c-badge">C LANGUAGE</span>
            <h1 className="c-hero-title">C Programming</h1>
            <p className="c-hero-subtitle">Beginner to Advanced</p>
            <p className="c-hero-desc">Learn C from scratch to advanced — pointers, memory management, data structures, algorithms, and system-level programming.</p>
            <div className="c-hero-stats">
              {[{ val: '45+', label: 'Lessons' }, { val: '120+', label: 'Programs' }, { val: '9+', label: 'Projects' }, { val: '30+', label: 'Quizzes' }, { val: '60+', label: 'Interview Qs' }].map((s, i) => (
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
                {[['Lessons Completed', '0 / 45'], ['Quizzes Completed', '0 / 10'], ['Programs Solved', '0 / 120'], ['Projects Completed', '0 / 9']].map(([l, v]) => (
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

      <div className="c-content-area">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CLearningHub;
