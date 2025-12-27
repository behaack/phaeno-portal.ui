import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import ErrorBoundary from './_ErrorBoundry';

interface AnalyticsErrorBoundaryProps {
  error: any;
  reset: () => void;
}

export function AnalyticsErrorBoundary({ error, reset }: AnalyticsErrorBoundaryProps) {
  const router = useRouter();
  const { location } = router.state;

  // This is the key: detect ONLY search validation errors
  const isValidationError = error?.routerCode === 'VALIDATE_SEARCH';

  // Dev mode detection
  const isDev = import.meta.env.DEV;

  // Auto-fix invalid search params (silent redirect)
  useEffect(() => {
    if (isValidationError) {
      const url = new URL(location.href);
      url.search = ''; // strip all search params
      router.navigate({
        to: url.pathname + url.search + url.hash,
        replace: true,
      });
      // Optional: small delay to ensure navigation completes before reset
      setTimeout(reset, 0);
    }
  }, [isValidationError, location.href, router, reset]);

  // Don't flash UI during silent fix
  if (isValidationError) {
    return null;
  }

  // All other errors (real crashes) → show proper UI
  return (
    <ErrorBoundary
      page="Analytics"
      title="Something went wrong"
      errorMessage={
        isDev
          ? error?.message || 'An error occurred'
          : 'An unexpected error occurred. Please try again later.'
      }
      navigation={{ to: '/analytics/' }}
      buttonLabel="Return to Analytics"
      // Add a second action: retry
      onRetry={() => {
        reset();             // clears the error boundary
        router.invalidate(); // re-runs all loaders on this route (very powerful!)
      }}
    >
      {isDev && error && (
        <details className="mt-6 p-4 bg-red-50 border border-red-300 rounded-md text-red-800 font-mono text-xs">
          <summary className="cursor-pointer font-bold mb-2">Error Details (Dev Only)</summary>
          <pre className="overflow-x-auto whitespace-pre-wrap break-all">
            {error.stack || String(error)}
          </pre>
        </details>
      )}
    </ErrorBoundary>
  );
}