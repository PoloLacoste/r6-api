import { Controller, Get, Query } from '@nestjs/common';

import { R6Service } from 'src/services/r6.service';

@Controller('playtime')
export class PlaytimeController {
  
  constructor(private readonly r6Service: R6Service) {}

  @Get('id')
  async getPlaytimeById(
    @Query('platform') platform: string,
    @Query('id') id: string
  ): Promise<any> {
    return await this.r6Service.getPlaytimeById(platform, id);
  }

  @Get('username')
  async getPlaytimeByUsername(
    @Query('platform') platform: string,
    @Query('username') username: string
  ): Promise<any> {
    return await this.r6Service.getPlaytimeByUsername(platform, username);
  }
}
