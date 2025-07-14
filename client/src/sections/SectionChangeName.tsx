import React from 'react'

import { Button } from '../components/Button'

interface IProps {
  playerName: string
  inputNameValue: string
  handleChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitName: (event: React.FormEvent<HTMLFormElement>) => void
}

export const SectionChangeName: React.FC<IProps> = ({
  playerName,
  inputNameValue,
  handleChangeName,
  handleSubmitName,
}) => {
  return (
    <form
      className="flex flex-col w-[320px] p-4 bg-board-bg rounded-tl-2xl rounded-tr-2xl"
      onSubmit={handleSubmitName}
    >
      <div className="flex flex-col w-full ">
        <label
          className="mb-1 text-cell-border capitalize"
          htmlFor="player-name"
        >
          name: {playerName}
        </label>
        <input
          id="player-name"
          className="grow px-2 py-1 mb-1 box-content border border-player-accent focus:border-cell-bg rounded-md text-cell-border outline-0 hover:border-cell-bg transition-border duration-200 ease-in-out"
          type="text"
          name="player-name"
          autoComplete="off"
          placeholder="enter new name..."
          value={inputNameValue}
          onChange={handleChangeName}
        />
      </div>

      <Button
        type="submit"
        variant="secondary"
        disabled={inputNameValue.length === 0}
      >
        Change name
      </Button>
    </form>
  )
}
