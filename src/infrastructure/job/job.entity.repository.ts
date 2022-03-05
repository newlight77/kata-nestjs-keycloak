import { EntityRepository, Repository } from 'typeorm';

import { JobEntity } from './job.entity';

@EntityRepository(JobEntity)
export class JobEntityRepository extends Repository<JobEntity> {
  public async findById(id: string): Promise<JobEntity> {
    return await this.findOne(id);
  }

  public async findAll(): Promise<JobEntity[]> {
    return await this.find({});
  }
  public async createJob(entity: JobEntity): Promise<JobEntity> {
    await this.save(entity);
    return entity;
  }

  public async updateJob(jobId: string, entity: JobEntity): Promise<JobEntity> {
    let job = await this.findOne(jobId);
    job = { ...job, ...entity };
    await this.save(job);
    return job;
  }

  public async deleteJob(id: string): Promise<JobEntity> {
    const job = await this.findOne(id);
    await this.delete(id);
    return job;
  }

  public async destroy(jobId: string): Promise<void> {
    const job = await this.findOne(jobId);
    await this.remove(job);
  }
}
