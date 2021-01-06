import { Controller, Get, Param } from '@nestjs/common';

import { R6Service } from '../services/r6.service';

@Controller('username')
export class UsernameController {

  constructor(private readonly r6Service: R6Service) {}

  @Get(':id')
  async getId(
    @Param('platform') platform: string,
    @Param('id') id: string
  ): Promise<string> {
    return await this.r6Service.getUsername(platform, id);
  }
}
