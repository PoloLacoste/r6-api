import { Injectable } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

import { R6Service } from './r6.service';
import { DatabaseService } from './database.service';

@Injectable()
export class TasksService {

  players: Array<string>;
  platform = process.env.PLATFORM || 'uplay';
  cron = process.env.CRON || CronExpression.EVERY_MINUTE;
  cronJobName = 'stats';
  cronJob: CronJob;

  constructor(
    private readonly r6Service: R6Service,
    private readonly databaseService: DatabaseService,
    private readonly schedulerRegistry: SchedulerRegistry
  ) {
    const players = process.env.PLAYERS || '';
    this.players = players.split(',');

    this.cronJob = new CronJob(this.cron, () => {
      this.players.forEach(async (playerName) => {
        const username = await this.r6Service.getUsername(this.platform, playerName);
        const level = this.r6Service.getLevelById(this.platform, username.id);
        const playtime = this.r6Service.getPlaytimeById(this.platform, username.id);
        const rank = this.r6Service.getRankById(this.platform, username.id);
        const stats = this.r6Service.getStatsByUsername(this.platform, username.id);

        const result = await Promise.all([
          username,
          level,
          playtime,
          rank,
          stats
        ]);
  
        await this.databaseService.savePlayerDoc({
          player: playerName,
          level: result[1],
          playtime: result[2],
          rank: result[3],
          stats: result[4],
          username
        });
      });
    });

    if(!!+process.env.ENABLE_STATS_UPDATE || false) {
      this.schedulerRegistry.addCronJob(this.cronJobName, this.cronJob);
      this.cronJob.start();
    }
  }
}
