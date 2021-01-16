import { ApiProperty } from "@nestjs/swagger";

export class PC {
  @ApiProperty()
  "AppID ": string;

  @ApiProperty()
  MDM: string;

  @ApiProperty()
  SpaceID: string;

  @ApiProperty()
  Category: string;

  @ApiProperty()
  Name: string;

  @ApiProperty()
  Platform: string;

  @ApiProperty()
  Status: string;

  @ApiProperty()
  Maintenance: string | null;

  @ApiProperty()
  ImpactedFeatures: any[];
}

export class ServerStatus {
  @ApiProperty()
  PC: PC;

  @ApiProperty()
  PS4: PC;

  @ApiProperty()
  XBOX: PC;
}
