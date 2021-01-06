import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RouterModule, Routes } from 'nest-router';


import { PlatformModule } from './platform.module';
import { R6Service } from './services/r6.service';
import { TasksService } from './services/tasks.service';
import { DatabaseService } from './services/database.service';
import { StatusController } from './controllers/status.controller';

const routes: Routes = [
  {
    path: '/:platform',
    module: PlatformModule,
  }
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ScheduleModule.forRoot(),
    PlatformModule,
  ],
  controllers: [
    StatusController,
  ],
  providers: [
    DatabaseService,
    TasksService,
    R6Service,
  ],
})
export class AppModule { }
