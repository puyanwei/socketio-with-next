import type { NextPage } from "next"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"

let socket: Socket

const Home: NextPage = () => {
  useEffect(() => {
    socketInitializer()

    return () => {
      socket.disconnect()
    }
  }, [])

  async function socketInitializer() {}

  function handleSubmit(e) {
    console.log(e)
  }

  return (
    <div>
      <h1>Chat app</h1>
    </div>
  )
}

export default Home
