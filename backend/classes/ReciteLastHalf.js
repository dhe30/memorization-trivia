import Recite from "./Recite.js";
import { joinInsert } from "./utilities.js";

export default class ReciteLastHalf extends Recite {
    generateAnswer(start, length) {
        start = this.terms.length - length 
        return joinInsert(this.terms, [[start, start + length]], {text: "<highlight>"}, " ")
    }
    ask() {
        this.maxLength = this.terms.length / 2
        const res = super.ask()
        return {...res, question: `Recite the last ${this.length} words of the bible verse.`}
    }
}