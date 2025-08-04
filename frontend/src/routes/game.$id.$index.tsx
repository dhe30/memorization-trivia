import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import back from '../assets/back-svgrepo-com (1).svg'
import { TriviaContext } from '@/context/TriviaContext'
import Liquid from '@/components/Liquid'
import Answer from '@/components/Answer'
import Display from '@/components/Display'
import Edit from '@/components/Edit'

export const Route = createFileRoute('/game/$id/$index')({
  component: RouteComponent,
})

function RouteComponent() {
  const trivia = useContext(TriviaContext)
  const navigate = useNavigate()
  useEffect(() => {
    const isGame = async () => {
      const res = await trivia.getGame(id)
      if (!res) navigate({ to: '/' })
    }
    isGame()
  }, [])
  const { id, index } = Route.useParams()
  const [completed, setCompleted] = useState<boolean>(
    trivia.trivia[index]?.completed,
  )
  const [isQuestion, setIsQuestion] = useState<boolean>(true)

  function handleClick() {
    setIsQuestion(false)
    trivia.completed(index)
  }
  return (
    <div className="absolute z-10  m-0 p-0 flex-1 w-full h-full overlay bg-black/50">
      <div className="image-box relative self-center justify-self-center m-20 flex flex-col gap-5 items-center justify-center text-soft p-10">
        {/* <img height={15} width={15} className='absolute top-0 right-0 mr-5 mt-5 opacity-70' src={cross}></img> */}
        {trivia.trivia[index]?.warning? <Edit id={id} index={index}></Edit> : <Display id={id} index={index}></Display>}
      </div>
    </div>
  )
}
