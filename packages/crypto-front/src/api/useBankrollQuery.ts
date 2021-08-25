import { useQuery } from 'react-query'
import { bankrollPath } from './apiConfig'
import { BankrollResponse } from '@coin-flip-mvp/crypto-fun/dist/dto/BankrollResponse'

export const useBankrollQuery = () => {
  const keyQuery = `bankroll${new Date()}`
  return useQuery<BankrollResponse>(keyQuery, () => fetch(bankrollPath).then((res) => res.json()))
}
