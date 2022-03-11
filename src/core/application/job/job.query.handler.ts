import { Injectable } from '@nestjs/common';
import { JobQueryService } from 'src/core/domain/job/job.query.service';
import { JobDomain } from 'src/core/domain/job/job.domain';
import { FindJobQuery } from './job.find.query';

@Injectable()
export class JobQueryHandler {
  constructor(private queryService: JobQueryService) {}

  async findJobs(query: FindJobQuery): Promise<JobDomain[]> {
    return this.queryService.findByQuery(query);
  }
}
