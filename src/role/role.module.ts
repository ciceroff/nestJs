import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { BetService } from 'src/bet/bet.service';
import { BetModule } from 'src/bet/bet.module';
import { Bet } from 'src/bet/bet.entity';
import { Game } from 'src/game/game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User, Bet, Game]),
    BetModule,
  ],
  providers: [RoleService, RoleResolver, UserService, BetService]
})
export class RoleModule {}
