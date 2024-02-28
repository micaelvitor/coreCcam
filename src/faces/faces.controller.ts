import {
    Body,
    UseGuards,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    Param,
    Get
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { FacesService } from './faces.service';
import { CreateFaceDto } from './faces.dto';


@Controller('faces')
export class FacesController {
    constructor(
        private facesService: FacesService
    ) {}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('createFace')
    createFace(
        @Body() faceData: CreateFaceDto,
        @Request() req
    ){
        return this.facesService.create(faceData, req.user.username);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('getFaces/:person_id')
    getFaces(@Param() person_id){
        return this.facesService.getAll(person_id);
    }
}