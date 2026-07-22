/**
 * Semester Curriculum — Problem Solving Using C
 * Chapter-by-chapter educational content.
 *
 * Each chapter contains:
 *   theory   : Detailed explanation in simple English (500-800 words)
 *   code     : Example C program
 *   output   : Expected program output
 *   explanation : Line-by-line explanation of the program
 */

export const SC_CHAPTER_CONTENT = {

  'introduction-to-c': {
    title: 'Introduction to C',
    theory: `C is a general-purpose programming language created by Dennis Ritchie in 1972 at Bell Laboratories, USA. It was originally developed to write the UNIX operating system. Today, C is one of the most widely used programming languages in the world.

C is called the "mother of all programming languages" because many modern languages like C++, Java, Python, and JavaScript have borrowed heavily from C's syntax and concepts.

Why Learn C?

C is fast because it compiles directly to machine code. It gives you direct control over memory through pointers. Programs written in C are portable — they can run on different systems with little modification. C has a small set of keywords (only 32) making it compact and learnable. Most importantly, learning C helps you truly understand how computers work.

Where is C Used?

C is used to build operating systems (Linux, Windows kernel), embedded systems (washing machines, cars, medical devices), compilers, game engines, network tools, and database systems like SQLite and MySQL.

The C Compilation Process

When you write a C program and compile it, four stages happen:
1. Preprocessing: The preprocessor handles #include and #define directives.
2. Compilation: Your C code is converted to assembly language.
3. Assembly: Assembly is converted to object code (binary machine instructions).
4. Linking: Object code is combined with library functions to produce the final executable.

Your First C Program

Every C program starts from the main() function. The #include <stdio.h> line includes the Standard Input Output library which provides printf() for printing to the screen. The return 0; at the end tells the operating system that the program ran successfully.`,
    code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    printf("Welcome to C Programming!\\n");
    printf("This is my first program.\\n");
    return 0;
}`,
    output: `Hello, World!
Welcome to C Programming!
This is my first program.`,
    explanation: [
      { line: '#include <stdio.h>', text: 'Includes the Standard Input Output library. This gives us access to printf() for printing text on screen.' },
      { line: 'int main() {', text: 'Declares the main function. Every C program must have exactly one main() function. Execution starts from here. The int means it returns an integer.' },
      { line: 'printf("Hello, World!\\\\n");', text: 'Calls the printf function to print text. The \\n at the end moves the cursor to the next line (newline character).' },
      { line: 'printf("Welcome to C Programming!\\\\n");', text: 'Prints the second line. Each printf call can print any text inside the double quotes.' },
      { line: 'printf("This is my first program.\\\\n");', text: 'Prints the third line of output.' },
      { line: 'return 0;', text: 'Returns 0 to the operating system, signaling that the program completed successfully. Non-zero return values indicate errors.' },
      { line: '}', text: 'Closes the main function body. Every opening { must have a matching closing }.' }
    ]
  },

  'structure-of-c-program': {
    title: 'Structure of a C Program',
    theory: `Every C program you write must follow a specific structure. If any part is missing or placed incorrectly, the compiler will report errors. Understanding this structure is the foundation of writing correct C programs.

A C program has five main sections:

1. Documentation Section (Comments)
Comments are notes for the programmer. The computer ignores them completely. Use // for single-line comments and /* ... */ for multi-line comments. Always write comments to explain what your code does.

2. Preprocessor Directives
Lines starting with # are preprocessor directives. They are processed before actual compilation begins. The most common is #include which pastes the contents of a header file into your code. #define creates named constants.

3. Global Declarations
Variables declared outside any function are global. They are accessible from every function in the program. Function prototypes (declarations) also appear here.

4. The main() Function
This is mandatory in every C program. The operating system calls main() to start your program. Everything inside its curly braces { } executes in order from top to bottom.

5. User-Defined Functions
You can define your own functions to organize code into reusable blocks. These appear after main() (or before, if you write prototypes).

Important Rules to Remember

- Every statement ends with a semicolon (;).
- C is case-sensitive: int and INT are different.
- Curly braces { } define code blocks. Every { must have a matching }.
- The preprocessor directives (#include, #define) do NOT end with semicolons.`,
    code: `/* Documentation: This program demonstrates
   the complete structure of a C program */

#include <stdio.h>          // Preprocessor directive
#define MAX 100             // Macro definition

int globalVar = 10;         // Global variable declaration

// Function prototype (forward declaration)
void greet(char name[]);

int main() {
    // Local variable
    char studentName[] = "Alice";

    printf("Max value: %d\\n", MAX);
    printf("Global: %d\\n", globalVar);

    greet(studentName);     // Calling user-defined function

    return 0;
}

// User-defined function definition
void greet(char name[]) {
    printf("Hello, %s! Welcome to C Programming.\\n", name);
}`,
    output: `Max value: 100
Global: 10
Hello, Alice! Welcome to C Programming.`,
    explanation: [
      { line: '/* Documentation ... */', text: 'Multi-line comment. The compiler ignores everything between /* and */. Used to document the purpose of the program.' },
      { line: '#include <stdio.h>', text: 'Preprocessor directive. Includes the standard I/O library which provides printf().' },
      { line: '#define MAX 100', text: 'Creates a macro. Every occurrence of MAX in the code will be replaced by 100 before compilation.' },
      { line: 'int globalVar = 10;', text: 'Global variable. Declared outside main(), it is accessible from any function in the program.' },
      { line: 'void greet(char name[]);', text: 'Function prototype. Tells the compiler that a function called greet exists and what its parameters are. Allows us to call it before defining it.' },
      { line: 'char studentName[] = "Alice";', text: 'Local variable. Declared inside main(), it exists only while main() is running.' },
      { line: 'printf("Max value: %d\\\\n", MAX);', text: 'Prints the value of MAX. %d is the format specifier for integers. MAX was replaced by 100 by the preprocessor.' },
      { line: 'greet(studentName);', text: 'Calls the greet function and passes studentName as an argument.' },
      { line: 'void greet(char name[]) { ... }', text: 'The full function definition. void means it returns nothing. name[] is the parameter that receives the string.' }
    ]
  },

  'variables': {
    title: 'Variables in C',
    theory: `A variable is a named location in memory where you store a value. Think of it like a labeled box — the box has a name, and you put something inside it.

Declaring a Variable

Before using a variable in C, you must declare it. This tells the compiler:
- The variable's name (so you can refer to it)
- The data type (how much memory to reserve, and what kind of data it can hold)

Syntax: data_type variable_name;
Example: int age;

You can also initialize (give a starting value) when declaring:
int age = 21;

Rules for Variable Names

Variable names must start with a letter (a-z, A-Z) or underscore (_). They can contain letters, digits (0-9), and underscores. They cannot be C keywords (int, return, if, etc.). Names are case-sensitive — age and Age are different variables. Use meaningful names: studentAge is better than x.

Scope of Variables

A local variable is declared inside a function and only exists while that function runs.
A global variable is declared outside all functions and exists throughout the program.

Constants

If a value should never change, declare it with the const keyword:
const float PI = 3.14159;

The compiler will stop you from accidentally changing a constant.

Multiple Declarations

You can declare multiple variables of the same type on one line:
int a = 5, b = 10, c = 15;`,
    code: `#include <stdio.h>

// Global variable
int globalScore = 100;

int main() {
    // Local variable declarations
    int age = 21;
    float gpa = 8.75;
    char grade = 'A';
    const float PI = 3.14159;

    // Multiple declarations
    int x = 5, y = 10, z;

    // Assignment after declaration
    z = x + y;

    // Printing variables
    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);
    printf("Grade: %c\\n", grade);
    printf("PI: %.5f\\n", PI);
    printf("x=%d, y=%d, z=%d\\n", x, y, z);
    printf("Global Score: %d\\n", globalScore);

    return 0;
}`,
    output: `Age: 21
GPA: 8.75
Grade: A
PI: 3.14159
x=5, y=10, z=15
Global Score: 100`,
    explanation: [
      { line: 'int globalScore = 100;', text: 'Global variable declared outside main(). Accessible from any function. Persists throughout program execution.' },
      { line: 'int age = 21;', text: 'Local integer variable named age, initialized to 21. Occupies 4 bytes of stack memory.' },
      { line: 'float gpa = 8.75;', text: 'Float variable for decimal numbers. Stores 8.75 using 4 bytes. Suitable for values needing ~6 decimal digits of precision.' },
      { line: 'char grade = \'A\';', text: 'Char variable holds a single character. Characters are stored as ASCII numbers (A = 65). Use single quotes for char values.' },
      { line: 'const float PI = 3.14159;', text: 'Constant variable. const prevents the value from being changed. Any attempt to modify PI will cause a compile error.' },
      { line: 'int x = 5, y = 10, z;', text: 'Declares three int variables on one line. z is uninitialized — it contains garbage until a value is assigned.' },
      { line: 'z = x + y;', text: 'Assignment statement. Computes x + y (5 + 10 = 15) and stores the result in z.' },
      { line: 'printf("GPA: %.2f\\\\n", gpa);', text: '%.2f formats the float to exactly 2 decimal places. The dot (.) specifies precision.' }
    ]
  },

  'data-types': {
    title: 'Data Types in C',
    theory: `Every variable in C has a data type that determines:
- What kind of data it can store (numbers, characters, etc.)
- How much memory it uses
- What operations can be performed on it

Basic Data Types

int — Stores whole numbers (integers). Usually 4 bytes. Range: -2,147,483,648 to 2,147,483,647.
Example: int count = 50;

float — Stores decimal numbers with ~6-7 digits of precision. 4 bytes.
Example: float price = 9.99;

double — Stores decimal numbers with ~15-17 digits of precision. 8 bytes. Use for scientific calculations.
Example: double pi = 3.14159265358979;

char — Stores a single character. 1 byte. Characters stored as ASCII codes.
Example: char letter = 'A';

void — Means "no type" or "nothing". Used for functions that return nothing.

Type Modifiers

short — Smaller integer (2 bytes): short int x = 100;
long — Larger integer (8 bytes on 64-bit): long int bigNum = 9999999999L;
unsigned — Only positive values, double the positive range: unsigned int score = 500;
signed — Can be positive or negative (default behavior)

The sizeof() Operator

sizeof() tells you exactly how many bytes a type uses on your system:
printf("%lu", sizeof(int)); // Usually prints 4

This is important because sizes can vary between different computer architectures.

Format Specifiers

When printing or reading, use the correct format specifier:
%d for int, %f for float, %lf for double, %c for char, %ld for long int.`,
    code: `#include <stdio.h>

int main() {
    // Basic data types
    int age = 25;
    float height = 5.9;
    double pi = 3.14159265358979;
    char initial = 'A';

    // Type modifiers
    short int smallNum = 200;
    long int bigNum = 2000000000L;
    unsigned int positiveOnly = 4000000000U;

    // Print with format specifiers
    printf("int: %d\\n", age);
    printf("float: %.2f\\n", height);
    printf("double: %.10lf\\n", pi);
    printf("char: %c (ASCII: %d)\\n", initial, initial);
    printf("short: %d\\n", smallNum);
    printf("long: %ld\\n", bigNum);
    printf("unsigned: %u\\n", positiveOnly);

    // sizeof() operator
    printf("\\n--- Memory Sizes ---\\n");
    printf("int: %lu bytes\\n", sizeof(int));
    printf("float: %lu bytes\\n", sizeof(float));
    printf("double: %lu bytes\\n", sizeof(double));
    printf("char: %lu bytes\\n", sizeof(char));
    printf("long: %lu bytes\\n", sizeof(long));

    return 0;
}`,
    output: `int: 25
float: 5.90
double: 3.1415926536
char: A (ASCII: 65)
short: 200
long: 2000000000
unsigned: 4000000000

--- Memory Sizes ---
int: 4 bytes
float: 4 bytes
double: 8 bytes
char: 1 bytes
long: 8 bytes`,
    explanation: [
      { line: 'int age = 25;', text: 'Integer variable. Stores whole numbers. On most systems uses 4 bytes and holds values from about -2 billion to +2 billion.' },
      { line: 'float height = 5.9;', text: 'Float stores decimal numbers but with limited precision (~6 digits). Uses 4 bytes.' },
      { line: 'double pi = 3.14159265358979;', text: 'Double provides much higher precision (~15 digits) using 8 bytes. Preferred for scientific or financial calculations.' },
      { line: 'char initial = \'A\';', text: 'Stores a single character. Internally stored as the number 65 (ASCII code for A). Uses 1 byte.' },
      { line: 'unsigned int positiveOnly = 4000000000U;', text: 'Unsigned int stores only non-negative values. This doubles the maximum positive value (~4.2 billion). The U suffix marks it as unsigned.' },
      { line: 'printf("char: %c (ASCII: %d)\\\\n", initial, initial);', text: 'The same char variable printed twice — once as a character (%c → A) and once as its ASCII number (%d → 65).' },
      { line: 'sizeof(int)', text: 'sizeof() operator returns the size in bytes. On 32-bit and 64-bit systems, int is typically 4 bytes. This helps write portable code.' }
    ]
  },

  'operators': {
    title: 'Operators in C',
    theory: `An operator is a symbol that tells the computer to perform a specific operation. The values on which it operates are called operands.

Arithmetic Operators

+ (Add), - (Subtract), * (Multiply), / (Divide), % (Modulo/Remainder)

IMPORTANT: When dividing two integers, the result is always an integer — the decimal part is cut off.
Example: 7 / 2 = 3 (not 3.5). To get 3.5, use: (float)7 / 2

The % operator gives the remainder: 10 % 3 = 1 (because 10 = 3×3 + 1)

Relational Operators

These compare two values and return 1 (true) or 0 (false):
== (equal), != (not equal), > (greater), < (less), >= (greater or equal), <= (less or equal)

CRITICAL: Do not confuse = (assignment) with == (comparison)!
if (x = 5) assigns 5 to x — always true!
if (x == 5) checks if x equals 5.

Logical Operators

&& (AND): True only if both conditions are true
|| (OR): True if at least one condition is true
! (NOT): Reverses the truth value

Increment and Decrement

++x (pre-increment): Increment first, then use. x++ (post-increment): Use first, then increment.

Assignment Operators

+= (add and assign): x += 3 is same as x = x + 3
-= (subtract and assign), *= (multiply), /= (divide), %= (modulo)

Operator Precedence

C evaluates operators in a specific order, like BODMAS in math:
Parentheses → Increment/Decrement → * / % → + - → Relational → Logical
When in doubt, use parentheses!`,
    code: `#include <stdio.h>

int main() {
    int a = 15, b = 4;

    // Arithmetic operators
    printf("a + b = %d\\n", a + b);
    printf("a - b = %d\\n", a - b);
    printf("a * b = %d\\n", a * b);
    printf("a / b = %d (integer division)\\n", a / b);
    printf("(float)a / b = %.2f\\n", (float)a / b);
    printf("a %% b = %d (remainder)\\n", a % b);

    // Relational operators
    printf("\\n--- Relational ---\\n");
    printf("a == b: %d\\n", a == b);  // 0 (false)
    printf("a != b: %d\\n", a != b);  // 1 (true)
    printf("a > b:  %d\\n", a > b);   // 1 (true)

    // Logical operators
    int x = 1, y = 0;
    printf("\\n--- Logical ---\\n");
    printf("x && y: %d\\n", x && y);  // 0 (false)
    printf("x || y: %d\\n", x || y);  // 1 (true)
    printf("!x:     %d\\n", !x);      // 0

    // Increment / Decrement
    int n = 10;
    printf("\\n--- Increment ---\\n");
    printf("n++: %d (then n = %d)\\n", n++, n);
    printf("++n: %d\\n", ++n);

    // Compound assignment
    int c = 20;
    c += 5;  printf("c after +=5: %d\\n", c);
    c *= 2;  printf("c after *=2: %d\\n", c);

    return 0;
}`,
    output: `a + b = 19
a - b = 11
a * b = 60
a / b = 3 (integer division)
(float)a / b = 3.75
a % b = 3 (remainder)

--- Relational ---
a == b: 0
a != b: 1
a > b:  1

--- Logical ---
x && y: 0
x || y: 1
!x:     0

--- Increment ---
n++: 10 (then n = 11)
++n: 12

c after +=5: 25
c after *=2: 50`,
    explanation: [
      { line: 'a / b = 3 (integer division)', text: '15 divided by 4 gives 3 as an integer. The remainder 3 is discarded because both operands are integers.' },
      { line: '(float)a / b = 3.75', text: 'Casting a to float forces floating-point division, giving the exact decimal result 3.75.' },
      { line: 'a % b = 3 (remainder)', text: 'Modulo operator: 15 = 4×3 + 3, so the remainder is 3. Useful for checking even/odd, cycling through values.' },
      { line: 'a == b: 0', text: '15 == 4 is false, so the result is 0. In C, 0 means false and 1 means true.' },
      { line: 'x && y: 0', text: 'AND requires BOTH to be true. x=1 (true) but y=0 (false), so 1 && 0 = 0 (false).' },
      { line: 'n++: 10 (then n = 11)', text: 'Post-increment: the current value (10) is used in the expression first, THEN n is incremented to 11.' },
      { line: '++n: 12', text: 'Pre-increment: n (currently 11) is incremented to 12 first, then the value 12 is used.' },
      { line: 'c += 5', text: 'Compound assignment: shorthand for c = c + 5. Starting from 20, adds 5 → 25.' }
    ]
  },

  'input-and-output': {
    title: 'Input & Output in C',
    theory: `Every useful program needs to communicate with the user — display results (output) and receive data (input). In C, the two most essential functions for this are printf() and scanf(), both from the <stdio.h> library.

printf() — Formatted Output

printf() prints text and variable values to the screen. You use format specifiers as placeholders for variables.

Common format specifiers:
%d → int
%f → float (or double in printf)
%lf → double
%c → char
%s → string
%ld → long int
%u → unsigned int

You can control formatting:
%.2f → float with 2 decimal places
%10d → integer right-aligned in 10-character width
%-10d → left-aligned

Escape sequences:
\n → new line
\t → tab
\\ → prints a backslash
\" → prints a double quote

scanf() — Formatted Input

scanf() reads data from the keyboard. You must pass the address of the variable using the & operator.

Example: scanf("%d", &age);

The & gives scanf the memory address of age so it can store the value there. WITHOUT & (for non-arrays), scanf cannot modify your variable.

For strings (char arrays), & is NOT needed because array names are already pointers:
scanf("%s", name);

IMPORTANT: scanf with %s stops reading at the first space. To read a full line with spaces, use fgets:
fgets(name, sizeof(name), stdin);`,
    code: `#include <stdio.h>

int main() {
    // Variable declarations
    int age;
    float height;
    char name[50];
    char grade;

    // Input using scanf
    printf("Enter your name: ");
    scanf("%s", name);          // No & for arrays

    printf("Enter your age: ");
    scanf("%d", &age);          // & required for non-arrays

    printf("Enter your height (m): ");
    scanf("%f", &height);

    printf("Enter your grade (A/B/C): ");
    scanf(" %c", &grade);       // Space before %c skips leftover newline

    // Output using printf
    printf("\\n--- Your Details ---\\n");
    printf("Name   : %s\\n", name);
    printf("Age    : %d years\\n", age);
    printf("Height : %.2f m\\n", height);
    printf("Grade  : %c\\n", grade);

    // Formatted output examples
    printf("\\n--- Formatted Output ---\\n");
    printf("Right-aligned: %10d\\n", age);
    printf("Left-aligned:  %-10d|\\n", age);
    printf("Precision:     %.4f\\n", height);

    return 0;
}`,
    output: `Enter your name: Alice
Enter your age: 21
Enter your height (m): 1.65
Enter your grade (A/B/C): A

--- Your Details ---
Name   : Alice
Age    : 21 years
Height : 1.65 m
Grade  : A

--- Formatted Output ---
Right-aligned:         21
Left-aligned:  21        |
Precision:     1.6500`,
    explanation: [
      { line: 'char name[50];', text: 'A character array (string) that can hold up to 49 characters plus the null terminator. Arrays automatically allocate contiguous memory.' },
      { line: 'scanf("%s", name);', text: 'Reads a word from the keyboard into the name array. No & needed because name is already a pointer to the array\'s first element.' },
      { line: 'scanf("%d", &age);', text: 'Reads an integer. The & gives scanf the memory address of age. Without &, scanf cannot store the value.' },
      { line: 'scanf(" %c", &grade);', text: 'The space before %c is critical — it skips any leftover newline character in the input buffer from previous scanf calls.' },
      { line: 'printf("Height : %.2f m\\\\n", height);', text: '%.2f formats the float with exactly 2 decimal places. Even 1.65 → 1.65.' },
      { line: 'printf("Right-aligned: %10d\\\\n", age);', text: '%10d reserves 10 character positions, right-aligned. The number is padded with spaces on the left.' },
      { line: 'printf("Left-aligned:  %-10d|\\\\n", age);', text: '%-10d forces left-alignment within 10 character positions, padding spaces on the right.' }
    ]
  },

  'conditional-statements': {
    title: 'Conditional Statements',
    theory: `Programs need to make decisions based on conditions. Conditional statements allow your program to execute different code paths depending on whether a condition is true or false.

In C, 0 means false and any non-zero value means true.

The if Statement

if (condition) {
  // runs only if condition is true
}

The if-else Statement

if (condition) {
  // runs if true
} else {
  // runs if false
}

The else-if Ladder

When you have multiple conditions to check in order:
if (marks >= 90) grade = 'A';
else if (marks >= 80) grade = 'B';
else if (marks >= 70) grade = 'C';
else grade = 'F';

Only the FIRST matching block executes. The rest are skipped.

Nested if Statements

You can place if statements inside other if statements. But avoid deep nesting — it makes code hard to read. Use else-if instead when possible.

The switch Statement

switch is cleaner than else-if when comparing one variable against many fixed values:
switch (day) {
  case 1: printf("Monday"); break;
  case 2: printf("Tuesday"); break;
  default: printf("Other");
}

The break statement is essential — without it, execution falls through to the next case.

Always use {} braces even for single-statement bodies. Skipping braces is a common source of bugs.`,
    code: `#include <stdio.h>

int main() {
    int marks = 75;
    char grade;

    // if-else-if ladder
    if (marks >= 90) {
        grade = 'O';  // Outstanding
    } else if (marks >= 75) {
        grade = 'A';
    } else if (marks >= 60) {
        grade = 'B';
    } else if (marks >= 50) {
        grade = 'C';
    } else {
        grade = 'F';  // Fail
    }

    printf("Marks: %d\\n", marks);
    printf("Grade: %c\\n", grade);

    // Ternary operator (shorthand if-else)
    char *result = (marks >= 50) ? "PASS" : "FAIL";
    printf("Result: %s\\n", result);

    // switch statement
    int day = 3;
    printf("\\nDay %d is: ", day);
    switch (day) {
        case 1: printf("Monday\\n"); break;
        case 2: printf("Tuesday\\n"); break;
        case 3: printf("Wednesday\\n"); break;
        case 4: printf("Thursday\\n"); break;
        case 5: printf("Friday\\n"); break;
        case 6:
        case 7: printf("Weekend\\n"); break;
        default: printf("Invalid day\\n");
    }

    // Nested if
    int num = 12;
    if (num > 0) {
        if (num % 2 == 0) {
            printf("\\n%d is positive and even\\n", num);
        } else {
            printf("\\n%d is positive and odd\\n", num);
        }
    }

    return 0;
}`,
    output: `Marks: 75
Grade: A
Result: PASS

Day 3 is: Wednesday

12 is positive and even`,
    explanation: [
      { line: 'if (marks >= 90) { grade = \'O\'; }', text: 'First condition checked. marks is 75, which is NOT >= 90, so this block is skipped.' },
      { line: 'else if (marks >= 75) { grade = \'A\'; }', text: 'Second condition: 75 >= 75 is TRUE. grade is set to A. All remaining else-if blocks are skipped.' },
      { line: 'char *result = (marks >= 50) ? "PASS" : "FAIL";', text: 'Ternary operator — a compact if-else. If marks >= 50 is true, result = "PASS". Otherwise result = "FAIL".' },
      { line: 'case 3: printf("Wednesday\\\\n"); break;', text: 'day is 3, so case 3 matches. Wednesday is printed. break exits the switch. Without break, execution would fall into case 4 too.' },
      { line: 'case 6: case 7: printf("Weekend\\\\n"); break;', text: 'Intentional fall-through. Both 6 and 7 share the same output. No break between case 6 and case 7 means both match "Weekend".' },
      { line: 'if (num > 0) { if (num % 2 == 0) {', text: 'Nested if. First checks if num is positive (yes: 12 > 0). Then inside that, checks if it is even (yes: 12 % 2 == 0). Both conditions are true.' }
    ]
  },

  'loops': {
    title: 'Loops in C',
    theory: `A loop repeats a block of code multiple times without you having to write it out again and again.

For Loop — Known number of repetitions

for (initialization; condition; update) {
    // body
}
Best when you know exactly how many times to repeat.

While Loop — Condition-based repetition

while (condition) {
    // body
}
Checks the condition BEFORE each iteration. If the condition is false from the start, the body never runs.

Do-While Loop — Runs at least once

do {
    // body
} while (condition);
Checks condition AFTER each iteration. The body always runs at least once. Perfect for menus.

Break and Continue

break — Immediately exits the loop.
continue — Skips the rest of the current iteration and goes to the next one.

Nested Loops

You can put one loop inside another. The inner loop runs completely for each iteration of the outer loop. Used for patterns and 2D arrays.

Common Mistakes

1. Infinite loop: Forgetting to update the loop variable.
2. Off-by-one error: Using < instead of <= (or vice versa).
3. Wrong loop type: Using for when while fits better, or vice versa.`,
    code: `#include <stdio.h>

int main() {
    // for loop: print 1 to 5
    printf("For loop: ");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    // while loop: sum of digits
    int num = 12345, sum = 0, temp = num;
    while (temp != 0) {
        sum += temp % 10;
        temp /= 10;
    }
    printf("Sum of digits of %d = %d\\n", num, sum);

    // do-while: menu simulation
    int choice = 0;
    int count = 0;
    do {
        count++;
        choice = count; // Simulate user choosing options 1, 2, 3
        printf("Loop iteration %d\\n", choice);
    } while (choice < 3);

    // break example
    printf("\\nBreak at 4: ");
    for (int i = 1; i <= 10; i++) {
        if (i == 4) break;
        printf("%d ", i);
    }

    // continue example
    printf("\\nSkip evens: ");
    for (int i = 1; i <= 8; i++) {
        if (i % 2 == 0) continue;
        printf("%d ", i);
    }

    // Nested loop — star pattern
    printf("\\n\\nStar pattern:\\n");
    for (int row = 1; row <= 4; row++) {
        for (int col = 1; col <= row; col++) {
            printf("* ");
        }
        printf("\\n");
    }

    return 0;
}`,
    output: `For loop: 1 2 3 4 5
Sum of digits of 12345 = 15
Loop iteration 1
Loop iteration 2
Loop iteration 3

Break at 4: 1 2 3
Skip evens: 1 3 5 7

Star pattern:
*
* *
* * *
* * * *`,
    explanation: [
      { line: 'for (int i = 1; i <= 5; i++)', text: 'i starts at 1, loop runs while i <= 5, and i increases by 1 each time. This executes the body exactly 5 times.' },
      { line: 'sum += temp % 10;', text: 'temp % 10 extracts the last digit (12345 % 10 = 5). sum accumulates each digit. Then temp /= 10 removes the last digit.' },
      { line: 'do { ... } while (choice < 3);', text: 'The body executes first, then condition is checked. Here it runs 3 times (count = 1, 2, 3). When count = 3, the condition 3 < 3 is false and the loop ends.' },
      { line: 'if (i == 4) break;', text: 'When i reaches 4, break immediately exits the for loop. Only 1, 2, 3 are printed.' },
      { line: 'if (i % 2 == 0) continue;', text: 'When i is even (2, 4, 6, 8), continue skips the printf and jumps to the next iteration. Only odd numbers 1, 3, 5, 7 are printed.' },
      { line: 'for (int row = 1; ...) for (int col = 1; col <= row; ...)', text: 'Nested loop. The outer loop controls the row (1 to 4). The inner loop runs from 1 to the current row number, printing one star per column.' }
    ]
  },

  'functions': {
    title: 'Functions in C',
    theory: `A function is a named block of code that performs a specific task. Once written, you can call (use) it as many times as needed without rewriting the code.

Why Functions?

Reusability: Write once, use many times.
Organization: Break a large problem into smaller, manageable pieces.
Readability: Functions with clear names make code self-documenting.
Debugging: Isolate and fix bugs in small, focused functions.

Function Structure

return_type function_name(parameters) {
    // body
    return value;
}

Function Prototype (Declaration)

If you define a function AFTER main(), you need a prototype before main(). It tells the compiler the function signature without the body:
int add(int a, int b);

Call by Value

When you pass a variable to a function, C passes a COPY. Changes inside the function do NOT affect the original variable. If you need to modify the caller's variable, pass a pointer (address).

Return Values

A function can return exactly one value using return. void functions return nothing.

Local Variables

Variables declared inside a function only exist while that function is executing. They are destroyed when the function returns.

Recursion

A function can call itself. This is called recursion. Every recursive function needs a base case that stops it, and a recursive case that calls itself with a smaller problem.`,
    code: `#include <stdio.h>

// Function prototypes
int add(int a, int b);
float average(int arr[], int n);
int factorial(int n);         // Recursive function
void swap(int *a, int *b);    // Call by reference using pointers

int main() {
    // Test add
    int result = add(10, 25);
    printf("10 + 25 = %d\\n", result);

    // Test average
    int marks[] = {80, 90, 75, 85, 95};
    printf("Average: %.2f\\n", average(marks, 5));

    // Test factorial (recursive)
    printf("5! = %d\\n", factorial(5));

    // Test swap
    int x = 100, y = 200;
    printf("Before: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After:  x=%d, y=%d\\n", x, y);

    return 0;
}

// Function definitions
int add(int a, int b) {
    return a + b;
}

float average(int arr[], int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    return (float)sum / n;
}

int factorial(int n) {
    if (n <= 1) return 1;          // Base case
    return n * factorial(n - 1);   // Recursive case
}

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`,
    output: `10 + 25 = 35
Average: 85.00
5! = 120
Before: x=100, y=200
After:  x=200, y=100`,
    explanation: [
      { line: 'int add(int a, int b);', text: 'Function prototype. Tells the compiler: add takes two ints and returns an int. Allows calling it in main() before its definition.' },
      { line: 'int result = add(10, 25);', text: 'Function call. Values 10 and 25 are copied into parameters a and b. The returned value (35) is stored in result.' },
      { line: 'float average(int arr[], int n)', text: 'Arrays are NOT copied when passed — the function gets a pointer to the original array. n must be passed separately since C cannot determine array size from a pointer.' },
      { line: 'if (n <= 1) return 1;', text: 'Recursive base case. When n is 0 or 1, stop recursing and return 1. Without this, the recursion would never end.' },
      { line: 'return n * factorial(n - 1);', text: 'Recursive case: 5! = 5 × 4! = 5 × 4 × 3! ... until the base case returns 1. The call stack unwinds multiplying values back.' },
      { line: 'void swap(int *a, int *b)', text: 'Pointers allow the function to modify the caller\'s variables. *a and *b dereference the pointers to access the original values of x and y.' }
    ]
  },

  'arrays': {
    title: 'Arrays in C',
    theory: `An array stores multiple values of the same data type under one name. Instead of declaring separate variables (score1, score2, score3...), you declare one array that holds them all.

Declaring Arrays

data_type array_name[size];
int scores[5];         — Array of 5 integers
float prices[10];      — Array of 10 floats

Initialization

int arr[5] = {10, 20, 30, 40, 50};
int arr[] = {10, 20, 30, 40, 50};  // Size inferred automatically

Accessing Elements — Zero-Based Indexing

arr[0] is the FIRST element. arr[4] is the LAST in a 5-element array.
NEVER access arr[5] or beyond — C does not check bounds!

Traversal with Loops

for (int i = 0; i < n; i++) {
    printf("%d ", arr[i]);
}

2D Arrays — Matrices

int matrix[3][4];         // 3 rows, 4 columns
matrix[0][0] = 1;         // Row 0, Column 0

Passing Arrays to Functions

Arrays are passed by reference — the function operates on the original data. Always pass the size as a separate parameter.

void print(int arr[], int n) { ... }

Common Array Operations

Finding maximum/minimum, calculating sum and average, reversing, searching for an element.`,
    code: `#include <stdio.h>

// Function to find maximum
int findMax(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

int main() {
    // 1D array
    int scores[5] = {85, 92, 78, 96, 88};
    int n = 5;

    // Print all elements
    printf("Scores: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", scores[i]);
    }

    // Sum and average
    int sum = 0;
    for (int i = 0; i < n; i++) sum += scores[i];
    printf("\\nSum: %d\\n", sum);
    printf("Average: %.2f\\n", (float)sum / n);
    printf("Maximum: %d\\n", findMax(scores, n));

    // Reverse the array
    printf("Reversed: ");
    for (int i = n - 1; i >= 0; i--) {
        printf("%d ", scores[i]);
    }

    // 2D array (matrix)
    int matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    printf("\\n\\n2D Matrix:\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d\\t", matrix[i][j]);
        }
        printf("\\n");
    }

    return 0;
}`,
    output: `Scores: 85 92 78 96 88
Sum: 439
Average: 87.80
Maximum: 96
Reversed: 88 96 78 92 85

2D Matrix:
1    2    3
4    5    6`,
    explanation: [
      { line: 'int scores[5] = {85, 92, 78, 96, 88};', text: 'Declares and initializes a 5-element integer array. scores[0]=85, scores[1]=92, ..., scores[4]=88.' },
      { line: 'for (int i = 0; i < n; i++)', text: 'Standard array traversal. i goes from 0 to n-1 (not n!). Using i < n ensures you stop at the last valid index.' },
      { line: 'for (int i = n - 1; i >= 0; i--)', text: 'Traversal in reverse. Starts at the last index (n-1 = 4) and decrements to 0, printing elements in reverse order.' },
      { line: 'int max = arr[0];', text: 'Initialize max with the first element. Then compare each subsequent element — if any is larger, update max.' },
      { line: 'int matrix[2][3] = { {1,2,3}, {4,5,6} };', text: '2D array with 2 rows and 3 columns. The outer braces hold the array, inner braces hold each row.' },
      { line: 'matrix[i][j]', text: 'Access element at row i, column j. matrix[0][2] = 3 (row 0, column 2). Nested loops traverse all rows and columns.' }
    ]
  },

  'strings': {
    title: 'Strings in C',
    theory: `A string in C is a sequence of characters stored in a char array, ending with a special null character \0. This null terminator marks the end of the string.

"Hello" is stored as: H e l l o \0

Always allocate one extra byte for the \0 when sizing your char array.

Declaring Strings

char name[20] = "Alice";   — Array of 20 chars
char name[] = "Alice";     — Size automatically 6 (5 chars + \0)
char *msg = "Hello";       — Pointer to string literal (read-only!)

Reading Strings

scanf("%s", name) — reads one word (stops at space)
fgets(name, 20, stdin) — reads full line including spaces (SAFER!)

The string.h Library

Include <string.h> for string functions:

strlen(s) — returns the length (number of chars, NOT counting \0)
strcpy(dest, src) — copies src into dest
strcat(dest, src) — appends src to the end of dest
strcmp(s1, s2) — compares: 0 if equal, negative if s1 < s2, positive if s1 > s2
strchr(s, ch) — finds first occurrence of character ch
strstr(s, sub) — finds first occurrence of substring

NEVER compare strings with ==! Always use strcmp().

The ctype.h Library

toupper(c) — convert character to uppercase
tolower(c) — convert character to lowercase
isalpha(c) — is it a letter?
isdigit(c) — is it a digit?`,
    code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char str1[30] = "Hello";
    char str2[] = "World";
    char full[60];

    // strlen
    printf("Length of str1: %lu\\n", strlen(str1));

    // strcpy
    char copy[30];
    strcpy(copy, str1);
    printf("Copy: %s\\n", copy);

    // strcat — concatenate
    strcpy(full, str1);
    strcat(full, ", ");
    strcat(full, str2);
    strcat(full, "!");
    printf("Concatenated: %s\\n", full);

    // strcmp
    printf("\\nCompare 'Hello' and 'Hello': %d\\n", strcmp(str1, str1)); // 0
    printf("Compare 'Apple' and 'Banana': %d\\n", strcmp("Apple", "Banana")); // negative

    // Convert to uppercase
    char word[] = "programming";
    for (int i = 0; word[i] != '\\0'; i++) {
        word[i] = toupper(word[i]);
    }
    printf("\\nUppercase: %s\\n", word);

    // Count vowels
    char sentence[] = "Welcome to C Programming";
    int vowels = 0;
    for (int i = 0; sentence[i] != '\\0'; i++) {
        char c = tolower(sentence[i]);
        if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') vowels++;
    }
    printf("Vowels in '%s': %d\\n", sentence, vowels);

    return 0;
}`,
    output: `Length of str1: 5
Copy: Hello
Concatenated: Hello, World!

Compare 'Hello' and 'Hello': 0
Compare 'Apple' and 'Banana': -1

Uppercase: PROGRAMMING
Vowels in 'Welcome to C Programming': 7`,
    explanation: [
      { line: 'strlen(str1)', text: 'Returns 5 for "Hello". Counts characters up to but NOT including the \\0 null terminator.' },
      { line: 'strcpy(copy, str1);', text: 'Copies "Hello" character by character from str1 into copy, including the \\0 at the end.' },
      { line: 'strcat(full, ", ");', text: 'Appends ", " to the end of full. strcat finds the \\0 in full, replaces it with "," then appends the rest.' },
      { line: 'strcmp("Apple", "Banana")', text: 'Returns a negative number because "Apple" comes before "Banana" alphabetically. Returns 0 only when strings are identical.' },
      { line: 'word[i] = toupper(word[i]);', text: 'Converts each character to uppercase one by one. toupper(\'p\') returns \'P\', etc. The loop stops at \\0.' },
      { line: 'if (c==\'a\'||c==\'e\'||c==\'i\'||c==\'o\'||c==\'u\')', text: 'Checks if the lowercased character is a vowel. tolower ensures both uppercase and lowercase vowels are counted.' }
    ]
  },

  'pointers': {
    title: 'Pointers in C',
    theory: `A pointer is a variable that stores a memory address. Instead of holding a value directly (like 42), a pointer holds the location in memory where a value is stored.

Your computer's memory is like a row of numbered boxes (addresses). When you declare int age = 25, the computer reserves 4 boxes and stores 25 there. A pointer to age stores the box number (address) where age lives.

The & Operator — Address Of

int age = 25;
int *ptr = &age;   // ptr stores the address of age

The * Operator — Dereference

*ptr gives you the VALUE stored at the address ptr holds.
printf("%d", *ptr);   // Prints 25

Modifying Through Pointers

*ptr = 30;  // Changes age to 30!

This is exactly how functions can modify caller variables — pass a pointer.

NULL Pointer

Always initialize pointers. An uninitialized pointer contains garbage and dereferencing it causes crashes. Use NULL:
int *ptr = NULL;

Pointer Arithmetic

p++ moves the pointer to the NEXT element of its type (not just +1 byte).
For int (4 bytes): p++ moves 4 bytes forward.

Pointers and Arrays

An array name IS a pointer to its first element:
int arr[] = {10, 20, 30};
int *p = arr;
*(p + 1) == arr[1] == 20   // All equivalent!`,
    code: `#include <stdio.h>

// Swap using pointers (call by reference)
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int age = 25;
    int *ptr = &age;   // ptr holds address of age

    // Basic pointer operations
    printf("Value of age: %d\\n", age);
    printf("Address of age: %p\\n", (void*)&age);
    printf("ptr holds:     %p\\n", (void*)ptr);
    printf("Value via ptr (*ptr): %d\\n", *ptr);

    // Modify through pointer
    *ptr = 30;
    printf("After *ptr=30, age = %d\\n", age);

    // NULL pointer check
    int *nullPtr = NULL;
    if (nullPtr == NULL) {
        printf("\\nnullPtr is safely NULL\\n");
    }

    // Pointers and arrays
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;  // Points to arr[0]

    printf("\\nArray via pointer:\\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d = *(p+%d) = %d\\n",
               i, arr[i], i, *(p + i));
    }

    // Swap using pointers
    int x = 100, y = 200;
    printf("\\nBefore swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After swap:  x=%d, y=%d\\n", x, y);

    return 0;
}`,
    output: `Value of age: 25
Address of age: 0x7ffd3a2b4c10
ptr holds:     0x7ffd3a2b4c10
Value via ptr (*ptr): 25
After *ptr=30, age = 30

nullPtr is safely NULL

Array via pointer:
arr[0] = 10 = *(p+0) = 10
arr[1] = 20 = *(p+1) = 20
arr[2] = 30 = *(p+2) = 30
arr[3] = 40 = *(p+3) = 40
arr[4] = 50 = *(p+4) = 50

Before swap: x=100, y=200
After swap:  x=200, y=100`,
    explanation: [
      { line: 'int *ptr = &age;', text: '& is the address-of operator. It gives the memory location of age. ptr now holds this address (e.g., 0x7ffd3a2b4c10).' },
      { line: 'printf("%p", (void*)&age);', text: '%p is the format specifier for printing a memory address in hexadecimal. The (void*) cast is recommended for portability.' },
      { line: '*ptr = 30;', text: '* in an expression is the dereference operator. *ptr means "go to the address stored in ptr and access the value there." Setting *ptr = 30 changes age directly.' },
      { line: 'int *p = arr;', text: 'An array name is already a pointer to its first element. No & needed. p and arr both point to arr[0].' },
      { line: '*(p + i)', text: 'Pointer arithmetic: p+i moves the pointer i elements forward (i × 4 bytes for int). *(p+i) is identical to arr[i].' },
      { line: 'void swap(int *a, int *b)', text: 'Receives addresses of x and y. Inside, *a refers to x\'s memory location, *b refers to y\'s. Changes to *a and *b affect the original variables.' }
    ]
  },

  'structures': {
    title: 'Structures in C',
    theory: `A structure groups variables of different data types under one name. This is useful when you want to represent a real-world entity that has multiple attributes.

For example, a Student has: roll number (int), name (string), marks (float), grade (char). Instead of 4 separate variables per student, you create one Student structure.

Defining a Structure

struct Student {
    int rollNo;
    char name[50];
    float marks;
    char grade;
};

Declaring Variables

struct Student s1;
struct Student s1 = {1, "Alice", 92.5, 'A'};

Accessing Members — Dot Operator

s1.rollNo = 101;
strcpy(s1.name, "Alice");
printf("%s: %.1f\n", s1.name, s1.marks);

typedef — Cleaner Syntax

typedef removes the need to write struct every time:
typedef struct {
    int id;
    char name[50];
    float salary;
} Employee;

Employee e1;   // No 'struct' keyword needed

Pointer to Structure — Arrow Operator

When you have a pointer to a structure, use -> instead of .
Employee *ep = &e1;
ep->salary = 50000;   // Same as: (*ep).salary = 50000

Arrays of Structures

Employee staff[50];   // Array of 50 Employee records
staff[0].id = 1;`,
    code: `#include <stdio.h>
#include <string.h>

// Define structure using typedef
typedef struct {
    int rollNo;
    char name[50];
    float marks;
    char grade;
} Student;

// Function to assign grade
void assignGrade(Student *s) {
    if (s->marks >= 90) s->grade = 'O';
    else if (s->marks >= 75) s->grade = 'A';
    else if (s->marks >= 60) s->grade = 'B';
    else s->grade = 'C';
}

int main() {
    // Single structure variable
    Student s1;
    s1.rollNo = 1;
    strcpy(s1.name, "Alice");
    s1.marks = 88.5;
    assignGrade(&s1);

    printf("Roll: %d\\n", s1.rollNo);
    printf("Name: %s\\n", s1.name);
    printf("Marks: %.1f\\n", s1.marks);
    printf("Grade: %c\\n", s1.grade);

    // Array of structures
    Student class[3] = {
        {101, "Bob",   92.0, 'O'},
        {102, "Carol", 74.5, 'A'},
        {103, "Dave",  58.0, 'C'}
    };

    printf("\\n--- Class Report ---\\n");
    float total = 0;
    for (int i = 0; i < 3; i++) {
        assignGrade(&class[i]);
        printf("%-10s: %.1f (%c)\\n",
               class[i].name,
               class[i].marks,
               class[i].grade);
        total += class[i].marks;
    }
    printf("Class Average: %.2f\\n", total / 3);

    return 0;
}`,
    output: `Roll: 1
Name: Alice
Marks: 88.5
Grade: A

--- Class Report ---
Bob       : 92.0 (O)
Carol     : 74.5 (A)
Dave      : 58.0 (C)
Class Average: 74.83`,
    explanation: [
      { line: 'typedef struct { ... } Student;', text: 'typedef creates an alias. Now you can write Student instead of struct Student everywhere in the code.' },
      { line: 's1.rollNo = 1;', text: 'Dot operator accesses structure members. s1 is the structure variable, rollNo is the member.' },
      { line: 'void assignGrade(Student *s)', text: 'Passes a pointer to the structure so the function can modify the original. Using s->marks is equivalent to (*s).marks.' },
      { line: 's->grade = \'O\';', text: 'Arrow operator (->) dereferences the pointer and accesses the member in one step. It is shorthand for (*s).grade.' },
      { line: 'Student class[3] = { {101, "Bob", ...}, ... };', text: 'Array of 3 Student structures, all initialized with data. Each {} inside initializes one structure element.' },
      { line: 'printf("%-10s: %.1f (%c)\\\\n", class[i].name, ...)', text: '%-10s left-aligns the name in a 10-character column for neat formatting. Each student is accessed by class[i].' }
    ]
  },

  'union': {
    title: 'Union in C',
    theory: `A union looks similar to a structure, but there is one critical difference: all members of a union share the same memory location. Only one member holds a valid value at any given time.

The size of a union equals the size of its LARGEST member (not the sum of all members).

Why Use Unions?

Unions save memory when you need to store different types of data but only one type at a time. They are widely used in:
- System programming (interpreting raw bytes)
- Embedded systems (hardware registers)
- Network protocol parsing

Declaring a Union

union Data {
    int i;       // 4 bytes
    float f;     // 4 bytes
    char str[8]; // 8 bytes
};
// Total size: 8 bytes (only the largest member)

Usage

union Data d;
d.i = 42;
printf("%d", d.i);  // 42 — OK

d.f = 3.14;         // OVERWRITES the same memory!
printf("%f", d.f);  // 3.14 — OK
printf("%d", d.i);  // GARBAGE — i and f share the same bytes!

This is the most important rule: reading a union member that was not the last one written gives meaningless garbage.

Difference from Struct

In a struct, each member has its OWN memory. In a union, ALL members SHARE the same memory. Struct size = sum of members (+ padding). Union size = largest member.`,
    code: `#include <stdio.h>

union Data {
    int i;
    float f;
    char str[8];
};

struct MixedStruct {
    int i;     // Each has its own memory
    float f;
    char str[8];
};

int main() {
    union Data d;
    struct MixedStruct s;

    // Size comparison
    printf("Size of union: %lu bytes\\n", sizeof(union Data));
    printf("Size of struct: %lu bytes\\n", sizeof(struct MixedStruct));

    // Union — only one member valid at a time
    d.i = 100;
    printf("\\nd.i = %d\\n", d.i);

    d.f = 3.14;  // Overwrites i's memory
    printf("d.f = %.2f\\n", d.f);
    printf("d.i after d.f set = %d (garbage!)\\n", d.i);

    // Using union correctly — track which member is active
    int type = 2; // 1=int, 2=float, 3=string
    d.f = 9.99;
    if (type == 2) {
        printf("\\nActive member (float): %.2f\\n", d.f);
    }

    // Struct — all members independent
    s.i = 42;
    s.f = 1.5;
    printf("\\nStruct — both valid: i=%d, f=%.1f\\n", s.i, s.f);

    return 0;
}`,
    output: `Size of union: 8 bytes
Size of struct: 16 bytes

d.i = 100
d.f = 3.14
d.i after d.f set = 1078523331 (garbage!)

Active member (float): 9.99

Struct — both valid: i=42, f=1.5`,
    explanation: [
      { line: 'sizeof(union Data) = 8', text: 'Union size equals its largest member (str[8] = 8 bytes). All members share these 8 bytes.' },
      { line: 'sizeof(struct MixedStruct) = 16', text: 'Struct size = int(4) + float(4) + char[8](8) + padding = 16 bytes. Each member has separate memory.' },
      { line: 'd.i = 100;', text: 'Writes integer 100 into the shared memory location.' },
      { line: 'd.f = 3.14;', text: 'Writing a float overwrites the same memory that d.i used. The binary encoding of 3.14 as a float is completely different from 100 as an int.' },
      { line: 'd.i after d.f = 1078523331 (garbage!)', text: 'Reading d.i after writing d.f gives garbage because the float bits are being misinterpreted as an integer.' },
      { line: 'if (type == 2) printf(d.f)', text: 'Always track which member is currently valid. Only read the member that was most recently written.' }
    ]
  },

  'enum': {
    title: 'Enum in C',
    theory: `An enum (enumeration) defines a set of named integer constants. Instead of using raw numbers (which are meaningless), you give them meaningful names.

Without enum: int day = 3; — What does 3 mean? Monday? Wednesday?
With enum: Day day = WEDNESDAY; — Crystal clear!

Declaring an Enum

enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };

By default, values start at 0 and increase by 1:
MON = 0, TUE = 1, WED = 2, etc.

Custom Starting Values

enum Month { JAN = 1, FEB, MAR, APR };
// JAN=1, FEB=2, MAR=3, APR=4

Or set specific values:
enum Status { PENDING = 0, ACTIVE = 1, CLOSED = 9, DELETED = 99 };

Using typedef with Enum

typedef enum { MON=1, TUE, WED, THU, FRI, SAT, SUN } Day;
Day today = WED;   // No 'enum' keyword needed

Benefits of Enums

1. Readability: Code explains itself.
2. Maintainability: Change the value in one place, applies everywhere.
3. Error prevention: Compilers can warn about invalid enum values.
4. Debugging: Debuggers may display enum names instead of numbers.

Enums with Switch Statements

Enums work perfectly with switch because each enum value is a unique integer:
switch (day) {
    case MON: printf("Monday"); break;
    case FRI: printf("TGIF!"); break;
}`,
    code: `#include <stdio.h>

// Enum with custom start value
typedef enum {
    MON = 1, TUE, WED, THU, FRI, SAT, SUN
} Day;

// Enum for directions
typedef enum {
    NORTH = 0,
    SOUTH = 180,
    EAST  = 90,
    WEST  = 270
} Direction;

// Function using enum
void printDay(Day d) {
    switch (d) {
        case MON: printf("Monday\\n"); break;
        case TUE: printf("Tuesday\\n"); break;
        case WED: printf("Wednesday\\n"); break;
        case THU: printf("Thursday\\n"); break;
        case FRI: printf("Friday\\n"); break;
        case SAT:
        case SUN: printf("Weekend!\\n"); break;
        default:  printf("Unknown\\n");
    }
}

int main() {
    Day today = WED;
    Day weekend = SAT;

    printf("Today: ");     printDay(today);
    printf("Weekend: ");   printDay(weekend);

    printf("\\nEnum values:\\n");
    printf("MON=%d TUE=%d WED=%d\\n", MON, TUE, WED);
    printf("THU=%d FRI=%d SAT=%d SUN=%d\\n", THU, FRI, SAT, SUN);

    // Direction enum
    Direction dir = NORTH;
    printf("\\nNORTH = %d degrees\\n", NORTH);
    printf("EAST  = %d degrees\\n", EAST);
    printf("Current direction = %d\\n", dir);

    // Loop through days
    printf("\\nWorkdays:\\n");
    for (Day d = MON; d <= FRI; d++) {
        printf("Day %d: ", d);
        printDay(d);
    }

    return 0;
}`,
    output: `Today: Wednesday
Weekend: Weekend!

Enum values:
MON=1 TUE=2 WED=3
THU=4 FRI=5 SAT=6 SUN=7

NORTH = 0 degrees
EAST  = 90 degrees
Current direction = 0

Workdays:
Day 1: Monday
Day 2: Tuesday
Day 3: Wednesday
Day 4: Thursday
Day 5: Friday`,
    explanation: [
      { line: 'typedef enum { MON = 1, TUE, WED, ... } Day;', text: 'MON is explicitly set to 1. TUE, WED, etc. automatically get values 2, 3, 4... typedef lets you use Day instead of enum Day.' },
      { line: 'Day today = WED;', text: 'WED has the integer value 3. today = 3 internally, but the code reads as today = WED — much more meaningful.' },
      { line: 'switch (d) { case MON: ... }', text: 'Enums work perfectly with switch. Since each enum value is a unique integer, the switch correctly matches each case.' },
      { line: 'case SAT: case SUN: printf("Weekend!");', text: 'Fall-through without break. Both SAT and SUN print "Weekend!" — a common and intentional pattern.' },
      { line: 'for (Day d = MON; d <= FRI; d++)', text: 'You can use enum values in loop conditions and increment them. d goes from 1 (MON) to 5 (FRI).' },
      { line: 'NORTH = 0, SOUTH = 180, EAST = 90, WEST = 270', text: 'Custom values for directions in degrees. These are not sequential — each value is explicitly set.' }
    ]
  },

  'file-handling': {
    title: 'File Handling in C',
    theory: `Until now, all our programs lose their data when they close. File handling allows you to store data permanently and read it back later.

Opening a File

FILE *fp = fopen("filename.txt", "mode");

File modes:
"r" — Read (file must exist)
"w" — Write (creates new, overwrites existing)
"a" — Append (adds to end, creates if not found)
"r+" — Read and Write
"rb", "wb" — Binary modes

ALWAYS check if fopen returns NULL — it fails when file is not found, path is wrong, or permissions are denied.

Writing to a File

fprintf(fp, "Name: %s\n", name);   — Like printf, but to a file
fputs("Hello\n", fp);              — Write a string
fputc('A', fp);                    — Write a single character

Reading from a File

fscanf(fp, "%s %d", name, &age);  — Like scanf, from a file
fgets(buf, 100, fp);              — Read one line
fgetc(fp)                         — Read one character

Closing a File

ALWAYS close files when done:
fclose(fp);

Closing flushes the buffer (writes any cached data), releases the file handle, and prevents data corruption.

File Position

fseek(fp, 0, SEEK_SET) — go to beginning
fseek(fp, 0, SEEK_END) — go to end
ftell(fp)              — get current position (file size if at end)
rewind(fp)             — go to beginning (same as fseek to 0)`,
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // --- WRITE to file ---
    FILE *fw = fopen("students.txt", "w");
    if (fw == NULL) {
        printf("Error: Cannot create file!\\n");
        return 1;
    }

    fprintf(fw, "Alice 92\\n");
    fprintf(fw, "Bob 85\\n");
    fprintf(fw, "Carol 78\\n");
    fprintf(fw, "Dave 96\\n");
    fclose(fw);
    printf("Data written to students.txt\\n");

    // --- READ from file ---
    FILE *fr = fopen("students.txt", "r");
    if (fr == NULL) {
        printf("Error: Cannot open file!\\n");
        return 1;
    }

    printf("\\n--- Contents of students.txt ---\\n");
    char name[30];
    int marks;
    while (fscanf(fr, "%s %d", name, &marks) == 2) {
        printf("Name: %-8s Marks: %d\\n", name, marks);
    }
    fclose(fr);

    // --- APPEND to file ---
    FILE *fa = fopen("students.txt", "a");
    fprintf(fa, "Eve 88\\n");
    fclose(fa);
    printf("\\nAppended Eve to file.\\n");

    // --- Get file size ---
    FILE *fs = fopen("students.txt", "r");
    fseek(fs, 0, SEEK_END);
    long size = ftell(fs);
    printf("File size: %ld bytes\\n", size);
    fclose(fs);

    return 0;
}`,
    output: `Data written to students.txt

--- Contents of students.txt ---
Name: Alice    Marks: 92
Name: Bob      Marks: 85
Name: Carol    Marks: 78
Name: Dave     Marks: 96

Appended Eve to file.
File size: 47 bytes`,
    explanation: [
      { line: 'FILE *fw = fopen("students.txt", "w");', text: 'Opens students.txt for writing. If it exists, it is erased. If not, it is created. Returns a FILE pointer.' },
      { line: 'if (fw == NULL) { return 1; }', text: 'ALWAYS check! fopen returns NULL on failure (file locked, path wrong, disk full). Dereferencing NULL causes a crash.' },
      { line: 'fprintf(fw, "Alice 92\\\\n");', text: 'Like printf but writes to the file pointed to by fw. Data goes to students.txt, not the screen.' },
      { line: 'fclose(fw);', text: 'Flushes the write buffer and closes the file. Without this, some data might not actually be written to disk.' },
      { line: 'while (fscanf(fr, "%s %d", name, &marks) == 2)', text: 'fscanf returns the number of items successfully read. == 2 means we read both a name and a number. Loop ends at EOF.' },
      { line: 'fopen("students.txt", "a")', text: '"a" mode opens the file for appending — cursor starts at the END. Existing data is preserved, new data is added after it.' },
      { line: 'fseek(fs, 0, SEEK_END); long size = ftell(fs);', text: 'Move to the end of the file, then ftell() returns the current position in bytes — which is the file size.' }
    ]
  },

  'dynamic-memory-allocation': {
    title: 'Dynamic Memory Allocation',
    theory: `All variables we have used so far are allocated at compile time on the stack. Their size must be known when you write the code. But what if you don't know how much memory you need until the program runs?

Dynamic memory allocation lets you request memory at runtime from the heap — a large pool of memory managed by the operating system.

The Four Functions (all in <stdlib.h>)

malloc(size) — Allocates size bytes. Memory is uninitialized (contains garbage). Returns void* (generic pointer) or NULL if failed.

int *arr = (int *)malloc(n * sizeof(int));

calloc(count, size) — Allocates count elements of size bytes each. Initializes ALL bytes to zero. Returns NULL on failure.

int *arr = (int *)calloc(n, sizeof(int));

realloc(ptr, newSize) — Resizes an existing allocation. May move the memory to a new location. Save the return value to a new pointer — do not overwrite the original before checking for NULL.

free(ptr) — Releases allocated memory back to the heap. MUST be called for every malloc/calloc to prevent memory leaks.

Critical Rules

Always check for NULL: if allocation fails, malloc/calloc return NULL.
Always free: every malloc needs a matching free.
Never double-free: calling free twice on the same pointer causes undefined behavior.
Set pointer to NULL after freeing: prevents accidental use of freed memory.
Never use freed memory: accessing memory after free causes unpredictable crashes.`,
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int n;
    printf("How many integers? ");
    n = 5; // Simulate user input of 5

    // malloc — uninitialized memory
    int *arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Initialize and use
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }
    printf("\\nmalloc array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);

    // realloc — grow to 8 elements
    int *bigger = (int *)realloc(arr, 8 * sizeof(int));
    if (bigger != NULL) {
        arr = bigger;
        arr[5] = 60;
        arr[6] = 70;
        arr[7] = 80;
    }
    printf("\\nAfter realloc: ");
    for (int i = 0; i < 8; i++) printf("%d ", arr[i]);

    free(arr);   // Release memory
    arr = NULL;  // Prevent dangling pointer

    // calloc — memory initialized to 0
    int *zeros = (int *)calloc(5, sizeof(int));
    printf("\\n\\ncalloc array (all zeros): ");
    for (int i = 0; i < 5; i++) printf("%d ", zeros[i]);
    free(zeros);
    zeros = NULL;

    // Dynamic string
    char *name = (char *)malloc(30 * sizeof(char));
    if (name) {
        strcpy(name, "Alice");
        printf("\\n\\nDynamic name: %s\\n", name);
        free(name);
        name = NULL;
    }

    printf("Memory freed successfully.\\n");
    return 0;
}`,
    output: `How many integers? 5

malloc array: 10 20 30 40 50
After realloc: 10 20 30 40 50 60 70 80

calloc array (all zeros): 0 0 0 0 0

Dynamic name: Alice
Memory freed successfully.`,
    explanation: [
      { line: 'int *arr = (int *)malloc(n * sizeof(int));', text: 'Allocates n × 4 bytes (for 5 ints = 20 bytes) from the heap. The (int *) cast converts the void* return. sizeof(int) ensures portability.' },
      { line: 'if (arr == NULL) { return 1; }', text: 'malloc returns NULL when there is not enough memory. ALWAYS check before using the pointer.' },
      { line: 'int *bigger = (int *)realloc(arr, 8 * sizeof(int));', text: 'Resizes the allocation to hold 8 ints. May move data to a new address. Returns NULL on failure. Existing data (first 5 elements) is preserved.' },
      { line: 'if (bigger != NULL) { arr = bigger; }', text: 'Only update arr if realloc succeeded. If we wrote arr = realloc(arr, ...) and it failed, we would lose the original pointer — a memory leak.' },
      { line: 'free(arr); arr = NULL;', text: 'free() releases the heap memory. Setting arr = NULL after prevents "dangling pointer" bugs — accidentally using freed memory.' },
      { line: 'int *zeros = (int *)calloc(5, sizeof(int));', text: 'calloc allocates 5 × 4 = 20 bytes AND initializes all to 0. More convenient than malloc when zero-initialization is needed.' }
    ]
  },

  'preprocessor-directives': {
    title: 'Preprocessor Directives',
    theory: `Before the compiler processes your C code, a separate program called the preprocessor runs first. It modifies your source code based on special instructions that all start with # (hash symbol).

The preprocessor is a text-transformation tool — it does not understand C types or logic, only text substitution.

#include — Including Files

#include <stdio.h>   — System header (searched in compiler's paths)
#include "myfile.h"  — User header (searched in current directory first)

#define — Macros

#define PI 3.14159        — Creates a named constant
#define SQUARE(x) ((x)*(x))  — Function-like macro

ALWAYS parenthesize macro arguments to prevent operator precedence bugs:
Wrong: #define SQ(x) x*x → SQ(1+2) = 1+2*1+2 = 5 (wrong!)
Right: #define SQ(x) ((x)*(x)) → SQ(1+2) = (3)*(3) = 9 (correct!)

Conditional Compilation

#ifdef DEBUG               — If DEBUG is defined
    printf("Debug mode");
#endif

#ifndef MAX_SIZE           — If MAX_SIZE is NOT defined
    #define MAX_SIZE 100
#endif

This lets you enable/disable code sections without deleting them. Useful for:
- Debug builds (extra logging)
- Platform-specific code
- Optional features

Include Guards

Header files use include guards to prevent being included twice:
#ifndef MYHEADER_H
#define MYHEADER_H
  // header content
#endif

Predefined Macros

__FILE__ — Current source filename
__LINE__ — Current line number
__DATE__ — Compilation date
__TIME__ — Compilation time`,
    code: `#include <stdio.h>

// Constant macros
#define PI         3.14159
#define MAX_SIZE   10
#define GREETING   "Hello, C!"

// Function-like macros — always parenthesize!
#define SQUARE(x)  ((x) * (x))
#define MAX(a, b)  ((a) > (b) ? (a) : (b))
#define ABS(x)     ((x) >= 0 ? (x) : -(x))

// Conditional compilation
#define DEBUG

int main() {
    // Using constant macros
    float radius = 5.0;
    float area = PI * SQUARE(radius);
    printf("Radius: %.1f\\n", radius);
    printf("Area:   %.2f\\n", area);
    printf("Greeting: %s\\n", GREETING);

    // Function-like macros
    printf("\\nSQUARE(4) = %d\\n", SQUARE(4));
    printf("SQUARE(1+2) = %d\\n", SQUARE(1 + 2)); // parentheses save us!
    printf("MAX(10, 20) = %d\\n", MAX(10, 20));
    printf("ABS(-15) = %d\\n", ABS(-15));

    // Conditional compilation
    #ifdef DEBUG
        printf("\\n[DEBUG] PI value = %.5f\\n", PI);
        printf("[DEBUG] MAX_SIZE = %d\\n", MAX_SIZE);
    #endif

    #ifndef RELEASE
        printf("[INFO] Not a release build\\n");
    #endif

    // Predefined macros
    printf("\\nFile: %s\\n", __FILE__);
    printf("Line: %d\\n", __LINE__);
    printf("Date: %s\\n", __DATE__);

    return 0;
}`,
    output: `Radius: 5.0
Area:   78.54
Greeting: Hello, C!

SQUARE(4) = 16
SQUARE(1+2) = 9
MAX(10, 20) = 20
ABS(-15) = 15

[DEBUG] PI value = 3.14159
[DEBUG] MAX_SIZE = 10
[INFO] Not a release build

File: main.c
Line: 44
Date: Jul 21 2026`,
    explanation: [
      { line: '#define PI 3.14159', text: 'Every occurrence of PI in the code is replaced by 3.14159 BEFORE compilation. The compiler never sees PI — only the number.' },
      { line: '#define SQUARE(x) ((x) * (x))', text: 'Function-like macro. The double parentheses around (x) prevent operator precedence bugs. SQUARE(1+2) → ((1+2)*(1+2)) = 9.' },
      { line: 'float area = PI * SQUARE(radius);', text: 'After preprocessing, this becomes: float area = 3.14159 * ((radius) * (radius)); — the compiler sees the expanded code.' },
      { line: '#define DEBUG', text: 'Defines DEBUG with no value. Its presence is enough for #ifdef to detect it.' },
      { line: '#ifdef DEBUG printf(...) #endif', text: 'This code is only COMPILED if DEBUG is defined. Remove #define DEBUG and this entire block vanishes from the compiled code.' },
      { line: '__FILE__, __LINE__, __DATE__', text: 'Predefined macros automatically set by the compiler. Very useful for error logging: "Error at line 44 in main.c".' }
    ]
  },

  'command-line-arguments': {
    title: 'Command Line Arguments',
    theory: `When you run a program from the terminal/command prompt, you can pass extra information to it. These are called command line arguments.

For example:
./myprogram Alice 25

Here "Alice" and "25" are command line arguments passed to the program.

argc and argv

To receive command line arguments, main() has a special signature:
int main(int argc, char *argv[])

argc (argument count) — The number of arguments passed, including the program name itself.
If you run: ./myprogram Alice 25
Then argc = 3

argv (argument vector) — An array of strings. Each element is one argument.
argv[0] = "./myprogram" (always the program name)
argv[1] = "Alice"
argv[2] = "25"

Converting String Arguments to Numbers

argv values are always strings. To use them as numbers, convert them:
int n = atoi(argv[1]);    — string to integer (from stdlib.h)
double d = atof(argv[1]); — string to double

Validating Arguments

Always check that enough arguments were passed before using them:
if (argc < 3) {
    printf("Usage: %s name age\n", argv[0]);
    return 1;
}

Why Use Command Line Arguments?

- Pass configuration without recompiling
- Build flexible tools that work with different inputs
- Unix/Linux utilities (like ls, grep, cat) all use command line arguments`,
    code: `#include <stdio.h>
#include <stdlib.h>  // for atoi(), atof()
#include <string.h>

int main(int argc, char *argv[]) {
    // argc always includes the program name
    printf("Number of arguments (argc): %d\\n", argc);
    printf("Program name (argv[0]): %s\\n", argv[0]);

    // Print all arguments
    printf("\\nAll arguments:\\n");
    for (int i = 0; i < argc; i++) {
        printf("  argv[%d] = %s\\n", i, argv[i]);
    }

    // Validate argument count
    if (argc < 3) {
        printf("\\nUsage: %s <name> <age>\\n", argv[0]);
        printf("Example: %s Alice 21\\n", argv[0]);
        return 1;
    }

    // Use the arguments
    char *name = argv[1];
    int age = atoi(argv[2]);   // Convert string "21" to integer 21

    printf("\\n--- Input Details ---\\n");
    printf("Name: %s\\n", name);
    printf("Age:  %d\\n", age);

    if (age >= 18) {
        printf("%s is an adult.\\n", name);
    } else {
        printf("%s is a minor.\\n", name);
    }

    // If a number is passed, compute its square
    if (argc == 4) {
        double num = atof(argv[3]);
        printf("\\nSquare of %.2f = %.2f\\n", num, num * num);
    }

    return 0;
}`,
    output: `(When run as: ./program Alice 21 5.5)

Number of arguments (argc): 4
Program name (argv[0]): ./program

All arguments:
  argv[0] = ./program
  argv[1] = Alice
  argv[2] = 21
  argv[3] = 5.5

--- Input Details ---
Name: Alice
Age:  21
Alice is an adult.

Square of 5.50 = 30.25`,
    explanation: [
      { line: 'int main(int argc, char *argv[])', text: 'argc is the count of arguments (including the program name). argv is an array of strings — each command line token is one string.' },
      { line: 'argc = 4', text: 'Running "./program Alice 21 5.5" gives 4 arguments: the program name + 3 user arguments. argc always counts from 1.' },
      { line: 'argv[0] = "./program"', text: 'The first argument is ALWAYS the program\'s own name. User-supplied arguments start from argv[1].' },
      { line: 'int age = atoi(argv[2]);', text: 'atoi() converts the string "21" to the integer 21. All command line arguments arrive as strings — you must convert when needed.' },
      { line: 'if (argc < 3) { printf("Usage..."); return 1; }', text: 'Always validate that enough arguments were provided before accessing them. Accessing argv[2] when argc is only 2 causes undefined behavior.' },
      { line: 'double num = atof(argv[3]);', text: 'atof() converts a string to a double floating-point number. "5.5" → 5.5.' }
    ]
  },

  'mini-projects': {
    title: 'Mini Projects in C',
    theory: `Now that you have learned all the core concepts of C programming, it is time to apply them in real projects. Mini projects help you:

Combine multiple concepts: Variables, functions, arrays, strings, loops, conditionals, structures, and file handling all come together.

Build problem-solving skills: Real problems require you to think through the design before coding.

Prepare for exams and interviews: Practical projects demonstrate genuine understanding.

Project 1 — Simple Calculator

Uses: Variables, input/output, switch-case, functions.
Features: Addition, subtraction, multiplication, division, modulo.

Project 2 — Student Record System

Uses: Structures, arrays, functions, file handling.
Features: Add student, display all students, calculate class average, find topper.

Project 3 — Number Guessing Game

Uses: Random numbers (rand, srand), loops, conditionals.
Features: Computer picks a number, user guesses, hints given.

Project 4 — Simple Banking System

Uses: Structures, switch-case, functions, file handling.
Features: Create account, deposit, withdraw, check balance.

How to Approach a Mini Project

1. Understand the requirements — what should the program do?
2. Design — identify the data structures and functions needed.
3. Write small pieces — build and test one function at a time.
4. Connect everything — wire the functions together in main.
5. Test — try normal cases and edge cases (empty input, zero, negative numbers).`,
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// ─── Project: Student Record System ──────────────────────────────

typedef struct {
    int rollNo;
    char name[30];
    float marks;
} Student;

void displayStudent(Student s) {
    printf("Roll: %d | Name: %-12s | Marks: %.1f\\n",
           s.rollNo, s.name, s.marks);
}

Student findTopper(Student arr[], int n) {
    Student top = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i].marks > top.marks) top = arr[i];
    }
    return top;
}

float classAverage(Student arr[], int n) {
    float sum = 0;
    for (int i = 0; i < n; i++) sum += arr[i].marks;
    return sum / n;
}

int main() {
    // Initialize student records
    Student students[5] = {
        {101, "Alice",  92.5},
        {102, "Bob",    85.0},
        {103, "Carol",  78.5},
        {104, "Dave",   96.0},
        {105, "Eve",    88.5}
    };
    int count = 5;

    // Display all records
    printf("=== Student Record System ===\\n\\n");
    printf("--- All Students ---\\n");
    for (int i = 0; i < count; i++) {
        displayStudent(students[i]);
    }

    // Class statistics
    printf("\\n--- Statistics ---\\n");
    printf("Class Average: %.2f\\n", classAverage(students, count));
    Student top = findTopper(students, count);
    printf("Class Topper:  %s (%.1f marks)\\n", top.name, top.marks);

    // Pass/Fail count (pass >= 60)
    int passCount = 0;
    for (int i = 0; i < count; i++) {
        if (students[i].marks >= 60) passCount++;
    }
    printf("Pass: %d | Fail: %d\\n", passCount, count - passCount);

    // Save to file
    FILE *fp = fopen("records.txt", "w");
    if (fp) {
        fprintf(fp, "Student Records\\n");
        for (int i = 0; i < count; i++) {
            fprintf(fp, "%d %s %.1f\\n",
                    students[i].rollNo,
                    students[i].name,
                    students[i].marks);
        }
        fclose(fp);
        printf("\\nRecords saved to records.txt\\n");
    }

    return 0;
}`,
    output: `=== Student Record System ===

--- All Students ---
Roll: 101 | Name: Alice        | Marks: 92.5
Roll: 102 | Name: Bob          | Marks: 85.0
Roll: 103 | Name: Carol        | Marks: 78.5
Roll: 104 | Name: Dave         | Marks: 96.0
Roll: 105 | Name: Eve          | Marks: 88.5

--- Statistics ---
Class Average: 88.10
Class Topper:  Dave (96.0 marks)
Pass: 5 | Fail: 0

Records saved to records.txt`,
    explanation: [
      { line: 'typedef struct { int rollNo; char name[30]; float marks; } Student;', text: 'Student structure groups all related data. typedef makes the type name clean — Student instead of struct Student.' },
      { line: 'void displayStudent(Student s)', text: 'A function that takes one Student by value and prints its data. %-12s left-aligns the name in 12 characters for neat column formatting.' },
      { line: 'Student top = arr[0];', text: 'Initialize the topper candidate with the first student. Then compare marks of all others — if any have higher marks, update top.' },
      { line: 'for (int i = 0; i < count; i++) sum += arr[i].marks;', text: 'Accumulate all marks. Then divide by count for the average.' },
      { line: 'if (students[i].marks >= 60) passCount++;', text: 'Count students who scored 60 or above. Fail count = total - pass count.' },
      { line: 'FILE *fp = fopen("records.txt", "w"); fprintf(fp, ...);', text: 'Saves all student data to a text file. This is where File Handling connects to Structures — real-world persistence.' }
    ]
  }
};
