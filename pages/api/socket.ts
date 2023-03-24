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

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (res.socket.server.io) {
    console.log("Already set up")
    res.end()
    return
  }

  const io = new Server(res.socket.server)
  res.socket.server.io = io

  io.on("connection", (socket) => {
    socket.on("send-message", (obj) => {
      io.emit("receive-message", obj)
    })
  })

  console.log("Setting up socket")
  res.end()
}
