import ErrorBoundary from './_ErrorBoundry';

export function FileErrorBoundary({ 
  error 
}: { 
  error: any; 
  reset: () => void;   // required by TanStack Router, even if unused here
}) {
  const isDev = import.meta.env.DEV;

  const userMessage = isDev
    ? error?.message || "An error occurred while loading the file browser."
    : "We couldn't load the file browser. Please try again later.";

  const devDetails = isDev && error ? (
    <details className="mt-6 p-4 bg-red-50 border border-red-300 rounded-md text-red-800 font-mono text-xs">
      <summary className="cursor-pointer font-bold mb-2">Technical Details (Dev Only)</summary>
      <pre className="overflow-x-auto whitespace-pre-wrap break-all">
        {error.stack || String(error)}
      </pre>
    </details>
  ) : null;

  return (
    <div>
      <ErrorBoundary
        page="File Browser"
        title="Failed to Load Files"
        errorMessage={userMessage}
        navigation={{ to: '/files' }}
        buttonLabel="Back to File Browser"
      />

      {/* Renders below the standard error box — only visible in development */}
      {devDetails}
    </div>
  );
}