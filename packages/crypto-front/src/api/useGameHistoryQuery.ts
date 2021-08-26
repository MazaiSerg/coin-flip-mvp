import { useQuery } from 'react-query'
import { coinFlipHistoryPath } from './apiConfig'
import { GameHistory } from '../../../crypto-dto/responses/GameHistory'

export const useGameHistoryQuery = () => {
  const keyQuery = `gameHistory`
  return useQuery<GameHistory>(keyQuery, () => fetch(coinFlipHistoryPath).then((res) => res.json()))
}
