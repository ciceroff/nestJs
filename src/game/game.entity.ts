import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Bet } from "src/bet/bet.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Game{
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    range: number;

    @Column()
    price: number;

    @Column()
    max_number: number;

    @Column()
    color: string;

    @OneToMany(()=> Bet, (bet) => bet.game_id)
    bets: Bet[]
}