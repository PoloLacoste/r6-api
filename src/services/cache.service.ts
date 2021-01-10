import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {

  private readonly cache = new Map<string, number>();

  getCache(id: string): number {
    return this.cache.get(id);
  }

  setCache(id: string, timestamp: number) {
    this.cache.set(id, timestamp);
  }
}