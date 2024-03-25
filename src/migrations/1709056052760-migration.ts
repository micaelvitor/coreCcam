import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709056052760 implements MigrationInterface {
    name = 'Migration1709056052760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registered_faces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "person_name" character varying NOT NULL, "image_urls" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_785caccace80e01bfe87d0858e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "registered_faces" ADD CONSTRAINT "FK_5f10caa7023a7303a5c6cc3b21f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registered_faces" DROP CONSTRAINT "FK_5f10caa7023a7303a5c6cc3b21f"`);
        await queryRunner.query(`DROP TABLE "registered_faces"`);
    }

}
