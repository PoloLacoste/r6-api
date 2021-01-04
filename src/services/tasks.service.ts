import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { R6Service } from './r6.service';
import { DatabaseService } from './database.service';

@Injectable()
export class TasksService {

  players: Array<string>;

  constructor(
    private readonly r6Service: R6Service,
    private readonly databaseService: DatabaseService
  ) {
    this.players = process.env.PLAYERS.split(',');
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  saveStats() {
    this.players.forEach(async (playerName) => {
      const stats = await this.r6Service.getStatsByUsername('uplay', playerName);

      stats.player = playerName;
      await this.databaseService.saveStats(stats);
    });
  }
}
