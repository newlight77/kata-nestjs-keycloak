import { JobDomain } from './job.domain';

export abstract class JobPort {
  abstract save(job: JobDomain): Promise<JobDomain>;
  abstract update(id: string, job: JobDomain): Promise<JobDomain>;
  abstract delete(id: string): Promise<JobDomain>;
  abstract find(id: string): Promise<JobDomain>;
  abstract findAll(): Promise<JobDomain[]>;
}
