import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { RoleMatchingMode, Roles, Scopes } from 'nest-keycloak-connect';
import { JobService } from '../../domain/job/job.service';
import { fromDomain, JobModel, toDomain } from './job.model';

@ApiBearerAuth()
@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

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
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: JobModel,
  })
  @Roles({ roles: ['user', 'other'] })
  @Scopes('view')
  async getById(@Res() response: Response): Promise<JobModel | void> {
    const jobs = await this.jobService.getAll();
    response.status(HttpStatus.OK).send(jobs);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The job records are found',
    type: JobModel,
  })
  @Roles({ roles: ['user', 'other'] })
  @Scopes('view')
  async getAll(): Promise<JobModel[] | void> {
    const jobs = this.jobService.getAll();
    if (jobs) return jobs.map((it) => fromDomain(it));
  }
}
