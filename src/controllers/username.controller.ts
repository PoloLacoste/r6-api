import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { R6Service } from 'src/services/r6.service';
import { PlayerUsername } from 'src/models/player-username';

@Controller('username')
@ApiTags('Username')
export class UsernameController {

  constructor(private readonly r6Service: R6Service) {}

  @Get(':id')
  async getUsername(
    @Param('platform') platform: string,
    @Param('id') id: string
  ): Promise<PlayerUsername | null> {
    return await this.r6Service.getUsername(platform, id);
  }
}
