import { Injectable } from '@nestjs/common';
import { JobDomain } from './job.domain';
import { JobPort } from './job.port';

@Injectable()
export class JobService {
  constructor(private adapter: JobPort) {}

  create(job: JobDomain): string {
    return this.adapter.save(job);
  }

  getAll(): Promise<JobDomain[]> {
    return this.adapter.getAll();
  }
}
