/**
 * Semester 2 — Data Structures (BCA-202)
 * Unit 1: Fundamentals of Data Structures & Arrays
 * 12 Comprehensive Academic Questions & Solutions
 */

export const DS_UNIT1_QUESTIONS = [
  {
    id: 1,
    questionNumber: 'Question 01',
    slug: 'q1-data-structures-introduction-classification',
    title: 'What is a Data Structure? Explain its classification into Linear, Non-Linear, Primitive, and Non-Primitive Data Structures.',
    desc: 'Definition of data structure, logical memory layout, and comprehensive taxonomy of primitive vs non-primitive, linear vs non-linear structures.',
    difficulty: 'Beginner',
    duration: '20 min',
    icon: '📊'
  },
  {
    id: 2,
    questionNumber: 'Question 02',
    slug: 'q2-operations-of-data-structures',
    title: 'What are the fundamental operations performed on Data Structures? Explain with real-world computer science examples.',
    desc: 'Detailed analysis of Traversing, Insertion, Deletion, Searching, Sorting, and Merging operations across different memory layouts.',
    difficulty: 'Beginner',
    duration: '15 min',
    icon: '⚙️'
  },
  {
    id: 3,
    questionNumber: 'Question 03',
    slug: 'q3-algorithm-notations-control-structures',
    title: 'Define an Algorithm. Explain Algorithmic Notations, Characteristics, and Control Structures used in algorithm design.',
    desc: 'Formal algorithm criteria (Input, Output, Definiteness, Finiteness, Effectiveness) and pseudo-code control logic (Sequence, Selection, Iteration).',
    difficulty: 'Beginner',
    duration: '20 min',
    icon: '🧩'
  },
  {
    id: 4,
    questionNumber: 'Question 04',
    slug: 'q4-complexity-time-space-tradeoffs',
    title: 'What is Time Complexity and Space Complexity? Explain Big-O notation and Time-Space Tradeoffs in data structure performance.',
    desc: 'Asymptotic notation (O, Ω, Θ), worst-case vs best-case analysis, auxiliary memory utilization, and hardware time-space trade-offs.',
    difficulty: 'Intermediate',
    duration: '25 min',
    icon: '⏱️'
  },
  {
    id: 5,
    questionNumber: 'Question 05',
    slug: 'q5-array-definition-representation',
    title: 'What is an Array? Explain the characteristics, classification, and memory representation of 1D (Linear) Arrays.',
    desc: 'Homogeneous memory elements, contiguous allocation, index calculation base address formula LOC(A[k]) = Base(A) + w * (k - LowerBound).',
    difficulty: 'Beginner',
    duration: '20 min',
    icon: '🔢'
  },
  {
    id: 6,
    questionNumber: 'Question 06',
    slug: 'q6-array-operations-traversing-insertion-deletion',
    title: 'Explain fundamental operations on Linear Arrays: Traversing, Insertion, and Deletion with detailed step-by-step algorithms.',
    desc: 'Element shifting logic, array bounds checking, memory reallocation, algorithm pseudo-code, and time complexity analysis for array modification.',
    difficulty: 'Intermediate',
    duration: '25 min',
    icon: '📝'
  },
  {
    id: 7,
    questionNumber: 'Question 07',
    slug: 'q7-linear-vs-binary-search',
    title: 'Compare Linear Search and Binary Search algorithms with step-by-step trace, pseudo-code, and complexity comparison.',
    desc: 'Sequential search vs Divide-and-Conquer binary search on sorted arrays. Time complexity O(n) vs O(log n) comparison.',
    difficulty: 'Intermediate',
    duration: '25 min',
    icon: '🔍'
  },
  {
    id: 8,
    questionNumber: 'Question 08',
    slug: 'q8-bubble-selection-insertion-sort',
    title: 'Explain Bubble Sort, Selection Sort, and Insertion Sort algorithms with working examples, pseudo-code, and time complexity.',
    desc: 'Swapping adjacent elements (Bubble), finding minimum element (Selection), and building sorted sub-array (Insertion) in O(n²) time.',
    difficulty: 'Intermediate',
    duration: '30 min',
    icon: '🔀'
  },
  {
    id: 9,
    questionNumber: 'Question 09',
    slug: 'q9-merging-technique-merge-sort',
    title: 'Explain the Merging Technique and Merge Sort algorithm with a step-by-step Divide and Conquer breakdown.',
    desc: 'Two-way merging of sorted arrays, recursive partitioning, merge algorithm pseudo-code, and O(n log n) stability analysis.',
    difficulty: 'Intermediate',
    duration: '30 min',
    icon: '⚡'
  },
  {
    id: 10,
    questionNumber: 'Question 10',
    slug: 'q10-two-dimensional-arrays-memory-representation',
    title: 'Explain Two-Dimensional (2D) Arrays, Row-Major vs Column-Major Order memory mapping formulas, and Multi-Dimensional Arrays.',
    desc: 'Matrix indexing, address calculations: Row-Major LOC(A[i][j]) = Base + w[(i-L1)*N + (j-L2)] and Column-Major address derivation.',
    difficulty: 'Intermediate',
    duration: '25 min',
    icon: '🧮'
  },
  {
    id: 11,
    questionNumber: 'Question 11',
    slug: 'q11-sparse-matrices-representation',
    title: 'What is a Sparse Matrix? Explain its memory representation schemes (3-Tuple Representation and Linked List Representation).',
    desc: 'Matrices with majority zero elements, 3-tuple format (Row, Column, Value), memory saving benefits, and matrix operations.',
    difficulty: 'Intermediate',
    duration: '20 min',
    icon: '📐'
  },
  {
    id: 12,
    questionNumber: 'Question 12',
    slug: 'q12-advantages-drawbacks-of-arrays',
    title: 'Summarize the Advantages and Drawbacks of Array Data Structure compared to Linked Lists and Dynamic Memory Structures.',
    desc: 'Random access O(1) benefit vs fixed size allocation, costly insertion/deletion shifting, memory fragmentation, and cache friendliness.',
    difficulty: 'Beginner',
    duration: '15 min',
    icon: '📋'
  }
];

export const DS_UNIT1_CONTENT = {

  'q1-data-structures-introduction-classification': {
    title: 'What is a Data Structure? Explain its classification into Linear, Non-Linear, Primitive, and Non-Primitive Data Structures.',
    theory: `A Data Structure is a specialized format for organizing, processing, retrieving, and storing data in computer memory so that operations can be performed efficiently.

Formal Definition:
A Data Structure is a mathematical or logical model of a particular organization of data items. It defines the data elements, the relationships between them, and the set of operations that can be applied to them.

Taxonomy / Classification of Data Structures:

1. Primitive Data Structures:
   - Built-in data types directly supported by machine instructions and hardware.
   - Examples: Integer ('int'), Character ('char'), Floating-point ('float'), Pointer.

2. Non-Primitive Data Structures:
   - Derived data structures created by combining primitive data types to represent complex data models.
   - Divided into two main categories:
     a) Linear Data Structures:
        - Data elements are arranged sequentially or linearly, where each element is connected to its previous and next elements.
        - Examples: Arrays, Stacks, Queues, Linked Lists.
     b) Non-Linear Data Structures:
        - Data elements are arranged hierarchically or interconnected in a multi-level network.
        - Examples: Trees (Binary Tree, BST, AVL Tree), Graphs.`,
    explanation: `Understanding the distinction between linear and non-linear data structures is essential for algorithm design. Linear structures provide sequential access with fixed memory models (like Arrays) or dynamic pointer pointers (like Linked Lists). Non-linear structures express complex relationships such as hierarchies (Trees) and networks (Graphs).`,
    diagram: `Data Structures Taxonomy:
┌─────────────────────────────────────────────────────────────┐
│                       DATA STRUCTURES                       │
└──────────────────────────────┬──────────────────────────────┘
               ┌───────────────┴───────────────┐
               ▼                               ▼
    [Primitive Data Types]           [Non-Primitive Types]
   (int, float, char, ptr)                     │
                        ┌──────────────────────┴──────────────────────┐
                        ▼                                             ▼
             [Linear Data Structures]             [Non-Linear Data Structures]
         (Array, Stack, Queue, LinkedList)             (Tree, Graph, Heap)`,
    keyPoints: [
      'Primitive data types are machine-supported basic types.',
      'Linear data structures order elements in a single sequential line.',
      'Non-Linear data structures represent hierarchical or network relationships.',
      'Data structure selection directly dictates time and space complexity.'
    ],
    summary: 'Data structures provide the logical framework for organizing data. Choosing between Primitive/Non-Primitive and Linear/Non-Linear depends on access patterns, memory requirements, and operations needed.'
  },

  'q2-operations-of-data-structures': {
    title: 'What are the fundamental operations performed on Data Structures? Explain with real-world computer science examples.',
    theory: `The data processing cycle involves several fundamental operations that can be performed on data structures depending on the application context.

Primary Data Structure Operations:

1. Traversing:
   - Accessing every element in the data structure exactly once to process or display it.
   - Example: Printing all student roll numbers stored in an array.

2. Insertion:
   - Adding a new data element into an existing data structure at a specified position.
   - Example: Inserting a new record into a sorted list.

3. Deletion:
   - Removing an existing data element from the data structure.
   - Example: Deleting a process from a CPU scheduling queue upon completion.

4. Searching:
   - Finding the location or presence of a specific target element within the data structure.
   - Example: Searching for a user ID using Linear Search or Binary Search.

5. Sorting:
   - Arranging data elements in a specific order (ascending or descending).
   - Example: Sorting student scores using Bubble Sort or Quick Sort.

6. Merging:
   - Combining elements of two distinct sorted data structures into a single unified sorted structure.
   - Example: Merging two sorted sub-lists in Merge Sort.`,
    explanation: `Each operation has an associated time complexity O(f(n)) depending on the data structure used. For instance, searching in an unsorted array takes O(n) time, whereas in a Binary Search Tree (BST) it takes O(log n) time.`,
    diagram: `Operations Overview:
[Traverse]  ──▶ Visit every element
[Insert]    ──▶ Add new element
[Delete]    ──▶ Remove element
[Search]    ──▶ Find element location
[Sort]      ──▶ Order elements (Asc/Desc)
[Merge]     ──▶ Combine two structures into one`,
    keyPoints: [
      'Traversing accesses every element once.',
      'Insertion and Deletion alter the size or state of the data structure.',
      'Searching locates specific target values.',
      'Sorting orders elements according to a key.',
      'Merging unifies two sorted structures.'
    ],
    summary: 'The 6 core operations — Traverse, Insert, Delete, Search, Sort, and Merge — form the basis of all data manipulation in computer science.'
  },

  'q3-algorithm-notations-control-structures': {
    title: 'Define an Algorithm. Explain Algorithmic Notations, Characteristics, and Control Structures used in algorithm design.',
    theory: `An Algorithm is a finite, step-by-step sequence of well-defined instructions designed to solve a specific problem or perform a task.

5 Essential Characteristics of an Algorithm:
1. Input: Zero or more quantities supplied externally.
2. Output: At least one result produced.
3. Definiteness: Each instruction must be clear, unambiguous, and precise.
4. Finiteness: The algorithm must terminate after a finite number of steps for all inputs.
5. Effectiveness: Every operation must be basic enough to be carried out in practice.

Algorithmic Control Structures:
Algorithms rely on 3 fundamental control logic structures:
- Sequential Structure: Steps executed one after another in order.
- Selection (Conditional) Structure: Decisions based on conditions (if-then-else, switch).
- Iterative (Repetitive) Structure: Loops repeating steps until a condition is met (for, while, do-while).`,
    explanation: `Pseudo-code uses structured english syntax to represent control structures independently of programming languages. Good algorithm design requires clear variable assignment, unambiguous loop bounds, and explicit return conditions.`,
    diagram: `Algorithm Control Flow:
[Sequential]  ──▶ Step 1 ──▶ Step 2 ──▶ Step 3
[Selection]   ──▶ If (Condition) Then Step A Else Step B
[Iterative]   ──▶ While (Condition Is True) Do [Repeat Block]`,
    keyPoints: [
      'An algorithm must be finite, definite, effective, and produce output.',
      'Sequential, Selection, and Iterative control structures form the foundation of algorithm logic.',
      'Algorithmic notations include pseudo-code, flowcharts, and formal structured English.'
    ],
    summary: 'Algorithms provide the step-by-step logic required to solve computational tasks using sequential, selection, and iterative control structures.'
  },

  'q4-complexity-time-space-tradeoffs': {
    title: 'What is Time Complexity and Space Complexity? Explain Big-O notation and Time-Space Tradeoffs in data structure performance.',
    theory: `Algorithm Analysis evaluates the efficiency of an algorithm based on two resources: Time (Execution Speed) and Space (Memory Usage).

1. Time Complexity:
   - The total amount of time required by an algorithm to run to completion as a function of the input size (n).

2. Space Complexity:
   - The total memory space required by an algorithm during execution.
   - Space Complexity = Fixed Space (code, simple variables) + Auxiliary Space (dynamic allocation, recursion stack).

Asymptotic Notations:
- Big-O (O): Upper bound / Worst-case scenario.
- Big-Omega (Ω): Lower bound / Best-case scenario.
- Big-Theta (Θ): Tight bound / Average-case scenario.

Time-Space Tradeoff:
In algorithm design, improving time efficiency often requires increasing space consumption, and vice versa.
Example: Hashing achieves O(1) constant search time by allocating extra memory for hash tables (trading space for speed).`,
    explanation: `Big-O notation abstracts machine execution speeds to focus purely on growth rates relative to input size n. Common Big-O classes from fastest to slowest: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).`,
    diagram: `Asymptotic Growth Hierarchy:
Fastest ──────────────────────────────────────────────────▶ Slowest
O(1)     O(log n)     O(n)     O(n log n)     O(n²)     O(2ⁿ)
Constant Logarithmic  Linear   Linearithmic Quadratic Exponential`,
    keyPoints: [
      'Time Complexity measures execution time growth rate.',
      'Space Complexity includes fixed code space and auxiliary dynamic space.',
      'Big-O notation specifies the worst-case upper bound.',
      'Time-Space Tradeoff: Sacrificing memory can frequently accelerate execution speed.'
    ],
    summary: 'Complexity analysis quantifies algorithm efficiency using Big-O notation. Data structure choices depend on balancing time and space tradeoffs.'
  },

  'q5-array-definition-representation': {
    title: 'What is an Array? Explain the characteristics, classification, and memory representation of 1D (Linear) Arrays.',
    theory: `An Array is a linear data structure consisting of a collection of homogeneous (same data type) elements stored in contiguous (consecutive) memory locations.

Characteristics of an Array:
- Fixed Size: Size must be defined at compilation/allocation time.
- Homogeneous: All elements are of the exact same data type.
- Random Access: Any element can be accessed in O(1) constant time using its index.
- Contiguous Memory: Elements are stored in contiguous address locations.

Memory Address Calculation Formula for 1D Array:
The memory location of the k-th element in a 1D array A is computed as:
LOC(A[k]) = Base(A) + w * (k - LB)

Where:
- Base(A) = Memory address of the first element (A[LB]).
- w = Size of each element in bytes (e.g., 4 bytes for int).
- k = Index of the desired element.
- LB = Lower Bound (starting index, usually 0 or 1).`,
    explanation: `Because memory addresses are contiguous, the CPU calculates the offset instantly: LOC(A[k]) = Base + w * k (assuming LB=0). This direct arithmetic is why array indexing takes O(1) time.`,
    diagram: `1D Array Memory Layout (Base Address = 1000, Element Size = 4 bytes):
Index:      [ 0 ]     [ 1 ]     [ 2 ]     [ 3 ]     [ 4 ]
Value:     |  45  |  88  |  12  |  67  |  90  |
Address:   1000      1004      1008      1012      1016
           ▲
       Base Address`,
    keyPoints: [
      'Arrays store homogeneous elements in contiguous memory.',
      'Direct index access takes O(1) time.',
      'Address Formula: LOC(A[k]) = Base(A) + w * (k - LB).',
      'Array size is fixed upon initialization.'
    ],
    summary: 'Linear arrays offer fast O(1) random access via memory address arithmetic, making them suitable for indexed data lookup.'
  },

  'q6-array-operations-traversing-insertion-deletion': {
    title: 'Explain fundamental operations on Linear Arrays: Traversing, Insertion, and Deletion with detailed step-by-step algorithms.',
    theory: `1. Traversing an Array:
   - Visiting each element from index LB to UB to process its data.
   - Algorithm:
     Step 1: Set K = LB.
     Step 2: Repeat Steps 3 and 4 while K <= UB.
     Step 3: Apply Process to A[K].
     Step 4: Set K = K + 1.
     Step 5: Exit.
   - Time Complexity: O(n).

2. Insertion into an Array:
   - Inserting an item ITEM at index POS requires shifting elements to the right.
   - Algorithm:
     Step 1: Set J = N.
     Step 2: Repeat Steps 3 and 4 while J >= POS.
     Step 3: Set A[J+1] = A[J] (Shift Right).
     Step 4: Set J = J - 1.
     Step 5: Set A[POS] = ITEM.
     Step 6: Set N = N + 1.
     Step 7: Exit.
   - Time Complexity: O(n) worst/average case.

3. Deletion from an Array:
   - Deleting element at index POS requires shifting subsequent elements to the left.
   - Algorithm:
     Step 1: Set ITEM = A[POS].
     Step 2: Repeat for K = POS to N-1:
               Set A[K] = A[K+1] (Shift Left).
     Step 3: Set N = N - 1.
     Step 4: Exit.
   - Time Complexity: O(n).`,
    explanation: `Array insertion and deletion require shifting up to n elements, resulting in linear O(n) time complexity. This is the main performance drawback of arrays compared to linked lists.`,
    diagram: `Array Insertion Shifting (Insert 99 at POS 2):
Initial:  [10] [20] [30] [40]
Shift:    [10] [20] [  ] [30] [40]  (Shift right elements from POS 2)
Insert:   [10] [20] [99] [30] [40]`,
    keyPoints: [
      'Traversing visits every element in O(n) time.',
      'Insertion requires right-shifting elements: O(n).',
      'Deletion requires left-shifting elements: O(n).',
      'Operations at the end of the array take O(1) time.'
    ],
    summary: 'While array access is O(1), inserting or deleting elements requires shifting data, resulting in O(n) time complexity.'
  },

  'q7-linear-vs-binary-search': {
    title: 'Compare Linear Search and Binary Search algorithms with step-by-step trace, pseudo-code, and complexity comparison.',
    theory: `Searching is the process of finding the position of a target element in a data structure.

1. Linear (Sequential) Search:
   - Sequentially compares the key with each element from start to end until a match is found.
   - Works on both Unsorted and Sorted arrays.
   - Time Complexity: Best: O(1), Worst: O(n), Average: O(n).

2. Binary Search:
   - Uses Divide and Conquer on a SORTED array.
   - Compares key with the middle element (MID = (LOW + HIGH) / 2).
   - If key == A[MID], found. If key < A[MID], search left half (HIGH = MID - 1). Else search right half (LOW = MID + 1).
   - Time Complexity: Best: O(1), Worst: O(log n), Average: O(log n).

Comparison Table:
┌─────────────────────┬──────────────────────┬──────────────────────┐
│ Property            │ Linear Search        │ Binary Search        │
├─────────────────────┼──────────────────────┼──────────────────────┤
│ Array Requirement   │ Unsorted or Sorted   │ MUST be Sorted       │
│ Worst Time          │ O(n)                 │ O(log n)             │
│ Approach            │ Sequential           │ Divide & Conquer     │
│ Access Type         │ Sequential Access    │ Random Access        │
└─────────────────────┴──────────────────────┴──────────────────────┘`,
    explanation: `Binary search exponentially reduces the search space by half in every iteration (n -> n/2 -> n/4 -> ... -> 1), yielding logarithmic O(log n) efficiency.`,
    diagram: `Binary Search Trace (Find Key = 23 in Sorted Array):
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
LOW=0, HIGH=9 ──▶ MID=4 (A[4]=16). 23 > 16 ──▶ Search Right (LOW=5)
LOW=5, HIGH=9 ──▶ MID=7 (A[7]=56). 23 < 56 ──▶ Search Left (HIGH=6)
LOW=5, HIGH=6 ──▶ MID=5 (A[5]=23). Match Found at Index 5!`,
    keyPoints: [
      'Linear search checks elements sequentially: O(n).',
      'Binary search requires a SORTED array: O(log n).',
      'Binary search uses Divide and Conquer logic.',
      'For large datasets, Binary Search is exponentially faster.'
    ],
    summary: 'Linear Search works on unsorted data in O(n) time, whereas Binary Search requires sorted data to achieve efficient O(log n) search performance.'
  },

  'q8-bubble-selection-insertion-sort': {
    title: 'Explain Bubble Sort, Selection Sort, and Insertion Sort algorithms with working examples, pseudo-code, and time complexity.',
    theory: `Sorting arranges data elements in ascending or descending order.

1. Bubble Sort:
   - Repeatedly compares adjacent elements and swaps them if they are in wrong order.
   - Largest element "bubbles up" to its correct position in each pass.
   - Time Complexity: O(n²) Worst/Average, O(n) Best (with flag).

2. Selection Sort:
   - Repeatedly finds the minimum element from the unsorted sub-array and swaps it with the first unsorted element.
   - Reduces swaps to O(n).
   - Time Complexity: O(n²) in all cases.

3. Insertion Sort:
   - Builds the sorted array one item at a time by picking an element and inserting it into its correct position in the sorted sub-array.
   - Efficient for small or nearly sorted arrays.
   - Time Complexity: Best: O(n), Worst/Average: O(n²).`,
    explanation: `Bubble Sort performs many swaps, Selection Sort minimizes swaps to O(n), and Insertion Sort is adaptive, executing in O(n) time when the input is nearly sorted.`,
    diagram: `Sorting Approaches Summary:
[Bubble Sort]    ──▶ Compare adjacent (A[i], A[i+1]) and swap.
[Selection Sort] ──▶ Find Min in unsorted region, swap to front.
[Insertion Sort] ──▶ Insert current element into correct position in sorted left sub-array.`,
    keyPoints: [
      'Bubble, Selection, and Insertion sorts are simple O(n²) algorithms.',
      'Bubble sort swaps adjacent pairs repeatedly.',
      'Selection sort performs O(n) swaps by finding minimums.',
      'Insertion sort performs O(n) best-case time for nearly sorted input.'
    ],
    summary: 'Simple comparison sorts (Bubble, Selection, Insertion) have O(n²) worst-case complexity, suitable for small datasets.'
  },

  'q9-merging-technique-merge-sort': {
    title: 'Explain the Merging Technique and Merge Sort algorithm with a step-by-step Divide and Conquer breakdown.',
    theory: `Merge Sort is a stable, comparison-based, Divide-and-Conquer sorting algorithm.

Algorithm Steps:
1. Divide: Divide the array of size n into two sub-arrays of size n/2 at the midpoint MID = (LOW + HIGH) / 2.
2. Conquer: Recursively sort both sub-arrays using Merge Sort.
3. Combine (Merge): Merge the two sorted sub-arrays back into a single sorted array.

Merging Technique Algorithm:
Given two sorted arrays A[1..r] and B[1..s], merge them into C[1..r+s]:
- Compare current elements A[i] and B[j].
- Place the smaller element into C[k] and advance the corresponding index (i or j).
- Copy any remaining elements when one sub-array is exhausted.

Complexity:
- Time Complexity: O(n log n) in Best, Average, and Worst cases.
- Auxiliary Space: O(n) extra space for merging.`,
    explanation: `Merge Sort guarantees O(n log n) performance even in worst-case scenarios, unlike Quick Sort which can degrade to O(n²). However, it requires O(n) auxiliary memory space for temporary array merging.`,
    diagram: `Merge Sort Divide & Conquer Tree:
                 [38, 27, 43, 3, 9, 82, 10]
                      /              \\
             [38, 27, 43, 3]       [9, 82, 10]
               /       \\             /     \\
           [38, 27]   [43, 3]     [9, 82]  [10]
            /   \\      /   \\       /   \\
          [38] [27]  [43]  [3]   [9]  [82]
            \\   /      \\   /       \\   /
           [27, 38]   [3, 43]     [9, 82]  [10]
               \\       /             \\     /
             [3, 27, 38, 43]       [9, 10, 82]
                      \\              /
                 [3, 9, 10, 27, 38, 43, 82]`,
    keyPoints: [
      'Merge Sort uses Divide and Conquer logic.',
      'Guarantees O(n log n) time complexity in all cases.',
      'Requires O(n) auxiliary memory space for merging.',
      'Stable sorting algorithm.'
    ],
    summary: 'Merge Sort guarantees reliable O(n log n) performance by recursively dividing arrays and combining sorted halves using the Merging Technique.'
  },

  'q10-two-dimensional-arrays-memory-representation': {
    title: 'Explain Two-Dimensional (2D) Arrays, Row-Major vs Column-Major Order memory mapping formulas, and Multi-Dimensional Arrays.',
    theory: `A Two-Dimensional (2D) Array is a grid of homogeneous elements organized in Rows and Columns (Matrix structure A[M][N]).

Memory Representation of 2D Arrays:
Since computer memory is strictly 1D (linear), a 2D array must be mapped into consecutive 1D memory locations using one of two layout conventions:

1. Row-Major Order (RMO):
   - Elements are stored row-by-row in linear memory. (Row 0 first, then Row 1, etc.).
   - Address Calculation Formula:
     LOC(A[i][j]) = Base(A) + w * [ (i - L1) * N + (j - L2) ]
     Where M=Rows, N=Columns, L1=Row lower bound, L2=Column lower bound, w=element size.

2. Column-Major Order (CMO):
   - Elements are stored column-by-column in linear memory. (Column 0 first, then Column 1, etc.).
   - Address Calculation Formula:
     LOC(A[i][j]) = Base(A) + w * [ (j - L2) * M + (i - L1) ]

C and C++ use Row-Major Order, whereas Fortran and MATLAB use Column-Major Order.`,
    explanation: `Row-Major Order stores all elements of a row together, ensuring spatial locality when iterating over rows. Column-Major Order stores column elements together. Address computation formulas calculate the exact offset in O(1) time.`,
    diagram: `2D Matrix vs Linear Memory (RMO):
Matrix A[2][3]:
[ A00  A01  A02 ]
[ A10  A11  A12 ]

Row-Major Linear Storage:
Address: 1000  1004  1008  1012  1016  1020
Element: A00   A01   A02   A10   A11   A12
         └──── Row 0 ────┘ └──── Row 1 ────┘`,
    keyPoints: [
      '2D arrays map grid structures into 1D linear computer memory.',
      'Row-Major Order stores elements row-by-row (C/C++ standard).',
      'Column-Major Order stores elements column-by-column.',
      'Address calculation formula achieves O(1) memory lookup.'
    ],
    summary: '2D arrays are mapped to linear memory via Row-Major or Column-Major order, enabling exact offset calculation in O(1) time.'
  },

  'q11-sparse-matrices-representation': {
    title: 'What is a Sparse Matrix? Explain its memory representation schemes (3-Tuple Representation and Linked List Representation).',
    theory: `A Sparse Matrix is a matrix in which the majority of elements are zero (0).

Problem with Standard Array Storage:
Storing a large sparse matrix (e.g., 1000 x 1000 with only 100 non-zero elements) in a standard 2D array wastes memory storing zeros and slows matrix operations.

Sparse Matrix Representation Schemes:

1. 3-Tuple (Coordinate) Representation:
   - Stores ONLY non-zero elements in a 2D array with 3 columns: [Row, Column, Value].
   - Row 0 holds metadata: [Total Rows, Total Columns, Total Non-Zero Count].
   - Subsequent rows hold [i, j, A[i][j]] for each non-zero element.

2. Linked List Representation:
   - Each non-zero element is stored in a node containing: row, col, val, next_row, next_col pointers.
   - Eliminates static array allocation entirely.`,
    explanation: `3-Tuple representation reduces space complexity from O(M x N) down to O(K), where K is the number of non-zero elements. This yields immense memory savings for large engineering matrices.`,
    diagram: `Sparse Matrix 3-Tuple Example:
Original Matrix (4x4):            3-Tuple Representation:
[ 0  0  0  5 ]                    Row   Col   Value
[ 0  8  0  0 ]             [0]     4     4      3     (Metadata)
[ 0  0  0  0 ]             [1]     0     3      5
[ 2  0  0  0 ]             [2]     1     1      8
                           [3]     3     0      2`,
    keyPoints: [
      'Sparse matrices contain a majority of zero values.',
      '3-Tuple representation stores (Row, Col, Value) for non-zero elements.',
      'Saves memory by reducing space complexity to O(K) non-zero elements.',
      'Widely used in scientific computing and network graph algorithms.'
    ],
    summary: 'Sparse matrices optimize memory storage by recording only non-zero entries using 3-Tuple or Linked List representations.'
  },

  'q12-advantages-drawbacks-of-arrays': {
    title: 'Summarize the Advantages and Drawbacks of Array Data Structure compared to Linked Lists and Dynamic Memory Structures.',
    theory: `Arrays are the fundamental linear data structure in programming, but they possess inherent trade-offs.

Advantages of Arrays:
1. Fast Random Access: Direct O(1) element lookup using index arithmetic A[i].
2. Cache Friendliness: Contiguous memory allocation maximizes CPU cache hit rates.
3. Simple Memory Model: Minimal memory overhead (no extra pointers required).
4. Ease of Implementation: Native support in virtually all programming languages.

Drawbacks of Arrays:
1. Fixed Size: Array capacity must be declared upfront, leading to overflow or memory waste.
2. Expensive Insertion & Deletion: Modifying middle elements requires shifting up to n elements: O(n) time.
3. Contiguous Memory Requirement: Requires a single continuous block of available memory space.
4. Memory Wastage: Unused allocated array slots remain reserved.

Comparison Summary:
- Use Arrays when size is fixed and frequent random index lookup is needed.
- Use Linked Lists when size is dynamic and frequent insertions/deletions are required.`,
    explanation: `Arrays excel in read-heavy applications where size is known. Linked lists or dynamic arrays (like C++ vector / Java ArrayList) overcome fixed size limitations through dynamic reallocation.`,
    diagram: `Arrays vs Linked Lists Comparison:
┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
│ Feature                 │ Array                   │ Linked List             │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ Access Time             │ O(1) Random Access      │ O(n) Sequential Access  │
│ Insertion/Deletion      │ O(n) (Requires Shift)   │ O(1) (Pointer Change)   │
│ Memory Allocation       │ Contiguous / Static     │ Non-contiguous / Dynamic│
│ Extra Pointer Overhead  │ None (0 bytes)          │ 4-8 bytes per node      │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘`,
    keyPoints: [
      'Arrays provide instant O(1) random index access.',
      'Contiguous memory allocation provides CPU cache efficiency.',
      'Fixed capacity limits dynamic growth.',
      'Insertion and deletion require linear O(n) element shifting.'
    ],
    summary: 'Arrays offer fast O(1) index access and cache efficiency, but suffer from fixed size limits and O(n) element shifting costs during insertion or deletion.'
  }

};
