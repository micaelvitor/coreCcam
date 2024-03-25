import { Injectable } from '@nestjs/common';
import { Purposes } from '../purpose/purpose.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PurposeService {
    constructor(
        @InjectRepository(Purposes)
        private readonly purposeRepository: Repository<Purposes>
    ) {}

    async findAllPurposes(): Promise<Purposes[]> {
        return await this.purposeRepository.find();
    }
}
