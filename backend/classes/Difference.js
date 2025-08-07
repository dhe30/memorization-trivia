import { diffArrays, diffWords } from "diff";
import { Prompt } from "./Prompt.js";
import { destructureAndJoin, insertNumverse, insertNumverseAndMergeDecoratorPairs, mergeDecoratorPairs } from "./utilities.js";
export class Difference extends Prompt{
    constructor(changes = 3) {
        super()
        this.changes = changes
    }

    diff(changedVerse) {
        const answer = []
        // changedVerse = changedVerse.split(/\s+/).map(token => {text})
        const res = diffArrays(changedVerse.split(/\s+/), this.terms, {comparator: (a, b) => a === b.text})
        res.forEach(part => {
            if (part.added) {
                answer.push("<highlight>")
                part.value.forEach(token => answer.push(token))
                answer.push("<highlight>")
            } else if (part.removed) {
                answer.push("<strike>")
                part.value.forEach(token => answer.push(token))
                answer.push("<strike>")
            } else {
                part.value.forEach(token => answer.push(token))
            }
        })
        console.log(answer)
        const merged = insertNumverseAndMergeDecoratorPairs(answer, ["<strike>", "<highlight>"])
        const stringFromMerged = destructureAndJoin(merged)
        return stringFromMerged
    }

    manualChange() {
        return {
            question: this.termsStripped.join(" "),
            answer: "",
            warning: "Please change the verse for a spot-the-difference question (replace 2-3 words for medium difficulty)."
        }
    }

    ask() {
        return this.manualChange()
    }
}