import { Collection, Db, MongoClient } from 'mongodb';

import { R6Class, DatabaseService } from 'src/services/database.service';

export class MongoDatabaseService implements DatabaseService {

  private client: MongoClient;
  private db: Db;

  private collectionMapping = {
    PlayerLevel: 'levels',
    PlayerPlaytime: 'playtimes',
    PlayerRank: 'ranks',
    PlayerStats: 'stats',
    PlayerUsername: 'usernames'
  }

  async init(): Promise<void> {
    let url = process.env.MONGO_URL;

    this.client = await MongoClient.connect(url, {
      useUnifiedTopology: true
    });

    this.db = this.client.db('r6');
  }

  private getCollection(name: string): Collection {
    return this.db.collection(this.collectionMapping[name]);
  }

  async insert(data: R6Class): Promise<void> {
    await this.getCollection(typeof data).insertOne(data);
  }

  async update(id: string, data: R6Class): Promise<void> {
    await this.getCollection(typeof data).updateOne({
      _id: id
    }, {
      $set: {
        data
      }
    });
  }

}