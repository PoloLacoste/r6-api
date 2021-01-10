import { Module } from '@nestjs/common';

import { ServicesModule } from './services/services.module';

import { IdController } from './controllers/id.controller';
import { LevelController } from './controllers/level.controller';
import { PlaytimeController } from './controllers/playtime.controller';
import { RankController } from './controllers/rank.controller';
import { StatsController } from './controllers/stats.controller';
import { UsernameController } from './controllers/username.controller';
import { UpdateController } from './controllers/update.controller';

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
    UsernameController,
    UpdateController
  ],
})
export class PlatformModule { }
