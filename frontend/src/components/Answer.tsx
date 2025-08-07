import type { PropsWithChildren } from 'react'

interface Text {
  text: string
}
export default function Answer({ text }: PropsWithChildren<Text>) {
  const parts = text.split(/<highlight>/)
  return (
    <>
      {parts.map((part, index) =>
        <span className={index % 2 === 1 ? "highlight" : ""}>
          {part.split("<sup>").map((part2, index2) => {
            if (index2 % 2 === 1) return (
              <sup>{part2}</sup>
            )
            return (
              <span>{part2}</span>
            )
          })}
        </span>
      )}
    </>
  )
}
