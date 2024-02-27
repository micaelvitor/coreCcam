import {
    Body,
    UseGuards,
    Controller,
    HttpCode,
    HttpStatus,
    Post
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { FacesService } from './faces.service';
import { CreateFaceDto } from './faces.dto';


@Controller('faces')
export class AuthController {
    constructor(
        private facesService: FacesService,

    ) {}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('createFace')
    signUp(@Body() faceData: CreateFaceDto) {
        return this.facesService.create(faceData);
    }
}