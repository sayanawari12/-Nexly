import { Code2 } from 'lucide-react';

export const QUICK_TOOLS = [
  {
    id: 'coding-workspace',
    name: 'Coding Workspace',
    description: 'Launch multi-language compiler sandbox to write and test code.',
    icon: Code2,
    path: '/compiler',
    enabled: true,
    requiresAuth: true,
    featureFlag: 'compiler'
  }
];
