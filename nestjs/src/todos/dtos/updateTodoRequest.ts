import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTodoRequest {
    @IsOptional()
    @IsString()
    @MaxLength(30)
    title?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}
