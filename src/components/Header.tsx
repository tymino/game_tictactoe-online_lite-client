import React from 'react'

interface IProps {
  children: React.ReactNode
}

export const Header: React.FC<IProps> = ({ children }) => {
  return <h1 className="mb-4 text-4xl text-player-accent">{children}</h1>
}
