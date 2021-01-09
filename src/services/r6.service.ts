import { Injectable } from '@nestjs/common';
const R6API = require('r6api.js');

import { PlayerLevel } from 'src/models/player-level';
import { PlayerPlaytime } from 'src/models/player-playtime';
import { PlayerRank } from 'src/models/player-rank';
import { PlayerStats } from 'src/models/player-stats';
import { PlayerUsername } from 'src/models/player-username';
import { ServerStatus } from 'src/models/server-status';
import { PlayerDoc } from 'src/models/player-doc';

@Injectable()
export class R6Service {

  r6Api = new R6API(process.env.EMAIL, process.env.PASSWORD);

  async getId(platform: string, username: string): Promise<string> {
    return await this.r6Api.getId(platform, username).then(el => el[0].id);
  }

  async getLevelById(platform: string, id: string): Promise<PlayerLevel | null> {
    const result = await this.r6Api.getLevel(platform, id);
    return result.length > 0 ? result[0] : null;
  }

  async getLevelByUsername(platform: string, username: string): Promise<PlayerLevel | null> {
    const id = await this.getId(platform, username);
    return await this.getLevelById(platform, id);
  }

  async getPlaytimeById(platform: string, id: string): Promise<PlayerPlaytime | null> {
    const result = await this.r6Api.getPlaytime(platform, id);
    return result.length > 0 ? result[0] : null;
  }

  async getPlaytimeByUsername(platform: string, username: string): Promise<PlayerPlaytime | null> {
    const id = await this.getId(platform, username);
    return await this.getPlaytimeById(platform, id);
  }

  async getRankById(platform: string, id: string): Promise<Array<PlayerRank>> {
    return await this.r6Api.getRank(platform, id, {
      seasons: 'all'
    });
  }

  async getRankByUsername(platform: string, username: string): Promise<Array<PlayerRank>> {
    const id = await this.getId(platform, username);
    return await this.getRankById(platform, id);
  }

  async getStatsById(platform: string, id: string): Promise<PlayerStats> {
    return await this.r6Api.getStats(platform, id).then(el => el[0]);
  }

  async getStatsByUsername(platform: string, username: string): Promise<PlayerStats> {
    const id = await this.getId(platform, username);
    return await this.getStatsById(platform, id);
  }

  async getServersStatus(): Promise<ServerStatus> {
    return await this.r6Api.getStatus();
  }

  async getUsername(platform: string, id: string): Promise<PlayerUsername> {
    return await this.r6Api.getUsername(platform, id);
  }

  async getAll(platform: string, username: string): Promise<PlayerDoc> {
    const id = await this.getId(platform, username);

    const result = await Promise.all([
      this.getLevelById(platform, id),
      this.getPlaytimeById(platform, id),
      this.getRankById(platform, id),
      this.getStatsById(platform, id),
      this.getUsername(platform, id)
    ]);

    return {
      player: username,
      level: result[0],
      playtime: result[1],
      rank: result[2],
      stats: result[3],
      username: result[4]
    }
  }
}
