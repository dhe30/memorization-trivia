export class Prompt {
    max = 100
    terms = []
    termsStripped = []
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