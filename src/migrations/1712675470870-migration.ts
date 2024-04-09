import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712675470870 implements MigrationInterface {
    name = 'Migration1712675470870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registered_faces" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registered_faces" DROP COLUMN "active"`);
    }

}
