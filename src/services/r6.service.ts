import { Injectable } from '@nestjs/common';
const R6API = require('r6api.js');

@Injectable()
export class R6Service {

  r6Api: any;

  getR6Api(): any {
    if(this.r6Api == null) {
      this.r6Api = new R6API(process.env.EMAIl, process.env.PASSWORD);
    }

    return this.getR6Api;
  }

  async getId(platform: string, username: string): Promise<string> {
    return await this.getR6Api().getId(platform, username).then(el => el[0].id);
  }

  async getStats(platform: string, id: string) {
    return await this.getR6Api().getStats(platform, id).then(el => el[0]);
  }

  async getStatsByUsername(platform: string, username: string) {
    const id = await this.getId(platform, username);
    return await this.getStats(platform, id);
  }
}
