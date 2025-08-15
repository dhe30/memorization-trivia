import { createContext, useState } from "react";
import axios from "axios";
import type {PropsWithChildren} from "react";
import type Question from "./TriviaType";
import { triviaApi } from "@/api/triviaApi";

interface TriviaContextType {
    trivia: Array<Question>,
    generateGame: (a: string) => Promise<string>,
    getGame: (a: string) => Promise<string | undefined>,
    game: string,
    completed: (a: number) => void
    setDifference: (a: number, b: string) => Promise<boolean>
}

const defaultTrivia: TriviaContextType = {
    trivia: [],
    generateGame: () => new Promise((resolve) => resolve("")),
    getGame: () => new Promise((resolve) => resolve("")),
    game: "",
    completed: () => {},
    setDifference: () => new Promise((resolve) => resolve(false)),

}
export const TriviaContext = createContext<TriviaContextType>(defaultTrivia)
export function TriviaProvider({children}: PropsWithChildren) {
    const [game, setGame] = useState<string>("")
    const [trivia, setTrivia] = useState<Array<Question>>([])

    async function getTrivia(url: string) {
        console.log("uedubeub")
        try {
            const res = await triviaApi.get(url)
            setGame(res.data.game)
            setTrivia(res.data.questions)
            return res.data.game
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                console.error(
                    `Request failed with status ${err.response.status}:`,
                    err.response.data
                );
                } else if (err.request) {
                    console.error("No response received from server:", err.request);
                } else {
                    console.error("Error setting up request:", err.message);
                }
            }
            return ""
        }
    }

    async function generateGame(verse = "") {
        console.log("uedubeub")
        // creates game and sets game along with trivia 
        const res = await getTrivia("basic/" + verse)
        return res
    }

    async function getGame(gameId: string) : Promise<string | undefined> {
        if (gameId != game) {
            const res = await getTrivia("/game/" + gameId)
            return res
        } else {
            return "true"
        }
    }

    function completed(index: number) {
        setTrivia((trivia0) => {
            const newTrivia = [...trivia0]
            newTrivia[index].completed = true
            return newTrivia
        })
    }

    async function setDifference(index: number, question: string) {
        try {
            const res = await triviaApi.post("/game/" + game + "/editdifference/" + index, {question: question})
            setTrivia((prev) => {
                const updated = [...prev]
                updated[index] = res.data
                return updated
            })
            return true
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                console.error(
                    `Request failed with status ${err.response.status}:`,
                    err.response.data
                );
                } else if (err.request) {
                    console.error("No response received from server:", err.request);
                } else {
                    console.error("Error setting up request:", err.message);
                }
            }
            return false
        }
    }

    return (
        <TriviaContext.Provider 
            value={{trivia, generateGame, game, getGame, completed, setDifference}}
        >
            {children}
        </TriviaContext.Provider>
    )
}