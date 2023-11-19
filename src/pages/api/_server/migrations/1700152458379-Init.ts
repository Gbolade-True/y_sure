import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1700152458379 implements MigrationInterface {
  name = 'Init1700152458379';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Nylon" ALTER COLUMN "height" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Nylon" ALTER COLUMN "width" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Nylon" ALTER COLUMN "manufacturer" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Nylon" ALTER COLUMN "updatedAt" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Sale" ALTER COLUMN "comment" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Sale" DROP COLUMN "customerName"`);
    await queryRunner.query(`ALTER TABLE "Sale" ADD "customerName" character varying`);
    await queryRunner.query(`ALTER TABLE "Sale" ALTER COLUMN "dateToBeDelivered" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Sale" ALTER COLUMN "updatedAt" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Purchase" ALTER COLUMN "comment" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Purchase" ALTER COLUMN "updatedAt" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Expense" ALTER COLUMN "type" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Expense" ALTER COLUMN "type" SET DEFAULT 'utilities'`);
    await queryRunner.query(`ALTER TABLE "Expense" ALTER COLUMN "comment" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Expense" ALTER COLUMN "comment" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Expense" ALTER COLUMN "type" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "Expense" ALTER COLUMN "type" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Purchase" ALTER COLUMN "updatedAt" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Purchase" ALTER COLUMN "comment" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Sale" ALTER COLUMN "updatedAt" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Sale" ALTER COLUMN "dateToBeDelivered" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Sale" DROP COLUMN "customerName"`);
    await queryRunner.query(`ALTER TABLE "Sale" ADD "customerName" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Sale" ALTER COLUMN "comment" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Nylon" ALTER COLUMN "updatedAt" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Nylon" ALTER COLUMN "manufacturer" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Nylon" ALTER COLUMN "width" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Nylon" ALTER COLUMN "height" SET NOT NULL`);
  }
}
