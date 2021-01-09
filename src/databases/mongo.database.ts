import { Collection, Db, MongoClient } from 'mongodb';

import { R6Database } from './r6database.interface';
import { PlayerDoc } from 'src/models/player-doc';
import { LastPlayerDoc } from 'src/models/last-player-doc';

export class MongoDatabase implements R6Database {

  private client: MongoClient;
  private db: Db;
  private collection: Collection;

  async init(): Promise<void> {
    let url = process.env.MONGO_URL;

    this.client = await MongoClient.connect(url, {
      useUnifiedTopology: true
    });

    this.db = this.client.db('r6');
    this.collection = this.db.collection('stats');
  }

  async getLast(player: string): Promise<LastPlayerDoc | null> {
    const data = await this.collection.find({
      player: player
    })
      .project({
        _id: 1,
        hash: 1
      })
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    if (data.length > 0) {
      let result = data[0]._source;
      return {
        id: result._id,
        hash: result.hash
      }
    }

    return null;
  }

  async update(id: string, timestamp: number): Promise<void> {
    await this.collection.updateOne({
      _id: id
    }, {
      $set: {
        timestamp
      }
    });
  }

  async insert(playerDoc: PlayerDoc): Promise<void> {
    await this.collection.insertOne(playerDoc);
  }

}