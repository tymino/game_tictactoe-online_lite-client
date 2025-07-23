import React from 'react'

import type { IGameState } from '../App'

import { Header } from '../components/Header'
import { Modal } from '../components/Modal'

import { SectionInfo } from '../sections/SectionInfo'
import { SectionBoard } from '../sections/SectionBoard'
import { SectionFooter } from '../sections/SectionFooter'

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
    <div className="relative">
      <Header>Game Room</Header>

      <div className="flex flex-col p-4 bg-board-bg rounded-2xl">
        <SectionInfo socketID={socketID} gameState={gameState} />

        <SectionBoard
          socketID={socketID}
          gameState={gameState}
          handleClickMove={handleClickMove}
        />

        <SectionFooter roomName={gameState.room} />

        {gameState.winner !== null && (
          <Modal
            isFirstPlayer={socketID === gameState.player0.socketID}
            winner={gameState.winner}
          />
        )}
      </div>
    </div>
  )
}
