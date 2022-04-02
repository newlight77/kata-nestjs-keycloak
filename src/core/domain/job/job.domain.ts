export class JobDomain {
  id: string;
  title: string;
  address: string;
  salary: number;
  description: string;
  created_at: Date;
  updated_at: Date;

  constructor({
    id,
    title,
    address,
    salary,
    description,
  }: {
    id: string;
    title: string;
    address: string;
    salary: number;
    description: string;
  }) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.salary = salary;
    this.description = description;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export const toDomain = (it: Partial<JobDomain>) => {
  return new JobDomain({
    id: it.id,
    title: it.title,
    address: it.address,
    salary: it.salary,
    description: it.description,
  });
};
