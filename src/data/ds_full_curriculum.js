/**
 * Semester 2 — Data Structures (BCA-202)
 * Complete Digital Learning Module Extracted 100% Faithfully from Handwritten Notes PDF
 * 
 * 9 Units • 56 Questions
 */

export const DS_UNITS = [
  { id: 1, title: 'Unit 1: Fundamentals of Data Structure', shortTitle: 'Unit 1: Fundamentals', desc: 'Definition of Data Structure, classification into Linear vs Non-Linear, basic operations, algorithm characteristics, time & space complexities, time-space tradeoff, and array basics.', questionsCount: 7 },
  { id: 2, title: 'Unit 2: Arrays', shortTitle: 'Unit 2: Arrays', desc: 'Array operations (Traversal, Insertion, Deletion), Linear Search, Binary Search, Bubble/Selection/Insertion Sort, 2D Arrays (Row-Major & Column-Major Order), Sparse Matrices, and Advantages/Disadvantages.', questionsCount: 9 },
  { id: 3, title: 'Unit 3: Linked List', shortTitle: 'Unit 3: Linked List', desc: 'Linked list concepts, Singly/Doubly/Circular linked lists, Array vs Linked List comparison, Insertion, Deletion, Traversing, Searching, and Applications.', questionsCount: 9 },
  { id: 4, title: 'Unit 4: Hashing', shortTitle: 'Unit 4: Hashing', desc: 'Hashing definitions, Hash functions (Division, Multiplication, Mid-Square, Folding), Collision handling (Linear Probing, Separate Chaining), and Open Addressing vs Chaining.', questionsCount: 4 },
  { id: 5, title: 'Unit 5: Stack', shortTitle: 'Unit 5: Stack', desc: 'Stack LIFO architecture, PUSH and POP operations, Stack using Array, Stack using Linked List, Applications of Stack, and Infix to Postfix Expression conversion.', questionsCount: 7 },
  { id: 6, title: 'Unit 6: Recursion', shortTitle: 'Unit 6: Recursion', desc: 'Recursion fundamentals, Advantages & Disadvantages of Recursion, Factorial using Recursion, Applications of Recursion, and Towers of Hanoi recursive solution.', questionsCount: 5 },
  { id: 7, title: 'Unit 7: Queue', shortTitle: 'Unit 7: Queue', desc: 'Queue FIFO architecture, Enqueue and Dequeue operations, and Types of Queue (Simple Queue, Circular Queue, Deque, Priority Queue).', questionsCount: 3 },
  { id: 8, title: 'Unit 8: Graph', shortTitle: 'Unit 8: Graph', desc: 'Graph terminology, Breadth First Search (BFS), Depth First Search (DFS), Adjacency Matrix & Adjacency List representations, and role of Graphs in Social Networks & Web Crawling.', questionsCount: 5 },
  { id: 9, title: 'Unit 9: Trees', shortTitle: 'Unit 9: Trees', desc: 'Tree terminology, Binary Tree, Inorder/Preorder/Postorder traversals, Binary Search Tree (BST), BST Insertion & Deletion, and AVL vs Red-Black Trees comparison.', questionsCount: 7 }
];

export const DS_FULL_QUESTIONS = [
  // ─── UNIT 1: FUNDAMENTALS OF DATA STRUCTURE ───
  {
    id: 1,
    unitId: 1,
    questionNumber: 'Q1',
    slug: 'q1-what-is-data-structure',
    title: 'What is Data Structure?',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '📊',
    theory: `A Data Structure is a way of organizing and storing data in a computer's main memory so that it can be accessed and modified efficiently.`,
    explanation: `Data structures help in managing large amounts of data in an efficient manner. They make operations like searching, insertion, and deletion faster and easier. Choosing the right data structure improves the performance of a program.`,
    diagram: `Types of Data Structure:
┌─────────────────────────────────────────────────────────────┐
│                       DATA STRUCTURES                       │
└──────────────────────────────┬──────────────────────────────┘
               ┌───────────────┴───────────────┐
               ▼                               ▼
    [Linear Data Structure]         [Non-Linear Data Structure]
 (Array, Linked List, Stack, Queue)         (Tree, Graph)`,
    table: null,
    notes: `• Linear Data Structure: Elements are arranged in a sequential manner. Examples: Array, Linked List, Stack, Queue.\n• Non-Linear Data Structure: Elements are not arranged sequentially. Examples: Tree, Graph.`,
    keyPoints: [
      'Data structure organizes data in main memory efficiently.',
      'Improves program performance, searching, insertion, and deletion speed.',
      'Divided into Linear and Non-Linear structures.'
    ],
    summary: 'A Data Structure provides an organized framework for data storage and manipulation, classified broadly into linear and non-linear types.'
  },
  {
    id: 2,
    unitId: 1,
    questionNumber: 'Q2',
    slug: 'q2-types-of-data-structures',
    title: 'Types of Data Structures',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '🗂️',
    theory: `Data structures are classified based on how data elements are arranged and connected with each other. The two main types are linear and non-linear data structures.`,
    explanation: `1. Linear Data Structure: In a linear data structure, elements are arranged in a sequential order. Each element is connected to its previous and next element. Examples: Array, Linked List, Stack, Queue.\n\n2. Non-Linear Data Structure: In a non-linear data structure, elements are not arranged sequentially. Data is organized in a hierarchical or network form. Examples: Tree, Graph.`,
    diagram: null,
    table: null,
    notes: null,
    keyPoints: [
      'Linear: Sequential arrangement (Array, Linked List, Stack, Queue).',
      'Non-Linear: Hierarchical or network organization (Tree, Graph).'
    ],
    summary: 'Data structures are categorized into Linear (sequential) and Non-Linear (hierarchical/network) based on element arrangement.'
  },
  {
    id: 3,
    unitId: 1,
    questionNumber: 'Q3',
    slug: 'q3-operations-on-data-structure',
    title: 'Operations on Data Structure',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '⚙️',
    theory: `Operations on data structures are the basic actions performed on data to process and manage it efficiently.`,
    explanation: `Basic Operations:\n1. Traversing: It means visiting each element of the data structure one by one in a systematic manner.\n2. Searching: It is used to find a specific element in the data structure.\n3. Insertion: It means adding a new element at a specific position in the data structure.\n4. Deletion: It means removing an element from the data structure.\n5. Sorting: It is the process of arranging data in a particular order (ascending or descending).\n6. Merging: It means combining two data structures into one.`,
    diagram: `[Traversing] ──▶ Visit each element one by one
[Searching]  ──▶ Find specific element
[Insertion]  ──▶ Add new element at specific position
[Deletion]   ──▶ Remove element from structure
[Sorting]    ──▶ Arrange data in order (Asc / Desc)
[Merging]    ──▶ Combine two data structures into one`,
    table: null,
    notes: null,
    keyPoints: [
      '6 Core Operations: Traversing, Searching, Insertion, Deletion, Sorting, Merging.',
      'Forms the operational foundation of computer science algorithm design.'
    ],
    summary: 'The 6 basic operations enable systematic visiting, finding, adding, deleting, ordering, and combining data in memory.'
  },
  {
    id: 4,
    unitId: 1,
    questionNumber: 'Q4',
    slug: 'q4-what-is-algorithm',
    title: 'What is Algorithm?',
    difficulty: 'Beginner',
    duration: '20 min read',
    icon: '🧩',
    theory: `An Algorithm is a finite set of step-by-step instructions used to solve a problem or perform a specific task.`,
    explanation: `An algorithm is used to solve a problem step by step in a logical manner.\n\nCharacteristics of Algorithm:\n• Finite: It must have a limited number of steps.\n• Definite: Each step should be clear and unambiguous.\n• Input: It can take zero or more inputs.\n• Output: It should produce at least one output.\n• Effective: Steps should be simple and executable.`,
    diagram: `Algorithm Example (Add Two Numbers):
① Start
② Input two numbers
③ Add the numbers
④ Display the result
⑤ Stop`,
    table: null,
    notes: null,
    keyPoints: [
      'Algorithm must be finite, definite, effective, and produce output.',
      'Steps must be clear, unambiguous, and simple to execute.'
    ],
    summary: 'An algorithm is a finite, unambiguous sequence of steps that processes input to produce a valid output.'
  },
  {
    id: 5,
    unitId: 1,
    questionNumber: 'Q5',
    slug: 'q5-difference-between-time-complexity-and-space-complexity',
    title: 'Difference between Time Complexity and Space Complexity',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '⏱️',
    theory: `Time complexity and space complexity are used to measure the efficiency of an algorithm. They help us understand how well an algorithm performs in terms of time and memory.`,
    explanation: `Explanation (Extra lines for marks):\n• If an algorithm takes less time to run, it has better time complexity.\n• If an algorithm uses less memory, it has better space complexity.\n• Both are important for writing efficient programs.`,
    diagram: null,
    table: {
      headers: ['Basis', 'Time Complexity', 'Space Complexity'],
      rows: [
        ['Definition', 'It is the amount of time taken by an algorithm to complete execution', 'It is the amount of memory used by an algorithm during execution'],
        ['Focus', 'Focuses on how fast the algorithm runs', 'Focuses on how much memory is required'],
        ['Measurement', 'Measured in terms of number of operations (time)', 'Measured in terms of memory space (bytes)'],
        ['Goal', 'To reduce execution time', 'To reduce memory usage'],
        ['Example', 'O(n), O(log n), O(n²)', 'O(n), O(1)']
      ]
    },
    notes: null,
    keyPoints: [
      'Time complexity measures execution speed in terms of operations.',
      'Space complexity measures memory consumption in bytes.',
      'Both metrics evaluate algorithm efficiency.'
    ],
    summary: 'Time complexity optimizes execution speed, while space complexity optimizes memory utilization.'
  },
  {
    id: 6,
    unitId: 1,
    questionNumber: 'Q6',
    slug: 'q6-time-space-tradeoff',
    title: 'Time-Space Tradeoff',
    difficulty: 'Intermediate',
    duration: '15 min read',
    icon: '⚖️',
    theory: `Time-Space Tradeoff means a situation where we can reduce the execution time of an algorithm by using more memory, or reduce memory usage by increasing execution time.`,
    explanation: `In computer science, time and space are two important factors used to measure the efficiency of an algorithm. Sometimes, improving one factor may worsen the other.\n\n• If we want a program to run faster, we may use extra memory (space).\n• If we want to save memory, the program may take more time to execute.\n• So, there is always a balance between time and space.`,
    diagram: null,
    table: null,
    notes: `Example:\n• Using an extra array can make searching faster (less time, more space).\n• Without extra memory, the same task may take more time.`,
    keyPoints: [
      'Tradeoff between execution speed and memory consumption.',
      'Using extra memory can accelerate search/processing speeds.',
      'Saving memory often increases execution time.'
    ],
    summary: 'Time-Space Tradeoff represents balancing execution speed against memory consumption depending on application constraints.'
  },
  {
    id: 7,
    unitId: 1,
    questionNumber: 'Q7',
    slug: 'q7-define-array-with-example',
    title: 'Define Array with example',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '🔢',
    theory: `An Array is a collection of elements of the same data type stored in contiguous memory locations, where each element is accessed using an index.`,
    explanation: `• All elements in an array are of the same type (like all integers).\n• Elements are stored in continuous memory.\n• Each element has an index (position), starting from 0.`,
    diagram: null,
    table: {
      headers: ['Index', '0', '1', '2', '3', '4'],
      rows: [
        ['marks', '50', '60', '70', '80', '90']
      ]
    },
    notes: `Example: If we store marks of 5 students: marks = [50, 60, 70, 80, 90]\nmarks[0] = 50, marks[1] = 60, marks[2] = 70, marks[3] = 80, marks[4] = 90\n\nConclusion: Thus, an array is used to store multiple values of the same type in an organized and efficient way.`,
    keyPoints: [
      'Homogeneous elements stored in contiguous memory locations.',
      'Zero-indexed random access in constant O(1) time.'
    ],
    summary: 'An array stores same-type data elements in consecutive memory addresses accessed via 0-based indices.'
  },

  // ─── UNIT 2: ARRAYS ───
  {
    id: 8,
    unitId: 2,
    questionNumber: 'Q8',
    slug: 'q8-operations-on-array-traversal-insertion-deletion',
    title: 'Operations on Array (Traversal, Insertion, Deletion)',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '📝',
    theory: `Operations on an array are the basic actions performed to access and modify the elements of the array.`,
    explanation: `1. Traversal: Traversal means visiting each element of the array one by one.\n• It is used to display or process all elements.\n• Elements are accessed using index (0, 1, 2, ...).\n• Example: Array: [10, 20, 30] ──▶ Traversal: 10 ──▶ 20 ──▶ 30\n\n2. Insertion: Insertion means adding a new element at a specific position in the array.\n• Elements are shifted to make space.\n• Can be inserted at beginning, middle, or end.\n• Example: Array: [10, 20, 30] ──▶ Insert 15 at position 1 ──▶ [10, 15, 20, 30]\n\n3. Deletion: Deletion means removing an element from the array.\n• Elements are shifted after deletion to fill the gap.\n• Example: Array: [10, 20, 30] ──▶ Delete 20 ──▶ [10, 30]`,
    diagram: null,
    table: null,
    notes: null,
    keyPoints: [
      'Traversal accesses every element sequentially.',
      'Insertion shifts elements right to make space.',
      'Deletion shifts elements left to fill the gap.'
    ],
    summary: 'Array operations include traversal, right-shifting insertion, and left-shifting deletion.'
  },
  {
    id: 9,
    unitId: 2,
    questionNumber: 'Q9',
    slug: 'q9-linear-search',
    title: 'Linear Search',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '🔍',
    theory: `Linear Search is a method of searching in which each element of the array is checked one by one until the desired element is found or the list ends.`,
    explanation: `Searching is an important operation used to find a specific element in a data structure. Linear search is the simplest searching technique.\n\nSteps:\n① Start from the first element.\n② Compare each element with the target value.\n③ If match is found ──▶ element is found.\n④ If not ──▶ move to next element.\n⑤ Continue until element is found or array ends.`,
    diagram: `Linear Search Trace (Search = 30):
Array: [10, 20, 30, 40]
Index:   0   1   2   3
Check: 10 (X) ──▶ 20 (X) ──▶ 30 (✓ Match Found at Position 2!)`,
    table: null,
    notes: null,
    keyPoints: [
      'Checks elements sequentially from start to end.',
      'Works on both sorted and unsorted arrays.',
      'Worst-case time complexity: O(n).'
    ],
    summary: 'Linear Search sequentially checks every element until match is found, working on unsorted data in O(n) time.'
  },
  {
    id: 10,
    unitId: 2,
    questionNumber: 'Q10',
    slug: 'q10-binary-search',
    title: 'Binary Search',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '🎯',
    theory: `Binary Search is a searching method in which the array is divided into two halves repeatedly to find the desired element. It works ONLY on sorted arrays.`,
    explanation: `Binary search is a fast searching technique used for sorted data.\n\nSteps:\n① Start with the middle element of the array.\n② If middle element is equal to target ──▶ found!\n③ If target is smaller ──▶ search in left half.\n④ If target is greater ──▶ search in right half.\n⑤ Repeat until element is found or search ends.`,
    diagram: `Binary Search Example (Array = [10, 20, 30, 40, 50], Search = 30):
Index:    0   1   2   3   4
Values:  10  20  30  40  50
Middle Index = (0 + 4) / 2 = 2
Middle Element = 30 (✓ Match Found at Position 2!)`,
    table: null,
    notes: null,
    keyPoints: [
      'Requires a SORTED array.',
      'Uses Divide and Conquer to halve search space in each pass.',
      'Time complexity: O(log n).'
    ],
    summary: 'Binary Search rapidly locates elements in sorted arrays by repeatedly halving the search space in logarithmic O(log n) time.'
  },
  {
    id: 11,
    unitId: 2,
    questionNumber: 'Q11',
    slug: 'q11-difference-linear-search-vs-binary-search',
    title: 'Difference: Linear Search vs Binary Search',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '⭐',
    theory: `Linear search and binary search are two methods used to find an element in an array. They differ in working method, speed, and requirements.`,
    explanation: `Conclusion:\n• Linear search is simple but slow.\n• Binary search is fast but works only on sorted data. ⭐`,
    diagram: null,
    table: {
      headers: ['Basis', 'Linear Search', 'Binary Search'],
      rows: [
        ['Definition', 'It is a searching technique in which each element is checked one by one', 'It is a searching technique in which the array is repeatedly divided into two halves'],
        ['Working Method', 'Starts from the first element and checks every element sequentially', 'Starts from the middle element and reduces search area step by step'],
        ['Data Requirement', 'Works on both sorted and unsorted data', 'Works ONLY on sorted data'],
        ['Speed', 'Slower, especially for large data', 'Faster and more efficient'],
        ['Time Complexity', 'O(n) (linear time)', 'O(log n) (logarithmic time)'],
        ['Comparisons', 'May require checking all elements in worst case', 'Requires fewer comparisons due to division'],
        ['Implementation', 'Simple and easy to implement', 'Slightly more complex to implement'],
        ['Use Case', 'Suitable for small or unsorted data', 'Suitable for large and sorted data']
      ]
    },
    notes: null,
    keyPoints: [
      'Linear Search: O(n), unsorted/sorted data.',
      'Binary Search: O(log n), requires sorted data.'
    ],
    summary: 'Linear search is simple for unsorted arrays, while binary search provides fast logarithmic search on sorted arrays.'
  },
  {
    id: 12,
    unitId: 2,
    questionNumber: 'Q12',
    slug: 'q12-sorting-bubble-sort-selection-sort-insertion-sort',
    title: 'Sorting: Bubble Sort, Selection Sort, Insertion Sort',
    difficulty: 'Intermediate',
    duration: '25 min read',
    icon: '🔀',
    theory: `Sorting is the process of arranging elements in a particular order (ascending or descending). It helps in faster searching and better data management.`,
    explanation: `1. Bubble Sort:\n• Definition: Bubble sort is a simple sorting technique in which adjacent elements are compared and swapped if they are in the wrong order.\n• Working: Compare two adjacent elements ──▶ Swap if first is greater than second ──▶ Repeat for all elements ──▶ Largest element moves to the end in each pass.\n• Example: 5 3 2 ──▶ 3 5 2 ──▶ 3 2 5 ──▶ 2 3 5\n\n2. Selection Sort:\n• Definition: Selection sort selects the smallest element from the array and places it at the correct position.\n• Working: Find the smallest element ──▶ Swap it with the first element ──▶ Repeat for remaining array.\n• Example: 5 3 2 ──▶ 2 3 5\n\n3. Insertion Sort:\n• Definition: Insertion sort places each element at its correct position in the sorted part of the array.\n• Working: Take one element at a time ──▶ Compare with previous elements ──▶ Insert at correct position.\n• Example: 5 3 2 ──▶ 3 5 2 ──▶ 2 3 5`,
    diagram: null,
    table: null,
    notes: `Conclusion:\n• Bubble sort is easy but less efficient.\n• Selection sort does fewer swaps.\n• Insertion sort is efficient for nearly sorted data.`,
    keyPoints: [
      'Bubble Sort: Swaps adjacent pairs repeatedly.',
      'Selection Sort: Finds minimum element and swaps to front.',
      'Insertion Sort: Inserts current element into sorted sub-array.'
    ],
    summary: 'Bubble, Selection, and Insertion sorts are O(n²) comparison algorithms suitable for basic array sorting.'
  },
  {
    id: 13,
    unitId: 2,
    questionNumber: 'Q13',
    slug: 'q13-2d-array-representation',
    title: '2D Array Representation',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '⭐',
    theory: `A Two-Dimensional (2D) Array is an array of arrays where elements are stored in row and column format and each element is accessed using two indices.`,
    explanation: `A two-dimensional (2D) array is used to store data in the form of rows and columns, like a table or matrix.\n\n• First index represents row.\n• Second index represents column.\n• Elements are stored in a tabular form.`,
    diagram: `2D Array Table Representation:
A = [ [10, 20, 30], [40, 50, 60] ]

          Columns ──▶
          0     1     2
Row 0 │  10    20    30  │
Row 1 │  40    50    60  │

A[0][0] = 10, A[0][1] = 20, A[1][2] = 60`,
    table: null,
    notes: null,
    keyPoints: [
      'Stores data in grid format (rows and columns).',
      'Accessed via two indices: A[row][column].'
    ],
    summary: '2D arrays store matrix data using row and column indices.'
  },
  {
    id: 14,
    unitId: 2,
    questionNumber: 'Q14',
    slug: 'q14-advantages-and-disadvantages-of-array',
    title: 'Advantages & Disadvantages of Array',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '⭐',
    theory: `An array is a widely used data structure for storing multiple elements of the same type. It has both advantages and limitations.`,
    explanation: `Advantages of Array:\n1. Easy Access: Elements can be accessed directly using index (fast access).\n2. Simple Implementation: Easy to understand and use in programs.\n3. Efficient Storage: Stores multiple elements of the same type in a single structure.\n4. Less Memory Overhead: Does not require extra memory for pointers.\n\nDisadvantages of Array:\n1. Fixed Size: Size cannot be changed after declaration.\n2. Wastage of Memory: Extra space may remain unused.\n3. Insertion & Deletion Difficult: Requires shifting of elements, which takes time.\n4. Same Data Type Only: Cannot store different types of data.`,
    diagram: null,
    table: null,
    notes: `Conclusion: Thus, arrays are simple and efficient for storing data, but they have limitations like fixed size and difficulty in modification.`,
    keyPoints: [
      'Advantages: O(1) random index access, simple implementation, zero pointer overhead.',
      'Disadvantages: Fixed size allocation, O(n) element shifting for insertion/deletion.'
    ],
    summary: 'Arrays offer fast index access with zero pointer overhead, but suffer from fixed capacity and expensive element shifting.'
  },
  {
    id: 51,
    unitId: 2,
    questionNumber: 'Q51',
    slug: 'q51-concept-and-representation-of-two-dimensional-arrays-in-memory',
    title: 'Concept and Representation of Two-Dimensional Arrays in Memory',
    difficulty: 'Intermediate',
    duration: '25 min read',
    icon: '📐',
    theory: `A Multi-Dimensional Array is an array that contains more than one dimension, meaning it stores data in the form of rows, columns, or multiple levels. It is basically an array of arrays and is used to represent complex data structures like matrices.`,
    explanation: `Since computer memory is strictly linear (1D), a 2D array must be mapped into consecutive 1D memory locations using one of two layout conventions:\n\n1. Row Major Order (RMO):\n• Elements are stored row by row.\n• First complete row is stored, then next row.\n• Address Formula: Address(A[i][j]) = Base + [ (i x N) + j ] x w\n(Where i = row index, j = column index, M = total rows, N = total columns, w = size of each element in bytes).\n\n2. Column Major Order (CMO):\n• Elements are stored column by column.\n• First complete column is stored, then next column.\n• Address Formula: Address(A[i][j]) = Base + [ (j x M) + i ] x w`,
    diagram: `Row-Major vs Column-Major Linearization:
Matrix A[2][3]:
[ A00  A01  A02 ]
[ A10  A11  A12 ]

Row Major Order:    [ A00 ][ A01 ][ A02 ][ A10 ][ A11 ][ A12 ]
Column Major Order: [ A00 ][ A10 ][ A01 ][ A11 ][ A02 ][ A12 ]`,
    table: null,
    notes: `Conclusion: Thus, multi-dimensional arrays help in storing complex data, and 2D arrays map to linear memory via Row-Major or Column-Major order.`,
    keyPoints: [
      'Row-Major Order stores elements row by row (C/C++ standard).',
      'Column-Major Order stores elements column by column.',
      'Address calculation formulas allow direct O(1) memory address mapping.'
    ],
    summary: '2D arrays map 2D grids into 1D linear memory using Row-Major or Column-Major order mapping formulas.'
  },
  {
    id: 52,
    unitId: 2,
    questionNumber: 'Q52',
    slug: 'q52-explain-sparse-matrices-and-their-advantages',
    title: 'Explain Sparse Matrices and Their Advantages',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '📊',
    theory: `A Sparse Matrix is a matrix in which most of the elements are zero and only a few elements are non-zero. Instead of storing all elements, only the non-zero elements and their positions are stored to save memory.`,
    explanation: `In many applications, matrices contain a large number of zero values. Storing all elements wastes memory, so sparse matrices are used.\n\nRepresentation (Triplet Form):\nInstead of storing full matrix, we store: Row number, Column number, Value.\n\nExample Matrix (3x3):\n[ 0  0  5 ]\n[ 0  0  0 ]\n[ 8  0  0 ]\nNon-zero elements: (0, 2) = 5, (2, 0) = 8.`,
    diagram: null,
    table: {
      headers: ['Row', 'Column', 'Value'],
      rows: [
        ['0', '2', '5'],
        ['2', '0', '8']
      ]
    },
    notes: `Advantages of Sparse Matrix:\n1. Memory Efficient: Stores only non-zero elements and their positions. Saves a large amount of memory space.\n2. Faster Processing: Since only non-zero elements are stored, less data is processed, making operations faster.\n3. Reduced Storage Cost: Requires less storage space.\n4. Efficient for Large Data: Very useful in large matrices where most elements are zero (e.g. scientific computations, network analysis, graph representations).`,
    keyPoints: [
      'Sparse matrices contain mostly zero elements.',
      '3-Tuple representation stores (Row, Column, Value) for non-zero elements only.',
      'Saves memory and accelerates computation on large sparse matrices.'
    ],
    summary: 'Sparse matrices optimize memory and processing speed by recording only non-zero elements using 3-Tuple representation.'
  },

  // ─── UNIT 3: LINKED LIST ───
  {
    id: 15,
    unitId: 3,
    questionNumber: 'Q15',
    slug: 'q15-what-is-linked-list',
    title: 'What is Linked List?',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '🔗',
    theory: `A Linked List is a collection of nodes where each node contains data and a link (pointer) to the next node in the sequence.`,
    explanation: `A linked list is an important data structure used for dynamic data storage. It overcomes some limitations of array.\n\n• Elements are not stored in contiguous memory.\n• Nodes are connected using pointers.\n• The first node is called head.\n• The last node points to NULL.`,
    diagram: `Node Structure:
[ Data | Next (Pointer) ] ──▶ Link

Linked List Sequence:
[10 | •] ──▶ [20 | •] ──▶ [30 | •] ──▶ [40 | NULL]
  ▲
 Head`,
    table: null,
    notes: null,
    keyPoints: [
      'Collection of nodes stored in non-contiguous memory.',
      'Each node contains Data and Next pointer.',
      'First node is Head; last node points to NULL.'
    ],
    summary: 'A Linked List is a dynamic data structure of nodes connected via pointers in non-contiguous memory.'
  },
  {
    id: 16,
    unitId: 3,
    questionNumber: 'Q16',
    slug: 'q16-types-of-linked-list',
    title: 'Types of Linked List',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '🔄',
    theory: `Linked list can be classified into different types based on how nodes are connected with each other.`,
    explanation: `1. Singly Linked List:\n• Definition: A singly linked list is a type of linked list in which each node contains data and a link to the next node.\n• Traversal is possible in one direction only. Last node points to NULL.\n• Diagram: [10] ──▶ [20] ──▶ [30] ──▶ [40] ──▶ NULL\n\n2. Doubly Linked List:\n• Definition: A doubly linked list is a type of linked list in which each node contains data, a link to the previous node, and a link to the next node.\n• Traversal is possible in both directions.\n• Diagram: NULL ◄── [10] ◄──► [20] ◄──► [30] ◄──► [40] ──▶ NULL\n\n3. Circular Linked List:\n• Definition: A circular linked list is a type of linked list in which the last node points back to the first node, forming a circle.\n• No node points to NULL. Forms a circular structure.`,
    diagram: `Circular Linked List Diagram:
[10] ──▶ [20] ──▶ [30] ──▶ [40] ──┐
  ▲                                │
  └────────────────────────────────┘`,
    table: null,
    notes: null,
    keyPoints: [
      'Singly Linked List: One-way navigation (Data + Next).',
      'Doubly Linked List: Two-way navigation (Prev + Data + Next).',
      'Circular Linked List: Last node points back to Head node.'
    ],
    summary: 'Linked lists are classified into Singly, Doubly, and Circular types based on pointer linkage structures.'
  },
  {
    id: 17,
    unitId: 3,
    questionNumber: 'Q17',
    slug: 'q17-difference-array-vs-linked-list',
    title: 'Difference: Array vs Linked List',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '⭐',
    theory: `Array and linked list are two important data structures used to store data. They differ in memory storage, size, and operations.`,
    explanation: `Explanation (Extra lines):\n• Arrays store elements in continuous memory, so accessing elements is faster.\n• Linked lists store elements in different locations connected by pointers, which makes insertion and deletion easier.`,
    diagram: null,
    table: {
      headers: ['Basis', 'Array', 'Linked List'],
      rows: [
        ['Definition', 'A collection of elements stored in contiguous memory locations', 'A collection of nodes connected using links (pointers)'],
        ['Memory Allocation', 'Fixed memory allocation', 'Dynamic memory allocation'],
        ['Size', 'Size is fixed', 'Size can grow or shrink'],
        ['Access', 'Direct access using index (fast)', 'Sequential access (slower)'],
        ['Insertion/Deletion', 'Difficult (requires shifting)', 'Easy (no shifting required)'],
        ['Memory Usage', 'Less memory (no extra pointers)', 'More memory (extra pointer required)'],
        ['Structure', 'Simple structure', 'Complex structure'],
        ['Example', '[10, 20, 30]', '10 -> 20 -> 30 -> NULL']
      ]
    },
    notes: null,
    keyPoints: [
      'Array: Fixed size, contiguous memory, O(1) random access.',
      'Linked List: Dynamic size, pointer-based memory, O(1) pointer insertion/deletion.'
    ],
    summary: 'Arrays offer fast indexed access, whereas Linked Lists provide dynamic memory growth and easy pointer-based insertion/deletion.'
  },
  {
    id: 18,
    unitId: 3,
    questionNumber: 'Q18',
    slug: 'q18-insertion-in-linked-list',
    title: 'Insertion in Linked List',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '➕',
    theory: `Insertion in Linked List means adding a new node containing data into the list by adjusting the links (pointers).`,
    explanation: `Insertion is an operation used to add a new node into a linked list at a specific position.\n\nTypes of Insertion:\n1. Insertion at Beginning:\n• Steps: Create a new node ──▶ Point new node to current head ──▶ Update head to new node.\n• Before: 10 ──▶ 20 ──▶ 30 ──▶ NULL\n• After (Insert 5): 5 ──▶ 10 ──▶ 20 ──▶ 30 ──▶ NULL\n\n2. Insertion at End:\n• Steps: Traverse till last node ──▶ Point last node to new node ──▶ New node points to NULL.\n• Before: 10 ──▶ 20 ──▶ 30 ──▶ NULL\n• After (Insert 40): 10 ──▶ 20 ──▶ 30 ──▶ 40 ──▶ NULL\n\n3. Insertion at Middle (Position):\n• Steps: Traverse to required position ──▶ Adjust links of previous and next nodes ──▶ Insert new node in between.\n• Before: 10 ──▶ 20 ──▶ 30 ──▶ NULL\n• After (Insert 25): 10 ──▶ 20 ──▶ 25 ──▶ 30 ──▶ NULL`,
    diagram: null,
    table: null,
    notes: null,
    keyPoints: [
      'Insertion adjusts node pointers without shifting data.',
      'Can insert at Beginning (head update), End (last node link), or Middle (pointer splice).'
    ],
    summary: 'Linked list insertion adds new nodes by modifying pointers without shifting memory elements.'
  },
  {
    id: 19,
    unitId: 3,
    questionNumber: 'Q19',
    slug: 'q19-deletion-in-linked-list',
    title: 'Deletion in Linked List',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '❌',
    theory: `Deletion in Linked List means removing a node from the list by adjusting the links (pointers).`,
    explanation: `Deletion is an operation used to remove a node from a linked list.\n\nTypes of Deletion:\n1. Deletion at Beginning:\n• Steps: Move head to the next node ──▶ Delete the old first node.\n• Before: 10 ──▶ 20 ──▶ 30 ──▶ NULL ──▶ After Delete 10: 20 ──▶ 30 ──▶ NULL\n\n2. Deletion at End:\n• Steps: Traverse to second last node ──▶ Set its next to NULL ──▶ Delete last node.\n• Before: 10 ──▶ 20 ──▶ 30 ──▶ NULL ──▶ After Delete 30: 10 ──▶ 20 ──▶ NULL\n\n3. Deletion at Middle (Position):\n• Steps: Traverse to node before the one to delete ──▶ Change its link to skip the target node ──▶ Delete target node.\n• Before: 10 ──▶ 20 ──▶ 30 ──▶ NULL ──▶ After Delete 20: 10 ──▶ 30 ──▶ NULL`,
    diagram: null,
    table: null,
    notes: `Conclusion: Thus, deletion in a linked list is efficient as it only requires changing links without shifting elements.`,
    keyPoints: [
      'Deletion removes nodes by bypassing target node pointers.',
      'Efficient operation requiring zero element shifting.'
    ],
    summary: 'Linked list deletion bypasses and frees target nodes through simple pointer reassignment.'
  },
  {
    id: 20,
    unitId: 3,
    questionNumber: 'Q20',
    slug: 'q20-traversing-linked-list',
    title: 'Traversing Linked List',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '🚶',
    theory: `Traversing in Linked List means visiting each node of the list one by one from the first node to the last node.`,
    explanation: `Traversing is a basic operation in a linked list used to access and display all elements.\n\nAlgorithm (Steps):\n1. Start\n2. Set pointer to head node\n3. While pointer is not NULL:\n   • Display data\n   • Move pointer to next node\n4. Stop`,
    diagram: `Linked List Traversal Trace:
[10 | •] ──▶ [20 | •] ──▶ [30 | •] ──▶ [40 | NULL]
  │            │            │            │
Visit 10    Visit 20     Visit 30     Visit 40
Traversal Output: 10 ──▶ 20 ──▶ 30 ──▶ 40`,
    table: null,
    notes: `Conclusion: Thus, traversing helps in accessing all elements of a linked list sequentially.`,
    keyPoints: [
      'Iterates from head pointer until reaching NULL.',
      'Sequential access takes O(n) time.'
    ],
    summary: 'Linked list traversal visits every node sequentially from head to NULL.'
  },
  {
    id: 21,
    unitId: 3,
    questionNumber: 'Q21',
    slug: 'q21-searching-in-linked-list',
    title: 'Searching in Linked List',
    difficulty: 'Intermediate',
    duration: '15 min read',
    icon: '🔍',
    theory: `Searching in Linked List means finding a node with a given value by checking each node one by one.`,
    explanation: `Algorithm (Steps):\n1. Start\n2. Set pointer to head node\n3. Compare each node's data with the search value\n4. If match found ──▶ display position\n5. Else move to next node\n6. Repeat until found or reach NULL\n7. If not found ──▶ display "Not Found"\n8. Stop`,
    diagram: `Searching Example (Linked List: 10 ──▶ 20 ──▶ 30 ──▶ 40 ──▶ 60 ──▶ NULL, Search = 30):
Check 10 (X) ──▶ Check 20 (X) ──▶ Check 30 (✓ Match Found at Position 2!)`,
    table: null,
    notes: null,
    keyPoints: [
      'Sequentially compares node data against target search value.',
      'Time complexity: O(n).'
    ],
    summary: 'Searching in a linked list checks node values sequentially in O(n) time.'
  },
  {
    id: 22,
    unitId: 3,
    questionNumber: 'Q22',
    slug: 'q22-advantages-and-disadvantages-of-linked-list',
    title: 'Advantages & Disadvantages of Linked List',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '⚡',
    theory: `A linked list is a dynamic data structure that stores data using nodes and pointers. It has both advantages and disadvantages.`,
    explanation: `Advantages of Linked List:\n1. Dynamic Size: Size can grow or shrink during execution.\n2. Easy Insertion and Deletion: No need to shift elements, only links are changed.\n3. Efficient Memory Use: Memory is allocated as needed (no wastage like fixed arrays).\n4. Flexible Structure: Can easily expand and modify data.\n\nDisadvantages of Linked List:\n1. Extra Memory Usage: Requires additional memory for pointers.\n2. No Direct Access: Cannot access elements directly (no indexing).\n3. Slower Access: Traversal takes more time compared to arrays.\n4. Complex Structure: More difficult to implement than arrays.`,
    diagram: null,
    table: null,
    notes: `Conclusion: Thus, linked lists are flexible and efficient for insertion and deletion but have limitations like extra memory usage and no direct access.`,
    keyPoints: [
      'Advantages: Dynamic size, easy pointer insertion/deletion, efficient memory allocation.',
      'Disadvantages: Extra pointer memory overhead, no direct indexing access, slower traversal.'
    ],
    summary: 'Linked lists excel in dynamic resizing and pointer manipulation but incur pointer overhead and slower sequential access.'
  },
  {
    id: 48,
    unitId: 3,
    questionNumber: 'Q48',
    slug: 'q48-applications-of-linked-list',
    title: 'Applications of Linked List',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '📱',
    theory: `The applications of linked list refer to the various areas where linked lists are used to manage and organize data efficiently using dynamic memory and pointers.`,
    explanation: `A linked list is a flexible data structure used to store data dynamically. It is widely used in many applications where frequent insertion and deletion are required.`,
    diagram: null,
    table: {
      headers: ['No.', 'Application', 'Explanation with Example'],
      rows: [
        ['1', 'Dynamic Memory Management', 'Linked list allows dynamic allocation of memory. Memory is used only when needed.'],
        ['2', 'Implementation of Stack and Queue', 'Linked list is used to implement stack and queue. Helps in efficient insertion and deletion.'],
        ['3', 'Polynomial Representation', 'Used to represent polynomial equations. Each term is stored as a node (e.g. 5x² + 3x + 2).'],
        ['4', 'Graph Representation', 'Used in adjacency list to represent graphs. Efficient for storing connected data.'],
        ['5', 'File System / Directory Structure', 'Used to store and manage files in systems. Helps in linking files and folders.'],
        ['6', 'Undo / Redo Operations', 'Used in applications like text editors. Stores previous states.']
      ]
    },
    notes: null,
    keyPoints: [
      'Used in dynamic memory allocation, stack/queue implementations, polynomial algebra, graph adjacency lists, and file systems.'
    ],
    summary: 'Linked lists power dynamic memory management, stacks, queues, polynomials, graph adjacency lists, and directory structures.'
  },

  // ─── UNIT 4: HASHING ───
  {
    id: 23,
    unitId: 4,
    questionNumber: 'Q23',
    slug: 'q23-what-is-hashing',
    title: 'What is Hashing?',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '🔑',
    theory: `Hashing is a method of converting a key into a fixed index using a hash function, so that data can be stored and accessed efficiently.`,
    explanation: `Hashing is a technique used in data structures to store and retrieve data quickly.\n\nRepresentation / Working:\nA hash function takes a key (data) ──▶ Converts it into an index (position) ──▶ Data is stored in a hash table at that index.`,
    diagram: `Hashing Flow Example:
Key (e.g. 25) ──▶ [ Hash Function: h(k) = k % 10 ] ──▶ Index = 5
Stored in Hash Table at Index 5!`,
    table: {
      headers: ['Index', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      rows: [
        ['Value', '-', '-', '-', '-', '-', '25', '-', '-', '-', '-']
      ]
    },
    notes: `Explanation:\n• Provides fast searching, insertion, and deletion.\n• Reduces time complexity compared to other methods.`,
    keyPoints: [
      'Converts keys into hash table indices using hash functions.',
      'Achieves fast O(1) average-case search, insertion, and deletion.'
    ],
    summary: 'Hashing maps keys to fixed table indices via hash functions for rapid data retrieval.'
  },
  {
    id: 24,
    unitId: 4,
    questionNumber: 'Q24',
    slug: 'q24-hash-functions',
    title: 'Hash Functions',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '⚙️',
    theory: `A Hash Function is a function that takes a key as input and converts it into an index (address) in a hash table.`,
    explanation: `Types of Hash Functions:\n1. Division Method: h(k) = k % m (where m = size of hash table)\n2. Multiplication Method: h(k) = ⌊ m * (k * A mod 1) ⌋ (where 0 < A < 1, m = size of hash table)\n3. Mid-Square Method: Square the key and take middle digits.\n4. Folding Method: Divide key into parts and add them.\n\nExample: Key = 27, Hash function h(k) = k % 10 ──▶ h(27) = 27 % 10 = 7. Value stored at index 7.`,
    diagram: null,
    table: null,
    notes: `Conclusion: Thus, hash functions help in mapping keys to specific positions for fast data access.`,
    keyPoints: [
      'Hash function maps key to index.',
      '4 Main Methods: Division, Multiplication, Mid-Square, Folding.'
    ],
    summary: 'Hash functions calculate table indices from keys using Division, Multiplication, Mid-Square, or Folding methods.'
  },
  {
    id: 25,
    unitId: 4,
    questionNumber: 'Q25',
    slug: 'q25-collision-handling-linear-probing-chaining',
    title: 'Collision Handling (Linear Probing, Chaining)',
    difficulty: 'Intermediate',
    duration: '25 min read',
    icon: '⚡',
    theory: `Collision Handling is the process of resolving conflicts when multiple keys are mapped to the same index in a hash table.`,
    explanation: `In hashing, sometimes two or more keys get the same index in the hash table. This situation is called a collision.\n\n1. Linear Probing (Open Addressing):\n• If a collision occurs, check the next position ──▶ Continue checking sequentially until an empty slot is found.\n• Sequence: (i, i+1, i+2, ...)\n• Example: Size = 10, h(k) = k % 10. Insert 23, 33, 43.\n  h(23)=3 (slot 3), h(33)=3 (collision! slot 4), h(43)=3 (collision! slot 5).\n\n2. Chaining (Separate Chaining):\n• Each index has a linked list ──▶ Multiple colliding elements are added to that list.\n• Example: Keys 23, 33, 43 all hash to index 3. Linked list at index 3: 23 ──▶ 33 ──▶ 43 ──▶ NULL.`,
    diagram: null,
    table: null,
    notes: null,
    keyPoints: [
      'Collision occurs when two keys hash to the same index.',
      'Linear Probing searches next sequential empty slot.',
      'Separate Chaining stores colliding keys in a linked list at that index.'
    ],
    summary: 'Collision handling resolves index conflicts using Open Addressing (Linear Probing) or Separate Chaining (Linked Lists).'
  },
  {
    id: 53,
    unitId: 4,
    questionNumber: 'Q53',
    slug: 'q53-collision-handling-with-open-addressing-and-chaining',
    title: 'Collision Handling with Open Addressing and Chaining',
    difficulty: 'Intermediate',
    duration: '25 min read',
    icon: '📊',
    theory: `Collision Resolution is the technique used to handle situations where multiple keys are assigned the same index in a hash table. It ensures that all elements are stored and accessed efficiently without data loss.`,
    explanation: `1. Open Addressing: All elements stored inside the hash table. If one index is full ──▶ move to next available slot. Techniques: Linear Probing, Quadratic Probing, Double Hashing.\n\n2. Chaining (Separate Chaining): Each slot stores multiple elements using a linked list. No need to search for empty slot. Easy to implement.`,
    diagram: null,
    table: {
      headers: ['Basis', 'Open Addressing', 'Chaining (Separate Chaining)'],
      rows: [
        ['Storage', 'All elements stored in the same table', 'Elements stored in linked lists at each index'],
        ['Collision Handling', 'Search for another empty slot', 'Store all colliding elements in a list'],
        ['Space Requirement', 'May waste space if table is full', 'Extra space used for pointers'],
        ['Performance', 'Better when load factor is low', 'Better when load factor is high'],
        ['Implementation', 'Slightly complex', 'Easy to implement']
      ]
    },
    notes: `Conclusion: Thus, collision resolution ensures efficient storage in hashing. Open addressing uses alternate slots, while chaining uses linked lists.`,
    keyPoints: [
      'Open Addressing keeps all elements inside table.',
      'Chaining uses external linked lists for colliding keys.',
      'Comparison evaluates load factor, space, and performance.'
    ],
    summary: 'Open Addressing probes for internal table slots, while Separate Chaining allocates external linked list nodes.'
  },

  // ─── UNIT 5: STACK ───
  {
    id: 26,
    unitId: 5,
    questionNumber: 'Q26',
    slug: 'q26-what-is-stack',
    title: 'What is Stack?',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '🥞',
    theory: `A Stack is a linear data structure in which elements are inserted and removed only from one end called the TOP, and it follows the principle of LIFO (Last In, First Out). This means the element which is inserted last is the first one to be removed, making it a restricted form of list where operations are allowed only at one end.`,
    explanation: `A stack is a linear data structure used to store elements in a particular order. It is commonly used in programming and data management.\n\nBasic Operations:\n• Push ──▶ Insert element\n• Pop ──▶ Remove element\n• Peek ──▶ View top element\n• IsEmpty ──▶ Check empty`,
    diagram: `Stack LIFO Operation:
│   30   │ ◄── TOP (Push 30 / Pop 30)
│   20   │
│   10   │
└────────┘`,
    table: null,
    notes: `Example: Push 10, 20, 30 ──▶ Stack: TOP ──▶ 30 ──▶ 20 ──▶ 10. Pop removes 30.`,
    keyPoints: [
      'Linear data structure following LIFO (Last In, First Out).',
      'All insertions and deletions happen at a single end called TOP.',
      'Basic operations: Push, Pop, Peek, IsEmpty.'
    ],
    summary: 'A Stack is a restricted LIFO linear data structure where all modifications occur at the TOP.'
  },
  {
    id: 27,
    unitId: 5,
    questionNumber: 'Q27',
    slug: 'q27-operations-push-and-pop',
    title: 'Operations: PUSH & POP',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '↕️',
    theory: `Stack operations are used to insert and remove elements from the stack. The main operations are PUSH and POP, which follow the LIFO principle.`,
    explanation: `1. PUSH Operation:\n• Definition (Long): PUSH is an operation used to insert a new element into the stack. The element is always added at the top position, and the TOP pointer is updated accordingly. If the stack is full and no more elements can be added, it results in an overflow condition.\n• Explanation: Element added only at TOP ──▶ TOP pointer moves upward ──▶ Follows LIFO rule.\n• Example: Stack [10, 20], Push 30 ──▶ New Stack TOP ──▶ 30, 20, 10.\n\n2. POP Operation:\n• Definition (Long): POP is an operation used to remove an element from the stack. The element is removed from the top position, and the TOP pointer is updated. If the stack is empty and no element is available for removal, it results in an underflow condition.\n• Explanation: Element removed from TOP ──▶ TOP pointer moves downward ──▶ Follows LIFO rule.\n• Example: Stack [10, 20, 30], Pop ──▶ Removes 30 ──▶ After POP TOP ──▶ 20, 10.`,
    diagram: null,
    table: null,
    notes: null,
    keyPoints: [
      'PUSH adds element at TOP (Overflow if full).',
      'POP removes element from TOP (Underflow if empty).'
    ],
    summary: 'PUSH inserts elements at TOP causing overflow if full, while POP removes elements from TOP causing underflow if empty.'
  },
  {
    id: 28,
    unitId: 5,
    questionNumber: 'Q28',
    slug: 'q28-stack-using-array',
    title: 'Stack using Array',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '📊',
    theory: `A Stack using Array is an implementation of the stack data structure where elements are stored in a linear array, and operations like insertion and deletion are performed using an index called TOP, following the LIFO (Last In, First Out) principle.`,
    explanation: `A stack can be implemented using an array.\n\n• Initially, TOP = -1 (stack is empty).\n• When an element is inserted (Push), TOP is increased: TOP = TOP + 1, A[TOP] = item.\n• When an element is removed (Pop), TOP is decreased: TOP = TOP - 1.\n• Stack size is fixed because array size is fixed.`,
    diagram: `Stack Array Trace:
Initially TOP = -1 (Empty)
Push 10 ──▶ A[0] = 10, TOP = 0
Push 20 ──▶ A[1] = 20, TOP = 1
Push 30 ──▶ A[2] = 30, TOP = 2`,
    table: {
      headers: ['Index', '0', '1', '2', '3', '4'],
      rows: [
        ['Array A', '10', '20', '30', '-', '-']
      ]
    },
    notes: null,
    keyPoints: [
      'Uses linear array with TOP index pointer (Initial TOP = -1).',
      'Fixed stack capacity limited by array size.'
    ],
    summary: 'Stack array implementation tracks the TOP index, bounded by fixed array capacity.'
  },
  {
    id: 29,
    unitId: 5,
    questionNumber: 'Q29',
    slug: 'q29-stack-using-linked-list',
    title: 'Stack using Linked List',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '🔗',
    theory: `A Stack using Linked List is an implementation of a stack where elements are stored as nodes in a linked list, and insertion and deletion are performed at one end called the TOP, following the LIFO (Last In, First Out) principle.`,
    explanation: `A stack can also be implemented using a linked list. This method overcomes the limitation of fixed size in array implementation.\n\n• Each node contains [ DATA | NEXT ].\n• A pointer called TOP points to the first node.\n• Push adds new node at the beginning (TOP).\n• Pop removes node from the beginning (TOP).\n• Size is dynamic (can grow or shrink).`,
    diagram: `Linked List Stack Trace:
Push 10 ──▶ TOP ──▶ [10] ──▶ NULL
Push 20 ──▶ TOP ──▶ [20] ──▶ [10] ──▶ NULL
Push 30 ──▶ TOP ──▶ [30] ──▶ [20] ──▶ [10] ──▶ NULL
Pop     ──▶ Removes 30 ──▶ TOP ──▶ [20] ──▶ [10] ──▶ NULL`,
    table: null,
    notes: null,
    keyPoints: [
      'Dynamic stack size with zero capacity limits.',
      'Push and Pop operate at head of linked list (TOP pointer).'
    ],
    summary: 'Linked list stack implementation provides dynamic memory growth by executing Push and Pop at list head.'
  },
  {
    id: 30,
    unitId: 5,
    questionNumber: 'Q30',
    slug: 'q30-applications-of-stack',
    title: 'Applications of Stack',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '💡',
    theory: `The applications of stack refer to the various areas where the stack data structure is used to perform operations efficiently using the LIFO (Last In, First Out) principle.`,
    explanation: `Applications of Stack:\n1. Expression Evaluation: Used to evaluate infix, postfix, and prefix expressions.\n2. Function Calls / Recursion: Stack is used to store function calls in programs.\n3. Undo and Redo Operations: Used in applications like text editors (last action undone first).\n4. Parenthesis Checking: Used to check balanced parentheses in expressions ((), {}, []).\n5. Reversing Data: Stack can be used to reverse strings or numbers.\n6. Backtracking: Used in problems like maze solving and path finding.`,
    diagram: null,
    table: null,
    notes: null,
    keyPoints: [
      'Powers expression evaluation, function call stacks, undo/redo, parenthesis matching, data reversal, and backtracking.'
    ],
    summary: 'Stack applications include expression evaluation, recursion call stacks, undo mechanisms, and backtracking algorithms.'
  },
  {
    id: 31,
    unitId: 5,
    questionNumber: 'Q31',
    slug: 'q31-infix-to-postfix-expression',
    title: 'Infix to Postfix Expression',
    difficulty: 'Advanced',
    duration: '25 min read',
    icon: '⭐',
    theory: `Infix to Postfix conversion is the process of converting an expression written in infix form (operator between operands) into postfix form (operator after operands) using a stack, so that the expression can be evaluated easily by a computer.`,
    explanation: `Infix: A + B  ──▶  Postfix: AB+\n\nRules:\n• Operands (A, B, numbers) ──▶ directly add to output.\n• Operators (+, -, *, /) ──▶ push into stack.\n• Higher priority operator first (*, / > +, -).\n• Parentheses are handled using stack.`,
    diagram: `Precedence Order:
1. *, /  ──▶  Highest
2. +, -  ──▶  Lower`,
    table: {
      headers: ['Step', 'Scanned Symbol', 'Action', 'Stack (TOP)', 'Output (Postfix)'],
      rows: [
        ['1', 'A', 'Operand ──▶ Add to output', 'Empty', 'A'],
        ['2', '+', 'Push operator', '+', 'A'],
        ['3', 'B', 'Operand ──▶ Add to output', '+', 'AB'],
        ['4', '*', 'Higher priority ──▶ Push', '+ *', 'AB'],
        ['5', '(', 'Push (', '+ * (', 'AB'],
        ['6', 'C', 'Operand ──▶ Add to output', '+ * (', 'ABC'],
        ['7', '-', 'Push operator', '+ * ( -', 'ABC'],
        ['8', 'D', 'Operand ──▶ Add to output', '+ * ( -', 'ABCD'],
        ['9', ')', 'Pop until (', '+ *', 'ABCD-'],
        ['10', '/', 'Higher priority than + ──▶ Push', '+ /', 'ABCD-*'],
        ['11', 'E', 'Operand ──▶ Add to output', '+ /', 'ABCD-*E'],
        ['12', 'End', 'Pop all operators', 'Empty', 'ABCD-*E/+']
      ]
    },
    notes: `Final Postfix Expression: ABCD-*E/+`,
    keyPoints: [
      'Infix: Operator between operands (A + B).',
      'Postfix: Operator after operands (AB+).',
      'Stack maintains operator precedence during conversion.'
    ],
    summary: 'Infix expressions are converted to postfix using an operator stack respecting precedence rules.'
  },
  {
    id: 47,
    unitId: 5,
    questionNumber: 'Q47',
    slug: 'q47-difference-between-stack-and-queue',
    title: 'Difference between Stack and Queue',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '🔄',
    theory: `Stack and queue are both linear data structures, but they differ in the way elements are inserted and removed.`,
    explanation: `Explanation (Extra lines):\n• In a stack, elements are added and removed from the same end, making it LIFO (Last In, First Out).\n• In a queue, elements are added at one end and removed from the other, making it FIFO (First In, First Out).`,
    diagram: null,
    table: {
      headers: ['Basis', 'Stack', 'Queue'],
      rows: [
        ['Definition', 'A linear data structure that follows LIFO (Last In, First Out)', 'A linear data structure that follows FIFO (First In, First Out)'],
        ['Order of Operation', 'Last inserted element is removed first', 'First inserted element is removed first'],
        ['Ends Used', 'Insertion and deletion at one end (TOP)', 'Insertion at rear and deletion from front'],
        ['Main Operations', 'Push, Pop', 'Enqueue, Dequeue'],
        ['Pointers Used', 'Only TOP pointer', 'Two pointers: Front and Rear'],
        ['Example', 'Stack of plates', 'Queue (line of people)'],
        ['Working Style', 'Works like a stack/pile', 'Works like a queue/line']
      ]
    },
    notes: null,
    keyPoints: [
      'Stack: LIFO, single TOP pointer, Push/Pop.',
      'Queue: FIFO, dual Front/Rear pointers, Enqueue/Dequeue.'
    ],
    summary: 'Stack operates on LIFO via TOP pointer, whereas Queue operates on FIFO via Front/Rear pointers.'
  },

  // ─── UNIT 6: RECURSION ───
  {
    id: 32,
    unitId: 6,
    questionNumber: 'Q32',
    slug: 'q32-what-is-recursion',
    title: 'What is Recursion?',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '🔄',
    theory: `Recursion is a programming technique in which a function calls itself repeatedly to solve a problem. It works by dividing a complex problem into smaller subproblems of the same type, until a simple condition called the base case is reached, where the recursion stops.`,
    explanation: `Recursion is an important concept in programming used to solve problems by breaking them into smaller parts.\n\n• A recursive function calls itself.\n• Each call works on a smaller part of the problem.\n• Must have a base case to stop recursion.\n• Uses function call stack to store calls.`,
    diagram: `Recursion Flow:
Function Call ──▶ Break into smaller subproblem ──▶ Recursive call with smaller input ──▶ ... ──▶ Base Case reached ──▶ Return result (unwind)`,
    table: null,
    notes: `Example (Factorial of 5): 5! = 5 x 4 x 3 x 2 x 1. fact(5) = 5 x fact(4) = ... = 120. Base case: fact(1) = 1.`,
    keyPoints: [
      'Function calling itself with smaller input.',
      'Must have a Base Case to prevent infinite recursion.',
      'Uses call stack memory during execution.'
    ],
    summary: 'Recursion breaks complex problems down by having a function call itself until reaching a base case.'
  },
  {
    id: 33,
    unitId: 6,
    questionNumber: 'Q33',
    slug: 'q33-advantages-and-disadvantages-of-recursion',
    title: 'Advantages & Disadvantages of Recursion',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '⚖️',
    theory: `Recursion is a powerful programming technique used to solve complex problems by dividing them into smaller subproblems. However, it has both advantages and disadvantages.`,
    explanation: `Advantages of Recursion:\n1. Simple and Easy to Understand: Recursive solutions are often shorter and easier to write compared to iterative methods.\n2. Reduces Code Length: Complex problems can be solved with fewer lines of code.\n3. Useful for Complex Problems: Best suited for problems like factorial, Fibonacci, tree traversal, etc.\n4. Better Problem Representation: Makes the logic of the problem clearer and more structured.\n\nDisadvantages of Recursion:\n1. High Memory Usage: Each function call uses stack memory, which increases memory consumption.\n2. Slower Execution: Multiple function calls make recursion slower than iteration.\n3. Risk of Infinite Recursion: If base case is missing, the program may run infinitely.\n4. Stack Overflow: Too many recursive calls can cause stack overflow error.`,
    diagram: null,
    table: null,
    notes: `Conclusion: Thus, recursion is easy and powerful but should be used carefully due to higher memory usage and performance issues.`,
    keyPoints: [
      'Advantages: Concise code, clear logic, ideal for tree/graph problems.',
      'Disadvantages: High stack memory overhead, slower execution, stack overflow risk.'
    ],
    summary: 'Recursion simplifies complex logic into concise code but incurs high stack memory usage and performance overhead.'
  },
  {
    id: 34,
    unitId: 6,
    questionNumber: 'Q34',
    slug: 'q34-factorial-using-recursion',
    title: 'Factorial using Recursion',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '🧮',
    theory: `Factorial using recursion is a method of calculating the factorial of a number by using a recursive function that calls itself until it reaches a base case. The factorial of a number n is the product of all positive integers from 1 to n.`,
    explanation: `Mathematical Formula: n! = n x (n-1)!\nBase Case: 1! = 1 or 0! = 1\n\nRecursive Function:\nfact(n) {\n  if (n == 0 || n == 1) return 1;  // Base case\n  else return n * fact(n-1);       // Recursive call\n}`,
    diagram: `Call Stack (Going Down) & Returning Results (Going Up):
fact(5) = 5 x fact(4)
fact(4) = 4 x fact(3)
fact(3) = 3 x fact(2)
fact(2) = 2 x fact(1)
fact(1) = 1 (Base Case Reached!)

Unwinding Returns:
fact(1) = 1
fact(2) = 2 x 1 = 2
fact(3) = 3 x 2 = 6
fact(4) = 4 x 6 = 24
fact(5) = 5 x 24 = 120!`,
    table: {
      headers: ['Step', 'Function Call', 'Value of n', 'Returns'],
      rows: [
        ['1', 'fact(5)', '5', '5 x fact(4)'],
        ['2', 'fact(4)', '4', '4 x fact(3)'],
        ['3', 'fact(3)', '3', '3 x fact(2)'],
        ['4', 'fact(2)', '2', '2 x fact(1)'],
        ['5', 'fact(1)', '1', '1 (Base Case)']
      ]
    },
    notes: null,
    keyPoints: [
      'Formula: n! = n * (n-1)! with base case fact(1) = 1.',
      'Demonstrates call stack winding and unwinding.'
    ],
    summary: 'Factorial uses recursive multiplication unwinding down to base case 1! = 1.'
  },
  {
    id: 49,
    unitId: 6,
    questionNumber: 'Q49',
    slug: 'q49-explain-various-applications-of-recursion',
    title: 'Explain Various Applications of Recursion',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '📱',
    theory: `The applications of recursion refer to the different areas where recursive functions are used to solve complex problems by repeatedly calling themselves until a base condition is reached.`,
    explanation: `Recursion is a powerful technique used in programming to solve problems by breaking them into smaller subproblems. It is widely used in many areas of computer science.`,
    diagram: null,
    table: {
      headers: ['No.', 'Application', 'Explanation', 'Example / Illustration'],
      rows: [
        ['1', 'Mathematical Calculations', 'Used to calculate factorial, Fibonacci series, power of numbers. Simplifies mathematical problems.', 'Factorial: n! = n x (n-1)!\nFibonacci: F(n) = F(n-1) + F(n-2)'],
        ['2', 'Tree Traversal', 'Used to traverse trees (Inorder, Preorder, Postorder). Each subtree is processed recursively.', 'Inorder (LNR), Preorder (NLR), Postorder (LRN)'],
        ['3', 'Searching & Sorting Algorithms', 'Used in algorithms like binary search, quick sort, merge sort. Helps in efficient problem solving.', 'Binary Search, Quick Sort, Merge Sort'],
        ['4', 'Backtracking Problems', 'Used in problems like maze solving, N-Queens puzzles. Helps to explore all possible solutions.', 'N-Queens, Sudoku Solver, Maze Solving'],
        ['5', 'Divide and Conquer', 'Breaks problem into smaller parts and combines results.', 'Merge Sort, Quick Sort'],
        ['6', 'File System Traversal', 'Used to access files and folders in hierarchical structure.', 'Folder ──▶ Subfolder ──▶ File'],
        ['7', 'Tower of Hanoi', 'Classic example solved using recursion.', 'Move n disks from source to destination']
      ]
    },
    notes: null,
    keyPoints: [
      'Powers math series, tree traversals, sorting (Quick/Merge), backtracking, and directory traversal.'
    ],
    summary: 'Recursion drives math calculations, tree traversals, divide-and-conquer sorting, and backtracking algorithms.'
  },
  {
    id: 54,
    unitId: 6,
    questionNumber: 'Q54',
    slug: 'q54-explain-towers-of-hanoi-problem-and-its-recursive-solution',
    title: 'Explain Towers of Hanoi Problem and its Recursive Solution',
    difficulty: 'Advanced',
    duration: '25 min read',
    icon: '🗼',
    theory: `The Towers of Hanoi is a mathematical puzzle consisting of three rods and n disks of different sizes. The objective is to move all disks from the source rod to the destination rod using an auxiliary rod, following certain rules. It is commonly solved using recursion.`,
    explanation: `Rules of the Problem:\n① Only one disk can be moved at a time.\n② A larger disk cannot be placed on a smaller disk.\n③ Only the top disk of a rod can be moved.\n\nRecursive Solution (Concept):\nTo move n disks from Source (A) to Destination (C) using Auxiliary (B):\n1. Move n-1 disks from Source (A) to Auxiliary (B).\n2. Move the nth (largest) disk from Source (A) to Destination (C).\n3. Move n-1 disks from Auxiliary (B) to Destination (C).\n\nRecursive Function:\nTOH(n, A, B, C) {\n  if (n == 1) move disk 1 from A to C;\n  else {\n    TOH(n-1, A, C, B);\n    move disk n from A to C;\n    TOH(n-1, B, A, C);\n  }\n}`,
    diagram: null,
    table: {
      headers: ['Step No.', 'Move', 'Action'],
      rows: [
        ['1', 'A ──▶ C', 'Move disk 1 from A to C'],
        ['2', 'A ──▶ B', 'Move disk 2 from A to B'],
        ['3', 'C ──▶ B', 'Move disk 1 from C to B'],
        ['4', 'A ──▶ C', 'Move disk 3 from A to C'],
        ['5', 'B ──▶ A', 'Move disk 1 from B to A'],
        ['6', 'B ──▶ C', 'Move disk 2 from B to C'],
        ['7', 'A ──▶ C', 'Move disk 1 from A to C']
      ]
    },
    notes: `Key Points:\n• Total moves required = 2ⁿ - 1.\n• Uses recursion effectively.\n• Demonstrates divide-and-conquer approach.\n• Time Complexity = O(2ⁿ).\n• Space Complexity = O(n) (recursive call stack).`,
    keyPoints: [
      'Formula for minimum moves: 2ⁿ - 1.',
      'Time complexity O(2ⁿ), space complexity O(n).'
    ],
    summary: 'Towers of Hanoi solves disk transfers recursively in 2ⁿ - 1 moves with O(2ⁿ) time complexity.'
  },

  // ─── UNIT 7: QUEUE ───
  {
    id: 35,
    unitId: 7,
    questionNumber: 'Q35',
    slug: 'q35-what-is-queue',
    title: 'What is Queue?',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '🚶‍♂️',
    theory: `A Queue is a linear data structure in which elements are inserted at one end called the rear and removed from the other end called the front, following the principle of FIFO (First In, First Out). This means the element that is inserted first is the first one to be removed.`,
    explanation: `A queue is a linear data structure used to store elements in a specific order. It is commonly used in real-life situations like waiting lines.`,
    diagram: `Queue FIFO Structure:
Deletion (Front) ◄── [ a1 | a2 | a3 | ... | an-1 | an ] ◄── Insertion (Rear)
  │                                                  │
 FRONT                                              REAR`,
    table: null,
    notes: null,
    keyPoints: [
      'Linear data structure following FIFO (First In, First Out).',
      'Insertion at Rear, Deletion at Front.',
      'Dual pointers: Front and Rear.'
    ],
    summary: 'A Queue is a FIFO linear data structure inserting at Rear and deleting from Front.'
  },
  {
    id: 36,
    unitId: 7,
    questionNumber: 'Q36',
    slug: 'q36-operations-of-queue',
    title: 'Operations of Queue',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '⚙️',
    theory: `The operations of a queue are the basic actions performed on the queue data structure to manage elements, such as inserting elements at the rear, removing elements from the front, and checking the status of the queue.`,
    explanation: `Main Operations of Queue:\n\n1. Enqueue (Insertion):\n• Definition (Long): Enqueue is the operation used to insert a new element into the queue at the rear end. After insertion, the rear pointer moves forward. If the queue is full, it results in an overflow condition.\n• Example: Initial Queue [10, 20], Enqueue 30 ──▶ New Queue: 10 ──▶ 20 ──▶ 30.\n\n2. Dequeue (Deletion):\n• Definition (Long): Dequeue is the operation used to remove an element from the queue from the front end. After deletion, the front pointer moves forward. If the queue is empty, it results in an underflow condition.\n• Example: Initial Queue [10, 20, 30], Dequeue (removes 10) ──▶ New Queue: 20 ──▶ 30.`,
    diagram: null,
    table: null,
    notes: null,
    keyPoints: [
      'Enqueue adds element at Rear (Overflow if full).',
      'Dequeue removes element from Front (Underflow if empty).'
    ],
    summary: 'Enqueue adds elements at Rear; Dequeue removes elements from Front.'
  },
  {
    id: 37,
    unitId: 7,
    questionNumber: 'Q37',
    slug: 'q37-types-of-queue-simple-circular-deque-priority',
    title: 'Types of Queue (Simple, Circular, Deque, Priority)',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '🔄',
    theory: `Queues are classified into different types based on how elements are inserted and deleted. Each type has its own working method and use.`,
    explanation: `1. Simple Queue: Insertion at rear, deletion from front, following FIFO. Basic form, may cause space wastage.\n\n2. Circular Queue: A queue in which the last position is connected back to the first position to form a circle. Efficient memory use.\n\n3. Deque (Double Ended Queue): Insertion and deletion can be performed at both ends (front and rear). Can work like stack and queue.\n\n4. Priority Queue: Each element has a priority, and elements are processed based on priority rather than arrival order.`,
    diagram: `Circular Queue Diagram:
       [a1]
   [a4]    [a2]  (Rear connects back to Front)
       [a3]`,
    table: {
      headers: ['Element', 'Priority', 'Order of Removal'],
      rows: [
        ['A', '3', 'Highest Priority (Served First)'],
        ['B', '1', 'Lowest Priority'],
        ['C', '4', 'Processed after A'],
        ['D', '2', 'Processed before A']
      ]
    },
    notes: null,
    keyPoints: [
      'Simple Queue: Basic FIFO queue.',
      'Circular Queue: Rear wraps around to Front to prevent memory waste.',
      'Deque: Insertion and deletion at BOTH front and rear.',
      'Priority Queue: Elements processed according to priority rank.'
    ],
    summary: 'Queues include Simple, Circular (wrap-around), Deque (double-ended), and Priority variants.'
  },

  // ─── UNIT 8: GRAPH ───
  {
    id: 38,
    unitId: 8,
    questionNumber: 'Q38',
    slug: 'q38-what-is-graph',
    title: 'What is Graph?',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '🕸️',
    theory: `A Graph is a non-linear data structure that consists of a set of vertices (nodes) and a set of edges (connections) that connect pairs of vertices. It is used to represent relationships between objects, where each connection shows how two elements are related.`,
    explanation: `A graph is a non-linear data structure used to represent relationships between different elements. It is widely used in computer science for networking and connections.\n\n• Vertices (Nodes) ──▶ represent elements.\n• Edges ──▶ represent connections between nodes.`,
    diagram: `Graph Representation:
    (A)
   /   \\
 (B)───(C)
   \\   /
    (D)

Vertices: A, B, C, D
Edges: (A-B), (B-C), (C-D), (A-D)`,
    table: null,
    notes: `Explanation:\n• A graph can be directed (edges have direction) or undirected.\n• It can also be weighted (edges have values).\n• Used to model real-life problems like networks, maps, social connections.`,
    keyPoints: [
      'Non-linear data structure consisting of Vertices (Nodes) and Edges (Connections).',
      'Can be Directed/Undirected and Weighted/Unweighted.'
    ],
    summary: 'A Graph models network relationships using Vertices connected by Edges.'
  },
  {
    id: 39,
    unitId: 8,
    questionNumber: 'Q39',
    slug: 'q39-bfs-breadth-first-search',
    title: 'BFS (Breadth First Search)',
    difficulty: 'Intermediate',
    duration: '25 min read',
    icon: '🌊',
    theory: `Breadth First Search (BFS) is a graph traversal algorithm in which nodes are visited level by level, starting from a given source node. It uses a queue data structure and explores all the neighbouring nodes first before moving to the next level.`,
    explanation: `Traversal is an important operation in graphs used to visit all vertices. BFS is level-by-level traversal using a Queue.\n\nBFS Steps (Start from A):\n• Step 1: Visit A. Enqueue its neighbours B, C. Visited: {A}, Queue: [B, C]\n• Step 2: Dequeue B. Visit B. Enqueue its neighbour D. Visited: {A, B}, Queue: [C, D]\n• Step 3: Dequeue C. Visit C. Visited: {A, B, C}, Queue: [D]\n• Step 4: Dequeue D. Visit D. Visited: {A, B, C, D}, Queue: Empty.\n\nTraversal Order: A ──▶ B ──▶ C ──▶ D`,
    diagram: null,
    table: null,
    notes: null,
    keyPoints: [
      'Level-by-level graph traversal using a Queue.',
      'Explores all direct neighbours before advancing deeper.'
    ],
    summary: 'BFS traverses graphs level-by-level using a Queue data structure.'
  },
  {
    id: 40,
    unitId: 8,
    questionNumber: 'Q40',
    slug: 'q40-dfs-depth-first-search',
    title: 'DFS (Depth First Search)',
    difficulty: 'Intermediate',
    duration: '25 min read',
    icon: '⛏️',
    theory: `Depth First Search (DFS) is a graph traversal algorithm in which we start from a source node and explore as far as possible along each branch before backtracking. It uses a stack (or recursion) to keep track of nodes.`,
    explanation: `DFS Steps (Start from A):\n• Step 1: Visit A. Push A to stack. Visited: {A}, Stack: [A]\n• Step 2: From A, go to deepest neighbour B. Push B. Visited: {A, B}, Stack: [A, B]\n• Step 3: From B, go to deepest neighbour D. Push D. Visited: {A, B, D}, Stack: [A, B, D]\n• Step 4: Pop D (backtrack to B).\n• Step 5: Pop B (backtrack to A).\n• Step 6: From A, visit unvisited neighbour C. Push C. Visited: {A, B, D, C}, Stack: [A, C]\n• Step 7: Pop C. Pop A. Stack empty. Done!\n\nTraversal Order: A ──▶ B ──▶ D ──▶ C`,
    diagram: null,
    table: null,
    notes: null,
    keyPoints: [
      'Explores as deep as possible along each branch before backtracking.',
      'Uses a Stack or Recursion.'
    ],
    summary: 'DFS traverses graphs along deep branches before backtracking using a Stack.'
  },
  {
    id: 41,
    unitId: 8,
    questionNumber: 'Q41',
    slug: 'q41-representation-of-graph',
    title: 'Representation of Graph',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '📊',
    theory: `Graph Representation is the method of storing a graph in computer memory using suitable data structures, so that operations like traversal, searching, and path finding can be performed efficiently.`,
    explanation: `1. Adjacency Matrix: A 2D array where rows and columns represent vertices, and values (1 or 0) indicate edge existence.\n• Matrix size = n x n.\n\n2. Adjacency List: Represents a graph as a collection of lists, where each vertex stores a list of its adjacent vertices.\n• Saves memory compared to matrix.`,
    diagram: `Adjacency Matrix Example (Graph A-B, A-C, B-D, C-D):
    A  B  C  D
A [ 0  1  1  0 ]
B [ 1  0  0  1 ]
C [ 1  0  0  1 ]
D [ 0  1  1  0 ]

Adjacency List Example:
A ──▶ [ B, C ]
B ──▶ [ A, D ]
C ──▶ [ A, D ]
D ──▶ [ B, C ]`,
    table: {
      headers: ['Aspect', 'Adjacency Matrix', 'Adjacency List'],
      rows: [
        ['Data Structure', 'Uses 2D array', 'Uses lists'],
        ['Space Complexity', 'More memory (O(n²))', 'Less memory (O(V + E))'],
        ['Implementation', 'Easy to implement', 'More efficient'],
        ['Edge Check', 'O(1)', 'O(degree of vertex)'],
        ['Best for', 'Dense graphs', 'Sparse graphs']
      ]
    },
    notes: null,
    keyPoints: [
      'Adjacency Matrix: 2D array (best for dense graphs, O(n²) space).',
      'Adjacency List: Array of linked lists (best for sparse graphs, O(V+E) space).'
    ],
    summary: 'Graphs are represented via Adjacency Matrix (dense) or Adjacency List (sparse).'
  },
  {
    id: 50,
    unitId: 8,
    questionNumber: 'Q50',
    slug: 'q50-explain-role-of-graphs-in-social-networks-and-web-crawling',
    title: 'Explain Role of Graphs in Social Networks and Web Crawling',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '🌐',
    theory: `The role of graphs refers to how graph data structures are used to model and solve real-world problems by representing objects as vertices (nodes) and their relationships as edges (connections).`,
    explanation: `1. Role of Graphs in Social Networks:\n• Each user is represented as a node (vertex).\n• Connections (friends/followers) are represented as edges.\n• Helps in finding mutual friends, friend suggestions, and communities.\n• Node = User, Edge = Friendship/Connection.\n\n2. Role of Graphs in Web Crawling:\n• Web pages are represented as nodes.\n• Links between pages are edges.\n• Search engine crawlers use graph traversal (BFS/DFS) to visit pages.\n• Helps search engines index websites efficiently.\n• Node = Web Page, Edge = Hyperlink.`,
    diagram: `Social Network Graph Model:
  [F]
   │
[B]───(A)───[G]  (Node = User, Edge = Connection)
   │   │
  [D] [E]`,
    table: null,
    notes: null,
    keyPoints: [
      'Social Networks: Users = Nodes, Friendships = Edges.',
      'Web Crawling: Pages = Nodes, Hyperlinks = Edges traversed via BFS/DFS.'
    ],
    summary: 'Graphs model social networks and web crawling hyperlink networks effectively.'
  },

  // ─── UNIT 9: TREES ───
  {
    id: 42,
    unitId: 9,
    questionNumber: 'Q42',
    slug: 'q42-what-is-tree',
    title: 'What is Tree?',
    difficulty: 'Beginner',
    duration: '15 min read',
    icon: '🌳',
    theory: `A Tree is a non-linear data structure that consists of a set of nodes connected by edges in a hierarchical manner. It has a special node called the root, and every node can have zero or more child nodes. It does not contain any cycles and follows a parent-child relationship.`,
    explanation: `A tree is a non-linear data structure used to represent hierarchical relationships between elements.\n\n• Root: Top node (A).\n• Children: B and C are children of A.\n• Leaf Nodes: Nodes having no children (D, E, F, G).`,
    diagram: `Tree Hierarchical Structure:
Level 0 ──────▶         (A) ◄── Root
                       /   \\
Level 1 ──────▶      (B)   (C)
                    /   \\  /  \\
Level 2 ──────▶   (D)   (E)(F) (G)
                         │
Level 3 ──────▶         (H)`,
    table: null,
    notes: null,
    keyPoints: [
      'Non-linear hierarchical data structure.',
      'Has exactly one Root node.',
      'No cycles allowed; every node has one parent (except root).'
    ],
    summary: 'A Tree organizes data in an acyclic hierarchy from a single root node.'
  },
  {
    id: 43,
    unitId: 9,
    questionNumber: 'Q43',
    slug: 'q43-binary-tree',
    title: 'Binary Tree',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '🌿',
    theory: `A Binary Tree is a type of tree data structure in which each node can have at most two children, called the left child and the right child. It is used to represent hierarchical data in a structured and efficient manner.`,
    explanation: `• Each node has at most 2 children.\n• Referred to as Left Child and Right Child.\n• Order of children matters.\n• Used in searching, sorting, expression trees, and heaps.`,
    diagram: `Binary Tree Example:
         (A) ◄── Root
        /   \\
      (B)   (C)
     /   \\   \\
   (D)   (E) (G)
          │
         (H)`,
    table: null,
    notes: null,
    keyPoints: [
      'Each node has AT MOST 2 children (Left Child, Right Child).',
      'Order of children matters.'
    ],
    summary: 'A Binary Tree restricts every node to having at most two ordered children.'
  },
  {
    id: 44,
    unitId: 9,
    questionNumber: 'Q44',
    slug: 'q44-tree-traversal-inorder-preorder-postorder',
    title: 'Tree Traversal (Inorder, Preorder, Postorder)',
    difficulty: 'Intermediate',
    duration: '25 min read',
    icon: '🔄',
    theory: `Tree Traversal is a technique of visiting each node of a tree exactly once in a systematic way. In binary trees, there are three main types of traversal: Inorder, Preorder, and Postorder.`,
    explanation: `1. Inorder Traversal (LNR):\n• Order: Left ──▶ Node ──▶ Right\n• Output for sample tree: D ──▶ B ──▶ E ──▶ A ──▶ C\n\n2. Preorder Traversal (NLR):\n• Order: Node ──▶ Left ──▶ Right\n• Output for sample tree: A ──▶ B ──▶ D ──▶ E ──▶ C\n\n3. Postorder Traversal (LRN):\n• Order: Left ──▶ Right ──▶ Node\n• Output for sample tree: D ──▶ E ──▶ B ──▶ C ──▶ A`,
    diagram: `Example Tree:
       (A)
      /   \\
    (B)   (C)
   /   \\
 (D)   (E)`,
    table: null,
    notes: null,
    keyPoints: [
      'Inorder (LNR): Left ──▶ Node ──▶ Right.',
      'Preorder (NLR): Node ──▶ Left ──▶ Right.',
      'Postorder (LRN): Left ──▶ Right ──▶ Node.'
    ],
    summary: 'Tree traversals visit nodes in Inorder (LNR), Preorder (NLR), or Postorder (LRN) sequences.'
  },
  {
    id: 45,
    unitId: 9,
    questionNumber: 'Q45',
    slug: 'q45-binary-search-tree-bst',
    title: 'Binary Search Tree (BST)',
    difficulty: 'Intermediate',
    duration: '20 min read',
    icon: '🎯',
    theory: `A Binary Search Tree (BST) is a binary tree in which each node follows a specific property:
• All elements in the left subtree are LESS than the node.
• All elements in the right subtree are GREATER than the node.
This property is called the Binary Search Property and helps in fast searching.`,
    explanation: `BST property enables binary search logic on trees, yielding O(log n) search, insertion, and deletion speeds on balanced trees.`,
    diagram: `BST Structure Example:
         (50) ◄── Root
        /    \\
     (30)    (70)
    /    \\
  (20)   (40)`,
    table: null,
    notes: null,
    keyPoints: [
      'Left Subtree < Root < Right Subtree property.',
      'Allows efficient O(log n) searching, insertion, and deletion.'
    ],
    summary: 'A Binary Search Tree enforces Left < Root < Right ordering for fast logarithmic operations.'
  },
  {
    id: 46,
    unitId: 9,
    questionNumber: 'Q46',
    slug: 'q46-insertion-and-deletion-in-bst',
    title: 'Insertion & Deletion in BST',
    difficulty: 'Advanced',
    duration: '25 min read',
    icon: '✂️',
    theory: `Insertion and Deletion in BST are operations used to add and remove nodes in a binary search tree while maintaining the BST property, where all elements in the left subtree are smaller and in the right subtree are larger than the root.`,
    explanation: `1. Insertion in BST:\n• Compare new value with current node ──▶ If smaller ──▶ go left ──▶ If larger ──▶ go right ──▶ Insert at leaf position.\n\n2. Deletion in BST (3 Cases):\n• Case 1: Deleting a Leaf Node ──▶ Simply remove the node.\n• Case 2: Node with One Child ──▶ Replace node with its child.\n• Case 3: Node with Two Children ──▶ Replace node with Inorder Successor (smallest in right subtree), then delete that successor node.`,
    diagram: `Deleting Node with 2 Children Example (Delete 30):
Original BST:          Inorder Successor of 30 is 40.
     (50)              Replace 30 with 40 ──▶ Result:
    /    \\                                     (50)
  (30)   (70)                                 /    \\
  /  \\                                      (40)   (70)
(20) (40)                                   /
                                          (20)`,
    table: null,
    notes: null,
    keyPoints: [
      'Insertion traverses down to appropriate leaf position.',
      'Deletion handles 3 cases: Leaf, 1 Child, or 2 Children (replace with Inorder Successor).'
    ],
    summary: 'BST insertion adds nodes at leaves; deletion replaces 2-children nodes with their Inorder Successor.'
  },
  {
    id: 56,
    unitId: 9,
    questionNumber: 'Q56',
    slug: 'q56-difference-between-avl-trees-and-red-black-trees',
    title: 'Difference between AVL Trees and Red-Black Trees',
    difficulty: 'Advanced',
    duration: '25 min read',
    icon: '⚖️',
    theory: `AVL trees and Red-Black trees are both self-balancing binary search trees used to maintain balanced height for efficient operations like searching, insertion, and deletion.`,
    explanation: `Definitions:\n• AVL Tree: A self-balancing BST where the height difference (balance factor = left height - right height) is at most 1 (-1, 0, +1).\n• Red-Black Tree: A self-balancing BST where each node is colored red or black and follows specific color rules.\n\nConclusion:\n• AVL trees are more strictly balanced ──▶ better for search-heavy applications.\n• Red-Black trees require fewer rotations ──▶ better for insertion/deletion heavy applications.`,
    diagram: null,
    table: {
      headers: ['Basis', 'AVL Tree', 'Red-Black Tree'],
      rows: [
        ['Balancing Method', 'Strict balancing using height difference', 'Balancing using color properties (red/black)'],
        ['Balance Condition', 'Balance factor = -1, 0, +1', 'Follows color rules (no two red nodes together, etc.)'],
        ['Height', 'More strictly balanced (shorter height)', 'Less strictly balanced (slightly taller)'],
        ['Rotations', 'More rotations required', 'Fewer rotations required'],
        ['Search Operation', 'Faster searching due to better balance', 'Slightly slower than AVL'],
        ['Insertion/Deletion', 'More complex and time-consuming', 'Simpler and faster'],
        ['Usage', 'Used when searching is frequent', 'Used in system libraries (like maps, sets)']
      ]
    },
    notes: null,
    keyPoints: [
      'AVL Trees: Height-balanced (balance factor ≤ 1), faster search, more rotations.',
      'Red-Black Trees: Color-balanced, faster insertion/deletion, fewer rotations.'
    ],
    summary: 'AVL trees strictly balance height for fast searching; Red-Black trees color-balance to minimize insertion/deletion rotations.'
  }
];
