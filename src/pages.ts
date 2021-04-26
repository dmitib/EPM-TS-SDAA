import { Page } from "./page";
import { PagesIterable } from "./pagesIterable";

export class Pages {
  public pages: Array<Page>;

  constructor(pages: Array<Page>) {
    this.pages = pages;
  }

  public toString(idx: number): string {
    return this.pages[idx].toString();
  }

  public [Symbol.iterator](): PagesIterable {
    return new PagesIterable(this);
  }
}