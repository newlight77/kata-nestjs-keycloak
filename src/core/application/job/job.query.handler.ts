import { Injectable } from '@nestjs/common';
import { JobQueryService } from '../../domain/job/job.query.service';
import { JobDomain } from '../../domain/job/job.domain';
import { FindJobByIdCommand, JobQuery } from './job.query';
import { JobQueryDto } from './job.query.dto';

@Injectable()
export class JobQueryHandler {
  constructor(private queryService: JobQueryService) {}

  async findById(query: FindJobByIdCommand): Promise<JobDomain> {
    return this.queryService.findById(query.id);
  }

  async findAll(): Promise<JobDomain[]> {
    return this.queryService.findAll();
  }

  async queryJobs(query: JobQuery): Promise<JobQueryDto[]> {
    return this.queryService.findByQuery(query);
  }
}
