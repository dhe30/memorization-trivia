import { diffArrays, diffWords } from "diff";
import { Prompt } from "./Prompt.js";
import { insertNumverse } from "./utilities.js";
export class Difference extends Prompt{
    constructor(changes = 3) {
        super()
        this.changes = changes
    }

    diff(changedVerse) {
        const answer = []
        // changedVerse = changedVerse.split(/\s+/).map(token => {text})
        const res = diffArrays(this.terms, changedVerse.split(/\s+/), {comparator: (a, b) => a.text === b})
        res.forEach(part => {
            if (part.added) {
                answer.push("<strike>")
                part.value.forEach(token => answer.push(token))
                answer.push("<strike>")
            } else if (part.removed) {
                answer.push("<highlight>")
                part.value.forEach(token => answer.push(token))
                answer.push("<highlight>")
            } else {
                part.value.forEach(token => answer.push(token))
            }
        })
        console.log(insertNumverse(answer))

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