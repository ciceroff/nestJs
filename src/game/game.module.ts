import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Game])],
  providers: [GameService, GameResolver]
})
export class GameModule {}
