import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.entity';
import { BetService } from 'src/bet/bet.service';
import { BetModule } from 'src/bet/bet.module';
import { Bet } from 'src/bet/bet.entity';
import { GameModule } from 'src/game/game.module';
import { Game } from 'src/game/game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Bet, Game]),
    RoleModule,
    BetModule,
    GameModule
  ],
  providers: [UserService, UserResolver, RoleService, BetService]
})
export class UserModule {}
