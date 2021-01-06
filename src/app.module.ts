import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { R6Service } from './services/r6.service';
import { TasksService } from './services/tasks.service';
import { DatabaseService } from './services/database.service';
import { IdController } from './controllers/id.controller';
import { LevelController } from './controllers/level.controller';
import { PlaytimeController } from './controllers/playtime.controller';
import { RankController } from './controllers/rank.controller';
import { StatsController } from './controllers/stats.controller';
import { StatusController } from './controllers/status.controller';
import { UsernameController } from './controllers/username.controller';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  controllers: [
    IdController,
    LevelController,
    PlaytimeController,
    RankController,
    StatsController,
    StatusController,
    UsernameController,
  ],
  providers: [
    DatabaseService,
    TasksService,
    R6Service,
  ],
})
export class AppModule { }
