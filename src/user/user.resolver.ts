import { UseGuards } from '@nestjs/common';
import { Args, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { isAdminGuard } from 'src/auth/admin.guard';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { Any } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserType } from './dto/user.type';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService
    ){}
    
    @UseGuards(GqlAuthGuard)
    @UseGuards(isAdminGuard)
    @Query(() => [User])
    async users(): Promise<User[]>{
        const users = await this.userService.findAllUsers();
        return users 
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => UserType)
    async user(
        @Args('id') id: number
    ){
        const user = await this.userService.findUserById(id);
        return user
    }
    @UseGuards(GqlAuthGuard)
    @Query(() => User)
    async userByEmail(@Args('email') email:string): Promise<User>{
        return this.userService.getUserByEmail(email)
    }
    @Mutation(() => User)
    async createUser(
        @Args('data') data: CreateUserInput
    ): Promise<User>{
        const user = await this.userService.createUser(data);
        return user; 
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    async updateUser(
        @Args('id') id:number, @Args('data') data: UpdateUserInput,
    ): Promise<User>{
        const user = this.userService.updateUser(id, data)
        return user
    }

    @UseGuards(isAdminGuard)
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async deleteUser(@Args('id') id: number): Promise<Boolean>{
        const deleted = await this.userService.deleteUser(id)

        return deleted
    }
}
