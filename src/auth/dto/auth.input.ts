import { InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"
import { Column } from "typeorm"

@InputType()
export class AuthInput {

    @Column()
    @IsString()
    @IsNotEmpty({message: "Email field can not be empty"})
    email:string

    @Column()
    password:string
}