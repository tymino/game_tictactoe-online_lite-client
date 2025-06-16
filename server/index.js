import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*', // или конкретный URL: "http://localhost:3000"
    methods: ['GET', 'POST'],
  },
})

let waitingPlayer = null

io.on('connection', (socket) => {
  console.log('New connection:', socket.id)

  if (waitingPlayer) {
    // создаем комнату для двух игроков
    const roomName = `room-${waitingPlayer.id}-${socket.id}`
    socket.join(roomName)
    waitingPlayer.join(roomName)
    io.to(roomName).emit('startGame', { room: roomName })
    waitingPlayer = null
  } else {
    waitingPlayer = socket
  }

  socket.on('move', ({ index, room }) => {
    socket.to(room).emit('move', index)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id)
  })
})

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})
