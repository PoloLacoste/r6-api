import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

import { PlatformType } from './platform-type';

export class PlatformUsername {
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
    description: 'Username of the player',
    type: String
  })
  username: string;
}