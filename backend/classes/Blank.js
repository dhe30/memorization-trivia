import { Prompt } from "./Prompt.js"
import { destructureAndJoin, insertNumverse, insertNumverseAndMergeDecoratorPairs } from "./utilities.js"

export default class Blank extends Prompt{
    predicate

    constructor(predicate = () => false, max = 100) {
        super(100)
        this.predicate = predicate 
    }

    ask() {
        let res = []
        let answer = []
        for (const term of this.terms) {
            let newTerm = term.text
            let answerToken = term.text
            if (this.predicate(term)) {
                newTerm = term.text.replace(/\w/g, "_")
                answerToken = "<underline>" + answerToken + "<underline>"

            }
            res.push({
                text: newTerm,
                numverse: term.numverse
            })
            answer.push({
                text: answerToken,
                numverse: term.numverse
            })
        }
        answer = insertNumverseAndMergeDecoratorPairs(answer, ["<underline>"])
        res = insertNumverse(res)
        const finalQuestion  = destructureAndJoin(res)
        const finalAnswer = destructureAndJoin(answer)
        return {question: "Fill in the blanks.\n" + finalQuestion, answer: finalAnswer}
    }
}