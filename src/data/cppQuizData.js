export const CPP_QUIZ_DATA = {
  beginner: [
    {
      q: 'Who developed the C++ programming language?',
      options: ['Dennis Ritchie', 'Bjarne Stroustrup', 'James Gosling', 'Guido van Rossum'],
      answer: 1,
      explanation: 'Bjarne Stroustrup created C++ at Bell Labs in 1979 as an enhancement to the C language, initially named "C with Classes".'
    },
    {
      q: 'Which header file is required to perform standard input and output operations using cin and cout in C++?',
      options: ['<stdio.h>', '<iostream>', '<stdlib.h>', '<stream.h>'],
      answer: 1,
      explanation: '<iostream> defines the standard stream objects such as std::cin, std::cout, std::cerr, and std::clog.'
    },
    {
      q: 'Which C++11 keyword enables automatic type deduction of a variable from its initializer?',
      options: ['var', 'let', 'auto', 'dynamic'],
      answer: 2,
      explanation: 'The auto keyword instructs the compiler to deduce the variable\'s type at compile time based on its initialization expression.'
    },
    {
      q: 'What does the scope resolution operator (::) do in C++?',
      options: ['Accesses pointer memory', 'Resolves global or namespace/class scope', 'Performs bitwise XOR', 'Multiplies references'],
      answer: 1,
      explanation: 'The scope resolution operator (::) qualifies identifiers to specify their namespace, class, or global scope.'
    },
    {
      q: 'What will be the output of the expression: (10 > 5) ? 100 : 200?',
      options: ['100', '200', 'true', 'false'],
      answer: 0,
      explanation: 'The ternary conditional operator evaluates (10 > 5) as true, so it returns the first operand: 100.'
    },
    {
      q: 'Which loop construct introduced in C++11 provides clean syntax to iterate over all elements in a container or array?',
      options: ['for_each loop', 'Range-based for loop', 'Enhanced while loop', 'Iterator loop'],
      answer: 1,
      explanation: 'Range-based for loops (for (const auto &item : collection)) iterate sequentially over elements in any iterable collection.'
    },
    {
      q: 'How is pass-by-reference declared in a C++ function parameter list?',
      options: ['void func(int *x)', 'void func(int &x)', 'void func(ref int x)', 'void func(int @x)'],
      answer: 1,
      explanation: 'The & symbol in a parameter type denotes a reference, allowing the function to modify the caller\'s original argument directly.'
    },
    {
      q: 'In C++, what is the index of the last element in an array declared as int arr[10];?',
      options: ['10', '9', '11', '0'],
      answer: 1,
      explanation: 'C++ arrays are 0-indexed, so an array of size 10 has valid indices ranging from 0 to 9.'
    },
    {
      q: 'Which member function of std::string returns the number of characters in the string?',
      options: ['length() and size()', 'count()', 'capacity()', 'strlen()'],
      answer: 0,
      explanation: 'In std::string, both .length() and .size() are synonyms that return the count of characters currently stored in the string.'
    },
    {
      q: 'What is the default access specifier for members of a class in C++?',
      options: ['public', 'private', 'protected', 'internal'],
      answer: 1,
      explanation: 'Members of a C++ class are private by default, whereas members of a struct are public by default.'
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
