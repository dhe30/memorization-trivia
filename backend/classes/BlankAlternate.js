import Blank from "./Blank.js"

export default class BlankAlternate extends Blank { 
    constructor() {
        function createCounterFunction() {
            let count = 0;

            return function() {
                count++;
                return count % 2 === 0
            };
        }
        const predicate = createCounterFunction() 
        super(predicate, 1)
    }
}
