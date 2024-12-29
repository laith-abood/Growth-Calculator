# Style Guide

## Code Organization

### Directory Structure
- Use feature-based organization within the `components` directory
- Keep shared/reusable components in `components/shared`
- Place feature-specific components in `components/features/{feature-name}`
- Store hooks in `lib/hooks`
- Keep utility functions in `lib/utils`

### File Naming
- Use kebab-case for file names: `my-component.tsx`
- Use PascalCase for component names: `MyComponent`
- Use camelCase for utility functions and hooks: `useMyHook`
- Add `.test.tsx` suffix for test files

## TypeScript

### Types and Interfaces
```typescript
// Use interfaces for objects that will be extended
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

// Use type for unions, intersections, and simple objects
type Theme = 'light' | 'dark' | 'system';
type Size = 'sm' | 'md' | 'lg';
```

### Type Exports
```typescript
// Export types from the same file as their component
export interface ButtonProps { ... }
export function Button(props: ButtonProps) { ... }

// Or from a dedicated types file for complex features
export * from './types';
```

## React Components

### Component Structure
```typescript
import * as React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  // Props interface
}

export function Component({ prop1, prop2, className }: ComponentProps) {
  // Component logic

  return (
    // JSX
  );
}
```

### Props
```typescript
// Use destructuring with defaults
function Component({ 
  size = 'default',
  variant = 'primary',
  className,
  children,
}: ComponentProps) {
  // ...
}
```

### Event Handlers
```typescript
// Name handlers with 'handle' prefix
const handleClick = React.useCallback((event: React.MouseEvent) => {
  // Handler logic
}, [/* dependencies */]);

// For prop handlers, use 'on' prefix
interface Props {
  onClick?: (event: React.MouseEvent) => void;
}
```

## Styling

### Tailwind CSS
```typescript
// Use cn utility for class merging
import { cn } from '@/lib/utils';

function Component({ className }: { className?: string }) {
  return (
    <div className={cn(
      "base-styles",
      "conditional-styles",
      className
    )}>
      {/* content */}
    </div>
  );
}
```

### CSS Variables
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

## Hooks

### Custom Hooks
```typescript
// Name with 'use' prefix
export function useCustomHook(param: string) {
  const [state, setState] = React.useState(null);
  
  React.useEffect(() => {
    // Effect logic
  }, [param]);
  
  return { state };
}
```

### Hook Organization
```typescript
// Split complex hook logic into smaller functions
function useComplexHook() {
  const data = useDataFetching();
  const calculations = useCalculations(data);
  const ui = useUIState(calculations);
  
  return { ...data, ...calculations, ...ui };
}
```

## Error Handling

### Error Boundaries
```typescript
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
    </div>
  );
}
```

### Async Error Handling
```typescript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
```

## Testing

### Component Tests
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<Component />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Hook Tests
```typescript
import { renderHook, act } from '@testing-library/react';

describe('useCustomHook', () => {
  it('updates state correctly', () => {
    const { result } = renderHook(() => useCustomHook());
    act(() => {
      result.current.update();
    });
    expect(result.current.state).toBe('updated');
  });
});
```

## Documentation

### Component Documentation
```typescript
/**
 * Button component with various styles and sizes.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">
 *   Click me
 * </Button>
 * ```
 */
export function Button({ variant, size, children }: ButtonProps) {
  // ...
}
```

### Function Documentation
```typescript
/**
 * Calculates the compound annual growth rate (CAGR).
 *
 * @param startValue - Initial value
 * @param endValue - Final value
 * @param years - Number of years
 * @returns The CAGR as a decimal
 *
 * @example
 * const cagr = calculateCAGR(1000, 2000, 5);
 * // Returns 0.1487 (14.87%)
 */
export function calculateCAGR(
  startValue: number,
  endValue: number,
  years: number
): number {
  // ...
}
