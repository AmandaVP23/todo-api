import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginResponseDTO } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { RegisterUserDTO } from '../users/dto/register-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(username: string, pass: string): Promise<LoginResponseDTO> {
        const user = await this.usersService.findOneByUsername(username);

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const { password, ...result } = user;

        const payload = { sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async registerUser(registerUserDto: RegisterUserDTO): Promise<User> {
        const existentUser = await this.usersService.findOneByUsername(registerUserDto.username);

        if (existentUser) {
            throw new BadRequestException('That username is already being used');
        }

        return this.usersService.createNew(registerUserDto);
    }
}
