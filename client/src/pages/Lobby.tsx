import React, { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import Button from '../components/Button'

interface ILobbyProps {
  handleSubmitName: (event: FormEvent<HTMLFormElement>) => void
}

const Lobby: React.FC<ILobbyProps> = ({ handleSubmitName }) => {
  const [name, setName] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h1>Game Lobby</h1>

      <form onSubmit={handleSubmitName}>
        <input
          type="text"
          value={name}
          name="player-name"
          onChange={handleChange}
          placeholder="enter name..."
        />
        <Button type="submit">Go</Button>
      </form>

      <ul>
        <li></li>
      </ul>
    </div>
  )
}

export default Lobby
