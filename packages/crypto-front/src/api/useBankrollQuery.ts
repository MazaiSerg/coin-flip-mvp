import { useQuery } from 'react-query'
import { BankrollResponse } from './dto/BankrollResponse'
import { bankrollPath } from './apiConfig'

export const useBankrollQuery = () => {
  const keyQuery = `bankroll${new Date()}`
  return useQuery<BankrollResponse>(keyQuery, () => fetch(bankrollPath).then((res) => res.json()))
}
