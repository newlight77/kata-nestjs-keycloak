import { Injectable } from '@nestjs/common';
import { JobDomain } from './job.domain';
import { JobPort } from './job.port';

@Injectable()
export class JobService {
  constructor(private adapter: JobPort) {}

  create(job: JobDomain): JobDomain {
    return this.adapter.save(job);
  }

  getAll(): JobDomain[] | void {
    return this.adapter.getAll();
  }
}
