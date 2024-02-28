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

    async create(person_id: CreateDetectionDto): Promise<Detections> {

        const verifyPersonId = await this.detectionsRepository.findOne({where: person_id});

        if (!verifyPersonId) {
            throw new HttpException(
                'Invalid person id',
                HttpStatus.BAD_REQUEST,
            );
        }
    
        const detection: Detections = this.detectionsRepository.create(person_id);
        await this.detectionsRepository.save(detection);
    
        return detection;
    }

    async getDetections(person_id: CreateDetectionDto): Promise<Detections>{

        const detections = await this.detectionsRepository.findOne({where: person_id});

        if (!detections) {
            throw new HttpException(
                'Invalid person id',
                HttpStatus.BAD_REQUEST,
            );
        }

        return detections;
    }
    
}