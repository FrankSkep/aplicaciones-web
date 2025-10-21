import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  image: string;


  @Column('simple-array', { nullable: true })
  types: string[];

  @Column('simple-array', { nullable: true })
  abilities: string[];

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  weight: number;
}
