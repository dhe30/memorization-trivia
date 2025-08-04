export class Loader {
    terms
    variationsList 
    variations = new Map()
    constructor(amount, ...variations) {
        this.amount = amount
        this.variationsList = variations
        variations.forEach(variation => {
            this.variations.set(variation, variation.max)
        })
    }

    loadTerms(terms) {
        this.terms = terms
        this.variationsList.forEach(variation => variation.loadTerms(terms))
    }

    ask() {
        console.log(this.variations.entries())
        const entries = Array.from(this.variations.entries()).filter(([_, c]) => c > 0);
        const random = Math.floor(Math.random() * entries.length)
        const [variation, count] = entries[random]
        const questionAnswerPair = variation.ask()
        questionAnswerPair.origin = variation
        this.variations.set(variation, count - 1)
        return questionAnswerPair
    }

    restore() {
        this.variationsList.forEach(variation => {
            this.variations.set(variation, variation.max)
        })
    }
}