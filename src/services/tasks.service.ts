import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

import { R6Service } from './r6.service';
import { DatabaseService } from './database.service';
import { CronJob } from 'cron';

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
        const stats = await this.r6Service.getStatsByUsername(this.platform, playerName);
  
        stats.player = playerName;
        await this.databaseService.saveStats(stats);
      });
    });

    if(!!+process.env.ENABLE_STATS_UPDATE || false) {
      this.schedulerRegistry.addCronJob(this.cronJobName, this.cronJob);
      this.cronJob.start();
    }
  }
}
