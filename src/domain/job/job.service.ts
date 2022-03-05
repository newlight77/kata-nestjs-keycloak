import { Injectable } from '@nestjs/common';
import { JobDomain } from './job.domain';
import { JobPort } from './job.port';

@Injectable()
export class JobService {
  constructor(private adapter: JobPort) {}

  create(job: JobDomain): JobDomain {
    return this.adapter.save(job);
  }

  update(id: string, job: JobDomain): JobDomain | void {
    return this.adapter.update(id, job);
  }

  delete(id: string): JobDomain | void {
    return this.adapter.delete(id);
  }

  find(id: string): JobDomain | void {
    return this.adapter.find(id);
  }

  getAll(): JobDomain[] | void {
    return this.adapter.getAll();
  }
}
