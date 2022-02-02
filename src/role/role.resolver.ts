import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { isAdminGuard } from 'src/auth/admin.guard';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Resolver()
export class RoleResolver {
    constructor(
        private roleService: RoleService
    ){}

    @UseGuards(isAdminGuard)
    @UseGuards(GqlAuthGuard)
    @Query(() => [Role])
    async roles(): Promise<Role[]>{
        const roles = await this.roleService.getAllRoles()
        return roles
    }
    
    @UseGuards(isAdminGuard)
    @UseGuards(GqlAuthGuard)
    @Query(() => [Role])
    async userRoles(@Args('id') id: number): Promise<Role[]>{
        const roles = await this.roleService.getUserRoles(id)
        return roles
    }

    @UseGuards(isAdminGuard)
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Role)
    async createRole(@Args('data') data: CreateRoleInput): Promise<Role>{
        const role = await this.roleService.createRole(data)
        return role
    }
}
