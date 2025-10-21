import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dtos/createUserRequest';
import { UpdateUserRequest } from './dtos/updateUserRequest';

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

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserRequest,
    ) {
        return this.usersService.update(id, updateUserDto);
    }
}
