import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709006875555 implements MigrationInterface {
    name = 'Migration1709006875555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "detections" ("detection_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "person_id" character varying NOT NULL, CONSTRAINT "PK_0bb008a7302cb4ab62ff83be72b" PRIMARY KEY ("detection_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "detections"`);
    }

}
