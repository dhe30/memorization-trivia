import Quantify from "./Quantify.js";

export default class QuantifyLetters extends Quantify {
    freq = new Map()

    count() {
        for (const term of this.terms) {
            for (const char of term.text) {
                if (/[a-zA-Z]/.test(char)) {
                    const letter = char.toLowerCase()
                    this.freq[letter] = (this.freq[letter] || 0) + 1
                }
            }
        }
        return 0
    }

    ask() {
        // console.log(this.freq.size)
        if (this.freq.size === 0) {
            this.count()
            this._entries = Object.entries(this.freq).sort((a, b) => b[1] - a[1])
        }
        const res = this._entries.find((elem) => this.threshold(elem[1]))
        if (!res) return super.ask()
        return {
            question: `How many times does "${res[0]}" appear in the bible verse?`,
            answer: `${res[1]} times`
        }
    }
}