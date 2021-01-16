export interface PlayerStats {
    id:  string;
    pvp: Pvp;
    pve: Pve;
}

export interface Pve {
    weapons:   { [key: string]: Weapon };
    operators: { [key: string]: Operator };
    general:   { [key: string]: number };
    modes:     PveModes;
    types:     Types;
}

export interface PveModes {
    classic:    ClassicClass;
    protection: ClassicClass;
    extraction: ClassicClass;
    bomb:       ClassicClass;
}

export interface ClassicClass {
    wins:      number;
    losses:    number;
    matches:   number;
    bestScore: number;
}

export interface Operator {
    name:       string;
    role:       Role;
    badge:      string;
    ctu:        string;
    kills:      number;
    deaths:     number;
    wins:       number;
    losses:     number;
    headshots:  number;
    meleeKills: number;
    dbno:       number;
    xp:         number;
    playtime:   number;
    gadget:     Gadget[] | null;
}

export interface Gadget {
    name:  string;
    value: number;
}

export enum Role {
    Attacker = "attacker",
    Defender = "defender",
    Recruit = "recruit",
}

export interface Types {
    local: Coop;
    coop:  Coop;
}

export interface Coop {
    normal:    number;
    hard:      number;
    realistic: number;
}

export interface Weapon {
    general: General;
    list:    General[];
}

export interface General {
    kills:            number;
    deaths:           number;
    headshots:        number;
    bulletsFired:     number;
    bulletsConnected: number;
    timesChosen:      number;
    name?:            string;
    image?:           string;
}

export interface Pvp {
    weapons:   { [key: string]: Weapon };
    operators: { [key: string]: Operator };
    general:   { [key: string]: number };
    modes:     PvpModes;
    queue:     Queue;
}

export interface PvpModes {
    bomb:    HostageClass;
    secure:  Secure;
    hostage: HostageClass;
}

export interface HostageClass {
    name:             string;
    wins:             number;
    losses:           number;
    matches:          number;
    bestScore:        number;
    playtime:         number;
    hostageRescued?:  number;
    hostageDefended?: number;
}

export interface Secure {
    name:      string;
    wins:      number;
    losses:    number;
    matches:   number;
    bestScore: number;
    playtime:  number;
    secured:   number;
    defended:  number;
    contested: number;
}

export interface Queue {
    casual:    Casual;
    ranked:    Casual;
    discovery: Casual;
}

export interface Casual {
    name:     string;
    kills:    number;
    deaths:   number;
    wins:     number;
    losses:   number;
    matches:  number;
    playtime: number;
}
