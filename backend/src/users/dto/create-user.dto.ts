// create-user.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @Length(3,30)
    username!:string;

    @ApiProperty()  
    @IsString()
    @Length(3,100)
    password!:string;
}
