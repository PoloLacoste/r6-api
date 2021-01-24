import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { R6Service, PlayerPlaytime } from 'r6-api-caching';

import { PlatformType } from 'src/models/platform-type';
import { PlatformId } from 'src/models/platform-id';
import { PlatformUsername } from 'src/models/platform-username';

@Controller('playtime')
@ApiTags('Playtime')
export class PlaytimeController {
  
  constructor(private readonly r6Service: R6Service) {}

  @Get('id/:id')
  @ApiOperation({
    description: 'Get the playtime of a player by his id',
  })
  @ApiParam({
    name: 'platform',
    description: 'Platform of the player',
    enum: PlatformType,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the player',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Playtime of a player',
    type: PlayerPlaytime
  })
  async getPlaytimeById(@Param() params: PlatformId): Promise<PlayerPlaytime | null> {
    return await this.r6Service.getPlaytimeById(params.platform, params.id);
  }

  @Get('username/:username')
  @ApiOperation({
    description: 'Get the playtime of a player by his username',
  })
  @ApiParam({
    name: 'platform',
    description: 'Platform of the player',
    enum: PlatformType,
  })
  @ApiParam({
    name: 'username',
    description: 'Username of the player',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Playtime of a player',
    type: PlayerPlaytime
  })
  async getPlaytimeByUsername(@Param() params: PlatformUsername): Promise<PlayerPlaytime | null> {
    return await this.r6Service.getPlaytimeByUsername(params.platform, params.username);
  }
}
