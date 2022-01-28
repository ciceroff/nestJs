import { InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
@InputType()
export class CreateUserInput{
    @IsString()
    @IsNotEmpty({message: "Name field can not be empty"})
    name: string

    @IsEmail()
    @IsNotEmpty({message: "Email field can not be empty"})
    email: string

    @IsString()
    @IsNotEmpty({message: "Password field can not be empty"})
    password: string
}