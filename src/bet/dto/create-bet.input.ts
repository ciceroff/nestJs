import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateBetInput{
    @IsString()
    @IsNotEmpty({message:"Filled numbers can not be empty"})
    filled_numbers: string

    @IsNumber()
    @IsNotEmpty()
    user_id: number

    @IsNumber()
    @IsNotEmpty()
    game_id:number
}