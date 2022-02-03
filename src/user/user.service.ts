import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BetService } from 'src/bet/bet.service';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserType } from './dto/user.type';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private roleService: RoleService,
        private betService: BetService
    ){}
    
    async findAllUsers(): Promise<User[]>{
        const users = await this.userRepository.find()
        return users
    }

    async findUserById(id: number): Promise<UserType>{
        const user = await this.userRepository.findOne(id)
        
        if(!user){
            throw new NotFoundException('User not found')
        }
        const bets = await this.betService.findUsersBet(id)
        return {user, bets}
    }

    async getUsersRoles(id: number): Promise<User[]>{
        const roles = await this.userRepository.find({relations: ['roles'], where: {id: id}})
        return roles
    }

    async createUser(data: CreateUserInput): Promise<User> {
        const email = await this.userRepository.findOne({where:{email: data.email}})
        if(email)
            throw new BadRequestException('Email already in use')

        const user = this.userRepository.create(data);
        
        const role = await this.roleService.getRoleByName('player')
        user.roles = [role]
        const userSaved = await this.userRepository.save(user)
        const roles = await this.userRepository.find({relations: ['roles']})
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
