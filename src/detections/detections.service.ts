import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/auth.dto';
import { PurposeService } from 'src/purpose/purpose.service';

@Injectable()
export class DetectionsService {
    // constructor(
    //     // @InjectRepository(Users)
    //     private readonly userRepository: Repository<Users>,
    //     private readonly purposeService: PurposeService
    // ) {}

    // async findOneByUsername(username: string): Promise<Users | undefined> {
    //     const user = await this.userRepository.findOne({ where: { username } });
    //     if(user == null){
    //         return undefined;
    //     }
    //     return user;
    // }

    // async create(signupdata: CreateUserDto): Promise<Users> {
    //     const userInDb = await this.findOneByUsername(signupdata.username);
    //     if (userInDb) {
    //         throw new HttpException(
    //             'User already exists',
    //             HttpStatus.BAD_REQUEST,
    //         );
    //     }

    //     const purposes = await this.purposeService.findAllPurposes();
    //     const isValidPurposeId = purposes.some(purpose => purpose.id === signupdata.purposeId);
    //     if (!isValidPurposeId) {
    //         throw new HttpException(
    //             'Invalid purposeId',
    //             HttpStatus.BAD_REQUEST,
    //         );
    //     }
    
    //     const user: Users = this.userRepository.create(signupdata);
    //     await this.userRepository.save(user);
    
    //     return user;
    // }
    
}