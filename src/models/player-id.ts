import { ApiProperty } from '@nestjs/swagger';

export class PlayerId {
  @ApiProperty({
    description: 'Id of the player',
    type: String
  })
  id: string;
}