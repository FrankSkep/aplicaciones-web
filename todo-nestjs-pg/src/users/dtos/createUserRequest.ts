import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    MaxLength,
} from 'class-validator';

export class CreateUserRequest {
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}
