import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";

export class Casual {

  @ApiProperty()
  name: string;

  @ApiProperty()
  kills: number;

  @ApiProperty()
  deaths: number;

  @ApiProperty()
  wins: number;

  @ApiProperty()
  losses: number;

  @ApiProperty()
  matches: number;

  @ApiProperty()
  playtime: number;
}

export class Queue {

  @ApiProperty()
  casual: Casual;

  @ApiProperty()
  ranked: Casual;

  @ApiProperty()
  discovery: Casual;
}

export class Secure {

  @ApiProperty()
  name: string;

  @ApiProperty()
  wins: number;

  @ApiProperty()
  losses: number;

  @ApiProperty()
  matches: number;

  @ApiProperty()
  bestScore: number;

  @ApiProperty()
  playtime: number;

  @ApiProperty()
  secured: number;

  @ApiProperty()
  defended: number;

  @ApiProperty()
  contested: number;
}

export class Hostage {

  @ApiProperty()
  name: string;

  @ApiProperty()
  wins: number;

  @ApiProperty()
  losses: number;

  @ApiProperty()
  matches: number;

  @ApiProperty()
  bestScore: number;

  @ApiProperty()
  playtime: number;

  @ApiProperty()
  hostageRescued?: number;

  @ApiProperty()
  hostageDefended?: number;
}

export class PvpModes {

  @ApiProperty()
  bomb: Hostage;

  @ApiProperty()
  secure: Secure;

  @ApiProperty()
  hostage: Hostage;
}

export class General {

  @ApiProperty()
  kills: number;

  @ApiProperty()
  deaths: number;

  @ApiProperty()
  headshots: number;

  @ApiProperty()
  bulletsFired: number;

  @ApiProperty()
  bulletsConnected: number;

  @ApiProperty()
  timesChosen: number;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  image?: string;
}

export class Weapon {

  @ApiProperty()
  general: General;

  @ApiProperty()
  list: General[];
}

export class Operator {

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  badge: string;

  @ApiProperty()
  ctu: string;

  @ApiProperty()
  kills: number;

  @ApiProperty()
  deaths: number;

  @ApiProperty()
  wins: number;

  @ApiProperty()
  losses: number;

  @ApiProperty()
  headshots: number;

  @ApiProperty()
  meleeKills: number;

  @ApiProperty()
  dbno: number;

  @ApiProperty()
  xp: number;

  @ApiProperty()
  playtime: number;

  @ApiProperty()
  gadget: Gadget[] | null;
}

export class GeneralStats {

  @ApiProperty()
  bulletsFired:           number;
  
  @ApiProperty()
  bulletsConnected:       number;
  
  @ApiProperty()
  kills:                  number;
  
  @ApiProperty()
  deaths:                 number;
  
  @ApiProperty()
  assists:                number;
  
  @ApiProperty()
  headshots:              number;
  
  @ApiProperty()
  meleeKills:             number;
  
  @ApiProperty()
  penetrationKills:       number;
  
  @ApiProperty()
  blindKills:             number;
  
  @ApiProperty()
  dbno:                   number;
  
  @ApiProperty()
  dbnoAssists:            number;
  
  @ApiProperty()
  revives:                number;
  
  @ApiProperty()
  matches:                number;
  
  @ApiProperty()
  wins:                   number;
  
  @ApiProperty()
  losses:                 number;
  
  @ApiProperty()
  playtime:               number;
  
  @ApiProperty()
  gadgetsDestroyed:       number;
  
  @ApiProperty()
  rappelBreaches:         number;
  
  @ApiProperty()
  barricadesDeployed:     number;
  
  @ApiProperty()
  reinforcementsDeployed: number;
  
  @ApiProperty()
  suicides:               number;
  
  @ApiProperty()
  distanceTravelled:      number;
  
  @ApiProperty()
  customGamesPlaytime:    number;
}

@ApiExtraModels(Weapon, Operator)
export class Pvp {

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      items: {
        $ref: getSchemaPath(Weapon)
      }
    }
  })
  weapons: { [key: string]: Weapon };

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      items: {
        $ref: getSchemaPath(Operator)
      }
    }
  })
  operators: { [key: string]: Operator };

  @ApiProperty()
  general: GeneralStats;

  @ApiProperty()
  modes: PvpModes;

  @ApiProperty()
  queue: Queue;
}

export class Coop {

  @ApiProperty()
  normal: number;

  @ApiProperty()
  hard: number;

  @ApiProperty()
  realistic: number;
}

export class Types {

  @ApiProperty()
  local: Coop;

  @ApiProperty()
  coop: Coop;
}

export enum Role {
  Attacker = "attacker",
  Defender = "defender",
  Recruit = "recruit",
}

export class Gadget {

  @ApiProperty()
  name: string;

  @ApiProperty()
  value: number;
}

export class Classic {

  @ApiProperty()
  wins: number;

  @ApiProperty()
  losses: number;

  @ApiProperty()
  matches: number;

  @ApiProperty()
  bestScore: number;
}

export class PveModes {

  @ApiProperty()
  classic: Classic;

  @ApiProperty()
  protection: Classic;

  @ApiProperty()
  extraction: Classic;

  @ApiProperty()
  bomb: Classic;
}

@ApiExtraModels(Weapon, Operator)
export class Pve {

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      items: {
        $ref: getSchemaPath(Weapon)
      }
    }
  })
  weapons: { [key: string]: Weapon };

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      items: {
        $ref: getSchemaPath(Operator)
      }
    }
  })
  operators: { [key: string]: Operator };

  @ApiProperty()
  general: GeneralStats;

  @ApiProperty()
  modes: PveModes;

  @ApiProperty()
  types: Types;
}

export class PlayerStats {

  @ApiProperty()
  id: string;

  @ApiProperty()
  pvp: Pvp;

  @ApiProperty()
  pve: Pve;
}