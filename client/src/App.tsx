import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react'
import { io, Socket } from 'socket.io-client'

import GameRoom from './pages/GameRoom'
import Lobby from './pages/Lobby'

const socket: Socket = io('http://localhost:4000')

// type MovePayload = {
//   index: number
//   room: string
// }

type TSymbol = 'X' | 'O' | null

interface ISymbol {
  x: 'X'
  o: 'O'
}

const symbols: ISymbol = {
  x: 'X',
  o: 'O',
}

const initialBoard: (null | string)[] = Array(9).fill(null)

const App = () => {
  const [inputNameValue, setInputNameValue] = useState<string>('')
  const [playerID, setPlayerID] = useState<string>('')
  const [playerName, setPlayerName] = useState<string>('')
  const [playerList, setPlayerList] = useState({})

  const [room, setRoom] = useState<string | null>(null)
  const [playerSymbol, setPlayerSymbol] = useState<TSymbol>(null)

  const [board, setBoard] = useState<(null | string)[]>(initialBoard)
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [waiting, setWaiting] = useState<boolean>(true)

  useEffect(() => {
    socket.on('lobby:update', (players) => {
      if (socket.id) {
        setPlayerName(players[socket.id].name)
        setPlayerID(socket.id)
        setPlayerList(players)
      }
    })

    socket.on('startGame', ({ room }: { room: string }) => {
      // console.log(room)
      // console.log('socket')

      // setRoom(room)
      setGameStarted(true)
      // Первый игрок становится X
      setPlayerSymbol(symbols.x)
      setIsMyTurn(true)
      setWaiting(false)
    })

    socket.on('move', (index: number) => {
      makeMove(index, false)
    })

    // Очистка слушателей при размонтировании компоненты
    return () => {
      socket.off('lobby:update')
      socket.off('startGame')
      socket.off('move')
    }
  })

  // const handleJoin = () => {
  //   // Соединение уже установлено
  //   setWaiting(false)
  // }

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

  const resetGame = () => {
    setBoard(initialBoard)
    setGameStarted(false)
    setWaiting(true)
    setPlayerSymbol(null)
    setIsMyTurn(false)
  }

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(event.target.value)
  }

  const handleSubmitName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    socket.emit('player:name', inputNameValue)
    setInputNameValue('')
  }

  const handleClickReady = () => {
    console.log('click ready')

    socket.emit('player:ready')
  }

  return (
    <div className="flex justify-center text-center mt-5">
      {room ? (
        <GameRoom />
      ) : (
        <Lobby
          inputNameValue={inputNameValue}
          playerID={playerID}
          playerName={playerName}
          playerList={playerList}
          handleChangeName={handleChangeName}
          handleSubmitName={handleSubmitName}
          handleClickReady={handleClickReady}
        />
      )}
      {/* {!room ? (
        <div>
          <h2 className="">Лобби</h2>
          {waiting ? (
            <button onClick={handleJoin}>Присоединиться к игре</button>
          ) : (
            <p>Ожидание соперника...</p>
          )}
        </div>
      ) : (
        <div>
          <h2>Игра: {gameStarted ? `Комната ${room}` : 'Подключено'}</h2>
          <div className="grid grid-cols-3 gap-[5px] justify-center w-fit mx-auto">
            {board.map((cell, index) => (
              <div
                key={index}
                onClick={() => gameStarted && isMyTurn && makeMove(index)}
                className={`w-[60px] h-[60px] leading-[60px] text-2xl border border-black ${
                  cell || !isMyTurn ? 'cursor-not-allowed' : 'cursor-pointer'
                } ${cell ? 'bg-gray-100' : 'bg-white'} text-center`}
              >
                {cell}
              </div>
            ))}
          </div>
          {isMyTurn ? <p>Ваш ход ({playerSymbol})</p> : <p>Ожидание хода...</p>}
          <button onClick={resetGame} className="mt-2.5">
            Сбросить игру
          </button>
        </div>
      )} */}
    </div>
  )
}
export default App
