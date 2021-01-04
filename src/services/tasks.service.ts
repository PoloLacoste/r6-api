import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { R6Service } from './r6.service';

@Injectable()
export class TasksService {

  players: Array<string>;

  constructor(
    private readonly r6Service: R6Service
  ) {
    this.players = process.env.PLAYERS.split(',');
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  saveStats() {
    this.players.forEach(async (playerName) => {
      console.log(await this.r6Service.getId('uplay', playerName));
    });
  }
}
