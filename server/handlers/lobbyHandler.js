import {
  connectedPlayers,
  lobbyPlayers,
  waitingPlayer,
  setWaitingPlayer,
  roomConnectKey,
  createGame,
} from '../variables.js'

const createPlayer = (socketID) => {
  const player = {
    name: `Player_${socketID.slice(3, 9)}`,
  }

  return player
}

export const lobbyHandler = (io, socket) => {
  const update = () => {
    console.log('lobbyPlayers: ', lobbyPlayers)
    io.emit('lobby:update', lobbyPlayers)
  }

  connectedPlayers[socket.id] = createPlayer(socket.id)
  lobbyPlayers[socket.id] = connectedPlayers[socket.id]
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
    setWaitingPlayer(null)
    update()
  } else {
    setWaitingPlayer(socket)
    console.log('waitingPlayer', waitingPlayer.id)
  }
  // })

  socket.on('disconnect', () => {
    console.log('Disconnected lobby: ', socket.id)

    if (waitingPlayer && waitingPlayer.id === socket.id) {
      setWaitingPlayer(null)
    }

    delete connectedPlayers[socket.id]
    delete lobbyPlayers[socket.id]
    update()
  })
}
