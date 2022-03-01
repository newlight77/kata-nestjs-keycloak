import { JobService } from './job.service';
import { JobDomain } from './job.domain';
import { JobPort } from './job.port';

const completeJobs = new JobDomain({
  title: 'title',
  address: 'address',
  salary: 'address',
  contract_type: 'contract',
  author: 'author',
  description: 'description',
});

class JobRepositoryMock implements JobPort {
  save(_job: JobDomain): string {
    return 'success';
  }
  getAll(): Promise<JobDomain[]> {
    throw new Error('Method not implemented.');
  }
}

describe('should create job Offer', () => {
  const adapter = new JobRepositoryMock();
  const jobService = new JobService(adapter);

  it('Should send message successfully', () => {
    expect(jobService.create(completeJobs)).toBe('success');
  });
});
