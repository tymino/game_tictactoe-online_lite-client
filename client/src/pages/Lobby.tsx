import React from 'react'

import Button from '../components/Button'

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

const Lobby: React.FC<IProps> = ({
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
      <h1 className="mb-3 text-3xl">Game Lobby</h1>

      <p className="mb-1.5">Your name: {playerName}</p>

      <form
        onSubmit={handleSubmitName}
        className="w-[400px] flex flex-col mb-5"
      >
        <input
          className="box-content border border-gray-300 rounded-md px-2 py-1 mb-4 mr-1"
          type="text"
          name="player-name"
          autoComplete="off"
          placeholder="enter new name..."
          value={inputNameValue}
          onChange={handleChangeName}
        />
        <Button type="submit">Change name</Button>
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

export default Lobby
