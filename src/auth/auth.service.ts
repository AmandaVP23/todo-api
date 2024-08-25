import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginResponseDTO } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { RegisterUserDTO } from '../users/dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlacklistToken } from './entities/blacklist-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(BlacklistToken)
        private readonly blacklistTokenRepository: Repository<BlacklistToken>,
    ) {}

    async signIn(username: string, pass: string): Promise<LoginResponseDTO> {
        const user = await this.usersService.findOneByUsername(username);
        if (!user) {
            throw new UnauthorizedException();
        }

        const passwordIsValid = await bcrypt.compare(pass, user.password);

        if (!passwordIsValid) {
            throw new UnauthorizedException();
        }

        const { password, ...result } = user;

        const payload = { sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async logout(token: string) {
        const decoded = this.jwtService.decode(token);
        console.log('------');
        console.log(decoded);

        const expiration = new Date(decoded.exp * 1000);
        console.log(expiration);

        const blacklistToken = new BlacklistToken();
        blacklistToken.token = token;
        blacklistToken.expiresAt = expiration;

        await this.blacklistTokenRepository.save(blacklistToken);
    };

    async registerUser(registerUserDto: RegisterUserDTO): Promise<Omit<User, 'password'>> {
        const existentUser = await this.usersService.findOneByUsername(registerUserDto.username);

        if (existentUser) {
            throw new BadRequestException('That username is already being used');
        }

        return this.usersService.createNew(registerUserDto);
    }

    async isBlacklisted(token: string): Promise<boolean> {
        const blacklistToken = await this.blacklistTokenRepository.findOne({ where: { token } });
        
        return !!blacklistToken;
    }
}
