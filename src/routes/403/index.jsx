import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/403/')({
  component: FileRoomIndex,
});

function FileRoomIndex() {
  return (
    <main>
      <section>        
        <h1>403</h1>
      </section>
    </main>
  );
}
