import { User } from "src/users/entity/User";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('favoritos')
export class Favorito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idPokemon: number;

    // Relación ManyToOne con User. No usar @Column() en la relación.
    @ManyToOne(() => User, (user) => user.favoritos)
    @JoinColumn({ name: 'userId' })
    user: User;
}