import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
// import { ConfigType } from '@nestjs/config';

export interface Config {
  typeorm: TypeOrmConfig;
}

export interface TypeOrmConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities: any[];
}

const CONNECTION_TYPE = 'postgres';

export default registerAs(
  'typeorm',
  (): ConnectionOptions => ({
    type: CONNECTION_TYPE,
    host: process.env.DB_HOST || 'default_value',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'default_value',
    password: process.env.DB_PASSWORD || 'default_value',
    database: process.env.DB_NAME || 'default_value',
    synchronize: process.env.NODE_ENV !== 'prod',
    logging: true,
    entities: [],
  }),
);

// interface DatabaseConfig {
//   url: string;
//   port: number;
//   database: string;
//   user: string;
//   password: string;
// }

// const config: DatabaseConfig = registerAs('database', () => ({
//   url: process.env.DB_URL,
//   port: parseInt(process.env.DB_PORT, 5432),
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// } as DatabaseConfig));

// const config = () => ({
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// const dbConfig: ConfigType<typeof databaseConfig>;

// export default config as ConfigType<typeof config>;
