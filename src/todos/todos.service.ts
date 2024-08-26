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
        const userFound = await this.userRepository.findOneBy({ id: userId });
        if (!userFound) {
            throw new NotFoundException();
        }

        const todo = this.todoRepository.create({
            ...createTodoDto,
            user: userFound,
        });

        const { user, ...rest } = await this.todoRepository.save(todo);

        return rest;
    }
    
    async findUserTodos(userId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException();
        }

        const todosList = await this.todoRepository.find({ where: { user } })

        return todosList;
    }
    
    async findOne(id: number, userId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException();
        }

        const todo = await this.todoRepository.findOne({ where: { id, user } });

        if (!todo) {
            throw new NotFoundException();
        }

        return todo;
    }
    
    async update(userId: number, id: number, updateTodoDto: UpdateTodoDto) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException();
        }

        const todoFound = await this.todoRepository.findOne({ where: { id, user } });
        if (!todoFound) {
            throw new NotFoundException();
        }
        
        const newTodo = {
            ...todoFound,
            ...updateTodoDto,
        }

        return this.todoRepository.save(newTodo);
    }
    
    async remove(userId: number, id: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException();
        }

        const todoFound = await this.todoRepository.findOne({ where: { id, user } });
        if (!todoFound) {
            throw new NotFoundException();
        }

        return await this.todoRepository.remove(todoFound);
    }
}
