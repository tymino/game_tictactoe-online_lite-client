import React from 'react'

import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { SectionChangeName } from '../sections/SectionChangeName'

interface IProps {
  inputNameValue: string
  playerID: string
  playerName: string
  isReady: boolean
  playerList: {
    [key: string]: { name: string }
  }
  handleChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitName: (event: React.FormEvent<HTMLFormElement>) => void
  handleClickReady: () => void
}

export const Lobby: React.FC<IProps> = ({
  inputNameValue,
  playerID,
  playerName,
  isReady,
  playerList,
  handleChangeName,
  handleSubmitName,
  handleClickReady,
}) => {
  return (
    <div className="flex flex-col">
      <Header>Game Lobby</Header>

      <SectionChangeName
        playerName={playerName}
        inputNameValue={inputNameValue}
        handleChangeName={handleChangeName}
        handleSubmitName={handleSubmitName}
      />

      <div className="px-4 pb-4 bg-board-bg rounded-bl-2xl rounded-br-2xl">
        <Button type="button" variant="primary" onClick={handleClickReady}>
          {isReady ? 'Ready' : 'Not ready'}
        </Button>

        <ul
          className="h-[340px] overflow-auto mt-2 border border-player-accent rounded-md"
          style={{
            scrollbarColor: '#a111aa #7faaeb',
            scrollbarWidth: 'thin',
            scrollbarGutter: 'stable',
          }}
        >
          {Object.keys(playerList).map((key) => {
            const playerColor =
              playerID === key ? 'text-cell-border' : 'text-player-accent'

            return (
              <li
                key={key}
                className={`${playerColor} py-2 mx-2 border-b border-player-accent`}
              >
                {playerList[key].name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
