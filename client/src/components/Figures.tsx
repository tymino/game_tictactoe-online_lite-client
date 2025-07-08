import React from 'react'

interface IProps {
  cell: number | null
}

export const Cross: React.FC<IProps> = ({ cell }) => {
  return (
    <div className="relative size-full flex justify-center items-center">
      {cell === 0 ? (
        <>
          <div className="absolute w-full h-3 bg-[#A111AA] rounded-2xl rotate-45" />
          <div className="absolute w-full h-3 bg-[#A111AA] rounded-2xl rotate-[-45deg]" />
        </>
      ) : (
        cell === 1 && (
          <>
            <div className="absolute size-4/5 bg-[#003FA9] rounded-full" />
            <div className="absolute size-3/5 bg-amber-500 rounded-full" />
          </>
        )
      )}
    </div>
  )
}
