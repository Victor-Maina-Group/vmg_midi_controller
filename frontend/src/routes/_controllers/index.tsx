import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_controllers/')({
  component: Home,
})

function Home() {
  return <h1>This is the homepage</h1>
}
