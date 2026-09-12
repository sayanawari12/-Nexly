/**
 * NEXLY Recommendation Engine
 * Core differentiator: Links lesson topics directly to recommended practice problems
 * and calculates qualitative skill bands.
 */

// Seeded practice problems database with difficulty & topic tags
export const PRACTICE_PROBLEMS_DB = [
  // ── Python ──────────────────────────────────────────────────────────────────
  {
    id: 'prob-py-intro-01',
    title: 'Hello Python & Shebang Line',
    difficulty: 'Easy',
    tags: ['python', 'basics', 'intro'],
    statement: 'Write a Python program that prints "Hello, NEXLY Python Learner!" to stdout.',
    starterCode: '# Write your Python code here\nprint("Hello, NEXLY Python Learner!")',
    sampleInput: 'None',
    sampleOutput: 'Hello, NEXLY Python Learner!'
  },
  {
    id: 'prob-py-var-01',
    title: 'Celsius to Fahrenheit Converter',
    difficulty: 'Easy',
    tags: ['python', 'variables', 'data-types', 'types', 'operators', 'expressions', 'math'],
    statement: 'Read a float temperature in Celsius from input and print Fahrenheit equivalent formatted to 2 decimal places.',
    starterCode: 'celsius = float(input())\nfahrenheit = (celsius * 9/5) + 32\nprint(f"{fahrenheit:.2f}")',
    sampleInput: '25',
    sampleOutput: '77.00'
  },
  {
    id: 'prob-py-var-02',
    title: 'Compound Interest Calculator',
    difficulty: 'Medium',
    tags: ['python', 'variables', 'operators', 'math', 'expressions'],
    statement: 'Calculate compound interest given principal P, rate R, and time T using A = P(1 + R/100)^T.',
    starterCode: 'def compound_interest(p, r, t):\n    return p * ((1 + r/100) ** t) - p',
    sampleInput: '1000 5 2',
    sampleOutput: '102.50'
  },
  {
    id: 'prob-py-if-01',
    title: 'Leap Year Checker',
    difficulty: 'Easy',
    tags: ['python', 'control-flow', 'conditionals', 'if-else'],
    statement: 'Check if a given year is a leap year (divisible by 4, except if divisible by 100 unless also by 400).',
    starterCode: 'year = int(input())\nis_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)\nprint("Leap Year" if is_leap else "Not Leap Year")',
    sampleInput: '2024',
    sampleOutput: 'Leap Year'
  },
  {
    id: 'prob-py-for-01',
    title: 'Print Multiples of Three',
    difficulty: 'Easy',
    tags: ['loops', 'for-loop', 'python', 'basics', 'while-loop'],
    statement: 'Write a Python loop to print all numbers divisible by 3 up to N.',
    starterCode: 'def print_multiples(n):\n    for i in range(3, n + 1, 3):\n        print(i)\n\nn = int(input())\nprint_multiples(n)',
    sampleInput: '10',
    sampleOutput: '3\n6\n9'
  },
  {
    id: 'prob-py-for-02',
    title: 'Sum of Even Numbers in List',
    difficulty: 'Medium',
    tags: ['loops', 'for-loop', 'lists', 'python', 'arrays', 'while-loop'],
    statement: 'Calculate the sum of all even numbers in a given list of integers.',
    starterCode: 'def sum_evens(arr):\n    return sum(x for x in arr if x % 2 == 0)',
    sampleInput: '[1, 2, 3, 4, 5, 6]',
    sampleOutput: '12'
  },
  {
    id: 'prob-py-for-03',
    title: 'Find Prime Factors in Range',
    difficulty: 'Hard',
    tags: ['loops', 'nested-loops', 'math', 'python', 'while-loop'],
    statement: 'Find all prime factors for numbers in range 1 to N using nested loops.',
    starterCode: 'def prime_factors(n):\n    # Write your code here\n    pass',
    sampleInput: '15',
    sampleOutput: '[2, 3, 5]'
  },
  {
    id: 'prob-py-fn-01',
    title: 'Calculate Factorial & Power with Defaults',
    difficulty: 'Easy',
    tags: ['python', 'functions', 'methods', 'lambda'],
    statement: 'Define a function compute_power(base, exp=2) that calculates base^exp.',
    starterCode: 'def compute_power(base, exp=2):\n    return base ** exp',
    sampleInput: '5 3',
    sampleOutput: '125'
  },
  {
    id: 'prob-py-fn-02',
    title: 'Flexible Accumulator with *args and **kwargs',
    difficulty: 'Medium',
    tags: ['python', 'functions', 'methods', 'lambda'],
    statement: 'Write a function custom_summary(*args, **kwargs) that sums numeric args and prints kwargs metadata.',
    starterCode: 'def custom_summary(*args, **kwargs):\n    total = sum(args)\n    return total, kwargs',
    sampleInput: '1, 2, 3, mode="sum"',
    sampleOutput: '6'
  },
  {
    id: 'prob-py-list-01',
    title: 'Find Second Largest Number in List',
    difficulty: 'Easy',
    tags: ['python', 'lists', 'tuples', 'sequences', 'arrays'],
    statement: 'Find the second largest unique element in a list of integers without using sort().',
    starterCode: 'def second_largest(nums):\n    unique_nums = list(set(nums))\n    unique_nums.sort()\n    return unique_nums[-2] if len(unique_nums) >= 2 else None',
    sampleInput: '[12, 35, 1, 10, 34, 1]',
    sampleOutput: '34'
  },
  {
    id: 'prob-py-list-02',
    title: 'Rotate List Right by K Positions',
    difficulty: 'Medium',
    tags: ['python', 'lists', 'tuples', 'sequences', 'arrays'],
    statement: 'Rotate a list of N elements to the right by K positions using list slicing.',
    starterCode: 'def rotate_list(nums, k):\n    k = k % len(nums)\n    return nums[-k:] + nums[:-k]',
    sampleInput: '[1, 2, 3, 4, 5], k=2',
    sampleOutput: '[4, 5, 1, 2, 3]'
  },
  {
    id: 'prob-py-dict-01',
    title: 'Word Frequency Dictionary',
    difficulty: 'Easy',
    tags: ['python', 'dictionaries', 'sets', 'hashmap', 'dict'],
    statement: 'Read a paragraph of text and count the frequency of each word into a dictionary.',
    starterCode: 'def word_freq(text):\n    words = text.lower().split()\n    return {w: words.count(w) for w in set(words)}',
    sampleInput: 'apple banana apple cherry',
    sampleOutput: "{'apple': 2, 'banana': 1, 'cherry': 1}"
  },
  {
    id: 'prob-py-dict-02',
    title: 'Set Intersections & Differences',
    difficulty: 'Medium',
    tags: ['python', 'dictionaries', 'sets', 'hashmap', 'dict'],
    statement: 'Given two sets of student IDs, find students enrolled in both subjects and students in Subject A only.',
    starterCode: 'def analyze_enrollment(sub_a, sub_b):\n    both = sub_a & sub_b\n    only_a = sub_a - sub_b\n    return both, only_a',
    sampleInput: '{1, 2, 3}, {2, 3, 4}',
    sampleOutput: 'Both: {2, 3}, Only A: {1}'
  },
  {
    id: 'prob-py-str-01',
    title: 'Reverse Words in Sentence',
    difficulty: 'Easy',
    tags: ['python', 'strings', 'formatting', 'slicing'],
    statement: 'Given a sentence string, reverse the order of the words while keeping word spelling intact.',
    starterCode: 'def reverse_words(s):\n    return " ".join(s.split()[::-1])',
    sampleInput: 'Python is amazing',
    sampleOutput: 'amazing is Python'
  },
  {
    id: 'prob-py-str-02',
    title: 'Longest Palindromic Substring Slicing',
    difficulty: 'Medium',
    tags: ['python', 'strings', 'formatting', 'slicing'],
    statement: 'Find the longest palindromic substring in a given string S using slicing or expansion.',
    starterCode: 'def longest_palindrome(s):\n    pass',
    sampleInput: 'babad',
    sampleOutput: 'bab'
  },
  {
    id: 'prob-py-file-01',
    title: 'File Line Counter with Context Manager',
    difficulty: 'Easy',
    tags: ['python', 'file-handling', 'io', 'files', 'json'],
    statement: 'Write a Python function using `with open()` that counts lines and words in a file.',
    starterCode: 'def file_stats(filename):\n    with open(filename, "r") as f:\n        lines = f.readlines()\n    return len(lines), sum(len(l.split()) for l in lines)',
    sampleInput: 'data.txt',
    sampleOutput: '(4 lines, 20 words)'
  },
  {
    id: 'prob-py-file-02',
    title: 'JSON Data Transformation & Export',
    difficulty: 'Medium',
    tags: ['python', 'file-handling', 'io', 'files', 'json'],
    statement: 'Load student record JSON file, update GPAs above 3.5 with honors flag, and write back formatted JSON.',
    starterCode: 'import json\ndef update_honors(json_str):\n    data = json.loads(json_str)\n    for s in data:\n        s["honors"] = s.get("gpa", 0) >= 3.5\n    return json.dumps(data, indent=2)',
    sampleInput: '[{"name": "Alice", "gpa": 3.8}]',
    sampleOutput: '[{"name": "Alice", "gpa": 3.8, "honors": true}]'
  },
  {
    id: 'prob-py-exc-01',
    title: 'Safe Division & Custom Input Validator',
    difficulty: 'Easy',
    tags: ['python', 'exceptions', 'try-except', 'error-handling'],
    statement: 'Write a function safe_divide(a, b) that catches ZeroDivisionError and TypeError, returning None on error.',
    starterCode: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except (ZeroDivisionError, TypeError):\n        return None',
    sampleInput: '10, 0',
    sampleOutput: 'None'
  },
  {
    id: 'prob-py-exc-02',
    title: 'Custom InsufficientFundsException Class',
    difficulty: 'Medium',
    tags: ['python', 'exceptions', 'try-except', 'error-handling'],
    statement: 'Define a custom exception `InsufficientFundsError(amount, balance)` and raise it inside a withdraw method.',
    starterCode: 'class InsufficientFundsError(Exception):\n    pass',
    sampleInput: 'withdraw(500) from balance(200)',
    sampleOutput: 'Raised InsufficientFundsError'
  },
  {
    id: 'prob-py-oop-01',
    title: 'Bank Account Class with Encapsulation',
    difficulty: 'Easy',
    tags: ['python', 'oop', 'classes', 'inheritance', 'objects'],
    statement: 'Create a BankAccount class with _balance property, deposit(), and withdraw() methods.',
    starterCode: 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self._balance = balance',
    sampleInput: 'acc = BankAccount("Alice", 100)',
    sampleOutput: 'Balance: 100'
  },
  {
    id: 'prob-py-oop-02',
    title: 'Shape Hierarchy with Polymorphism',
    difficulty: 'Medium',
    tags: ['python', 'oop', 'classes', 'inheritance', 'objects'],
    statement: 'Implement Base class `Shape` with abstract method `area()`, and derived classes `Rectangle` and `Circle`.',
    starterCode: 'import math\nclass Shape:\n    def area(self): raise NotImplementedError',
    sampleInput: 'Circle(radius=5)',
    sampleOutput: '78.54'
  },
  {
    id: 'prob-py-mod-01',
    title: 'DateTime Difference & Modular Imports',
    difficulty: 'Easy',
    tags: ['python', 'modules', 'packages', 'imports'],
    statement: 'Write a function days_until_target(target_date_str) using Python datetime module.',
    starterCode: 'from datetime import datetime\ndef days_until(date_str):\n    target = datetime.strptime(date_str, "%Y-%m-%d")\n    return (target - datetime.now()).days',
    sampleInput: '2026-12-31',
    sampleOutput: 'Days remaining'
  },
  {
    id: 'prob-py-gen-01',
    title: 'Lazy Even Generator with yield',
    difficulty: 'Easy',
    tags: ['python', 'iterators', 'generators', 'yield'],
    statement: 'Implement a generator function even_stream(n) that yields even numbers up to N lazily.',
    starterCode: 'def even_stream(n):\n    for i in range(0, n + 1, 2):\n        yield i',
    sampleInput: '6',
    sampleOutput: '0, 2, 4, 6'
  },
  {
    id: 'prob-py-gen-02',
    title: 'Infinite Fibonacci Generator & itertools.islice',
    difficulty: 'Medium',
    tags: ['python', 'iterators', 'generators', 'yield'],
    statement: 'Write an infinite Fibonacci generator and use `itertools.islice` to get first 10 terms.',
    starterCode: 'import itertools\ndef fib_gen():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b',
    sampleInput: 'islice(fib_gen(), 10)',
    sampleOutput: '[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]'
  },
  {
    id: 'prob-py-dec-01',
    title: 'Timer Decorator with functools.wraps',
    difficulty: 'Easy',
    tags: ['python', 'decorators', 'wrappers', 'metaprogramming'],
    statement: 'Create a `@timer` decorator that measures execution time of any wrapped function and preserves __name__.',
    starterCode: 'import functools, time\ndef timer(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        res = func(*args, **kwargs)\n        print(f"Time: {time.perf_counter() - start:.4f}s")\n        return res\n    return wrapper',
    sampleInput: '@timer on heavy_calc()',
    sampleOutput: 'Printed execution time'
  },
  {
    id: 'prob-py-dec-02',
    title: 'Retry Decorator with Max Attempts',
    difficulty: 'Medium',
    tags: ['python', 'decorators', 'wrappers', 'metaprogramming'],
    statement: 'Implement a decorator `@retry(times=3)` that retries a function upon exception before re-raising.',
    starterCode: 'import functools\ndef retry(times=3):\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            for _ in range(times):\n                try: return func(*args, **kwargs)\n                except Exception: pass\n            raise RuntimeError("Exhausted retries")\n        return wrapper\n    return decorator',
    sampleInput: '3 retry attempts',
    sampleOutput: 'Handled retries'
  },
  {
    id: 'prob-py-comp-01',
    title: 'Filter & Transform with Dict Comprehension',
    difficulty: 'Easy',
    tags: ['python', 'comprehensions', 'functional', 'map-filter'],
    statement: 'Convert a dictionary of scores {student: mark} to {student: "Pass"/"Fail"} using dict comprehension.',
    starterCode: 'def classify_scores(scores):\n    return {name: "Pass" if mark >= 40 else "Fail" for name, mark in scores.items()}',
    sampleInput: "{'Alice': 85, 'Bob': 32}",
    sampleOutput: "{'Alice': 'Pass', 'Bob': 'Fail'}"
  },
  {
    id: 'prob-py-comp-02',
    title: 'Matrix Transpose with Nested Comprehension',
    difficulty: 'Medium',
    tags: ['python', 'comprehensions', 'functional', 'map-filter'],
    statement: 'Transpose a 2D matrix (M x N) to (N x M) using a single nested list comprehension.',
    starterCode: 'def transpose(matrix):\n    return [[row[i] for row in matrix] for i in range(len(matrix[0]))]',
    sampleInput: '[[1, 2], [3, 4], [5, 6]]',
    sampleOutput: '[[1, 3, 5], [2, 4, 6]]'
  },
  {
    id: 'prob-py-regex-01',
    title: 'Extract Email Addresses with re.findall',
    difficulty: 'Easy',
    tags: ['python', 'regex', 'pattern-matching', 're'],
    statement: 'Extract all valid email addresses from an arbitrary input string using `re.findall`.',
    starterCode: 'import re\ndef extract_emails(text):\n    pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"\n    return re.findall(pattern, text)',
    sampleInput: '"Contact dev@nexly.com or admin@test.org"',
    sampleOutput: "['dev@nexly.com', 'admin@test.org']"
  },
  {
    id: 'prob-py-regex-02',
    title: 'Mask Phone Numbers with re.sub',
    difficulty: 'Medium',
    tags: ['python', 'regex', 'pattern-matching', 're'],
    statement: 'Replace all 10-digit phone numbers in a string with `XXX-XXX-XXXX` formatting.',
    starterCode: 'import re\ndef mask_phones(text):\n    return re.sub(r"\\b\\d{10}\\b", "XXX-XXX-XXXX", text)',
    sampleInput: '"Call 9876543210 immediately"',
    sampleOutput: '"Call XXX-XXX-XXXX immediately"'
  },
  {
    id: 'prob-py-ds-01',
    title: 'Min Stack Implementation',
    difficulty: 'Easy',
    tags: ['python', 'data-structures', 'stacks', 'queues', 'linked-list'],
    statement: 'Design a stack class that supports push, pop, top, and retrieving the minimum element in O(1) time.',
    starterCode: 'class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []',
    sampleInput: 'push(3), push(5), min(), push(2), min()',
    sampleOutput: 'min=3, then min=2'
  },
  {
    id: 'prob-py-ds-02',
    title: 'Reverse Singly Linked List',
    difficulty: 'Medium',
    tags: ['python', 'data-structures', 'stacks', 'queues', 'linked-list'],
    statement: 'Reverse a singly linked list in-place by updating pointer directions.',
    starterCode: 'def reverse_linked_list(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev',
    sampleInput: '1 -> 2 -> 3 -> None',
    sampleOutput: '3 -> 2 -> 1 -> None'
  },
  {
    id: 'prob-py-algo-01',
    title: 'Binary Search Implementation',
    difficulty: 'Easy',
    tags: ['python', 'algorithms', 'sorting', 'searching', 'binary-search'],
    statement: 'Implement binary search to find target index in a sorted list of numbers.',
    starterCode: 'def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1',
    sampleInput: '[2, 5, 8, 12, 16, 23, 38], target=16',
    sampleOutput: '4'
  },
  {
    id: 'prob-py-algo-02',
    title: 'QuickSort Algorithm',
    difficulty: 'Medium',
    tags: ['python', 'algorithms', 'sorting', 'searching', 'binary-search'],
    statement: 'Implement QuickSort in Python using list comprehension partitioning.',
    starterCode: 'def quicksort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)',
    sampleInput: '[10, 7, 8, 9, 1, 5]',
    sampleOutput: '[1, 5, 7, 8, 9, 10]'
  },
  {
    id: 'prob-py-rec-01',
    title: 'Tower of Hanoi Recursive Solver',
    difficulty: 'Easy',
    tags: ['python', 'recursion', 'dp', 'dynamic-programming'],
    statement: 'Write a recursive function hanoi(n, source, target, auxiliary) that prints disk movements.',
    starterCode: 'def hanoi(n, src, tgt, aux):\n    if n == 1:\n        print(f"Move disk 1 from {src} to {tgt}")\n        return\n    hanoi(n-1, src, aux, tgt)\n    print(f"Move disk {n} from {src} to {tgt}")\n    hanoi(n-1, aux, tgt, src)',
    sampleInput: '3 disks',
    sampleOutput: 'Printed step-by-step moves'
  },
  {
    id: 'prob-py-rec-02',
    title: '0/1 Knapsack Problem with Memoization',
    difficulty: 'Medium',
    tags: ['python', 'recursion', 'dp', 'dynamic-programming'],
    statement: 'Solve 0/1 Knapsack problem given weights W, values V, and capacity C using top-down DP memoization.',
    starterCode: 'def knapsack(weights, values, capacity):\n    pass',
    sampleInput: 'W=[10,20,30], V=[60,100,120], C=50',
    sampleOutput: '220'
  },
  {
    id: 'prob-js-arr-01',
    title: 'Filter Positive Integers',
    difficulty: 'Easy',
    tags: ['javascript', 'arrays', 'array-methods', 'basics'],
    statement: 'Use Array.prototype.filter to extract all numbers greater than zero.',
    starterCode: 'function filterPositives(arr) {\n  // Write your code here\n}',
    sampleInput: '[-2, 5, 0, 9, -1]',
    sampleOutput: '[5, 9]'
  },
  {
    id: 'prob-sql-select-01',
    title: 'High-Earning Employees',
    difficulty: 'Easy',
    tags: ['sql', 'select', 'where-clause', 'database'],
    statement: 'Write a SQL query to select all employees with salary > 80,000.',
    starterCode: 'SELECT * FROM employees WHERE ...',
    sampleInput: 'employees table',
    sampleOutput: 'Filtered table grid'
  },

  // ── C Language ──────────────────────────────────────────────────────────────
  {
    id: 'prob-c-basics-01',
    title: 'Swap Two Variables',
    difficulty: 'Easy',
    tags: ['c', 'variables', 'basics', 'operators', 'data-types'],
    statement: 'Write a C program that swaps two integers using a third temporary variable. Read both values from stdin.',
    starterCode: '#include <stdio.h>\nint main() {\n    int a, b, temp;\n    scanf("%d %d", &a, &b);\n    /* swap a and b using temp */\n    return 0;\n}',
    sampleInput: '5 10',
    sampleOutput: 'a=10 b=5'
  },
  {
    id: 'prob-c-loops-01',
    title: 'Fibonacci Series',
    difficulty: 'Medium',
    tags: ['c', 'loops', 'for-loop', 'basics'],
    statement: 'Print the first N numbers of the Fibonacci series (0-indexed). Read N from stdin.',
    starterCode: '#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    /* print Fibonacci series */\n    return 0;\n}',
    sampleInput: '7',
    sampleOutput: '0 1 1 2 3 5 8'
  },
  {
    id: 'prob-c-functions-01',
    title: 'Factorial Using Recursion',
    difficulty: 'Easy',
    tags: ['c', 'functions', 'recursion', 'basics'],
    statement: 'Write a recursive C function to calculate factorial of N. Read N from stdin.',
    starterCode: '#include <stdio.h>\nint factorial(int n) {\n    /* implement recursion here */\n}\nint main() {\n    int n; scanf("%d", &n);\n    printf("%d\\n", factorial(n));\n    return 0;\n}',
    sampleInput: '5',
    sampleOutput: '120'
  },
  {
    id: 'prob-c-functions-02',
    title: 'Max of Three Numbers',
    difficulty: 'Medium',
    tags: ['c', 'functions', 'basics', 'operators'],
    statement: 'Write a C function max3(a, b, c) that returns the largest of three integers.',
    starterCode: '#include <stdio.h>\nint max3(int a, int b, int c) {\n    /* your code */\n}\nint main() {\n    int a, b, c; scanf("%d %d %d", &a, &b, &c);\n    printf("%d\\n", max3(a, b, c));\n    return 0;\n}',
    sampleInput: '3 9 6',
    sampleOutput: '9'
  },
  {
    id: 'prob-c-arrays-01',
    title: 'Reverse Array In-Place',
    difficulty: 'Hard',
    tags: ['c', 'arrays', 'pointers', 'memory'],
    statement: 'Use pointer arithmetic to reverse an integer array in-place. Read size and elements from stdin.',
    starterCode: '#include <stdio.h>\nvoid reverse(int *arr, int n) {\n    /* use pointer arithmetic */\n}\nint main() {\n    int n; scanf("%d", &n);\n    int arr[100];\n    for(int i=0; i<n; i++) scanf("%d", &arr[i]);\n    reverse(arr, n);\n    for(int i=0; i<n; i++) printf("%d ", arr[i]);\n    return 0;\n}',
    sampleInput: '5\n1 2 3 4 5',
    sampleOutput: '5 4 3 2 1'
  }
];

/**
 * Returns 3 auto-recommended practice problems (Easy, Medium, Hard) matching a lesson topic's tags.
 * Returns null for a difficulty tier if no problem with score > 0 is found (no silent fallback).
 * @param {string[]} topicTags - Tags from the current lesson
 * @param {string} [userId] - Optional user ID (reserved for future solved-problem exclusion)
 * @returns {{ easy: Object|null, medium: Object|null, hard: Object|null }}
 */
export const getRecommendedProblemsForTopic = (topicTags = [], userId = null) => {
  if (!topicTags || topicTags.length === 0) {
    // No tags = no context — return all nulls so the caller shows the empty state
    return { easy: null, medium: null, hard: null };
  }

  // Score each problem by counting how many of its tags match the lesson's tags
  const scoredProblems = PRACTICE_PROBLEMS_DB.map(problem => {
    const matchCount = problem.tags.filter(tag => topicTags.includes(tag)).length;
    return { problem, score: matchCount };
  }).sort((a, b) => b.score - a.score);

  // Only return a problem if it has at least 1 matching tag (score > 0)
  // Returning null here is intentional — caller must show empty state instead of a random unrelated problem
  const easy   = scoredProblems.find(item => item.score > 0 && item.problem.difficulty === 'Easy')?.problem   || null;
  const medium = scoredProblems.find(item => item.score > 0 && item.problem.difficulty === 'Medium')?.problem || null;
  const hard   = scoredProblems.find(item => item.score > 0 && item.problem.difficulty === 'Hard')?.problem   || null;

  return { easy, medium, hard };
};

/**
 * Calculates a qualitative skill band from transparent user metrics
 * @param {Object} progressState
 * @param {number} progressState.completedLessonsCount
 * @param {number} progressState.solvedProblemsCount
 * @param {number} progressState.quizAccuracyPercentage
 * @returns {'Novice' | 'Developing' | 'Solid' | 'Strong'}
 */
export const calculateQualitativeSkillBand = ({ completedLessonsCount = 0, solvedProblemsCount = 0, quizAccuracyPercentage = 0 }) => {
  const compositeScore = (completedLessonsCount * 2) + (solvedProblemsCount * 3) + (quizAccuracyPercentage * 0.5);

  if (compositeScore >= 80) return 'Strong';
  if (compositeScore >= 45) return 'Solid';
  if (compositeScore >= 20) return 'Developing';
  return 'Novice';
};

/**
 * Derives weak topics for a user based on incorrect quiz & practice attempts
 * @param {Array} attemptHistory 
 * @returns {Array<{ topicId: string, title: string, accuracy: number }>}
 */
export const getWeakTopicsForUser = (attemptHistory = []) => {
  if (!attemptHistory || attemptHistory.length === 0) {
    return [
      { topicId: 'py-topic-loops', title: 'Python Control Flow & Loops', accuracy: 40 },
      { topicId: 'js-topic-async', title: 'JS Promises & Async/Await', accuracy: 55 }
    ];
  }

  // Aggregate accuracy per topic
  const topicStats = {};
  attemptHistory.forEach(att => {
    if (!topicStats[att.topicId]) {
      topicStats[att.topicId] = { title: att.topicTitle || att.topicId, total: 0, correct: 0 };
    }
    topicStats[att.topicId].total += 1;
    if (att.isCorrect) topicStats[att.topicId].correct += 1;
  });

  return Object.keys(topicStats)
    .map(topicId => ({
      topicId,
      title: topicStats[topicId].title,
      accuracy: Math.round((topicStats[topicId].correct / topicStats[topicId].total) * 100)
    }))
    .filter(t => t.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy);
};
