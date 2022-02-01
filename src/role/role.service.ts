import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

    async getUserRoles(id: number): Promise<Role[]>{
        const roles = await this.roleRepository.find({where: {id}})
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
