import { InjectRepository } from "@nestjs/typeorm";
import { Favorito } from "./entity/Favorito";
import { Repository } from "typeorm";
export class FavoritosService { 
    constructor(
        @InjectRepository(Favorito)
        private readonly favoritosRepository: Repository<Favorito>,
    ) { }
    
    async addFavorito(pokemonId: number, user: any): Promise<Favorito> {
        // Verificar si ya existe el favorito para este usuario y pokemon
        const existe = await this.favoritosRepository.findOne({
            where: {
                idPokemon: pokemonId,
                user: { id: user.id }
            }
        });
        if (existe) {
            throw new Error('El favorito ya existe para este usuario');
        }
        const favorito: Favorito = this.favoritosRepository.create({ idPokemon: pokemonId, user: user });
        return this.favoritosRepository.save(favorito);
    }

    async getFavoritos(user: any): Promise<Favorito[]> {
        // Obtener los favoritos asociados al usuario
        return this.favoritosRepository.find({
            where: {
                user: { id: user.id },
            },
        });
    }
}