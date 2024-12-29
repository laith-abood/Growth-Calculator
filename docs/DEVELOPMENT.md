# Development Guide

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- Git
- Firebase CLI (`npm install -g firebase-tools`)

### Initial Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/growth-calculator.git
cd growth-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Set up Firebase:
```bash
firebase login
firebase init
```

5. Start the development server:
```bash
npm run dev
```

## Development Workflow

### Branch Strategy

- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches
- `release/*` - Release branches

### Commit Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

Example:
```
feat(analytics): add metrics grid component

- Implements basic grid layout
- Adds responsive design
- Integrates with data hooks

Closes #123
```

### Code Quality

#### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

#### Linting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Check types
npm run type-check
```

#### Formatting

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

### Building

```bash
# Create production build
npm run build

# Preview production build
npm run start
```

## Project Structure

```
.
├── app/                    # Next.js 13 App Router
│   ├── analytics/         # Analytics feature
│   ├── clients/           # Client management
│   ├── dashboard/         # Main dashboard
│   ├── projections/       # Growth projections
│   ├── settings/          # User settings
│   └── valuation/         # Valuation tools
├── components/
│   ├── shared/           # Reusable components
│   └── features/         # Feature components
├── lib/
│   ├── firebase/         # Firebase config
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utilities
│   └── types/            # TypeScript types
├── public/               # Static assets
└── docs/                 # Documentation
```

## Common Tasks

### Adding a New Feature

1. Create a new feature branch:
```bash
git checkout -b feature/my-feature
```

2. Create necessary components:
```bash
# Feature-specific components
mkdir -p components/features/my-feature
touch components/features/my-feature/index.ts

# Shared components (if needed)
touch components/shared/my-component.tsx
```

3. Update documentation:
- Add component documentation
- Update API documentation if needed
- Update README if needed

4. Add tests:
```bash
touch __tests__/components/features/my-feature/my-component.test.tsx
```

### Updating Dependencies

1. Check for outdated packages:
```bash
npm outdated
```

2. Update packages:
```bash
# Update all packages
npm update

# Update specific package
npm update @package/name
```

3. Run tests and check for breaking changes:
```bash
npm test
npm run build
```

### Database Migrations

1. Create a new migration:
```bash
touch migrations/YYYYMMDD_description.ts
```

2. Run migrations:
```bash
npm run migrate
```

### Adding Environment Variables

1. Add to `.env.example`:
```bash
MY_NEW_VAR=example_value
```

2. Add to `.env.local`:
```bash
MY_NEW_VAR=actual_value
```

3. Add type definitions:
```typescript
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    MY_NEW_VAR: string;
  }
}
```

## Deployment

### Development

```bash
# Deploy to development
npm run deploy:dev
```

### Staging

```bash
# Deploy to staging
npm run deploy:staging
```

### Production

```bash
# Deploy to production
npm run deploy:prod
```

## Troubleshooting

### Common Issues

1. **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install
```

2. **Firebase Issues**
```bash
# Reset Firebase cache
firebase logout
firebase login
```

3. **Type Errors**
```bash
# Clear TypeScript cache
rm -rf tsconfig.tsbuildinfo
npm run type-check
```

### Debug Tools

- React Developer Tools
- Firebase Console
- Next.js Debug Mode:
```bash
NODE_OPTIONS='--inspect' npm run dev
```

## Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# Generate bundle report
npm run analyze:report
```

### Performance Testing

```bash
# Run Lighthouse CI
npm run lighthouse

# Run performance tests
npm run test:perf
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
