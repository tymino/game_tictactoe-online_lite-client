import { lobbyPlayers } from '../lobby/index.js'

export const activeGames = {}

const changeTurn = (room) => {
  activeGames[room].turn = activeGames[room].turn === 0 ? 1 : 0
}

const checkGameWinner = (room) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of lines) {
    const board = activeGames[room].board

    const isLineComplete =
      board[a] !== null && board[a] === board[b] && board[a] === board[c]

    if (isLineComplete) {
      console.log('line complete')
      return activeGames[room].turn
    }
  }

  if (!activeGames[room].board.includes(null)) {
    console.log('cells complete')
    return -1
  }

  return null
}

export const createGame = (room, socketID_1, socketID_2) => {
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
    winner: null,
  }

  activeGames[room] = newGame

  return newGame
}

export const updateGame = (room, index) => {
  if (activeGames[room].board[index] !== null) {
    return activeGames[room]
  }

  activeGames[room] = {
    ...activeGames[room],
    board: activeGames[room].board.map((cell, i) =>
      i === index ? activeGames[room].turn : cell,
    ),
  }

  const winner = checkGameWinner(room)

  activeGames[room].winner = winner

  if (!winner) {
    changeTurn(room)
  }
}
