import { JobDomain } from '../job/job.domain';

export interface JobRepository {
  save(job: JobDomain): string;
  getAll(): Promise<JobDomain[]>;
}
