import { Module } from '@nestjs/common';
import { FilesAzureService } from './files.service';


@Module({
    imports: [],
    providers: [FilesAzureService],
    controllers: [],
    exports: [FilesAzureService],
})
export class FilesModule {}