import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurposeService } from './purpose.service';
import { Purposes } from './purpose.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Purposes])],
    providers: [PurposeService],
    exports: [PurposeService],

})
export class PurposeModule { }