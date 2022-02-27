import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JobDomain } from '../../domain/job/job.domain';
import { JobRepository } from '../../domain/job/job.repository';
import { fromDomain, JobEntity, toDomain } from './job.entities';

@Injectable()
export class JobAdapter implements JobRepository {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobEntityRepository: Repository<JobEntity>,
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
