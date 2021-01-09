import { Injectable } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import cron from 'cron-validate'

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

    if(!!+process.env.ENABLE_STATS_UPDATE || false) {
      let cronResult = cron(this.cron);
      if(cronResult.isValid()) {
        this.cronJob = new CronJob(this.cron, () => this.processJob());
        this.schedulerRegistry.addCronJob(this.cronJobName, this.cronJob);
        this.cronJob.start();
      }
      else {
        console.error(`Invalid cron : ${this.cron}`);
      }
    }
  }

  private async processJob() {

    console.log('Start cron...');

    for(const playerName of this.players) {
      const id = await this.r6Service.getId(this.platform, playerName);

      const result = await Promise.all([
        this.r6Service.getLevelById(this.platform, id),
        this.r6Service.getPlaytimeById(this.platform, id),
        this.r6Service.getRankById(this.platform, id),
        this.r6Service.getStatsById(this.platform, id),
        this.r6Service.getUsername(this.platform, id)
      ]);

      await this.databaseService.savePlayerDoc({
        player: playerName,
        level: result[0],
        playtime: result[1],
        rank: result[2],
        stats: result[3],
        username: result[4]
      });
    }

    console.log('Cron finished !');
  }
}
