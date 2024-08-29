import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { LessThan, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CursorPaginationDTO } from 'src/misc/dto/cursor-pagination.dto';
import { DEFAULT_PAGINATION_LIMIT } from 'src/misc/constants';

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
    
    async findUserTodos(userId: number, paginationDTO: CursorPaginationDTO) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException();
        }

        console.log(paginationDTO);

        // const where: any = {};
        // if (paginationDTO.cursor) {
        //     where.createdAt = LessThan(new Date(paginationDTO.cursor));
        // }

        // where.userId = user.id;

        // return this.todoRepository.find({
        //     where,
        //     order: {
        //         createdAt: 'DESC',
        //     },
        //     take: paginationDTO.limit || DEFAULT_PAGINATION_LIMIT,
        // })

        let query = this.todoRepository.createQueryBuilder('todo')
            .orderBy('todo.createdAt', 'DESC')
            .where('todo.userId = :userId', { userId })
            .limit(paginationDTO.limit ? Number(paginationDTO.limit) : DEFAULT_PAGINATION_LIMIT)

        if (paginationDTO.cursor) {
            query = query.andWhere('todo.createdAt < :cursor', { cursor: paginationDTO.cursor });
        }

        const todosList = await query.getMany();
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
