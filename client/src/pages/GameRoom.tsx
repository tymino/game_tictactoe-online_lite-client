import React from 'react'

import type { IGameState } from '../App'

import { Header } from '../components/Header'
import { SectionInfo } from '../components/SectionInfo'
import { SectionBoard } from '../components/SectionBoard'
import { SectionFooter } from '../components/SectionFooter'

interface IProps {
  socketID: string
  gameState: IGameState
  handleClickMove: (index: number) => void
}

export const GameRoom: React.FC<IProps> = ({
  socketID,
  gameState,
  handleClickMove,
}) => {
  return (
    <div>
      <Header>Game Room</Header>

      <div className="flex flex-col p-4 bg-board-bg rounded-2xl">
        <SectionInfo socketID={socketID} gameState={gameState} />

        <SectionBoard
          socketID={socketID}
          gameState={gameState}
          handleClickMove={handleClickMove}
        />

        <SectionFooter roomName={gameState.room} />

        {/* <button onClick={resetGame} className="mt-2.5">
          Сбросить игру
        </button> */}
      </div>
    </div>
  )
}
