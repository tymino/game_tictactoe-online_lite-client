import {
  lobbyPlayers,
  waitingPlayer,
  setWaitingPlayer,
  roomConnectKey,
  createGame,
  updateGame,
} from '../variables.js'

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

  // socket.on('player:ready', () => {
  if (waitingPlayer) {
    // создаем комнату для двух игроков
    console.log(`Create game for: ${waitingPlayer.id}, ${socket.id}`)
    const room = `${waitingPlayer.id}${roomConnectKey}${socket.id}`

    console.log(`Room name: ${room}`)

    socket.join(room)
    waitingPlayer.join(room)

    socket.room = room
    waitingPlayer.room = room

    const gameState = createGame(room, waitingPlayer.id, socket.id)
    io.to(room).emit('game:start', gameState)

    delete lobbyPlayers[socket.id]
    delete lobbyPlayers[waitingPlayer.id]
    update()
    setWaitingPlayer(null)
  } else {
    setWaitingPlayer(socket)
    console.log('waitingPlayer', waitingPlayer.id)
  }
  // })


  socket.on('disconnect', () => {
    console.log('Disconnected: lobby ', socket.id)

    delete lobbyPlayers[socket.id]
    update()
  })
}
