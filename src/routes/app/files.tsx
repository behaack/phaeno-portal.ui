import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/app/files')({
  component: FileRoomIndex,
});

function FileRoomIndex() {
  return (
    <main>
      <section>        

      </section>
    </main>
  );
}
