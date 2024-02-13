import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';

export class Migration1707851952545 implements MigrationInterface {
    name = 'Migration1707851952545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purpose_list" ("id" SERIAL NOT NULL, "purpose" character varying NOT NULL, CONSTRAINT "PK_8523652b1e526261646508088e1" PRIMARY KEY ("id"))`);

        const purposesFilePath = path.join(__dirname, 'purposes.json');

        const purposesJson = fs.readFileSync(purposesFilePath, 'utf-8');
        const purposes = JSON.parse(purposesJson);

        for (const purposeId in purposes) {
            if (purposes.hasOwnProperty(purposeId)) {
                const purpose = purposes[purposeId];
                await queryRunner.query(`INSERT INTO "purpose_list" ("id", "purpose") VALUES ($1, $2)`, [purpose.id, purpose.purpose]);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "purpose_list"`);
    }
}
