import { Injectable } from '@nestjs/common';
import {
  JobCreatedEvent,
  JobUpdatedEvent,
  JobDeletedEvent,
  JobDomain,
} from './job.domain';
import { JobPort } from './job.port';

@Injectable()
export class JobCommandService {
  constructor(private adapter: JobPort) {}

  async create(job: JobDomain): Promise<JobCreatedEvent> {
    const createdJob = await this.adapter.save(job);
    const result = { job: createdJob, message: 'created' };
    return result;
  }

  async update(id: string, job: JobDomain): Promise<JobUpdatedEvent> {
    const currentJob = await this.adapter.find(id);
    const mergedJob = { ...currentJob, ...omitNullish(job) };
    const updatedJob = await this.adapter.update(id, mergedJob);
    const result = { job: updatedJob, message: 'updated' };
    return result;
  }

  async delete(id: string): Promise<JobDeletedEvent> {
    const updatedJob = await this.adapter.delete(id);
    const result = { job: updatedJob, message: 'deleted' };
    return result;
  }
}

const omitNullish = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => value != undefined),
  );
