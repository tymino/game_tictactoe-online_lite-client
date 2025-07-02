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

const lobbyPlayers = new Map()

io.on('connection', (socket) => {
  console.log('New connection:', socket.id)

  socket.on('player:name', () => {
    lobbyPlayers.set(socket.id, { name: 'Player' + socket.id.slice(3, 9) })
    socket.emit('lobby:update', lobbyPlayers)

    console.log('lobbyPlayers', lobbyPlayers)
  })

  if (waitingPlayer) {
    // создаем комнату для двух игроков
    const roomName = `room-${waitingPlayer.id}_${socket.id}`
    socket.room = roomName
    socket.join(roomName)
    waitingPlayer.join(roomName)
    io.to(roomName).emit('startGame', { room: roomName })
    waitingPlayer = null
  } else {
    waitingPlayer = socket
  }

  socket.on('move', ({ index, room }) => {
    console.log('move', socket.rooms)

    socket.to(room).emit('move', index)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id)
  })
})

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})
