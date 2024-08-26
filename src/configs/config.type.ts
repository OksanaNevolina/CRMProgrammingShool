export type Config = {
  app: AppConfig;
  mysql: mysqlConfig;
  jwt: JWTConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};
export type mysqlConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
};

export type JWTConfig = {
  managerAccessTokenSecret: string;
  managerAccessTokenExpiration: number;
  managerRefreshTokenSecret: string;
  managerRefreshTokenExpiration: number;
};
