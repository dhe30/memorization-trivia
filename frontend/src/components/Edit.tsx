import { useContext } from "react";
import { Textarea } from "./ui/textarea";
import { TriviaContext } from "@/context/TriviaContext";
import Back from "./Back";
import Liquid from "./Liquid";

interface RouteParams {
    id: string, 
    index: number
}

export default function Edit({ id, index }: RouteParams) {
    const trivia = useContext(TriviaContext)
    async function handleClick() {

    }
    return (
        <>
        <span  className="callunasans-regualar text-2xl text-visible">{trivia.trivia[index]?.warning}</span>
        <Textarea style={{}} className="callunasans-regualar text-2xl text-visible h-50 w-full bg-white bg-opacity-90 text-black" defaultValue={trivia.trivia[index]?.question}>
        </Textarea>
        <Back id={id}></Back>
        <button className="absolute bottom-5 p-0 m-0" onClick={handleClick}>
            <Liquid>
            <span className="px-5">Save</span>
            </Liquid>
        </button>
        </>

    )
}