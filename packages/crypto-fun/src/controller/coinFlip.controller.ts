import { Body, Controller, Get, Patch, Post, Redirect } from '@nestjs/common';
import { BankrollService } from '../sevices/bankroll.service';
import { RandomizerService } from '../sevices/randomizer.service';
import { CoinFlipService } from '../sevices/coinFlip.service';
import { BankrollResponse } from '@coin-flip-mvp/crypto-dto/responses/BankrollResponse';
import { StartGameDto } from '@coin-flip-mvp/crypto-dto/requestes/StartGameDto';
import { CoinFlipGameHistory } from '../interfaces/coinFlipGameHistory.interface';
import { GameHistoryGameParamsDto } from '../../../crypto-dto/requestes/GameHistoryGameParamsDto';
import { CoinFlipGameHistoryService } from '../sevices/coinFlipGameHistory.service';

const GAME_ID = '1';

@Controller('coinflip')
export class CoinFlipController {
  constructor(
    private readonly bankrollService: BankrollService,
    private readonly randomizerService: RandomizerService,
    private readonly coinFlipService: CoinFlipService,
    private readonly historyService: CoinFlipGameHistoryService,
  ) {}

  @Get()
  getBankroll(): BankrollResponse {
    return this.bankrollService.get();
  }

  @Patch('game/start')
  startGame(@Body() { login, bet }: StartGameDto) {
    this.bankrollService.getMoney(login, bet);
    this.coinFlipService.create({
      login: login,
      gameId: GAME_ID,
      betSize: bet,
      multiplier: 0,
    });
    return GAME_ID;
  }

  @Get('game/wheel')
  rotateWheel() {
    const multiplier = this.randomizerService.getWheelMultiplier();
    this.coinFlipService.addMultiplier('1', multiplier);
    return multiplier;
  }

  @Get('game/finish')
  finishGame() {
    const game = this.coinFlipService.getGameById(GAME_ID);
    if (!game) {
      return;
    }
    const { multiplier, betSize, login } = game;
    const payment = multiplier * betSize;
    const isWinner = this.randomizerService.getCoinFlipResult();
    if (isWinner) {
      this.bankrollService.payMoney(login, payment);
    }
    this.addGameToHistory({
      isWinner,
      payment,
      gameDate: new Date(),
      ...game,
    });
    this.coinFlipService.delete(GAME_ID);
    return isWinner;
  }

  private addGameToHistory(@Body() game: CoinFlipGameHistory) {
    this.historyService.add(game);
  }

  @Get('history')
  getCoinFlipGamesHistory(@Body() { numberGames }: GameHistoryGameParamsDto) {
    return this.historyService.getHistory(numberGames);
  }
}
