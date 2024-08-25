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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { RegisterUserDTO } from 'src/users/dto/register-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @HttpCode(HttpStatus.OK)
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

    @UseGuards(AuthGuard)
    @Get('protected')
    getProtected(@Request() req) {
        return req.user;
    }
}
