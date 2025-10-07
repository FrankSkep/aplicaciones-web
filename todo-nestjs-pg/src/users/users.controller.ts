import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dtos/createUserRequest';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.usersService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserRequest) {
        return this.usersService.create(createUserDto);
    }
}
