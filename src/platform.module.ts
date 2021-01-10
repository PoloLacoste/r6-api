import { Module } from '@nestjs/common';

import { R6Service } from './services/r6.service';
import { DatabaseService } from './services/database.service';
import { MongoDatabaseService } from './databases/mongo.database';

import { IdController } from './controllers/id.controller';
import { LevelController } from './controllers/level.controller';
import { PlaytimeController } from './controllers/playtime.controller';
import { RankController } from './controllers/rank.controller';
import { StatsController } from './controllers/stats.controller';
import { UsernameController } from './controllers/username.controller';
import { UpdateController } from './controllers/update.controller';

@Module({
  imports: [],
  controllers: [
    IdController,
    LevelController,
    PlaytimeController,
    RankController,
    StatsController,
    UsernameController,
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
export class PlatformModule { }
