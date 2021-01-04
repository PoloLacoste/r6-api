import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { R6Service } from 'src/services/r6.service';

import { JwtPayload, Payload } from '../auth/jwt-payload.decorator';

@Controller('stats')
export class StatsController {
  
  constructor(private readonly r6Service: R6Service) {}

  @Get('id')
  @UseGuards(AuthGuard())
  async getStats(
    @JwtPayload() payload: Payload, 
    @Query('platform') platform: string,
    @Query('id') id: string
  ): Promise<any> {
    return await this.r6Service.getStats(payload.email, payload.password, platform, id);
  }

  @Get('username')
  @UseGuards(AuthGuard())
  async getStatsByUsername(
    @JwtPayload() payload: Payload, 
    @Query('platform') platform: string,
    @Query('username') username: string
  ): Promise<any> {
    return await this.r6Service.getStatsByUsername(payload.email, payload.password, platform, username);
  }
}
