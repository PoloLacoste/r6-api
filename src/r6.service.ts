import { Injectable } from '@nestjs/common';
const R6API = require('r6api.js');

@Injectable()
export class R6Service {

  private getR6Api(email: string, password: string) {
    return new R6API('email', 'password')
  }

  async getId(email: string, password: string, platform: string, username: string): Promise<string> {
    const r6api = this.getR6Api(email, password);
    return await r6api.getId(platform, username).then(el => el[0].id);
  }
}
