import {
  Body,
  Controller,
  Get,
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
import { JobCrudService } from '../../core/domain/job/job.crud.service';
import { fromDomain, JobModel, toDomain } from './job.model';

@ApiBearerAuth()
@ApiTags('jobs/crud')
@Controller('jobs/crud')
export class JobCrudController {
  constructor(private readonly jobService: JobCrudService) {}

  @Post()
  @ApiOperation({ summary: 'Create job' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Scopes('edit', 'create')
  @Roles({ roles: ['admin', 'realm:sysadmin'], mode: RoleMatchingMode.ALL })
  async create(
    @Body() job: JobModel,
    @Res() response: Response,
  ): Promise<JobModel | void> {
    const status = this.jobService.create(toDomain(job));
    response.status(HttpStatus.CREATED).send(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a job by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: JobModel,
  })
  @Roles({ roles: ['user', 'other'] })
  @Scopes('view')
  async getById(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<JobModel | void> {
    const jobs = await this.jobService.find(id);
    response.status(HttpStatus.FOUND).send(jobs);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing job' })
  @ApiResponse({
    status: 200,
    description: 'The job record has been updated',
    type: JobModel,
  })
  @Roles({ roles: ['user', 'other'] })
  @Scopes('view')
  async update(
    @Param('id') id: string,
    @Body() job: JobModel,
    @Res() response: Response,
  ): Promise<JobModel | void> {
    const jobs = await this.jobService.update(id, toDomain(job));
    response.status(HttpStatus.OK).send(jobs);
  }

  @Get()
  @ApiOperation({ summary: 'Find all jobs' })
  @ApiResponse({
    status: 200,
    description: 'The job records are found',
    type: JobModel,
  })
  @Roles({ roles: ['user', 'other'] })
  @Scopes('view')
  async findAll(): Promise<JobModel[] | void> {
    const jobs = await this.jobService.findAll();
    if (jobs) return jobs.map((it) => fromDomain(it));
  }
}
