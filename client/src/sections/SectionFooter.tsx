import React from 'react'

interface IProps {
  roomName: string
}

export const SectionFooter: React.FC<IProps> = ({ roomName }) => {
  return (
    <div className="self-end max-w-2/5 mt-2 text-sm text-player-primary overflow-hidden text-nowrap">
      Room: {roomName}
    </div>
  )
}
