import Recite from "./Recite.js";

export default class ReciteFirstHalf extends Recite {
    constructor(...args) {
        super(...args)
        this.start = 0
    }
    ask() {
        this.maxLength = this.terms.length / 2
        const res = super.ask()
        return {...res, question: `Recite the first ${this.length} words of the bible verse.`}
    }
}