export const connectedPlayers = {}
const lobbyPlayers = {}
let waitingPlayer = null
const roomConnectKey = '_:room:_'
const activeGames = {}

const gameState = {
  room: '',
  player0: {
    socketID: '',
    name: 'Player_1',
    score: 0,
  },
  player1: {
    socketID: '',
    name: 'Player_2',
    score: 0,
  },
  turn: 0,
  board: Array(9).fill(null),
  winner: [],
}

const setWaitingPlayer = (socket) => {
  waitingPlayer = socket
}

const createGame = (room, socketID_1, socketID_2) => {
  const newGame = {
    room,
    player0: {
      socketID: socketID_1,
      name: lobbyPlayers[socketID_1].name || 'Player_1',
      score: 0,
    },
    player1: {
      socketID: socketID_2,
      name: lobbyPlayers[socketID_2].name || 'Player_2',
      score: 0,
    },
    turn: 0,
    board: Array(9).fill(null),
    winner: [],
  }

  activeGames[room] = newGame

  return newGame
}

const updateGame = (room, index) => {
  activeGames[room] = {
    ...activeGames[room],
    board: activeGames[room].board.map((cell, i) =>
      i === index ? activeGames[room].turn : cell,
    ),
    turn: activeGames[room].turn === 0 ? 1 : 0,
  }
  return activeGames[room]
}

export {
  lobbyPlayers,
  waitingPlayer,
  setWaitingPlayer,
  roomConnectKey,
  activeGames,
  createGame,
  updateGame,
}
