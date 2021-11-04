import React from 'react'

type HeaderProps = {
  children: React.ReactNode
}

export const Header = ({ children }: HeaderProps) => {
  return <div>{children}</div>
}
