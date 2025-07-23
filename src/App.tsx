import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

import { GameRoom } from './pages/GameRoom'
import { Lobby } from './pages/Lobby'

const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000'

const socket: Socket = io(URL)

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
  winner: -1 | 0 | 1 | null
}

export const App = () => {
  const [inputNameValue, setInputNameValue] = useState<string>('')
  const [socketID, setSocketID] = useState<string>('')
  const [playerName, setPlayerName] = useState<string>('')
  const [isReady, setIsReady] = useState<boolean>(false)
  const [playerList, setPlayerList] = useState({})

  const [game, setGame] = useState<IGameState | null>(null)

  useEffect(() => {
    socket.on('lobby:update', (players) => {
      console.log('lobby:update', socket.id)

      if (socket.id) {
        setSocketID(socket.id)
        setPlayerName(players[socket.id]?.name)
        setPlayerList(players)
      }
    })

    socket.on('game:start', (gameState: IGameState) => {
      console.log('game:start', gameState.room)
      setGame(gameState)
      setIsReady(false)
    })

    socket.on('game:update', (gameState: IGameState) => {
      console.log('game:update', gameState.room)
      setGame(gameState)
    })

    socket.on('game:close', () => {
      console.log('game:disconect')
      setGame(null)

      socket.emit('lobby:join')
    })

    // Очистка слушателей при размонтировании компоненты
    return () => {
      socket.off('lobby:update')
      socket.off('game:start')
      socket.off('game:update')
      socket.off('game:close')
    }
  })

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

    socket.emit('player:ready', (value: boolean) => {
      // console.log('player is ready:', value)
      setIsReady(value)
    })
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
          isReady={isReady}
          playerList={playerList}
          handleChangeName={handleChangeName}
          handleSubmitName={handleSubmitName}
          handleClickReady={handleClickReady}
        />
      )}
    </div>
  )
}
