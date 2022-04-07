import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from '../infrastructure/job/job.entity';
import { ConnectionOptions } from 'typeorm';

import dbConfig from '../environment/db.config';

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
export class DatabaseModule {}
