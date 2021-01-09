import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';


import { PlatformModule } from './platform.module';
import { R6Service } from './services/r6.service';
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
    PlatformModule,
  ],
  controllers: [
    StatusController,
  ],
  providers: [
    DatabaseService,
    R6Service,
  ],
})
export class AppModule { }
