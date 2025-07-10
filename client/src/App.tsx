import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

import { GameRoom } from './pages/GameRoom'
import { Lobby } from './pages/Lobby'

const socket: Socket = io('http://localhost:4000')

interface IPlayer {
  socketID: string
  name: string
  score: number
}

export interface IGameState {
  room: string
  player0: IPlayer
  player1: IPlayer
  turn: number
  board: (number | null)[]
  winner: number[]
}

// const gameState = {
//   room: 'room-name',
//   player0: {
//     socketID: 'QAWeqeqwe',
//     name: 'Player_1',
//     score: 0,
//   },
//   player1: {
//     socketID: '23rQAWeq234eqwe',
//     name: 'Player_2',
//     score: 0,
//   },
//   turn: 0,
//   board: [0, 1, null, null, 1, null, 0, null, null],
//   winner: [],
// }

const App = () => {
  const [inputNameValue, setInputNameValue] = useState<string>('')
  const [socketID, setSocketID] = useState<string>('')
  const [playerName, setPlayerName] = useState<string>('')
  const [playerList, setPlayerList] = useState({})

  const [game, setGame] = useState<IGameState | null>(null)
  // const [game, setGame] = useState<IGameState | null>(gameState)

  useEffect(() => {
    socket.on('lobby:update', (players) => {
      console.log('lobby:update', socket.id)

      if (socket.id) {
        if (!playerName) {
          setPlayerName(players[socket.id].name)
        }

        setSocketID(socket.id)
        setPlayerList(players)
      }
    })

    socket.on('game:start', (gameState: IGameState) => {
      console.log('game:start', gameState.room)

      setGame(gameState)
    })

    socket.on('game:update', (gameState: IGameState) => {
      console.log('game:update', gameState.room)
      setGame(gameState)
    })

    // Очистка слушателей при размонтировании компоненты
    return () => {
      socket.off('lobby:update')
      socket.off('game:start')
      socket.off('game:update')
    }
  })

  // const makeMove = (index: number, isMyMove: boolean = true) => {
  //   if (board[index] || (!isMyMove && !isMyTurn)) return

  //   const newBoard = [...board] as (null | string)[]
  //   newBoard[index] = playerSymbol!
  //   setBoard(newBoard)

  //   if (isMyMove) {
  //     socket.emit('move', { index, room: room! })
  //     setIsMyTurn(false)
  //   }
  //   checkWinner(newBoard)
  // }

  // const checkWinner = (boardToCheck: (null | string)[]) => {
  //   const lines = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //   ]

  //   for (const [a, b, c] of lines) {
  //     if (
  //       boardToCheck[a] &&
  //       boardToCheck[a] === boardToCheck[b] &&
  //       boardToCheck[a] === boardToCheck[c]
  //     ) {
  //       alert(`${boardToCheck[a]} wins!`)
  //       resetGame()
  //       return
  //     }
  //   }

  //   if (!boardToCheck.includes(null)) {
  //     alert('Ничья!')
  //     resetGame()
  //   }
  // }

  // const resetGame = () => {
  //   setBoard(initialBoard)
  //   setGameStarted(false)
  //   setWaiting(true)
  //   setPlayerSymbol(null)
  //   setIsMyTurn(false)
  // }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(event.target.value)
  }

  const handleSubmitName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    socket.emit('player:name', inputNameValue)
    setInputNameValue('')
  }

  const handleClickReady = () => {
    console.log('click ready')
    socket.emit('player:ready')
  }

  const handleClickMove = (index: number) => {
    socket.emit('game:move', index)
  }

  return (
    <div className="flex justify-center text-center mt-5">
      {game ? (
        <GameRoom
          socketID={socketID}
          gameState={game}
          handleClickMove={handleClickMove}
        />
      ) : (
        <Lobby
          inputNameValue={inputNameValue}
          playerID={socketID}
          playerName={playerName}
          playerList={playerList}
          handleChangeName={handleChangeName}
          handleSubmitName={handleSubmitName}
          handleClickReady={handleClickReady}
        />
      )}
    </div>
  )
}
export default App
