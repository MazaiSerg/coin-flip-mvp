import { useQuery } from 'react-query'
import { bankrollPath } from './apiConfig'
import { BankrollResponse } from '@coin-flip-mvp/crypto-dto'

export const useBankrollQuery = () => {
  const keyQuery = `bankroll`
  return useQuery<BankrollResponse>(keyQuery, () => fetch(bankrollPath).then((res) => res.json()))
}
