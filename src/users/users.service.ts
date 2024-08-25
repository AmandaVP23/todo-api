import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/register-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User | undefined> {
        return this.usersRepository.findOneBy({ id });
    }

    findOneByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ username });
    }

    createNew(registerUserDto: RegisterUserDTO): Promise<User> {
        const newUser = this.usersRepository.create(registerUserDto);
        return this.usersRepository.save(newUser);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
