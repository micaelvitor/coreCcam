import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708256455101 implements MigrationInterface {
    name = 'Migration1708256455101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "fullname" character varying NOT NULL DEFAULT '', "birthday" character varying NOT NULL DEFAULT '', "purpose_id" integer NOT NULL DEFAULT '1', "admin" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        // await queryRunner.query(`CREATE TABLE "purpose_list" ("id" SERIAL NOT NULL, "purpose" character varying NOT NULL, CONSTRAINT "PK_8523652b1e526261646508088e1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "purpose_list"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
