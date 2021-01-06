import { Controller, Get, Param } from '@nestjs/common';

import { R6Service } from 'src/services/r6.service';

@Controller("rank")
export class RankController {
  constructor(private readonly r6Service: R6Service) { }

  @Get('id/:id')
  async getRankById(
    @Param('platform') platform: string,
    @Param('id') id: string
  ): Promise<any> {
    return await this.r6Service.getRankById(platform, id);
  }

  @Get('username/:username')
  async getRankByUsername(
    @Param('platform') platform: string,
    @Param('username') username: string
  ): Promise<any> {
    return await this.r6Service.getRankByUsername(platform, username);
  }
}
