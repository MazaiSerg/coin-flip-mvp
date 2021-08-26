import { CoinFlipGame } from './coinFlipGame.interface';

export interface CoinFlipGameHistory extends CoinFlipGame {
  gameDate: Date;
  isWinner: boolean;
  payment: number;
}
