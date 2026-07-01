// user.entity.ts

import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Message } from "src/messages/entities/message.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId!:string;

    @Column({unique:true, nullable:false})
    username!:string;

    @Column({nullable:false, select:false})
    password!:string;

    // lower 2only for maping not for table
    @OneToMany(() => Message, message => message.sender)
    sentMessages!: Message[];

    @OneToMany(() => Message, message => message.receiver)
    receivedMessages!: Message[];
}
