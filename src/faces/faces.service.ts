import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Faces } from './faces.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFaceDto } from './faces.dto';

@Injectable()
export class FacesService {
    constructor(
        @InjectRepository(Faces)
        private readonly facesRepository: Repository<Faces>,
    ) {}

    async findOneByPerson(person_id: string): Promise<Faces | undefined> {
        const person = await this.facesRepository.findOne({ where: { person_id } });
        if(person == null){
            return undefined;
        }
        return person;
    }

    async create(facedata: CreateFaceDto, username:string): Promise<Faces> {
        const face: Faces = this.facesRepository.create(facedata);
        await this.facesRepository.save(face);
        return face;
    }

    async getAll(person_id: string): Promise<Faces>{
        const faces: Faces = await this.facesRepository.findOne({ where: { person_id } });
        return faces;
    }
    
}