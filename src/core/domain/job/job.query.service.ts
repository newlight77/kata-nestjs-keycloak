import { Injectable } from '@nestjs/common';
import { domainToDto, JobQueryDto } from '../../../core/application/job/job.query.dto';
import { JobQuery } from '../../application/job/job.query';
import { JobDomain } from './job.domain';
import { JobPort } from './job.port';

@Injectable()
export class JobQueryService {
  constructor(private adapter: JobPort) {}

  async findById(id: string): Promise<JobDomain> {
    return this.adapter.find(id);
  }

  async findAll(): Promise<JobDomain[]> {
    return this.adapter.findAll();
  }

  async findByQuery(query: JobQuery): Promise<JobQueryDto[]> {
    const jobs = await this.adapter.findAll();
    return jobs
      .map((domain) => domainToDto(domain))
      .map((dto) => this.countMatchedKeywords(dto, query.keywords))
      .filter((j) => this.matchedKeywords(j))
      .filter((j) => this.matchSalary(j, query.minSalary, query.maxSalary))
      .sort((a, b) => (a.matched < b.matched ? 1 : -1));
  }

  private matchedKeywords(job: JobQueryDto): boolean {
    return job.matched > 0;
  }

  private countMatchedKeywords(job: JobQueryDto, keywords): JobQueryDto {
    if (keywords === null || keywords.length == 0) return job;
    let count = 0;
    count += countMatchedKeywords(job.title, keywords);
    count += countMatchedKeywords(job.address, keywords);
    count += countMatchedKeywords(job.description, keywords);
    job.matched = count;
    return job;
  }

  private matchSalary(job: JobQueryDto, min: number, max: number): boolean {
    if (min == null && max == null) return true;
    if (min == null && job.salary <= max) return true;
    if (max == null && min <= job.salary) return true;
    if (min <= job.salary && job.salary <= max) return true;
  }
}

const countMatchedKeywords = (text: string, keywords: string[]): number =>
  keywords.filter((k) => text.includes(k)).length;
