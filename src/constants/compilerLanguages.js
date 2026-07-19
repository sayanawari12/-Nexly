export const COMPILER_LANGUAGES = [
  {
    id: 'c',
    displayName: 'C',
    monacoLanguage: 'c',
    judge0Id: 100, // GCC 14.1.0
    defaultCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
  },
  {
    id: 'cpp',
    displayName: 'C++',
    monacoLanguage: 'cpp',
    judge0Id: 105, // GCC 14.1.0
    defaultCode: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`
  },
  {
    id: 'java',
    displayName: 'Java',
    monacoLanguage: 'java',
    judge0Id: 91, // JDK 17.0.6
    defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
  },
  {
    id: 'python',
    displayName: 'Python',
    monacoLanguage: 'python',
    judge0Id: 92, // Python 3.11.2
    defaultCode: `print("Hello, World!")`
  },
  {
    id: 'javascript',
    displayName: 'JavaScript',
    monacoLanguage: 'javascript',
    judge0Id: 93, // Node.js 18.15.0
    defaultCode: `console.log("Hello, World!");`
  }
];
