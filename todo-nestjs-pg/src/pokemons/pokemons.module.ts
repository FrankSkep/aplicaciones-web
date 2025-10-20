import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entity/pokemon.entity';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  providers: [PokemonsService],
  controllers: [PokemonsController],
})
export class PokemonsModule {}
