import { Controller, Get, Patch } from '@nestjs/common';
import { BankrollService } from '../sevices/bankroll.service';
import { BankrollResponse } from '../dto/BankrollResponse';
import { RandomizerService } from '../sevices/randomizer.service';
import { CoinFlipService } from '../sevices/coinFlip.service';

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
  startGame() {
    const value = 1;
    this.bankrollService.getMoney(value);
    this.coinFlipService.create({
      playersId: '1',
      gameId: GAME_ID,
      betSize: value,
      multiplier: 0,
    });
  }

  @Get('game/wheel')
  rotateWheel() {
    const multiplier = this.randomizerService.getWheelMultiplier();
    this.coinFlipService.addMultiplier('1', multiplier);
    return multiplier;
  }

  @Patch('game/finish')
  finishGame() {
    const { multiplier } = this.coinFlipService.getGameById(GAME_ID);
    const isWinner = this.randomizerService.getCoinFlipResult();
    if (isWinner) {
      this.bankrollService.payMoney(multiplier);
    }
    this.coinFlipService.delete(GAME_ID);
  }
}
