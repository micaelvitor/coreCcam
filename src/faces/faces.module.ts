import { Module } from '@nestjs/common';
import { FacesService } from './faces.service';
import { FacesController } from './faces.controller';
import { Faces } from './faces.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Faces])
    ],
    providers: [FacesService],
    controllers: [FacesController],
    exports: [FacesService],
})
export class FacesModule { }