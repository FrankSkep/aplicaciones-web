import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entity/Todo';
import { createMockRepository, MockRepo } from '../common/test-util';
import { NotFoundException } from '@nestjs/common';
import { CreateTodoRequest } from './dtos/createTodoRequest';

describe('TodosService', () => {
    let service: TodosService;
    let repositoryMock: MockRepo<Todo>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodosService,
                {
                    provide: getRepositoryToken(Todo),
                    useValue: createMockRepository<Todo>(),
                },
            ],
        }).compile();

        service = module.get<TodosService>(TodosService);
        repositoryMock = module.get<MockRepo<Todo>>(getRepositoryToken(Todo));
    });

    it('debe estar definido', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('retorna todos los registros', async () => {
            const todos: Todo[] = [
                { id: 1, title: 'a', completed: false },
                { id: 2, title: 'b', completed: true },
            ];
            repositoryMock.find.mockResolvedValue(todos);
            await expect(service.findAll()).resolves.toEqual(todos);
            expect(repositoryMock.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('findOne', () => {
        it('retorna un todo existente', async () => {
            const todo: Todo = { id: 10, title: 'x', completed: false };
            repositoryMock.findOneBy.mockResolvedValue(todo);
            await expect(service.findOne(10)).resolves.toEqual(todo);
            expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 10 });
        });

        it('lanza NotFoundException si no existe', async () => {
            repositoryMock.findOneBy.mockResolvedValue(null);
            await expect(service.findOne(99)).rejects.toBeInstanceOf(
                NotFoundException,
            );
        });
    });

    describe('create', () => {
        it('crea y persiste un nuevo todo con completede=false por defecto', async () => {
            const dto = { title: 'Nuevo todo' } as CreateTodoRequest;
            const created: Todo = {
                id: 123,
                title: dto.title,
                completed: false,
            };
            repositoryMock.create.mockReturnValue(created);
            repositoryMock.save.mockResolvedValue(created);

            await expect(service.create(dto)).resolves.toEqual(created);
            expect(repositoryMock.create).toHaveBeenCalledWith({
                title: dto.title,
                completed: false,
            });
            expect(repositoryMock.save).toHaveBeenCalledWith(created);
        });
    });

    describe('update', () => {
        it('actualiza campos existentes', async () => {
            const existing: Todo = { id: 5, title: 'Viejo', completed: false };
            repositoryMock.findOneBy.mockResolvedValue(existing);

            const saved: Todo = { id: 5, title: 'Nuevo', completed: true };
            repositoryMock.save.mockResolvedValue(saved);

            await expect(
                service.update(5, { title: 'Nuevo', completed: true } as any),
            ).resolves.toEqual(saved);

            expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 5 });
            expect(repositoryMock.save).toHaveBeenCalledWith(saved);
        });

        it('lanza NotFound al intentar actualizar inexistente', async () => {
            repositoryMock.findOneBy.mockResolvedValue(null);
            await expect(
                service.update(50, { title: 'Nada' } as any),
            ).rejects.toBeInstanceOf(NotFoundException);
        });
    });

    describe('remove', () => {
        it('elimina un todo existente', async () => {
            const existing: Todo = { id: 7, title: 'Borrar', completed: false };
            repositoryMock.findOneBy.mockResolvedValue(existing);
            repositoryMock.delete.mockResolvedValue({} as any);

            await expect(service.remove(7)).resolves.toBeUndefined();
            expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 7 });
            expect(repositoryMock.delete).toHaveBeenCalledWith(7);
        });

        it('lanza NotFound al intentar eliminar inexistente', async () => {
            repositoryMock.findOneBy.mockResolvedValue(null);
            await expect(service.remove(123)).rejects.toBeInstanceOf(
                NotFoundException,
            );
        });
    });
});
