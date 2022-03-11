import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { RoleMatchingMode, Roles, Scopes } from 'nest-keycloak-connect';
import {
  DeleteJobCommand,
  EditJobCommand,
  PostJobCommand,
} from 'src/core/application/job/job.command';
import { JobCommandHandler } from 'src/core/application/job/job.command.handler';
import { JobModel } from './job.model';

@ApiBearerAuth()
@ApiTags('jobs')
@Controller('jobs')
export class JobCommandController {
  constructor(private readonly jobHandler: JobCommandHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create job' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Scopes('edit', 'create')
  @Roles({ roles: ['admin', 'realm:sysadmin'], mode: RoleMatchingMode.ALL })
  async create(
    @Body() job: JobModel,
    @Res() response: Response,
  ): Promise<JobModel | void> {
    const command = new PostJobCommand({
      title: job.title,
      address: job.address,
      salary: job.salary,
      currency: job.currency,
      contract_type: job.contract_type,
      author: job.author,
      description: job.description,
    });

    const status = this.jobHandler.postJob(command);
    response.status(HttpStatus.CREATED).send(status);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing job' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: JobModel,
  })
  @Roles({ roles: ['user', 'other'] })
  @Scopes('view')
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
      currency: job.currency,
      contract_type: job.contract_type,
      author: job.author,
      description: job.description,
      created_at: job.created_at,
    });
    const jobs = await this.jobHandler.editJob(command);
    response.status(HttpStatus.OK).send(jobs);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Update an existing job' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: JobModel,
  })
  @Roles({ roles: ['user', 'other'] })
  @Scopes('view')
  async delete(
    @Param('id') id: string,
    @Body() job: JobModel,
    @Res() response: Response,
  ): Promise<JobModel | void> {
    const command = new DeleteJobCommand({ id });
    const jobs = await this.jobHandler.deleteJob(command);
    response.status(HttpStatus.OK).send(jobs);
  }
}
