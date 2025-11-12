import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorito } from './entity/Favorito';
import { FavoritosService } from './favoritos.service';

@Module({
    imports: [TypeOrmModule.forFeature([Favorito])],
    providers: [FavoritosService]
})
export class FavoritosModule {}
