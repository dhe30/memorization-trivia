import {  useContext } from "react";
import { Textarea } from "./ui/textarea";
import Back from "./Back";
import Liquid from "./Liquid";
import type {FormEvent} from "react";
import { TriviaContext } from "@/context/TriviaContext";

interface RouteParams {
    id: string, 
    index: number
}

export default function Edit({ id, index }: RouteParams) {
    const trivia = useContext(TriviaContext)
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const text = formData.get('text') as string 
        const res = await trivia.setDifference(index, text)
        if (!res) console.log("error!")
    }
    return (
        <>
        <form onSubmit={handleSubmit} className="absolute px-10 self-center justify-self-center flex flex-col gap-5 items-center justify-center text-soft test h-full">
            <span className="callunasans-regualar text-2xl text-visible">{trivia.trivia[index]?.warning}</span>
            <Textarea name="text" className="mb-10 callunasans-regualar text-2xl text-visible h-50 bg-white bg-opacity-90 text-black" defaultValue={trivia.trivia[index]?.question}>
            </Textarea>
            <Back id={id}></Back>
            <button type="submit" className="absolute bottom-5 p-0 m-0">
                <Liquid>
                <span className="px-5">Save</span>
                </Liquid>
            </button>
        </form>
        </>

    )
}