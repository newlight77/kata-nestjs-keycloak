import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { JobDomain } from '../../domain/job/job.domain';
import { JobPort } from '../../domain/job/job.port';
import { fromDomain, JobEntity, toDomain } from './job.entities';
import { JobEntityRepository } from './job.entity.repository';

@Injectable()
export class JobRepositoryAdapter implements JobPort {
  constructor(
    //@InjectRepository(JobEntity)
    private readonly jobEntityRepository: JobEntityRepository,
  ) {}

  public save(job: JobDomain) {
    const entity = fromDomain(job);
    this.jobEntityRepository.save(entity);
    return 'success';
  }

  public getAll(): Promise<JobDomain[]> {
    return new Promise((resolve) => {
      this.jobEntityRepository
        .find()
        .then((data) => {
          const domains = data.map((entity) => toDomain(entity));
          resolve(domains);
        })
        .catch((error) => {
          console.log(error);
          resolve(null);
        });
    });
  }
}
