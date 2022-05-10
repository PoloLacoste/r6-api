import { Module } from '@nestjs/common';

import { CacheService, MongoDatabase, R6Service } from 'r6-api-caching';

@Module({
  imports: [
  ],
  providers: [
    {
      provide: R6Service,
      useFactory: async () => {
        const cacheService = new CacheService(process.env.REDIS_URL);
        const database = new MongoDatabase(process.env.MONGO_URL);
        const r6Service = new R6Service(process.env.EMAIL, process.env.PASSWORD, {
          caching: Boolean(JSON.parse(process.env.CACHING || 'false')),
          expiration: parseInt(process.env.EXPIRATION || '60000'),
          cacheService: cacheService,
          database: database
        });
        await r6Service.init();
        return r6Service;
      }
    }
  ],
  exports: [
    R6Service,
  ]
})
export class ServicesModule { }