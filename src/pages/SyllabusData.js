export const SYLLABUS_DATA = {
  'cpp-oop': {
    title: 'Object Oriented Programming using C++',
    desc: 'Learn object-oriented programming concepts including classes, objects, constructors, inheritance, polymorphism, abstraction, encapsulation, file handling, and exception handling using C++.',
    estTime: '45 Hours',
    unitsCount: 4,
    chaptersCount: 8,
    syllabus: [
      {
        unit: 1,
        id: 'unit-1',
        title: 'Unit 1: OOP Paradigms & C++ Fundamentals',
        chapters: [
          {
            id: 'ch-1',
            title: 'Chapter 1: Object-Oriented Philosophy',
            topics: [
              'Procedural vs Object-Oriented Programming',
              'Basic Concepts of OOP (Objects, Classes)',
              'Data Abstraction and Encapsulation',
              'Inheritance and Polymorphism',
              'Dynamic Binding and Message Passing',
              'Benefits and Applications of OOP'
            ]
          },
          {
            id: 'ch-2',
            title: 'Chapter 2: C++ Tokens & Functions',
            topics: [
              'Tokens, Expressions, and Control Structures',
              'Variables and Dynamic Initialization',
              'Scope Resolution Operator',
              'Member Dereferencing Operators',
              'Memory Management Operators (new, delete)',
              'Function Prototyping and Inline Functions',
              'Call by Reference vs Value',
              'Default Arguments and Const Arguments'
            ]
          }
        ]
      },
      {
        unit: 2,
        id: 'unit-2',
        title: 'Unit 2: Classes, Constructors & Friends',
        chapters: [
          {
            id: 'ch-3',
            title: 'Chapter 3: Classes and Objects',
            topics: [
              'Specifying a Class and Defining Member Functions',
              'Making an Outside Function Inline',
              'Nesting of Member Functions',
              'Private Member Functions',
              'Arrays within a Class and Memory Allocation',
              'Static Data Members and Static Member Functions',
              'Arrays of Objects and Objects as Function Arguments',
              'Friendly Functions (Friend Classes)'
            ]
          },
          {
            id: 'ch-4',
            title: 'Chapter 4: Constructors & Destructors',
            topics: [
              'Constructors Overview',
              'Parameterized Constructors',
              'Multiple Constructors in a Class',
              'Constructors with Default Arguments',
              'Dynamic Initialization of Objects',
              'Copy Constructors and Dynamic Constructors',
              'Destructors and Garbage Collection Concepts'
            ]
          }
        ]
      },
      {
        unit: 3,
        id: 'unit-3',
        title: 'Unit 3: Inheritance & Polymorphism',
        chapters: [
          {
            id: 'ch-5',
            title: 'Chapter 5: Extending Classes (Inheritance)',
            topics: [
              'Defining Derived Classes',
              'Single, Multilevel, and Multiple Inheritance',
              'Hierarchical and Hybrid Inheritance',
              'Virtual Base Classes',
              'Abstract Classes',
              'Constructors in Derived Classes',
              'Member Classes (Nesting of Classes)'
            ]
          },
          {
            id: 'ch-6',
            title: 'Chapter 6: Overloading & Virtual Functions',
            topics: [
              'Operator Overloading Concepts',
              'Overloading Unary and Binary Operators',
              'Overloading Binary Operators using Friends',
              'Manipulation of Strings using Operators',
              'Rules for Overloading Operators',
              'Pointers to Objects and this Pointer',
              'Virtual Functions and Pure Virtual Functions'
            ]
          }
        ]
      },
      {
        unit: 4,
        id: 'unit-4',
        title: 'Unit 4: File I/O, Templates & Exception Safety',
        chapters: [
          {
            id: 'ch-7',
            title: 'Chapter 7: Console & File I/O Operations',
            topics: [
              'C++ Streams and Stream Classes',
              'Unformatted and Formatted Console I/O',
              'Managing Output with Manipulators',
              'Classes for File Stream Operations',
              'Opening, Reading, and Writing Files',
              'Detecting End-of-File',
              'File Pointers and their Manipulations',
              'Sequential and Random Access Files'
            ]
          },
          {
            id: 'ch-8',
            title: 'Chapter 8: Templates and Exceptions',
            topics: [
              'Class Templates and Function Templates',
              'Member Function Templates',
              'Exception Handling Paradigm',
              'Try, Catch, and Throw Mechanism',
              'Specifying Exceptions and Rethrowing Exceptions'
            ]
          }
        ]
      }
    ]
  },
  'data-structures': {
    title: 'Data Structures',
    desc: 'Study arrays, linked lists, stacks, queues, trees, graphs, hashing, searching, sorting, recursion, and algorithm complexity.',
    estTime: '45 Hours',
    unitsCount: 4,
    chaptersCount: 9,
    syllabus: [
      {
        unit: 1,
        id: 'unit-1',
        title: 'Unit 1: Fundamentals of Data Structures & Arrays',
        chapters: [
          {
            id: 'ch-1',
            title: 'Chapter 1: Introduction to Data Structure',
            topics: [
              'Data Structures Introduction',
              'Classification of Data Structures',
              'Operations of Data Structures',
              'Algorithm Concepts',
              'Algorithmic Notations',
              'Control Structures',
              'Complexity Analysis',
              'Time-Space Tradeoffs'
            ]
          },
          {
            id: 'ch-2',
            title: 'Chapter 2: Arrays',
            topics: [
              'Definition and Characteristics of Arrays',
              'Classification of Arrays',
              'Representation of Linear Array',
              'Array Traversing, Insertion, and Deletion',
              'Linear Search and Binary Search',
              'Comparison of Searching Methods',
              'Bubble Sort, Selection Sort, and Insertion Sort',
              'Merge Sort and Quick Sort Algorithms',
              'Two-Dimensional and Multi-Dimensional Arrays',
              'Memory Representation (Row-Major and Column-Major)',
              'Sparse Matrices and representation'
            ]
          }
        ]
      },
      {
        unit: 2,
        id: 'unit-2',
        title: 'Unit 2: Linked Lists & Hashing Systems',
        chapters: [
          {
            id: 'ch-3',
            title: 'Chapter 3: Linked Lists',
            topics: [
              'Linked List Definition and Memory Representation',
              'Arrays vs Linked Lists Comparison',
              'Singly, Header, and Circular Linked Lists',
              'Doubly Linked Lists and Two-Way Header Lists',
              'Traversing, Insertion, Deletion, and Searching',
              'Polynomial Representation and Addition Algorithms'
            ]
          },
          {
            id: 'ch-4',
            title: 'Chapter 4: Hashing and Collision',
            topics: [
              'Hashing Concepts and Hash Table Structure',
              'Hash Functions (Division, Folding, Mid-Square)',
              'Collision Resolution Techniques',
              'Open Addressing and Linear Probing',
              'Chaining and Bucket Methods',
              'Real-world Applications of Hashing'
            ]
          }
        ]
      },
      {
        unit: 3,
        id: 'unit-3',
        title: 'Unit 3: Stack Architectures & Recursion Logic',
        chapters: [
          {
            id: 'ch-5',
            title: 'Chapter 5: Stacks',
            topics: [
              'Stack Introduction and Array Representation',
              'PUSH and POP Algorithms',
              'Linked List Stack Implementation',
              'Overflow and Underflow Conditions',
              'Polish Notation and Postfix Evaluation',
              'Infix to Postfix Conversion Algorithms'
            ]
          },
          {
            id: 'ch-6',
            title: 'Chapter 6: Recursion',
            topics: [
              'Recursion definition and mechanics',
              'Tail Recursion and Indirect Recursion',
              'Runtime Stack implementation of recursion',
              'Tower of Hanoi Puzzle Solution',
              'Euclid Algorithm for Greatest Common Divisor',
              'Recursive Sorting and Searching Algorithms'
            ]
          }
        ]
      },
      {
        unit: 4,
        id: 'unit-4',
        title: 'Unit 4: Queues, Graph Theory & Trees',
        chapters: [
          {
            id: 'ch-7',
            title: 'Chapter 7: Queues',
            topics: [
              'Queue Concepts and Array Representation',
              'Queue Operations (Enqueue, Dequeue)',
              'Queue using Linked List',
              'Circular Queue, Deque, and Priority Queue',
              'Real-world Applications of Queues'
            ]
          },
          {
            id: 'ch-8',
            title: 'Chapter 8: Graph Theory',
            topics: [
              'Graph Introduction and Terminologies',
              'Adjacency Matrix and Path Matrix representations',
              'Warshall Algorithm for Shortest Paths',
              'Linked Representation of Graphs',
              'Breadth-First Search (BFS) and Depth-First Search (DFS)'
            ]
          },
          {
            id: 'ch-9',
            title: 'Chapter 9: Trees',
            topics: [
              'Trees and Binary Tree Concepts',
              'Strictly, Extended, and Complete Binary Trees',
              'Array and Linked Representations of Binary Trees',
              'Tree Traversal Algorithms (Inorder, Preorder, Postorder)',
              'Binary Search Tree (BST) Searching and Deletion',
              'AVL Trees, Searching, and Rotation Algorithms'
            ]
          }
        ]
      }
    ]
  },
  'operating-systems': {
    title: 'Operating Systems',
    desc: 'Study the core concepts of Operating Systems including Process Management, CPU Scheduling, Process Synchronization, Deadlocks, Memory Management, Virtual Memory, I/O Management, and Disk Scheduling Algorithms.',
    estTime: '45 Hours',
    unitsCount: 4,
    chaptersCount: 6,
    syllabus: [
      {
        unit: 1,
        id: 'unit-1',
        title: 'Unit 1: Introduction & Architecture',
        chapters: [
          {
            id: 'ch-1',
            title: 'Chapter 1: Operating Systems Overview',
            topics: [
              'Definition',
              'Evolution of Operating System',
              'OS Components',
              '- Process Management',
              '- Main Memory Management',
              '- File Management',
              '- System Management',
              '- Secondary Storage Management',
              '- Protection System',
              '- Command Interpreter System',
              '- Information Management',
              'Functions / Characteristics / Services of Operating System',
              'User\'s View and System\'s View',
              'Operating System Goals',
              'Structure / Architecture of Operating System',
              '- Simple Structure',
              '- Layered Approach',
              '- Microkernels',
              '- Modules',
              'Types of Operating Systems',
              '- Batch OS',
              '- Multiprogramming OS',
              '- Multitasking OS',
              '- Time Sharing OS',
              '- Real-Time OS',
              '- Distributed OS',
              '- Network OS',
              '- Multiprocessor OS',
              '- Mobile OS',
              'Operating System Services',
              '- User Interface',
              '- Program Execution',
              '- I/O Operations',
              '- File System',
              '- Communications',
              '- Error Detection',
              '- Resource Allocation',
              '- Accounting',
              '- Protection and Security',
              'System Calls',
              '- Process Control',
              '- File Management',
              '- Device Management',
              '- Information Maintenance',
              '- Communication & Protection',
              'System Programs'
            ]
          }
        ]
      },
      {
        unit: 2,
        id: 'unit-2',
        title: 'Unit 2: Process & CPU Scheduling',
        chapters: [
          {
            id: 'ch-2',
            title: 'Chapter 2: Process Management',
            topics: [
              'Process Definition',
              'Process States',
              'Primary Process States',
              'Additional Process States',
              'Process State Transitions',
              'Process Scheduling',
              'Scheduling Queues',
              'Long-Term Scheduler',
              'Medium-Term Scheduler',
              'Short-Term Scheduler',
              'Process Control Block (PCB)',
              'Threads',
              '- Single Threaded',
              '- Multithreaded',
              '- Many-to-One',
              '- One-to-One',
              '- Many-to-Many',
              'Types of Threads'
            ]
          },
          {
            id: 'ch-3',
            title: 'Chapter 3: CPU Scheduling',
            topics: [
              'Process Scheduling',
              'CPU Scheduler',
              'Scheduling Criteria',
              'Scheduling Objectives',
              'Scheduling Algorithms',
              '- FCFS',
              '- SJF',
              '- Round Robin',
              'Performance Evaluation',
              '- Deterministic Modeling',
              '- Queueing Models',
              '- Simulations',
              '- Implementation'
            ]
          }
        ]
      },
      {
        unit: 3,
        id: 'unit-3',
        title: 'Unit 3: Synchronization & Deadlocks',
        chapters: [
          {
            id: 'ch-4',
            title: 'Chapter 4: Process Synchronization',
            topics: [
              'Process Synchronization',
              'Inter Process Communication (IPC)',
              'Mutual Exclusion',
              'Critical Section Problem',
              'General Code',
              'Necessary Conditions',
              'Two Process Solution',
              'Race Conditions',
              'Semaphores',
              'Counting Semaphores',
              'Implementing Semaphores',
              'Monitors'
            ]
          },
          {
            id: 'ch-5',
            title: 'Chapter 5: Deadlocks',
            topics: [
              'Deadlock',
              'System Model',
              'Deadlock Characterization',
              'Necessary Conditions',
              'Resource Allocation Graph',
              'Deadlock Handling Methods',
              'Deadlock Prevention',
              'Deadlock Avoidance',
              'Safe State',
              'Avoidance Algorithms',
              '- Resource Allocation Graph Method',
              '- Banker\'s Algorithm',
              '- Safety Algorithm',
              '- Resource Request Algorithm',
              '- Illustrative Example',
              'Deadlock Detection',
              '- Single Instance',
              '- Multiple Instances',
              '- Detection Algorithm',
              'Deadlock Recovery'
            ]
          }
        ]
      },
      {
        unit: 4,
        id: 'unit-4',
        title: 'Unit 4: Memory & I/O Systems',
        chapters: [
          {
            id: 'ch-6',
            title: 'Chapter 6: Memory & I/O Management',
            topics: [
              'Memory Management Background',
              'Basic Memory Hardware',
              'Address Binding',
              'Logical vs Physical Address Space',
              'Swapping',
              'Contiguous Memory Allocation',
              '- MFT',
              '- MVT',
              'Paging',
              'Segmentation',
              'Virtual Memory',
              'Demand Paging',
              'Hardware Support',
              'Advantages',
              'Performance',
              'Page Replacement Algorithms',
              '- FIFO',
              '- Optimal',
              '- LRU',
              '- LFU',
              'Allocation of Frames',
              '- Minimum Frames',
              '- Global Allocation',
              '- Local Allocation',
              'I/O Management',
              'Disk Management',
              'Polling',
              'Interrupts',
              'Direct Memory Access (DMA)',
              'Disk Structure',
              'Disk Scheduling Algorithms'
            ]
          }
        ]
      }
    ]
  },
  'web-technologies': {
    title: 'Web Technologies',
    desc: 'Learn HTML5, CSS3, JavaScript, responsive web design, forms, DOM manipulation, and modern web development fundamentals.',
    estTime: '45 Hours',
    unitsCount: 4,
    chaptersCount: 8,
    syllabus: [
      {
        unit: 1,
        id: 'unit-1',
        title: 'Unit 1: HyperText Markup (HTML5)',
        chapters: [
          {
            id: 'ch-1',
            title: 'Chapter 1: HTML5 Semantics & Elements',
            topics: [
              'HTML vs HTML5 Core Features',
              'Semantic Structure tags (header, footer, nav, article, section)',
              'Hyperlinks, Lists, Tables, and Forms',
              'New HTML5 input types and validations',
              'Audio, Video, and Canvas elements'
            ]
          },
          {
            id: 'ch-2',
            title: 'Chapter 2: Metadata & Web Best Practices',
            topics: [
              'Meta tags for SEO and Responsiveness',
              'Character encoding, language declaration',
              'Favicons and custom resources loading',
              'Web Accessibility Guidelines (WCAG) basics'
            ]
          }
        ]
      },
      {
        unit: 2,
        id: 'unit-2',
        title: 'Unit 2: Stylesheets & Grid Layouts (CSS3)',
        chapters: [
          {
            id: 'ch-3',
            title: 'Chapter 3: Styling Foundations',
            topics: [
              'CSS Selectors, Cascade, Specificity, and Inheritance',
              'CSS Box Model (margin, border, padding, height, width)',
              'Flexbox Layout Model (align-items, justify-content, flex)',
              'CSS Grid Layout (grid-template, tracks, areas, gaps)',
              'Media Queries and Mobile-First Responsive Design'
            ]
          },
          {
            id: 'ch-4',
            title: 'Chapter 4: Advanced Styling & Animations',
            topics: [
              'Transitions, Transforms (2D/3D), and Keyframe Animations',
              'CSS Custom Properties (Variables)',
              'Gradient backgrounds, shadows (box-shadow, text-shadow)',
              'CSS Preprocessors (Sass/SCSS) concepts'
            ]
          }
        ]
      },
      {
        unit: 3,
        id: 'unit-3',
        title: 'Unit 3: Client-Side Scripting (JavaScript)',
        chapters: [
          {
            id: 'ch-5',
            title: 'Chapter 5: JS Basics & Programming Structure',
            topics: [
              'Variables, Scopes (var, let, const), Data Types',
              'Control structures, Arrays, and Functions',
              'Objects, Methods, prototype inheritance',
              'Closures and Scope Chain'
            ]
          },
          {
            id: 'ch-6',
            title: 'Chapter 6: DOM Manipulation & Event Loop',
            topics: [
              'Selecting DOM elements (querySelector, getElementById)',
              'Modifying elements, text, attributes, and styles',
              'Event Handling: Listeners, Bubbling, and Capturing',
              'Form Handling and client-side validation',
              'Local Storage and Session Storage APIs'
            ]
          }
        ]
      },
      {
        unit: 4,
        id: 'unit-4',
        title: 'Unit 4: Modern JS & Network Operations',
        chapters: [
          {
            id: 'ch-7',
            title: 'Chapter 7: ES6+ Features & Promises',
            topics: [
              'Arrow Functions, Destructuring, Spread/Rest operators',
              'Template Literals, Modules (import/export)',
              'Asynchronous JavaScript concepts',
              'Promises, Chaining, Catching errors',
              'Async/Await keywords and control flow'
            ]
          },
          {
            id: 'ch-8',
            title: 'Chapter 8: AJAX & APIs Connection',
            topics: [
              'AJAX concepts, JSON format structure',
              'Fetch API for network requests (GET, POST, etc.)',
              'Working with public REST APIs',
              'Web Tooling: npm, webpack, build pipelines basics'
            ]
          }
        ]
      }
    ]
  },
  'java-oop': {
    title: 'Object Oriented Programming using Java',
    desc: 'Study Java programming, OOP concepts, classes, objects, inheritance, interfaces, exception handling, collections, multithreading, and file handling.',
    estTime: '45 Hours',
    unitsCount: 4,
    chaptersCount: 8,
    syllabus: [
      {
        unit: 1,
        id: 'unit-1',
        title: 'Unit 1: Java Platforms & OOP Core',
        chapters: [
          {
            id: 'ch-1',
            title: 'Chapter 1: Java Overview',
            topics: [
              'Java Programming history, design goals, and buzzwords',
              'Java VM Structure (bytecode, JIT compilation)',
              'JRE vs JDK development nodes',
              'Java Basic Syntax: Variables, Datatypes, Operators, Control Loops',
              'Arrays: Single and Multi-dimensional'
            ]
          },
          {
            id: 'ch-2',
            title: 'Chapter 2: Classes & Objects in Java',
            topics: [
              'Defining Classes, Creating Objects, Instance Variables',
              'Methods declaration, Parameter passing, return values',
              'Constructors: Overloading, Default, Parameterized',
              'The \'this\' keyword and garbage collection parameters',
              'Method Overloading, static fields, and static methods'
            ]
          }
        ]
      },
      {
        unit: 2,
        id: 'unit-2',
        title: 'Unit 2: Inheritance, Packages & Interfaces',
        chapters: [
          {
            id: 'ch-3',
            title: 'Chapter 3: Extending & Polymorphism',
            topics: [
              'Inheritance: Single, Multilevel, and Hierarchical structures',
              'Method Overriding and Dynamic Method Dispatch',
              'Using \'super\' for constructors and members',
              'Abstract Classes and final keyword (variables, methods, classes)',
              'Object class and its common methods'
            ]
          },
          {
            id: 'ch-4',
            title: 'Chapter 4: Packages & Interfaces',
            topics: [
              'Defining and Importing Packages, CLASSPATH configuration',
              'Access Protection: public, protected, private, default',
              'Defining, implementing, and extending Interfaces',
              'Simulating Multiple Inheritance via Interfaces',
              'Nested classes and anonymous inner classes'
            ]
          }
        ]
      },
      {
        unit: 3,
        id: 'unit-3',
        title: 'Unit 3: Exception Safety & Multithreading',
        chapters: [
          {
            id: 'ch-5',
            title: 'Chapter 5: Exception Handling',
            topics: [
              'Exception Handling fundamentals, Checked vs Unchecked',
              'Using try, catch, throw, throws, and finally',
              'Multiple catch blocks, nested try statements',
              'Creating Custom Exceptions extending Exception class',
              'Built-in Runtime exceptions'
            ]
          },
          {
            id: 'ch-6',
            title: 'Chapter 6: Multithreading',
            topics: [
              'Java Thread Model: Thread lifecycle and states',
              'Creating Threads: extending Thread class vs implementing Runnable',
              'Thread priority, daemon threads, main thread control',
              'Thread Synchronization: synchronized methods and blocks',
              'Inter-thread Communication: wait(), notify(), notifyAll()'
            ]
          }
        ]
      },
      {
        unit: 4,
        id: 'unit-4',
        title: 'Unit 4: Java Collections & I/O Streams',
        chapters: [
          {
            id: 'ch-7',
            title: 'Chapter 7: Java Collections Framework',
            topics: [
              'Collections Overview and Hierarchy interfaces',
              'List structures: ArrayList, LinkedList, Vector',
              'Set structures: HashSet, LinkedHashSet, TreeSet',
              'Map structures: HashMap, LinkedHashMap, TreeMap',
              'Iterators: Iterator, ListIterator, For-each loop'
            ]
          },
          {
            id: 'ch-8',
            title: 'Chapter 8: I/O Streams & Serialization',
            topics: [
              'Java File Handling, File class methods',
              'Byte Streams (FileInputStream, FileOutputStream)',
              'Character Streams (FileReader, FileWriter, BufferedReader)',
              'Serialization and Deserialization using Serializable interface',
              'Transient variables'
            ]
          }
        ]
      }
    ]
  },
  'indian-constitution': {
    title: 'Indian Constitution',
    desc: 'Understand the Constitution of India, Fundamental Rights, Fundamental Duties, Directive Principles, constitutional values, governance, and democratic institutions.',
    estTime: '45 Hours',
    unitsCount: 4,
    chaptersCount: 8,
    syllabus: [
      {
        unit: 1,
        id: 'unit-1',
        title: 'Unit 1: Making & Salient Features',
        chapters: [
          {
            id: 'ch-1',
            title: 'Chapter 1: Historical Framing & Assembly',
            topics: [
              'Constitutional History, British Acts influence',
              'Constituent Assembly: Composition, Drafting Committee roles',
              'The Preamble: Sovereign, Socialist, Secular, Democratic, Republic',
              'Values of Justice, Liberty, Equality, and Fraternity'
            ]
          },
          {
            id: 'ch-2',
            title: 'Chapter 2: Structural Characteristics',
            topics: [
              'Federal vs Unitary characteristics of the Constitution',
              'Salient Features: Written, Lengthiest, Rigidity vs Flexibility',
              'Sources of the Indian Constitution (borrowed features)',
              'Amendment Procedures (Article 368) and Basic Structure Doctrine'
            ]
          }
        ]
      },
      {
        unit: 2,
        id: 'unit-2',
        title: 'Unit 2: Fundamental Principles & Rights',
        chapters: [
          {
            id: 'ch-3',
            title: 'Chapter 3: Fundamental Rights & Remedies',
            topics: [
              'Articles 12 to 35: Core Philosophy',
              'Right to Equality (Articles 14-18), Right to Freedom (Articles 19-22)',
              'Right against Exploitation, Freedom of Religion, Cultural & Educational Rights',
              'Right to Constitutional Remedies (Article 32), Writs (Habeas Corpus, Mandamus, etc.)',
              'Suspension of Fundamental Rights during Emergency'
            ]
          },
          {
            id: 'ch-4',
            title: 'Chapter 4: DPSPs and Fundamental Duties',
            topics: [
              'Directive Principles of State Policy (DPSPs): Concepts, Classification',
              'Socialist, Gandhian, Liberal-Intellectual Principles',
              'DPSPs vs Fundamental Rights conflict resolution',
              'Fundamental Duties (Article 51A) and citizens responsibilities'
            ]
          }
        ]
      },
      {
        unit: 3,
        id: 'unit-3',
        title: 'Unit 3: Union Government & Legislature',
        chapters: [
          {
            id: 'ch-5',
            title: 'Chapter 5: Executive Power',
            topics: [
              'Union Executive: President (Powers, Election, Impeachment)',
              'Vice-President role and functions',
              'Prime Minister and Council of Ministers (collective responsibility)'
            ]
          },
          {
            id: 'ch-6',
            title: 'Chapter 6: Parliamentary Structure',
            topics: [
              'Parliament: Lok Sabha and Rajya Sabha composition',
              'Legislative Procedures (Ordinary Bills, Money Bills, Joint Sessions)',
              'Speaker of Lok Sabha: Powers and Functions',
              'Parliamentary Committees and Privileges'
            ]
          }
        ]
      },
      {
        unit: 4,
        id: 'unit-4',
        title: 'Unit 4: Judiciary, Local Bodies & Authorities',
        chapters: [
          {
            id: 'ch-7',
            title: 'Chapter 7: Judicial System',
            topics: [
              'Supreme Court: Composition, Jurisdiction (Original, Appellate, Advisory)',
              'High Courts and Subordinate Judiciary system',
              'Judicial Review and Judicial Activism concepts',
              'Public Interest Litigation (PIL) history and impact'
            ]
          },
          {
            id: 'ch-8',
            title: 'Chapter 8: Local Bodies & Commissions',
            topics: [
              'Panchayati Raj Institution: 73rd Constitutional Amendment',
              'Urban Local Bodies: 74th Constitutional Amendment',
              'Election Commission of India: Structure and Powers',
              'Union Public Service Commission (UPSC) and state commissions'
            ]
          }
        ]
      }
    ]
  },

  'probability-and-statistics': {
    title: 'Probability & Statistics',
    desc: 'Descriptive statistics, probability distributions, hypothesis testing, and statistical inferences for computing.',
    estTime: '50 Hours',
    unitsCount: 4,
    chaptersCount: 8,
    syllabus: [
      {
        unit: 1,
        id: 'unit-1',
        title: 'Unit 1: Descriptive Statistics & Data Visualization',
        chapters: [
          { id: 'ch-1', title: 'Chapter 1: Measures of Central Tendency & Dispersion', topics: ['Mean, Median, Mode', 'Variance, Standard Deviation', 'Skewness & Kurtosis'] },
          { id: 'ch-2', title: 'Chapter 2: Correlation & Regression Analysis', topics: ['Pearson Correlation Coefficient', 'Spearman Rank Correlation', 'Linear Regression Lines'] }
        ]
      },
      {
        unit: 2,
        id: 'unit-2',
        title: 'Unit 2: Probability Theory & Random Variables',
        chapters: [
          { id: 'ch-3', title: 'Chapter 3: Probability Fundamentals & Bayes Theorem', topics: ['Sample Spaces & Events', 'Conditional Probability', 'Bayes Theorem & Applications'] },
          { id: 'ch-4', title: 'Chapter 4: Probability Distributions', topics: ['Binomial & Poisson Distributions', 'Normal Distribution & Z-Scores', 'Continuous Random Variables'] }
        ]
      }
    ]
  },

  'dbms': {
    title: 'Database Management System (DBMS)',
    desc: 'Relational database design, ER modeling, SQL query optimization, normalization, and ACID transactions.',
    estTime: '60 Hours',
    unitsCount: 4,
    chaptersCount: 8,
    syllabus: [
      {
        unit: 1,
        id: 'unit-1',
        title: 'Unit 1: Database Architecture & ER Modeling',
        chapters: [
          { id: 'ch-1', title: 'Chapter 1: Introduction to DBMS Architecture', topics: ['DBMS vs File Processing System', 'Three-Schema Architecture', 'Data Independence (Physical & Logical)'] },
          { id: 'ch-2', title: 'Chapter 2: Entity-Relationship (ER) Data Modeling', topics: ['Entities, Attributes & Relationships', 'ER Diagram Notations', 'Conversion of ER Diagrams to Relational Tables'] }
        ]
      },
      {
        unit: 2,
        id: 'unit-2',
        title: 'Unit 2: Relational Model, SQL & Normalization',
        chapters: [
          { id: 'ch-3', title: 'Chapter 3: Relational Algebra & Structured Query Language (SQL)', topics: ['SELECT, WHERE, GROUP BY, HAVING', 'JOIN Operations (INNER, LEFT, RIGHT)', 'Nested Subqueries'] },
          { id: 'ch-4', title: 'Chapter 4: Database Normalization & Functional Dependencies', topics: ['1NF, 2NF, 3NF, BCNF Normal Forms', 'Lossless Join Decomposition', 'Dependency Preservation'] }
        ]
      }
    ]
  },

  'software-engineering': {
    title: 'Software Engineering',
    desc: 'Software development life cycle (SDLC), Agile methodologies, software testing, UML modeling, and architecture.',
    estTime: '45 Hours',
    unitsCount: 4,
    chaptersCount: 8,
    syllabus: [
      {
        unit: 1,
        id: 'unit-1',
        title: 'Unit 1: Software Development Life Cycle & Agile',
        chapters: [
          { id: 'ch-1', title: 'Chapter 1: SDLC Models (Waterfall, Spiral, Agile Scrum)', topics: ['Waterfall & Incremental Models', 'Agile Principles & Scrum Framework', 'Requirements Engineering & SRS'] },
          { id: 'ch-2', title: 'Chapter 2: UML Diagrams & Software Design Patterns', topics: ['Use Case, Class, Sequence Diagrams', 'Architectural Design Patterns', 'Component-Based Design'] }
        ]
      }
    ]
  },

  'feature-engineering': {
    title: 'Feature Engineering',
    desc: 'Data preprocessing, feature selection, transformation, encoding, and dimensional reduction for ML models.',
    estTime: '50 Hours',
    unitsCount: 4,
    chaptersCount: 8,
    syllabus: [
      {
        unit: 1,
        id: 'unit-1',
        title: 'Unit 1: Data Preprocessing & Feature Extraction',
        chapters: [
          { id: 'ch-1', title: 'Chapter 1: Missing Value Imputation & Outlier Handling', topics: ['Mean/Median/KNN Imputation', 'IQR & Z-score Outlier Filtering', 'Categorical One-Hot & Target Encoding'] },
          { id: 'ch-2', title: 'Chapter 2: Feature Scaling & Dimensionality Reduction', topics: ['MinMax & Standard Scaler', 'Principal Component Analysis (PCA)', 'Feature Selection Techniques'] }
        ]
      }
    ]
  },

  'data-analytics-spreadsheets': {
    title: 'Basics of Data Analytics using Spreadsheets',
    desc: 'Excel & spreadsheet data cleaning, pivot tables, VLOOKUP/XLOOKUP, formulas, data visualization, and reporting.',
    estTime: '40 Hours',
    unitsCount: 4,
    chaptersCount: 8,
    syllabus: [
      {
        unit: 1,
        id: 'unit-1',
        title: 'Unit 1: Spreadsheet Formulas & Data Wrangling',
        chapters: [
          { id: 'ch-1', title: 'Chapter 1: Advanced Excel Formulas & Lookup Functions', topics: ['VLOOKUP, XLOOKUP, INDEX & MATCH', 'IF, SUMIFS, COUNTIFS Conditionals', 'Data Text-to-Columns & Cleaning'] },
          { id: 'ch-2', title: 'Chapter 2: Pivot Tables & Visual Analytics Dashboards', topics: ['Creating Interactive Pivot Tables', 'Calculated Fields & Slicers', 'Chart Dashboards & KPI Summaries'] }
        ]
      }
    ]
  }
};
