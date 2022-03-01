import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { JobEntity } from 'src/infrastructure/job/job.entity';
import { ConnectionOptions } from 'typeorm';

export enum ConfigEnum {
  TYPEORM = 'typeorm',
}

const CONNECTION_TYPE = 'postgres';

export default registerAs(
  ConfigEnum.TYPEORM,
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
    //entities: [JobEntity],
    //entities: [join(__dirname, '../infrastructure/**', '*.entity.{ts, js}')],
  }),
);
