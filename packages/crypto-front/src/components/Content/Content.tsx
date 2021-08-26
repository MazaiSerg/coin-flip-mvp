import React from 'react'

type ContentProps = {
  children: React.ReactNode
}

export const Content = ({ children }: ContentProps) => {
  return <div>{children}</div>
}
