import React from 'react'
import { useBankrollQuery } from '../api/useBankrollQuery'
import { CoinFlip } from '../components/games/coinFlip/CoinFlip'
import { Loader } from '../components/layers/Loader'
import { LoadingError } from '../components/layers/LoadingError'

export const MainPage = () => {
  const bankrollQuery = useBankrollQuery()
  const { data: account, isLoading, isError } = bankrollQuery
  if (isLoading) {
    return <Loader />
  }
  if (isError || !account) {
    return <LoadingError />
  }

  return (
    <>
      <div>
        <span>{`Name: ${account.name}`}</span>
      </div>
      <div>
        <span>{`balance: ${account.money}`}</span>
      </div>
      <div>
        <CoinFlip />
      </div>
    </>
  )
}
