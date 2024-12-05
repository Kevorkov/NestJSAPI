import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";


export class CreateUserDto {
    
    @ApiProperty({example:'k@mail.ru',description:'Электронная почта'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({},{message: 'Некорректный email'})
    readonly email: string;

    @ApiProperty({description:'Пароль'})
    @Length(3,16,{message: 'от 3 до 16'})
    readonly password: string;

}
