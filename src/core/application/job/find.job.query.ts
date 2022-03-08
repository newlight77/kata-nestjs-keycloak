export class FindJobQuery {
  keywords: string[];

  constructor({ keywords }: { keywords: string[] }) {
    this.keywords = keywords;
  }
}
