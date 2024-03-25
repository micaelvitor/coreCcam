import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709092050804 implements MigrationInterface {
    name = 'Migration1709092050804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detections" ADD "owner_id" uuid`);
        await queryRunner.query(`ALTER TABLE "detections" ADD CONSTRAINT "FK_7098d2754f86b5b3bceaba7fc98" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detections" DROP CONSTRAINT "FK_7098d2754f86b5b3bceaba7fc98"`);
        await queryRunner.query(`ALTER TABLE "detections" DROP COLUMN "owner_id"`);
    }

}
