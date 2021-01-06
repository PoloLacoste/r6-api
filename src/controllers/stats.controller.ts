import { Controller, Get, Param } from '@nestjs/common';

import { R6Service } from 'src/services/r6.service';

@Controller('stats')
export class StatsController {
  
  constructor(private readonly r6Service: R6Service) {}

  @Get('id/:id')
  async getStatsById(
    @Param('platform') platform: string,
    @Param('id') id: string
  ): Promise<any> {
    return await this.r6Service.getStatsById(platform, id);
  }

  @Get('username/:username')
  async getStatsByUsername(
    @Param('platform') platform: string,
    @Param('username') username: string
  ): Promise<any> {
    return await this.r6Service.getStatsByUsername(platform, username);
  }
}
