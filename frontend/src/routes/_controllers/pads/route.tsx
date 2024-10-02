import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_controllers/pads')({
  component: () => <div>Hello /pads!</div>,
})
