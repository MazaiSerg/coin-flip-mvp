import { useQuery } from 'react-query'
import { coinFlipGamePaths } from './apiConfig'
import { StartGameDto } from '@coin-flip-mvp/crypto-fun/dist/dto/requestes/startGameDto'

export const useStartGameQuery = (requestBody: StartGameDto) => {
  const keyQuery = `startGame${new Date()}`
  const options = {
    method: 'PATCH',
    body: JSON.stringify(requestBody),
  }
  return useQuery<string>(keyQuery, () =>
    fetch(coinFlipGamePaths.startPath, options).then((res) => res.json()),
  )
}

export const useLuckyWheelQuery = (gameId: string) => {
  const keyQuery = `wheel${gameId}`
  return useQuery<number>(keyQuery, () =>
    fetch(coinFlipGamePaths.luckyWheelPath).then((res) => res.json()),
  )
}

export const useFinishGameQuery = (gameId: string) => {
  const keyQuery = `finishGame${gameId}`
  return useQuery<boolean>(keyQuery, () =>
    fetch(coinFlipGamePaths.finishPath, { method: 'PATCH' }).then((res) => res.json()),
  )
}
