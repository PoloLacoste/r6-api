import { Injectable } from '@nestjs/common';
const redis = require("redis");
import { promisify } from "util";

@Injectable()
export class CacheService {

  private client: any;

  private getExpirationAsync: any;
  private setExpirationAsync: any;
  
  private getUsernameIdAsync: any;
  private setUsernameIdAsync: any;

  private online = true;

  constructor() {

    const client = this.client = redis.createClient({
      url: process.env.REDIS_URL,
      disable_resubscribing: true
    });

    this.client.on('error', (error) => {
      this.online = false;
      client.quit();
      console.log(`Redis: ${error}`);
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

  isOnline(): boolean {
    return this.online;
  }

  async getExpiration(id: string): Promise<number | null> {
    try {
      const result = await this.getExpirationAsync(id);
      return result != null ? parseInt(result) : null;
    }
    catch(e) {
      console.log(e);
    }

    return null;
  }

  async setExpiration(id: string, timestamp: number): Promise<void> {
    try {
      await this.setExpirationAsync(id, timestamp);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getId(username: string): Promise<string> {
    try {
      return this.getUsernameIdAsync(username) as string;
    }
    catch(e) {
      console.log(e);
    }

    return null;
  }

  async setId(username: string, id: string): Promise<void> {
    try {
      await this.setUsernameIdAsync(username, id);
    }
    catch(e) {
      console.log(e);
    }
  }
}