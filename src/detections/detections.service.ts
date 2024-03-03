import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Detections } from './detections.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDetectionDto } from './detections.dto';
import { FacesService } from 'src/faces/faces.service';

@Injectable()
export class DetectionsService {
    constructor(
        @InjectRepository(Detections)
        private readonly detectionsRepository: Repository<Detections>,
        private readonly facesService: FacesService
    ) {}

    async create(person_id: CreateDetectionDto): Promise<Detections> {
        const verifyPersonId = await this.facesService.findOneByPerson(person_id.person_id);
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

    async getDetectionsByPersonId(person_id: CreateDetectionDto): Promise<Detections>{

        const detections = await this.detectionsRepository.findOne({where: person_id});

        if (!detections) {
            throw new HttpException(
                'Invalid person id',
                HttpStatus.BAD_REQUEST,
            );
        }

        return detections;
    }

    async getDetections(person_id: string): Promise<Detections[]>{
        try{
            const detections= await this.detectionsRepository.find({ where: { person_id } } );

            if (detections.length == 0) {
                throw new HttpException(
                    'Ops, there is no detections for this user',
                    HttpStatus.BAD_REQUEST,
                );
            }

            return detections;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}