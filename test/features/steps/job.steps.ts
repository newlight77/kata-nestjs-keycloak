import { Given, Then, When } from '@cucumber/cucumber';

import { JobDomain } from '../../../src/core/domain/job/job.domain';
import { JobCrudService } from '../../../src/core/domain/job/job.crud.service';
import { JobPort } from '../../../src/core/domain/job/job.port';

class JobRepositoryMock implements JobPort {
  constructor(private jobs: JobDomain[]) {}

  async save(job: JobDomain): Promise<JobDomain> {
    this.jobs[job.id] = job;
    return job;
  }
  async update(id: string, job: JobDomain): Promise<JobDomain> {
    this.jobs[id] = job;
    return job;
  }
  async delete(id: string): Promise<JobDomain> {
    const job = this.jobs[id];
    this.jobs[id] = null;
    return job;
  }
  async find(id: string): Promise<JobDomain> {
    return this.jobs[id];
  }
  async findAll(): Promise<JobDomain[]> {
    return this.jobs;
  }
}

const jobsInMemory = [];

beforeAll(async () => {
  jobsInMemory.length = 0;
});

Given(
  'Creating a job offer with {string}, {string}, {string}, {number}, {string}, {string}, {string}',
  function (
    title,
    address,
    salary,
    currency,
    contract_type,
    author,
    description,
  ) {
    // Write code here that turns the phrase above into concrete actions
    this.jobDomain = new JobDomain({
      id: '0',
      title,
      address,
      salary,
      currency,
      contract_type,
      author,
      description,
    });

    this.jobAdapter = new JobRepositoryMock(jobsInMemory);
    this.jobService = new JobCrudService(this.jobAdapter);

    // this.jobAdapter.getAll = (): Promise<JobDomain[]> => {
    //   throw new Error('Function not implemented.');
    // };
  },
);

When('I save the job offer', function () {
  //this.result = this.jobService.create(this.jobDomain);
});

Then('I received a {string} created', function (message: string) {
  //expect(this.result).to.equals(message);
});
