import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailColumnToTableUser1697035832195 implements MigrationInterface {
    name = 'AddEmailColumnToTableUser1697035832195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    }

}
