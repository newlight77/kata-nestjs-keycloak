import { Injectable } from '@nestjs/common';
import { FindJobQuery } from '../../../core/application/job/job.find.query';
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

  async findByQuery(query: FindJobQuery): Promise<JobDomain[]> {
    const jobs = await this.adapter.findAll();
    return jobs
      .filter((j) => this.matchKeywords(j, query.keywords))
      .filter((j) => this.matchSalary(j, query.minSalary, query.maxSalary));
  }

  private matchKeywords(job: JobDomain, keywords): boolean {
    if (keywords === null || keywords.length == 0) return true;
    if (includesKeywords(job.title, keywords)) return true;
    if (includesKeywords(job.address, keywords)) return true;
    if (includesKeywords(job.description, keywords)) return true;
  }

  private matchSalary(job: JobDomain, min: number, max: number): boolean {
    if (min == null && max == null) return true;
    if (min == null && job.salary <= max) return true;
    if (max == null && min <= job.salary) return true;
    if (min <= job.salary && job.salary <= max) return true;
  }
}

const includesKeywords = (text: string, keywords: string[]): boolean =>
  keywords.filter((k) => text.includes(k)).length > 0;
