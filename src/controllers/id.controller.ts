import { Controller, Get, Param } from '@nestjs/common';

import { R6Service } from '../services/r6.service';

@Controller('id')
export class IdController {

  constructor(private readonly r6Service: R6Service) {}

  @Get(':username')
  async getId(
    @Param('platform') platform: string,
    @Param('username') username: string
  ): Promise<any> {
    return {
      'id': await this.r6Service.getId(platform, username)
    };
  }
}
