import { Before, Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';

import { JobDomain } from '../../../src/core/domain/job/job.domain';
import { JobCommandService } from '../../../src/core/domain/job/job.command.service';
import { JobPort } from '../../../src/core/domain/job/job.port';
import { JobQueryService } from '../../../src/core/domain/job/job.query.service';
import { JobCommandHandler } from '../../../src/core/application/job/job.command.handler';
import { JobQueryHandler } from '../../../src/core/application/job/job.query.handler';

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
    console.log('find', id, this.jobs[id]);
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
  const jobCommandService = new JobCommandService(adapter);
  this.jobCommandHandler = new JobCommandHandler(jobCommandService);
  const jobQueryService = new JobQueryService(adapter);
  this.jobQueryHandler = new JobQueryHandler(jobQueryService);
});

Given('a user job with details as shown in the table', function (dataTable) {
  this.job = new JobDomain(dataTable.rowsHash());
});

When('the user posts the job', async function () {
  this.result = await this.jobCommandHandler.postJob(this.job);
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

Given('an existing job with details as followed', function (dataTable) {
  this.job = new JobDomain(dataTable.rowsHash());
  jobsInMemory[this.job.id] = this.job;
});

When(
  'The user updates a few attributes of the job identified by id as shown',
  async function (dataTable) {
    this.job = new JobDomain(dataTable.rowsHash());
    this.result = await this.jobCommandHandler.editJob(this.job);
  },
);

Then('The job is modified as followed', function (dataTable) {
  this.expectedJob = new JobDomain(dataTable.rowsHash());
  const modifiedJob = this.result['job'];
  console.log(modifiedJob);
  expect(modifiedJob.title).to.eql(this.expectedJob.title);
  expect(modifiedJob.address).to.eql(this.expectedJob.address);
  expect(modifiedJob.salary).to.eql(this.expectedJob.salary);
  expect(modifiedJob.description).to.eql(this.expectedJob.description);
});

When('The user deletes the job identified by id as below', async function (dataTable) {
  const id = dataTable.rowsHash().id;
  this.result = await this.jobCommandHandler.removeJob({ id });
});

Then('The job identified by id as below is deleted', function (dataTable) {
  const id = dataTable.rowsHash().id;
  expect(jobsInMemory[id]).to.eql(null);
});

When('The user opens the job identified by id as below for details', async function (dataTable) {
  const id = dataTable.rowsHash().id;
  const query = { id };
  this.result = await this.jobQueryHandler.findById(query);
  console.log(this.result);
});

Then('The job detail is displayed as followed', function (dataTable) {
  this.expectedJob = new JobDomain(dataTable.rowsHash());
  const shownJob = this.result;
  console.log(this.result);
  expect(shownJob.title).to.eql(this.expectedJob.title);
  expect(shownJob.address).to.eql(this.expectedJob.address);
  expect(shownJob.salary).to.eql(this.expectedJob.salary);
  expect(shownJob.description).to.eql(this.expectedJob.description);
});

Given('The existing jobs as followed', function (dataTable) {
  dataTable.hashes().forEach((job) => {
    jobsInMemory[job.id] = job;
  });
});

When('The user lists all jobs', async function () {
  this.result = await this.jobQueryHandler.findAll();
});

Then('All jobs appear in the list as followed:', function (dataTable) {
  const shownJobs = dataTable.hashes();
  expect(shownJobs.length).to.eql(4);
  expect(shownJobs[0].id in jobsInMemory).to.eql(true);
  expect(shownJobs[1].id in jobsInMemory).to.eql(true);
  expect(shownJobs[2].id in jobsInMemory).to.eql(true);
  expect(shownJobs[3].id in jobsInMemory).to.eql(true);
});
