import React from 'react'

type StartGameProps = {
  startGame: () => void
}

export const StartGame = ({ startGame }: StartGameProps) => {
  const handleClick = () => {
    startGame()
  }
  return (
    <div>
      <button onClick={handleClick}>Start</button>
    </div>
  )
}
