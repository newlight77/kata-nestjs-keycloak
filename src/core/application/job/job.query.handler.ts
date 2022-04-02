import { Injectable } from '@nestjs/common';
import { JobQueryService } from 'src/core/domain/job/job.query.service';
import { JobDomain } from 'src/core/domain/job/job.domain';
import { FindJobByIdCommand, FindJobQuery } from './job.find.query';

@Injectable()
export class JobQueryHandler {
  constructor(private queryService: JobQueryService) {}

  async findById(query: FindJobByIdCommand): Promise<JobDomain> {
    return this.queryService.findById(query.id);
  }

  async findAll(): Promise<JobDomain[]> {
    return this.queryService.findAll();
  }

  async queryJobs(query: FindJobQuery): Promise<JobDomain[]> {
    return this.queryService.findByQuery(query);
  }
}
