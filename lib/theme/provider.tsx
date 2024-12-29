import * as React from "react";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ThemeError({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="rounded-lg bg-red-500/10 p-6 text-center">
        <h2 className="mb-2 text-lg font-semibold text-red-400">Theme Error</h2>
        <p className="text-sm text-gray-300">{error.message}</p>
      </div>
    </div>
  );
}

function ThemeLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  );
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ThemeLoading />;
  }

  return (
    <ErrorBoundary FallbackComponent={ThemeError}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        {...props}
      >
        {children}
      </NextThemesProvider>
    </ErrorBoundary>
  );
}

// Re-export theme hooks and utilities
export { useTheme } from 'next-themes';
export * from './tokens';
