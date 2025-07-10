import React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseStyles =
    'px-3 py-1 rounded-md font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secondary:
      'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100',
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
