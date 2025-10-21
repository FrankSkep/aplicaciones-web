import { IsInt, IsString } from 'class-validator';

export class LoginDTO {
    @IsInt()
    id: number;

    @IsString()
    username: string;
}
