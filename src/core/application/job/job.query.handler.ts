import { Injectable } from '@nestjs/common';
import { JobDomain } from 'src/core/domain/job/job.domain';
import { JobService } from 'src/core/domain/job/job.service';
import { FindJobQuery } from './job.find.query';

@Injectable()
export class JobQueryHandler {
  constructor(private service: JobService) {}
}
