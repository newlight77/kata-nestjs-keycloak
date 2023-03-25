import { JobDomain } from '../../domain/job/job.domain';

export class JobQueryDto extends JobDomain {
  matched: number;

  constructor({
    id,
    title,
    company,
    address,
    salary,
    description,
    created_at,
    updated_at,
    matched,
  }: {
    id: string;
    title: string;
    company: string;
    address: string;
    salary: number;
    description: string;
    created_at: Date;
    updated_at: Date;
    matched: number;
  }) {
    super({ id, title, company, address, salary, description, created_at, updated_at });
    this.matched = matched;
  }
}

export const toDto = (it: Partial<JobQueryDto>) => {
  return new JobQueryDto({
    id: it.id,
    title: it.title,
    company: it.company,
    address: it.address,
    salary: it.salary,
    description: it.description,
    created_at: it.created_at,
    updated_at: it.updated_at,
    matched: it.matched,
  });
};

export const domainToDto = (it: Partial<JobDomain>) => {
  return new JobQueryDto({
    id: it.id,
    title: it.title,
    company: it.company,
    address: it.address,
    salary: it.salary,
    description: it.description,
    created_at: it.created_at,
    updated_at: it.updated_at,
    matched: 0,
  });
};
