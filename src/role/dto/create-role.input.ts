import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateRoleInput{
    @IsString()
    @IsNotEmpty({message:"Role name field can not be empty"})
    role_name: string
}