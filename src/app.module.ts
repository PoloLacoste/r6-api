import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';


import { PlatformModule } from './platform.module';
import { R6Service } from './services/r6.service';
import { DatabaseService } from './services/database.service';
import { MongoDatabaseService } from './databases/mongo.database';
import { StatusController } from './controllers/status.controller';
import { UpdateController } from './controllers/update.controller';

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
    UpdateController
  ],
  providers: [
    {
      provide: DatabaseService,
      useFactory: () => new MongoDatabaseService()
    },
    R6Service,
  ],
})
export class AppModule { }
