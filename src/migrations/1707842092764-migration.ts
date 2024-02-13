import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707842092764 implements MigrationInterface {
    name = 'Migration1707842092764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purpose_list" ("id" SERIAL NOT NULL, "purpose" character varying(255) NOT NULL, CONSTRAINT "PK_purpose_list" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "purpose_id" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);

        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_purpose_id" FOREIGN KEY ("purpose_id") REFERENCES "purpose_list"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_purpose_id"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "purpose_list"`);
    }
}
