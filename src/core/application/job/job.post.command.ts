export class PostJobCommand {
  title: string;
  address: string;
  salary: number;
  contract_type: string;
  description: string;
  author: string;
  created_at: Date;
  updated_at: Date;

  constructor({
    title,
    address,
    salary,
    contract_type,
    author,
    description,
  }: {
    title: string;
    address: string;
    salary: number;
    contract_type: string;
    author: string;
    description: string;
  }) {
    this.title = title;
    this.address = address;
    this.salary = salary;
    this.contract_type = contract_type;
    this.author = author;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.description = description;
  }
}
