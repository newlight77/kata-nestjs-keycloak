import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public, Resource, RoleMatchingMode, Roles, Scopes } from 'nest-keycloak-connect';
import { domainToDto, JobQueryDto } from '../../core/application/job/job.query.dto';
import { JobQuery } from '../../core/application/job/job.query';
import { JobQueryHandler } from '../../core/application/job/job.query.handler';
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
  // @Scopes('scopes:view')
  async getById(@Param('id') id: string, @Res() response: Response): Promise<JobModel | void> {
    const query = { id: id };
    const jobs = await this.handler.findById(query);
    response.status(HttpStatus.FOUND).send(jobs);
  }

  @Get()
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
  // @Scopes('scopes:view')
  async queryJobs(
    @Query('keywords') keywords: string,
    @Query('minSalary') minSalary: number,
    @Query('maxSalary') maxSalary: number,
  ): Promise<JobQueryDto[]> {
    if (keywords || minSalary || maxSalary) {
      return await this.queryAllJobs(keywords, minSalary, maxSalary);
    }

    const jobs = await this.handler.findAll();
    if (jobs && jobs.length > 0) return jobs.map((it) => domainToDto(it));

    return [];
  }

  private async queryAllJobs(
    keywords: string,
    minSalary: number,
    maxSalary: number,
  ): Promise<JobQueryDto[]> {
    const query = new JobQuery({
      keywords: keywords.split(','),
      minSalary,
      maxSalary,
    });
    return await this.handler.queryJobs(query);
  }
}
