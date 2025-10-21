import { Controller, Get, Query, Post, HttpCode } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post('fetch')
  @HttpCode(201)
  async fetchAndSave() {
    return this.pokemonsService.fetchAndSavePokemons();
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('name') name?: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.pokemonsService.findAll(
      Number(page),
      Number(size),
      name ? String(name) : undefined,
      order === 'desc' ? 'desc' : 'asc',
    );
  }
}
