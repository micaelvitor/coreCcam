import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersController } from './users.controller';
import { PurposeModule } from 'src/purpose/purpose.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        PurposeModule
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],

})
export class UsersModule { }