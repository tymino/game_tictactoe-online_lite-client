import React from 'react'

interface IProps {
  className?: string
}

export const Cross: React.FunctionComponent<IProps> = ({ className }) => (
  <div className="relative w-full h-full flex flex-col justify-center items-center">
    <div className="absolute w-full h-full bg-[#A111AA] rounded-b-full"></div>
  </div>
)