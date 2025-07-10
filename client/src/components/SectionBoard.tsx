import React from 'react'

import type { IGameState } from '../App'

import { Figures } from './Figures'

interface IProps {
  socketID: string
  gameState: IGameState
  handleClickMove: (index: number) => void
}

export const SectionBoard: React.FC<IProps> = ({
  socketID,
  gameState,
  handleClickMove,
}) => {
  const isMyTurn =
    gameState.turn === 0
      ? socketID === gameState.player0.socketID
      : socketID === gameState.player1.socketID

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const buttonIndex = Number(event.currentTarget.dataset.index)

    if (gameState.board[buttonIndex] === null && isMyTurn) {
      console.log('click move', buttonIndex)
      handleClickMove(buttonIndex)
    }
  }

  const setStyleCursor = () => {
    return isMyTurn ? 'cursor-pointer' : 'cursor-not-allowed'
  }

  const setStyleShadow = (cell: number | null) => {
    const isPressed = cell === null && isMyTurn

    return `shadow-[-2px_4px_0px_0px] shadow-cell-border ${
      isPressed && `active:shadow-[-2px_2px_0px_0px] active:translate-y-0.5`
    }`
  }

  return (
    <div className="grid grid-cols-3 gap-2.5 justify-center w-fit mx-auto">
      {gameState.board.map((cell, index) => (
        <div
          key={index}
          onClick={handleClick}
          data-index={index}
          className={`transition w-28 h-28 bg-cell-bg border-4 rounded-2xl border-cell-border ${setStyleShadow(
            cell,
          )} ${setStyleCursor()}`}
        >
          <Figures cell={cell} />
        </div>
      ))}
    </div>
  )
}
