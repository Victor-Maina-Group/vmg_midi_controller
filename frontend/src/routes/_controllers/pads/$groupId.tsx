import { GroupTabs } from "@/components/GroupTabs";
import { Pad } from "@/components/Pad";
import { GroupNumType, lastGroupStore } from "@/stores/lastGroup";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/_controllers/pads/$groupId")({
  component: Pads,
  loader: ({ params: { groupId } }) => {
    const id = parseInt(groupId);
    if (id > 4 || id < 1) throw notFound();
    const { update } = lastGroupStore.getState();
    update("pads", groupId as GroupNumType);
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
      <GroupTabs parentRoute={Route.fullPath} />
    </>
  );
}
