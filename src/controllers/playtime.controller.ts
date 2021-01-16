import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { R6Service } from 'src/services/r6.service';
import { PlayerPlaytime } from 'src/models/player-playtime';

@Controller('playtime')
@ApiTags('Playtime')
export class PlaytimeController {
  
  constructor(private readonly r6Service: R6Service) {}

  @Get('id/:id')
  async getPlaytimeById(
    @Param('platform') platform: string,
    @Param('id') id: string
  ): Promise<PlayerPlaytime | null> {
    return await this.r6Service.getPlaytimeById(platform, id);
  }

  @Get('username/:username')
  async getPlaytimeByUsername(
    @Param('platform') platform: string,
    @Param('username') username: string
  ): Promise<PlayerPlaytime | null> {
    return await this.r6Service.getPlaytimeByUsername(platform, username);
  }
}
