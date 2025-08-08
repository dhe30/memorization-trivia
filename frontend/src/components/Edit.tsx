import {  useContext } from "react";
import { Textarea } from "./ui/textarea";
import back from '../assets/back-svgrepo-com (1).svg'
import Liquid from "./Liquid";
import type {FormEvent} from "react";
import { TriviaContext } from "@/context/TriviaContext";
import { Link } from "@tanstack/react-router";

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
        <form onSubmit={handleSubmit} className="test">
            <span className="callunasans-regualar md:text-2xl text-lg text-visible">{trivia.trivia[index]?.warning}</span>
            <Textarea name="text" className="mb-5 md:text-2xl text-lg callunasans-regualar text-visible h-50 bg-white bg-opacity-90 text-black" defaultValue={trivia.trivia[index]?.question}>
            </Textarea>
            <div className="relative w-full h-19 test">
                <Link className="w-fit absolute bottom-0 left-0" to="/game/$id" params={{id}}>
                <Liquid>
                    <img src={back} width={25} height={25}></img>
                </Liquid>
                </Link>            <button type="submit" className="absolute bottom-0 absolute-center">
                <Liquid>
                <span className="px-5">Save</span>
                </Liquid>
            </button>
            </div>
        </form>
        </>

    )
}