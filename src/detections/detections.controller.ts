import { Controller, Get, Param } from '@nestjs/common';
// import { AuthGuard } from '../auth/auth.guard';
import { DetectionsService } from './detections.service';

@Controller('detections')
export class UsersController {
    constructor(private detectionsService: DetectionsService) {}

    // @UseGuards(AuthGuard)
    @Get('register_detection/:id')
    async getProfile(@Param() id) {
        return this.detectionsService.create(id);
    }

}
