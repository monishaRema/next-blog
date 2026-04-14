import { userService } from "@/service/user.service"





export default async function Home() {

  const {data,error} = await userService.getSession()

console.log(data.session,error)
  return (
    <h1>This is home page</h1>
    
  )
}
