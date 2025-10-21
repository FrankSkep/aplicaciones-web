import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/User';
import { LoginDTO } from 'src/auth/dtos/LoginDTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

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

    async login(user: LoginDTO) {
        const { id, username } = await user;

        const payload = {
            sub: id,
            username,
        };

        const access_token = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15m',
        });

        const refresh_token = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });

        return { access_token, refresh_token, user };
    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const user = await this.usersService.findByUsername(
                payload.username,
            );

            if (!user) {
                throw new UnauthorizedException('Usuario no encontrado');
            }

            const newPayload = {
                sub: user.id,
                username: user.username,
            };

            // Solo se genera un nuevo access_token
            const access_token = this.jwtService.sign(newPayload, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m',
            });

            return { access_token };
        } catch (error) {
            throw new UnauthorizedException('Token de refresco inválido o expirado');
        }
    }
}
