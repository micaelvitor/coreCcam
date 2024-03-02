import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { DetectionsService } from './detections.service';

@Controller('detections')
export class DetectionsController {
    constructor(private detectionsService: DetectionsService) {}

    // @UseGuards(AuthGuard)
    @Get('registerDetection/:person_id')
    async createDetection(@Param() person_id) {
        return this.detectionsService.create(person_id);
    }

    @UseGuards(AuthGuard)
    @Get('detections/:person_id')
    async getDetectionsByPersonId(@Param() person_id) { 
        return this.detectionsService.getDetectionsByPersonId(person_id);
    }

    @UseGuards(AuthGuard)
    @Get('detections')
    async getDetections(@Request() req) { 
        return this.detectionsService.getDetections(req.user.sub);
    }
    
}
