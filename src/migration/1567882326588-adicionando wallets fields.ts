import {MigrationInterface, QueryRunner} from "typeorm";

export class adicionandoWalletsFields1567882326588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "wallet" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "name"`);
    }

}
