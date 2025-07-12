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
        className="flex flex-col w-[320px] mb-4"
        onSubmit={handleSubmitName}
      >
        <div className="flex flex-col w-full ">
          <label className="mb-1 capitalize" htmlFor="player-name">
            name: {playerName}
          </label>
          <input
            id="player-name"
            className="grow px-2 py-1 mb-1 box-content border border-gray-300 rounded-md"
            type="text"
            name="player-name"
            autoComplete="off"
            placeholder="enter new name..."
            value={inputNameValue}
            onChange={handleChangeName}
          />
        </div>

        <Button type="submit" className="">
          Change name
        </Button>
      </form>

      <Button type="button" variant="secondary" onClick={handleClickReady}>
        Ready
      </Button>

      <ul className="h-[340px] overflow-auto mt-2 border border-gray-300 pt-4">
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
