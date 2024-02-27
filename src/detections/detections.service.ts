import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Detections } from './detections.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDetectionDto } from './detections.dto';

@Injectable()
export class DetectionsService {
    constructor(
        @InjectRepository(Detections)
        private readonly detectionsRepository: Repository<Detections>,
    ) {}

    async create(personId: CreateDetectionDto): Promise<Detections> {

        const verifyPersonId = await this.detectionsRepository.findOneBy(personId);

        if (!verifyPersonId) {
            throw new HttpException(
                'Invalid person id',
                HttpStatus.BAD_REQUEST,
            );
        }
    
        const detection: Detections = this.detectionsRepository.create(personId);
        await this.detectionsRepository.save(detection);
    
        return detection;
    }
    
}