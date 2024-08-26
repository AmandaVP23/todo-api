import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToTodo1724661986768 implements MigrationInterface {
    name = 'AddStatusToTodo1724661986768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`status\` enum ('PENDING', 'DONE') NOT NULL DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`status\``);
    }

}
