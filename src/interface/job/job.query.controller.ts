import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles, Scopes } from 'nest-keycloak-connect';
import { FindJobQuery } from 'src/core/application/job/job.find.query';
import { JobCrudService } from '../../core/domain/job/job.crud.service';
import { fromDomain, JobModel } from './job.model';

@ApiBearerAuth()
@ApiTags('jobs')
@Controller('jobs')
export class JobQueryController {
  constructor(private readonly jobService: JobCrudService) {}

  @Get('query')
  @ApiOperation({ summary: 'Query jobs' })
  @ApiResponse({
    status: 200,
    description: 'The job records are found',
    type: JobModel,
  })
  @Roles({ roles: ['user', 'other'] })
  @Scopes('view')
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
    const jobs = await this.jobService.findByQuery(query);
    if (jobs && jobs.length > 0) return jobs.map((it) => fromDomain(it));
  }
}
