import { InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
@InputType()
export class UpdateUserInput{
    @IsString()
    @IsNotEmpty({message: "Name field can not be empty"})
    @IsOptional()
    name?: string

    @IsOptional()
    @IsEmail()
    @IsNotEmpty({message: "Email field can not be empty"})
    email?: string
}