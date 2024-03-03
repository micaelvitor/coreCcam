import {
    Body,
    UseGuards,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    Param,
    Get,
    UploadedFile,
    Delete
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
        faceData.created_by = req.user.sub;
        return this.facesService.create(faceData);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('getFaces/:person_id')
    getFacesByPersonId(@Param() person_id){
        return this.facesService.getAll(person_id);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('getFaces')
    async getFaces(@Request() req){
        return await this.facesService.getAllByUser(req.user.sub);
    }

    @Delete('remove/:person_id/:image_url')
    async remove(
        @UploadedFile()
        @Param('person_id') id, 
        @Param('image_url') imageUrl
    ){
      const containerName = 'ccamstorage';
      const user = await this.facesService.remove(id, imageUrl, containerName);
      return {
        user,
        message: 'deleted successfully'
      }
    }
}