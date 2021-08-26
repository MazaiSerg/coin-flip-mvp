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
        login: bankroll.login,
        money: bankroll.money,
      };
    })[0];
  }

  @Get()
  getByLogin(login: string) {
    return this.bankrolls.find((bankroll) => login === bankroll.login);
  }

  @Patch()
  getMoney(login: string, value: number) {
    const index = this.getIndexByLogin(login);
    if (index < 0) {
      return;
    }
    this.bankrolls[index].money -= value;
  }

  @Patch()
  payMoney(login: string, value: number) {
    const index = this.getIndexByLogin(login);
    if (index < 0) {
      return;
    }
    this.bankrolls[index].money += value;
  }

  getIndexByLogin(login: string) {
    return this.bankrolls.findIndex((bankroll) => login === bankroll.login);
  }
}
