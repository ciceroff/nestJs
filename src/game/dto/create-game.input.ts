import { InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateGameInput{
    @IsString()
    @IsNotEmpty({message: "Type field can not be empty"})
    type: string

    @IsString()
    @IsNotEmpty({message: "Description field can not be empty"})
    description: string

    @IsNumber()
    @IsNotEmpty({message: "Range field can not be empty and must be a number"})
    range: number

    @IsNumber()
    @IsNotEmpty({message: "Price field can not be empty"})
    price: number

    @IsNumber()
    @IsNotEmpty({message: "Max number field can not be empty"})
    max_number: number

    @IsString()
    @IsNotEmpty({message: "Color field can not be empty"})
    color: string
}