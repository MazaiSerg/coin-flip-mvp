import { useQuery } from 'react-query'
import { bankrollPath } from './apiConfig'
import { BankrollResponse } from '@coin-flip-mvp/crypto-dto/responses/BankrollResponse'

export const useBankrollQuery = () => {
  const keyQuery = `bankroll${new Date()}`
  return useQuery<BankrollResponse>(keyQuery, () => fetch(bankrollPath).then((res) => res.json()))
}
