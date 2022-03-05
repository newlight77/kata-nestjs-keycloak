import { JobDomain } from './job.domain';

export abstract class JobPort {
  abstract save(job: JobDomain): JobDomain;
  abstract update(id: string, job: JobDomain): JobDomain | void;
  abstract delete(id: string): JobDomain | void;
  abstract find(id: string): JobDomain | void;
  abstract getAll(): JobDomain[] | void;
}
