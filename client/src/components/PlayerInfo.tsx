import React from 'react'

import { Figures } from './Figures'

interface IProps {
  indexForFigure: number
  name: string
  score: number
  side: 'start' | 'end'
  bgColor?: string
}

const PlayerInfo: React.FC<IProps> = ({
  indexForFigure,
  name,
  score,
  side,
  bgColor,
}) => {
  return (
    <div className={`flex max-w-28 flex-col items-${side}`}>
      <div className="text-cell-border">
        <h3>{name}</h3>
        <p className={`text-${side}`}>Score: {score}</p>
      </div>

      <div className="w-10 h-10">
        <Figures cell={indexForFigure} bgColor={bgColor} />
      </div>
    </div>
  )
}

export default PlayerInfo
