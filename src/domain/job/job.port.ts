import { JobDomain } from './job.domain';

export abstract class JobPort {
  abstract save(job: JobDomain): string;
  abstract getAll(): Promise<JobDomain[]>;
}
