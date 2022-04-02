export class DeleteJobCommand {
  id: string;
}

export class EditJobCommand {
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
    created_at,
  }: {
    id: string;
    title: string;
    address: string;
    salary: number;
    description: string;
    created_at: Date;
  }) {
    this.id = id;
    this.title = title;
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
  salary: number;
  description: string;
  created_at: Date;
  updated_at: Date;

  constructor({
    title,
    address,
    salary,
    description,
  }: {
    title: string;
    address: string;
    salary: number;
    description: string;
  }) {
    this.title = title;
    this.address = address;
    this.salary = salary;
    this.description = description;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
