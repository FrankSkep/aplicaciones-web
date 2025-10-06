import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/todos/entity/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repositorio: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return await this.repositorio.find();
    }
}
