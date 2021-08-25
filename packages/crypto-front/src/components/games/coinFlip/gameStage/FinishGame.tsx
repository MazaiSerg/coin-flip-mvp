import React from 'react'
import { useLuckyWheelQuery } from '../../../../api/useCoinFlipGameQuery'
import { Loader } from '../../../layers/Loader'
import { LoadingError } from '../../../layers/LoadingError'

type FinishGameProps = {
  finishGame: () => void
  setMultiplier: (multiplier: number) => void
  gameId: string
}

export const FinishGame = ({ finishGame, setMultiplier, gameId }: FinishGameProps) => {
  const { data, isError, isLoading } = useLuckyWheelQuery(gameId)
  if (isLoading) {
    return <Loader />
  }

  if (isError || !data) {
    return <LoadingError />
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
