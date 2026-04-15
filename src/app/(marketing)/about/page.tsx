import { Button } from "@/components/ui/button";


//  export const dynamic = "force-dynamic"
export default async function AboutPage (){
    // await new Promise((resolve) =>setTimeout(resolve,400))

    // throw new Error("Something went wrong")
    return(
        <div>
            <h1>This is about page</h1>
             <Button className="bg-red-600" aria-label="Submit">
        Click me
      </Button>
        </div>
    )
 
}
