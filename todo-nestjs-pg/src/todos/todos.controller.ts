import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoRequest } from './dtos/createTodoRequest';
import { UpdateTodoRequest } from './dtos/updateTodoRequest';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @UseGuards(AuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.todosService.findAll();
    }

    @UseGuards(AuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() todo: CreateTodoRequest) {
        return this.todosService.create(todo);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() todo: UpdateTodoRequest) {
        return this.todosService.update(id, todo);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.remove(id);
    }
}
