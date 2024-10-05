import { GroupTabs } from '@/components/GroupTabs'
import { Pad } from '@/components/Pad'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_controllers/pads/$groupId')({
  component: Pads,
  loader: ({ params: { groupId } }) => {
    const id = parseInt(groupId)
    if (id > 4 || id < 1) throw notFound()
  },
  notFoundComponent: () => {
    return (
      <>
        <div className="text-center flex-1 flex flex-col justify-center">
          <h1 className="font-medium text-xl">Not Found</h1>
          <p>This pad group does not exist.</p>
        </div>
      </>
    )
  },
})

function Pads() {
  return (
    <>
      <main className="flex-1 grid grid-cols-4 gap-4">
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
  )
}
