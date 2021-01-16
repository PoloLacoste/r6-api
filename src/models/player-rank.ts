import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class LastMatch {

  @ApiProperty()
  mmrChange:        number;

  @ApiProperty()
  won:              boolean;

  @ApiProperty()
  skillStdevChange: number;
}

export enum Name {
  Bronze1 = "Bronze 1",
  Silver2 = "Silver 2",
  Unranked = "Unranked",
}

export class Current {

  @ApiProperty()
  name:  Name;

  @ApiProperty()
  id:    number;

  @ApiProperty()
  mmr:   number;

  @ApiProperty()
  image: string;
}

export enum Region {
  Emea = "emea",
}

export class Emea {

  @ApiProperty()
  region:                Region;
  
  @ApiProperty()
  skillMean:             number;
  
  @ApiProperty()
  skillStdev:            number;
  
  @ApiProperty()
  current:               Current;
  
  @ApiProperty()
  max:                   Current;
  
  @ApiProperty()
  lastMatch:             LastMatch;
  
  @ApiProperty()
  previousMmr:           number;
  
  @ApiProperty()
  nextMmr:               number;
  
  @ApiProperty()
  nextRankMatchesNeeded: number;
  
  @ApiProperty()
  topRankPosition:       number;
  
  @ApiProperty()
  kills:                 number;
  
  @ApiProperty()
  deaths:                number;
  
  @ApiProperty()
  wins:                  number;
  
  @ApiProperty()
  losses:                number;
  
  @ApiProperty()
  matches:               number;
  
  @ApiProperty()
  abandons:              number;
  
  @ApiProperty()
  updateTime:            string;
}

export class Regions {

  @ApiProperty()
  emea: Emea;
}

export class Season {

  @ApiProperty()
  id:      number;
  
  @ApiProperty()
  name:    string;
  
  @ApiProperty()
  color:   string;
  
  @ApiProperty()
  image:   string;
  
  @ApiProperty()
  regions: Regions;
}

@ApiExtraModels(Season)
export class PlayerRank {

  @ApiProperty()
  id:      string;

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      items: {
        $ref: getSchemaPath(Season)
      }
    }
  })
  seasons: { [key: string]: Season };
}