import { ApiProperty } from "@nestjs/swagger";

export class LootboxProbability {
  
  @ApiProperty()
  raw: number;
  
  @ApiProperty()
  percent: string;
}

export class PlayerLevel {
  
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  level: number;
  
  @ApiProperty()
  xp: number;
  
  @ApiProperty()
  lootboxProbability: LootboxProbability;
}