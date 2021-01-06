import { Injectable } from '@nestjs/common';
import { aql, Database } from 'arangojs';
const objectHash = require('object-hash');

import { PlayerDoc } from 'src/models/player-doc';

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

  async getLastPlayerDoc(player: string): Promise<any> {
    const query = await this.db.query(aql`
      FOR doc in ${this.collection}
      FILTER doc.player == ${player}
      SORT doc.timestamp DESC
      LIMIT 1
      return {
        "id": doc._id,
        "hash": doc.hash
      }
    `);

    const data = await query.all();
    return data.length > 0 ? data[0] : null;
  }

  async savePlayerDoc(playerDoc: PlayerDoc) {

    const lastDoc = await this.getLastPlayerDoc(playerDoc.player);

    const hash = objectHash(playerDoc);

    const timestamp = new Date().getTime();

    if(lastDoc?.hash == hash) {
      await this.collection.update(lastDoc.id, {
        timestamp
      });
    }
    else {
      playerDoc.timestamp = timestamp;
      playerDoc.hash = hash;
      await this.collection.save(playerDoc);
    }
  }
}
