import { Module } from '@nestjs/common';
import { CoinFlipController } from './controller/coinFlip.controller';
import { BankrollService } from './sevices/bankroll.service';
import { RandomizerService } from './sevices/randomizer.service';
import { CoinFlipService } from './sevices/coinFlip.service';
import { CoinFlipGameHistoryService } from './sevices/coinFlipGameHistory.service';

@Module({
  imports: [],
  controllers: [CoinFlipController],
  providers: [
    BankrollService,
    RandomizerService,
    CoinFlipService,
    CoinFlipGameHistoryService,
  ],
})
export class AppModule {}
