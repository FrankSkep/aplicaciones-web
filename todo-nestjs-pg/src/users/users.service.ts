import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/User';
import { Repository } from 'typeorm';
import { CreateUserRequest } from './dtos/createUserRequest';
import * as bcrypt from 'bcrypt';
import { UpdateUserRequest } from './dtos/updateUserRequest';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repositorio: Repository<User>,
    ) {}

    async create(createUserRequest: CreateUserRequest) {
        try {
            const hashedPassword = await bcrypt.hash(
                createUserRequest.password,
                10,
            );
            const user = this.repositorio.create({
                ...createUserRequest,
                password: hashedPassword,
            });
            return await this.repositorio.save(user);
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    private handleDatabaseError(error: any): never {
        // error de clave duplicada (PostgreSQL error code 23505)
        if (error.code === '23505') {
            const field = error.detail?.includes('username')
                ? 'nombre de usuario'
                : error.detail?.includes('email')
                  ? 'correo electrónico'
                  : 'valor';
            throw new ConflictException(`El ${field} ya está en uso`);
        }

        throw new BadRequestException(
            error.message || 'Error al procesar la solicitud',
        );
    }

    async update(id: number, updateUserRequest: UpdateUserRequest) {
        try {
            if (updateUserRequest.password) {
                updateUserRequest.password = await bcrypt.hash(
                    updateUserRequest.password,
                    10,
                );
            }
            await this.repositorio.update(id, updateUserRequest);
            return this.repositorio.findOneBy({ id });
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    async findAll(): Promise<User[]> {
        return await this.repositorio.find();
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.repositorio.findOneBy({ username });
    }
}
