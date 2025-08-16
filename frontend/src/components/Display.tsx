import { Link, useNavigate } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import back from '../assets/back-svgrepo-com (1).svg'
import { TriviaContext } from '@/context/TriviaContext'
import Liquid from '@/components/Liquid'
import Answer from '@/components/Answer'

interface RouteParams {
  id: string
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
    console.log(trivia.trivia[index])
  }
  return (
    <>
      <span className="callunasans-regualar lg:text-2xl md:text-2xl lg:leading-10 text-xl text-visible flex-1 flex items-center">
        <Answer
          text={
            isQuestion
              ? trivia.trivia[+index]?.question
              : trivia.trivia[+index]?.answer
          }
        ></Answer>
      </span>
      <div className="w-full h-19 relative shrink-0">
        <Link
          className="w-fit absolute bottom-0 left-0"
          to="/game/$id"
          params={{ id }}
        >
          <Liquid>
            <img src={back} width={25} height={25}></img>
          </Liquid>
        </Link>
        {isQuestion && (
          <button
            className="w-fit test absolute bottom-0 absolute-center"
            onClick={handleClick}
          >
            <Liquid>
              <span className="px-2">Reveal</span>
            </Liquid>
          </button>
        )}
      </div>
    </>
  )
}
