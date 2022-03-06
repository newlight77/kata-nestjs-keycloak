import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JobEntity } from './job.entity';

@Injectable()
export class JobRepository {
  constructor(
    @InjectRepository(JobEntity)
    private readonly repository: Repository<JobEntity>,
  ) {}

  public async findById(id: string): Promise<JobEntity> {
    return await this.repository.findOne(id);
  }

  public async findAll(): Promise<JobEntity[]> {
    return await this.repository.find({});
  }
  public async createJob(entity: JobEntity): Promise<JobEntity> {
    await this.repository.save(entity);
    return entity;
  }

  public async updateJob(jobId: string, entity: JobEntity): Promise<JobEntity> {
    let job = await this.repository.findOne(jobId);
    job = { ...job, ...entity };
    await this.repository.save(job);
    return job;
  }

  public async deleteJob(id: string): Promise<JobEntity> {
    const job = await this.repository.findOne(id);
    await this.repository.delete(id);
    return job;
  }

  public async destroy(jobId: string): Promise<void> {
    const job = await this.repository.findOne(jobId);
    await this.repository.remove(job);
  }
}
