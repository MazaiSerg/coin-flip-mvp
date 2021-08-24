import React from 'react'
import { useCoinFlipGameQuery } from '../../../../api/useCoinFlipGameQuery'

type StartGameProps = {
  spinWheel: () => void
  setGameId: (data: string) => void
}

export const SpinWheel = ({ spinWheel, setGameId }: StartGameProps) => {
  const { useStartGameQuery } = useCoinFlipGameQuery
  const { data, isError, isLoading } = useStartGameQuery()
  if (isLoading) {
    return <span>isLoading</span>
  }
  if (isError || !data) {
    return <span>error</span>
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
