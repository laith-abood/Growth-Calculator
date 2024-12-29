const fs = require('fs');
const path = require('path');

const updateImports = (content) => {
  // Add React import if it's a TSX file and doesn't already have React imported
  if (!content.includes("import * as React from 'react'") && 
      !content.includes('import * as React from "react"')) {
    content = `import * as React from 'react';\n${content}`;
  }

  // Update import paths
  const replacements = [
    [/@\/components\/ui\//g, '@/components/shared/'],
    [/from ['"]\.\.\/ui\//g, 'from "../shared/'],
    [/from ['"]\.\.\/\.\.\/components\/ui\//g, 'from "../../components/shared/'],
    [/from ['"]\.\.\/\.\.\/components\/contact\//g, 'from "../../components/features/contact/'],
    [/from ['"]\.\.\/contact\//g, 'from "../features/contact/'],
    [/from ['"]\.\.\/\.\.\/components\/analytics\//g, 'from "../../components/features/analytics/'],
    [/from ['"]\.\.\/analytics\//g, 'from "../features/analytics/']
  ];

  return replacements.reduce((acc, [pattern, replacement]) => 
    acc.replace(pattern, replacement), content);
};

const processFile = (filePath) => {
  try {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      console.log(`Processing ${filePath}...`);
      const content = fs.readFileSync(filePath, 'utf8');
      const updatedContent = updateImports(content);
      
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Updated imports in ${filePath}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
};

const walkDir = (dir) => {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and .next directories
        if (file !== 'node_modules' && file !== '.next') {
          walkDir(filePath);
        }
      } else {
        processFile(filePath);
      }
    });
  } catch (error) {
    console.error(`Error walking directory ${dir}:`, error.message);
  }
};

// Update tsconfig.json
const updateTsConfig = () => {
  const tsConfigPath = 'tsconfig.json';
  try {
    if (fs.existsSync(tsConfigPath)) {
      const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
      
      tsConfig.compilerOptions = {
        ...tsConfig.compilerOptions,
        forceConsistentCasingInFileNames: true,
        baseUrl: ".",
        paths: {
          "@/*": ["./*"]
        }
      };
      
      fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
      console.log('Updated tsconfig.json');
    }
  } catch (error) {
    console.error('Error updating tsconfig.json:', error.message);
  }
};

// Remove jsconfig.json if it exists
try {
  if (fs.existsSync('jsconfig.json')) {
    fs.unlinkSync('jsconfig.json');
    console.log('Removed jsconfig.json');
  }
} catch (error) {
  console.error('Error removing jsconfig.json:', error.message);
}

console.log('Starting path updates...');
walkDir('.');
updateTsConfig();
console.log('Path updates complete!');
