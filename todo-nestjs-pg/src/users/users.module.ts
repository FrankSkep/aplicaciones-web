import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/todos/entity/User';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
    imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
