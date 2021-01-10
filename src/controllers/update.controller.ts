import { Controller, Get, Param } from '@nestjs/common';

import { R6Service } from 'src/services/r6.service';
import { DatabaseService, R6Collection } from 'src/services/database.service';

@Controller('update')
export class UpdateController {

  constructor(private readonly r6Service: R6Service, private readonly database: DatabaseService) {}

  @Get(':username')
  async getId(
    @Param('platform') platform: string,
    @Param('username') username: string
  ): Promise<void> {
    const player = await this.r6Service.getAll(platform, username);

    let promises = [
      this.database.insert(R6Collection.level, player.level),
      this.database.insert(R6Collection.playtime, player.playtime),
      this.database.insert(R6Collection.rank, player.rank),
      this.database.insert(R6Collection.stats, player.stats),
      this.database.insert(R6Collection.username, player.username),
    ];

    await Promise.all(promises);
  }
}
