import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { FacesInterface } from './faces.interface'
export class CreateFaceDto {
    @IsNotEmpty()
    @IsString()
    person_id: string;

    @IsString()
    person_name: string;

    @IsObject()
    image_urls: FacesInterface;

}
