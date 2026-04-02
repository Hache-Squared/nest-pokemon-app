import { Inject, Injectable } from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { PokemonService } from 'src/pokemon/pokemon.service';
import {  HttpAdapter } from 'src/common/interfaces/http-adapter.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  
  
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpAdapter: HttpAdapter
    // private readonly pokemonService: PokemonService
  ) {
    
    
  }

  async executeSeed(){

    await this.pokemonModel.deleteMany({});

    const data  = await this.httpAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

    const pokemonToInsert: {name: string, no: number}[] = [];

    data.results.forEach(({name, url}) => 
      {
        const segments = url.split('/');
        const no: number = +segments[segments.length - 2];
        pokemonToInsert.push( { name, no } );
      }
    );
    await this.pokemonModel.insertMany(pokemonToInsert);
    // const insertPromiseArray  = [];
    
    // data.results.forEach(({name, url}) => 
    //   {
    //     const segments = url.split('/');
    //     const no: number = +segments[segments.length - 2];
    //     insertPromiseArray.push( this.pokemonModel.create({ name, no }) )
    //   }
    // );

    // await Promise.all(insertPromiseArray);
    return 'Seed executed';
  }
}
