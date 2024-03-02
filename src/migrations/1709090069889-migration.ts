import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709090069889 implements MigrationInterface {
    name = 'Migration1709090069889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registered_faces" DROP CONSTRAINT "FK_5f10caa7023a7303a5c6cc3b21f"`);
        await queryRunner.query(`ALTER TABLE "registered_faces" RENAME COLUMN "user_id" TO "created_by"`);
        await queryRunner.query(`ALTER TABLE "registered_faces" ADD CONSTRAINT "FK_c6ebd83239a706aee728717ee5e" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registered_faces" DROP CONSTRAINT "FK_c6ebd83239a706aee728717ee5e"`);
        await queryRunner.query(`ALTER TABLE "registered_faces" RENAME COLUMN "created_by" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "registered_faces" ADD CONSTRAINT "FK_5f10caa7023a7303a5c6cc3b21f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
