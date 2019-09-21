import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCurrencyAndTransactionExecuter1569079214587 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "fromId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "UQ_ac3d6711c8adf322a76c0d1a227" UNIQUE ("fromId")`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "value"`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "value" money NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "dateTime" SET DEFAULT '"2019-09-21T15:20:16.050Z"'`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_ac3d6711c8adf322a76c0d1a227" FOREIGN KEY ("fromId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_ac3d6711c8adf322a76c0d1a227"`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "dateTime" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "value"`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "value" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "UQ_ac3d6711c8adf322a76c0d1a227"`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "fromId"`, undefined);
    }

}
