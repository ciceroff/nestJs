import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.entity';
import { RoleService } from 'src/role/role.service';
import { RoleModule } from 'src/role/role.module';
import { Role } from 'src/role/role.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Game, User, Role]),
    UserModule,
    RoleModule
  ],
  providers: [GameService, GameResolver, UserService, RoleService]
})
export class GameModule {}
