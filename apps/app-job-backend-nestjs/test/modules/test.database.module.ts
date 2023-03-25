import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JobEntity } from '../../src/infrastructure/job/job.entity';
import { ConnectionOptions } from 'typeorm';

export const DBConnectionConfig: ConnectionOptions = {
  name: 'test-default',
  type: 'better-sqlite3',
  database: ':memory:',
  synchronize: true,
  logging: true,
  logger: 'file',
  entities: [join(__dirname, '../../', 'src/**', '*.entity.{ts,js}')],
  //  entities: ['src/**/*.entity{.ts,.js}'],
};

export const dbConfig = registerAs('typeorm', (): ConnectionOptions => DBConnectionConfig);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../config/db.env',
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<ConnectionOptions>('typeorm');
        config.entities.push(...[JobEntity]);
        return config;
      },
      inject: [ConfigService],
    }),
  ],
})
export class TestDatabaseModule {}
