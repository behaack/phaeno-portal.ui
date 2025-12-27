import { Image } from '@mantine/core';

export default function NotFound() {
  return (
    <main>
      <section className="h-full flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Image src="/404.webp" h={50} w="auto" alt-label="broken dna" />
          <div className="mt-5 inline-flex items-center gap-4">
            <h1 className="font-thin text-5xl">404</h1>
            <span className="text-lg">-</span>
            <span className="text-lg font-bold">Page not found</span>
          </div>
          <div>Oops! The sequence you're looking for doesn't exist on this genome.</div>
        </div>
      </section>
    </main>
  );
}
