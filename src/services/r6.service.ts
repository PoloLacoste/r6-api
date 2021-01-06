import { Injectable } from '@nestjs/common';
const R6API = require('r6api.js');

@Injectable()
export class R6Service {

  r6Api = new R6API(process.env.EMAIL, process.env.PASSWORD);

  async getId(platform: string, username: string): Promise<string> {
    return await this.r6Api.getId(platform, username).then(el => el[0].id);
  }

  async getUsername(platform: string, id: string) {
    return await this.r6Api.getUsername(platform, id);
  }

  async getStatsById(platform: string, id: string) {
    return await this.r6Api.getStats(platform, id).then(el => el[0]);
  }

  async getStatsByUsername(platform: string, username: string) {
    const id = await this.getId(platform, username);
    return await this.getStatsById(platform, id);
  }

  async getRankById(platform: string, id: string) {
    return await this.r6Api.getRank(platform, id);
  }

  async getRankByUsername(platform: string, username: string) {
    const id = await this.getId(platform, username);
    return await this.getRankById(platform, id);
  }

  async getServersStatus() {
    return await this.r6Api.getStatus();
  }

  async getPlaytimeById(platform: string, id: string) {
    return await this.r6Api.getPlaytime(platform, id);
  }

  async getPlaytimeByUsername(platform: string, username: string) {
    const id = await this.getId(platform, username);
    return await this.getPlaytimeById(platform, id);
  }

  async getLevelById(platform: string, id: string) {
    return await this.r6Api.getLevel(platform, id);
  }

  async getLevelByUsername(platform: string, username: string) {
    const id = await this.getId(platform, username);
    return await this.getLevelById(platform, id);
  }
}
