import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <form action="/submit" method="post">
        <label htmlFor="username">:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Enter your username" 
            required 
          />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
