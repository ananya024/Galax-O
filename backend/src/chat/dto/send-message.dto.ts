// send-message.dto.ts

import { IsString, Length } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @Length(3,30)
  receivername!:string;
  
  @IsString()
  @Length(1,500)
  content!:string;

  createdAt!: Date;
}