import { ChangeEvent, FormEventHandler, useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"

let socket: Socket

const Home = () => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socketInitializer()
  }, [])

  async function socketInitializer() {
    await fetch("/api/socket")
    socket = io()

    socket.on("connect", () => {
      console.log("connected")
    })

    socket.on("allMessages", (data) => {
      setMessages(data)
    })
  }

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    setInput(e.target.value)
    socket.emit("addMessage", e.target.value, "john")
  }

  console.log({ input })

  return (
    <div>
      <article>
        {!!messages.length && messages.map(({ message }, index) => <p key={index}>{message}</p>)}
      </article>
      <form onSubmit={handleSubmit}>
        <p>{input}</p>
        <input
          placeholder="Type something"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  )
}

export default Home
