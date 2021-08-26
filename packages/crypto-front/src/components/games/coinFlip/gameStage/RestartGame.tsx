import React from 'react'
import { useFinishGameQuery } from '../../../../api/useCoinFlipGameQuery'
import { Loader } from '../../../layers/Loader'
import { LoadingError } from '../../../layers/LoadingError'

type RestartGameProps = {
  restartGame: () => void
  gameId: string
  setIsWinner: (isWinner: boolean) => void
}

export const RestartGame = ({ restartGame, gameId, setIsWinner }: RestartGameProps) => {
  const { data, isError, isLoading } = useFinishGameQuery(gameId)
  if (isLoading) {
    return <Loader />
  }

  if (isError || !data) {
    return <LoadingError />
  }
  setIsWinner(data)
  return (
    <div>
      <button onClick={restartGame}>restart</button>
    </div>
  )
}
