import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { FacesInterface } from './faces.interface'

export class CreateFaceDto {

    @IsNotEmpty()
    @IsString()
    person_name: string;

    @IsNotEmpty()
    @IsObject()
    image_urls: FacesInterface;

    // @IsNotEmpty()
    // @IsString()
    // created_by: string;

}
