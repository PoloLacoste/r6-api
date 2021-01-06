import { Module } from '@nestjs/common';

import { R6Service } from './services/r6.service';
import { IdController } from './controllers/id.controller';
import { LevelController } from './controllers/level.controller';
import { PlaytimeController } from './controllers/playtime.controller';
import { RankController } from './controllers/rank.controller';
import { StatsController } from './controllers/stats.controller';
import { StatusController } from './controllers/status.controller';
import { UsernameController } from './controllers/username.controller';

@Module({
  imports: [],
  controllers: [
    IdController,
    LevelController,
    PlaytimeController,
    RankController,
    StatsController,
    UsernameController,
  ],
  providers: [
    R6Service,
  ],
})
export class PlatformModule { }
