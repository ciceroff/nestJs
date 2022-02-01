import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthInput } from './dto/auth.input';
import * as bcrypt from 'bcrypt'
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async validateUser(data: AuthInput): Promise<AuthType>{
        const user = await this.userService.getUserByEmail(data.email)
        const validPassword = await bcrypt.compare(data.password, user.password)

        if(!validPassword){
            throw new UnauthorizedException('Incorrect Password')
        }

        return{
            user, token:'string'
        }
    }
}
