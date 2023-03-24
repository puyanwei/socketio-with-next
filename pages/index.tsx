import type { NextPage } from "next"
import React, { FormEvent, useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"

let socket: Socket

const Home: NextPage = () => {
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    socketInitializer()

    return () => {
      socket.disconnect()
    }
  }, [])

  async function socketInitializer() {
    await fetch("/api/socket")

    socket = io()

    socket.on("receive-message", (data) => {
      console.log({ data })
      // we get the data here
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    console.log(e)
  }

  return (
    <div>
      <h1>Chat app</h1>
      <h1>Enter a username</h1>

      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <br />
      <br />

      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form>
      </div>
    </div>
  )
}

export default Home
