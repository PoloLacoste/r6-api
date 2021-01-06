import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { R6Service } from './services/r6.service';
import { TasksService } from './services/tasks.service';
import { DatabaseService } from './services/database.service';
import { IdController } from './controllers/id.controller';
import { StatsController } from './controllers/stats.controller';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  controllers: [
    IdController,
    StatsController,
  ],
  providers: [
    DatabaseService,
    TasksService,
    R6Service,
  ],
})
export class AppModule { }
