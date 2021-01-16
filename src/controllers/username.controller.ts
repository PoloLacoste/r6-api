import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { R6Service } from 'src/services/r6.service';
import { PlayerUsername } from 'src/models/player-username';
import { PlatformId } from 'src/models/platform-id';
import { PlatformType } from 'src/models/platform-type';

@Controller('username')
@ApiTags('Username')
export class UsernameController {

  constructor(private readonly r6Service: R6Service) {}

  @Get(':id')
  @ApiOperation({
    description: 'Get the username of a player by his id',
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
    description: 'Username of a player',
    type: PlayerUsername
  })
  async getUsername(@Param() params: PlatformId): Promise<PlayerUsername | null> {
    return await this.r6Service.getUsername(params.platform, params.id);
  }
}
