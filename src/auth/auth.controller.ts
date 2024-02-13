import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { CreateUserDto } from './auth.dto'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signUp')
    signUp(@Body() signupdata: CreateUserDto) {
        return this.authService.signUp(signupdata);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signIn')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}