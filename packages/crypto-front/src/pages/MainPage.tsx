import React from 'react'
import { useBankrollQuery } from '../api/useBankrollQuery'
import { CoinFlip } from '../components/games/coinFlip/CoinFlip'

export const MainPage = () => {
  const bankrollQuery = useBankrollQuery()
  const { data: account, isLoading, isError } = bankrollQuery
  if (isLoading) {
    return <span>Loading</span>
  }
  if (isError || !account) {
    return <span>NotFounded</span>
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
