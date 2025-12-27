import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import ErrorBoundary from './_ErrorBoundry';

export function TranscriptListErrorBoundary({ 
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

  // Silently fix invalid search params — your original logic was perfect
  useEffect(() => {
    if (isValidationError) {
      const url = new URL(location.href);
      url.search = ''; // clean slate
      router.navigate({
        to: url.pathname + url.search + url.hash,
        replace: true,
      });
      setTimeout(reset, 0); // ensure clean re-render
    }
  }, [isValidationError, location.href, router, reset]);

  // No flash during auto-fix
  if (isValidationError) {
    return null;
  }

  // All other errors → consistent, beautiful, dev-friendly UI
  return (
    <ErrorBoundary
      page="Transcript List"
      title="Failed to Load Transcripts"
      errorMessage={
        isDev
          ? error?.message || "An error occurred while loading transcripts."
          : "We couldn't load the transcript list. Please try again later."
      }
      navigation={{ to: '/transcript' }}
      buttonLabel="Return to Transcript List"
    >
      {/* Full error details — only visible in development */}
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