import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { RoleModule } from 'src/role/role.module';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Role]),
    UserModule,
    RoleModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '2d'}
    })
  ],
  providers: [AuthService, AuthResolver, UserService, JwtStrategy, RoleService]
})
export class AuthModule {} 
