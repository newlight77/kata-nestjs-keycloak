import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  Public,
  Resource,
  RoleMatchingMode,
  Roles,
  Scopes,
} from 'nest-keycloak-connect';
import {
  FindJobByIdCommand,
  FindJobQuery,
} from 'src/core/application/job/job.find.query';
import { JobQueryHandler } from 'src/core/application/job/job.query.handler';
import { fromDomain, JobModel } from './job.model';

@ApiBearerAuth('access-token')
@ApiTags('jobs')
@Controller('jobs')
@Resource('res:job')
export class JobQueryController {
  constructor(private readonly handler: JobQueryHandler) {}

  @Get(':id')
  @ApiOperation({ summary: 'Query a job by id' })
  @ApiResponse({
    status: 200,
    description: 'The job record is found',
    type: JobModel,
  })
  @Roles({
    roles: ['realm:user.role', 'realm:manager.role', 'realm:admin.role'],
    mode: RoleMatchingMode.ANY,
  })
  @Scopes('scopes:view')
  async getById(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<JobModel | void> {
    const query = new FindJobByIdCommand({ id });
    const jobs = await this.handler.queryJobById(query);
    response.status(HttpStatus.FOUND).send(jobs);
  }

  @Get()
  @ApiOperation({ summary: 'Query all jobs' })
  @ApiResponse({
    status: 200,
    description: 'The job records are found',
    type: JobModel,
  })
  @Roles({
    roles: ['realm:user.role', 'realm:manager.role', 'realm:admin.role'],
    mode: RoleMatchingMode.ANY,
  })
  @Scopes('scopes:view')
  @Public(false)
  async queryAll(): Promise<JobModel[] | void> {
    const jobs = await this.handler.queryAll();
    if (jobs) return jobs.map((it) => fromDomain(it));
  }

  @Get('query')
  @ApiOperation({ summary: 'Query jobs by keywords' })
  @ApiResponse({
    status: 200,
    description: 'The job records are found',
    type: JobModel,
  })
  @Roles({
    roles: ['realm:user.role', 'realm:manager.role', 'realm:admin.role'],
    mode: RoleMatchingMode.ANY,
  })
  @Scopes('scopes:view')
  async queryJobs(
    @Param('keywords') keywords: string,
    @Param('minSalary') minSalary: number,
    @Param('maxSalary') maxSalary: number,
  ): Promise<JobModel[] | void> {
    const query = new FindJobQuery({
      keywords: keywords.split(','),
      minSalary,
      maxSalary,
    });
    const jobs = await this.handler.queryJobs(query);
    if (jobs && jobs.length > 0) return jobs.map((it) => fromDomain(it));
  }
}
