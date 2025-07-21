interface IProps {
  isFirstPlayer: boolean
  winner: -1 | 0 | 1 | null
}

export const Modal: React.FC<IProps> = ({ isFirstPlayer, winner }) => {
  const textModal =
    winner === -1 ? 'draw' : winner !== null && isFirstPlayer ? 'win' : 'lose'

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center border">
      <div className="bg-white p-5 rounded-lg shadow-lg shadow-cell-border text-7xl text-player-accent capitalize border-5 border-bg-accent -skew-6">
        {textModal}
      </div>
    </div>
  )
}
