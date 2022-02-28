import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JobController } from '../api/job/job.controller';
import { JobService } from '../domain/job/job.service';
import { JobRepository } from '../domain/job/job.repository';
import { JobAdapter } from '../infrastructure/job/job.repository.adapter';

export enum ConfigEnum {
  TYPEORM = 'typeorm',
}

@Module({
  imports: [HttpModule],
  controllers: [JobController],
  providers: [
    //
    JobService,
    { provide: JobRepository, useClass: JobAdapter },
  ],
})
export class JobComponentModule {}
