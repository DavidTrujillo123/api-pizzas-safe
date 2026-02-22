import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDeviceTable1771638100000 implements MigrationInterface {
  name = 'CreateDeviceTable1771638100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "devices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipAddress" character varying NOT NULL, "deviceType" character varying NOT NULL, "location" character varying, "loginAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_ID_DEVICE" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "devices" ADD CONSTRAINT "FK_287f3729fc3fdf895d3e2dbdef9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "devices" DROP CONSTRAINT "FK_287f3729fc3fdf895d3e2dbdef9"`,
    );
    await queryRunner.query(`DROP TABLE "devices"`);
  }
}
