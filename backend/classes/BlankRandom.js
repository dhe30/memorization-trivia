import Blank from "./Blank.js"

export default class BlankRandom extends Blank { 
    constructor(probability) {
        const predicate = () => {
            return Math.random() <= probability
        }
        super(predicate)
    }
}
