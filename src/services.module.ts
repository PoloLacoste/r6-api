import { Module } from '@nestjs/common';

import { CacheService, Database, MongoDatabase, R6Service } from 'r6-api-cacher';

@Module({
  imports: [
  ],
  providers: [
    {
      provide: Database,
      useFactory: () => new MongoDatabase()
    },
    R6Service,
    CacheService
  ],
  exports: [
    Database,
    R6Service,
    CacheService
  ]
})
export class ServicesModule { }