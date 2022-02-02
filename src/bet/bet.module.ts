import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BetResolver } from './bet.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './bet.entity';
import { Game } from 'src/game/game.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.entity';
import { RoleService } from 'src/role/role.service';
import { RoleModule } from 'src/role/role.module';
import { Role } from 'src/role/role.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Bet, Game, User, Role]),
    UserModule,
    RoleModule
  ],
  providers: [BetService, BetResolver, UserService, RoleService]
})
export class BetModule {}
