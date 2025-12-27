import ErrorBoundary from './_ErrorBoundry';

export function ManageUserIndexErrorBoundary({ 
  error 
}: { 
  error: any; 
  reset: () => void;   // required by TanStack Router's errorComponent signature
}) {
  const isDev = import.meta.env.DEV;

  const userMessage = isDev
    ? error?.message || "An error occurred while loading the user list."
    : "Unable to load users at this time. Please try again later.";

  const devDetails = isDev && error ? (
    <details className="mt-6 p-4 bg-red-50 border border-red-300 rounded-md text-red-800 font-mono text-xs">
      <summary className="cursor-pointer font-bold mb-2">Error Details (Development Only)</summary>
      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all">
        {error.stack || String(error)}
      </pre>
    </details>
  ) : null;

  return (
    <div>
      <ErrorBoundary
        page="Manage Users"
        title="Failed to Load Users"
        errorMessage={userMessage}
        navigation={{ to: '/manage-users' }}
        buttonLabel="Back to User List"
      />

      {/* Only visible in development */}
      {devDetails}
    </div>
  );
}