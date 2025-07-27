import { createFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'
import cross from "../assets/cross-out-mark-svgrepo-com (1).svg"
import { TriviaContext } from '@/context/TriviaContext'

export const Route = createFileRoute('/game/$id/$index')({
  component: RouteComponent,
})

function RouteComponent() {
  const { index } = Route.useParams()
  const trivia = useContext(TriviaContext)
  return (
    <div className='absolute z-10  m-0 p-0 flex-1 w-full h-full overlay bg-black/50'>
      <div className='image-box relative self-center justify-self-center m-20 flex items-center justify-center text-soft'>
        {/* <img height={15} width={15} className='absolute top-0 right-0 mr-5 mt-5 opacity-70' src={cross}></img> */}
      <span className='callunasans-regualar text-2xl text-visible'>{trivia.trivia[+index].question} 1: Recit the bible beygygf</span>
    </div>
    </div>
    
  )
}
