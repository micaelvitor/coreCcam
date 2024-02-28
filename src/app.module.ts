import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PurposeModule } from './purpose/purpose.module';
import { DetectionsModule } from './detections/detections.module';
import { FacesModule } from './faces/faces.module';

@Module({
    imports: [
        DevtoolsModule.register({
            http: process.env.NODE_ENV !== 'production',
        }),
        ConfigModule.forRoot({isGlobal: true}),
        FacesModule,
        DetectionsModule,
        PurposeModule,
        AuthModule,
        UsersModule,
        DatabaseModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }