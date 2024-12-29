#!/bin/bash

# Remove unused UI components
rm -f components/ui/skeleton.tsx components/ui/card-new.tsx

# Remove redundant error and loading states
find app -name "error.tsx" ! -path "app/components/*" -delete
find app -name "loading.tsx" ! -path "app/components/*" -delete

# Remove empty directories
find . -type d -empty -delete

# Remove duplicate files
rm -f components/contact/contact-form.tsx
rm -f components/ui/index.ts
rm -f styles/globals.css

# Clean up old analytics directory
rm -rf components/analytics

# Remove old UI directory if empty
rm -rf components/ui

echo "Cleanup complete!"
