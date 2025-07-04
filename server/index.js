import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { lobbyHandler } from './handlers/lobbyHandler.js'
import { gameHandler } from './handlers/gameHandler.js'

const URL = process.env.URL || 'http://localhost'
const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: `*`,
  },
})

const onConnection = (socket) => {
  console.log('New connection:', socket.id)

  lobbyHandler(io, socket)
  gameHandler(io, socket)
}

io.on('connection', onConnection)

server.listen(PORT, () => {
  console.log(`Server is running, ${URL}:${PORT}`)
})
