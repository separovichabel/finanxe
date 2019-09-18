import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1568801440606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "dateTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" integer NOT NULL, "ownerId" integer, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "wallet"`, undefined);
        await queryRunner.query(`DROP TABLE "transaction"`, undefined);
    }

}
