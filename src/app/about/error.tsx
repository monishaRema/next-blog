"use client"

import { useEffect } from "react";

export default function AboutError({error,reset}:
    {
        error:Error & {digest?:string},
        reset: () => void
    }
) {

    useEffect(() => {

        // we can pass this to logger
        console.error(error)
    },[])
    return (
        <div>
           <h1> Something went wrong:Please try again later</h1>
            <button onClick={() => reset()} >Retry</button>
         </div>
    );
}