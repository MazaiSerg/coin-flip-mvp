import React, { useCallback, useEffect, useState } from 'react'
import { useBankrollQuery } from '../api/useBankrollQuery'
import { CoinFlip } from '../components/games/coinFlip/CoinFlip'
import { Loader } from '../components/layers/Loader'
import { LoadingError } from '../components/layers/LoadingError'
import { BankrollResponse } from '@coin-flip-mvp/crypto-dto/responses/BankrollResponse'
import { useGameHistoryQuery } from '../api/useGameHistoryQuery'

export const MainPage = () => {
  const [account, setAccount] = useState<BankrollResponse>()
  const { data, isLoading, isError, refetch } = useBankrollQuery()
  const { data: history, refetch: refetchHistory } = useGameHistoryQuery()

  useEffect(() => {
    console.log(history)
  }, [history])

  useEffect(
    function setAccountByData() {
      setAccount(data)
    },
    [data],
  )

  const handleGameStart = useCallback(
    async function refetchAccountData() {
      const { data, isError } = await refetch()
      if (isError) {
        return
      }
      setAccount(data)
      refetchHistory()
    },
    [refetch, refetchHistory],
  )

  if (isLoading) {
    return <Loader />
  }
  if (isError || !account) {
    return <LoadingError />
  }

  return (
    <>
      <div>
        <span>{`Name: ${account.login}`}</span>
      </div>
      <div>
        <span>{`balance: ${account.money}`}</span>
      </div>
      <div>
        <CoinFlip onGameStart={handleGameStart} login={account.login} />
      </div>
    </>
  )
}
