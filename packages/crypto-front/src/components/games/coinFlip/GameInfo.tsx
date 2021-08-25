import React from 'react'

type GameInfoType = {
  gameId?: string
  bet?: number
  multiplier?: number
  isWinner?: boolean
}

export const GameInfo = ({ gameId, bet, multiplier, isWinner }: GameInfoType) => {
  return (
    <div>
      {gameId && (
        <div>
          <span>{`game: ${gameId}`}</span>
        </div>
      )}
      {bet && (
        <div>
          <span>{`bet: ${bet}`}</span>
        </div>
      )}
      {multiplier && (
        <div>
          <span>{`multiplier: ${multiplier}`}</span>
        </div>
      )}
      {isWinner !== undefined && (
        <div>
          <span>{isWinner ? 'you win' : 'you lose'}</span>
        </div>
      )}
    </div>
  )
}
