import { Given, Then, When } from '@cucumber/cucumber';

import { JobDomain } from '../../../src/domain/job/job.domain';
import { JobService } from '../../../src/domain/job/job.service';
import { JobPort } from '../../../src/domain/job/job.port';

class JobRepositoryMock implements JobPort {
  save(job: JobDomain): string {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<JobDomain[]> {
    throw new Error('Method not implemented.');
  }
}

Given(
  'Creating a job offer with {string}, {string}, {string}, {string}, {string}, {string}',
  function (title, address, description, salary, contract_type, author) {
    // Write code here that turns the phrase above into concrete actions
    this.jobDomain = new JobDomain({
      title,
      address,
      description,
      salary,
      contract_type,
      author,
    });

    this.jobAdapter = new JobRepositoryMock();
    this.jobService = new JobService(this.jobAdapter);

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
