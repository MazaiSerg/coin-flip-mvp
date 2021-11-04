import { Get, Injectable, Post } from '@nestjs/common';
import { CoinFlipGameHistory } from '../interfaces/coinFlipGameHistory.interface';

@Injectable()
export class CoinFlipGameHistoryService {
  private readonly history: CoinFlipGameHistory[] = [];

  @Post()
  add(game: CoinFlipGameHistory) {
    this.history.push(game);
  }

  @Get()
  getHistory(numberLast = 10) {
    if (numberLast === -1) {
      return this.history.reverse();
    }
    return this.history.reverse().slice(0, numberLast);
  }
}
