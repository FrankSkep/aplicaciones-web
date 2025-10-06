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
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoRequest } from './dtos/createTodoRequest';
import { UpdateTodoRequest } from './dtos/updateTodoRequest';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.todosService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() todo: CreateTodoRequest) {
        return this.todosService.create(todo);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.findOne(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() todo: UpdateTodoRequest) {
        return this.todosService.update(id, todo);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.remove(id);
    }
}
