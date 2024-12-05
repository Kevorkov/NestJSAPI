import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
    
    @ApiProperty({example:'Баловался',description:'Причина бана'})
    readonly banReason: string;

    @ApiProperty({description:'id'})
    readonly userId: number;

}