import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useContext } from 'react'
import { TriviaContext } from '@/context/TriviaContext'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const navigate = useNavigate()
  const trivia = useContext(TriviaContext)
  async function handleClick() {
    const res = await trivia.generateGame()
    if (res) {
      console.log('siejdheh')
      console.log()
      navigate({
        to: "/game/$id", 
        params: {id: res}
      })
    }
  }
  return (
    <button type='button' onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
>
      Hello!
    </button>
  )
}
