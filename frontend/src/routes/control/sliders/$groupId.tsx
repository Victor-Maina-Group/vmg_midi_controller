import Slider from "@/components/Slider";
import { GroupNumType, lastGroupStore } from "@/stores/lastGroup";
import { GroupNum, useSliderStore } from "@/stores/sliders";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useStore } from "zustand/react";

export const Route = createFileRoute("/control/sliders/$groupId")({
  component: SliderGroup,
  loader: ({ params: { groupId } }) => {
    const id = parseInt(groupId);
    if (id > 4 || id < 1) throw notFound();
    const { update } = lastGroupStore.getState();
    update("sliders", groupId as GroupNumType);
  },
  notFoundComponent: () => {
    return (
      <>
        <div className="flex flex-1 flex-col justify-center text-center">
          <h1 className="text-xl font-medium">Not Found</h1>
          <p>This slider group does not exist.</p>
        </div>
      </>
    );
  },
  pendingMinMs: 1000,
  pendingMs: 1000,
  pendingComponent() {
    return <div>Sliders loading...</div>;
  },
});

function SliderGroup() {
  const group = parseInt(useStore(lastGroupStore).sliders) as GroupNum;
  const sliders = useSliderStore((state) => state.data[group]);
  return (
    <>
      <main className="grid flex-1 grid-cols-6 justify-between gap-4">
        {sliders.map(({ id }, i) => (
          <Slider key={id} sliderIndex={i} group={group} />
        ))}
      </main>
    </>
  );
}