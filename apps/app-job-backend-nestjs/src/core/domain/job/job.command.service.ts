import { Injectable } from '@nestjs/common';
import { JobDomain } from './job.domain';
import { JobCreatedEvent, JobDeletedEvent, JobUpdatedEvent } from './job.event';
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
    if (!currentJob) throw new Error('job not found for update');
    const mergedJob = { ...currentJob, ...omitUndefinedProps(job) };
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

const omitUndefinedProps = (object) =>
  Object.fromEntries(Object.entries(object).filter(([, value]) => value != undefined));
