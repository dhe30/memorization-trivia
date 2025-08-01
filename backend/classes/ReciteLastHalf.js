import Recite from "./Recite.js";
import { joinInsert } from "./utilities.js";

export default class ReciteLastHalf extends Recite {
    generateAnswer(start, length) {
        start = this.terms.length - length 
        return joinInsert(this.termsStripped, [[start, start + length]], "<highlight>", " ")
    }
    ask() {
        const res = super.ask()
        return {...res, question: `Recite the last ${this.length} words of the bible verse.`}
    }
}