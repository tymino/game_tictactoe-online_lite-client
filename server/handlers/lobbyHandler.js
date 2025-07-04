const lobbyPlayers = {}
let waitingPlayer = null

export const lobbyHandler = (io, socket) => {
  const update = () => {
    console.log('lobbyPlayers', lobbyPlayers)
    io.emit('lobby:update', lobbyPlayers)
  }

  lobbyPlayers[socket.id] = { name: `Player_${socket.id.slice(3, 9)}` }
  update()

  socket.on('player:name', (name) => {
    if (name.length > 0) {
      lobbyPlayers[socket.id].name = name
      update()
    }
  })

  socket.on('player:ready', () => {
    if (waitingPlayer) {
      console.log('create game', socket.id, waitingPlayer)
      // создаем комнату для двух игроков

      // const roomName = `room-${waitingPlayer.id}_${socket.id}`
      // socket.room = roomName
      // socket.join(roomName)
      // waitingPlayer.join(roomName)
      // io.to(roomName).emit('startGame', { room: roomName })
      
      waitingPlayer = null
    } else {
      waitingPlayer = socket.id
      console.log('one ready', socket.id)
      console.log('waitingPlayer', waitingPlayer)
    }
  })

  socket.on('move', ({ index, room }) => {
    console.log('move', socket.rooms)

    socket.to(room).emit('move', index)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id)

    delete lobbyPlayers[socket.id]
    update()
  })
}
