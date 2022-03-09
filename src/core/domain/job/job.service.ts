import { Injectable } from '@nestjs/common';
import { JobDomain } from './job.domain';
import { JobPort } from './job.port';

@Injectable()
export class JobService {
  constructor(private adapter: JobPort) {}

  async create(job: JobDomain): Promise<JobDomain> {
    return this.adapter.save(job);
  }

  async update(id: string, job: JobDomain): Promise<JobDomain> {
    return this.adapter.update(id, job);
  }

  async delete(id: string): Promise<JobDomain> {
    return this.adapter.delete(id);
  }

  async find(id: string): Promise<JobDomain> {
    return this.adapter.find(id);
  }

  async findAll(): Promise<JobDomain[]> {
    return this.adapter.findAll();
  }
}
