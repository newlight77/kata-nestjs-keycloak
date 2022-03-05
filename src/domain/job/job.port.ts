import { JobDomain } from './job.domain';

export abstract class JobPort {
  abstract save(job: JobDomain): JobDomain;
  abstract getAll(): JobDomain[] | void;
}
