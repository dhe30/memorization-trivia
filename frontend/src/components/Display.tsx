import { Link, useNavigate } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import back from '../assets/back-svgrepo-com (1).svg'
import { TriviaContext } from '@/context/TriviaContext'
import Liquid from '@/components/Liquid'
import Answer from '@/components/Answer'

interface RouteParams {
    id: string, 
    index: number
}

export default function Display({ id, index }: RouteParams) {
      const trivia = useContext(TriviaContext)
      const navigate = useNavigate()
      useEffect(() => {
        const isGame = async () => {
          const res = await trivia.getGame(id)
          if (!res) navigate({ to: '/' })
        }
        isGame()
      }, [])
      const [isQuestion, setIsQuestion] = useState<boolean>(true)
    
      function handleClick() {
        setIsQuestion(false)
        trivia.completed(index)
      }
    return (
        <>
        <span className="callunasans-regualar text-2xl text-visible">
            {isQuestion ? (
                trivia.trivia[+index]?.question
            ) : (
                <Answer text={trivia.trivia[+index]?.answer}></Answer>
            )}
        </span>
        <Link className="absolute left-5 bottom-5" to="/game/$id" params={{id}}>
        <Liquid>
            <img src={back} width={25} height={25}></img>
        </Liquid>
        </Link>
        {isQuestion && (
        <button className="absolute bottom-5 p-0 m-0" onClick={handleClick}>
            <Liquid>
            <span className="px-2">Reveal</span>
            </Liquid>
        </button>
        )}
    </>
    )
}