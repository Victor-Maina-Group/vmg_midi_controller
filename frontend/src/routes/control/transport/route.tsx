import { Pad } from '@/components/Pad'
import { Icon } from '@iconify/react/dist/iconify.js'
import { createFileRoute } from '@tanstack/react-router'
import { PropsWithChildren } from 'react'

export const Route = createFileRoute('/control/transport')({
  component: Transport,
})

type TransportControlType = { icon: string; title: string }
const transportControls: TransportControlType[] = [
  { icon: 'bx:play', title: 'Play' },
  { icon: 'bx:stop', title: 'Stop' },
  { icon: 'bxs:circle', title: 'Record' },
  { icon: 'bx:refresh', title: 'Loop' },
  { icon: 'bx:rewind', title: 'Prev' },
  { icon: 'bx:fast-forward', title: 'Next' },
  { icon: 'mdi:metronome', title: 'Tap Tempo' },
]

function Transport() {
  return (
    <main className="flex-1 flex flex-wrap gap-4">
      {transportControls.map((control) => (
        <TransportPad
          key={control.title}
          icon={control.icon}
          title={control.title}
        ></TransportPad>
      ))}
    </main>
  )
}

type TransportPadType = TransportControlType & PropsWithChildren
function TransportPad(props: TransportPadType) {
  return (
    <Pad className="min-w-[max(5rem,_20%)] flex flex-col items-center justify-center">
      <Icon icon={props.icon} className="text-[min(6vw,_10vh)]" />
      <p className="text-[min(min(3vw,_5vh),_1.5rem)] font-medium">
        {props.title}
      </p>{' '}
    </Pad>
  )
}
