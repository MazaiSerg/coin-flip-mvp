import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class RandomizerService {
  @Get('wheel')
  getWheelMultiplier() {
    return 2;
  }

  @Get('coinflip')
  getCoinFlipResult() {
    return true;
  }
}
