import { Controller, Get, Query } from '@nestjs/common';

import { R6Service } from 'src/services/r6.service';

@Controller("level")
export class LevelController {
  constructor(private readonly r6Service: R6Service) { }

  @Get('id')
  async getLevelById(
    @Query('platform') platform: string,
    @Query('id') id: string
  ): Promise<any> {
    return await this.r6Service.getLevelById(platform, id);
  }

  @Get('username')
  async getLevelByUsername(
    @Query('platform') platform: string,
    @Query('username') username: string
  ): Promise<any> {
    return await this.r6Service.getLevelByUsername(platform, username);
  }
}
