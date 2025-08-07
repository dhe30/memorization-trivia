export class Prompt {
    max = 100
    terms = []
    termsStripped = []

    constructor(max = 100) {
        this.max = max
    }

    loadTerms(terms) {
        this.terms = terms 
        this.termsStripped = terms.map(term => term.text)
    }

    ask() {
        return {
            question: "Recite the bible verse",
            answer: this.termsStripped.join(" ")
        }
    }
}