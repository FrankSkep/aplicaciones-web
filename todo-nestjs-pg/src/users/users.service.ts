import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/User';
import { Repository } from 'typeorm';
import { CreateUserRequest } from './dtos/createUserRequest';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repositorio: Repository<User>,
    ) {}

    async create(createUserRequest: CreateUserRequest) {
        let hashedPassword = await bcrypt.hash(createUserRequest.password, 10);
        const user = this.repositorio.create({
            ...createUserRequest,
            password: hashedPassword,
        });
        return this.repositorio.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.repositorio.find();
    }
}
