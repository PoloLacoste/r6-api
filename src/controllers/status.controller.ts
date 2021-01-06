import { Controller, Get } from '@nestjs/common';

import { R6Service } from 'src/services/r6.service';

@Controller("status")
export class StatusController {
  constructor(private readonly r6Service: R6Service) { }

  @Get()
  async getServersStatus(): Promise<any> {
    return await this.r6Service.getServersStatus();
  }
}
