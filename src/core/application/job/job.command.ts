export class DeleteJobCommand {
  id: string;
  constructor({ id }: { id: string }) {
    this.id = id;
  }
}

export class EditJobCommand {
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
    created_at,
  }: {
    id: string;
    title: string;
    address: string;
    salary: number;
    currency: string;
    contract_type: string;
    author: string;
    description: string;
    created_at: Date;
  }) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.salary = salary;
    this.currency = currency;
    this.contract_type = contract_type;
    this.author = author;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = new Date();
  }
}

export class PostJobCommand {
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
    title,
    address,
    salary,
    currency,
    contract_type,
    author,
    description,
  }: {
    title: string;
    address: string;
    salary: number;
    currency: string;
    contract_type: string;
    author: string;
    description: string;
  }) {
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
