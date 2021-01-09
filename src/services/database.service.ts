import { Injectable } from '@nestjs/common';
const objectHash = require('object-hash');

import { PlayerDoc } from 'src/models/player-doc';
import { R6Database } from 'src/databases/r6database.interface';
import { MongoDatabase } from 'src/databases/mongo.database';

@Injectable()
export class DatabaseService {

  private db: R6Database;
  private initialisation: Promise<void>;

  constructor() {
    this.db = new MongoDatabase();
    this.initialisation = this.init();
  }

  private async init(): Promise<void> {
    await this.db.init();
  }

  async savePlayerDoc(playerDoc: PlayerDoc): Promise<void> {

    await this.initialisation;

    const lastDoc = await this.db.getLast(playerDoc.player);

    const hash = objectHash(playerDoc);

    const timestamp = new Date().getTime();

    if(lastDoc?.hash == hash) {
      await this.db.update(lastDoc.id, timestamp);
    }
    else {
      playerDoc.timestamp = timestamp;
      playerDoc.hash = hash;
      await this.db.insert(playerDoc);
    }
  }
}
