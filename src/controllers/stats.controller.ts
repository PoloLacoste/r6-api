import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { R6Service } from 'src/services/r6.service';

@Controller('stats')
export class StatsController {
  
  constructor(private readonly r6Service: R6Service) {}

  @Get('id')
  async getStats(
    @Query('platform') platform: string,
    @Query('id') id: string
  ): Promise<any> {
    return await this.r6Service.getStats(platform, id);
  }

  @Get('username')
  async getStatsByUsername(
    @Query('platform') platform: string,
    @Query('username') username: string
  ): Promise<any> {
    return await this.r6Service.getStatsByUsername(platform, username);
  }
}
