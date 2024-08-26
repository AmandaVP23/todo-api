import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Todo, User]),
  ],
})
export class TodosModule {}
