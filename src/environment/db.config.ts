import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: __dirname + '/../../config/db.env' });

console.log(__dirname + '/../../config/db.env');
console.log(__dirname + '/../**/*.entity.ts');
console.log(`database url : ${process.env.DB_HOST}`);

export enum ConfigEnum {
  TYPEORM = 'typeorm',
}

export const isProduction = () => {
  return process.env.NODE_ENV === 'prod';
};

export const DBConnectionConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'default_value',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'default_value',
  password: process.env.DB_PASSWORD || 'default_value',
  database: process.env.DB_NAME || 'default_value',
  synchronize: !isProduction(),
  logging: true,
  logger: 'file',
  ssl: isProduction(),
  entities: [join(__dirname, '../**', '*.entity.{ts,js}')],
  //entities: [],
  //entities: [__dirname + '/../../../**/*.entity.ts'],

  //migrations: ['dist/src/db/migrations.js'],
  //cli: { migrationsDir: 'src/db/migrations' },

  // entities: [__dirname + '../**/*.entity.ts'],
  // migrations: [__dirname + '../**/*.migration.ts'],
  // subscribers: [__dirname + '../**/*.subscriber.ts'],
  // cli: {
  //   entitiesDir: __dirname + '../typeorm/entity',
  //   migrationsDir: __dirname + '../typeorm/migration',
  //   subscribersDir: __dirname + '../typeorm/subscriber',
  // },
};

export default registerAs(ConfigEnum.TYPEORM, (): ConnectionOptions => DBConnectionConfig);
