import React, { useEffect, useState } from 'react'
import { GameStage } from '../types'
import { StartGame } from './gameStage/StartGame'
import { GameInfo } from './GameInfo'
import { SpinWheel } from './gameStage/SpinWheel'
import { FinishGame } from './gameStage/FinishGame'
import { RestartGame } from './gameStage/RestartGame'

export const CoinFlip = () => {
  const [gameStage, setGameStage] = useState(GameStage.START)
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
      }
    },
    [gameStage],
  )

  const getGameStage = () => {
    switch (gameStage) {
      case GameStage.START:
        return <StartGame startGame={startGame} />
      case GameStage.WHEEL:
        return <SpinWheel spinWheel={spinWheel} setGameId={setGameId} />
      case GameStage.FINISH:
        if (!gameId) {
          return <span>error</span>
        }
        return <FinishGame finishGame={finishGame} setMultiplier={setMultiplier} gameId={gameId} />
      case GameStage.RESULT:
        if (!gameId) {
          return <span>error</span>
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
