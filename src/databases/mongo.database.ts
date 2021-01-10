import { Collection, Db, MongoClient } from 'mongodb';

import { R6Class, DatabaseService, R6Collection } from 'src/services/database.service';

export class MongoDatabaseService implements DatabaseService {

  private client: MongoClient;
  private db: Db;

  private readonly collections = ['level', 'playtime', 'rank', 'stats', 'username'];

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    let url = process.env.MONGO_URL;

    this.client = await MongoClient.connect(url, {
      useUnifiedTopology: true
    });

    this.db = this.client.db('r6');

    let indexes = [];
    
    for(let name of this.collections) {
      indexes.push(this.db.createIndex(name, 'id'));
    }

    await Promise.all(indexes);
  }

  private getCollection(name: R6Collection): Collection {
    return this.db.collection(name.toString());
  }

  async get(name: R6Collection, id: string): Promise<R6Class> {
    return await this.getCollection(name).findOne({
      id
    });
  }

  async insert(name: R6Collection, data: R6Class): Promise<void> {
    await this.getCollection(name).insertOne(data);
  }

  async update(name: R6Collection, id: string, data: R6Class): Promise<void> {
    await this.getCollection(name).updateOne({
      _id: id
    }, {
      $set: {
        data
      }
    });
  }

}