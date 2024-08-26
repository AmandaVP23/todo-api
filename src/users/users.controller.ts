import { Get, Controller, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { instanceToPlain } from 'class-transformer';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    getLoggedUser(@Request() req) {
        return instanceToPlain(this.usersService.findOne(req['user'].id)) as User;
    }
}
