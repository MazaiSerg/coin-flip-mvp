import React from 'react'
import { useStartGameQuery } from '../../../../api/useCoinFlipGameQuery'
import { Loader } from '../../../layers/Loader'
import { LoadingError } from '../../../layers/LoadingError'
import { StartGameDto } from '@coin-flip-mvp/crypto-dto'

type StartGameProps = {
  queryBody: StartGameDto
  spinWheel: () => void
  setGameId: (data: string) => void
}

export const SpinWheel = ({ queryBody, spinWheel, setGameId }: StartGameProps) => {
  const { data, isError, isLoading } = useStartGameQuery(queryBody)
  if (isLoading) {
    return <Loader />
  }

  if (isError || !data) {
    return <LoadingError />
  }
  setGameId(data)

  const handleClick = () => {
    spinWheel()
  }
  return (
    <div>
      <button onClick={handleClick}>Spin wheel</button>
    </div>
  )
}
