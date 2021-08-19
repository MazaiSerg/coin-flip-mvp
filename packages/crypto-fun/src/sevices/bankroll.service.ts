import { Get, Injectable, Patch, Post } from '@nestjs/common';
import { Bankroll } from '../interfaces/bankroll.interface';

@Injectable()
export class BankrollService {
  private readonly bankrolls: Bankroll[] = [
    {
      login: 'Baaaaad boy',
      password: '1111',
      token: '',
      money: 40,
    },
  ];

  @Post()
  create(bankroll: Bankroll) {
    this.bankrolls.push(bankroll);
  }

  @Get()
  get() {
    return this.bankrolls.map((bankroll) => {
      return {
        name: bankroll.login,
        money: bankroll.money,
      };
    })[0];
  }

  @Patch()
  getMoney(value: number) {
    this.bankrolls[0].money -= value;
  }

  @Patch()
  payMoney(value: number) {
    this.bankrolls[0].money -= value;
  }
}
