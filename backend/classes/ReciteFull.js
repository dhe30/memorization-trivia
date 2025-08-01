import { Prompt } from "./Prompt.js"
import Recite from "./Recite.js";
export default class ReciteFull extends Recite{
    constructor() {
        super(0, 100, 100)
    }

    ask() {
        const res = super.ask(); 
        return {...res, question: "Recite the bible verse."}
    }
}