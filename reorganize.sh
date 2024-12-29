#!/bin/bash

# Create new directory structure
mkdir -p app/components/{shared,layout}
mkdir -p components/{shared,features}

# Move UI components to components/shared
for file in components/ui/*; do
  if [ -f "$file" ]; then
    mv "$file" components/shared/
  fi
done

# Move analytics components to components/features/analytics
if [ -d "components/analytics" ]; then
  mkdir -p components/features/analytics
  mv components/analytics/* components/features/analytics/
fi

# Move contact form to components/features/contact
if [ -d "components/contact" ]; then
  mkdir -p components/features/contact
  mv components/contact/contact-form.tsx components/features/contact/
fi

# Remove empty directories
rm -rf components/ui components/analytics components/contact

# Remove redundant error and loading states
find app -name "error.tsx" ! -path "app/components/*" -delete
find app -name "loading.tsx" ! -path "app/components/*" -delete

# Create index files for better imports
cat > components/index.ts << EOL
export * from './shared';
export * from './features';
EOL

cat > components/shared/index.ts << EOL
export * from './button';
export * from './card';
export * from './input';
export * from './table';
export * from './toast';
export * from './toaster';
export * from './use-toast';
EOL

cat > components/features/index.ts << EOL
export * from './analytics';
export * from './contact';
EOL

# Update imports in files to use new paths
find . -type f -name "*.tsx" -o -name "*.ts" | while read -r file; do
  if [ -f "$file" ]; then
    sed -i '' 's|@/components/ui/|@/components/shared/|g' "$file"
    sed -i '' 's|"../ui/|"../shared/|g' "$file"
    sed -i '' 's|"../../components/ui/|"../../components/shared/|g' "$file"
  fi
done

echo "Directory restructuring complete!"
