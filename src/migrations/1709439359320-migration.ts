import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709439359320 implements MigrationInterface {
    name = 'Migration1709439359320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detections" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "detections" ADD "person_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detections" ADD CONSTRAINT "FK_9fa5cb8868a2feba9f681b4b956" FOREIGN KEY ("person_id") REFERENCES "registered_faces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detections" DROP CONSTRAINT "FK_9fa5cb8868a2feba9f681b4b956"`);
        await queryRunner.query(`ALTER TABLE "detections" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "detections" ADD "person_id" character varying NOT NULL`);
    }

}
