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
