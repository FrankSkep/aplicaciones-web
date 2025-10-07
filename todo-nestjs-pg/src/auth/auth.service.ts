import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/User';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validate(
        username: string,
        password: string,
    ): Promise<{ id: number; username: string }> {
        const usuario: User | null =
            await this.usersService.findByUsername(username);

        if (usuario && (await bcrypt.compare(password, usuario.password))) {
            return { id: usuario.id, username: usuario.username };
        } else {
            throw new UnauthorizedException('Credenciales incorrectas');
        }
    }
}
