import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const user = await this.usersService.findOneByUsername(req.user.username);
        delete user.id;
        delete user.password;
        return user;
    }

}
