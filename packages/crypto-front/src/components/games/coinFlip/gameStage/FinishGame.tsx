import React from 'react'
import { useCoinFlipGameQuery } from '../../../../api/useCoinFlipGameQuery'

type FinishGameProps = {
  finishGame: () => void
  setMultiplier: (multiplier: number) => void
  gameId: string
}

export const FinishGame = ({ finishGame, setMultiplier, gameId }: FinishGameProps) => {
  const { useLuckyWheelQuery } = useCoinFlipGameQuery
  const { data, isError, isLoading } = useLuckyWheelQuery(gameId)
  if (isLoading) {
    return <span>isLoading</span>
  }

  if (isError || !data) {
    return <span>error</span>
  }
  setMultiplier(data)
  const handleClick = () => {
    finishGame()
  }
  return (
    <div>
      <button onClick={handleClick}>Coin flip</button>
    </div>
  )
}
