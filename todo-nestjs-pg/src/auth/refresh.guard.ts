import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractRefreshTokenFromCookie(request);

        if (!token) {
            throw new UnauthorizedException('Refresh token no encontrado');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            request['refreshToken'] = token;
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException(
                'Refresh token inválido o expirado',
            );
        }

        return true;
    }

    private extractRefreshTokenFromCookie(request: Request): string | undefined {
        return request.cookies?.refresh_token;
    }
}
