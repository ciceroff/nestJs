import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { CreateBetInput } from './dto/create-bet.input';

@Injectable()
export class BetService {
    constructor(
        @InjectRepository(Bet)
        private betRepository: Repository<Bet>,
        @InjectRepository(Game)
        private gameRepository: Repository<Game>
    ){}

    async findAllBets(): Promise<Bet[]>{
        const bets = await this.betRepository.find()
        return bets
    }

    async createBet(data: CreateBetInput): Promise<Bet>{
        const game = await this.gameRepository.findOne(data.game_id)
        let filled_numbers = data.filled_numbers.split(',')
        
        if(filled_numbers.length != game.range){
            throw new BadRequestException(`The bet should have${game.range} numbers`)
        }

        filled_numbers.forEach((element) => {
            if(parseInt(element) <= 0 || parseInt(element) > game.max_number)
                throw new BadRequestException(`The numbers can not be bigger than ${game.max_number}`)
        })
        const bet = this.betRepository.create(data)
        const betSaved = await this.betRepository.save(bet)
        return betSaved
    }

    async deleteBet(id:number):Promise<boolean>{
        const bet = await this.betRepository.findOne(id)
        if(!bet)
            throw new BadRequestException('Bet not found')

        const deleted = await this.betRepository.delete(bet)

        if(deleted)
            return true
        return false
    }

    async getBetById(id: number): Promise<Bet>{
        const bet = await this.betRepository.findOne(id)
        if(!bet)
            throw new BadRequestException('There is no bet with this id')
        return bet
    }
}
