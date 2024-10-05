import { GroupTabs } from "@/components/GroupTabs";
import { Slider } from "@/components/Slider";
import { GroupNumType, lastGroupStore } from "@/stores/lastGroup";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/_controllers/sliders/$groupId")({
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
});

function SliderGroup() {
  return (
    <>
      <main className="flex flex-1 justify-between gap-4">
        <Slider />
        <Slider />
        <Slider />
        <Slider />
        <Slider />
        <Slider />
      </main>
      <GroupTabs parentRoute={Route.fullPath} />
    </>
  );
}
