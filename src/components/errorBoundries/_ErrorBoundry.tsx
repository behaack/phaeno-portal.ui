import { ReactNode } from "react";
import { Button } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useRouter, NavigateOptions } from '@tanstack/react-router';

export interface IProp {
  title?: string;
  page: string
  errorMessage?: string;
  navigation: NavigateOptions<any>;
  buttonLabel: string;  
  children?: ReactNode;
  onRetry?: () => void;
}

function ErrorBoundary({
  title = "Error: Something went wrong",
  page,
  errorMessage = "Please try again later.",
  navigation,
  buttonLabel,
  children,
  onRetry
}: IProp) {
  const router = useRouter();

  const goto = () => {
    router.navigate({ ...navigation, replace: true });
  };

  return (
    <main>
      <section>
        <br />
        <div className="flex justify-center w-full">
          <div className="bg-red-100 rounded-md p-6 w-full max-w-3xl">
            <div className="text-red-600 text-2xl font-bold inline-flex items-center gap-3">
              <IconAlertCircle size={32} />
              {title}
            </div>
            <h1 className="text-xl mt-2">{page}</h1>
            <p className="mt-3 text-red-700">{errorMessage}</p>

            {children}

            <div className="mt-6 flex gap-3">
              {onRetry && (
                <Button variant="outline" color="gray" onClick={onRetry}>
                  Try Again
                </Button>
              )}
              <Button variant="filled" color="red" onClick={goto}>
                {buttonLabel}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ErrorBoundary;