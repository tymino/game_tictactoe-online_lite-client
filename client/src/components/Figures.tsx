import React from 'react'

interface IProps {
  cell: number | null
  bgColor?: string
}

export const Figures: React.FC<IProps> = ({ cell, bgColor = 'cell-bg' }) => {
  return (
    <div className="relative size-full flex justify-center items-center">
      {cell === 0 ? (
        <>
          <div className="absolute w-full h-1/8 bg-player-accent rounded-2xl rotate-45" />
          <div className="absolute w-full h-1/8 bg-player-accent rounded-2xl rotate-[-45deg]" />
        </>
      ) : (
        cell === 1 && (
          <>
            <div className="absolute size-4/5 bg-player-primary rounded-full" />
            <div className={`absolute size-3/5 bg-${bgColor} rounded-full`} />
          </>
        )
      )}
    </div>
  )
}
