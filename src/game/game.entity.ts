import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}