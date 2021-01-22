import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

import { PlatformType } from './platform-type';

export class PlatformId {
  @IsNotEmpty()
  @IsEnum(PlatformType)
  @ApiProperty({
    description: 'Platform of the player',
    enum: PlatformType,
    type: String
  })
  platform: PlatformType;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Id of the player',
    type: String
  })
  id: string;
}