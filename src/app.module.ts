import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { PlatformModule } from './platform.module';
import { ServicesModule } from './services.module';

import { StatusController } from './controllers/status.controller';

@Module({
  imports: [
    RouterModule.register([
      {
        path: '/:platform',
        module: PlatformModule,
      }
    ]),
    PlatformModule,
    ServicesModule
  ],
  controllers: [
    StatusController,
  ],
})
export class AppModule { }
