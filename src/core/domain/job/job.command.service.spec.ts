import { JobCommandService } from './job.command.service';
import { JobDomain } from './job.domain';
import { JobPort } from './job.port';

const createJob = (id: string, salary: number) => {
  return new JobDomain({
    id,
    title: 'title' + id,
    address: 'address' + id,
    salary,
    description: 'description' + id,
  });
};

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

describe('should create job Offer', () => {
  const jobs = [];
  const adapter = new JobRepositoryMock(jobs);
  const jobCrudService = new JobCommandService(adapter);

  beforeEach(async () => {
    jobs.length = 0;
  });

  it('Should create a job offer successfully', async () => {
    // GIVEN
    const id = '1';
    const job1 = createJob(id, 5000);

    // WHEN
    const result = await jobCrudService.create(job1);

    // THEN
    expect(result.job).toEqual(job1);
    expect(result.message).toBe('created');
    expect(jobs[id]).toEqual(job1);
  });

  it('Should update a job offer successfully', async () => {
    // GIVEN
    const id = '1';
    jobs[id] = createJob('old', 50000);
    const job1 = createJob(id, 50000);

    // WHEN
    const result = await jobCrudService.update(id, job1);

    // THEN
    expect(result.job).toEqual(job1);
    expect(result.message).toBe('updated');
    expect(jobs[id]).toEqual(job1);
  });

  it('Should delete a job offer successfully', async () => {
    // GIVEN
    const id = '1';
    const job1 = createJob('1', 50000);
    jobs[id] = job1;

    // WHEN
    const result = await jobCrudService.delete(id);

    // THEN
    expect(result.job).toEqual(job1);
    expect(result.message).toBe('deleted');
    expect(jobs[id]).toEqual(null);
  });
});
