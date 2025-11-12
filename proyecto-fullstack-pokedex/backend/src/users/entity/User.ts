import { Favorito } from 'src/favoritos/entity/Favorito';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Favorito, (favorito) => favorito.user)
    favoritos: Favorito[];
}
