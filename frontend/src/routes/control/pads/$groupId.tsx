import { Pad } from "@/components/Pad";
import { boundStore } from "@/store";
import { GroupNum } from "@/store/lastGroup";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/control/pads/$groupId")({
  component: Pads,
  loader: ({ params: { groupId } }) => {
    const id = parseInt(groupId);
    if (id > 4 || id < 1) throw notFound();

    boundStore.setState((state) => ({
      ...state,
      lastPadGroup: groupId as GroupNum,
    }));
  },
  notFoundComponent: () => {
    return (
      <>
        <div className="flex flex-1 flex-col justify-center text-center">
          <h1 className="text-xl font-medium">Not Found</h1>
          <p>This pad group does not exist.</p>
        </div>
      </>
    );
  },
});

function Pads() {
  return (
    <>
      <main className="grid flex-1 grid-cols-4 gap-4">
        <Pad />
        <Pad />
        <Pad />
        <Pad />
        <Pad />
        <Pad />
        <Pad />
        <Pad />
      </main>
    </>
  );
}
