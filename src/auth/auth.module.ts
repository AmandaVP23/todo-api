import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistToken } from './entities/blacklist-token.entity';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '8h' }
        }),
        TypeOrmModule.forFeature([BlacklistToken]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthGuard,
    ],
    exports: [AuthService, AuthGuard],
})
export class AuthModule {}
