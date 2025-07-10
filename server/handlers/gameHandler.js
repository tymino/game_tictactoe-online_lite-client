import { activeGames, updateGame } from '../variables.js'

export const gameHandler = (io, socket) => {
  socket.on('game:move', (index) => {
    console.log('game:move', socket.room, index)
    const gameState = updateGame(socket.room, index)
    io.to(socket.room).emit('game:update', gameState)
  })

  // if (waitingPlayer) {
  //   // создаем комнату для двух игроков
  //   const roomName = `room-${waitingPlayer.id}_${socket.id}`
  //   socket.room = roomName
  //   socket.join(roomName)
  //   waitingPlayer.join(roomName)
  //   io.to(roomName).emit('startGame', { room: roomName })
  //   waitingPlayer = null
  // } else {
  //   waitingPlayer = socket
  // }

  // socket.on('move', ({ index, room }) => {
  //   console.log('move', socket.rooms)

  //   socket.to(room).emit('move', index)
  // })
}
