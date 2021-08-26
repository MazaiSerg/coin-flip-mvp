import { Body, Controller, Get, Patch } from '@nestjs/common';
import { BankrollService } from '../sevices/bankroll.service';
import { RandomizerService } from '../sevices/randomizer.service';
import { CoinFlipService } from '../sevices/coinFlip.service';
import { BankrollResponse } from '@coin-flip-mvp/crypto-dto/responses/BankrollResponse';
import { StartGameDto } from '@coin-flip-mvp/crypto-dto/requestes/StartGameDto';

const GAME_ID = '1';

@Controller('coinflip')
export class CoinFlipController {
  constructor(
    private readonly bankrollService: BankrollService,
    private readonly randomizerService: RandomizerService,
    private readonly coinFlipService: CoinFlipService,
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

  @Patch('game/finish')
  finishGame() {
    const { multiplier, betSize, login } =
      this.coinFlipService.getGameById(GAME_ID);
    const payment = multiplier * betSize;
    const isWinner = this.randomizerService.getCoinFlipResult();
    if (isWinner) {
      this.bankrollService.payMoney(login, payment);
    }
    this.coinFlipService.delete(GAME_ID);
  }
}
