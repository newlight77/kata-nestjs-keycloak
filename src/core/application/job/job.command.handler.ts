import { Injectable } from '@nestjs/common';
import {
  JobCreatedEvent,
  JobUpdatedEvent,
  JobDeletedEvent,
  toDomain,
} from '../../../../src/core/domain/job/job.domain';
import { JobCommandService } from '../../../../src/core/domain/job/job.command.service';
import {
  DeleteJobCommand,
  EditJobCommand,
  PostJobCommand,
} from './job.command';

@Injectable()
export class JobCommandHandler {
  constructor(private service: JobCommandService) {}

  async postJob(command: PostJobCommand): Promise<void | JobCreatedEvent> {
    return this.service.create(toDomain(command));
  }

  async editJob(command: EditJobCommand): Promise<void | JobUpdatedEvent> {
    return this.service.update(command.id, toDomain(command));
  }

  async removeJob(command: DeleteJobCommand): Promise<void | JobDeletedEvent> {
    return this.service.delete(command.id);
  }
}
