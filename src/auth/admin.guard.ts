import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class isAdminGuard{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async canActivate( context: ExecutionContext): Promise<boolean>{
        const ctx = GqlExecutionContext.create(context);
        const {req} = ctx.getContext()
        const token = req.headers.authorization.split(' ')[1];
        const tokenPayload = this.parseJwt(token)
        const user = await this.userRepository.find({relations: ['roles']})
        for (let i = 0; i < user.length; i++) {
            if(user[i].id === tokenPayload.sub){ //TA DANDO ERRO AQUI PQ O REQ.USER É UNDEFINED
                for (let j = 0; j < user[i].roles.length; j++) {
                   if(user[i].roles[j].role_name === "admin")
                    return true
                }
            }   
        }
        throw new UnauthorizedException('Only admin has access to this method')
    }

    parseJwt(token: string){
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = Buffer.from(base64, 'base64');
        return JSON.parse(payload.toString());
    }
}