import { Module } from '@nestjs/common';
import { DetectionsService } from './detections.service';
import { UsersModule } from '../users/users.module';
import { DetectionsController } from './detections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detections } from './detections.entity';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([Detections])
    ],
    providers: [DetectionsService],
    controllers: [DetectionsController],
    exports: [DetectionsService],
})
export class DetectionsModule {}