import { InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateGameInput{
    @IsOptional()
    @IsString()
    @IsNotEmpty({message: "Type field can not be empty"})
    type?: string

    @IsString()
    @IsNotEmpty({message: "Description field can not be empty"})
    @IsOptional()
    description?: string

    @IsNumber()
    @IsNotEmpty({message: "Range field can not be empty and must be a number"})
    @IsOptional()
    range?: number

    @IsNumber()
    @IsNotEmpty({message: "Price field can not be empty"})
    @IsOptional()
    price?: number

    @IsNumber()
    @IsNotEmpty({message: "Max number field can not be empty"})
    @IsOptional()
    max_number?: number

    @IsString()
    @IsNotEmpty({message: "Color field can not be empty"})
    @IsOptional()
    color?: string
}