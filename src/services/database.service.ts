import { PlayerLevel } from 'src/models/player-level';
import { PlayerPlaytime } from 'src/models/player-playtime';
import { PlayerRank } from 'src/models/player-rank';
import { PlayerStats } from 'src/models/player-stats';
import { PlayerUsername } from 'src/models/player-username';

export type R6Class = PlayerLevel | PlayerPlaytime | PlayerRank | PlayerStats | PlayerUsername;

export abstract class DatabaseService {
  abstract init(): Promise<void>;
  abstract insert(data: R6Class): Promise<void>;
  abstract update(id: string, data: R6Class): Promise<void>;
}