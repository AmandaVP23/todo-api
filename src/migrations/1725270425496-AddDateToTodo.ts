import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateToTodo1725270425496 implements MigrationInterface {
    name = 'AddDateToTodo1725270425496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`date\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`date\``);
    }

}
