import { Link } from "@tanstack/react-router";
import back from '../assets/back-svgrepo-com (1).svg'
import Liquid from "./Liquid";

interface GameType {
    id: string,
}

export default function Back({id}: GameType) {
    return (
        <Link className="absolute left-5 bottom-5" to="/game/$id" params={{id}}>
        <Liquid>
            <img src={back} width={25} height={25}></img>
        </Liquid>
        </Link>
    )
}