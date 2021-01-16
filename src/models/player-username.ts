import { ApiProduces, ApiProperty } from "@nestjs/swagger";

export class PlayerUsername {

    @ApiProperty()
    id:       string;
    
    @ApiProperty()
    userid:   string;
    
    @ApiProperty()
    username: string;
    
    @ApiProperty()
    platform: string;
}
