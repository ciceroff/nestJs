import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './game.entity';
import { GameService } from './game.service';

@Resolver('Game')
export class GameResolver {
    constructor(
        private gameService: GameService
    ){}

    @Mutation(() => Game)
    async createGame(
        @Args('data') data: CreateGameInput
    ): Promise<Game>{
        const game = await this.gameService.createGame(data)
        return game
    }

    @Query(() => [Game])
    async games(): Promise<Game[]>{
        const games = await this.gameService.findAllGames()
        return games
    }

    @Query(() => Game)
    async game( 
        @Args('id') id:number
    ): Promise<Game>{
        const game = await this.gameService.findGameById(id)
        return game
    }

    @Mutation(() => Boolean)
    async deleteGame(
        @Args('id') id:number
    ): Promise<Boolean>{
        const deleted = await this.gameService.deleteGame(id)
        return deleted
    }

    @Mutation(() => Game)
    async updateGame(
        @Args('id') id:number,
        @Args('data') data: UpdateGameInput,
    ): Promise<Game>{
        const updated = await this.gameService.updateGame(id, data)
        return updated
    }
}
