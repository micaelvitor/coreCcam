import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
            migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
            synchronize: false,
            migrationsRun: true,
            logging: false,
            ssl: true
        }),
    ],
})
export class DatabaseModule { }