import { JobService } from './job.service';
import { JobDomain } from './job.domain';
import { JobPort } from './job.port';

const createJob = (id: string) => {
  return new JobDomain({
    id,
    title: 'title' + id,
    address: 'address' + id,
    salary: 'address' + id,
    contract_type: 'contract' + id,
    author: 'author' + id,
    description: 'description' + id,
  });
};

class JobRepositoryMock implements JobPort {
  constructor(private jobs: JobDomain[]) {}

  save(job: JobDomain): JobDomain {
    this.jobs[job.id] = job;
    return job;
  }
  update(id: string, job: JobDomain): JobDomain {
    this.jobs[id] = job;
    return job;
  }
  delete(id: string): JobDomain {
    const job = this.jobs[id];
    this.jobs[id] = null;
    return job;
  }
  find(id: string): JobDomain {
    return this.jobs[id];
  }
  getAll(): JobDomain[] {
    return this.jobs;
  }
}

describe('should create job Offer', () => {
  const jobs = [];
  const adapter = new JobRepositoryMock(jobs);
  const jobService = new JobService(adapter);

  it('Should create a job offer successfully', () => {
    // GIVEN
    const id = '1';
    const job1 = createJob(id);

    // WHEN
    const result = jobService.create(job1);

    // THEN
    expect(result).toBe(job1);
    expect(jobs[id]).toEqual(job1);
  });

  it('Should update a job offer successfully', () => {
    // GIVEN
    const id = '1';
    jobs[id] = createJob('old');
    const job1 = createJob(id);

    // WHEN
    const result = jobService.update(id, job1);

    // THEN
    expect(result).toBe(job1);
    expect(jobs[id]).toEqual(job1);
  });

  it('Should delete a job offer successfully', () => {
    // GIVEN
    const id = '1';
    const job1 = createJob('1');
    jobs[id] = job1;

    // WHEN
    const result = jobService.delete(id);

    // THEN
    expect(result).toBe(job1);
    expect(jobs[id]).toEqual(null);
  });

  it('Should find a job offer successfully', () => {
    // GIVEN
    const id = '1';
    jobs[id] = createJob('1');

    // WHEN
    const result = jobService.find(id);

    // THEN
    expect(result).toBe(jobs[id]);
  });

  it('Should find all job offers successfully', () => {
    // GIVEN
    jobs['1'] = createJob('1');
    jobs['2'] = createJob('2');
    jobs['3'] = createJob('3');

    // WHEN
    const result = jobService.getAll();

    // THEN
    expect(result).toBe(jobs);
  });
});
