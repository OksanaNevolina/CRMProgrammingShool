import * as path from 'node:path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import getConfigs from './src/configs/configs';

dotenv.config({ path: './environments/local.env' });

const mysqlConfig = getConfigs().mysql;

export default new DataSource({
    type: 'mysql',
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    username: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.dbName,
    entities: [
        path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
    ],
    migrations: [
        path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
    ],
    synchronize: false,
});
