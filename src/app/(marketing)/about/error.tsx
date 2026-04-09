"use client"

import { useEffect } from "react"

type AboutErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AboutError({ error, reset }: AboutErrorProps) {
  useEffect(() => {
    // Surface the route error during development and in connected loggers.
    console.error(error)
  }, [error])

  return (
    <div>
      <h1>Something went wrong. Please try again later.</h1>
      <button onClick={() => reset()}>Retry</button>
    </div>
  )
}
