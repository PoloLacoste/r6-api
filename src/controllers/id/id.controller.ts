import { Controller, Get, Query } from '@nestjs/common';

import { R6Service } from '../../services/r6.service';

@Controller('id')
export class IdController {

  constructor(private readonly r6Service: R6Service) {}

  @Get()
  async getId(
    @Query('platform') platform: string,
    @Query('username') username: string
  ): Promise<string> {
    return await this.r6Service.getId(platform, username);
  }
}
