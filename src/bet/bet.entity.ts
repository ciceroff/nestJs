import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Game } from "src/game/game.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Bet{
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number

    @ManyToOne(() => Game)
    game: Game

    @ManyToOne(() => User)
    user: User

    @Column()
    filled_numbers: string

    @Column()
    user_id: number

    @Column()
    game_id: number
}