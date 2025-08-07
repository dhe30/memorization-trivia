import Blank from "./Blank.js"

export default class BlankSemantic extends Blank {
    constructor(semantic) {
        const predicate = (term) => {
            // console.log(term)
            return term.terms[0].tags[0] === semantic
        }
        super(predicate, 1)
    }
}