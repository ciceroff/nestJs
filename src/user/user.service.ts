import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}
    
    async findAllUsers(): Promise<User[]>{
        const users = await this.userRepository.find()

        return users
    }

    async findUserById(id: number): Promise<User>{
        const user = await this.userRepository.findOne(id)
        if(!user){
            throw new NotFoundException('User not found')
        }
        return user
    }
    async createUser(data: CreateUserInput): Promise<User> {
        const user = this.userRepository.create(data);
        const userSaved = await this.userRepository.save(user)

        if(!userSaved){
            throw new InternalServerErrorException('Problem when creating user')
        }
        return userSaved
    }

    async getUserByEmail(email:string): Promise<User>{
        const user = await this.userRepository.findOne({where: {email}})
        if(!user){
            throw new NotFoundException('User not found')
        }
        return user
    }

    async updateUser(id: number, data: UpdateUserInput): Promise<User>{
        const user = await this.findUserById(id)
        if(!user)
            throw new NotFoundException('User not found')

        await this.userRepository.update(user, {...data})
        const userUpdated = this.userRepository.create({...user, ...data})
        return userUpdated
        
    }

    async deleteUser(id: number ): Promise<boolean>{
        const user = await this.findUserById(id)
        if(!user)
            throw new NotFoundException('User not found')

        const deleted = await this.userRepository.delete(user)

        if(deleted)
            return true
        return false
    }
}
