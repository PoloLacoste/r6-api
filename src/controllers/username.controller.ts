import { Controller, Get, Query } from '@nestjs/common';

import { R6Service } from '../services/r6.service';

@Controller('username')
export class UsernameController {

  constructor(private readonly r6Service: R6Service) {}

  @Get()
  async getId(
    @Query('platform') platform: string,
    @Query('id') id: string
  ): Promise<string> {
    return await this.r6Service.getUsername(platform, id);
  }
}
