export default function pickRandom(from, to) {
    if (from > to) return from 
    return from + (Math.floor(Math.random() * (to - from + 1))) 
}

export function joinInsert(terms, ranges, inserter, seperator) {
    const copy = [...terms]
    for (const [before, after] of ranges) {
        copy.splice(before, 0, inserter)
        copy.splice(after + 1, 0, inserter)
    }
    return copy.join(seperator)
}