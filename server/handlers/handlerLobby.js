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

  // console.log('create player', player.name)

  return player
}

export const handlerLobby = (io, socket) => {
  const update = () => {
    console.log('lobbyPlayers: ', lobbyPlayers)
    io.emit('lobby:update', lobbyPlayers)
  }

  const createGameRoom = () => {
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

  socket.on('player:ready', (response) => {
    if (waitingPlayer) {
      if (waitingPlayer.id === socket.id) {
        setWaitingPlayer(null)
        response(false)
      } else {
        createGameRoom()
      }
    } else {
      setWaitingPlayer(socket)
      console.log('waitingPlayer', waitingPlayer.id)
      response(true)
    }
  })

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
