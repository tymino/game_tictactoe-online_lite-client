import React from 'react'

import type { IGameState } from '../App'

import { PlayerInfo } from '../components/PlayerInfo'
import { Figures } from '../components/Figures'

interface IProps {
  socketID: string
  gameState: IGameState
}

export const SectionInfo: React.FC<IProps> = ({ socketID, gameState }) => {
  return (
    <div
      className={`flex ${
        socketID === gameState.player1.socketID && 'flex-row-reverse'
      } justify-between mb-2`}
    >
      <PlayerInfo
        indexForFigure={0}
        name={gameState.player0.name}
        score={gameState.player0.score}
      />

      <div className="text-2xl size-12">
        <p className="mt-3 mb-1 text-base text-cell-border">turn</p>
        <Figures cell={gameState.turn} bgColor="board-bg" />
      </div>

      <PlayerInfo
        indexForFigure={1}
        name={gameState.player1.name}
        score={gameState.player1.score}
        bgColor="board-bg"
      />
    </div>
  )
}
