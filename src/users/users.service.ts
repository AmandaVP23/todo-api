import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

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

    async createNew(registerUserDto: RegisterUserDTO): Promise<Omit<User, 'password'>> {
        const salt = await bcrypt.genSalt();
        const passwordHashed = await bcrypt.hash(registerUserDto.password, salt);

        const newUser = this.usersRepository.create({
            ...registerUserDto,
            password: passwordHashed,
        });
        
        const { password, ...rest } = await this.usersRepository.save(newUser);

        return rest;
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
