import { Controller, Get, Param } from '@nestjs/common';

import { R6Service } from 'src/services/r6.service';
import { PlayerRank } from 'src/models/player-rank';

@Controller("rank")
export class RankController {
  constructor(private readonly r6Service: R6Service) { }

  @Get('id/:id')
  async getRankById(
    @Param('platform') platform: string,
    @Param('id') id: string
  ): Promise<PlayerRank | null> {
    return await this.r6Service.getRankById(platform, id);
  }

  @Get('username/:username')
  async getRankByUsername(
    @Param('platform') platform: string,
    @Param('username') username: string
  ): Promise<PlayerRank | null> {
    return await this.r6Service.getRankByUsername(platform, username);
  }
}
