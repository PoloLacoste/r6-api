import { Controller, Get, Param } from '@nestjs/common';

import { R6Service } from 'src/services/r6.service';
import { PlayerId } from 'src/models/player-id';

@Controller('id')
export class IdController {

  constructor(private readonly r6Service: R6Service) {}

  @Get(':username')
  async getId(
    @Param('platform') platform: string,
    @Param('username') username: string
  ): Promise<PlayerId> {
    return {
      'id': await this.r6Service.getId(platform, username)
    };
  }
}
