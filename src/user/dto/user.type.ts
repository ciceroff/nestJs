import {Field, ObjectType} from '@nestjs/graphql'
import { IsString } from 'class-validator'
import { Bet } from 'src/bet/bet.entity'
import {User} from 'src/user/user.entity'

@ObjectType()
export class UserType{
    @Field(() => User)
    user: User

    @Field(() => [Bet])
    bets: Bet[]
}