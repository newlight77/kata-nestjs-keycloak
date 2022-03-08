import { Injectable } from '@nestjs/common';

import { JobDomain } from '../../core/domain/job/job.domain';
import { JobPort } from '../../core/domain/job/job.port';
import { fromDomain, toDomain } from './job.entity';
import { JobRepository } from './job.repository';

@Injectable()
export class JobRepositoryAdapter implements JobPort {
  constructor(private readonly jobRepository: JobRepository) {}

  public async save(job: JobDomain): Promise<JobDomain | void> {
    const entity = fromDomain(job);
    return this.jobRepository.createJob(entity).then((data) => toDomain(data));
  }

  public async update(id: string, job: JobDomain): Promise<JobDomain | void> {
    const entity = fromDomain(job);
    this.jobRepository.updateJob(id, entity).then((data) => toDomain(data));
  }

  public async delete(id: string): Promise<JobDomain> {
    return this.jobRepository.deleteJob(id).then((data) => toDomain(data));
  }

  public async find(id: string): Promise<JobDomain | void> {
    return this.jobRepository
      .findById(id)
      .then((data) => {
        return toDomain(data);
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  public async getAll(): Promise<JobDomain[] | void> {
    this.jobRepository
      .findAll()
      .then((data) => {
        const domains = data.map((entity) => toDomain(entity));
        return domains;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
