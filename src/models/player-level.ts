export interface PlayerLevel {
    id:                 string;
    level:              number;
    xp:                 number;
    lootboxProbability: LootboxProbability;
}

export interface LootboxProbability {
    raw:     number;
    percent: string;
}
