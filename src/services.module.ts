import { Module } from '@nestjs/common';

import { CacheService, Database, MongoDatabase, R6Service } from 'r6-api-caching';

const cacheService = new CacheService(process.env.REDIS_URL);
const database = new MongoDatabase(process.env.MONGO_URL);
const r6Service = new R6Service(process.env.EMAIL, process.env.PASSWORD, {
  caching: Boolean(JSON.parse(process.env.CACHING || 'false')),
  expiration: parseInt(process.env.EXPIRATION || '60000'),
  cacheService: cacheService,
  database: database
});

@Module({
  imports: [
  ],
  providers: [
    {
      provide: CacheService,
      useValue: cacheService
    },
    {
      provide: Database,
      useValue: database
    },
    {
      provide: R6Service,
      useValue: r6Service
    }
  ],
  exports: [
    Database,
    R6Service,
    CacheService
  ]
})
export class ServicesModule { }