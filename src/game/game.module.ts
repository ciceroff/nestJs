import { forwardRef, Module } from '@nestjs/common';
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
import { BetModule } from 'src/bet/bet.module';
import { BetService } from 'src/bet/bet.service';
import { Bet } from 'src/bet/bet.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Game, User, Role, Bet]),
    forwardRef(()=>UserModule),
    RoleModule,
    BetModule
  ],
  providers: [GameService, GameResolver, UserService, RoleService, BetService]
})
export class GameModule {}
