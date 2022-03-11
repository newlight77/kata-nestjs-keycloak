export class FindJobByIdCommand {
  id: string;
  constructor({ id }: { id: string }) {
    this.id = id;
  }
}

export class FindJobQuery {
  keywords: string[];
  minSalary: number;
  maxSalary: number;

  constructor({
    keywords,
    minSalary,
    maxSalary,
  }: {
    keywords: string[];
    minSalary: number;
    maxSalary: number;
  }) {
    this.keywords = keywords;
    this.minSalary = minSalary;
    this.maxSalary = maxSalary;
  }
}
