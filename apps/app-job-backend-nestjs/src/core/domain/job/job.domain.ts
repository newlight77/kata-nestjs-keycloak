export class JobDomain {
  id: string;
  title: string;
  company: string;
  address: string;
  salary: number;
  description: string;
  created_at: Date;
  updated_at: Date;

  constructor({
    id,
    title,
    company,
    address,
    salary,
    description,
    created_at,
    updated_at,
  }: {
    id: string;
    title: string;
    company: string;
    address: string;
    salary: number;
    description: string;
    created_at: Date;
    updated_at: Date;
  }) {
    this.id = id;
    this.title = title;
    this.company = company;
    this.address = address;
    this.salary = salary;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export const toDomain = (it: Partial<JobDomain>) => {
  return new JobDomain({
    id: it.id,
    title: it.title,
    company: it.company,
    address: it.address,
    salary: it.salary,
    description: it.description,
    created_at: it.created_at,
    updated_at: it.updated_at,
  });
};
