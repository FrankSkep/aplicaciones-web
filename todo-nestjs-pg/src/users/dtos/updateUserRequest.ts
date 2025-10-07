import {
    IsEmail,
    IsString,
    IsStrongPassword,
    IsOptional,
    MinLength,
} from 'class-validator';

export class UpdateUserRequest {
    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsStrongPassword()
    @MinLength(8)
    password?: string;
}
