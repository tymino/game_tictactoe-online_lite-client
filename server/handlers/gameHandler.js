

export const gameHandler = (io, socket) => {

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