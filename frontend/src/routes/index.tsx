import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useContext } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { VerseForm } from "../components/VerseForm.tsx"
import { TriviaContext } from '@/context/TriviaContext'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const navigate = useNavigate()
  const trivia = useContext(TriviaContext)
  const formSchema = z.object({
    verse: z.string().min(2, {
      message: "verse must be at least 2 characters.",
    }),
    version: z.string().min(2)
  })

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        verse: "John 3:16",
        version: "NIV"
      },
  })

  async function handleClick(data : z.infer<typeof formSchema>) {
    const res = await trivia.generateGame(data.verse, data.version)
    if (res) {
      // console.log('siejdheh')
      // console.log()
      navigate({
        to: "/game/$id", 
        params: {id: res}
      })
    } else {
      form.setError(
        "verse",
        {type: "server", message: "Invalid, please try again."}
      )
    }
  }
  return (
    <div className='self-center h-full content-center'>
      <div>
      <VerseForm form={form} onSubmit={handleClick}></VerseForm>
      </div>
   </div>
  )
}
