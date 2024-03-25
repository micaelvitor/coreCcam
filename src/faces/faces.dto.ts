import { IsEmpty, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { FacesInterface } from './faces.interface'

export class CreateFaceDto {

    @IsNotEmpty()
    @IsString()
    person_name: string;

    @IsNotEmpty()
    @IsObject()
    image_urls: FacesInterface;

    @IsOptional()
    @IsString()
    created_by: string;

}
