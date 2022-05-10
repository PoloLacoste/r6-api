import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { R6Service, ServerStatus } from 'r6-api-caching';

@Controller('status')
@ApiTags('Servers status')
export class StatusController {
  constructor(private readonly r6Service: R6Service) { }

  @Get()
  @ApiOperation({
    description: 'Get Rainbow Six Siege servers status',
  })
  @ApiResponse({
    status: 200,
    description: 'Rainbow Six Siege servers status',
    type: ServerStatus,
    isArray: true,
  })
  async getServersStatus(): Promise<ServerStatus[]> {
    return await this.r6Service.getServersStatus();
  }
}
