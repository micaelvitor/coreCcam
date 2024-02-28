import { Controller, Get, Param } from '@nestjs/common';
// import { AuthGuard } from '../auth/auth.guard';
import { DetectionsService } from './detections.service';

@Controller('detections')
export class DetectionsController {
    constructor(private detectionsService: DetectionsService) {}

    // @UseGuards(AuthGuard)
    @Get('register_detection/:person_id')
    async createDetection(@Param() person_id) {
        return this.detectionsService.create(person_id);
    }

    @Get('get_detections/:person_id')
    async getDetections(@Param() person_id) { 
        return this.detectionsService.getDetections(person_id);
    }
    
}
