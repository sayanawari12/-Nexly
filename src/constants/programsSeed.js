import C_PROGRAMS_RAW from '../pages/programs_data.json';

// Helper to map difficulty based on C category
const getDifficulty = (category) => {
  if (['Basic', 'Control Flow'].includes(category)) return 'Easy';
  if (['Arrays', 'Strings', 'Functions'].includes(category)) return 'Medium';
  return 'Hard'; // Pointers, Structures, File Handling
};

// Map the C programs from programs_data.json
const mappedCPrograms = [];
Object.entries(C_PROGRAMS_RAW).forEach(([category, list]) => {
  list.forEach(p => {
    mappedCPrograms.push({
      id: p.id,
      title: p.title,
      subject: 'c-programming',
      category: category,
      difficulty: getDifficulty(category),
      estimatedTime: '15 mins',
      description: p.statement,
      problemStatement: `Write a program in C to implement "${p.title}".\n\nRequirements:\n- Handle standard inputs.\n- Print correct values on terminal.`,
      algorithm: p.flow && p.flow.length > 0
        ? p.flow.map((step, idx) => `${idx + 1}. ${step}`).join('\n')
        : '1. Start\n2. Declare variables\n3. Get user input\n4. Execute logic\n5. Print output\n6. End',
      code: p.code,
      output: p.expectedOutput || 'Program execution successful.',
      explanation: p.whyOutput || 'The program executes standard sequential steps based on C language paradigms.',
      timeComplexity: p.complexity || 'O(1)',
      spaceComplexity: p.space || 'O(1)',
      tags: p.concepts || ['C Basics'],
      relatedPrograms: list.filter(other => other.id !== p.id).slice(0, 3).map(other => other.id)
    });
  });
});

// Additional programs for C++, Java, Python, Data Structures, Operating System, DBMS, and Computer Networks
const otherSubjectsPrograms = [
  // C++ OOP Programs
  {
    id: 'cpp_oop_1',
    title: 'Class and Object Basics',
    subject: 'cpp',
    category: 'Object Oriented Programming',
    difficulty: 'Easy',
    estimatedTime: '10 mins',
    description: 'Demonstrates basic class declaration, object instantiation, constructor initialization, and public member function execution in C++.',
    problemStatement: 'Define a "Student" class containing name, roll number, and grade fields. Instantiate an object and display its details using a member function.',
    algorithm: '1. Define Student class with private fields: name, rollNo, grade.\n2. Write parameterized constructor to initialize fields.\n3. Add displayDetails() function to print values to stdout.\n4. Inside main(), instantiate Student object.\n5. Call displayDetails() on the object.',
    code: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Student {\nprivate:\n    string name;\n    int rollNo;\n    char grade;\n\npublic:\n    Student(string n, int r, char g) : name(n), rollNo(r), grade(g) {}\n\n    void displayDetails() {\n        cout << "Name: " << name << endl;\n        cout << "Roll No: " << rollNo << endl;\n        cout << "Grade: " << grade << endl;\n    }\n};\n\nint main() {\n    Student s1("Sayan Awari", 12, 'A');\n    s1.displayDetails();\n    return 0;\n}`,
    output: 'Name: Sayan Awari\nRoll No: 12\nGrade: A',
    explanation: 'The Student class encapsulates the data fields. A parameterized constructor assigns inputs during instantiation. The displayDetails() public member function provides terminal access to read the state.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    tags: ['Classes', 'Objects', 'OOP Basics'],
    relatedPrograms: ['cpp_oop_2']
  },
  {
    id: 'cpp_oop_2',
    title: 'Inheritance and Polymorphism',
    subject: 'cpp',
    category: 'Object Oriented Programming',
    difficulty: 'Medium',
    estimatedTime: '20 mins',
    description: 'Demonstrates class inheritance and virtual function polymorphism in C++.',
    problemStatement: 'Create a base class "Animal" with a virtual function "sound()". Create derived classes "Dog" and "Cat" that override sound(). Show runtime polymorphism.',
    algorithm: '1. Define base class Animal with virtual sound() function.\n2. Define Dog and Cat classes inherited from Animal.\n3. Override sound() in Dog to print "Woof!" and Cat to print "Meow!".\n4. Use Animal pointer to point toDog/Cat instances at runtime.\n5. Trigger sound() function through base pointer.',
    code: `#include <iostream>\nusing namespace std;\n\nclass Animal {\npublic:\n    virtual void sound() {\n        cout << "Some generic animal sound" << endl;\n    }\n};\n\nclass Dog : public Animal {\npublic:\n    void sound() override {\n        cout << "Dog barks: Woof! Woof!" << endl;\n    }\n};\n\nclass Cat : public Animal {\npublic:\n    void sound() override {\n        cout << "Cat meows: Meow! Meow!" << endl;\n    }\n};\n\nint main() {\n    Animal* animal;\n    Dog dog;\n    Cat cat;\n\n    animal = &dog;\n    animal->sound();\n\n    animal = &cat;\n    animal->sound();\n\n    return 0;\n}`,
    output: 'Dog barks: Woof! Woof!\nCat meows: Meow! Meow!',
    explanation: 'Declaring sound() as virtual in Animal enables dynamic dispatch. Directing the base Animal pointer to child objects enables polymorphism during compilation and resolves function bindings dynamically at runtime.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    tags: ['Inheritance', 'Polymorphism', 'Virtual Functions'],
    relatedPrograms: ['cpp_oop_1']
  },
  
  // Java Programs
  {
    id: 'java_basic_1',
    title: 'Hello World and Main Method Structure',
    subject: 'java',
    category: 'Basic Java',
    difficulty: 'Easy',
    estimatedTime: '8 mins',
    description: 'Introduction to class wrapper syntax and public static void main execution parameters in Java.',
    problemStatement: 'Write a basic Java program to print a customized hello message and input command arguments to the console.',
    algorithm: '1. Create public class HelloWorld.\n2. Add public static void main(String[] args) entry method.\n3. Use System.out.println() to print a string to standard output.\n4. Compile with javac and run with java virtual machine.',
    code: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello World from Java!");\n    }\n}`,
    output: 'Hello World from Java!',
    explanation: 'In Java, all executable statements must reside inside a class wrapper. The main method is static, allowing the JVM to invoke it directly without creating a prior object instance.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    tags: ['Java Basics', 'OOP Wrapper'],
    relatedPrograms: ['java_thread_1']
  },
  {
    id: 'java_thread_1',
    title: 'Multi-threading using Runnable Interface',
    subject: 'java',
    category: 'Concurrency',
    difficulty: 'Hard',
    estimatedTime: '25 mins',
    description: 'Demonstrates multi-threaded task scheduling and concurrent execution flow in Java.',
    problemStatement: 'Create a background task implementing the Runnable interface. Launch three concurrent threads and verify overlapping terminal prints.',
    algorithm: '1. Create task class implementing Runnable interface.\n2. Override run() to execute a loops printing thread names and sleep intervals.\n3. Inside main(), wrap tasks inside Thread objects.\n4. Invoke thread.start() to allocate scheduling contexts.\n5. Wait for active execution completions.',
    code: `class TaskRunner implements Runnable {\n    private String name;\n    public TaskRunner(String name) { this.name = name; }\n\n    @Override\n    public void run() {\n        for(int i = 1; i <= 3; i++) {\n            System.out.println(name + " - iteration " + i);\n            try {\n                Thread.sleep(100);\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n        }\n    }\n}\n\npublic class ThreadDemo {\n    public static void main(String[] args) {\n        Thread t1 = new Thread(new TaskRunner("Thread-A"));\n        Thread t2 = new Thread(new TaskRunner("Thread-B"));\n        t1.start();\n        t2.start();\n    }\n}`,
    output: 'Thread-A - iteration 1\nThread-B - iteration 1\nThread-A - iteration 2\nThread-B - iteration 2\nThread-A - iteration 3\nThread-B - iteration 3',
    explanation: 'Runnable defines the entry task. start() allocates thread stacks and triggers asynchronous context swaps. Sleep pauses simulate parallel process timing behaviors.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    tags: ['Concurrency', 'Threads', 'Runnable'],
    relatedPrograms: ['java_basic_1']
  },

  // Python Programs
  {
    id: 'python_basic_1',
    title: 'List Comprehensions and Filtering',
    subject: 'python',
    category: 'Python Basics',
    difficulty: 'Easy',
    estimatedTime: '8 mins',
    description: 'Demonstrates Pythonic concise list creations and conditional filtering methods.',
    problemStatement: 'Create a filtered array containing squares of even numbers from a source list of values 1 to 10.',
    algorithm: '1. Create a range list from 1 to 10.\n2. Run a list comprehension [x**2 for x in nums if x % 2 == 0].\n3. Print the resulting list.',
    code: `def get_even_squares():\n    nums = list(range(1, 11))\n    squares = [x**2 for x in nums if x % 2 == 0]\n    print("Original numbers:", nums)\n    print("Even squares:", squares)\n\nif __name__ == "__main__":\n    get_even_squares()`,
    output: 'Original numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nEven squares: [4, 16, 36, 64, 100]',
    explanation: 'Python list comprehensions combine loops and conditional branches into a single line. This reduces syntactic overhead and runs optimized loops inside the runtime.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    tags: ['List Comprehension', 'Python Basics', 'Filtering'],
    relatedPrograms: ['python_decorator_1']
  },
  {
    id: 'python_decorator_1',
    title: 'Custom Function Decorators',
    subject: 'python',
    category: 'Advanced Python',
    difficulty: 'Medium',
    estimatedTime: '15 mins',
    description: 'Learn closures, first-class functions, and functional wrappers using Python decorators.',
    problemStatement: 'Write a decorator to measure and print the execution time of any function wrapper log in Python.',
    algorithm: '1. Write log_decorator taking standard func parameter.\n2. Define wrapper inside it to intercept calling arguments.\n3. Insert print tags before and after inner func execution.\n4. Return reference to wrapper closure.\n5. Attach decorator above target function with @ syntax.',
    code: `def my_decorator(func):\n    def wrapper(*args, **kwargs):\n        print("[LOG] Intercepting function execution...")\n        result = func(*args, **kwargs)\n        print("[LOG] Execution completed successfully.")\n        return result\n    return wrapper\n\n@my_decorator\ndef greet(name):\n    print(f"Hello, {name}!")\n\nif __name__ == "__main__":\n    greet("Sayan")`,
    output: '[LOG] Intercepting function execution...\nHello, Sayan!\n[LOG] Execution completed successfully.',
    explanation: '@my_decorator routes greet calls through the closure wrapper, enabling dynamic aspect-oriented functionality without modifying the core function code.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    tags: ['Decorators', 'Closures', 'First Class Functions'],
    relatedPrograms: ['python_basic_1']
  },

  // Data Structures Programs
  {
    id: 'ds_list_1',
    title: 'Singly Linked List Node Insertion',
    subject: 'data-structures',
    category: 'Linked List',
    difficulty: 'Medium',
    estimatedTime: '25 mins',
    description: 'Creation of pointers and dynamic structure allocations representing list linked chains.',
    problemStatement: 'Implement a singly linked list inserting nodes at the head. Render lists sequentially.',
    algorithm: '1. Create Node structure with int data and Node* next pointer.\n2. Maintain head pointer initialized to NULL.\n3. Insert function allocates dynamic memory for new node, links next to head, and shifts head forward.\n4. Traverse list checking node next pointers to print values.',
    code: `#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\nclass LinkedList {\nprivate:\n    Node* head;\n\npublic:\n    LinkedList() : head(nullptr) {}\n\n    void insertAtHead(int val) {\n        Node* newNode = new Node(val);\n        newNode->next = head;\n        head = newNode;\n    }\n\n    void printList() {\n        Node* temp = head;\n        while (temp != nullptr) {\n            cout << temp->data << " -> ";\n            temp = temp->next;\n        }\n        cout << "NULL" << endl;\n    }\n};\n\nint main() {\n    LinkedList list;\n    list.insertAtHead(30);\n    list.insertAtHead(20);\n    list.insertAtHead(10);\n    list.printList();\n    return 0;\n}`,
    output: '10 -> 20 -> 30 -> NULL',
    explanation: 'Memory is allocated dynamically on the heap. Shifting next address targets maps nodes in a linear list chain.',
    timeComplexity: 'O(1) insertion, O(N) traversal',
    spaceComplexity: 'O(N)',
    tags: ['Linked List', 'Pointers', 'Data Structures'],
    relatedPrograms: ['ds_tree_1']
  },
  {
    id: 'ds_tree_1',
    title: 'Binary Search Tree Traversals',
    subject: 'data-structures',
    category: 'Trees',
    difficulty: 'Hard',
    estimatedTime: '30 mins',
    description: 'Recursion and tree nodes traversing implementations.',
    problemStatement: 'Construct a BST and print nodes using pre-order, in-order, and post-order traversals.',
    algorithm: '1. Define Node: left, right, key.\n2. Build insert function: recursively place elements depending on value comparison.\n3. Write Inorder: left -> node -> right.\n4. Write Preorder: node -> left -> right.\n5. Write Postorder: left -> right -> node.',
    code: `#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int key;\n    Node* left;\n    Node* right;\n    Node(int val) : key(val), left(nullptr), right(nullptr) {}\n};\n\nNode* insert(Node* root, int key) {\n    if (root == nullptr) return new Node(key);\n    if (key < root->key) root->left = insert(root->left, key);\n    else root->right = insert(root->right, key);\n    return root;\n}\n\nvoid inorder(Node* root) {\n    if (root != nullptr) {\n        inorder(root->left);\n        cout << root->key << " ";\n        inorder(root->right);\n    }\n}\n\nint main() {\n    Node* root = nullptr;\n    root = insert(root, 50);\n    insert(root, 30);\n    insert(root, 70);\n    cout << "Inorder: ";\n    inorder(root);\n    cout << endl;\n    return 0;\n}`,
    output: 'Inorder: 30 50 70',
    explanation: 'Elements smaller than the root flow left, larger elements flow right. Recursive traversals load execution stack context for clean tree parsing.',
    timeComplexity: 'O(log N) average, O(H) recursion depth',
    spaceComplexity: 'O(N)',
    tags: ['Trees', 'Recursion', 'Binary Search Tree'],
    relatedPrograms: ['ds_list_1']
  },

  // Operating Systems
  {
    id: 'os_cpu_1',
    title: 'First Come First Served (FCFS) CPU Scheduling',
    subject: 'operating-system',
    category: 'CPU Scheduling',
    difficulty: 'Medium',
    estimatedTime: '20 mins',
    description: 'Calculates waiting and turnaround processing times on process execution sequences.',
    problemStatement: 'Given process arrival and burst times, schedule them using FCFS rules and compute scheduling metrics.',
    algorithm: '1. Arrange process index in ascending Arrival Time.\n2. Completion Time[i] = Completion Time[i-1] + Burst Time[i].\n3. Turnaround Time = Completion Time - Arrival Time.\n4. Waiting Time = Turnaround Time - Burst Time.',
    code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid calculateTimes(vector<int>& burst, vector<int>& wait, vector<int>& tat) {\n    int n = burst.size();\n    wait[0] = 0;\n    tat[0] = burst[0];\n    for (int i = 1; i < n; i++) {\n        wait[i] = wait[i-1] + burst[i-1];\n        tat[i] = wait[i] + burst[i];\n    }\n}\n\nint main() {\n    vector<int> burst = {10, 5, 8};\n    vector<int> wait(3), tat(3);\n    calculateTimes(burst, wait, tat);\n    cout << "Process 1 WT: " << wait[0] << " TAT: " << tat[0] << endl;\n    cout << "Process 2 WT: " << wait[1] << " TAT: " << tat[1] << endl;\n    return 0;\n}`,
    output: 'Process 1 WT: 0 TAT: 10\nProcess 2 WT: 10 TAT: 15',
    explanation: 'FCFS runs processes sequentially as they arrive. Waiting time accumulates based on previously executed processes.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    tags: ['CPU Scheduling', 'Operating System', 'FCFS'],
    relatedPrograms: []
  },

  // DBMS
  {
    id: 'dbms_sql_1',
    title: 'DDL and DML SQL Queries',
    subject: 'dbms',
    category: 'SQL Commands',
    difficulty: 'Easy',
    estimatedTime: '10 mins',
    description: 'Creating tables, inserting rows, and run filters.',
    problemStatement: 'Write SQL statements to create an "Employees" table and fetch staff working in Sales.',
    algorithm: '1. CREATE TABLE with attributes.\n2. INSERT INTO rows values.\n3. SELECT attributes FROM table WHERE criteria.',
    code: `CREATE TABLE Employees (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    department VARCHAR(50),\n    salary INT\n);\n\nINSERT INTO Employees VALUES (1, 'Alice', 'Sales', 50000);\nINSERT INTO Employees VALUES (2, 'Bob', 'Engineering', 80000);\n\nSELECT * FROM Employees WHERE department = 'Sales';`,
    output: 'id | name  | department | salary\n1  | Alice | Sales      | 50000',
    explanation: 'DDL sets structure layout definition. DML handles row inputs and conditional projections.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    tags: ['SQL', 'DBMS', 'DDL', 'DML'],
    relatedPrograms: []
  },

  // Computer Networks
  {
    id: 'cn_socket_1',
    title: 'TCP Socket Programming Interface',
    subject: 'computer-networks',
    category: 'Socket Programming',
    difficulty: 'Hard',
    estimatedTime: '30 mins',
    description: 'Opening socket ports, bind addresses, and listen for remote client packets.',
    problemStatement: 'Demonstrate socket, bind, listen and accept calling sequences for a server in C.',
    algorithm: '1. Create endpoint: socket().\n2. Assign port & IP: bind().\n3. Establish wait queue: listen().\n4. Establish client context: accept().',
    code: `#include <iostream>\n#include <sys/socket.h>\n#include <netinet/in.h>\n#include <unistd.h>\nusing namespace std;\n\nint main() {\n    int server_fd = socket(AF_INET, SOCK_STREAM, 0);\n    if (server_fd < 0) {\n        cout << "Socket open failed" << endl;\n        return 1;\n    }\n    cout << "TCP server socket created successfully" << endl;\n    close(server_fd);\n    return 0;\n}`,
    output: 'TCP server socket created successfully',
    explanation: 'socket() gets file descriptor. AF_INET indicates IPv4 network addressing namespace.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    tags: ['Sockets', 'Networking', 'TCP'],
    relatedPrograms: []
  }
];

export const ALL_SEEDED_PROGRAMS = [...mappedCPrograms, ...otherSubjectsPrograms];
