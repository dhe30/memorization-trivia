import { Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { TriviaContext } from '@/context/TriviaContext'

export function Header() {
  const trivia = useContext(TriviaContext)
  return (
    <header className="p-2 flex gap-2 bg-black text-soft justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>
        <div>
          {trivia.game && <span>Game-Id: {trivia.game}</span>}
        </div>
      </nav>
    </header>
  )
}
