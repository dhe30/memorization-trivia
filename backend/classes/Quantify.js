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

    ask() {
        if (this.threshold(this.count())) {
            return {
                question: "How many words are in the bible verse?",
                answer: this.terms.length + " words"
            }
        }
    }

}