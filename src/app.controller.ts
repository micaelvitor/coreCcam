import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Dont delete this endpoint!!!
   * This endpoint is used by Azure To check service health status
   * If removed the service will be marked off
   */
  @Get()
  @HttpCode(200)
  statusCheck(): { status: string } {
    return this.appService.getStatus();
  }
}
