import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      // isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public')
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports:[ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB')
      }),

    }),
    PokemonModule,
    CommonModule,
    SeedModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private configService: ConfigService){
    
  }
}
