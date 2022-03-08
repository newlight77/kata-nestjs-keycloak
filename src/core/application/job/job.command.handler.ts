import { Injectable } from '@nestjs/common';
import { JobDomain, toDomain } from 'src/core/domain/job/job.domain';
import { JobService } from 'src/core/domain/job/job.service';
import { PostJobCommand } from './post.job.command';

@Injectable()
export class JobCommandHandler {
  constructor(private service: JobService) {}

  postJob(command: PostJobCommand): JobDomain {
    return this.service.create(toDomain(command));
  }
}
