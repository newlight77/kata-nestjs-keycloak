import { Injectable } from '@nestjs/common';
import { JobDomain } from './job.domain';
import { JobRepository } from './job.repository';

@Injectable()
export class JobService {
  constructor(private adapter: JobRepository) {}

  create(job: JobDomain): string {
    return this.adapter.save(job);
  }

  getAll(): Promise<JobDomain[]> {
    return this.adapter.getAll();
  }
}
