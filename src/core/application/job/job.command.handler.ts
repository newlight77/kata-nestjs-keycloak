import { Injectable } from '@nestjs/common';
import { JobDomain, toDomain } from 'src/core/domain/job/job.domain';
import { JobCrudService } from 'src/core/domain/job/job.crud.service';
import { PostJobCommand } from './job.post.command';

@Injectable()
export class JobCommandHandler {
  constructor(private service: JobCrudService) {}

  async postJob(command: PostJobCommand): Promise<void | JobDomain> {
    return this.service.create(toDomain(command));
  }
}
