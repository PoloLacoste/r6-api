import { Injectable } from '@nestjs/common';
import { aql, Database } from 'arangojs';
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
    await this.collection.ensureIndex({
      type: 'persistent',
      fields: ['player']
    });
  }

  async getLastPlayerStats(player: string) {
    const query = await this.db.query(aql`
      FOR doc in ${this.collection}
      FILTER doc.player == ${player}
      SORT doc.timestamp DESC
      LIMIT 1
      return doc
    `);

    const data = await query.all();
    return data.length > 0 ? data[0] : null;
  }

  async saveStats(stats: any) {

    const lastPlayerStats = await this.getLastPlayerStats(stats.player);

    const pve = JSON.stringify(stats.pve) == JSON.stringify(lastPlayerStats?.pve);
    const pvp = JSON.stringify(stats.pvp) == JSON.stringify(lastPlayerStats?.pvp);

    const timestamp = new Date().getTime();

    if(pve && pvp) {
      await this.collection.update(lastPlayerStats, {
        timestamp
      });
    }
    else {
      stats.timestamp = timestamp;
      await this.collection.save(stats);
    }
  }
}
