#!/bin/bash

# Function to add React import if missing
add_react_import() {
  local file=$1
  if ! grep -q "^import.*React.*from 'react'" "$file"; then
    sed -i '' '1i\
import * as React from "react";\
' "$file"
  fi
}

# Function to update component imports
update_imports() {
  local file=$1
  
  # Update UI component imports to use shared
  sed -i '' 's|@/components/ui/|@/components/shared/|g' "$file"
  sed -i '' 's|"../ui/|"../shared/|g' "$file"
  sed -i '' 's|"../../components/ui/|"../../components/shared/|g' "$file"
  
  # Update feature component imports
  sed -i '' 's|"../../components/contact/|"../../components/features/contact/|g' "$file"
  sed -i '' 's|"../contact/|"../features/contact/|g' "$file"
  
  # Update analytics component imports
  sed -i '' 's|"../../components/analytics/|"../../components/features/analytics/|g' "$file"
  sed -i '' 's|"../analytics/|"../features/analytics/|g' "$file"
}

# Process all TypeScript/React files
find . -type f \( -name "*.tsx" -o -name "*.ts" \) ! -path "./node_modules/*" ! -path "./.next/*" | while read -r file; do
  if [[ $file == *.tsx ]]; then
    add_react_import "$file"
  fi
  update_imports "$file"
done

# Update index files
echo "// Re-export shared components
export * from './shared';

// Re-export feature components
export * from './features';" > components/index.ts

echo "// Re-export UI components
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
export type { ToastProps, ToastActionElement } from './toast';" > components/shared/index.ts

echo "// Re-export feature components
export * from './analytics';
export * from './contact';" > components/features/index.ts

# Remove jsconfig.json as we're using tsconfig.json
rm -f jsconfig.json

echo "Import fixes complete!"
