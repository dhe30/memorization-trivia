import { Link, Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useContext, useEffect } from 'react'
import { TriviaContext } from '@/context/TriviaContext'
import Block from '@/components/Block'
import Waves from '@/components/Waves'
// import '../styles.css'

export const Route = createFileRoute('/game/$id')({
  component: Game,
})

function Game() {
    const { id } = Route.useParams()
  const trivia = useContext(TriviaContext)
    const navigate = useNavigate()
    useEffect(() => {
      const isGame = async () => {
        const res = await trivia.getGame(id)
        if (!res) navigate({ to: '/' })
      }
      isGame()
    }, [])
  return (
    <>
    <Outlet></Outlet>
    <Waves>
      <div className="questions self-center z-1 relative">
        {trivia.trivia.map((elem, index) => {
          return (
            <Link
              to="/game/$id/$index"
              params={{id,index: String(index)}}
              key={elem.question}
            >
              <Block index={index} warning={!!elem.warning} completed={elem.completed}></Block>
            </Link>
          )
        })}
      </div>
      {/* <div className="sidebar self-center">
      </div> */}
    </Waves>
    </>
  )
}
