import { Before, Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';

import { JobDomain } from '../../../src/core/domain/job/job.domain';
import { JobCommandService } from '../../../src/core/domain/job/job.command.service';
import { JobPort } from '../../../src/core/domain/job/job.port';

class JobAdapterMock implements JobPort {
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

Before(function () {
  jobsInMemory.length = 0;
  const adapter: any = new JobAdapterMock(jobsInMemory);
  this.jobCommandService = new JobCommandService(adapter);
});

Given('a user job with details as shown in the table', function (dataTable) {
  console.log(dataTable.rows());
  this.job = new JobDomain(dataTable.rowsHash());
  console.log(this.job);
});

When('the user posts the job', async function () {
  this.result = await this.jobCommandService.create(this.job);
});

Then('The job is created as shown in the table', function (dataTable) {
  this.expectedJob = new JobDomain(dataTable.rowsHash());
  const shownJob = this.result['job'];
  expect(shownJob.title).to.eql(this.expectedJob.title);
  expect(shownJob.address).to.eql(this.expectedJob.address);
  expect(shownJob.salary).to.eql(this.expectedJob.salary);
  expect(shownJob.description).to.eql(this.expectedJob.description);
});

Then('a message <message> is shown', function (dataTable) {
  const expectedMessage = dataTable.rowsHash()['message'];
  const message = this.result['message'];
  expect(message).to.eql(expectedMessage);
});
