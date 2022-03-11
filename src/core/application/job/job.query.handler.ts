import { Injectable } from '@nestjs/common';
import { JobQueryService } from 'src/core/domain/job/job.query.service';
import { JobDomain } from 'src/core/domain/job/job.domain';
import { FindJobByIdCommand, FindJobQuery } from './job.find.query';

@Injectable()
export class JobQueryHandler {
  constructor(private queryService: JobQueryService) {}

  async queryJobs(query: FindJobQuery): Promise<JobDomain[]> {
    return this.queryService.findByQuery(query);
  }

  async queryAll(): Promise<JobDomain[]> {
    return this.queryService.findAll();
  }

  async queryJobById(query: FindJobByIdCommand): Promise<JobDomain> {
    return this.queryService.findById(query.id);
  }
}
