import { Module } from '@nestjs/common';
import { JobController } from '../interface/job/job.controller';
import { JobService } from '../core/domain/job/job.service';
import { JobPort } from '../core/domain/job/job.port';
import { JobRepositoryAdapter } from '../infrastructure/job/job.repository.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from 'src/infrastructure/job/job.repository';
import { JobEntity } from 'src/infrastructure/job/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  controllers: [JobController],
  providers: [
    //
    JobService,
    JobRepository,
    { provide: JobPort, useClass: JobRepositoryAdapter },
  ],
  exports: [],
})
export class JobComponentModule {}
