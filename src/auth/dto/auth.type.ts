import {Field, ObjectType} from '@nestjs/graphql'
import { IsString } from 'class-validator'
import {User} from 'src/user/user.entity'

@ObjectType()
export class AuthType{
    @Field(() => User)
    user: User

    @Field()
    @IsString()
    token: string
}