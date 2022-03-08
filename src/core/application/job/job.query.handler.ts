import { Injectable } from '@nestjs/common';
import { JobService } from 'src/core/domain/job/job.service';
import { FindJobQuery } from './find.job.query';

@Injectable()
export class JobQueryHandler {
  constructor(private service: JobService) {}

  findJobs(query: FindJobQuery) {
    const jobs = [];
    const allJobs = this.service.getAll();
  }
}
