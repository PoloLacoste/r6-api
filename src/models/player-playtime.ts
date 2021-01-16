import { ApiProperty } from "@nestjs/swagger";

export class PlayerPlaytime {
    
    @ApiProperty()
    id:        string;
    
    @ApiProperty()
    general:   number;
    
    @ApiProperty()
    ranked:    number;
    
    @ApiProperty()
    casual:    number;
    
    @ApiProperty()
    discovery: number;
}
