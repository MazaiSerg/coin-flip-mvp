import React from 'react'
import { useCoinFlipGameQuery } from '../../../../api/useCoinFlipGameQuery'

type RestartGameProps = {
  restartGame: () => void
  gameId: string
  setIsWinner: (isWinner: boolean) => void
}

export const RestartGame = ({ restartGame, gameId, setIsWinner }: RestartGameProps) => {
  const { useFinishGameQuery } = useCoinFlipGameQuery
  const { data, isError, isLoading } = useFinishGameQuery(gameId)
  if (isLoading) {
    return <span>isLoading</span>
  }

  if (isError || !data) {
    return <span>error</span>
  }
  setIsWinner(data)
  return (
    <div>
      <button onClick={restartGame}>restart</button>
    </div>
  )
}
