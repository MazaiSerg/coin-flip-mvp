import { Controller, Get } from '@nestjs/common';
import { RandomizerService } from '../sevices/randomizer.service';

@Controller('randomizer')
export class RandomizerController {
  constructor(private readonly randomizerService: RandomizerService) {}

  @Get('wheel')
  getWheelMultiplier(): number {
    return this.randomizerService.getWheelMultiplier();
  }

  @Get('coinflip')
  getCoinFlipResult(): boolean {
    return this.randomizerService.getCoinFlipResult();
  }
}
