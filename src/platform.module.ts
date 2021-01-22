import { Module } from '@nestjs/common';

import { ServicesModule } from './services.module';

import { IdController } from './controllers/id.controller';
import { LevelController } from './controllers/level.controller';
import { PlaytimeController } from './controllers/playtime.controller';
import { RankController } from './controllers/rank.controller';
import { StatsController } from './controllers/stats.controller';
import { UsernameController } from './controllers/username.controller';

@Module({
  imports: [
    ServicesModule
  ],
  controllers: [
    IdController,
    LevelController,
    PlaytimeController,
    RankController,
    StatsController,
    UsernameController
  ],
})
export class PlatformModule { }
