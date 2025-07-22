import React from 'react'

import { Figures } from './Figures'

interface IProps {
  indexForFigure: number
  name: string
  score: number
  bgColor?: string
}

export const PlayerInfo: React.FC<IProps> = ({
  indexForFigure,
  name,
  score,
  bgColor,
}) => {
  return (
    <div className="flex max-w-28 w-full flex-col items-center text-cell-border">
      <div className="">
        <h3>{name}</h3>
        <p>Score: {score}</p>
      </div>

      <div className="w-10 h-10">
        <Figures cell={indexForFigure} bgColor={bgColor} />
      </div>
    </div>
  )
}
