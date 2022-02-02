import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule} from '@nestjs/graphql'
import { join } from 'path'
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { BetModule } from './bet/bet.module';
import { RoleModule } from './role/role.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({req}) => ({req})
    }),
    UserModule,
    GameModule,
    AuthModule,
    BetModule,
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
