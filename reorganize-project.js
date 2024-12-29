const fs = require('fs');
const path = require('path');

// Step 1: Create necessary directories
console.log('Creating directories...');
[
  'components/shared',
  'components/features/analytics',
  'components/features/contact'
].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Step 2: Move files to new locations
console.log('Moving files...');
const moves = [
  // UI components to shared
  ['components/ui/button.tsx', 'components/shared/button.tsx'],
  ['components/ui/card.tsx', 'components/shared/card.tsx'],
  ['components/ui/input.tsx', 'components/shared/input.tsx'],
  ['components/ui/table.tsx', 'components/shared/table.tsx'],
  ['components/ui/toast.tsx', 'components/shared/toast.tsx'],
  ['components/ui/toaster.tsx', 'components/shared/toaster.tsx'],
  ['components/ui/use-toast.ts', 'components/shared/use-toast.ts'],
  
  // Analytics components
  ['components/analytics/metrics-grid.tsx', 'components/features/analytics/metrics-grid.tsx'],
  ['components/analytics/trend-chart.tsx', 'components/features/analytics/trend-chart.tsx'],
  ['components/analytics/data-table.tsx', 'components/features/analytics/data-table.tsx'],
  ['components/analytics/filters.tsx', 'components/features/analytics/filters.tsx'],
  
  // Contact components
  ['components/contact/contact-form.tsx', 'components/features/contact/contact-form.tsx']
];

moves.forEach(([from, to]) => {
  if (fs.existsSync(from)) {
    fs.renameSync(from, to);
    console.log(`Moved ${from} to ${to}`);
  }
});

// Step 3: Create index files
console.log('Creating index files...');
const indexFiles = {
  'components/index.ts': `export * from './shared';
export * from './features';
`,
  'components/shared/index.ts': `export * from './button';
export * from './card';
export * from './input';
export * from './table';
export * from './toast';
export * from './toaster';
export * from './use-toast';

export type { ButtonProps } from './button';
export type { InputProps } from './input';
export type { ToastProps, ToastActionElement } from './toast';
`,
  'components/features/index.ts': `export * from './analytics';
export * from './contact';
`,
  'components/features/analytics/index.ts': `export * from './metrics-grid';
export * from './trend-chart';
export * from './data-table';
export * from './filters';
`,
  'components/features/contact/index.ts': `export { ContactForm } from './contact-form';
`
};

Object.entries(indexFiles).forEach(([file, content]) => {
  fs.writeFileSync(file, content);
  console.log(`Created ${file}`);
});

// Step 4: Update tsconfig.json
console.log('Updating tsconfig.json...');
const tsconfig = {
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "forceConsistentCasingInFileNames": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
};

fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2));

// Step 5: Update import paths in all TypeScript files
console.log('Updating import paths...');
const updateImports = (content) => {
  // Add React import if needed
  if (!content.includes('import * as React')) {
    content = `import * as React from 'react';\n${content}`;
  }

  // Update paths
  return content
    .replace(/@\/components\/ui\//g, '@/components/shared/')
    .replace(/from ['"]\.\.\/ui\//g, 'from "../shared/')
    .replace(/from ['"]\.\.\/\.\.\/components\/ui\//g, 'from "../../components/shared/')
    .replace(/from ['"]\.\.\/\.\.\/components\/contact\//g, 'from "../../components/features/contact/')
    .replace(/from ['"]\.\.\/contact\//g, 'from "../features/contact/')
    .replace(/from ['"]\.\.\/\.\.\/components\/analytics\//g, 'from "../../components/features/analytics/')
    .replace(/from ['"]\.\.\/analytics\//g, 'from "../features/analytics/');
};

const processFile = (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = updateImports(content);
    if (content !== updated) {
      fs.writeFileSync(filePath, updated);
      console.log(`Updated imports in ${filePath}`);
    }
  }
};

const walkDir = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        walkDir(fullPath);
      }
    } else {
      processFile(fullPath);
    }
  });
};

walkDir('.');

// Step 6: Clean up
console.log('Cleaning up...');
['components/ui', 'components/analytics', 'components/contact'].forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Removed ${dir}`);
  }
});

if (fs.existsSync('jsconfig.json')) {
  fs.unlinkSync('jsconfig.json');
  console.log('Removed jsconfig.json');
}

console.log('Project reorganization complete!');
