import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ){}

    async getAllRoles(): Promise<Role[]>{
        const roles = await this.roleRepository.find()
        return roles
    }

    async getRoleByName(name: string): Promise<Role>{
        const role = await this.roleRepository.findOne({where:{role_name: name}})
        if (!role)
            throw new NotFoundException('Role not found')

        return role
    }

    async getUserRoles(id: number): Promise<Role[]>{
        const roles = await this.roleRepository.find({relations: ['roles']})
        return roles
    }

    async createRole(data: CreateRoleInput): Promise<Role>{
        const role = this.roleRepository.create(data)
        const roleSaved = await this.roleRepository.save(role)

        if(!roleSaved)
            throw new InternalServerErrorException('Problem when creating role')

        return roleSaved
    }
}
