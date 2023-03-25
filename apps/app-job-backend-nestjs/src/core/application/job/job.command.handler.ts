import { Injectable } from '@nestjs/common';
import { toDomain } from '../../domain/job/job.domain';
import { JobCommandService } from '../../domain/job/job.command.service';
import { DeleteJobCommand, EditJobCommand, PostJobCommand } from './job.command';
import {
  JobCreatedEvent,
  JobDeletedEvent,
  JobUpdatedEvent,
} from '../../../core/domain/job/job.event';

@Injectable()
export class JobCommandHandler {
  constructor(private service: JobCommandService) {}

  async postJob(command: PostJobCommand): Promise<JobCreatedEvent> {
    return this.service.create(toDomain(command));
  }

  async editJob(command: EditJobCommand): Promise<JobUpdatedEvent> {
    return this.service.update(command.id, toDomain(command));
  }

  async removeJob(command: DeleteJobCommand): Promise<JobDeletedEvent> {
    return this.service.delete(command.id);
  }
}
