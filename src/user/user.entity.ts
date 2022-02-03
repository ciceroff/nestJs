import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Role } from "src/role/role.entity";
import { Bet } from "src/bet/bet.entity";
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

    @OneToMany(()=> Bet, (bet) => bet.userId)
    bets: Bet[]
    
    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]

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