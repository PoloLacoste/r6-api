import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { R6Service, PlayerStats } from 'r6-cacher';

import { PlatformType } from 'src/models/platform-type';
import { PlatformId } from 'src/models/platform-id';
import { PlatformUsername } from 'src/models/platform-username';

@Controller('stats')
@ApiTags('Stats')
export class StatsController {
  
  constructor(private readonly r6Service: R6Service) {}

  @Get('id/:id')
  @ApiOperation({
    description: 'Get general stats of a player by his id',
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
    description: 'General stats of a player',
    type: PlayerStats
  })
  async getStatsById(@Param() params: PlatformId): Promise<PlayerStats> {
    return await this.r6Service.getStatsById(params.platform, params.id);
  }

  @Get('username/:username')
  @ApiOperation({
    description: 'Get general stats of a player by his username',
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
    description: 'General stats of a player',
    type: PlayerStats
  })
  async getStatsByUsername(@Param() params: PlatformUsername): Promise<PlayerStats> {
    return await this.r6Service.getStatsByUsername(params.platform, params.username);
  }
}
