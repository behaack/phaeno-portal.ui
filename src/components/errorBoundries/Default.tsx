import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import ErrorBoundary from './_ErrorBoundry'; // ← your shared component

export function DefaultErrorBoundary({ 
  error, 
  reset 
}: { 
  error: any; 
  reset: () => void; 
}) {
  const router = useRouter();
  const { location } = router.state;

  const isDev = import.meta.env.DEV;
  const isValidationError = error?.routerCode === 'VALIDATE_SEARCH';

  // Silently fix invalid search params (same excellent logic you already had)
  useEffect(() => {
    if (isValidationError) {
      const url = new URL(location.href);
      url.search = ''; // strip everything
      router.navigate({
        to: url.pathname + url.search + url.hash,
        replace: true,
      });
      // Reset after navigation so the route re-renders cleanly
      setTimeout(reset, 0);
    }
  }, [isValidationError, location.href, router, reset]);

  // Don't flash anything while fixing validation errors
  if (isValidationError) {
    return null;
  }

  // All other errors → use your shared, consistent ErrorBoundary
  return (
    <ErrorBoundary
      page="Application Error"
      title="Something went wrong"
      errorMessage={
        isDev
          ? error?.message || 'An unexpected error occurred'
          : 'We’re having trouble loading this page. Please try again later.'
      }
      navigation={{ to: '/' }} // or wherever makes sense as a safe fallback
      buttonLabel="Go to Home"
    >
      {/* Dev-only detailed error output */}
      {isDev && error && (
        <details className="mt-6 p-4 bg-red-50 border border-red-300 rounded-md text-red-800 font-mono text-xs">
          <summary className="cursor-pointer font-bold mb-2">Error Details (Development Only)</summary>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all">
            {error.stack || String(error)}
          </pre>
        </details>
      )}
    </ErrorBoundary>
  );
}