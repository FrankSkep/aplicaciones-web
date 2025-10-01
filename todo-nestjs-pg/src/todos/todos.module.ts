import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/Todo';

@Module({
    providers: [TodosService],
    controllers: [TodosController],
    exports: [TodosService],
    imports: [TypeOrmModule.forFeature([Todo])],
})
export class TodosModule {}
