import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { R6Service } from 'src/services/r6.service';
import { PlayerRank } from 'src/models/player-rank';
import { PlatformUsername } from 'src/models/platform-username';
import { PlatformId } from 'src/models/platform-id';
import { PlatformType } from 'src/models/platform-type';

@Controller("rank")
@ApiTags('Rank')
export class RankController {
  constructor(private readonly r6Service: R6Service) { }

  @Get('id/:id')
  @ApiOperation({
    description: 'Get seasonal stats of a player by his id',
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
    description: 'Seasonal stats of a player',
    type: PlayerRank
  })
  async getRankById(@Param() params: PlatformId): Promise<PlayerRank | null> {
    return await this.r6Service.getRankById(params.platform, params.id);
  }

  @Get('username/:username')
  @ApiOperation({
    description: 'Get seasonal stats of a player by his username',
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
    description: 'Seasonal stats of a player',
    type: PlayerRank
  })
  async getRankByUsername(@Param() params: PlatformUsername): Promise<PlayerRank | null> {
    return await this.r6Service.getRankByUsername(params.platform, params.username);
  }
}
