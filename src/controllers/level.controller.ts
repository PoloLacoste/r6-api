import { Controller, Get, Param } from '@nestjs/common';

import { R6Service } from 'src/services/r6.service';
import { PlayerLevel } from 'src/models/player-level';

@Controller("level")
export class LevelController {
  constructor(private readonly r6Service: R6Service) { }

  @Get('id/:id')
  async getLevelById(
    @Param('platform') platform: string,
    @Param('id') id: string
  ): Promise<PlayerLevel | null> {
    return await this.r6Service.getLevelById(platform, id);
  }

  @Get('username/:username')
  async getLevelByUsername(
    @Param('platform') platform: string,
    @Param('username') username: string
  ): Promise<PlayerLevel | null> {
    return await this.r6Service.getLevelByUsername(platform, username);
  }
}
