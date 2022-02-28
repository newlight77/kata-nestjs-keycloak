import { JobDomain } from '../job/job.domain';

export abstract class JobRepository {
  abstract save(job: JobDomain): string;
  abstract getAll(): Promise<JobDomain[]>;
}
