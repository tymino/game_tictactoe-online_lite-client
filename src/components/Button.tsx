import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const baseStyles =
    'w-full px-3 py-1 rounded-md font-medium transition-colors duration-200 ease-in-out cursor-pointer active:translate-y-0.5 disabled:cursor-default disabled:opacity-50'

  const variants = {
    primary:
      'bg-player-accent text-board-bg hover:grayscale-25 disabled:grayscale-0',
    secondary:
      'text-player-accent border border-player-accent hover:border-cell-bg hover:text-cell-bg disabled:text-player-accent disabled:border-player-accent',
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className} `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
