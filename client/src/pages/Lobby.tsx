import React from 'react'

import { Button } from '../components/Button'
import { Header } from '../components/Header'

interface IProps {
  inputNameValue: string
  playerID: string
  playerName: string
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
  playerList,
  handleChangeName,
  handleSubmitName,
  handleClickReady,
}) => {
  return (
    <div className="flex flex-col">
      <Header>Game Lobby</Header>

      <form
        className="flex flex-col items-center w-[400px]"
        onSubmit={handleSubmitName}
      >
        <div className="flex items-center w-full mb-2.5">
          <label className="capitalize" htmlFor="player-name">
            name: {playerName}
          </label>
          <input
            id="player-name"
            className="grow px-2 py-1 mx-2 box-content border border-gray-300 rounded-md"
            type="text"
            name="player-name"
            autoComplete="off"
            placeholder="enter new name..."
            value={inputNameValue}
            onChange={handleChangeName}
          />

          <Button type="submit" className="">
            Change name
          </Button>
        </div>
      </form>

      <Button type="button" variant="secondary" onClick={handleClickReady}>
        Ready
      </Button>

      <ul className="h-[340px] overflow-auto mt-4 border border-gray-300 pt-4">
        {Object.keys(playerList).map((key) => {
          const playerColor =
            playerID === key ? 'text-green-600' : 'text-yellow-700'

          return (
            <li key={key} className={`${playerColor}`}>
              {playerList[key].name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
