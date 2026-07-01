// create-user.dto.ts

import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    username!:string;
    @ApiProperty()
    password!:string;
}
