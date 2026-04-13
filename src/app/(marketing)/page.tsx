import { cookies } from "next/headers"
import { cache } from "react"



export default async function Home() {

  const cookieStore = await cookies()

 
  const res = await fetch("http://localhost:5000/api/auth/get-session", {
    headers: {
      cookie: cookieStore.toString()
    },
    cache: "no-store"
  }, 
)

  const session = await res.json()


  return (
    <h1>This is home page</h1>
    
  )
}
