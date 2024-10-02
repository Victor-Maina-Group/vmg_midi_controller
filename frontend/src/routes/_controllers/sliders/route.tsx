import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_controllers/sliders')({
  component: () => <div>Hello /sliders!</div>,
})
