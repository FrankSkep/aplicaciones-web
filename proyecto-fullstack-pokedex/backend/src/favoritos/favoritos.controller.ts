import { Controller, Param, Post, UseGuards, Request, Get } from "@nestjs/common";
import { FavoritosService } from "./favoritos.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('favoritos')
export class FavoritosController {
    constructor(private readonly favoritosService: FavoritosService) {}
    
    @UseGuards(AuthGuard)
    @Post(':pokemonId')
    async addFavorito(@Param('pokemonId') pokemonId: number, @Request() req) {
        try {
            return await this.favoritosService.addFavorito(pokemonId, req.user);
        } catch (error) {
            return { error: error.message };
        }
    }

    @UseGuards(AuthGuard)
    @Get()
    async getFavoritos(@Request() req) {
        try {
            return await this.favoritosService.getFavoritos(req.user);
        } catch (error) {
            return { error: error.message };
        }
    }
}