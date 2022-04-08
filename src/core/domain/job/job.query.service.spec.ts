import { JobQueryService } from './job.query.service';
import { JobDomain } from './job.domain';
import { JobPort } from './job.port';
import { FindJobQuery } from '../../application/job/job.find.query';

const createJob = (id: string, salary: number) => {
  return new JobDomain({
    id,
    title: 'title' + id,
    company: 'company' + id,
    address: 'address' + id,
    salary,
    description: 'description' + id,
    created_at: new Date(),
    updated_at: new Date(),
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
  const jobService = new JobQueryService(adapter);

  beforeEach(async () => {
    jobs.length = 0;
  });

  it('Should find a job offer successfully', async () => {
    // GIVEN
    const id = '1';
    jobs[id] = createJob('1', 50000);

    // WHEN
    const result = await jobService.findById(id);

    // THEN
    expect(result).toBe(jobs[id]);
  });

  it('Should find all job offers successfully', async () => {
    // GIVEN
    jobs['0'] = createJob('0', 50000);
    jobs['1'] = createJob('1', 50000);
    jobs['2'] = createJob('2', 50000);

    // WHEN
    const result = await jobService.findAll();

    // THEN
    expect(result.length).toBe(3);
    expect(result).toBe(jobs);
  });
  it('Should find job offers by keyword match', async () => {
    // GIVEN
    jobs['0'] = createJob('0', 50000);
    jobs['1'] = createJob('1', 50000);
    jobs['2'] = createJob('2', 50000);
    const query = new FindJobQuery({
      keywords: '1,5,7'.split(','),
      minSalary: null,
      maxSalary: null,
    });

    // WHEN
    const result = await jobService.findByQuery(query);

    // THEN
    expect(result.length).toBe(1);
    expect(result).toStrictEqual([jobs['1']]);
  });

  it('Should find job offers by salary range match', async () => {
    // GIVEN
    jobs['0'] = createJob('0', 40000);
    jobs['1'] = createJob('1', 50000);
    jobs['2'] = createJob('2', 70000);
    const query = new FindJobQuery({
      keywords: null,
      minSalary: 50000,
      maxSalary: 60000,
    });

    // WHEN
    const result = await jobService.findByQuery(query);

    // THEN
    expect(result.length).toBe(1);
    expect(result).toStrictEqual([jobs['1']]);
  });

  it('Should find job offers by keywords and salary range match', async () => {
    // GIVEN
    jobs['0'] = createJob('0', 40000);
    jobs['1'] = createJob('1', 50000);
    jobs['2'] = createJob('2', 60000);
    const query = new FindJobQuery({
      keywords: '0,1,7'.split(','),
      minSalary: 50000,
      maxSalary: 60000,
    });

    // WHEN
    const result = await jobService.findByQuery(query);

    // THEN
    expect(result.length).toBe(1);
    expect(result).toStrictEqual([jobs['1']]);
  });
});
