import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../config/db.env' });
export enum ConfigEnum {
  TYPEORM = 'typeorm',
}

export const DBConnectionConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'default_value',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'default_value',
  password: process.env.DB_PASSWORD || 'default_value',
  database: process.env.DB_NAME || 'default_value',
  synchronize: process.env.NODE_ENV !== 'prod',
  logging: true,
  logger: 'file',
  ssl: process.env.NODE_ENV === 'prod',
  //entities: [],
  //entities: [JobEntity],
  //migrations: ['dist/src/db/migrations.js'],
  //cli: { migrationsDir: 'src/db/migrations' },
  entities: [__dirname + '/**/*.entity.ts'],
  migrations: [__dirname + '/**/*.migration.ts'],
  subscribers: [__dirname + '/**/*.subscriber.ts'],
  cli: {
    entitiesDir: __dirname + '/typeorm/entity',
    migrationsDir: __dirname + '/typeorm/migration',
    subscribersDir: __dirname + '/typeorm/subscriber',
  },
};

export default registerAs(
  ConfigEnum.TYPEORM,
  (): ConnectionOptions => DBConnectionConfig,
);
