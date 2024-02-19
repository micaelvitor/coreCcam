import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
// import { DetectionsService } from './detections.service';

@Controller('detections')
export class UsersController {
    // constructor(private detectionsService: DetectionsService) {}

    @UseGuards(AuthGuard)
    @Get('detections')
    async getProfile(@Request() req) {
        return;
    }

}
