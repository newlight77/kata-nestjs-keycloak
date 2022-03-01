import { Module } from '@nestjs/common';
import { JobController } from '../api/job/job.controller';
import { JobService } from '../domain/job/job.service';
import { JobPort } from '../domain/job/job.port';
import { JobRepositoryAdapter } from '../infrastructure/job/job.repository.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntityRepository } from 'src/infrastructure/job/job.entity.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntityRepository])],
  controllers: [JobController],
  providers: [
    //
    JobService,
    { provide: JobPort, useClass: JobRepositoryAdapter },
  ],
})
export class JobComponentModule {}
