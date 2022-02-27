import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { JobService } from 'src/domain/job/job.service';
import { JobModel, toDomain } from './job.model';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  create(@Body() job: JobModel, @Res() response: Response): string | void {
    const status = this.jobService.create(toDomain(job));
    response.status(HttpStatus.CREATED).send(status);
  }
  @Get()
  async getAll(@Res() response: Response) {
    const jobs = await this.jobService.getAll();
    response.status(HttpStatus.OK).send(jobs);
  }
}
