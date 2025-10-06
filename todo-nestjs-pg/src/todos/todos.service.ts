import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoRequest } from './dtos/createTodoRequest';
import { UpdateTodoRequest } from './dtos/updateTodoRequest';
import { Todo } from './entity/Todo';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private readonly repositorio: Repository<Todo>,
    ) {}

    async findAll(): Promise<Todo[]> {
        return await this.repositorio.find();
    }

    async findOne(id: number): Promise<Todo> {
        return await this.repositorio.findOneBy({ id }).then((todo) => {
            if (!todo) {
                throw new NotFoundException(`Todo with ID ${id} not found`);
            }
            return todo;
        });
    }

    async create(createTodo: CreateTodoRequest): Promise<Todo> {
        const newTodo: Todo = this.repositorio.create({
            title: createTodo.title,
            completed: false,
        });
        return await this.repositorio.save(newTodo);
    }

    async update(id: number, updateTodo: UpdateTodoRequest): Promise<Todo> {
        const { title, completed } = updateTodo;

        const todoToUpdate: Todo = await this.findOne(id);

        if (title) todoToUpdate.title = title;
        if (completed !== undefined) todoToUpdate.completed = completed;

        return await this.repositorio.save(todoToUpdate);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.repositorio.delete(id);
    }
}
