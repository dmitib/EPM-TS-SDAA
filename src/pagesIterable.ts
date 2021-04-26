interface Result {
  value: any | undefined,
  done: boolean
}

export class PagesIterable  {
  private item: any;
  private nextIdx: number;

  constructor(page: any) {
    this.item = page;
    this.nextIdx = 0;
  }

  public next(): Result {
    const result: Result = {
      value: this.item,
      done: false
    };
    
    if (this.nextIdx === this.item.pages.pages.length) {
      return {
        value: undefined,
        done: true
      }
    }

    this.item.currentPage = this.nextIdx;

    this.nextIdx++;

    return result;
  }
}