import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    

    async create(createTodoDto: CreateTodoDto, userId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException();
        }

        const todo = this.todoRepository.create({
            ...createTodoDto,
            user,
        });

        return this.todoRepository.save(todo);
    }
    
    findAll() {
        return `This action returns all todos`;
    }
    
    findOne(id: number) {
        return `This action returns a #${id} todo`;
    }
    
    update(id: number, updateTodoDto: UpdateTodoDto) {
        return `This action updates a #${id} todo`;
    }
    
    remove(id: number) {
        return `This action removes a #${id} todo`;
    }
}
