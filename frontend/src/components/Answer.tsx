import type { PropsWithChildren } from 'react'

interface Text {
  text: string
}
export default function Answer({ text }: PropsWithChildren<Text>) {
  const parts = text.split(/<highlight>/)
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? <span className='highlight'>{part}</span> : <span>{part}</span>,
      )}
    </>
  )
}
