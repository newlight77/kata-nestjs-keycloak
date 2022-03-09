export class JobDomain {
  id: string;
  title: string;
  address: string;
  salary: number;
  currency: string;
  contract_type: string;
  description: string;
  author: string;
  created_at: Date;
  updated_at: Date;

  constructor({
    id,
    title,
    address,
    salary,
    currency,
    contract_type,
    author,
    description,
  }: {
    id: string;
    title: string;
    address: string;
    salary: number;
    currency: string;
    contract_type: string;
    author: string;
    description: string;
  }) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.salary = salary;
    this.currency = currency;
    this.contract_type = contract_type;
    this.author = author;
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
    currency: it.currency,
    contract_type: it.contract_type,
    author: it.author,
    description: it.description,
  });
};
