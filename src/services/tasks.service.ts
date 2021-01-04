import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { R6Service } from './r6.service';
import { DatabaseService } from './database.service';

@Injectable()
export class TasksService {

  players: Array<string>;
  platform: string;

  constructor(
    private readonly r6Service: R6Service,
    private readonly databaseService: DatabaseService
  ) {
    const players = process.env.PLAYERS || '';
    this.players = players.split(',');
    this.platform = process.env.PLATFORM || 'uplay';

  }

  @Cron(process.env.CRON || CronExpression.EVERY_MINUTE)
  saveStats() {
    this.players.forEach(async (playerName) => {
      const stats = await this.r6Service.getStatsByUsername(this.platform, playerName);

      stats.player = playerName;
      await this.databaseService.saveStats(stats);
    });
  }
}
