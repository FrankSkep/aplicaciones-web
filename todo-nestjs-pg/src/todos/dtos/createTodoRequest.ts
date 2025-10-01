import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTodoRequest {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}
