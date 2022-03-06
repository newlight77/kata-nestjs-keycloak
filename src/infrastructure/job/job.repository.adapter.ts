import { Injectable } from '@nestjs/common';

import { JobDomain } from '../../domain/job/job.domain';
import { JobPort } from '../../domain/job/job.port';
import { fromDomain, toDomain } from './job.entity';
import { JobRepository } from './job.repository';

@Injectable()
export class JobRepositoryAdapter implements JobPort {
  constructor(private readonly jobRepository: JobRepository) {}

  public save(job: JobDomain) {
    const entity = fromDomain(job);
    this.jobRepository.createJob(entity);
    return job;
  }

  public update(id: string, job: JobDomain): JobDomain | void {
    const entity = fromDomain(job);
    this.jobRepository.updateJob(id, entity).then((data) => data);
  }

  public delete(id: string): JobDomain | void {
    this.jobRepository.deleteJob(id).then((data) => data);
  }

  public find(id: string): JobDomain | void {
    this.jobRepository
      .findById(id)
      .then((data) => {
        return toDomain(data);
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  public getAll(): JobDomain[] | void {
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
