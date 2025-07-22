import { useMemo } from 'react'

interface IProps {
  isFirstPlayer: boolean
  winner: -1 | 0 | 1 | null
}

export const Modal: React.FC<IProps> = ({ isFirstPlayer, winner }) => {
  const setTextAndColor = useMemo(() => {
    switch (winner) {
      case -1:
        return {
          text: 'draw',
          textColor: 'text-cell-border',
        }
      case 0:
        return {
          text: isFirstPlayer ? 'win' : 'lose',
          textColor: isFirstPlayer
            ? 'text-player-accent'
            : 'text-player-primary',
        }
      case 1:
        return {
          text: isFirstPlayer ? 'lose' : 'win',
          textColor: isFirstPlayer
            ? 'text-player-accent'
            : 'text-player-primary',
        }
      default:
        return {
          text: 'draw',
          textColor: 'text-cell-border',
        }
    }
  }, [isFirstPlayer, winner])

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center select-none">
      <div
        className={`bg-white p-5 rounded-lg shadow-lg shadow-cell-border text-7xl capitalize border-5 border-bg-accent -skew-6 ${setTextAndColor.textColor}`}
      >
        {setTextAndColor.text}
      </div>
    </div>
  )
}
