import { Given, Then, When } from '@cucumber/cucumber';
import { BeforeAll } from '@cucumber/cucumber';

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

BeforeAll(async () => {
  jobsInMemory.length = 0;
});

Given('a user job with details as shown in the table', function (dataTable) {
  // Write code here that turns the phrase above into concrete actions
  console.log(dataTable.rows());
  this.job = new JobDomain(dataTable.rowsHash());
  console.log(this.job);
  return 'pending';
});

When('the user posts the job', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('The job is created as shown in the table', function (dataTable) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('a message <message> is shown', function (dataTable) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});