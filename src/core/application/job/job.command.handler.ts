import { Injectable } from '@nestjs/common';
import { JobDomain, toDomain } from 'src/core/domain/job/job.domain';
import { JobService } from 'src/core/domain/job/job.service';
import { PostJobCommand } from './job.post.command';

@Injectable()
export class JobCommandHandler {
  constructor(private service: JobService) {}

  async postJob(command: PostJobCommand): Promise<void | JobDomain> {
    return this.service.create(toDomain(command));
  }
}
