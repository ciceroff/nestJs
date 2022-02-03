import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthInput } from './dto/auth.input';
import * as bcrypt from 'bcrypt'
import { AuthType } from './dto/auth.type';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private roleService: RoleService
    ){}

    async validateUser(data: AuthInput): Promise<AuthType>{
        const user = await this.userService.getUserByEmail(data.email)
        if(!user)
            throw new UnauthorizedException('Invalid email')
        const roles = await this.userService.getUsersRoles(user.id)
        const validPassword = await bcrypt.compare(data.password, user.password)
        if(!validPassword){
            throw new UnauthorizedException('Incorrect Password')
        }
        let userRoles: string[] = ['teste']
        let i = 0
        userRoles.pop()
        roles.forEach((e) => {
            userRoles.push(e.roles[i].role_name)
            i++
        })
        const token = await this.jwtToken(user)
        return{
            user, token, userRoles
        }
    }
 
    private async jwtToken(user: User): Promise<string>{
        const payload = { username: user.name, sub: user.id}
        return this.jwtService.signAsync(payload)
    }
}
