import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Get
} from '@nestjs/common';
import { CreateUserDto } from './auth.dto'
import { AuthService } from './auth.service';
import { PurposeService } from 'src/purpose/purpose.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private PurposeService: PurposeService

    ) {}

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

    @HttpCode(HttpStatus.OK)
    @Get('purposes')
    async purposes() {
        return await this.PurposeService.findAllPurposes();
    }
}