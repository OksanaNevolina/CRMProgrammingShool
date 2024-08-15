import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleAndUser1723712265514 implements MigrationInterface {
    name = 'RoleAndUser1723712265514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`userss\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`userss_roles_roles\` (\`userssId\` int NOT NULL, \`rolesId\` int NOT NULL, INDEX \`IDX_f13f80b0d86f1f82b79734367f\` (\`userssId\`), INDEX \`IDX_012bb006ea84e59e8f104c603f\` (\`rolesId\`), PRIMARY KEY (\`userssId\`, \`rolesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`id\` \`id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`created_at\` \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`userss_roles_roles\` ADD CONSTRAINT \`FK_f13f80b0d86f1f82b79734367fd\` FOREIGN KEY (\`userssId\`) REFERENCES \`userss\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`userss_roles_roles\` ADD CONSTRAINT \`FK_012bb006ea84e59e8f104c603fc\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`userss_roles_roles\` DROP FOREIGN KEY \`FK_012bb006ea84e59e8f104c603fc\``);
        await queryRunner.query(`ALTER TABLE \`userss_roles_roles\` DROP FOREIGN KEY \`FK_f13f80b0d86f1f82b79734367fd\``);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`created_at\` \`created_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`DROP INDEX \`IDX_012bb006ea84e59e8f104c603f\` ON \`userss_roles_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_f13f80b0d86f1f82b79734367f\` ON \`userss_roles_roles\``);
        await queryRunner.query(`DROP TABLE \`userss_roles_roles\``);
        await queryRunner.query(`DROP TABLE \`userss\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
