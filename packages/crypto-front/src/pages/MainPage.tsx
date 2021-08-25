import React, { useCallback, useEffect, useState } from 'react'
import { useBankrollQuery } from '../api/useBankrollQuery'
import { CoinFlip } from '../components/games/coinFlip/CoinFlip'
import { Loader } from '../components/layers/Loader'
import { LoadingError } from '../components/layers/LoadingError'
import { BankrollResponse } from '@coin-flip-mvp/crypto-fun/dist/dto/BankrollResponse'

export const MainPage = () => {
  const [account, setAccount] = useState<BankrollResponse>()
  const { data, isLoading, isError, refetch } = useBankrollQuery()

  useEffect(
    function setAccountByData() {
      setAccount(data)
    },
    [data],
  )

  const refetchAccountData = useCallback(async () => {
    const { data, isError } = await refetch()
    if (isError) {
      return
    }
    setAccount(data)
  }, [refetch])

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
        <CoinFlip refetchAccountData={refetchAccountData} login={account.name} />
      </div>
    </>
  )
}
