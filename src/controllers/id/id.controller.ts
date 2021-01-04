import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { R6Service } from '../../services/r6.service';
import { JwtPayload, Payload } from '../auth/jwt-payload.decorator';

@Controller('id')
export class IdController {

  constructor(private readonly r6Service: R6Service) {}

  @Get()
  @UseGuards(AuthGuard())
  async getId(
    @JwtPayload() payload: Payload, 
    @Query('platform') platform: string,
    @Query('username') username: string
  ): Promise<string> {
    return await this.r6Service.getId(payload.email, payload.password, platform, username);
  }
}
