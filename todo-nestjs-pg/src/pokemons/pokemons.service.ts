import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entity/pokemon.entity';
import axios from 'axios';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async fetchAndSavePokemons(): Promise<Pokemon[]> {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200');
    const pokemons = response.data.results;
    const entities: Pokemon[] = [];
    for (const poke of pokemons) {
      try {
        const detail = await axios.get(poke.url);
        const data = detail.data;
        entities.push(this.pokemonRepository.create({
          name: poke.name,
          url: poke.url,
          image: data.sprites?.front_default || null,
          types: Array.isArray(data.types) ? data.types.map((t: any) => t.type.name) : [],
          abilities: Array.isArray(data.abilities) ? data.abilities.map((a: any) => a.ability.name) : [],
          height: data.height || null,
          weight: data.weight || null,
        }));
      } catch (e) {
        // Si falla, guarda solo nombre y url
        entities.push(this.pokemonRepository.create({
          name: poke.name,
          url: poke.url,
        }));
      }
    }
    // Elimina duplicados por nombre
    const uniqueEntities = entities.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);
    return this.pokemonRepository.save(uniqueEntities);
  }

  async findAll(page: number = 1, size: number = 20, name?: string): Promise<{
    data: Pokemon[];
    total: number;
    page: number;
    size: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextPage: number | null;
    prevPage: number | null;
  }> {
    // normalize inputs
    let p = Number(page) || 1;
    let s = Number(size) || 20;
    if (p < 1) p = 1;
    if (s < 1) s = 20;

    // If no name filter, use the simpler findAndCount
    if (!name) {
      const [data, total] = await this.pokemonRepository.findAndCount({
        skip: (p - 1) * s,
        take: s,
        order: { id: 'ASC' },
      });
      const totalPages = Math.ceil(total / s);
      const hasNext = p < totalPages;
      const hasPrev = p > 1;
      return {
        data,
        total,
        page: p,
        size: s,
        totalPages,
        hasNext,
        hasPrev,
        nextPage: hasNext ? p + 1 : null,
        prevPage: hasPrev ? p - 1 : null,
      };
    }

    // Name filter provided -> use QueryBuilder with ILIKE (Postgres)
    const qb = this.pokemonRepository.createQueryBuilder('pokemon');
    qb.where('pokemon.name ILIKE :name', { name: `%${name}%` });

    const total = await qb.getCount();

    qb.orderBy('pokemon.id', 'ASC')
      .skip((p - 1) * s)
      .take(s);

    const data = await qb.getMany();
    const totalPages = Math.ceil(total / s);
    const hasNext = p < totalPages;
    const hasPrev = p > 1;
    return {
      data,
      total,
      page: p,
      size: s,
      totalPages,
      hasNext,
      hasPrev,
      nextPage: hasNext ? p + 1 : null,
      prevPage: hasPrev ? p - 1 : null,
    };
  }
}
