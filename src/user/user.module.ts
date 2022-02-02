import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RoleModule,
  ],
  providers: [UserService, UserResolver, RoleService]
})
export class UserModule {}
