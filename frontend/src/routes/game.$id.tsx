import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'
import { TriviaContext } from '@/context/TriviaContext'
import Block from '@/components/Block'
import TopHat from '@/components/TopHat'
// import '../styles.css'

export const Route = createFileRoute('/game/$id')({
  component: Game,
})

function Game() {
    const { id } = Route.useParams()
  const trivia = useContext(TriviaContext)
  return (
    <>
    <Outlet></Outlet>
      <div className="questions self-center">
        {trivia.trivia.map((elem, index) => {
          return (
            <Link
              to="/game/$id/$index"
              params={{id,index: String(index)}}
            //   search={{type: 'question'}}
            >
              <Block index={index} warning={!!elem.warning}></Block>
            </Link>
          )
        })}
      </div>
      <div className="sidebar self-center">
        <TopHat></TopHat>
      </div>
    </>
  )
}
