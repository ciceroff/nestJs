import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Resolver()
export class RoleResolver {
    constructor(
        private roleService: RoleService
    ){}
    
    @Query(() => [Role])
    async roles(): Promise<Role[]>{
        const roles = await this.roleService.getAllRoles()
        return roles
    }

    @Query(() => [Role])
    async userRoles(@Args('id') id: number): Promise<Role[]>{
        const roles = await this.roleService.getUserRoles(id)
        return roles
    }

    @Mutation(() => Role)
    async createRole(@Args('data') data: CreateRoleInput): Promise<Role>{
        const role = await this.roleService.createRole(data)
        return role
    }
}
