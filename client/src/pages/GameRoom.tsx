import React from 'react'

import { Cross } from '../components/Figures'

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

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMyTurn) {
      console.log('click move')
      const buttonIndex = Number(event.currentTarget.dataset.index)
      handleClickMove(buttonIndex)
    }
  }

  const setStyleCursor = () => {
    return !isMyTurn ? 'cursor-pointer' : 'cursor-not-allowed'
  }

  const setStyleShadow = (cell: number | null) => {
    return `shadow-[-2px_4px_0px_0px] shadow-[#bb4d00] ${
      cell ?? `active:shadow-[-2px_2px_0px_0px] active:translate-y-0.5`
    }`
  }

  return (
    <div>
      <h1 className="text-4xl">Game Room</h1>

      <div>
        <div className="font-chewy text-2xl">Room: {gameState.room}</div>

        <div className="grid grid-cols-3 gap-2.5 justify-center w-fit p-4 mx-auto bg-[#3299C5] rounded-2xl">
          {gameState.board.map((cell, index) => (
            <div
              key={index}
              onClick={handleClick}
              data-index={index}
              className={`transition w-28 h-28 bg-[#fd9a00] border-4 rounded-2xl border-[#bb4d00] ${setStyleShadow(
                cell,
              )} ${setStyleCursor()}`}
            >
              <Cross cell={cell} />
            </div>
          ))}
        </div>
        <div className="text-2xl font-chewy">
          {isMyTurn ? <p>your turn</p> : <p>waiting...</p>}
        </div>
        {/* <button onClick={resetGame} className="mt-2.5">
          Сбросить игру
        </button> */}
      </div>
    </div>
  )
}

export default GameRoom
