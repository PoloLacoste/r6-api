import { Injectable } from '@nestjs/common';
import { Database } from 'arangojs';
import { DocumentCollection } from 'arangojs/collection';

@Injectable()
export class DatabaseService {

  db = new Database({
    url: process.env.ARANGO_URL,
    auth: {
      username: process.env.ARANGO_USERNAME,
      password: process.env.ARANGO_PASSWORD
    }
  });

  collection = this.db.collection('stats');

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    const exist = await this.collection.exists();
    if(!exist) {
      await this.collection.create();
    }
  }

  async saveStats(stats: any) {
    stats.timestamp = new Date().getTime();
    await this.collection.save(stats);
  }
}
