import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699732888175 implements MigrationInterface {
    name = 'Init1699732888175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Nylon_type_enum" AS ENUM('small', 'medium', 'large')`);
        await queryRunner.query(`CREATE TABLE "Nylon" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "color" text NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "type" "public"."Nylon_type_enum", "height" integer NOT NULL, "width" integer NOT NULL, "manufacturer" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_df44dce6b2240d85c1d4ffa9f81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Sale" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nylons" text NOT NULL DEFAULT '[]', "totalAmount" integer NOT NULL, "amountPaid" integer NOT NULL, "amountOwed" integer NOT NULL, "comment" character varying NOT NULL, "customerName" text NOT NULL, "dateToBeDelivered" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_dc216b1140b34718ae74c8e1273" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Purchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nylons" text NOT NULL DEFAULT '[]', "totalAmount" integer NOT NULL, "comment" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6d9e6d272ab44bae1cbd7d3d18b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Expense_type_enum" AS ENUM('utilities', 'repairs', 'salary')`);
        await queryRunner.query(`CREATE TABLE "Expense" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amountSpent" integer NOT NULL, "comment" character varying NOT NULL, "type" "public"."Expense_type_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fb42c5db1dfc3d1e57fd9118bf1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Expense"`);
        await queryRunner.query(`DROP TYPE "public"."Expense_type_enum"`);
        await queryRunner.query(`DROP TABLE "Purchase"`);
        await queryRunner.query(`DROP TABLE "Sale"`);
        await queryRunner.query(`DROP TABLE "Nylon"`);
        await queryRunner.query(`DROP TYPE "public"."Nylon_type_enum"`);
    }

}
