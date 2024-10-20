import { lastGroupStore } from '@/stores/lastGroup'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Route as padsGroupRoute } from './$groupId'

export const Route = createFileRoute('/control/pads')({
  component: () => {
    return <Outlet />
  },
  beforeLoad: ({ params }) => {
    const { pads } = lastGroupStore.getState()
    if (!params.hasOwnProperty('groupId')) {
      throw redirect({ to: padsGroupRoute.to, params: { groupId: pads } })
    }
  },
})
