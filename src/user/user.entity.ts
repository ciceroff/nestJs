import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
@ObjectType()
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hash(): Promise<boolean>{
        const saltOrRounds = 10
        const password = this.password
        try {
            const hash = await bcrypt.hash(password, saltOrRounds)
            this.password = hash
            return true
        } catch (error) {
            return false
        }
        
    }
}