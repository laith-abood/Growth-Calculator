import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const addReactImport = (content: string): string => {
  if (!content.includes("import * as React from 'react'")) {
    return `import * as React from 'react';\n${content}`;
  }
  return content;
};

const updateComponentImports = (content: string): string => {
  return content
    .replace(/@\/components\/ui\//g, '@/components/shared/')
    .replace(/from ['"]\.\.\/ui\//g, 'from "../shared/')
    .replace(/from ['"]\.\.\/\.\.\/components\/ui\//g, 'from "../../components/shared/')
    .replace(/from ['"]\.\.\/\.\.\/components\/contact\//g, 'from "../../components/features/contact/')
    .replace(/from ['"]\.\.\/contact\//g, 'from "../features/contact/')
    .replace(/from ['"]\.\.\/\.\.\/components\/analytics\//g, 'from "../../components/features/analytics/')
    .replace(/from ['"]\.\.\/analytics\//g, 'from "../features/analytics/');
};

const getAllFiles = (dir: string): string[] => {
  const files: string[] = [];
  
  const traverse = (currentDir: string) => {
    const entries = readdirSync(currentDir);
    
    entries.forEach(entry => {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!fullPath.includes('node_modules') && !fullPath.includes('.next')) {
          traverse(fullPath);
        }
      } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
        files.push(fullPath);
      }
    });
  };
  
  traverse(dir);
  return files;
};

const processFile = (filePath: string) => {
  try {
    let content = readFileSync(filePath, 'utf8');
    
    // Add React import for .tsx files
    if (filePath.endsWith('.tsx')) {
      content = addReactImport(content);
    }
    
    // Update component imports
    content = updateComponentImports(content);
    
    writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
};

// Process all TypeScript/React files
const files = getAllFiles('.');
files.forEach(processFile);

// Update index files
const componentsIndex = `// Re-export shared components
export * from './shared';

// Re-export feature components
export * from './features';
`;

const sharedIndex = `// Re-export UI components
export * from './button';
export * from './card';
export * from './input';
export * from './table';
export * from './toast';
export * from './toaster';
export * from './use-toast';

// Re-export types
export type { ButtonProps } from './button';
export type { InputProps } from './input';
export type { ToastProps, ToastActionElement } from './toast';
`;

const featuresIndex = `// Re-export feature components
export * from './analytics';
export * from './contact';
`;

writeFileSync('components/index.ts', componentsIndex);
writeFileSync('components/shared/index.ts', sharedIndex);
writeFileSync('components/features/index.ts', featuresIndex);

console.log('Import updates complete!');
