import {
    Body,
    Get,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    Request
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { RegisterUserDTO } from 'src/users/dto/register-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Login' })
    @ApiBody({ type: LoginDTO })
    signIn(@Body() signInDto: LoginDTO) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register new user' })
    @ApiBody({ type: RegisterUserDTO })
    register(@Body() registerUserDto: RegisterUserDTO) {
        return this.authService.registerUser(registerUserDto);
    }

    @Get('logout')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Logout user' })
    logout(@Request() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.authService.logout(token);
    }

    @Get('protected')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    getProtected(@Request() req) {
        return req.user;
    }
}
