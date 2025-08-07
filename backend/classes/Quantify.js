import { Prompt } from "./Prompt.js"

export default class Quantify extends Prompt{
    constructor(threshold = () => true) {
        super()
        this.max = 1
        this.threshold = threshold
    }

    count() {
        return this.terms.length
    }

    generateAnswer() {
        return this.terms.length + " words"
    }

    ask() {
        if (this.threshold(this.count())) {
            return {
                question: "How many words are in the bible verse?",
                answer: this.generateAnswer()
            }
        }
    }

}