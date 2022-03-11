import { Injectable } from '@nestjs/common';
import { JobDomain, toDomain } from 'src/core/domain/job/job.domain';
import { JobCrudService } from 'src/core/domain/job/job.crud.service';
import {
  DeleteJobCommand,
  EditJobCommand,
  PostJobCommand,
} from './job.command';

@Injectable()
export class JobCommandHandler {
  constructor(private service: JobCrudService) {}

  async postJob(command: PostJobCommand): Promise<void | JobDomain> {
    return this.service.create(toDomain(command));
  }

  async editJob(command: EditJobCommand): Promise<void | JobDomain> {
    return this.service.update(command.id, toDomain(command));
  }

  async deleteJob(command: DeleteJobCommand): Promise<void | JobDomain> {
    return this.service.delete(command.id);
  }
}
