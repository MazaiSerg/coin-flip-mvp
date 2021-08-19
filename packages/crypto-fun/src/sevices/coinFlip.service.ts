import { Delete, Get, Injectable, Patch, Post } from '@nestjs/common';
import { CoinFlipGame } from '../interfaces/coinFlipGame.interface';

@Injectable()
export class CoinFlipService {
  private readonly coinFlipGames: CoinFlipGame[] = [];

  @Post()
  create(game: CoinFlipGame) {
    this.coinFlipGames.push(game);
  }

  @Delete()
  delete(gameId: string) {
    const index = this.coinFlipGames.findIndex(
      (game) => game.gameId === gameId,
    );
    if (index > -1) {
      this.coinFlipGames.splice(index, 1);
    }
  }

  @Patch()
  addMultiplier(gameId: string, multiplier: number) {
    const index = this.coinFlipGames.findIndex(
      (game) => game.gameId === gameId,
    );
    if (index > -1) {
      this.coinFlipGames[index].multiplier = multiplier;
    }
  }

  @Get()
  getGameById(gameId: string) {
    const index = this.coinFlipGames.findIndex(
      (game) => game.gameId === gameId,
    );
    if (index > -1) {
      return this.coinFlipGames[index];
    }
    return null;
  }
}
