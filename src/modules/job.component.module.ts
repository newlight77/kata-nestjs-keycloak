import { Module } from '@nestjs/common';
import { JobCrudController } from '../interface/job/job.crud.controller';
import { JobCrudService } from '../core/domain/job/job.crud.service';
import { JobQueryService } from 'src/core/domain/job/job.query.service';
import { JobPort } from '../core/domain/job/job.port';
import { JobRepositoryAdapter } from '../infrastructure/job/job.repository.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from 'src/infrastructure/job/job.repository';
import { JobEntity } from 'src/infrastructure/job/job.entity';
import { JobCommandHandler } from 'src/core/application/job/job.command.handler';
import { JobQueryHandler } from 'src/core/application/job/job.query.handler';
import { JobQueryController } from 'src/interface/job/job.query.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  controllers: [JobCrudController, JobQueryController],
  providers: [
    //
    JobCrudService,
    JobQueryService,
    JobCommandHandler,
    JobQueryHandler,
    JobRepository,
    { provide: JobPort, useClass: JobRepositoryAdapter },
  ],
  exports: [],
})
export class JobComponentModule {}
