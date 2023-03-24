import { Server } from "socket.io"
import type { Server as HTTPServer } from "http"
import type { NextApiRequest, NextApiResponse } from "next"
import type { Socket as NetSocket } from "net"
import type { Server as IOServer } from "socket.io"

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

interface State {
  message: string
  name: string
}

const state: State[] | [] = []

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (res.socket.server.io) {
    console.log("Socket is already running")
  } else {
    console.log("Socket is initializing")
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on("connection", (socket) => {
      socket.on("addMessage", (message, name) => {
        if (message !== typeof "string") return
        if (name !== typeof "string") return
        state.push({ message, name })
        socket.broadcast.emit("allMessages", state)
      })
    })
  }

  res.end()
}
