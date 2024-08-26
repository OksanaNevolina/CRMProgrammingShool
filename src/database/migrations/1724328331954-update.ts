import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1724328331954 implements MigrationInterface {
    name = 'Update1724328331954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`refresh_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`refreshToken\` text NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`access_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accessToken\` text NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`userss\` ADD \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`userss\` ADD \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`userss\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`refresh_token\` ADD CONSTRAINT \`FK_6bbe63d2fe75e7f0ba1710351d4\` FOREIGN KEY (\`user_id\`) REFERENCES \`userss\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`access_token\` ADD CONSTRAINT \`FK_4bd9bc00776919370526766eb43\` FOREIGN KEY (\`user_id\`) REFERENCES \`userss\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`access_token\` DROP FOREIGN KEY \`FK_4bd9bc00776919370526766eb43\``);
        await queryRunner.query(`ALTER TABLE \`refresh_token\` DROP FOREIGN KEY \`FK_6bbe63d2fe75e7f0ba1710351d4\``);
        await queryRunner.query(`ALTER TABLE \`userss\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`userss\` DROP COLUMN \`updated\``);
        await queryRunner.query(`ALTER TABLE \`userss\` DROP COLUMN \`created\``);
        await queryRunner.query(`DROP TABLE \`access_token\``);
        await queryRunner.query(`DROP TABLE \`refresh_token\``);
    }

}
