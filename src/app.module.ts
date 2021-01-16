import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';


import { PlatformModule } from './platform.module';
import { ServicesModule } from './services/services.module';

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
    ServicesModule
  ],
  controllers: [
    StatusController,
  ],
})
export class AppModule { }
