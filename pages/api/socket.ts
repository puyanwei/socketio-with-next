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
  const io = new Server(res.socket.server)
  res.socket.server.io = io

  io.on("connection", (socket) => {
    // after the connection.....
  })

  console.log("Setting up socket")
}
