import { useQuery } from 'react-query'
import { coinFlipGamePaths } from './apiConfig'

const useStartGameQuery = () => {
  const keyQuery = `startGame${new Date()}`
  return useQuery<string>(keyQuery, () =>
    fetch(coinFlipGamePaths.startPath, { method: 'PATCH' }).then((res) => res.json()),
  )
}

const useLuckyWheelQuery = (gameId: string) => {
  const keyQuery = `wheel${gameId}`
  return useQuery<number>(keyQuery, () =>
    fetch(coinFlipGamePaths.luckyWheelPath).then((res) => res.json()),
  )
}

const useFinishGameQuery = (gameId: string) => {
  const keyQuery = `finishGame${gameId}`
  return useQuery<boolean>(keyQuery, () =>
    fetch(coinFlipGamePaths.finishPath, { method: 'PATCH' }).then((res) => res.json()),
  )
}

export const useCoinFlipGameQuery = {
  useStartGameQuery,
  useLuckyWheelQuery,
  useFinishGameQuery,
}
