import { Injectable } from '@nestjs/common';
import { Collection, Db, MongoClient } from 'mongodb';
const objectHash = require('object-hash');

import { PlayerDoc } from 'src/models/player-doc';

@Injectable()
export class DatabaseService {

  private initialisation: Promise<void>;
  private client: MongoClient;
  private db: Db;
  private collection: Collection;

  constructor() {
    this.initialisation = this.init();
  }

  async init(): Promise<void> {

    let url = process.env.MONGO_URL;

    this.client = await MongoClient.connect(url, {
      useUnifiedTopology: true
    });

    this.db = this.client.db('r6');
    this.collection = this.db.collection('stats');
  }

  async getLastPlayerDoc(player: string): Promise<any> {

    await this.initialisation;

    const data = await this.collection.find({
      player: player
    })
    .project({
      _id: 1, 
      hash: 1
    })
    .sort({timestamp: -1})
    .limit(1)
    .toArray();

    return data.length > 0 ? data[0]._source : null;
  }

  async savePlayerDoc(playerDoc: PlayerDoc) {

    await this.initialisation;

    const lastDoc = await this.getLastPlayerDoc(playerDoc.player);

    const hash = objectHash(playerDoc);

    const timestamp = new Date().getTime();

    if(lastDoc?.hash == hash) {
      await this.collection.updateOne({
        _id: lastDoc._id
      }, {
        $set: {
          timestamp
        }
      });
    }
    else {
      playerDoc.timestamp = timestamp;
      playerDoc.hash = hash;
      await this.collection.insertOne(playerDoc);
    }
  }
}
