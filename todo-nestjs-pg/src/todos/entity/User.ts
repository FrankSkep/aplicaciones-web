import {
    IsEmail,
    IsInt,
    IsPositive,
    IsString,
    MinLength,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @IsInt()
    @IsPositive()
    id: number;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsString()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @MinLength(6)
    password: string;
}
