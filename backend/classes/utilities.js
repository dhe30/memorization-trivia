export default function pickRandom(from, to) {
    if (from > to) return from 
    return from + (Math.floor(Math.random() * (to - from + 1))) 
}

export function destructureAndJoin(terms) {
    const res = terms.map(term => {
        return term.text ?? term 
    })
    return res.join(" ")
}

function mergeDecoratorHelper(terms, options, index, mapData) {
    // precondition: current index is an option and merges with next token
    // if next token is an option, next token != current token
    const token = terms[index].text ?? terms[index]
    if (index + 1 < terms.length) {
        const nextToken = terms[index + 1].text ?? terms[index + 1]
        if (options.includes(nextToken)) mergeDecoratorHelper(terms, options, index + 1, mapData)
    }
    if (terms[index + 1].text || term[index + 1].text === "") {
        terms[index + 1].text = token + terms[index + 1].text
    } else {
        terms[index + 1] = token + terms[index + 1]
    }
    terms.splice(index, 1) // no change to i 
    mapData.set(token, mapData.get(token) + 1)
}

export function mergeDecoratorPairs(terms, options, index = 0, mapData = null) {
    //options is an array of dectorators 
    // modifies array passed in 
    terms = terms.map(term => {
        if (!(term.text) && term.text !== "") return {text : term}
        return term
    })
    let map = mapData
    if (!mapData) {
        map = new Map()
        options.forEach(opt => map.set(opt, 0))
    }
    for (let i = index; i < terms.length; i++) {
        const token = terms[i].text ?? terms[i]
        if (options.includes(token)) {
            const pair = map.get(token)
            if (i < terms.length - 1) {
                const futureToken = terms[i + 1].text ?? terms[i + 1]
                if (options.includes(futureToken) && map.get(token) % 2 === 0) { // current token merges with next, but next token is an option
                    mergeDecoratorHelper(terms, options, i + 1, map)
                }
            }
            if (pair % 2 === 0) {
                terms[i + 1].text = token + terms[i + 1].text
                terms.splice(i, 1) // no change to i 
            } else {
                terms[i - 1].text = terms[i - 1].text + token
                terms.splice(i, 1) // current i is next term, so need to decrement 
                i--
            }
            map.set(token, pair + 1)
        }
    }
    return terms
}

export function insertNumverseAndMergeDecoratorPairs(terms, options) {
    let res = mergeDecoratorPairs(terms, options)
    res = insertNumverse(res)
    res = mergeDecoratorPairs(res, ["<sup>"])
    return res 
}

export function joinInsert(terms, ranges, inserter, seperator, options = {verseInclusion: true, mergeDecoratorPairs: []}) {
    //precondition: ranges is disjoint and sorted
    const copy = [...terms]
    for (const [before, after] of ranges.slice().reverse()) {
        copy.splice(after, 0, inserter)
        copy.splice(before, 0, inserter)
    }
    let res = copy
    if (options.verseInclusion) res = insertNumverse(copy)
    if (options.mergeDecoratorPairs.length !== 0) mergeDecoratorPairs(res, options.mergeDecoratorPairs) 
    return res.join(seperator)
}

export function insertNumverse(terms) {
    // console.log(terms)
    let res = []
    let curr = ""
    for (const term of terms) {
        // console.log(term.numverse, curr)
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

export function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function preprocessVerse({verse, content}) {
    const res = []
    for (const text of content) {
        const match = text.match(/^[0-9]+\s/)
        if (match) {
            const numverse = match[0].trim()
            const newText = text.replace(match[0], "")
            res.push({numverse, content: newText})
        } else {
            res[res.length - 1].content += text
        }
        
    }
    return {verse, content: res}
}