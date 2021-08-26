import React, { useEffect, useState } from 'react'
import { GameStage } from '../types'
import { StartGame } from './gameStage/StartGame'
import { GameInfo } from './GameInfo'
import { SpinWheel } from './gameStage/SpinWheel'
import { FinishGame } from './gameStage/FinishGame'
import { RestartGame } from './gameStage/RestartGame'
import { LoadingError } from '../../layers/LoadingError'

type CoinFlipProps = {
  onGameStart: () => void
  login: string
}

export const CoinFlip = ({ onGameStart, login }: CoinFlipProps) => {
  const [gameStage, setGameStage] = useState(GameStage.START)
  const [bet] = useState(1)
  const [gameId, setGameId] = useState<string>()
  const [multiplier, setMultiplier] = useState<number>()
  const [isWinner, setIsWinner] = useState<boolean>()
  const startGame = () => setGameStage(GameStage.WHEEL)
  const spinWheel = () => setGameStage(GameStage.FINISH)
  const finishGame = () => setGameStage(GameStage.RESULT)
  const restartGame = () => setGameStage(GameStage.START)

  useEffect(
    function setDefaultValues() {
      if (gameStage === GameStage.START) {
        setGameId(undefined)
        setMultiplier(undefined)
        setIsWinner(undefined)
        onGameStart()
      }
    },
    [gameStage, onGameStart],
  )

  let queryBody
  const getGameStage = () => {
    switch (gameStage) {
      case GameStage.START:
        return <StartGame startGame={startGame} />
      case GameStage.WHEEL:
        queryBody = {
          login,
          bet,
        }
        return <SpinWheel spinWheel={spinWheel} setGameId={setGameId} queryBody={queryBody} />
      case GameStage.FINISH:
        if (!gameId) {
          return <LoadingError />
        }
        return <FinishGame finishGame={finishGame} setMultiplier={setMultiplier} gameId={gameId} />
      case GameStage.RESULT:
        if (!gameId) {
          return <LoadingError />
        }
        return <RestartGame setIsWinner={setIsWinner} gameId={gameId} restartGame={restartGame} />
    }
  }

  return (
    <div>
      <GameInfo gameId={gameId} bet={1} multiplier={multiplier} isWinner={isWinner} />
      {getGameStage()}
    </div>
  )
}
