export class DeleteJobCommand {
  id: string;
}

export class EditJobCommand {
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
  }: {
    id: string;
    title: string;
    company: string;
    address: string;
    salary: number;
    description: string;
    created_at: Date;
  }) {
    this.id = id;
    this.title = title;
    this.company = company;
    this.address = address;
    this.salary = salary;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = new Date();
  }
}

export class PostJobCommand {
  title: string;
  address: string;
  company: string;
  salary: number;
  description: string;
  created_at: Date;
  updated_at: Date;

  constructor({
    title,
    company,
    address,
    salary,
    description,
  }: {
    title: string;
    company: string;
    address: string;
    salary: number;
    description: string;
  }) {
    this.title = title;
    this.company = company;
    this.address = address;
    this.salary = salary;
    this.description = description;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
