import { createContext, useState } from "react";
import type {PropsWithChildren} from "react";
import type Question from "./TriviaType";

interface TriviaContextType {
    trivia: Array<Question>
}

const defaultTrivia: TriviaContextType = {
    trivia: []
}
export const TriviaContext = createContext<TriviaContextType>(defaultTrivia)
export function TriviaProvider({children}: PropsWithChildren) {
    const [game, setGame] = useState<string | undefined>(undefined)
    const [trivia, setTrivia] = useState<Array<Question>>(() => test())

    function generateGame() {
        // creates game and sets game along with trivia 
    }

    function test() {
        const res = []
        for (let i = 0; i < 8; i++) {
            res.push({
                question: "question",
                answer: "answer",
                completed: false
            })
        }
        return res
    }
    return (
        <TriviaContext.Provider 
            value={{trivia}}
        >
            {children}
        </TriviaContext.Provider>
    )
}