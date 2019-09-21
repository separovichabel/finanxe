import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1569084555548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" double precision NOT NULL, "ownerId" integer, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "value" double precision NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "fromId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_ac3d6711c8adf322a76c0d1a227" FOREIGN KEY ("fromId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_ac3d6711c8adf322a76c0d1a227"`, undefined);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0"`, undefined);
        await queryRunner.query(`DROP TABLE "transaction"`, undefined);
        await queryRunner.query(`DROP TABLE "wallet"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
