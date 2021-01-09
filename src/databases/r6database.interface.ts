import { LastPlayerDoc } from 'src/models/last-player-doc';
import { PlayerDoc } from 'src/models/player-doc';

export interface R6Database {
  init(): Promise<void>;
  getLast(player: string): Promise<LastPlayerDoc | null>;
  update(id: string, timestamp: number): Promise<void>;
  insert(playerDoc: PlayerDoc): Promise<void>;
}