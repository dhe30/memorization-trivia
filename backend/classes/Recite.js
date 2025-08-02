import { Prompt } from "./Prompt.js"
import pickRandom, { joinInsert } from "./utilities.js"
export default class Recite extends Prompt{
    max = 100
    constructor(start = 0, minLength = 8, maxLength = 100, max = 100) {
        super()
        this.max = max
        this.start = start
        this.minLength = minLength
        this.maxLength = maxLength
    }

    generateAnswer(start, length) {
        return joinInsert(this.terms, [[start, start + length]], {text: "<highlight>"}, " ")
    }

    ask() {
        //magic number 8 change later
        const min = Math.min(this.terms.length, this.minLength) 
        const max = Math.min(this.terms.length, this.maxLength)
        // console.log(min, Math.floor(this.terms.length / 2))
        const rand = pickRandom(min, max)
        this.length = rand
        // console.log(min, max, "rand: " + rand, this.start, this.start + rand)
        this.answer = this.generateAnswer(this.start, rand)
        return {
            question: `Recite the words in the range [${this.start + 1}-${rand}] inclusive of the bible verse.`,
            answer: this.answer
        }
    }
}