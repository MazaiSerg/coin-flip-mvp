import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './sevices/app.service';
import { CoinFlipController } from './controller/coinFlip.controller';
import { BankrollService } from './sevices/bankroll.service';
import { RandomizerService } from './sevices/randomizer.service';
import { CoinFlipService } from './sevices/coinFlip.service';

@Module({
  imports: [],
  controllers: [AppController, CoinFlipController],
  providers: [AppService, BankrollService, RandomizerService, CoinFlipService],
})
export class AppModule {}
