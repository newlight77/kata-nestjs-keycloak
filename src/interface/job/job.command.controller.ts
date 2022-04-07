import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Resource, RoleMatchingMode, Roles, Scopes } from 'nest-keycloak-connect';
import {
  DeleteJobCommand,
  EditJobCommand,
  PostJobCommand,
} from '../../core/application/job/job.command';
import { JobCommandHandler } from '../../core/application/job/job.command.handler';
import { JobModel } from './job.model';

@ApiBearerAuth('access-token')
@ApiTags('jobs')
@Controller('jobs')
@Resource('res:job')
export class JobCommandController {
  constructor(private readonly jobHandler: JobCommandHandler) {}

  @Post()
  @ApiOperation({ summary: 'Post a job' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Scopes('scopes:create')
  @Roles({
    roles: ['realm:manager.role', 'realm:admin.role'],
    mode: RoleMatchingMode.ALL,
  })
  async create(@Body() job: JobModel, @Res() response: Response): Promise<JobModel | void> {
    const command = new PostJobCommand({
      title: job.title,
      address: job.address,
      salary: job.salary,
      description: job.description,
    });

    const status = this.jobHandler.postJob(command);
    response.status(HttpStatus.CREATED).send(status);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit an existing job' })
  @ApiResponse({
    status: 200,
    description: 'The job record has been edited',
    type: JobModel,
  })
  @Roles({
    roles: ['realm:manager.role', 'realm:admin.role'],
    mode: RoleMatchingMode.ALL,
  })
  // @Scopes('scopes:edit')
  async update(
    @Param('id') id: string,
    @Body() job: JobModel,
    @Res() response: Response,
  ): Promise<JobModel | void> {
    const command = new EditJobCommand({
      id: job.id,
      title: job.title,
      address: job.address,
      salary: job.salary,
      description: job.description,
      created_at: job.created_at,
    });
    const jobs = await this.jobHandler.editJob(command);
    response.status(HttpStatus.OK).send(jobs);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Removing an existing job' })
  @ApiResponse({
    status: 200,
    description: 'The job record has been removed',
    type: JobModel,
  })
  @Roles({
    roles: ['realm:manager.role', 'realm:admin.role'],
    mode: RoleMatchingMode.ALL,
  })
  // @Scopes('scopes:delete')
  async remove(
    @Param('id') id: string,
    @Body() job: JobModel,
    @Res() response: Response,
  ): Promise<JobModel | void> {
    const command: DeleteJobCommand = { id };
    const jobs = await this.jobHandler.removeJob(command);
    response.status(HttpStatus.OK).send(jobs);
  }
}
