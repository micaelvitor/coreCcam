import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    fullname: string;

    @IsString()
    birthday: string;

    purposeId: number;

    admin: number;
}
