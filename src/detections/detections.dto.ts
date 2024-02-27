import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDetectionDto {
    @IsNotEmpty()
    @IsString()
    person_id: string;
}
