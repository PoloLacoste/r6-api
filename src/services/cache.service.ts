import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {

  private readonly expirations = new Map<string, number>();
  private readonly usernameIds = new Map<string, string>();

  getExpiration(id: string): number {
    return this.expirations.get(id);
  }

  setExpiration(id: string, timestamp: number): void {
    this.expirations.set(id, timestamp);
  }

  getId(username: string): string {
    return this.usernameIds.get(username);
  }

  setId(username: string, id: string): void {
    this.usernameIds.set(username, id);
  }
}