export default function pickRandom(from, to) {
    if (from > to) return from 
    return from + (Math.floor(Math.random() * (to - from + 1))) 
}

export function joinInsert(terms, ranges, inserter, seperator, options = {verseInclusion: true}) {
    //precondition: ranges is disjoint and sorted
    const copy = [...terms]
    for (const [before, after] of ranges.slice().reverse()) {
        copy.splice(after, 0, inserter)
        copy.splice(before, 0, inserter)
    }
    let res = copy
    if (options.verseInclusion) res = insertNumverse(copy)
    return res.join(seperator)
}

export function insertNumverse(terms) {
    console.log(terms)
    let res = []
    let curr = ""
    for (const term of terms) {
        console.log(term.numverse, curr)
        if (term.numverse && term.numverse !== curr) {
            res.push("<sup>")
            res.push(term.numverse)
            res.push("<sup>")
            curr = term.numverse
        }
        res.push(term.text ?? term)
    }
    // console.log(res)
    return res
}

export function preprocessVerse({verse, content}) {
    const res = []
    for (const text of content) {
        const match = text.match(/^[0-9]+\s/)
        const numverse = match[0].trim()
        const newText = text.replace(match[0], "")
        res.push({numverse, content: newText})
    }
    return {verse, content: res}
}