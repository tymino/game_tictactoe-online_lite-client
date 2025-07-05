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
  board: Array(9).fill(''),
}

const setWaitingPlayer = (socket) => {
  waitingPlayer = socket
}

const createGame = (room, socketID_1, socketID_2) => {
  return {
    room,
    player0: {
      socketID: socketID_1,
      name: lobbyPlayers[socketID_1].name,
      score: 0,
    },
    player1: {
      socketID: socketID_2,
      name: lobbyPlayers[socketID_2].name,
      score: 0,
    },
    turn: 0,
    board: Array(9).fill(''),
  }
}

export {
  lobbyPlayers,
  waitingPlayer,
  setWaitingPlayer,
  roomConnectKey,
  activeGames,
  createGame,
}
