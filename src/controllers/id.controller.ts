import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { R6Service, PlayerId } from 'r6-api-cacher';

import { PlatformType } from 'src/models/platform-type';
import { PlatformUsername } from 'src/models/platform-username';

@Controller('id')
@ApiTags('Id')
export class IdController {

  constructor(private readonly r6Service: R6Service) {}

  @Get(':username')
  @ApiOperation({
    description: 'Get the id of the player'
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
    description: 'Id of the player',
    type: PlayerId
  })
  async getId(@Param() params: PlatformUsername): Promise<PlayerId> {
    return {
      'id': await this.r6Service.getId(params.platform, params.username)
    };
  }
}
