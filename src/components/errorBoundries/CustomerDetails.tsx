import ErrorBoundary from './_ErrorBoundry';

export function CustomerDetailsErrorBoundary({ 
  error 
}: { 
  error: any; 
  reset: () => void;   // not used here, but required by TanStack Router
}) {
  const isDev = import.meta.env.DEV;

  // Only show detailed message/stack in development
  const userMessage = isDev
    ? error?.message || "An unknown error occurred while loading the customer."
    : "We couldn't load this customer. Please try again later.";

  const devDetails = isDev && error ? (
    <details className="mt-6 p-4 bg-red-50 border border-red-300 rounded-md text-red-800 font-mono text-xs">
      <summary className="cursor-pointer font-bold mb-2">Technical Details (Developers Only)</summary>
      <pre className="overflow-x-auto whitespace-pre-wrap break-all">
        {error.stack || String(error)}
      </pre>
    </details>
  ) : null;

  return (
    <div>
      <ErrorBoundary
        page="Customer Details"
        title="Failed to Load Customer"
        errorMessage={userMessage}
        navigation={{
          to: '/manage-users',
          search: { type: 'customer', pageno: 1 }
        }}
        buttonLabel="Back to Customer List"
      />

      {/* This renders below the standard error box — only in dev */}
      {devDetails}
    </div>
  );
}