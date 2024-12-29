const fs = require('fs');
const path = require('path');

// Helper function to ensure directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Helper function to move a file
const moveFile = (from, to) => {
  if (fs.existsSync(from)) {
    ensureDir(path.dirname(to));
    fs.renameSync(from, to);
    console.log(`Moved ${from} to ${to}`);
  }
};

// Helper function to update imports in a file
const updateImports = (content) => {
  let updated = content;

  // Add React import if needed
  if (!updated.includes('import * as React')) {
    updated = `import * as React from 'react';\n${updated}`;
  }

  // Update paths using string literals to avoid escaping issues
  const replacements = [
    ['@/components/ui/', '@/components/shared/'],
    ['from "../ui/', 'from "../shared/'],
    ['from "../../components/ui/', 'from "../../components/shared/'],
    ['from "../../components/contact/', 'from "../../components/features/contact/'],
    ['from "../contact/', 'from "../features/contact/'],
    ['from "../../components/analytics/', 'from "../../components/features/analytics/'],
    ['from "../analytics/', 'from "../features/analytics/']
  ];

  replacements.forEach(([search, replace]) => {
    updated = updated.split(search).join(replace);
  });

  return updated;
};

// Create directories
console.log('Creating directories...');
[
  'components/shared',
  'components/features/analytics',
  'components/features/contact'
].forEach(ensureDir);

// Move files
console.log('Moving files...');
[
  ['components/ui/button.tsx', 'components/shared/button.tsx'],
  ['components/ui/card.tsx', 'components/shared/card.tsx'],
  ['components/ui/input.tsx', 'components/shared/input.tsx'],
  ['components/ui/table.tsx', 'components/shared/table.tsx'],
  ['components/ui/toast.tsx', 'components/shared/toast.tsx'],
  ['components/ui/toaster.tsx', 'components/shared/toaster.tsx'],
  ['components/ui/use-toast.ts', 'components/shared/use-toast.ts'],
  ['components/analytics/metrics-grid.tsx', 'components/features/analytics/metrics-grid.tsx'],
  ['components/analytics/trend-chart.tsx', 'components/features/analytics/trend-chart.tsx'],
  ['components/analytics/data-table.tsx', 'components/features/analytics/data-table.tsx'],
  ['components/analytics/filters.tsx', 'components/features/analytics/filters.tsx'],
  ['components/contact/contact-form.tsx', 'components/features/contact/contact-form.tsx']
].forEach(([from, to]) => moveFile(from, to));

// Create index files
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
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content);
  console.log(`Created ${file}`);
});

// Update tsconfig.json
console.log('Updating tsconfig.json...');
const tsconfig = {
  compilerOptions: {
    target: "es5",
    lib: ["dom", "dom.iterable", "esnext"],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    module: "esnext",
    moduleResolution: "bundler",
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: "preserve",
    incremental: true,
    plugins: [{ name: "next" }],
    baseUrl: ".",
    paths: { "@/*": ["./*"] },
    forceConsistentCasingInFileNames: true
  },
  include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  exclude: ["node_modules"]
};

fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2));

// Update imports in all TypeScript files
console.log('Updating imports...');
const processFile = (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const updated = updateImports(content);
      if (content !== updated) {
        fs.writeFileSync(filePath, updated);
        console.log(`Updated imports in ${filePath}`);
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  }
};

const walkDir = (dir) => {
  try {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (file !== 'node_modules' && file !== '.next') {
          walkDir(fullPath);
        }
      } else {
        processFile(fullPath);
      }
    });
  } catch (error) {
    console.error(`Error walking directory ${dir}:`, error.message);
  }
};

walkDir('.');

// Clean up
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

// Clean up temporary files
['reorganize.js', 'reorganize-files.js', 'fix-imports.js', 'fix-paths.js', 'fix-project.js', 'final-reorganize.js'].forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Removed ${file}`);
  }
});

console.log('Project reorganization complete!');
