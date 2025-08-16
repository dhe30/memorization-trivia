import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useContext, useEffect } from 'react'
import { TriviaContext } from '@/context/TriviaContext'
import Display from '@/components/Display'
import Edit from '@/components/Edit'

export const Route = createFileRoute('/game/$id/$index')({
  component: RouteComponent,
})

function RouteComponent() {
  const trivia = useContext(TriviaContext)
  const { id, index } = Route.useParams()
  const navigate = useNavigate()
  useEffect(() => {
        const isGame = async () => {
          const res = await trivia.getGame(id)
          if (!res) navigate({ to: '/' })
        }
        isGame()
      }, [])

  return (
    <div className="absolute z-10 m-0 p-0 flex justify-center flex-1 w-full h-full overlay bg-black/50">
      <div className="image-box relative self-center flex flex-col items-center justify-center text-soft px-10 pt-10 pb-5">
        {trivia.trivia[+index]?.warning? <Edit id={id} index={+index}></Edit> : <Display id={id} index={+index}></Display>}
      </div>
    </div>
  )
}
