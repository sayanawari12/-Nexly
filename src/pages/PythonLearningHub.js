import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, ChevronRight, ChevronLeft, ArrowLeft, BookOpen, Map, Code2, Terminal,
  HelpCircle, Trophy, Briefcase, Download, Lock, ChevronDown,
  ChevronUp, Clock, CheckCircle, Play, Copy, Bookmark, BarChart2,
  Zap, Star, Users, Lightbulb, Target, Layers, Globe, Database,
  Award, AlertTriangle, Info, TrendingUp, FileText, FolderOpen,
  RotateCcw, ArrowRight, Check, X, Eye, EyeOff, Volume2, Search
} from 'lucide-react';
import TechnologyLogo from '../components/ui/TechnologyLogo';
import '../styles/PythonLearningHub.css';

/* ============================================================
   DATA LAYER
   ============================================================ */

const PYTHON_LESSONS = [
  { id: 1, title: 'Introduction to Python', diff: 'beginner', time: '25 min', phase: 'beginner',
    prereq: 'None',
    desc: 'What Python is, its history, philosophy (The Zen of Python), and why it is one of the most popular languages.',
    theory: `Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum and first released in 1991. It emphasizes code readability with its clean, English-like syntax.

Python follows the philosophy of "There should be one — and preferably only one — obvious way to do it." This is encapsulated in the Zen of Python (PEP 20).

Python is dynamically typed and garbage-collected. It supports multiple programming paradigms including structured, object-oriented and functional programming.`,
    code: `# Your first Python program\nprint("Hello, World!")\n\n# The Zen of Python\nimport this\n\n# Variables (no type declaration needed)\nname = "Alice"\nage = 21\npi = 3.14159\nis_learning = True\n\nprint(f"My name is {name}, I am {age} years old.")`,
    output: `Hello, World!\n\nThe Zen of Python, by Tim Peters\nBeautiful is better than ugly.\nExplicit is better than implicit.\n...\n\nMy name is Alice, I am 21 years old.`,
    note: 'Python files use the .py extension. Python uses indentation (4 spaces) instead of curly braces to define code blocks.',
    warning: 'Python is case-sensitive. `Name` and `name` are two different variables.',
    tip: 'Best practices: use snake_case for variable names, be consistent with spacing, and always include a shebang line (#!/usr/bin/env python3) for executable scripts.',
    interviewTip: 'Common question: "What is Python and what makes it different?" — Highlight its readability, dynamic typing, extensive libraries, and cross-platform nature.',
    mistakes: ['Using semicolons at end of lines (not required)', 'Mixing tabs and spaces for indentation', 'Forgetting that Python is case-sensitive'],
    summary: 'Python is a powerful, readable, and versatile language ideal for beginners and professionals alike.'
  },
  { id: 2, title: 'Variables & Data Types', diff: 'beginner', time: '30 min', phase: 'beginner',
    prereq: 'Introduction to Python',
    desc: 'Python data types: int, float, str, bool, None. Dynamic typing, type() function, and type conversion.',
    theory: `In Python, every value has a type. Python infers the type at runtime — you do not need to declare types explicitly. The main built-in types are: int, float, complex, str, bool, and NoneType.`,
    code: `# Integers\nx = 10\ny = -5\nbig = 1_000_000  # underscores for readability\n\n# Floats\npi = 3.14159\ntemp = -0.5\n\n# Strings\nname = "Python"\ngreeting = 'Hello'\nmulti = """This is\na multi-line string"""\n\n# Boolean\nis_valid = True\nhas_error = False\n\n# None\nresult = None\n\n# Check type\nprint(type(x))       # <class 'int'>\nprint(type(pi))      # <class 'float'>\nprint(type(name))    # <class 'str'>\n\n# Type conversion\nprint(int("42"))     # 42\nprint(float(10))     # 10.0\nprint(str(3.14))     # '3.14'`,
    output: `<class 'int'>\n<class 'float'>\n<class 'str'>\n42\n10.0\n3.14`,
    note: 'Python uses duck typing: "If it walks like a duck and quacks like a duck, it is a duck." Type checking is done at runtime.',
    warning: 'Type conversion can raise ValueError. Always handle exceptions when converting user input.',
    tip: 'Use type hints (Python 3.5+) for better code readability: def greet(name: str) -> str:',
    interviewTip: 'Know the difference between mutable (list, dict, set) and immutable types (int, str, tuple). This is a very common interview topic.',
    mistakes: ['Comparing with == instead of is for None', 'Assuming int/float division always returns int (it returns float in Python 3)'],
    summary: 'Python has dynamic, strong typing with rich built-in types. Master type() and conversion functions early.'
  },
  { id: 3, title: 'Operators & Expressions', diff: 'beginner', time: '25 min', phase: 'beginner',
    prereq: 'Variables & Data Types',
    desc: 'Arithmetic, comparison, logical, bitwise, assignment, and identity operators in Python.',
    theory: `Python supports a rich set of operators. Arithmetic operators (+, -, *, /, //, %, **) perform math. Comparison operators (==, !=, <, >, <=, >=) return booleans. Logical operators (and, or, not) combine conditions.`,
    code: `# Arithmetic\nprint(10 + 3)   # 13\nprint(10 - 3)   # 7\nprint(10 * 3)   # 30\nprint(10 / 3)   # 3.333... (float division)\nprint(10 // 3)  # 3   (floor division)\nprint(10 % 3)   # 1   (modulo)\nprint(10 ** 3)  # 1000 (exponentiation)\n\n# Comparison\nprint(5 > 3)    # True\nprint(5 == 5)   # True\nprint(5 != 3)   # True\n\n# Logical\nprint(True and False)  # False\nprint(True or False)   # True\nprint(not True)        # False\n\n# Walrus operator (Python 3.8+)\nif (n := len("hello")) > 3:\n    print(f"Length is {n}")`,
    output: `13\n7\n30\n3.3333333333333335\n3\n1\n1000\nTrue\nTrue\nTrue\nFalse\nTrue\nFalse\nLength is 5`,
    note: 'The // operator always floors the result, even for negative numbers: -7 // 2 = -4, not -3.',
    warning: '== checks value equality; is checks object identity. Never use is to compare integers or strings unless checking for None.',
    tip: 'Use augmented assignment operators (+=, -=, *=) to write more concise code.',
    interviewTip: '"What is the difference between / and // in Python 3?" — / always returns float, // returns the floor of the division.',
    mistakes: ['Using = instead of == in conditions', 'Forgetting operator precedence (use parentheses to be safe)'],
    summary: 'Python operators are intuitive, but understand floor division, modulo, and the walrus operator for advanced use.'
  },
  { id: 4, title: 'Control Flow: if/elif/else', diff: 'beginner', time: '30 min', phase: 'beginner',
    prereq: 'Operators & Expressions',
    desc: 'Conditional statements, nested conditions, ternary expressions, and match-case (Python 3.10+).',
    theory: `Python uses if, elif, and else for conditional branching. Unlike other languages, Python has no switch statement before 3.10. Python 3.10 introduced match-case (structural pattern matching).`,
    code: `# Basic if-elif-else\ngrade = 85\n\nif grade >= 90:\n    result = "A"\nelif grade >= 80:\n    result = "B"\nelif grade >= 70:\n    result = "C"\nelse:\n    result = "F"\n\nprint(f"Grade: {result}")  # Grade: B\n\n# Ternary expression\nage = 20\nstatus = "adult" if age >= 18 else "minor"\nprint(status)  # adult\n\n# Chained comparisons (Python style)\nx = 5\nprint(1 < x < 10)  # True\n\n# match-case (Python 3.10+)\ncommand = "quit"\nmatch command:\n    case "quit": print("Quitting...")\n    case "help": print("Help menu")\n    case _: print("Unknown command")`,
    output: `Grade: B\nadult\nTrue\nQuitting...`,
    note: 'Python uses indentation to define blocks. A missing or extra indentation will cause an IndentationError.',
    warning: 'The match-case statement requires Python 3.10 or later. Use if-elif chains for backwards compatibility.',
    tip: 'Chained comparisons like 1 < x < 10 are a unique Python feature and are more readable than x > 1 and x < 10.',
    interviewTip: 'Explain the ternary operator: value_if_true if condition else value_if_false. Show you know Pythonic ways to write concise conditions.',
    mistakes: ['Forgetting the colon : after if/elif/else', 'Using = instead of == in conditions'],
    summary: 'Control flow in Python is clean and readable. Master ternary expressions and chained comparisons for Pythonic code.'
  },
  { id: 5, title: 'Loops: for & while', diff: 'beginner', time: '35 min', phase: 'beginner',
    prereq: 'Control Flow: if/elif/else',
    desc: 'for loops with range and iterables, while loops, break, continue, else clause on loops.',
    theory: `Python has two loop types: for (iteration over a sequence) and while (condition-based). Python's for loop is really a "for-each" loop — it iterates over any iterable object.`,
    code: `# for loop with range\nfor i in range(5):\n    print(i, end=" ")  # 0 1 2 3 4\nprint()\n\n# range(start, stop, step)\nfor i in range(1, 10, 2):\n    print(i, end=" ")  # 1 3 5 7 9\nprint()\n\n# Iterating over a list\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n\n# enumerate (index + value)\nfor idx, fruit in enumerate(fruits):\n    print(f"{idx}: {fruit}")\n\n# while loop\ncount = 0\nwhile count < 3:\n    print(f"Count: {count}")\n    count += 1\n\n# break and continue\nfor n in range(10):\n    if n == 3: continue\n    if n == 6: break\n    print(n, end=" ")  # 0 1 2 4 5`,
    output: `0 1 2 3 4 \n1 3 5 7 9 \napple\nbanana\ncherry\n0: apple\n1: banana\n2: cherry\nCount: 0\nCount: 1\nCount: 2\n0 1 2 4 5`,
    note: 'Python loops have an optional else clause that executes when the loop completes normally (without hitting break).',
    warning: 'Modifying a list while iterating over it can cause unexpected behavior. Iterate over a copy: for item in list[:]:',
    tip: 'Use enumerate() instead of range(len(list)) for cleaner, more Pythonic index-value iteration.',
    interviewTip: '"What does the else clause in a for loop do?" — It runs when the loop finishes without a break. Useful for search algorithms.',
    mistakes: ['Infinite while loops (forgetting to update loop variable)', 'Using range(len(list)) when enumerate() is more Pythonic'],
    summary: 'Python loops are versatile. Master enumerate, zip, and the for-else pattern for advanced iteration.'
  },
  { id: 6, title: 'Functions', diff: 'beginner', time: '40 min', phase: 'beginner',
    prereq: 'Loops: for & while',
    desc: 'Defining functions, parameters, return values, *args, **kwargs, lambda, and scope.',
    theory: `Functions are reusable blocks of code defined with the def keyword. Python supports default arguments, keyword arguments, variable-length arguments (*args and **kwargs), and lambda (anonymous) functions.`,
    code: `# Basic function\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Alice"))  # Hello, Alice!\n\n# Default parameters\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(3))     # 9\nprint(power(3, 3))  # 27\n\n# *args (variable positional args)\ndef total(*numbers):\n    return sum(numbers)\n\nprint(total(1, 2, 3, 4))  # 10\n\n# **kwargs (variable keyword args)\ndef info(**details):\n    for k, v in details.items():\n        print(f"{k}: {v}")\n\ninfo(name="Bob", age=25)\n\n# Lambda\nsquare = lambda x: x ** 2\nprint(square(7))  # 49\n\n# Nested functions & closures\ndef make_multiplier(n):\n    def multiply(x):\n        return x * n\n    return multiply\n\ndouble = make_multiplier(2)\nprint(double(5))  # 10`,
    output: `Hello, Alice!\n9\n27\n10\nname: Bob\nage: 25\n49\n10`,
    note: 'Python functions are first-class objects — they can be assigned to variables, passed as arguments, and returned from other functions.',
    warning: 'Mutable default arguments (like lists or dicts) are shared across calls. Use None as default and create the object inside the function.',
    tip: 'Use type hints for function signatures: def greet(name: str) -> str: This improves IDE support and readability.',
    interviewTip: '"Explain *args and **kwargs." — *args collects positional args into a tuple; **kwargs collects keyword args into a dict.',
    mistakes: ['Mutable default argument bug (def f(lst=[]))', 'Forgetting to return a value (function returns None by default)'],
    summary: 'Functions are the building blocks of Python programs. Master *args, **kwargs, and closures for professional code.'
  },
  { id: 7, title: 'Lists & Tuples', diff: 'beginner', time: '35 min', phase: 'beginner',
    prereq: 'Functions',
    desc: 'Python lists and tuples — creation, indexing, slicing, list comprehensions, and key methods.',
    theory: `Lists are ordered, mutable collections. Tuples are ordered, immutable collections. Both support indexing and slicing. Lists have rich methods (append, extend, insert, remove, pop, sort, reverse).`,
    code: `# List creation and access\nfruits = ["apple", "banana", "cherry", "date"]\nprint(fruits[0])    # apple\nprint(fruits[-1])   # date\nprint(fruits[1:3])  # ['banana', 'cherry']\n\n# List methods\nfruits.append("elderberry")\nfruits.insert(1, "blueberry")\nfruits.remove("banana")\nfruits.sort()\nprint(fruits)\n\n# List comprehension\nsquares = [x**2 for x in range(1, 6)]\nprint(squares)  # [1, 4, 9, 16, 25]\n\n# Filtered comprehension\nevens = [x for x in range(10) if x % 2 == 0]\nprint(evens)  # [0, 2, 4, 6, 8]\n\n# Tuples\npoint = (3, 7)\nx, y = point  # unpacking\nprint(f"x={x}, y={y}")\n\n# Named tuple\nfrom collections import namedtuple\nPoint = namedtuple('Point', ['x', 'y'])\np = Point(10, 20)\nprint(p.x, p.y)  # 10 20`,
    output: `apple\ndate\n['banana', 'cherry']\n['apple', 'blueberry', 'cherry', 'date', 'elderberry']\n[1, 4, 9, 16, 25]\n[0, 2, 4, 6, 8]\nx=3, y=7\n10 20`,
    note: 'Negative indices count from the end: list[-1] is the last element.',
    warning: 'Lists are mutable — assigning a list to another variable does NOT create a copy. Use list.copy() or list[:] for a shallow copy.',
    tip: 'List comprehensions are faster than equivalent for-loops because they are optimized at the C level in CPython.',
    interviewTip: '"What is the difference between a list and a tuple?" — Lists are mutable and use more memory. Tuples are immutable, hashable, and slightly faster.',
    mistakes: ['IndexError by going out of bounds', 'Modifying a list while iterating over it', 'Confusing assignment (=) with copy'],
    summary: 'Lists and tuples are foundational Python structures. Master slicing, comprehensions, and tuple unpacking.'
  },
  { id: 8, title: 'Dictionaries & Sets', diff: 'beginner', time: '35 min', phase: 'beginner',
    prereq: 'Lists & Tuples',
    desc: 'Dictionaries for key-value pairs, sets for unique collections, and their comprehensions.',
    theory: `Dictionaries are mutable, ordered (Python 3.7+) key-value mappings. Sets are unordered collections of unique elements, useful for membership testing and set operations (union, intersection, difference).`,
    code: `# Dictionary\nstudent = {"name": "Alice", "age": 21, "gpa": 3.8}\nprint(student["name"])         # Alice\nprint(student.get("grade", "N/A"))  # N/A (safe get)\n\n# Adding and updating\nstudent["major"] = "CS"\nstudent.update({"age": 22, "city": "Delhi"})\n\n# Iterating\nfor key, value in student.items():\n    print(f"{key}: {value}")\n\n# Dict comprehension\nsquares = {x: x**2 for x in range(1, 6)}\nprint(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n\n# Sets\nprimes = {2, 3, 5, 7, 11}\nevens = {2, 4, 6, 8, 10}\n\nprint(primes & evens)   # intersection: {2}\nprint(primes | evens)   # union\nprint(primes - evens)   # difference: {3, 5, 7, 11}\nprint(3 in primes)      # True`,
    output: `Alice\nN/A\nname: Alice\nage: 22\ngpa: 3.8\nmajor: CS\ncity: Delhi\n{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n{2}\n{2, 3, 4, 5, 6, 7, 8, 10, 11}\n{3, 5, 7, 11}\nTrue`,
    note: 'Since Python 3.7, dictionaries maintain insertion order. Sets do not guarantee any order.',
    warning: 'Dictionary keys must be immutable (strings, numbers, tuples). Lists cannot be dict keys.',
    tip: 'Use collections.defaultdict to avoid KeyError when accessing missing keys with a default value.',
    interviewTip: '"How is a dictionary implemented internally?" — As a hash table. Average O(1) lookup, insertion, and deletion.',
    mistakes: ['Using mutable types (lists) as dict keys', 'Iterating over a dict while modifying it'],
    summary: 'Dicts and sets are essential Python data structures backed by hash tables for O(1) average operations.'
  },
  { id: 9, title: 'Strings & String Methods', diff: 'beginner', time: '30 min', phase: 'beginner',
    prereq: 'Dictionaries & Sets',
    desc: 'String manipulation, f-strings, common string methods, and regular expressions basics.',
    theory: `Strings in Python are immutable sequences of Unicode characters. Python provides a rich set of string methods and supports multiple formatting styles: %-formatting, str.format(), and f-strings (Python 3.6+).`,
    code: `# String creation\ns = "Hello, Python World!"\n\n# Slicing\nprint(s[0:5])     # Hello\nprint(s[-6:])     # World!\nprint(s[::-1])    # Reverse\n\n# Methods\nprint(s.upper())        # HELLO, PYTHON WORLD!\nprint(s.lower())        # hello, python world!\nprint(s.replace("Python", "Amazing Python"))\nprint(s.split(", "))    # ['Hello', 'Python World!']\nprint("  spaces  ".strip())  # spaces\nprint(s.count("l"))     # 3\nprint(s.startswith("Hello"))  # True\n\n# f-strings\nname = "Alice"\nage = 21\nprint(f"Name: {name}, Age: {age}")    # Name: Alice, Age: 21\nprint(f"Pi: {3.14159:.2f}")           # Pi: 3.14\nprint(f"{'centered':^20}")            # centered (padded)\n\n# Join\nwords = ["Python", "is", "awesome"]\nprint(" ".join(words))`,
    output: `Hello\nWorld!\n!dlroW nohtyP ,olleH\nHELLO, PYTHON WORLD!\nhello, python world!\nHello, Amazing Python World!\n['Hello', 'Python World!']\nspaces\n3\nTrue\nName: Alice, Age: 21\nPi: 3.14\n      centered      \nPython is awesome`,
    note: 'Strings are immutable. Methods like upper() return a new string — they do not modify the original.',
    warning: 'String concatenation in a loop with + is O(n²). Use " ".join(list) for efficient concatenation.',
    tip: 'f-strings support expressions, method calls, and format specs: f"{value:.2f}", f"{name!r}", f"{2+2}".',
    interviewTip: '"How do you reverse a string in Python?" — s[::-1] using extended slicing. Know this one cold.',
    mistakes: ['Using + concatenation in loops instead of join()', 'Forgetting strings are immutable'],
    summary: 'Python strings are immutable and feature-rich. Master f-strings, slicing, and join() for clean, efficient string code.'
  },
  { id: 10, title: 'File Handling', diff: 'intermediate', time: '35 min', phase: 'intermediate',
    prereq: 'Strings & String Methods',
    desc: 'Reading and writing files, context managers, file modes, CSV, and JSON handling.',
    theory: `Python's built-in open() function provides file I/O. Always use the with statement (context manager) to ensure files are properly closed even if an exception occurs. Common modes: 'r' (read), 'w' (write), 'a' (append), 'rb'/'wb' (binary).`,
    code: `# Writing a file\nwith open("data.txt", "w") as f:\n    f.write("Line 1\\n")\n    f.write("Line 2\\n")\n    f.writelines(["Line 3\\n", "Line 4\\n"])\n\n# Reading a file\nwith open("data.txt", "r") as f:\n    content = f.read()\n    print(content)\n\n# Reading line by line\nwith open("data.txt", "r") as f:\n    for line in f:\n        print(line.strip())\n\n# JSON handling\nimport json\n\ndata = {"name": "Alice", "scores": [95, 87, 91]}\n\n# Write JSON\nwith open("data.json", "w") as f:\n    json.dump(data, f, indent=4)\n\n# Read JSON\nwith open("data.json", "r") as f:\n    loaded = json.load(f)\n    print(loaded["name"])  # Alice\n\n# CSV handling\nimport csv\nwith open("students.csv", "w", newline="") as f:\n    writer = csv.writer(f)\n    writer.writerow(["Name", "Grade"])\n    writer.writerow(["Alice", 95])`,
    output: `Line 1\nLine 2\nLine 3\nLine 4\n\nLine 1\nLine 2\nLine 3\nLine 4\nAlice`,
    note: 'Always use with open() — it guarantees the file is closed when the block exits, even on exceptions.',
    warning: 'Opening a file in "w" mode truncates (empties) it immediately. Use "a" mode to append without destroying existing content.',
    tip: 'For large files, read line by line (for line in f:) instead of f.read() to avoid loading the entire file into memory.',
    interviewTip: '"What is the advantage of using with statement for file handling?" — Automatic resource cleanup via __enter__ and __exit__ methods (context manager protocol).',
    mistakes: ['Not closing files without context managers', 'Using "w" mode when "a" was intended'],
    summary: 'File I/O in Python is straightforward with open(). Always use with statements and master JSON/CSV for real-world tasks.'
  },
  { id: 11, title: 'Exception Handling', diff: 'intermediate', time: '30 min', phase: 'intermediate',
    prereq: 'File Handling',
    desc: 'try/except/else/finally, raising exceptions, custom exceptions, and exception hierarchy.',
    theory: `Exception handling allows programs to respond gracefully to errors. Python uses try/except blocks. The else clause runs when no exception occurs. The finally clause always runs regardless.`,
    code: `# Basic try/except\ntry:\n    x = int(input("Enter a number: "))\n    result = 10 / x\nexcept ValueError:\n    print("Invalid input — not a number")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\nexcept Exception as e:\n    print(f"Unexpected error: {e}")\nelse:\n    print(f"Result: {result}")\nfinally:\n    print("Execution complete")\n\n# Raising exceptions\ndef divide(a, b):\n    if b == 0:\n        raise ValueError("Denominator cannot be zero")\n    return a / b\n\n# Custom exception\nclass InsufficientFundsError(Exception):\n    def __init__(self, amount, balance):\n        self.amount = amount\n        self.balance = balance\n        super().__init__(f"Cannot withdraw {amount}. Balance: {balance}")\n\ntry:\n    raise InsufficientFundsError(500, 200)\nexcept InsufficientFundsError as e:\n    print(e)`,
    output: `Enter a number: 5\nResult: 2.0\nExecution complete\n\nCannot withdraw 500. Balance: 200`,
    note: 'Catch specific exceptions before generic ones. Never use bare except: — it catches SystemExit and KeyboardInterrupt too.',
    warning: 'The else block in try/except is often forgotten. It is a clean place to put code that should only run when NO exception occurs.',
    tip: 'Use contextlib.suppress() to silently ignore specific exceptions: with suppress(FileNotFoundError): ...',
    interviewTip: '"Explain the try/except/else/finally flow." — try runs, except catches specific errors, else runs on success, finally always runs.',
    mistakes: ['Using bare except:', 'Catching too broad an exception (Exception) everywhere', 'Forgetting finally for cleanup'],
    summary: 'Robust Python code handles exceptions explicitly. Define custom exceptions for domain-specific error communication.'
  },
  { id: 12, title: 'Object-Oriented Programming', diff: 'intermediate', time: '50 min', phase: 'intermediate',
    prereq: 'Exception Handling',
    desc: 'Classes, objects, __init__, instance/class methods, properties, inheritance, polymorphism, and dunder methods.',
    theory: `OOP in Python centers around classes and objects. Every class should have an __init__ constructor. Python supports single and multiple inheritance. Dunder (magic) methods customize behavior of built-in operations.`,
    code: `# Class definition\nclass BankAccount:\n    bank_name = "PyBank"  # class variable\n\n    def __init__(self, owner, balance=0):\n        self.owner = owner        # instance variable\n        self._balance = balance   # protected\n\n    @property\n    def balance(self):\n        return self._balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("Amount must be positive")\n        self._balance += amount\n        return self\n\n    def withdraw(self, amount):\n        if amount > self._balance:\n            raise ValueError("Insufficient funds")\n        self._balance -= amount\n        return self\n\n    def __repr__(self):\n        return f"BankAccount(owner={self.owner!r}, balance={self._balance})"\n\n    def __str__(self):\n        return f"{self.owner}'s account: ₹{self._balance:.2f}"\n\n# Inheritance\nclass SavingsAccount(BankAccount):\n    def __init__(self, owner, balance=0, interest=0.05):\n        super().__init__(owner, balance)\n        self.interest = interest\n\n    def add_interest(self):\n        self._balance *= (1 + self.interest)\n\nacc = BankAccount("Alice", 1000)\nacc.deposit(500).withdraw(200)\nprint(acc)          # Alice's account: ₹1300.00\nprint(repr(acc))\n\nsav = SavingsAccount("Bob", 2000)\nsav.add_interest()\nprint(sav)          # Bob's account: ₹2100.00`,
    output: `Alice's account: ₹1300.00\nBankAccount(owner='Alice', balance=1300)\nBob's account: ₹2100.00`,
    note: 'Use single underscore _attr for protected and double underscore __attr for name-mangled private attributes.',
    warning: 'Python does not enforce access modifiers. _protected and __private are conventions, not enforcement.',
    tip: 'Use @property for computed attributes and @classmethod/@staticmethod for alternative constructors and utility functions.',
    interviewTip: '"What is method resolution order (MRO) in Python?" — It determines the order in which base classes are searched. Use ClassName.__mro__ to see it.',
    mistakes: ['Forgetting self parameter in instance methods', 'Mutable class variables shared across all instances', 'Not calling super().__init__()'],
    summary: 'Python OOP is powerful and concise. Master properties, dunder methods, and inheritance for clean, extensible design.'
  },
  { id: 13, title: 'Modules & Packages', diff: 'intermediate', time: '30 min', phase: 'intermediate',
    prereq: 'Object-Oriented Programming',
    desc: 'import, from...import, __init__.py, pip, virtual environments, and popular standard library modules.',
    theory: `A module is a .py file. A package is a directory with __init__.py. Python's standard library is massive. pip is the package manager. Virtual environments isolate project dependencies.`,
    code: `# Importing modules\nimport math\nimport os\nimport sys\nfrom datetime import datetime, timedelta\nfrom collections import Counter, defaultdict\n\n# math module\nprint(math.pi)          # 3.14159...\nprint(math.sqrt(144))   # 12.0\nprint(math.factorial(5)) # 120\n\n# os module\nprint(os.getcwd())      # current directory\nprint(os.listdir('.'))  # list files\n\n# datetime\nnow = datetime.now()\nprint(now.strftime("%Y-%m-%d %H:%M"))\ntomorrow = now + timedelta(days=1)\n\n# collections\nwords = ["apple", "banana", "apple", "cherry", "banana", "apple"]\ncount = Counter(words)\nprint(count)  # Counter({'apple': 3, ...})\nprint(count.most_common(2))\n\n# Creating your own module\n# utils.py\ndef add(a, b): return a + b\ndef sub(a, b): return a - b\n\n# main.py\n# from utils import add, sub`,
    output: `3.141592653589793\n12.0\n120\n/home/user/project\n['main.py', 'utils.py']\n2024-01-15 10:30\nCounter({'apple': 3, 'banana': 2, 'cherry': 1})\n[('apple', 3), ('banana', 2)]`,
    note: 'Use __name__ == "__main__" guard to prevent code from running when a module is imported.',
    warning: 'Circular imports (module A imports B, B imports A) cause ImportError. Restructure to avoid them.',
    tip: 'Use virtual environments for every project: python -m venv venv && source venv/bin/activate (Linux) or venv\\Scripts\\activate (Windows).',
    interviewTip: '"What is the purpose of __init__.py?" — It marks a directory as a Python package and can expose module-level APIs.',
    mistakes: ['Naming your file the same as a standard library module (e.g., math.py)', 'Not using virtual environments'],
    summary: 'Python modules and packages enable code organization and reuse. Master the standard library and virtual environments.'
  },
  { id: 14, title: 'Iterators & Generators', diff: 'intermediate', time: '35 min', phase: 'intermediate',
    prereq: 'Modules & Packages',
    desc: 'Iterator protocol, generator functions, yield, generator expressions, and itertools.',
    theory: `An iterator is any object implementing __iter__ and __next__. A generator is a special function that yields values lazily. Generators are memory-efficient for large datasets.`,
    code: `# Generator function\ndef fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nfor num in fibonacci(8):\n    print(num, end=" ")  # 0 1 1 2 3 5 8 13\nprint()\n\n# Generator expression\nsquares_gen = (x**2 for x in range(10))\nprint(next(squares_gen))  # 0\nprint(next(squares_gen))  # 1\n\n# itertools\nimport itertools\n\n# Infinite counter\ncounter = itertools.count(start=1, step=2)\nprint([next(counter) for _ in range(5)])  # [1, 3, 5, 7, 9]\n\n# Combinations\nprint(list(itertools.combinations("ABC", 2)))\n# [('A','B'), ('A','C'), ('B','C')]\n\n# Chain multiple iterables\nprint(list(itertools.chain([1,2], [3,4], [5])))\n# [1, 2, 3, 4, 5]\n\n# Custom iterator class\nclass Countdown:\n    def __init__(self, start):\n        self.current = start\n    def __iter__(self): return self\n    def __next__(self):\n        if self.current <= 0: raise StopIteration\n        self.current -= 1\n        return self.current + 1\n\nprint(list(Countdown(5)))  # [5, 4, 3, 2, 1]`,
    output: `0 1 1 2 3 5 8 13 \n0\n1\n[1, 3, 5, 7, 9]\n[('A', 'B'), ('A', 'C'), ('B', 'C')]\n[1, 2, 3, 4, 5]\n[5, 4, 3, 2, 1]`,
    note: 'Generators are single-use. Once exhausted, they cannot be restarted. Create a new generator for re-iteration.',
    warning: 'Be careful with infinite generators (count, cycle, repeat). Always pair with islice() or a break condition.',
    tip: 'Generator expressions use () and are lazy (computed on demand). List comprehensions use [] and compute eagerly.',
    interviewTip: '"What is the difference between a generator and an iterator?" — All generators are iterators, but not all iterators are generators. Generators use yield.',
    mistakes: ['Trying to reuse an exhausted generator', 'Not using generators for large datasets (memory waste)'],
    summary: 'Generators are Python\'s elegent solution for lazy evaluation. Use them whenever dealing with large data streams.'
  },
  { id: 15, title: 'Decorators', diff: 'intermediate', time: '40 min', phase: 'intermediate',
    prereq: 'Iterators & Generators',
    desc: 'Function decorators, class decorators, functools.wraps, and real-world use cases.',
    theory: `A decorator is a function that wraps another function to extend its behavior without modifying it. Decorators use the @ syntax and are a form of metaprogramming.`,
    code: `import functools\nimport time\n\n# Basic decorator\ndef timer(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        elapsed = time.perf_counter() - start\n        print(f"{func.__name__} took {elapsed:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow_sum(n):\n    return sum(range(n))\n\nresult = slow_sum(1_000_000)\n\n# Decorator with arguments\ndef retry(times=3):\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            for attempt in range(1, times + 1):\n                try:\n                    return func(*args, **kwargs)\n                except Exception as e:\n                    print(f"Attempt {attempt} failed: {e}")\n            raise Exception("All retries exhausted")\n        return wrapper\n    return decorator\n\n@retry(times=3)\ndef fetch_data():\n    raise ConnectionError("Network error")\n\n# Memoization with lru_cache\nfrom functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)\n\nprint(fib(50))  # 12586269025 (fast!)`,
    output: `slow_sum took 0.0234s\nAttempt 1 failed: Network error\nAttempt 2 failed: Network error\nAttempt 3 failed: Network error\n12586269025`,
    note: 'Always use @functools.wraps(func) inside your decorator to preserve the wrapped function\'s metadata (__name__, __doc__).',
    warning: 'Stacking multiple decorators applies them bottom-up: @a @b @c def f() means f = a(b(c(f))).',
    tip: 'Built-in decorators: @property, @classmethod, @staticmethod, @functools.lru_cache, @functools.cached_property.',
    interviewTip: '"What is functools.wraps and why use it?" — Without it, the wrapped function loses its __name__ and __doc__, breaking introspection and debugging.',
    mistakes: ['Forgetting @functools.wraps(func)', 'Forgetting to call the wrapped function and return its result'],
    summary: 'Decorators are Python\'s most elegant metaprogramming tool. Master them for logging, caching, retry logic, and access control.'
  },
  { id: 16, title: 'Comprehensions & Functional Tools', diff: 'intermediate', time: '30 min', phase: 'intermediate',
    prereq: 'Decorators',
    desc: 'List, dict, set comprehensions, map(), filter(), reduce(), and zip().',
    theory: `Python provides powerful functional tools for data transformation. Comprehensions create new collections concisely. map(), filter(), and reduce() apply functions to iterables.`,
    code: `from functools import reduce\n\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# List comprehension\nsquares = [x**2 for x in numbers]\nprint(squares[:5])  # [1, 4, 9, 16, 25]\n\n# Filtered comprehension\nevens_squared = [x**2 for x in numbers if x % 2 == 0]\nprint(evens_squared)  # [4, 16, 36, 64, 100]\n\n# Dict comprehension\nword_lengths = {w: len(w) for w in ["apple", "banana", "kiwi"]}\nprint(word_lengths)\n\n# Set comprehension\nunique_remainders = {x % 3 for x in numbers}\nprint(unique_remainders)  # {0, 1, 2}\n\n# map()\ndoubled = list(map(lambda x: x * 2, numbers))\nprint(doubled[:5])  # [2, 4, 6, 8, 10]\n\n# filter()\nodd_nums = list(filter(lambda x: x % 2 != 0, numbers))\nprint(odd_nums)  # [1, 3, 5, 7, 9]\n\n# reduce()\ntotal = reduce(lambda a, b: a + b, numbers)\nprint(total)  # 55\n\n# zip()\nnames = ["Alice", "Bob", "Charlie"]\nscores = [95, 87, 91]\npairs = list(zip(names, scores))\nprint(pairs)`,
    output: `[1, 4, 9, 16, 25]\n[4, 16, 36, 64, 100]\n{'apple': 5, 'banana': 6, 'kiwi': 4}\n{0, 1, 2}\n[2, 4, 6, 8, 10]\n[1, 3, 5, 7, 9]\n55\n[('Alice', 95), ('Bob', 87), ('Charlie', 91)]`,
    note: 'Comprehensions are generally more Pythonic and readable than map/filter. Use them when the logic is simple.',
    warning: 'Nested list comprehensions can become hard to read. Prefer explicit loops if nesting more than 2 levels deep.',
    tip: 'zip() stops at the shortest iterable. Use itertools.zip_longest() if you need to continue with a fill value.',
    interviewTip: '"When would you use map() over a list comprehension?" — When applying an existing named function: map(str, numbers) vs [str(n) for n in numbers].',
    mistakes: ['Using reduce() for simple sums (use sum() instead)', 'Forgetting list() around map/filter (they return lazy iterators)'],
    summary: 'Functional tools and comprehensions enable concise, expressive data transformations — a hallmark of Pythonic code.'
  },
  { id: 17, title: 'Regular Expressions', diff: 'intermediate', time: '35 min', phase: 'intermediate',
    prereq: 'Comprehensions & Functional Tools',
    desc: 'Pattern matching with re module: search, match, findall, groups, substitution, and flags.',
    theory: `Regular expressions (regex) are patterns for matching strings. Python\'s re module provides full regex support. Key functions: re.search(), re.match(), re.findall(), re.sub(), re.compile().`,
    code: `import re\n\ntext = "Contact us at support@python.org or admin@example.com"\n\n# Basic search\nif re.search(r"python", text, re.IGNORECASE):\n    print("Found 'python'!")\n\n# Find all email addresses\nemail_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'\nemails = re.findall(email_pattern, text)\nprint(emails)  # ['support@python.org', 'admin@example.com']\n\n# Groups\ndate = "Date: 2024-01-15"\nmatch = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", date)\nif match:\n    year, month, day = match.groups()\n    print(f"Year: {year}, Month: {month}, Day: {day}")\n\n# Substitution\nresult = re.sub(r"\\d+", "#", "Call 1800-555-1234 now")\nprint(result)  # Call #-#-# now\n\n# Compiled pattern (reuse)\nphone_re = re.compile(r"\\d{3}-\\d{3}-\\d{4}")\nphones = phone_re.findall("555-123-4567 and 800-555-1234")\nprint(phones)`,
    output: `Found 'python'!\n['support@python.org', 'admin@example.com']\nYear: 2024, Month: 01, Day: 15\nCall #-#-# now\n['555-123-4567', '800-555-1234']`,
    note: 'Always use raw strings (r"...") for regex patterns to avoid issues with backslash escaping.',
    warning: 'Backtracking in complex regex patterns can cause catastrophic performance (ReDoS). Test patterns with large inputs.',
    tip: 'Use re.compile() when you need to use the same pattern multiple times — it compiles the regex once for performance.',
    interviewTip: '"What is the difference between re.match() and re.search()?" — match() only checks the beginning of the string; search() scans the entire string.',
    mistakes: ['Forgetting r"" raw strings', 'Using .* greedily when .*? (non-greedy) is needed'],
    summary: 'Regular expressions are a powerful text-processing tool. Master the re module for parsing, validation, and extraction tasks.'
  },
  { id: 18, title: 'Data Structures: Stack, Queue, Linked List', diff: 'advanced', time: '45 min', phase: 'advanced',
    prereq: 'Regular Expressions',
    desc: 'Implement stack, queue, and linked list in Python using classes and built-in structures.',
    theory: `Python\'s list works as a stack (LIFO). collections.deque works as a queue (FIFO) with O(1) append/popleft. Linked lists are commonly asked in interviews and must be implemented manually.`,
    code: `from collections import deque\n\n# Stack using list\nstack = []\nstack.append(1)\nstack.append(2)\nstack.append(3)\nprint(stack.pop())  # 3 (LIFO)\nprint(stack)        # [1, 2]\n\n# Queue using deque\nqueue = deque()\nqueue.append("A")\nqueue.append("B")\nqueue.append("C")\nprint(queue.popleft())  # A (FIFO)\nprint(queue)  # deque(['B', 'C'])\n\n# Linked List implementation\nclass Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n\n    def append(self, data):\n        new_node = Node(data)\n        if not self.head:\n            self.head = new_node\n            return\n        curr = self.head\n        while curr.next:\n            curr = curr.next\n        curr.next = new_node\n\n    def display(self):\n        vals = []\n        curr = self.head\n        while curr:\n            vals.append(str(curr.data))\n            curr = curr.next\n        print(" -> ".join(vals))\n\nll = LinkedList()\nll.append(10)\nll.append(20)\nll.append(30)\nll.display()  # 10 -> 20 -> 30`,
    output: `3\n[1, 2]\nA\ndeque(['B', 'C'])\n10 -> 20 -> 30`,
    note: 'Use collections.deque for queue operations instead of list.pop(0) — deque popleft() is O(1), list pop(0) is O(n).',
    warning: 'Never use list as a queue for large programs. The O(n) pop(0) will create a performance bottleneck.',
    tip: 'Python\'s queue module provides thread-safe Queue, LifoQueue, and PriorityQueue for concurrent programs.',
    interviewTip: '"Implement a stack using a linked list." or "Reverse a linked list." — Classic interview problems. Practice these patterns.',
    mistakes: ['Using list.pop(0) for queue (O(n))', 'Losing the head pointer in linked list manipulation'],
    summary: 'Master Python implementations of core data structures — these appear in every technical interview.'
  },
  { id: 19, title: 'Sorting & Searching Algorithms', diff: 'advanced', time: '50 min', phase: 'advanced',
    prereq: 'Data Structures: Stack, Queue, Linked List',
    desc: 'Bubble, selection, insertion, merge sort, quicksort, binary search — implementations and complexity.',
    theory: `Sorting and searching are fundamental algorithms. Python\'s built-in sorted() uses Timsort (O(n log n)). For interviews, you must understand and implement basic sorting algorithms from scratch.`,
    code: `# Bubble Sort — O(n²)\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\n\nprint(bubble_sort([64, 34, 25, 12, 22]))  # [12, 22, 25, 34, 64]\n\n# Merge Sort — O(n log n)\ndef merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(l, r):\n    result, i, j = [], 0, 0\n    while i < len(l) and j < len(r):\n        if l[i] <= r[j]:\n            result.append(l[i]); i += 1\n        else:\n            result.append(r[j]); j += 1\n    result.extend(l[i:])\n    result.extend(r[j:])\n    return result\n\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))\n\n# Binary Search — O(log n)\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1\n\ndata = [3, 9, 10, 27, 38, 43, 82]\nprint(binary_search(data, 27))  # 3\nprint(binary_search(data, 50))  # -1`,
    output: `[12, 22, 25, 34, 64]\n[3, 9, 10, 27, 38, 43, 82]\n3\n-1`,
    note: 'Python\'s built-in sort uses Timsort — a hybrid of merge sort and insertion sort, optimized for real-world data patterns.',
    warning: 'Binary search ONLY works on sorted arrays. Always sort first if the array is unsorted.',
    tip: 'Use sorted(list, key=lambda x: x[1]) to sort by a custom key. Use reverse=True for descending order.',
    interviewTip: '"What is the time complexity of merge sort?" — O(n log n) in all cases. Space: O(n). Stable sort.',
    mistakes: ['Applying binary search to an unsorted array', 'Off-by-one errors in binary search boundaries'],
    summary: 'Sorting and searching algorithms are interview staples. Know the complexity of each and be able to implement them from scratch.'
  },
  { id: 20, title: 'Recursion & Dynamic Programming', diff: 'advanced', time: '55 min', phase: 'advanced',
    prereq: 'Sorting & Searching Algorithms',
    desc: 'Recursive thinking, base cases, memoization, tabulation, and classic DP problems.',
    theory: `Recursion solves problems by reducing them to smaller sub-problems. Dynamic programming (DP) optimizes recursion by caching results (memoization) or building solutions bottom-up (tabulation).`,
    code: `from functools import lru_cache\nimport sys\n\n# Fibonacci — naive recursion O(2^n)\ndef fib_naive(n):\n    if n <= 1: return n\n    return fib_naive(n-1) + fib_naive(n-2)\n\n# Fibonacci — memoized O(n)\n@lru_cache(maxsize=None)\ndef fib_memo(n):\n    if n <= 1: return n\n    return fib_memo(n-1) + fib_memo(n-2)\n\n# Fibonacci — tabulation O(n), O(1) space\ndef fib_dp(n):\n    if n <= 1: return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b\n\nprint(fib_memo(50))  # 12586269025\nprint(fib_dp(50))    # 12586269025\n\n# 0/1 Knapsack — classic DP\ndef knapsack(weights, values, capacity):\n    n = len(weights)\n    dp = [[0] * (capacity + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        for w in range(capacity + 1):\n            dp[i][w] = dp[i-1][w]\n            if weights[i-1] <= w:\n                dp[i][w] = max(dp[i][w],\n                    dp[i-1][w - weights[i-1]] + values[i-1])\n    return dp[n][capacity]\n\nweights = [2, 3, 4, 5]\nvalues  = [3, 4, 5, 6]\nprint(knapsack(weights, values, 5))  # 7`,
    output: `12586269025\n12586269025\n7`,
    note: 'Python\'s default recursion limit is 1000. Increase it with sys.setrecursionlimit(n) but prefer iterative solutions for deep recursion.',
    warning: 'Naive recursion for Fibonacci is exponential time — NEVER use it in production. Always memoize or use tabulation.',
    tip: '@lru_cache is the easiest way to add memoization. For more control, use a manual dict cache.',
    interviewTip: '"Solve Fibonacci with DP." — Start with top-down memoization, then optimize to bottom-up O(1) space tabulation.',
    mistakes: ['Missing base case (causes infinite recursion)', 'Not realizing when subproblems overlap (need DP)', 'Stack overflow from deep recursion'],
    summary: 'DP is the key to solving hard algorithmic problems efficiently. Master memoization and tabulation patterns.'
  },
];

const PYTHON_PROGRAMS = {
  'Basic': [
    { id: 'b1', title: 'Fibonacci Series', statement: 'Print the first N Fibonacci numbers.',
      code: `def fibonacci(n):\n    a, b = 0, 1\n    result = []\n    for _ in range(n):\n        result.append(a)\n        a, b = b, a + b\n    return result\n\nprint(fibonacci(10))`,
      output: '[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]',
      explanation: 'We use two variables a and b to track consecutive Fibonacci numbers, swapping them in each iteration.',
      complexity: 'O(n)' },
    { id: 'b2', title: 'Palindrome Check', statement: 'Check if a given string is a palindrome.',
      code: `def is_palindrome(s):\n    s = s.lower().replace(" ", "")\n    return s == s[::-1]\n\nprint(is_palindrome("racecar"))  # True\nprint(is_palindrome("hello"))    # False\nprint(is_palindrome("A man a plan a canal Panama"))  # True`,
      output: 'True\nFalse\nTrue',
      explanation: 'We normalize the string (lowercase, remove spaces), then compare it with its reverse using slicing [::-1].',
      complexity: 'O(n)' },
    { id: 'b3', title: 'Prime Number Check', statement: 'Check if a number is prime and list all primes up to N.',
      code: `def is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprimes = [n for n in range(2, 50) if is_prime(n)]\nprint(primes)`,
      output: '[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]',
      explanation: 'We only check divisors up to √n. If none divide evenly, the number is prime.',
      complexity: 'O(√n)' },
    { id: 'b4', title: 'Factorial', statement: 'Calculate the factorial of a number recursively and iteratively.',
      code: `import math\n\n# Recursive\ndef factorial_rec(n):\n    if n <= 1: return 1\n    return n * factorial_rec(n - 1)\n\n# Iterative\ndef factorial_iter(n):\n    result = 1\n    for i in range(2, n + 1):\n        result *= i\n    return result\n\nprint(factorial_rec(10))   # 3628800\nprint(factorial_iter(10))  # 3628800\nprint(math.factorial(10))  # 3628800`,
      output: '3628800\n3628800\n3628800',
      explanation: 'The recursive approach uses the definition n! = n × (n-1)!. The iterative approach multiplies from 2 to n.',
      complexity: 'O(n)' },
  ],
  'Intermediate': [
    { id: 'i1', title: 'Binary Search', statement: 'Implement binary search on a sorted list.',
      code: `def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n\ndata = [1, 3, 5, 7, 9, 11, 13, 15]\nprint(binary_search(data, 7))   # 3\nprint(binary_search(data, 10))  # -1`,
      output: '3\n-1',
      explanation: 'We halve the search space at each step by comparing the target to the midpoint.',
      complexity: 'O(log n)' },
    { id: 'i2', title: 'Anagram Check', statement: 'Check if two strings are anagrams of each other.',
      code: `from collections import Counter\n\ndef are_anagrams(s1, s2):\n    return Counter(s1.lower()) == Counter(s2.lower())\n\nprint(are_anagrams("listen", "silent"))  # True\nprint(are_anagrams("hello", "world"))    # False\nprint(are_anagrams("Triangle", "Integral"))  # True`,
      output: 'True\nFalse\nTrue',
      explanation: 'Counter creates a frequency map of characters. Two strings are anagrams if their Counter maps are equal.',
      complexity: 'O(n)' },
    { id: 'i3', title: 'Two Sum Problem', statement: 'Find two numbers in an array that add up to a target.',
      code: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))  # [0, 1]\nprint(two_sum([3, 2, 4], 6))       # [1, 2]\nprint(two_sum([3, 3], 6))          # [0, 1]`,
      output: '[0, 1]\n[1, 2]\n[0, 1]',
      explanation: 'We use a hash map to store each number\'s index. For each new number, we check if its complement (target - num) exists in the map.',
      complexity: 'O(n)' },
  ],
  'Advanced': [
    { id: 'a1', title: 'LRU Cache Implementation', statement: 'Implement a Least Recently Used (LRU) cache.',
      code: `from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.cache = OrderedDict()\n\n    def get(self, key):\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n\n    def put(self, key, value):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)\n\ncache = LRUCache(3)\ncache.put(1, "A")\ncache.put(2, "B")\ncache.put(3, "C")\nprint(cache.get(1))   # A  (1 is now most recent)\ncache.put(4, "D")     # evicts 2 (least recent)\nprint(cache.get(2))   # -1 (evicted)`,
      output: 'A\n-1',
      explanation: 'OrderedDict maintains insertion order. move_to_end marks items as recently used. popitem(last=False) removes the LRU.',
      complexity: 'O(1)' },
  ],
  'OOP': [
    { id: 'oop1', title: 'Class Inheritance Chain', statement: 'Build a shape hierarchy with area and perimeter.',
      code: `import math\n\nclass Shape:\n    def area(self): raise NotImplementedError\n    def perimeter(self): raise NotImplementedError\n    def __str__(self):\n        return f"{type(self).__name__}: area={self.area():.2f}, perimeter={self.perimeter():.2f}"\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self): return math.pi * self.radius ** 2\n    def perimeter(self): return 2 * math.pi * self.radius\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w, self.h = w, h\n    def area(self): return self.w * self.h\n    def perimeter(self): return 2 * (self.w + self.h)\n\nshapes = [Circle(5), Rectangle(4, 6)]\nfor s in shapes:\n    print(s)`,
      output: 'Circle: area=78.54, perimeter=31.42\nRectangle: area=24.00, perimeter=20.00',
      explanation: 'Abstract base class Shape defines the interface. Subclasses implement area() and perimeter(). Polymorphism allows uniform handling.',
      complexity: 'O(1)' },
  ],
  'File Handling': [
    { id: 'fh1', title: 'Word Frequency Counter', statement: 'Count word frequencies from a text file.',
      code: `from collections import Counter\nimport re\n\ndef word_frequency(text):\n    words = re.findall(r'\\b[a-z]+\\b', text.lower())\n    freq = Counter(words)\n    return freq.most_common(10)\n\nsample = """Python is great. Python is versatile.\nPython makes programming fun. Great language!\"\"\"\n\nresult = word_frequency(sample)\nfor word, count in result:\n    print(f"{word}: {count}")`,
      output: 'python: 3\nis: 2\ngreat: 2\nversatile: 1\nmakes: 1\nprogramming: 1\nfun: 1\nlanguage: 1',
      explanation: 'regex finds all words, Counter tallies frequencies, most_common() returns sorted results.',
      complexity: 'O(n log n)' },
  ],
  'Modules': [
    { id: 'm1', title: 'Date & Time Operations', statement: 'Perform common date/time operations using datetime module.',
      code: `from datetime import datetime, timedelta\n\nnow = datetime.now()\nprint(f"Now: {now.strftime('%Y-%m-%d %H:%M:%S')}")\n\n# Add days\nfuture = now + timedelta(days=30)\nprint(f"30 days later: {future.strftime('%Y-%m-%d')}")\n\n# Days between two dates\nbday = datetime(2000, 7, 15)\nage_days = (now - bday).days\nprint(f"Age in days: {age_days}")\n\n# Parse date string\ndate_str = "2024-03-20"\nparsed = datetime.strptime(date_str, "%Y-%m-%d")\nprint(f"Parsed: {parsed.strftime('%B %d, %Y')}")`,
      output: 'Now: 2024-07-10 19:30:00\n30 days later: 2024-08-09\nAge in days: 8761\nParsed: March 20, 2024',
      explanation: 'datetime module provides datetime objects. timedelta allows arithmetic. strptime parses strings, strftime formats them.',
      complexity: 'O(1)' },
  ],
  'Exception Handling': [
    { id: 'ex1', title: 'Robust Input Validator', statement: 'Build a validated user input system with custom exceptions.',
      code: `class ValidationError(Exception):\n    pass\n\nclass AgeError(ValidationError):\n    pass\n\ndef validate_age(age_str):\n    try:\n        age = int(age_str)\n    except ValueError:\n        raise ValidationError(f"'{age_str}' is not a valid integer")\n    if age < 0 or age > 150:\n        raise AgeError(f"Age {age} is out of valid range (0–150)")\n    return age\n\ntest_inputs = ["25", "abc", "200", "-5", "30"]\nfor inp in test_inputs:\n    try:\n        age = validate_age(inp)\n        print(f"Valid age: {age}")\n    except AgeError as e:\n        print(f"Age Error: {e}")\n    except ValidationError as e:\n        print(f"Validation Error: {e}")`,
      output: 'Valid age: 25\nValidation Error: \'abc\' is not a valid integer\nAge Error: Age 200 is out of valid range (0–150)\nAge Error: Age -5 is out of valid range (0–150)\nValid age: 30',
      explanation: 'Custom exception hierarchy allows specific catching. ValidationError is the base, AgeError is more specific.',
      complexity: 'O(1)' },
  ],
  'Data Structures': [
    { id: 'ds1', title: 'Stack with Min', statement: 'Design a stack that supports push, pop, and getMin in O(1).',
      code: `class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n\n    def push(self, val):\n        self.stack.append(val)\n        min_val = val if not self.min_stack else min(val, self.min_stack[-1])\n        self.min_stack.append(min_val)\n\n    def pop(self):\n        self.min_stack.pop()\n        return self.stack.pop()\n\n    def top(self):\n        return self.stack[-1]\n\n    def get_min(self):\n        return self.min_stack[-1]\n\ns = MinStack()\ns.push(5)\ns.push(3)\ns.push(7)\ns.push(1)\nprint(s.get_min())  # 1\ns.pop()\nprint(s.get_min())  # 3`,
      output: '1\n3',
      explanation: 'We maintain a parallel min_stack where each position tracks the minimum up to that point. Pop both stacks together.',
      complexity: 'O(1)' },
  ],
  'Algorithms': [
    { id: 'al1', title: 'Quicksort', statement: 'Implement quicksort algorithm with Lomuto partition scheme.',
      code: `def quicksort(arr, low=0, high=None):\n    if high is None:\n        high = len(arr) - 1\n    if low < high:\n        pivot_idx = partition(arr, low, high)\n        quicksort(arr, low, pivot_idx - 1)\n        quicksort(arr, pivot_idx + 1, high)\n    return arr\n\ndef partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i + 1], arr[high] = arr[high], arr[i + 1]\n    return i + 1\n\ndata = [64, 34, 25, 12, 22, 11, 90]\nprint(quicksort(data))`,
      output: '[11, 12, 22, 25, 34, 64, 90]',
      explanation: 'Lomuto scheme picks the last element as pivot, partitions around it, then recursively sorts both halves.',
      complexity: 'O(n log n)' },
  ],
};

const QUIZ_DATA = {
  beginner: [
    { q: 'What does the print() function do in Python?', options: ['Prints to a printer', 'Displays output to the console', 'Creates a new variable', 'Compiles Python code'], answer: 1, explanation: 'print() displays the provided text or values to the standard output (console).' },
    { q: 'Which of the following is NOT a valid Python data type?', options: ['int', 'float', 'char', 'str'], answer: 2, explanation: 'Python does not have a "char" type. Single characters are just strings of length 1.' },
    { q: 'What is the output of: print(10 // 3)?', options: ['3.333', '3', '4', '3.0'], answer: 1, explanation: '// is floor division. 10 // 3 = 3 (the integer quotient without remainder).' },
    { q: 'How do you create a comment in Python?', options: ['// comment', '/* comment */', '# comment', '-- comment'], answer: 2, explanation: 'Python uses the # symbol to start a single-line comment.' },
    { q: 'What is the correct way to create a list in Python?', options: ['list = (1, 2, 3)', 'list = [1, 2, 3]', 'list = {1, 2, 3}', 'list = <1, 2, 3>'], answer: 1, explanation: 'Lists use square brackets []. Parentheses () create tuples, curly braces {} create sets or dicts.' },
    { q: 'What does len() return for the string "Python"?', options: ['5', '6', '7', '8'], answer: 1, explanation: '"Python" has 6 characters: P-y-t-h-o-n.' },
    { q: 'Which keyword is used to define a function in Python?', options: ['function', 'fun', 'def', 'func'], answer: 2, explanation: 'Python uses the "def" keyword to define functions.' },
    { q: 'What is the output of: print(type(3.14))?', options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"], answer: 1, explanation: '3.14 is a floating-point number, so type() returns <class \'float\'>.' },
    { q: 'Which operator is used for exponentiation in Python?', options: ['^', '**', 'pow', 'exp'], answer: 1, explanation: 'Python uses ** for exponentiation. 2**3 = 8. The ^ operator is bitwise XOR.' },
    { q: 'What does range(5) produce?', options: ['[1, 2, 3, 4, 5]', '[0, 1, 2, 3, 4]', '[0, 1, 2, 3, 4, 5]', '[1, 2, 3, 4]'], answer: 1, explanation: 'range(5) produces 0, 1, 2, 3, 4 — five numbers starting from 0.' },
  ],
  intermediate: [
    { q: 'What is the output of: [x**2 for x in range(4)]?', options: ['[0, 1, 4, 9]', '[1, 4, 9, 16]', '[0, 1, 2, 3]', '[1, 2, 3, 4]'], answer: 0, explanation: 'range(4) gives 0,1,2,3. Squaring each: 0,1,4,9.' },
    { q: 'What does *args collect in a function definition?', options: ['Keyword arguments', 'A list of positional arguments', 'A tuple of positional arguments', 'Default arguments'], answer: 2, explanation: '*args collects extra positional arguments into a TUPLE, not a list.' },
    { q: 'Which method removes and returns the last element of a list?', options: ['remove()', 'delete()', 'pop()', 'discard()'], answer: 2, explanation: 'list.pop() removes and returns the last element by default. pop(i) removes element at index i.' },
    { q: 'What does "is" check in Python?', options: ['Value equality', 'Object identity (same memory address)', 'Type equality', 'String comparison'], answer: 1, explanation: '"is" checks if two variables refer to the exact same object in memory, not just equal values.' },
    { q: 'What is a generator in Python?', options: ['A class that generates random numbers', 'A function that uses yield to produce values lazily', 'A built-in list factory', 'A type of decorator'], answer: 1, explanation: 'A generator function uses yield to produce values one at a time, enabling lazy evaluation.' },
    { q: 'What does @functools.wraps do in a decorator?', options: ['Caches the function result', 'Preserves the original function\'s metadata', 'Makes the function thread-safe', 'Converts the function to async'], answer: 1, explanation: '@functools.wraps copies the __name__, __doc__, and other attributes from the wrapped function to the wrapper.' },
    { q: 'What is a dictionary comprehension?', options: ['A comment about dict', '{k: v for k, v in items}', '[k: v for k, v in items]', 'dict(k, v for k, v in items)'], answer: 1, explanation: 'Dict comprehensions use {key: value for ...} syntax inside curly braces.' },
    { q: 'What does collections.deque offer over a list for queue operations?', options: ['More memory', 'O(1) popleft()', 'Sorted elements', 'Type safety'], answer: 1, explanation: 'deque.popleft() is O(1). list.pop(0) is O(n) because all elements must shift.' },
    { q: 'What is the time complexity of Python dict lookup?', options: ['O(n)', 'O(log n)', 'O(1) average', 'O(n²)'], answer: 2, explanation: 'Python dicts are hash tables with O(1) average case for get, set, and delete.' },
    { q: 'What does the "with" statement ensure?', options: ['Faster execution', 'Proper resource cleanup via context manager', 'Thread safety', 'Variable scoping'], answer: 1, explanation: '"with" invokes __enter__ on entry and __exit__ on exit, ensuring cleanup even if an exception occurs.' },
  ],
  advanced: [
    { q: 'What is Python\'s GIL?', options: ['Global Integer Limit', 'Global Interpreter Lock', 'General Interface Layer', 'Global Import Library'], answer: 1, explanation: 'The GIL (Global Interpreter Lock) is a mutex that prevents multiple native threads from executing Python bytecode simultaneously.' },
    { q: 'What does __slots__ do in a class?', options: ['Defines method slots', 'Restricts instance attributes, saving memory', 'Creates class slots for inheritance', 'Defines property accessors'], answer: 1, explanation: '__slots__ prevents creation of __dict__ on instances, saving memory when creating many instances of a class.' },
    { q: 'What is a metaclass?', options: ['A class that inherits from object', 'A class whose instances are classes', 'A virtual base class', 'An abstract class template'], answer: 1, explanation: 'A metaclass is a "class of a class". It controls how classes are created. type is Python\'s default metaclass.' },
    { q: 'What does asyncio.gather() do?', options: ['Collects all imports', 'Runs multiple coroutines concurrently', 'Gathers all exceptions', 'Joins all threads'], answer: 1, explanation: 'asyncio.gather() schedules multiple coroutines to run concurrently and collects all results.' },
    { q: 'What is the purpose of __enter__ and __exit__?', options: ['Constructor and destructor', 'Context manager protocol for "with" statements', 'Import and export methods', 'Async entry points'], answer: 1, explanation: '__enter__ is called when entering a "with" block, __exit__ when leaving. They form the context manager protocol.' },
    { q: 'Which memory optimization does Python use for small integers?', options: ['Garbage collection', 'Integer interning (-5 to 256)', 'Lazy evaluation', 'Copy-on-write'], answer: 1, explanation: 'Python interns (caches) integers from -5 to 256. These always point to the same object, which is why "is" works for them.' },
    { q: 'What is the time complexity of Python list.append()?', options: ['O(n)', 'O(log n)', 'O(1) amortized', 'O(n²)'], answer: 2, explanation: 'list.append() is O(1) amortized. Occasionally O(n) when the underlying array must be resized.' },
    { q: 'What does @property enable?', options: ['Method caching', 'Accessing methods like attributes with getter/setter control', 'Static method creation', 'Abstract method declaration'], answer: 1, explanation: '@property allows a method to be accessed like an attribute, while allowing getter/setter/deleter logic.' },
    { q: 'What is a closure in Python?', options: ['A closed class', 'A function that captures variables from its enclosing scope', 'A sealed module', 'A thread-local variable'], answer: 1, explanation: 'A closure is a nested function that remembers and accesses variables from its enclosing scope even after the outer function returns.' },
    { q: 'What does the __mro__ attribute show?', options: ['Method return order', 'Method Resolution Order for inheritance lookup', 'Module resolution order', 'Memory reference order'], answer: 1, explanation: 'MRO (Method Resolution Order) defines the order Python looks up attributes/methods in an inheritance hierarchy. Follows C3 linearization.' },
  ],
};

const INTERVIEW_QUESTIONS = {
  'Basic': [
    { q: 'What is Python?', a: 'Python is a high-level, interpreted, general-purpose programming language known for its clear syntax and readability. It supports multiple paradigms: procedural, object-oriented, and functional.', tip: 'Mention: dynamic typing, garbage collection, extensive standard library, cross-platform.', freq: true },
    { q: 'What are Python\'s key features?', a: 'Readable syntax, dynamic typing, automatic memory management, extensive standard library, interpreted (no compilation step), cross-platform, multiple paradigm support, and a massive ecosystem (NumPy, Pandas, Django, etc.).', tip: 'List 5-6 features confidently and give brief examples.', freq: true },
    { q: 'What is PEP 8?', a: 'PEP 8 is the Python Enhancement Proposal that provides coding style guidelines: 4-space indentation, snake_case for variables, PascalCase for classes, max 79 characters per line, and docstrings for all public APIs.', tip: 'Show you follow best practices in your own code.', freq: false },
    { q: 'What is the difference between a list and a tuple?', a: 'Lists are mutable (can be changed), use more memory, and are suited for collections that change. Tuples are immutable, use less memory, are hashable (can be dict keys or set elements), and are slightly faster.', tip: 'Also mention: tuples are used for fixed data like coordinates, lists for dynamic collections.', freq: true },
    { q: 'What is the purpose of __init__?', a: '__init__ is the constructor method called automatically when a new object is created. It initializes the instance\'s attributes. It receives self (the new instance) as the first argument.', tip: 'Distinguish __init__ (initializer) from __new__ (allocator) for advanced questions.', freq: true },
  ],
  'Intermediate': [
    { q: 'Explain list comprehensions with an example.', a: 'List comprehensions create lists concisely: squares = [x**2 for x in range(10)]. They can include conditions: evens = [x for x in range(20) if x % 2 == 0]. They are more readable and faster than equivalent for-loops.', tip: 'Show dict and set comprehensions too: {k: v for k, v in items}', freq: true },
    { q: 'What is a decorator and how does it work?', a: 'A decorator is a function that takes a function and returns a modified version of it, using the @ syntax. It wraps the original function to add behavior (logging, caching, auth) without modifying it. Always use @functools.wraps to preserve metadata.', tip: 'Implement a simple @timer or @retry decorator during the interview.', freq: true },
    { q: 'What is the difference between deepcopy and copy?', a: 'copy.copy() creates a shallow copy — a new object but with references to the same nested objects. copy.deepcopy() creates a completely independent copy, recursively copying all nested objects.', tip: 'Draw a diagram showing how shallow vs deep copy handles nested lists.', freq: false },
    { q: 'What are *args and **kwargs?', a: '*args collects extra positional arguments into a tuple. **kwargs collects extra keyword arguments into a dictionary. They allow functions to accept variable numbers of arguments.', tip: 'Show how to forward them: def wrapper(*args, **kwargs): return func(*args, **kwargs)', freq: true },
    { q: 'What is a generator and when would you use it?', a: 'A generator is a function that uses yield to produce values lazily, one at a time, without storing all values in memory. Use them for large datasets, infinite sequences, or pipeline processing.', tip: 'Compare memory usage: list with 1M items vs generator.', freq: true },
  ],
  'Advanced': [
    { q: 'What is the GIL and how does it affect multithreading?', a: 'The GIL (Global Interpreter Lock) is a mutex that allows only one thread to execute Python bytecode at a time. This limits CPU-bound multithreading to a single core. For CPU-bound tasks, use multiprocessing. For I/O-bound tasks, threading or asyncio works fine.', tip: 'Mention: Jython and IronPython don\'t have a GIL.', freq: true },
    { q: 'Explain metaclasses in Python.', a: 'A metaclass is the class of a class — it controls how classes are created. type is the default metaclass. Custom metaclasses override __new__ or __init__ to modify class creation, useful for singletons, ORM field validation, or API enforcement.', tip: 'Simple example: class Meta(type): def __new__(cls, name, bases, dct): ...', freq: false },
    { q: 'What is the difference between @staticmethod and @classmethod?', a: '@staticmethod receives no implicit first argument — it\'s just a namespace function. @classmethod receives cls (the class itself) as the first argument, making it useful for alternative constructors (class factory methods).', tip: 'Common pattern: class Date: @classmethod def from_string(cls, s): ...', freq: true },
    { q: 'Explain Python\'s memory management.', a: 'Python uses reference counting for memory management. When an object\'s reference count drops to zero, it is deallocated. Python also has a cyclic garbage collector for objects in reference cycles. The memory allocator uses pools/arenas for small objects.', tip: 'Mention: sys.getrefcount(), gc module, weakref for avoiding reference cycles.', freq: false },
    { q: 'What is __slots__ and when should you use it?', a: '__slots__ replaces the instance __dict__ with a fixed set of slot descriptors, reducing memory usage per instance by 40-50%. Use it when creating thousands of instances of a class with a known, fixed set of attributes.', tip: 'Benchmark: compare memory of 1M objects with and without __slots__.', freq: false },
  ],
  'HR Questions': [
    { q: 'Why do you want to learn Python?', a: 'Python\'s versatility across web development, data science, AI/ML, and automation makes it one of the most valuable skills. Its readable syntax accelerates learning and productivity, and its massive ecosystem means you can build anything efficiently.', tip: 'Connect to your personal projects or career goals.', freq: false },
    { q: 'Describe a Python project you have worked on.', a: 'Describe a specific project with: the problem it solved, the Python libraries used, challenges faced, and what you learned. Quantify the impact if possible.', tip: 'Prepare a 2-minute project pitch. Practice explaining it clearly to a non-technical person.', freq: true },
    { q: 'How do you keep up with Python updates?', a: 'Follow python.org release notes, PEP discussions, Real Python, Python Weekly newsletter, and Python-related talks from PyCon. Experiment with new features in personal projects.', tip: 'Mention a specific recent Python feature you found useful (walrus operator, match-case, structural pattern matching, etc.)', freq: false },
  ],
};

const DOWNLOADS = [
  { title: 'Python Complete Notes', icon: '📘', type: 'PDF', size: '4.2 MB', updated: 'Jun 2024', desc: 'Comprehensive notes covering all Python topics from basics to advanced, with examples and diagrams.', color: '#3776AB' },
  { title: 'Python Cheat Sheet', icon: '⚡', type: 'PDF', size: '890 KB', updated: 'Jul 2024', desc: 'Quick reference for syntax, built-in functions, data structures, and common patterns.', color: '#FFD43B' },
  { title: 'Python Handbook', icon: '📗', type: 'PDF', size: '6.1 MB', updated: 'May 2024', desc: 'Complete handbook including standard library reference, PEPs, and best practices guide.', color: '#4ade80' },
  { title: 'Practice Programs Pack', icon: '💻', type: 'ZIP', size: '2.3 MB', updated: 'Jul 2024', desc: '120+ solved Python programs covering all topics with explanations and test cases.', color: '#a855f7' },
  { title: 'Mini Projects Bundle', icon: '🚀', type: 'ZIP', size: '5.7 MB', updated: 'Jun 2024', desc: '15 mini projects with source code: calculator, todo app, web scraper, data analyzer, and more.', color: '#ec4899' },
  { title: 'Previous Year Questions', icon: '📝', type: 'PDF', size: '1.8 MB', updated: 'Apr 2024', desc: 'Curated previous year exam questions with detailed solutions and marking schemes.', color: '#fb923c' },
  { title: 'Interview Prep Notes', icon: '🎯', type: 'PDF', size: '2.9 MB', updated: 'Jul 2024', desc: 'Top 100 Python interview questions with detailed answers, code examples, and tips.', color: '#60a5fa' },
  { title: 'Python PDF Guide', icon: '📕', type: 'PDF', size: '7.4 MB', updated: 'Jul 2024', desc: 'Complete visual PDF guide with infographics, flow diagrams, and concept maps.', color: '#f87171' },
];

const PROJECTS = [
  { title: 'CLI Todo App', emoji: '✅', diff: 'Beginner', time: '4-6 hrs', tags: ['CLI', 'File I/O', 'OOP'], desc: 'A command-line task manager with add, complete, delete, and list operations using JSON persistence.', features: ['Add/remove tasks', 'Mark as complete', 'Save to JSON file', 'Filter by status', 'Due date support'] },
  { title: 'Web Scraper', emoji: '🕷️', diff: 'Intermediate', time: '8-12 hrs', tags: ['BeautifulSoup', 'requests', 'CSV'], desc: 'Scrape and parse web pages to extract structured data and save to CSV.', features: ['HTTP requests', 'HTML parsing', 'Data extraction', 'CSV export', 'Rate limiting'] },
  { title: 'Budget Tracker', emoji: '💰', diff: 'Beginner', time: '6-8 hrs', tags: ['CLI', 'SQLite', 'Reports'], desc: 'Track income and expenses with categories, monthly reports, and SQLite storage.', features: ['Add transactions', 'Category management', 'Monthly summary', 'SQLite persistence', 'Balance calculation'] },
  { title: 'Quiz Game', emoji: '🧠', diff: 'Beginner', time: '5-7 hrs', tags: ['OOP', 'JSON', 'CLI'], desc: 'An interactive multiple-choice quiz game with categories, scoring, and highscore tracking.', features: ['Multiple categories', 'Score tracking', 'Timer per question', 'Highscore board', 'JSON question bank'] },
  { title: 'REST API with Flask', emoji: '🌐', diff: 'Intermediate', time: '10-15 hrs', tags: ['Flask', 'REST API', 'SQLAlchemy'], desc: 'Build a CRUD REST API for a student management system using Flask and SQLAlchemy.', features: ['GET/POST/PUT/DELETE', 'SQLAlchemy ORM', 'JSON responses', 'Error handling', 'Input validation'] },
  { title: 'Data Dashboard', emoji: '📊', diff: 'Intermediate', time: '12-16 hrs', tags: ['Pandas', 'Matplotlib', 'CSV'], desc: 'Analyze CSV data and generate visualizations: bar charts, line graphs, pie charts.', features: ['Pandas data loading', 'Statistical analysis', 'Matplotlib charts', 'PDF report export', 'Interactive filters'] },
  { title: 'Chat Application', emoji: '💬', diff: 'Advanced', time: '20-25 hrs', tags: ['Socket', 'Threading', 'Tkinter'], desc: 'A multi-client chat application using Python sockets and threading with a Tkinter GUI.', features: ['Multiple clients', 'Socket programming', 'Threading', 'Tkinter GUI', 'Private messages'] },
  { title: 'Machine Learning Classifier', emoji: '🤖', diff: 'Advanced', time: '15-20 hrs', tags: ['scikit-learn', 'Pandas', 'NumPy'], desc: 'Build and evaluate ML classifiers (KNN, Decision Tree, SVM) on real datasets.', features: ['Data preprocessing', 'Multiple algorithms', 'Cross-validation', 'Confusion matrix', 'Model comparison'] },
  { title: 'Password Manager', emoji: '🔐', diff: 'Intermediate', time: '10-14 hrs', tags: ['cryptography', 'SQLite', 'CLI'], desc: 'A secure CLI password manager with AES encryption, master password, and search functionality.', features: ['AES encryption', 'Master password', 'Search passwords', 'Generate passwords', 'SQLite storage'] },
];

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

// Code Block with copy
const PyCodeBlock = ({ code, lang = 'Python' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="py-code-block">
      <div className="py-code-block-header">
        <span className="py-code-lang">{lang}</span>
        <button className="py-copy-btn" onClick={handleCopy}>
          {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
        </button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

// Output Block
const PyOutputBlock = ({ output }) => (
  <div className="py-output-block">
    <div className="py-output-header"><Terminal size={12} /> Output</div>
    <pre>{output}</pre>
  </div>
);

/* ============================================================
   TAB: OVERVIEW
   ============================================================ */
const OverviewTab = ({ setActiveTab }) => (
  <div className="py-tab-content py-overview-grid">
    <div className="py-overview-left">
      {/* About Python */}
      <div className="py-about-card">
        <h3>🐍 About Python</h3>
        <p>Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum in 1991. It emphasizes code readability with clean, English-like syntax. Python's philosophy: "There should be one obvious way to do it" (Zen of Python, PEP 20).</p>
        <p style={{ marginTop: '10px' }}>Python is dynamically typed, garbage-collected, and supports structured, object-oriented, and functional programming paradigms. It runs on Windows, macOS, Linux, and more.</p>
        <div className="py-why-grid" style={{ marginTop: '16px' }}>
          {[{ icon: '😊', title: 'Easy to Learn', desc: 'Simple syntax, readable code' }, { icon: '🔄', title: 'Versatile', desc: 'Web, AI, Data Science, Automation' }, { icon: '📈', title: 'In-Demand', desc: 'One of the most popular languages' }, { icon: '👥', title: 'Community', desc: 'Huge community support' }].map((w, i) => (
            <div key={i} className="py-why-item">
              <div className="py-why-icon" style={{ background: 'rgba(139,92,246,0.12)' }}>{w.icon}</div>
              <div><h5>{w.title}</h5><p>{w.desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* What You Will Learn */}
      <div className="py-about-card">
        <h3>⭐ What You Will Learn</h3>
        <div className="py-why-grid">
          {[{ icon: '💻', title: 'Write Clean Code', desc: 'Learn to write efficient, readable, and reusable code.', bg: '#3776AB' }, { icon: '🧩', title: 'Solve Problems', desc: 'Build logic and solve real-world programming problems.', bg: '#059669' }, { icon: '🚀', title: 'Work on Projects', desc: 'Create real-world projects to strengthen your skills.', bg: '#7c3aed' }, { icon: '🎯', title: 'Prepare for Interviews', desc: 'Practice interview questions and get job ready.', bg: '#b45309' }].map((w, i) => (
            <div key={i} className="py-why-item">
              <div className="py-why-icon" style={{ background: `${w.bg}22`, fontSize: '1.3rem' }}>{w.icon}</div>
              <div><h5>{w.title}</h5><p>{w.desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="py-about-card">
        <h3><Target size={17} /> Learning Objectives</h3>
        <div className="py-objectives-list">
          {['Understand Python fundamentals: variables, data types, and operators', 'Master control flow: conditions, loops, and functions', 'Work with built-in data structures: lists, dicts, sets, tuples', 'Apply OOP concepts: classes, inheritance, polymorphism, dunder methods', 'Handle files, exceptions, and modules confidently', 'Implement core algorithms and data structures', 'Build real-world projects using Python ecosystem', 'Prepare for technical interviews with Python'].map((obj, i) => (
            <div key={i} className="py-obj-item"><div className="py-obj-dot" /><span>{obj}</span></div>
          ))}
        </div>
      </div>

      {/* Career Opportunities */}
      <div className="py-about-card">
        <h3><Briefcase size={17} /> Career Opportunities</h3>
        <div className="py-career-grid">
          {[{ icon: '🌐', title: 'Web Developer', sub: 'Django, Flask, FastAPI' }, { icon: '🤖', title: 'ML Engineer', sub: 'TensorFlow, PyTorch' }, { icon: '📊', title: 'Data Analyst', sub: 'Pandas, NumPy, Matplotlib' }, { icon: '☁️', title: 'DevOps Engineer', sub: 'Automation & Scripting' }, { icon: '🔒', title: 'Security Analyst', sub: 'Penetration Testing' }, { icon: '🔬', title: 'Data Scientist', sub: 'Statistical Modeling' }].map((c, i) => (
            <div key={i} className="py-career-card">
              <div className="icon">{c.icon}</div>
              <h5>{c.title}</h5>
              <p>{c.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Python Ecosystem */}
      <div className="py-about-card">
        <h3><Globe size={17} /> Python Ecosystem & Popular Libraries</h3>
        <div className="py-ecosystem-grid">
          {['NumPy', 'Pandas', 'Matplotlib', 'scikit-learn', 'TensorFlow', 'PyTorch', 'Django', 'Flask', 'FastAPI', 'Requests', 'BeautifulSoup', 'Selenium', 'SQLAlchemy', 'Celery', 'Pytest', 'Pillow', 'OpenCV', 'NLTK'].map((lib, i) => (
            <div key={i} className="py-eco-chip">🔷 {lib}</div>
          ))}
        </div>
      </div>
    </div>

    {/* Right Sidebar */}
    <div className="py-overview-right">
      {/* Popular Topics */}
      <div className="py-popular-topics">
        <h4>🔥 Popular Topics</h4>
        {['Variables & Data Types', 'Functions', 'OOP Concepts', 'File Handling', 'Modules & Packages', 'Decorators', 'Generators', 'Exception Handling'].map((topic, i) => (
          <div key={i} className="py-topic-link" onClick={() => setActiveTab('lessons')}>
            <div className="py-topic-link-left"><div className="py-topic-num">{i + 1}</div>{topic}</div>
            <ChevronRight size={14} />
          </div>
        ))}
        <button className="py-view-all-btn" onClick={() => setActiveTab('lessons')}>
          View All Lessons <ArrowRight size={13} />
        </button>
      </div>

      {/* Continue Learning */}
      <div className="py-about-card" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(55,118,171,0.08))', border: '1px solid rgba(139,92,246,0.2)' }}>
        <h3>▶️ Continue Learning</h3>
        <p style={{ marginBottom: '14px' }}>Start from the beginning or jump to any lesson. Your progress is tracked automatically.</p>
        <button className="py-btn-primary" onClick={() => setActiveTab('lessons')} style={{ width: '100%', justifyContent: 'center' }}>
          <Play size={15} /> Start Lesson 1
        </button>
      </div>

      {/* Community */}
      <div className="py-community-card">
        <h4>👥 Community</h4>
        <p>Join millions of Python developers worldwide</p>
        <div className="py-community-stats">
          <div className="py-comm-stat"><strong>8M+</strong><span>Developers</span></div>
          <div className="py-comm-stat"><strong>350K+</strong><span>Packages</span></div>
          <div className="py-comm-stat"><strong>#1</strong><span>TIOBE 2024</span></div>
        </div>
        <button className="py-login-btn"><Users size={14} /> Join Community</button>
      </div>

      {/* Progress Summary */}
      <div className="py-about-card">
        <h3><BarChart2 size={17} /> Progress Summary</h3>
        {[{ label: 'Lessons Completed', val: '0 / 20', pct: 0 }, { label: 'Programs Solved', val: '0 / 50', pct: 0 }, { label: 'Quiz Progress', val: '0 / 30', pct: 0 }, { label: 'Projects Completed', val: '0 / 9', pct: 0 }].map((p, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
              <span>{p.label}</span><span>{p.val}</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${p.pct}%`, background: 'linear-gradient(90deg, var(--primary-purple), var(--accent-glow))', borderRadius: '100px' }} />
            </div>
          </div>
        ))}
        <button className="py-login-btn" style={{ marginTop: '8px' }}><Lock size={14} /> Login to Save Progress</button>
      </div>
    </div>
  </div>
);

/* ============================================================
   TAB: ROADMAP
   ============================================================ */
const RoadmapTab = () => {
  const [expandedId, setExpandedId] = useState(null);
  const phases = ['beginner', 'intermediate', 'advanced'];
  const phaseLabels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };

  return (
    <div className="py-tab-content py-roadmap-phases">
      {phases.map(phase => (
        <div key={phase} className="py-phase-block">
          <div className="py-phase-header">
            <span className={`py-phase-badge phase-${phase}`}>{phaseLabels[phase]}</span>
            <h3>{phase === 'beginner' ? 'Foundations' : phase === 'intermediate' ? 'Core Mastery' : 'Expert Level'}</h3>
            <div className="py-phase-line" />
          </div>
          <div className="py-roadmap-cards">
            {PYTHON_LESSONS.filter(l => l.phase === phase).map((lesson) => (
              <div key={lesson.id} className={`py-roadmap-card ${phase} ${expandedId === lesson.id ? 'expanded' : ''}`}>
                <div className="py-roadmap-card-header">
                  <div style={{ flex: 1 }}>
                    <div className="py-roadmap-card-meta">
                      <span className="py-lesson-num">Lesson {lesson.id}</span>
                      <span className={`py-diff-tag diff-${lesson.diff}`}>{lesson.diff}</span>
                    </div>
                    <div className="py-roadmap-title">{lesson.title}</div>
                  </div>
                  <button className="py-roadmap-expand-btn" onClick={() => setExpandedId(expandedId === lesson.id ? null : lesson.id)}>
                    {expandedId === lesson.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
                <p className="py-roadmap-desc">{lesson.desc}</p>
                <div className="py-roadmap-footer">
                  <div className="py-time-badge"><Clock size={13} />{lesson.time}</div>
                  <div className="py-status-badge status-not-started">● Not Started</div>
                </div>
                <AnimatePresence>
                  {expandedId === lesson.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="py-roadmap-expanded">
                      <div className="py-prereq"><strong>Prerequisites: </strong>{lesson.prereq}</div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Topics: Theory, Syntax, Examples, Code, Output, Notes, Best Practices, Interview Tips, Summary</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ============================================================
   TAB: LESSONS
   ============================================================ */
const LessonsTab = () => {
  const [activeLesson, setActiveLesson] = useState(PYTHON_LESSONS[0]);
  const [bookmarked, setBookmarked] = useState(new Set());
  const [completed, setCompleted] = useState(new Set());
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  const toggleBookmark = (id) => setBookmarked(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleComplete = (id) => setCompleted(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const goTo = (lesson) => { setActiveLesson(lesson); if (contentRef.current) { contentRef.current.scrollTo({ top: 0, behavior: 'smooth' }); } };

  const idx = PYTHON_LESSONS.findIndex(l => l.id === activeLesson.id);
  const prev = idx > 0 ? PYTHON_LESSONS[idx - 1] : null;
  const next = idx < PYTHON_LESSONS.length - 1 ? PYTHON_LESSONS[idx + 1] : null;

  return (
    <div className="py-tab-content py-lessons-layout">
      {/* Sidebar */}
      <aside className="py-lessons-sidebar">
        <h4>All Lessons</h4>
        {PYTHON_LESSONS.map((lesson) => (
          <div key={lesson.id} className={`py-lesson-nav-item ${lesson.id === activeLesson.id ? 'active' : ''}`} onClick={() => goTo(lesson)}>
            <div className="py-lesson-nav-num">{lesson.id}</div>
            <span className="py-lesson-nav-title">{lesson.title}</span>
            {completed.has(lesson.id) && <Check size={12} style={{ color: '#4ade80', marginLeft: 'auto', flexShrink: 0 }} />}
          </div>
        ))}
      </aside>

      {/* Content */}
      <div className="py-lesson-content" ref={contentRef}>
        <AnimatePresence mode="wait">
          <motion.div key={activeLesson.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
            <div className="py-lesson-card">
              <div className="py-lesson-header">
                <div className="py-lesson-title-group">
                  <div className="py-lesson-num-label">Lesson {activeLesson.id} · <span className={`py-diff-tag diff-${activeLesson.diff}`}>{activeLesson.diff}</span></div>
                  <h1 className="py-lesson-title">{activeLesson.title}</h1>
                </div>
                <div className="py-lesson-actions">
                  <button className={`py-action-btn ${bookmarked.has(activeLesson.id) ? 'active' : ''}`} onClick={() => toggleBookmark(activeLesson.id)}>
                    <Bookmark size={14} />{bookmarked.has(activeLesson.id) ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  <button className={`py-action-btn ${completed.has(activeLesson.id) ? 'complete' : ''}`} onClick={() => toggleComplete(activeLesson.id)}>
                    <CheckCircle size={14} />{completed.has(activeLesson.id) ? 'Completed ✓' : 'Mark Done'}
                  </button>
                </div>
              </div>

              {/* Theory */}
              <div className="py-subsection-title"><BookOpen size={14} /> Theory</div>
              <div className="py-theory-text">{activeLesson.theory.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}</div>

              {/* Syntax & Code */}
              <div className="py-subsection-title" style={{ marginTop: '20px' }}><Code2 size={14} /> Code Example</div>
              <PyCodeBlock code={activeLesson.code} />

              {/* Output */}
              <div className="py-subsection-title"><Terminal size={14} /> Output</div>
              <PyOutputBlock output={activeLesson.output} />

              {/* Note */}
              <div className="py-subsection-title" style={{ marginTop: '20px' }}><Info size={14} /> Note</div>
              <div className="py-note-box"><strong>📘 Note</strong>{activeLesson.note}</div>

              {/* Warning */}
              <div className="py-warning-box"><strong>⚠️ Common Mistake</strong>{activeLesson.warning}</div>

              {/* Best Practices */}
              <div className="py-subsection-title" style={{ marginTop: '20px' }}><Star size={14} /> Best Practices</div>
              <div className="py-tip-box"><strong>✅ Best Practice</strong>{activeLesson.tip}</div>

              {/* Common Mistakes */}
              <div className="py-subsection-title" style={{ marginTop: '20px' }}><AlertTriangle size={14} /> Common Mistakes to Avoid</div>
              <div className="py-bp-list">
                {activeLesson.mistakes.map((m, i) => <div key={i} className="py-bp-item">{m}</div>)}
              </div>

              {/* Interview Tip */}
              <div className="py-interview-tip" style={{ marginTop: '20px' }}>
                <div className="py-interview-tip-label"><Zap size={13} /> Interview Tip</div>
                <p>{activeLesson.interviewTip}</p>
              </div>

              {/* Summary */}
              <div className="py-subsection-title" style={{ marginTop: '20px' }}><CheckCircle size={14} /> Summary</div>
              <div className="py-note-box" style={{ borderLeftColor: 'var(--primary-purple)', background: 'rgba(139,92,246,0.06)' }}><strong style={{ color: 'var(--accent-glow)' }}>📌 Summary</strong>{activeLesson.summary}</div>

              {/* Navigation */}
              <div className="py-lesson-nav-footer">
                {prev ? (
                  <button className="py-nav-btn" onClick={() => goTo(prev)}>
                    <span className="py-nav-btn-label"><ChevronLeft size={13} /> Previous</span>
                    <span className="py-nav-btn-title">{prev.title}</span>
                  </button>
                ) : <div />}
                {next ? (
                  <button className="py-nav-btn next" onClick={() => goTo(next)}>
                    <span className="py-nav-btn-label">Next <ChevronRight size={13} /></span>
                    <span className="py-nav-btn-title">{next.title}</span>
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
const ProgramsTab = () => {
  const categories = Object.keys(PYTHON_PROGRAMS);
  const [activeCategory, setActiveCategory] = useState('Basic');
  const [expandedId, setExpandedId] = useState(null);
  const [copied, setCopied] = useState(null);

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className="py-tab-content py-programs-layout">
      {/* Category sidebar */}
      <aside className="py-programs-sidebar">
        <div className="py-subsection-title" style={{ marginBottom: '14px' }}>Categories</div>
        <div className="py-prog-cat-list">
          {categories.map(cat => (
            <button key={cat} className={`py-prog-cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
              {cat}
              <span className="py-prog-cat-count">{PYTHON_PROGRAMS[cat].length}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Programs list */}
      <div className="py-programs-grid">
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {PYTHON_PROGRAMS[activeCategory].map((prog) => (
              <div key={prog.id} className="py-program-card">
                <div className="py-program-card-header" onClick={() => setExpandedId(expandedId === prog.id ? null : prog.id)}>
                  <div style={{ flex: 1 }}>
                    <div className="py-program-title">{prog.title}</div>
                    <div className="py-program-statement">{prog.statement}</div>
                  </div>
                  <div className="py-program-meta">
                    <span className={`py-complexity-badge ${prog.complexity === 'O(1)' ? 'complexity-o1' : prog.complexity === 'O(n)' || prog.complexity === 'O(log n)' || prog.complexity === 'O(√n)' ? 'complexity-on' : 'complexity-on2'}`}>{prog.complexity}</span>
                    {expandedId === prog.id ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-secondary)" />}
                  </div>
                </div>
                <AnimatePresence>
                  {expandedId === prog.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <div className="py-program-body">
                        <div className="py-program-label">Code</div>
                        <PyCodeBlock code={prog.code} />
                        <div className="py-program-label">Output</div>
                        <PyOutputBlock output={prog.output} />
                        <div className="py-program-label">Explanation</div>
                        <p className="py-program-explanation">{prog.explanation}</p>
                      </div>
                      <div className="py-program-footer">
                        <button className="py-prog-action-btn primary" onClick={() => handleCopy(prog.id, prog.code)}>
                          {copied === prog.id ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Code</>}
                        </button>
                        <button className="py-prog-action-btn"><Download size={13} /> Download</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
const PRACTICE_PROBLEMS = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Map'], desc: 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.', examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' }, { input: 'nums = [3,2,4], target = 6', output: '[1, 2]' }], constraints: ['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', 'Only one valid answer exists'], hint: 'Use a hash map to store (number → index). For each element, check if target - element is already in the map.' },
  { id: 2, title: 'Reverse a String', difficulty: 'Easy', tags: ['String', 'Two Pointer'], desc: 'Write a function that reverses a string. The input is given as an array of characters s. Modify it in-place with O(1) extra memory.', examples: [{ input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }, { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }], constraints: ['1 ≤ s.length ≤ 10⁵', 's[i] is a printable ASCII character'], hint: 'Use two pointers: one at the start and one at the end. Swap and move them toward the middle.' },
  { id: 3, title: 'FizzBuzz', difficulty: 'Easy', tags: ['Math', 'String'], desc: 'Given an integer n, return a string array where: "FizzBuzz" if divisible by 3 and 5, "Fizz" if by 3, "Buzz" if by 5, else the number as string.', examples: [{ input: 'n = 15', output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' }], constraints: ['1 ≤ n ≤ 10⁴'], hint: 'Check divisibility by 15 first, then 3, then 5, then default to str(i).' },
];

const STARTER_CODE = {
  1: `def two_sum(nums, target):\n    # Write your solution here\n    pass\n\n# Test\nprint(two_sum([2, 7, 11, 15], 9))  # [0, 1]`,
  2: `def reverse_string(s):\n    # Write your solution here\n    pass\n\n# Test\ns = ["h","e","l","l","o"]\nreverse_string(s)\nprint(s)`,
  3: `def fizz_buzz(n):\n    # Write your solution here\n    pass\n\n# Test\nprint(fizz_buzz(15))`,
};

const CodingPracticeTab = () => {
  const [activeProblem, setActiveProblem] = useState(PRACTICE_PROBLEMS[0]);
  const [code, setCode] = useState(STARTER_CODE[1]);
  const [consoleTab, setConsoleTab] = useState('output');
  const [showHint, setShowHint] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('14');
  const [lineNumbers, setLineNumbers] = useState(true);

  const handleProblemChange = (prob) => {
    setActiveProblem(prob);
    setCode(STARTER_CODE[prob.id]);
    setShowHint(false);
  };

  return (
    <div className="py-tab-content">
      {/* Problem selector strip */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        {PRACTICE_PROBLEMS.map(p => (
          <button key={p.id} onClick={() => handleProblemChange(p)} style={{ padding: '8px 16px', borderRadius: '9px', border: `1px solid ${activeProblem.id === p.id ? 'var(--primary-purple)' : 'var(--border-primary)'}`, background: activeProblem.id === p.id ? 'rgba(139,92,246,0.15)' : 'var(--card-bg)', color: activeProblem.id === p.id ? 'var(--accent-glow)' : 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
            {p.id}. {p.title}
            <span style={{ marginLeft: '8px', padding: '1px 7px', borderRadius: '100px', fontSize: '0.68rem', background: p.difficulty === 'Easy' ? 'rgba(34,197,94,0.15)' : p.difficulty === 'Medium' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)', color: p.difficulty === 'Easy' ? '#4ade80' : p.difficulty === 'Medium' ? '#facc15' : '#f87171' }}>{p.difficulty}</span>
          </button>
        ))}
      </div>

      <div className="py-practice-layout">
        {/* LEFT: Problem */}
        <div className="py-practice-panel">
          <div className="py-panel-header">
            <span className="py-panel-title"><FileText size={14} /> Problem</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {activeProblem.tags.map(t => <span key={t} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '100px', background: 'rgba(139,92,246,0.12)', color: 'var(--accent-glow)', border: '1px solid rgba(139,92,246,0.2)' }}>{t}</span>)}
            </div>
          </div>
          <div className="py-panel-body">
            <div className="py-problem-title">{activeProblem.id}. {activeProblem.title}</div>
            <p className="py-problem-desc">{activeProblem.desc}</p>
            {activeProblem.examples.map((ex, i) => (
              <div key={i} className="py-problem-example">
                <div className="py-problem-example-label">Example {i + 1}</div>
                <pre>{`Input: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? `\nExplanation: ${ex.explanation}` : ''}`}</pre>
              </div>
            ))}
            <div className="py-subsection-title" style={{ marginTop: '14px' }}><Info size={13} /> Constraints</div>
            <ul className="py-constraints-list">
              {activeProblem.constraints.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <div className="py-hint-accordion">
              <button className="py-hint-btn" onClick={() => setShowHint(!showHint)}>
                <Lightbulb size={14} /> {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              {showHint && <div className="py-hint-text">{activeProblem.hint}</div>}
            </div>
          </div>
        </div>

        {/* CENTER: Editor */}
        <div className="py-practice-panel" style={{ background: '#080814' }}>
          <div className="py-panel-header" style={{ background: '#0d0d1a', borderColor: 'rgba(139,92,246,0.15)' }}>
            <span className="py-panel-title" style={{ color: '#e8e8f0' }}><Code2 size={14} /> Editor</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select className="py-editor-select" value={theme} onChange={e => setTheme(e.target.value)}>
                <option value="dark">Dark Theme</option>
                <option value="monokai">Monokai</option>
                <option value="dracula">Dracula</option>
              </select>
              <select className="py-editor-select">
                <option>Python 3.11</option>
                <option>Python 3.10</option>
              </select>
              <select className="py-editor-select" value={fontSize} onChange={e => setFontSize(e.target.value)}>
                {['12','13','14','16','18'].map(s => <option key={s} value={s}>{s}px</option>)}
              </select>
            </div>
          </div>
          <div className="py-editor-toolbar">
            <label className="py-editor-toggle">
              <input type="checkbox" checked={lineNumbers} onChange={() => setLineNumbers(!lineNumbers)} style={{ marginRight: '4px' }} />
              Line Numbers
            </label>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', marginLeft: 'auto' }}>Auto Save: ON</span>
          </div>
          <textarea
            className="py-editor-area"
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            style={{ fontSize: `${fontSize}px`, flex: 1, minHeight: '320px' }}
          />
          <div className="py-editor-footer">
            <button className="py-btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 14px' }} onClick={() => setCode(STARTER_CODE[activeProblem.id])}>
              <RotateCcw size={13} /> Reset
            </button>
            <button className="py-btn-primary" style={{ fontSize: '0.8rem', padding: '8px 20px' }}>
              <Play size={13} /> Run Code
            </button>
          </div>
        </div>

        {/* RIGHT: Console */}
        <div className="py-practice-panel">
          <div className="py-console-tabs">
            {['output', 'testcases', 'runtime'].map(t => (
              <button key={t} className={`py-console-tab ${consoleTab === t ? 'active' : ''}`} onClick={() => setConsoleTab(t)}>
                {t === 'output' ? 'Output' : t === 'testcases' ? 'Test Cases' : 'Runtime'}
              </button>
            ))}
          </div>
          <div className="py-console-body">
            {consoleTab === 'output' && (
              <div className="py-console-placeholder">
                <Terminal size={28} />
                <p style={{ textAlign: 'center' }}>Run your code to see output here.</p>
              </div>
            )}
            {consoleTab === 'testcases' && (
              <div className="py-test-case-grid">
                {activeProblem.examples.map((ex, i) => (
                  <div key={i} className="py-test-case">
                    <div className="py-test-case-label">Test Case {i + 1}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Input: {ex.input}</div>
                    <div style={{ fontSize: '0.8rem', color: '#4ade80', marginTop: '4px' }}>Expected: {ex.output}</div>
                  </div>
                ))}
              </div>
            )}
            {consoleTab === 'runtime' && (
              <div className="py-runtime-grid">
                {[{ label: 'Runtime', val: '-- ms' }, { label: 'Memory', val: '-- MB' }, { label: 'Status', val: 'Pending' }, { label: 'Tests', val: '0/0' }].map((s, i) => (
                  <div key={i} className="py-runtime-stat">
                    <strong>{s.val}</strong>
                    <span>{s.label}</span>
                  </div>
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

  const questions = QUIZ_DATA[level];

  useEffect(() => {
    if (quizStarted && !revealed && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); handleReveal(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [quizStarted, current, revealed, finished]);

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
    setCurrent(c => c + 1);
    setSelected(null);
    setRevealed(false);
    setTimeLeft(30);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setTimeLeft(30);
    clearInterval(timerRef.current);
  };

  const pct = Math.round((score / questions.length) * 100);

  if (!quizStarted) {
    return (
      <div className="py-tab-content">
        <div className="py-quiz-level-selector">
          {[{ key: 'beginner', label: 'Beginner', icon: '🟢', count: QUIZ_DATA.beginner.length }, { key: 'intermediate', label: 'Intermediate', icon: '🟡', count: QUIZ_DATA.intermediate.length }, { key: 'advanced', label: 'Advanced', icon: '🔴', count: QUIZ_DATA.advanced.length }].map(l => (
            <div key={l.key} className={`py-quiz-level-btn ${level === l.key ? 'active' : ''}`} onClick={() => setLevel(l.key)}>
              <div className="py-quiz-level-icon">{l.icon}</div>
              <div className="py-quiz-level-name">{l.label}</div>
              <div className="py-quiz-level-count">{l.count} Questions</div>
            </div>
          ))}
        </div>
        <div className="py-quiz-container">
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🧠</div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '8px' }}>Python {level.charAt(0).toUpperCase() + level.slice(1)} Quiz</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{questions.length} questions · 30 seconds per question · Instant explanations</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              {[['Questions', questions.length], ['Time/Q', '30s'], ['Explanation', 'Yes'], ['Scoring', '+1 correct']].map(([k, v]) => (
                <div key={k} style={{ textAlign: 'center', padding: '12px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid var(--border-primary)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-glow)' }}>{v}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{k}</div>
                </div>
              ))}
            </div>
            <button className="py-btn-primary" onClick={() => setQuizStarted(true)} style={{ padding: '13px 36px', fontSize: '1rem' }}>
              <Play size={18} /> Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="py-tab-content">
        <div className="py-quiz-container">
          <div className="py-quiz-score-screen">
            <div className="py-score-circle" style={{ '--score-pct': `${pct * 3.6}deg` }}>
              <div className="py-score-inner">
                <span className="py-score-pct">{pct}%</span>
                <span className="py-score-label">Score</span>
              </div>
            </div>
            <h2 className="py-score-title">{pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Good Job!' : '📚 Keep Practicing!'}</h2>
            <p className="py-score-subtitle">{pct >= 80 ? 'Outstanding performance! You have a strong grasp of Python.' : pct >= 60 ? 'Good work! Review the explanations for the questions you missed.' : 'Review the lessons and try again. Practice makes perfect!'}</p>
            <div className="py-score-breakdown">
              <div className="py-score-stat"><strong style={{ color: '#4ade80' }}>{score}</strong><span>Correct</span></div>
              <div className="py-score-stat"><strong style={{ color: '#f87171' }}>{questions.length - score}</strong><span>Wrong</span></div>
              <div className="py-score-stat"><strong>{questions.length}</strong><span>Total</span></div>
            </div>
            {/* Answer review */}
            <div style={{ textAlign: 'left', marginBottom: '24px' }}>
              {answers.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 14px', borderRadius: '10px', background: a.correct ? 'rgba(34,197,94,0.07)' : 'rgba(239,68,68,0.07)', border: `1px solid ${a.correct ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`, marginBottom: '8px' }}>
                  <span style={{ flexShrink: 0, marginTop: '1px' }}>{a.correct ? '✅' : '❌'}</span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Q{i + 1}: {a.q}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="py-btn-primary" onClick={resetQuiz}><RotateCcw size={15} /> Retry Quiz</button>
              <button className="py-btn-secondary" onClick={() => { setLevel(level === 'beginner' ? 'intermediate' : level === 'intermediate' ? 'advanced' : 'beginner'); resetQuiz(); }}>
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
    <div className="py-tab-content">
      <div className="py-quiz-container">
        <div className="py-quiz-top-bar">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{current + 1} / {questions.length}</span>
          <div className="py-quiz-progress-track">
            <div className="py-quiz-progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>
          <div className={`py-quiz-timer ${timeLeft <= 10 ? 'warning' : ''}`}><Clock size={13} />{timeLeft}s</div>
        </div>
        <div className="py-quiz-body">
          <div className="py-quiz-q-num">Question {current + 1}</div>
          <div className="py-quiz-question">{q.q}</div>
          <div className="py-quiz-options">
            {q.options.map((opt, idx) => {
              let cls = '';
              if (revealed) { if (idx === q.answer) cls = 'correct'; else if (idx === selected) cls = 'incorrect'; }
              else if (idx === selected) cls = 'selected';
              return (
                <button key={idx} className={`py-quiz-option ${cls}`} onClick={() => handleSelect(idx)}>
                  <span className="py-quiz-option-letter">{optionLetters[idx]}</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {revealed && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="py-quiz-explanation">
              <strong>Explanation: </strong>{q.explanation}
            </motion.div>
          )}
          <div className="py-quiz-footer">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Score: <strong style={{ color: 'var(--accent-glow)' }}>{score}</strong></div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {!revealed && <button className="py-btn-secondary" style={{ fontSize: '0.85rem', padding: '9px 18px' }} onClick={handleReveal} disabled={selected === null}>Submit</button>}
              {revealed && <button className="py-btn-primary" style={{ fontSize: '0.85rem', padding: '9px 18px' }} onClick={handleNext}>{current + 1 >= questions.length ? 'See Results' : 'Next'} <ChevronRight size={14} /></button>}
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
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.diff === filter);

  return (
    <div className="py-tab-content">
      <div className="py-projects-filter">
        {filters.map(f => (
          <button key={f} className={`py-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="py-projects-grid">
        {filtered.map((proj, i) => (
          <motion.div key={i} className="py-project-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="py-project-thumb" style={{ background: `linear-gradient(135deg, rgba(139,92,246,0.15), rgba(55,118,171,0.1))` }}>
              <span style={{ fontSize: '3.5rem' }}>{proj.emoji}</span>
            </div>
            <div className="py-project-body">
              <div className="py-project-tags">
                {proj.tags.map(t => <span key={t} className="py-project-tag">{t}</span>)}
              </div>
              <div className="py-project-title">{proj.title}</div>
              <p className="py-project-desc">{proj.desc}</p>
              <div className="py-project-meta">
                <span className={`py-diff-tag diff-${proj.diff.toLowerCase()}`}>{proj.diff}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} />{proj.time}</span>
              </div>
            </div>
            <div className="py-project-features">
              <h5>Key Features</h5>
              <ul>{proj.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
            </div>
            <div style={{ padding: '0 18px 18px', display: 'flex', gap: '8px' }}>
              <button className="py-btn-primary" style={{ flex: 1, fontSize: '0.82rem', padding: '9px', justifyContent: 'center' }}><Play size={13} /> Start Project</button>
              <button className="py-btn-secondary" style={{ fontSize: '0.82rem', padding: '9px 14px' }}><Download size={13} /></button>
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
  const categories = Object.keys(INTERVIEW_QUESTIONS);
  const [activeCategory, setActiveCategory] = useState('Basic');
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [bookmarked, setBookmarked] = useState(new Set());

  const toggleBookmark = (key) => setBookmarked(prev => { const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s; });

  return (
    <div className="py-tab-content py-iq-layout">
      <aside className="py-iq-sidebar">
        <div className="py-subsection-title" style={{ marginBottom: '14px' }}>Sections</div>
        {categories.map(cat => (
          <button key={cat} className={`py-iq-cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => { setActiveCategory(cat); setExpandedIdx(null); }}>
            {cat}<span className="py-prog-cat-count">{INTERVIEW_QUESTIONS[cat].length}</span>
          </button>
        ))}
      </aside>
      <div>
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="py-iq-list">
            {INTERVIEW_QUESTIONS[activeCategory].map((item, idx) => {
              const key = `${activeCategory}-${idx}`;
              return (
                <div key={idx} className="py-iq-card">
                  <div className="py-iq-card-header" onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}>
                    <div className="py-iq-question">{item.q}</div>
                    <div className="py-iq-header-meta">
                      {item.freq && <span className="py-iq-freq-badge">🔥 Frequently Asked</span>}
                      <button className={`py-iq-bookmark-btn ${bookmarked.has(key) ? 'active' : ''}`} onClick={e => { e.stopPropagation(); toggleBookmark(key); }}>
                        <Bookmark size={15} fill={bookmarked.has(key) ? 'var(--accent-glow)' : 'none'} />
                      </button>
                      <button className="py-iq-expand-btn">
                        {expandedIdx === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedIdx === idx && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="py-iq-answer">
                        <p className="py-iq-answer-text">{item.a}</p>
                        <div className="py-iq-tip"><strong>💡 Tip: </strong>{item.tip}</div>
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
  <div className="py-tab-content">
    <div className="py-downloads-grid">
      {DOWNLOADS.map((item, i) => (
        <motion.div key={i} className="py-download-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <div className="py-download-icon-row">
            <div className="py-download-icon" style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>{item.icon}</div>
            <div>
              <div className="py-download-title">{item.title}</div>
              <div className="py-download-meta">
                <div className="py-download-meta-item"><FileText size={11} />{item.type}</div>
                <div className="py-download-meta-item"><Database size={11} />{item.size}</div>
                <div className="py-download-meta-item"><Clock size={11} />Updated {item.updated}</div>
              </div>
            </div>
          </div>
          <p className="py-download-desc">{item.desc}</p>
          <button className="py-download-btn"><Download size={15} /> Download {item.type}</button>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ============================================================
   PYTHON LOGO SVG
   ============================================================ */
const RawPythonSVG = () => (
  <svg viewBox="0 0 128 128" style={{ width: '100%', height: '100%' }} aria-label="Python logo">
    <linearGradient id="pyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#387EB8" />
      <stop offset="100%" stopColor="#366994" />
    </linearGradient>
    <linearGradient id="pyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFE052" />
      <stop offset="100%" stopColor="#FFC331" />
    </linearGradient>
    <path fill="url(#pyBlue)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zm-13.354 7.569c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" />
    <path fill="url(#pyYellow)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" />
  </svg>
);

const PythonLogo = () => (
  <TechnologyLogo component={RawPythonSVG} name="Python" />
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
const PythonLearningHub = () => {
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
      case 'overview': return <OverviewTab setActiveTab={setActiveTab} />;
      case 'roadmap': return <RoadmapTab />;
      case 'lessons': return <LessonsTab />;
      case 'programs': return <ProgramsTab />;
      case 'practice': return <CodingPracticeTab />;
      case 'quiz': return <QuizTab />;
      case 'projects': return <ProjectsTab />;
      case 'interview': return <InterviewTab />;
      case 'downloads': return <DownloadsTab />;
      default: return <OverviewTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="py-hub-wrapper">
      {/* Reading progress */}
      <div className="py-reading-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Breadcrumb */}
      <div className="py-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>
          <ArrowLeft size={13} /> Back
        </button>
        <span className="sep" style={{ margin: '0 4px', opacity: 0.3, color: 'var(--text-secondary)' }}>|</span>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}><Home size={13} /> Home</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button onClick={() => navigate('/', { state: { scrollToSection: 'technologies' } })} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>Tech Stack</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button onClick={() => setActiveTab('overview')} style={{ background: 'none', border: 'none', color: activeTab === 'overview' ? 'var(--accent-glow)' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: activeTab === 'overview' ? '600' : '500', padding: '0' }}>Python</button>
        {activeTab !== 'overview' && (
          <>
            <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
            <span className="current" style={{ color: 'var(--accent-glow)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'capitalize' }}>
              {activeTab === 'practice' ? 'Coding Practice' : activeTab === 'interview' ? 'Interview Qs' : activeTab}
            </span>
          </>
        )}
      </div>

      {/* Hero Banner */}
      <div className="py-hero-banner">
        <div className="py-hero-inner">
          <PythonLogo />
          <div className="py-hero-text">
            <span className="py-badge">PYTHON</span>
            <h1 className="py-hero-title">Python Programming</h1>
            <p className="py-hero-subtitle">Beginner to Advanced</p>
            <p className="py-hero-desc">Learn Python from scratch to advanced concepts with hands-on examples, practice programs, projects, quizzes, and interview questions.</p>
            <div className="py-hero-stats">
              {[{ val: '45+', label: 'Lessons' }, { val: '120+', label: 'Programs' }, { val: '15+', label: 'Projects' }, { val: '10+', label: 'Quizzes' }, { val: '100+', label: 'Interview Qs' }].map((s, i) => (
                <div key={i} className="py-stat-pill"><strong>{s.val}</strong> {s.label}</div>
              ))}
            </div>
            <div className="py-hero-actions">
              <button className="py-btn-primary" onClick={() => setActiveTab('lessons')}><Play size={15} /> Start Learning <ChevronRight size={14} /></button>
              <button className="py-btn-secondary" onClick={() => setActiveTab('roadmap')}><Map size={15} /> View Roadmap</button>
            </div>
          </div>

          {/* Progress Card */}
          <div className="py-progress-card">
            <h4><TrendingUp size={15} /> Your Progress</h4>
            <div className="py-overall-progress">
              <div className="py-circle-progress">0%<br /><span style={{ fontSize: '0.55rem' }}>Done</span></div>
              <div className="py-progress-rows" style={{ flex: 1 }}>
                {[['Lessons Completed', '0 / 45'], ['Quizzes Completed', '0 / 10'], ['Programs Solved', '0 / 120'], ['Projects Completed', '0 / 15']].map(([l, v]) => (
                  <div key={l} className="py-progress-row"><span>{l}</span><span>{v}</span></div>
                ))}
              </div>
            </div>
            <button className="py-login-btn"><Lock size={13} /> Login to Save Progress</button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="py-tab-nav">
        <div className="py-tab-nav-inner">
          {TABS.map(tab => (
            <button key={tab.id} className={`py-tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              <span className="py-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="py-content-area">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PythonLearningHub;
