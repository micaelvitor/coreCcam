import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDetectionDto {
    @IsNotEmpty()
    @IsString()
    person_id: string;

    @IsOptional()
    @IsString()
    owner_id: string;
}
