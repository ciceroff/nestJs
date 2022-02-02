import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User])
  ],
  providers: [RoleService, RoleResolver, UserService]
})
export class RoleModule {}
