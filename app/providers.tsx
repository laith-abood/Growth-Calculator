import * as React from "react";
'use client';

import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "../components/ui/toaster";

interface ProvidersProps {
  children: React.ReactNode;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
        <h2 className="text-lg font-semibold text-destructive">
          Something went wrong!
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {error.message}
        </p>
      </div>
    </div>
  );
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
