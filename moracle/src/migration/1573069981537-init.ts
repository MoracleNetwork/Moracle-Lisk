import {MigrationInterface, QueryRunner} from "typeorm";

export class init1573069981537 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "resolver" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "serialized" text NOT NULL, CONSTRAINT "PK_b6dce266610be08e8e81cd4d897" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stored_result" ("id" SERIAL NOT NULL, "txId" character varying NOT NULL, "serializedResult" text NOT NULL, CONSTRAINT "PK_014d961d31b3b7c5b706b8e8abd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "stored_result"`);
        await queryRunner.query(`DROP TABLE "resolver"`);
    }

}
