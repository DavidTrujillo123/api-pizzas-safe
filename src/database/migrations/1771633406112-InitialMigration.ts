import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1771633406112 implements MigrationInterface {
    name = 'InitialMigration1771633406112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "calories" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizzas" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric(5,2) NOT NULL, CONSTRAINT "PK_27f7ede7b9304d8372a336d1e5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizzas_ingredients_ingredients" ("pizzasId" integer NOT NULL, "ingredientsId" integer NOT NULL, CONSTRAINT "PK_34d2dc00e6f6219d5e691e01c5e" PRIMARY KEY ("pizzasId", "ingredientsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_759ab5c1129b880ceb1430ff87" ON "pizzas_ingredients_ingredients" ("pizzasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_accc21afbd8f59e03d21cda511" ON "pizzas_ingredients_ingredients" ("ingredientsId") `);
        await queryRunner.query(`ALTER TABLE "pizzas_ingredients_ingredients" ADD CONSTRAINT "FK_759ab5c1129b880ceb1430ff87d" FOREIGN KEY ("pizzasId") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pizzas_ingredients_ingredients" ADD CONSTRAINT "FK_accc21afbd8f59e03d21cda511a" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pizzas_ingredients_ingredients" DROP CONSTRAINT "FK_accc21afbd8f59e03d21cda511a"`);
        await queryRunner.query(`ALTER TABLE "pizzas_ingredients_ingredients" DROP CONSTRAINT "FK_759ab5c1129b880ceb1430ff87d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_accc21afbd8f59e03d21cda511"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_759ab5c1129b880ceb1430ff87"`);
        await queryRunner.query(`DROP TABLE "pizzas_ingredients_ingredients"`);
        await queryRunner.query(`DROP TABLE "pizzas"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
    }

}
