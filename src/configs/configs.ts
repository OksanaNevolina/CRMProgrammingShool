import * as process from 'node:process';

import { Config } from './config.type';

export default (): Config => ({
    app: {
        port: parseInt(process.env.APP_PORT),
        host: process.env.APP_HOST,
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        dbName: process.env.MYSQL_NAME,
    },
    jwt: {
        managerAccessTokenSecret: process.env.MAMAGER_AUTH_ACCESS_TOKEN_SECRET,
        managerAccessTokenExpiration: parseInt(
            process.env.MAMAGER_AUTH_ACCESS_TOKEN_EXPIRATION,
        ),
        managerRefreshTokenSecret: process.env.MAMAGER_AUTH_REFRESH_TOKEN_SECRET,
        managerRefreshTokenExpiration: parseInt(
            process.env.MAMAGER_AUTH_REFRESH_TOKEN_EXPIRATION,
        ),
        adminAccessTokenSecret: process.env.ADMIN_AUTH_ACCESS_TOKEN_SECRET,
        adminAccessTokenExpiration: parseInt(
            process.env.ADMIN_AUTH_ACCESS_TOKEN_EXPIRATION,
        ),
        adminRefreshTokenSecret: process.env.ADMIN_AUTH_REFRESH_TOKEN_SECRET,
        adminRefreshTokenExpiration: parseInt(
            process.env.ADMIN_AUTH_REFRESH_TOKEN_EXPIRATION,
        ),
    }

});