import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { isAdminGuard } from 'src/auth/admin.guard';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { Bet } from './bet.entity';
import { BetService } from './bet.service';
import { CreateBetInput } from './dto/create-bet.input';

@Resolver()
export class BetResolver {
    constructor(
        protected betService: BetService
    ){}
    
    @UseGuards(isAdminGuard)
    @UseGuards(GqlAuthGuard)
    @Query(() => [Bet])
    async bets():Promise<Bet[]>{
        const bet = await this.betService.findAllBets()
        return bet
    }
    
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Bet)
    async createBet(@Args('data') data:CreateBetInput): Promise<Bet>{
        const bet = await this.betService.createBet(data)
        return bet
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async deleteBet(@Args('id') id: number): Promise<boolean>{
        const deleted = await this.betService.deleteBet(id)
        return deleted
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Bet)
    async bet(@Args('id') id:number): Promise<Bet>{
        const bet = await this.betService.getBetById(id)
        return bet
    }
}
