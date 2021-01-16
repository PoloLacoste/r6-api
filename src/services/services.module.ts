import { Module } from '@nestjs/common';

import { MongoDatabaseService } from 'src/databases/mongo.database';
import { CacheService } from './cache.service';
import { DatabaseService } from './database.service';
import { R6Service } from './r6.service';

@Module({
  imports: [
  ],
  providers: [
    {
      provide: DatabaseService,
      useFactory: () => new MongoDatabaseService()
    },
    R6Service,
    CacheService
  ],
  exports: [
    DatabaseService,
    R6Service,
    CacheService
  ]
})
export class ServicesModule { }