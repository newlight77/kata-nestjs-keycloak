import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JobEntity } from 'src/infrastructure/job/job.entity';
import { ConnectionOptions } from 'typeorm';

import dbConfig, { ConfigEnum } from '../environment/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config/db.env',
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<ConnectionOptions>(ConfigEnum.TYPEORM);
        //config.entities.push(...[JobEntity]);
        return config;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
