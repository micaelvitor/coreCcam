import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/auth/auth.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) {}

    private async comparePasswords(
        userPassword: string,
        currentPassword: string,
    ) {
        return await bcrypt.compare(currentPassword, userPassword);
    }

    async findOneByUsername(username: string): Promise<Users | undefined> {
        const user = await this.userRepository.findOne({ where: { username } });
        delete user.id;
        delete user.password;
        return user;
    }

    async validateCredentials({
        username,
        password,
    }: {
        username: string;
        password: string;
    }): Promise<Users> {
        const user = await this.findOneByUsername(username);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const areEqual = await this.comparePasswords(user.password, password);

        if (!areEqual) {
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.UNAUTHORIZED,
            );
        }

        return user;
    }

    async create(signupdata: CreateUserDto): Promise<Users> {
        const userInDb = await this.findOneByUsername(signupdata.username);
        if (userInDb) {
            throw new HttpException(
                'User already exists',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user: Users = this.userRepository.create(signupdata);

        await this.userRepository.save(user);

        return user;
    }
}