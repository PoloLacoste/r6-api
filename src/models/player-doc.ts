import { PlayerLevel } from './player-level';
import { PlayerPlaytime } from './player-playtime';
import { PlayerRank } from './player-rank';
import { PlayerStats } from './player-stats';
import { PlayerUsername } from './player-username';

export interface PlayerDoc {
    player: string;
    hash?: string;
    timestamp?: number;
    level: PlayerLevel,
    playtime: PlayerPlaytime,
    rank: PlayerRank,
    stats: PlayerStats,
    username: PlayerUsername
}