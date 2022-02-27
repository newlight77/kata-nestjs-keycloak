import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import dbConfig from '../../src/environment/db.config';

export enum ConfigEnum {
  TYPEORM = 'typeorm',
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>(ConfigEnum.TYPEORM),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
