import ErrorBoundary from './_ErrorBoundry';

export function PasswordRecoveryStep2ErrorBoundary({ 
  error 
}: { 
  error: any; 
  reset: () => void;   // required by TanStack Router
}) {
  const isDev = import.meta.env.DEV;

  const userMessage = isDev
    ? error?.message || "An error occurred during password recovery."
    : "Something went wrong. Please try the recovery process again from the beginning.";

  const devDetails = isDev && error ? (
    <details className="mt-6 p-4 bg-red-50 border border-red-300 rounded-md text-red-800 font-mono text-xs">
      <summary className="cursor-pointer font-bold mb-2">Error Details (Dev Only)</summary>
      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all">
        {error.stack || String(error)}
      </pre>
    </details>
  ) : null;

  return (
    <div>
      <ErrorBoundary
        page="Recover Password - Step 2 of 3"
        title="Password Recovery Failed"
        errorMessage={userMessage}
        navigation={{ to: '/auth/password-recovery/step-1' }}
        buttonLabel="Back to Step 1"
      />

      {/* Only shown in development */}
      {devDetails}
    </div>
  );
}