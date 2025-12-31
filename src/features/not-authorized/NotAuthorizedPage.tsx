import { Image } from '@mantine/core';

export function NotAuthorizedPage() {
  return (
    <main>
      <section className="h-full flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Image src="/404.webp" h={50} w="auto" alt-label="broken dna" />
          <div className="mt-5 inline-flex items-center gap-4">
            <h1 className="font-thin text-5xl">403</h1>
            <span className="text-lg">-</span>
            <span className="text-lg font-bold">Not authorized</span>
          </div>
          <div>You are not authorized to access this page</div>
        </div>
      </section>
    </main>
  );
}