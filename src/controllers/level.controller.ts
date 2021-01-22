import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { R6Service, PlatformType, PlatformUsername, PlatformId, PlayerLevel } from 'r6-api-cacher';

@Controller("level")
@ApiTags('Level')
export class LevelController {
  constructor(private readonly r6Service: R6Service) { }

  @Get('id/:id')
  @ApiOperation({
    description: 'Get the level, xp and alpha pack drop chance of a player by his id',
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
    description: 'Level, xp and alpha pack drop chance of a player',
    type: PlayerLevel
  })
  async getLevelById(@Param() params: PlatformId): Promise<PlayerLevel | null> {
    return await this.r6Service.getLevelById(params.platform, params.id);
  }

  @Get('username/:username')
  @ApiOperation({
    description: 'Get the level, xp and alpha pack drop chance of a player by his username',
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
    description: 'Level, xp and alpha pack drop chance of a player',
    type: PlayerLevel
  })
  async getLevelByUsername(@Param() params: PlatformUsername): Promise<PlayerLevel | null> {
    return await this.r6Service.getLevelByUsername(params.platform, params.username);
  }
}
