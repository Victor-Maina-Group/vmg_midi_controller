import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/control/_route')({
  component: () => {
    return <Outlet />
  },
})
