import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './game.entity';

@Injectable()
export class GameService {
    constructor( 
        @InjectRepository(Game)
        private gameRepository: Repository<Game>
    ){}
    
    async createGame(data: CreateGameInput): Promise<Game>{
        const repeated = await this.gameRepository.findOne({where:{type: data.type}})
        if(repeated)   
            throw new BadRequestException('Type already exists')
            
        const game = this.gameRepository.create(data)
        const gameSave = await this.gameRepository.save(game)

        if(!gameSave)
            throw new InternalServerErrorException('Problems with game creation')

        return gameSave
    }

    async findAllGames(): Promise<Game[]>{
        const games = await this.gameRepository.find()
        return games
    }

    async findGameById(id:number): Promise<Game>{
        const game = await this.gameRepository.findOne(id)
        if(!game)
            throw new NotFoundException('Game not found')
        return game
    }

    async deleteGame(id: number): Promise<Boolean>{
        const game = await this.gameRepository.findOne(id)
        if(!game)
            throw new NotFoundException('Game not found')

        const deleted = await this.gameRepository.delete(game)

        if(deleted)
            return true
        return false

    }

    async updateGame(id: number, data: UpdateGameInput): Promise<Game>{
        const game = await this.findGameById(id)
        if(!game)
            throw new NotFoundException('User not found')

        await this.gameRepository.update(game, {...data})
        const gameUpdated = this.gameRepository.create({...game, ...data})
        return gameUpdated
        
    }
}
