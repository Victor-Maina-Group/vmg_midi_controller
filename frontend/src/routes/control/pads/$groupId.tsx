import { Pad } from "@/components/Pad";
import { boundStore } from "@/store";
import { GroupNum } from "@/store/lastGroup";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useStore } from "zustand/react";

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
  const lastGroup = useStore(boundStore, (state) => state.lastPadGroup);
  const pads = useStore(boundStore, (state) => {
    return state.pad_groups[lastGroup];
  });
  return (
    <>
      <main className="grid flex-1 gap-4 portrait:grid-cols-2 landscape:grid-cols-3">
        {Object.keys(pads).map((key) => {
          const id = parseInt(key);
          return <Pad key={key} padData={pads[id]}></Pad>;
        })}
      </main>
    </>
  );
}
