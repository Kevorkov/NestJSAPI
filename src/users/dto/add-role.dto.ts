import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class addRoleDto {
    
    @ApiProperty({example:'админ',description:'роль'})
    @IsString({message: 'Должно быть строкой'})
    readonly value: string;

    @ApiProperty({description:'id'})
    @IsNumber({},{message: 'Должно быть чистом'})
    readonly userId: number;

}