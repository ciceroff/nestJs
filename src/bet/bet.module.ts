import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BetResolver } from './bet.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './bet.entity';
import { Game } from 'src/game/game.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bet, Game])],
  providers: [BetService, BetResolver]
})
export class BetModule {}
