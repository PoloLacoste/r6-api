import { Injectable } from '@nestjs/common';
const redis = require("redis");
import { promisify } from "util";

@Injectable()
export class CacheService {

  client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });

  private getExpirationAsync: any;
  private setExpirationAsync: any;
  
  private getUsernameIdAsync: any;
  private setUsernameIdAsync: any;

  constructor() {
    this.client.on("error", function(error) {
      console.error(error);
    });

    this.client.select('expiration', () => {
      this.getExpirationAsync = promisify(this.client.get).bind(this.client);
      this.setExpirationAsync = promisify(this.client.set).bind(this.client);
    });

    this.client.select('id', () => {
      this.getUsernameIdAsync = promisify(this.client.get).bind(this.client);
      this.setUsernameIdAsync = promisify(this.client.set).bind(this.client);
    });
  }

  async getExpiration(id: string): Promise<number | null> {
    const result = await this.getExpirationAsync(id);
    return result != null ? parseInt(result) : null;
  }

  async setExpiration(id: string, timestamp: number): Promise<void> {
    await this.setExpirationAsync(id, timestamp);
  }

  async getId(username: string): Promise<string> {
    return this.getUsernameIdAsync(username) as string;
  }

  async setId(username: string, id: string): Promise<void> {
    await this.setUsernameIdAsync(username, id);
  }
}