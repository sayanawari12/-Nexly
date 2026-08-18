export const CPP_QUIZ_DATA = {
  beginner: [
    {
      id: 1,
      type: 'output',
      q: 'What will be the output of the following C++ program?',
      code: `#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int b = 20;

    cout << a + b;

    return 0;
}`,
      options: ['1020', '30', '10', '20'],
      answer: 1,
      explanation: 'The addition operator (+) computes the sum of integer variables a (10) and b (20), resulting in 30.'
    },
    {
      id: 2,
      type: 'output',
      q: 'What will be the output of the following C++ program?',
      code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;

    cout << x * 2 + 3;

    return 0;
}`,
      options: ['13', '16', '10', '8'],
      answer: 0,
      explanation: 'Multiplication (*) has higher precedence than addition (+). Thus, x * 2 evaluates to 10, and 10 + 3 yields 13.'
    },
    {
      id: 3,
      type: 'output',
      q: 'What will be the output of the following C++ program?',
      code: `#include <iostream>
using namespace std;

int main() {
    int a = 10;

    if (a > 5)
        cout << "Hello";
    else
        cout << "Bye";

    return 0;
}`,
      options: ['Bye', 'Hello', 'HelloBye', 'No output'],
      answer: 1,
      explanation: 'The condition (a > 5) is true because 10 > 5, so the if block executes and prints "Hello".'
    },
    {
      id: 4,
      type: 'output',
      q: 'What will be the output of the following C++ program?',
      code: `#include <iostream>
using namespace std;

int main() {
    int x = 7;

    cout << x++;

    return 0;
}`,
      options: ['7', '8', '6', 'Error'],
      answer: 0,
      explanation: 'Post-increment (x++) returns the current value of x (7) for output first, and increments x to 8 afterwards.'
    },
    {
      id: 5,
      type: 'output',
      q: 'What will be the output of the following C++ program?',
      code: `#include <iostream>
using namespace std;

int main() {
    int a = 5;
    int b = 2;

    cout << a / b;

    return 0;
}`,
      options: ['2.5', '3', '2', '0'],
      answer: 2,
      explanation: 'Integer division in C++ truncates any fractional part. 5 / 2 performs integer arithmetic resulting in 2.'
    },
    {
      id: 6,
      type: 'mcq',
      q: 'Which header file is commonly used for cout and cin in C++?',
      options: ['stdio.h', 'iostream', 'string.h', 'conio.h'],
      answer: 1,
      explanation: '<iostream> provides the standard input/output stream objects std::cin and std::cout in C++.'
    },
    {
      id: 7,
      type: 'mcq',
      q: 'Which symbol is used to end a statement in C++?',
      options: [':', '.', ';', ','],
      answer: 2,
      explanation: 'Every executable statement in C++ must be terminated with a semicolon (;).'
    },
    {
      id: 8,
      type: 'mcq',
      q: 'Which of the following is a valid C++ variable declaration?',
      options: ['int 1number;', 'number int;', 'int number;', 'integer number;'],
      answer: 2,
      explanation: '"int number;" correctly specifies the valid data type "int" followed by a legal identifier name.'
    },
    {
      id: 9,
      type: 'mcq',
      q: 'Which keyword is used to create a class in C++?',
      options: ['object', 'class', 'structs', 'define'],
      answer: 1,
      explanation: 'The "class" keyword is used to declare and define user-defined class types in C++.'
    },
    {
      id: 10,
      type: 'mcq',
      q: 'Which operator is used for output with cout?',
      options: ['>>', '<<', '==', '&&'],
      answer: 1,
      explanation: 'The stream insertion operator (<<) is used in conjunction with cout to send output to the console.'
    }
  ],
  intermediate: [
    {
      q: 'What does the this pointer represent inside a non-static member function?',
      options: ['A pointer to the parent class', 'A pointer to the current calling object instance', 'A reference to the global namespace', 'A copy of the class vtable'],
      answer: 1,
      explanation: 'this is an implicit pointer passed to all non-static member functions holding the memory address of the object for which the function was invoked.'
    },
    {
      q: 'Which constructor initializes an object using another object of the exact same class?',
      options: ['Default Constructor', 'Copy Constructor', 'Destructor', 'Conversion Constructor'],
      answer: 1,
      explanation: 'A Copy Constructor has the signature ClassName(const ClassName &other) and creates a new object as a copy of an existing object.'
    },
    {
      q: 'What character precedes a class destructor name in C++?',
      options: ['!', '~ (tilde)', '*', '#'],
      answer: 1,
      explanation: 'Destructors are declared with a tilde ~ before the class name (e.g. ~Student()) and execute automatically when an object leaves its scope.'
    },
    {
      q: 'In class Dog : public Animal, which type of inheritance access mode is used?',
      options: ['Private inheritance', 'Protected inheritance', 'Public inheritance', 'Virtual inheritance'],
      answer: 2,
      explanation: 'Public inheritance means public members of Animal remain public in Dog, and protected members remain protected in Dog.'
    },
    {
      q: 'Function overloading in C++ is an example of which type of polymorphism?',
      options: ['Compile-time (Static) Polymorphism', 'Runtime (Dynamic) Polymorphism', 'Coercion Polymorphism', 'Virtual Dispatch'],
      answer: 0,
      explanation: 'Function overloading and templates are resolved by the compiler at compile time based on parameter signatures (static polymorphism).'
    },
    {
      q: 'Which access specifier allows member variables to be accessible within the same class and its derived classes, but NOT from outside code?',
      options: ['private', 'protected', 'public', 'friend'],
      answer: 1,
      explanation: 'protected members are accessible to the declaring class and its derived subclasses, while remaining inaccessible to external code.'
    },
    {
      q: 'Which of the following alone CANNOT be used to overload a function in C++?',
      options: ['Number of parameters', 'Types of parameters', 'Return type only', 'Order of parameter types'],
      answer: 2,
      explanation: 'In C++, functions cannot be overloaded based solely on a differing return type; the parameter list signature must differ.'
    },
    {
      q: 'Which of the following C++ operators CANNOT be overloaded?',
      options: ['+', '<<', ':: (Scope resolution)', '[]'],
      answer: 2,
      explanation: 'The scope resolution operator (::), member access (.), pointer-to-member (.*), ternary conditional (?:), and sizeof cannot be overloaded.'
    },
    {
      q: 'Which statement is true regarding references vs pointers in C++?',
      options: ['References can be NULL', 'References can be reseated to another variable', 'References must be initialized when declared and cannot be NULL', 'Pointers cannot be incremented'],
      answer: 2,
      explanation: 'A reference is an alias for existing memory; it must be initialized upon declaration, cannot be NULL, and cannot be reseated to point to another variable.'
    },
    {
      q: 'What are the three primary building blocks of the C++ Standard Template Library (STL)?',
      options: ['Classes, Objects, Namespaces', 'Containers, Iterators, Algorithms', 'Compilers, Linkers, Assemblers', 'Functions, Pointers, Structs'],
      answer: 1,
      explanation: 'The STL architecture is structured around Containers (data storage), Iterators (traversal), and Algorithms (operations like sorting, searching, and mutating).'
    }
  ],
  advanced: [
    {
      q: 'What is the underlying data structure and search time complexity of std::map in C++?',
      options: ['Hash table, O(1)', 'Red-Black Tree (Self-balancing BST), O(log n)', 'Dynamic Array, O(n)', 'Doubly Linked List, O(n)'],
      answer: 1,
      explanation: 'std::map is implemented as a self-balancing Red-Black binary search tree, providing guaranteed O(log n) search, insertion, and deletion.'
    },
    {
      q: 'What happens to raw iterators pointing into a std::vector when a push_back() causes memory reallocation?',
      options: ['They are automatically updated', 'They become invalidated (dereferencing causes undefined behavior)', 'They point to NULL', 'They throw a runtime exception'],
      answer: 1,
      explanation: 'When std::vector expands beyond its capacity and reallocates its internal heap array, all existing iterators and pointers into that vector become invalidated.'
    },
    {
      q: 'When are C++ template functions and classes compiled by the toolchain?',
      options: ['At runtime during first execution', 'At compile time when instantiated with concrete types', 'At linking time only', 'In the preprocessor stage'],
      answer: 1,
      explanation: 'C++ templates are blueprint definitions instantiated and checked with specific data types at compile time (monomorphization).'
    },
    {
      q: 'How does C++ achieve dynamic dispatch (runtime polymorphism) for virtual functions?',
      options: ['Through static jump tables', 'Through a Virtual Method Table (VTable) and hidden vptr pointer per object', 'Through string symbol lookup', 'Through interpreter bytecode'],
      answer: 1,
      explanation: 'Classes with virtual methods contain a hidden pointer (vptr) pointing to a table of function pointers (VTable) created by the compiler for dynamic dispatch.'
    },
    {
      q: 'What makes a C++ class an Abstract Class that cannot be directly instantiated?',
      options: ['Declaring the class as private', 'Declaring at least one Pure Virtual Function (virtual void f() = 0;)', 'Having a private constructor only', 'Omitting a destructor'],
      answer: 1,
      explanation: 'A pure virtual function is assigned = 0 in its declaration. Any class containing at least one pure virtual function is abstract and cannot be instantiated.'
    },
    {
      q: 'Which smart pointer in <memory> provides exclusive, non-copyable ownership of a dynamically allocated heap object?',
      options: ['std::shared_ptr', 'std::unique_ptr', 'std::weak_ptr', 'std::auto_ptr'],
      answer: 1,
      explanation: 'std::unique_ptr enforces strict sole ownership with zero runtime overhead over a raw pointer; it cannot be copied, only moved via std::move.'
    },
    {
      q: 'What is the core principle of RAII (Resource Acquisition Is Initialization) in modern C++?',
      options: ['Allocating all objects on the heap', 'Binding resource lifecycle to object lifetime so destructors automatically release resources', 'Initializing all integers to zero', 'Running garbage collection in threads'],
      answer: 1,
      explanation: 'In RAII, resources (memory, file handles, mutex locks) are acquired in constructors and deterministically released in destructors when scope exits.'
    },
    {
      q: 'What happens if an unhandled exception is thrown inside a class destructor while stack unwinding is already occurring?',
      options: ['The exception is ignored', 'The program invokes std::terminate() immediately', 'The exception is caught by main()', 'The compiler fixes it automatically'],
      answer: 1,
      explanation: 'If an exception escapes a destructor during an active stack unwinding process, C++ terminates execution immediately by calling std::terminate().'
    },
    {
      q: 'What is the primary benefit of Move Semantics introduced in C++11 via rvalue references (&&) and std::move()?',
      options: ['Eliminates the need for compilers', 'Transfers resource ownership without performing expensive deep copies of underlying data', 'Converts pointers to references', 'Speeds up compilation time'],
      answer: 1,
      explanation: 'Move semantics allow resources (such as heap buffers) of temporary rvalue objects to be transferred rather than duplicated, avoiding expensive deep copies.'
    },
    {
      q: 'In the C++ lambda expression [=, &total](int x) { ... }, what does the capture clause specify?',
      options: ['Captures nothing from outer scope', 'Captures all outer variables by value except total which is captured by reference', 'Captures all variables by reference', 'Overrides total with parameter x'],
      answer: 1,
      explanation: '[=] specifies default capture by value for outer variables, while &total explicitly specifies that total is captured by reference.'
    }
  ]
};
