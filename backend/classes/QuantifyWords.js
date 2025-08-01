import QuantifyLetters from "./QuantifyLetters.js";

export default class QuantifyWords extends QuantifyLetters {
    freq = new Map()
    count() {
        console.log("shud", this.max)
        for (const term of this.termsStripped) {
            const word = term.match(/\b[\w'-]+\b/g)[0].toLowerCase()
            this.freq[word] = (this.freq[word] || 0) + 1
                
        }
        return 0
    }
}