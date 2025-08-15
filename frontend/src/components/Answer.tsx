import type { PropsWithChildren } from 'react'

interface Text {
  text: string
}
export default function Answer({ text }: PropsWithChildren<Text>) {
  const parts = text.replace(/\n/, "\n\n").split(/<highlight>/);

  return (
    <p className="whitespace-pre-line" style={{whiteSpace:"pre-line"}}>
      {parts.map((part, i) => {
        // Inside a highlight section (odd index)
        const isHighlight = i % 2 === 1;

        // Split further into sup / non-sup chunks
        return part.split(/<underline>/).map((und, k) => {
          const isUnderline = k % 2 === 1;

          return und.split(/<strike>/).map((strk, l) => {
              const isStrike = l % 2 === 1;

            return strk.split(/<sup>/).map((sub, j) => {
            const isSup = j % 2 === 1;

            const content = isSup ? <sup>{sub}</sup> : <>{sub}</>;

            return (
              <span
                key={`${i}-${j}`}
                className={(isHighlight ? "highlight" : "") + (isUnderline? "underline" : "") + (isStrike? "striker" : "")}
              >
                {content}
              </span>
            );
          });
        })
        })
      })}
    </p>
  );
}
