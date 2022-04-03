import { JobDomain } from './job.domain';

export class JobCreatedEvent {
  job: JobDomain;
  message: string;
}

export class JobUpdatedEvent {
  job: JobDomain;
  message: string;
}

export class JobDeletedEvent {
  job: JobDomain;
  message: string;
}
