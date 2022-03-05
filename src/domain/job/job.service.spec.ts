import { JobService } from './job.service';
import { JobDomain } from './job.domain';
import { JobPort } from './job.port';

const job = new JobDomain({
  title: 'title',
  address: 'address',
  salary: 'address',
  contract_type: 'contract',
  author: 'author',
  description: 'description',
});

class JobRepositoryMock implements JobPort {
  save(_job: JobDomain): JobDomain {
    return _job;
  }
  update(id: string, _job: JobDomain): JobDomain {
    return _job;
  }
  delete(id: string): JobDomain {
    return null;
  }
  find(id: string): JobDomain {
    throw null;
  }
  getAll(): JobDomain[] {
    throw null;
  }
}

describe('should create job Offer', () => {
  const adapter = new JobRepositoryMock();
  const jobService = new JobService(adapter);

  it('Should send message successfully', () => {
    expect(jobService.create(job)).toBe(job);
  });
});
