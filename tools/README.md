# Project APEX - Developer Metrics Tool

This tool is a developer-only utility to measure codebase size, structure, architectural distribution, code health, and engineering quality scores for Project APEX.

## Setup
No external dependencies are required. The script runs directly using the built-in Node.js runtime.

## How to Run
From the root directory of the repository, execute:

```bash
node tools/project-metrics.js
```

## Metrics Outputted
1. **Core Metrics**: Files counted, LOC sum, average LOC per file, extension distributions.
2. **Architecture Layers**: File distribution inside repositories, services, contexts, hooks, components, layout directories.
3. **Code Health**: Large files (>500 or >1000 lines), empty files, largest/smallest files.
4. **Engineering Health Score**: Aggregates folders organization, documentation, modular architecture, and file sizes warnings.
