import {PagesIterable} from "./pagesIterable";

export abstract class Item {
  public currentPage: number = 0;

  abstract toString(): string;

  public [Symbol.iterator](): PagesIterable {
    return new PagesIterable(this);
  }
}