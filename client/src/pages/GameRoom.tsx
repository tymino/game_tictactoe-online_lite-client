import React from 'react'

import type { IGameState } from '../App'

import { Figures } from '../components/Figures'
import PlayerInfo from '../components/PlayerInfo'
import Header from '../components/Header'

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
    return isMyTurn ? 'cursor-pointer' : 'cursor-not-allowed'
  }

  const setStyleShadow = (cell: number | null) => {
    const isPressed = cell === null && isMyTurn

    return `shadow-[-2px_4px_0px_0px] shadow-cell-border ${
      isPressed && `active:shadow-[-2px_2px_0px_0px] active:translate-y-0.5`
    }`
  }

  return (
    <div>
      <Header>Game Room</Header>

      <div className="flex flex-col p-4 bg-board-bg rounded-2xl">
        <div className="flex justify-between mb-2">
          <PlayerInfo
            indexForFigure={0}
            name={gameState.player0.name}
            score={gameState.player0.score}
            side="start"
          />

          <div className="text-2xl size-12">
            <p className="mt-3 mb-1 text-base text-cell-border">turn</p>
            <Figures cell={gameState.turn} bgColor="bg-accent" />
          </div>

          <PlayerInfo
            indexForFigure={1}
            name={gameState.player1.name}
            score={gameState.player1.score}
            side="end"
            bgColor="board-bg"
          />
        </div>

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

        <div className="self-end max-w-2/5 mt-2 text-sm text-player-primary overflow-hidden text-nowrap">
          Room: {gameState.room}
        </div>

        {/* <button onClick={resetGame} className="mt-2.5">
          Сбросить игру
        </button> */}
      </div>
    </div>
  )
}

export default GameRoom
