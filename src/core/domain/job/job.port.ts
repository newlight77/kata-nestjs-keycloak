import { JobDomain } from './job.domain';

export abstract class JobPort {
  abstract save(job: JobDomain): Promise<JobDomain | void>;
  abstract update(id: string, job: JobDomain): Promise<JobDomain | void>;
  abstract delete(id: string): Promise<JobDomain | void>;
  abstract find(id: string): Promise<JobDomain | void>;
  abstract getAll(): Promise<JobDomain[] | void>;
}
