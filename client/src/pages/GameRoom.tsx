import React from 'react'
import type { IGameState } from '../App'

interface IProps {
  socketID: string
  gameState: IGameState
  handleClickMove: (index: number) => void
}

const GameRoom: React.FC<IProps> = ({
  socketID,
  gameState,
  handleClickMove,
}) => {
  const isMyTurn =
    gameState.turn === 0
      ? socketID === gameState.player0.socketID
      : socketID === gameState.player1.socketID

  return (
    <div>
      <h1>Game Room</h1>

      <div>
        <h2>Игра: {`Комната ${gameState.room}`}</h2>

        <div className="grid grid-cols-3 gap-[5px] justify-center w-fit mx-auto">
          {gameState.board.map((cell, index) => (
            <div
              key={index}
              onClick={() => isMyTurn && handleClickMove(index)}
              className={`w-[60px] h-[60px] leading-[60px] text-2xl border border-black ${
                cell || !isMyTurn ? 'cursor-not-allowed' : 'cursor-pointer'
              } ${cell ? 'bg-gray-100' : 'bg-white'} text-center`}
            >
              {cell}
            </div>
          ))}
        </div>
        {isMyTurn ? <p>Ваш ход</p> : <p>Ожидание хода...</p>}
        {/* <button onClick={resetGame} className="mt-2.5">
          Сбросить игру
        </button> */}
      </div>
    </div>
  )
}

export default GameRoom
