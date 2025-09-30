import {
    IsBoolean,
    IsInt,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    @IsInt()
    @IsPositive()
    id: number;

    @Column()
    @IsString()
    title: string;

    @Column({ default: false })
    @IsBoolean()
    @IsOptional()
    completed: boolean;
}
