// create-message.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateMessageDto {
    @ApiProperty()
    @IsString()
    @Length(3,30)
    receivername!:string;

    @ApiProperty()
    @IsString()
    @Length(1,500)
    content!:string;
}
