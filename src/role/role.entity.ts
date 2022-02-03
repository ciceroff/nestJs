import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number

    @Column()
    role_name: string
}