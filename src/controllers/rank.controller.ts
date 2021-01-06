import { Controller, Get, Query } from '@nestjs/common';

import { R6Service } from 'src/services/r6.service';

@Controller("rank")
export class RankController {
  constructor(private readonly r6Service: R6Service) { }

  @Get('id')
  async getRankById(
    @Query('platform') platform: string,
    @Query('id') id: string
  ): Promise<any> {
    return await this.r6Service.getRankById(platform, id);
  }

  @Get('username')
  async getRankByUsername(
    @Query('platform') platform: string,
    @Query('username') username: string
  ): Promise<any> {
    return await this.r6Service.getRankByUsername(platform, username);
  }
}
